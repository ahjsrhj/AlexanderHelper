// import * as Rx from 'rxjs'
import { filter, map } from 'rxjs/operators'
import initActWebSocket from './actWebsocket'
import initOverlayPluginEvent from './overlayPluginCommon'
import store from '../store'
import { p1BossHPReg, p1HandHPReg, wipeReg } from '../const'
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
  const [, maxHP, currentHP] = list!

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
    if (p1BossHPReg.test(rawLine)) {
      const info = getHPInfo(p1BossHPReg, rawLine)
      store.dispatch('info/updateP1BossInfo', info)
    } else if (
      store.state.info.p1Boss.currentHP > 0 &&
      p1HandHPReg.test(rawLine)
    ) {
      const info = getHPInfo(p1HandHPReg, rawLine)
      store.dispatch('info/updateP1HandInfo', info)
    } else if (wipeReg.test(rawLine)) {
      store.dispatch('info/resetHPInfo')
    }
  })
