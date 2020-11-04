import { filter, map } from 'rxjs/operators'
import initActWebSocket from './actWebsocket'
import initOverlayPluginEvent from './overlayPluginCommon'
import store from '../store'
import { wipeReg } from '../const'
import { IHPInfo } from '../model/actModel'

const subject = initActWebSocket() || initOverlayPluginEvent()

// 处理区域变更
subject
  .pipe(filter(data => data.type === 'ChangeZone'))
  .pipe(map(data => data.zoneID))
  .subscribe(zoneID => {
    store.dispatch('info/updateZoneID', zoneID)
  })

const getHPInfo = (regex: RegExp, str: string): IHPInfo => {
  const list = regex.exec(str)
  const [, currentHP, maxHP] = list!

  return {
    maxHP: +maxHP,
    currentHP: +currentHP,
  }
}
subject
  .pipe(filter(() => store.state.info.enabled))
  .pipe(filter(data => data.type === 'LogLine'))
  .pipe(map(data => data.rawLine as string))
  .subscribe(rawLine => {
    if (wipeReg.test(rawLine)) {
      store.dispatch('info/resetHPInfo')
    } else if (!store.state.info.p1Pass) {
      const p1BossHPReg = store.getters['config/p1MainRegex']
      const p1HandHPReg = store.getters['config/p1SubRegex']
      const p2TransitionReg = store.getters['config/p2TransitionRegex']
      // p1 check
      // debugger
      if (p1BossHPReg.test(rawLine)) {
        const info = getHPInfo(p1BossHPReg, rawLine)
        store.dispatch('info/updateP1BossInfo', info)
      } else if (
        store.state.info.p1Boss.currentHP > 0 &&
        p1HandHPReg.test(rawLine)
      ) {
        const info = getHPInfo(p1HandHPReg, rawLine)
        store.dispatch('info/updateP1HandInfo', info)
      } else if (p2TransitionReg.test(rawLine)) {
        // p1boss被移除
        store.dispatch('info/updateP1BossInfo', {
          currentHP: 0,
          maxHP: 0,
        })
      }
    } else {
      // p2 check
      const p2MainHPReg = store.getters['config/p2MainRegex']
      const p2SubHPReg = store.getters['config/p2SubRegex']
      if (p2MainHPReg.test(rawLine)) {
        const info = getHPInfo(p2MainHPReg, rawLine)
        store.dispatch('info/updateP2MainInfo', info)
      } else if (p2SubHPReg.test(rawLine)) {
        const info = getHPInfo(p2SubHPReg, rawLine)
        store.dispatch('info/updateP2SubInfo', info)
      }
    }
  })
