import * as Rx from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { ILogMessage } from '../model/actModel'

declare global {
  interface Window {
    __OverlayCallback: Function
    OverlayPluginApi: {
      ready: boolean
      callHandler: Function
    }
  }
}

/**
 * 注册事件,回调 __OverlayCallback 函数
 *
 * @param {string[]} [events=['LogLine', 'ChangeZone']]
 */
function addOverlayListener(events: string[] = ['LogLine', 'ChangeZone']) {
  window.OverlayPluginApi.callHandler(
    JSON.stringify({
      call: 'subscribe',
      events,
    }),
  )
}

export default function initOverlayPluginEvent(): Rx.Subject<ILogMessage> {
  const subject = new Rx.Subject<ILogMessage>()
  const checkSubscription = Rx.timer(0, 300)
    .pipe(tap(n => console.log('ping! pong!', n)))
    .pipe(
      filter(() => window.OverlayPluginApi && window.OverlayPluginApi.ready),
    )
    .subscribe(() => {
      checkSubscription.unsubscribe()
      window.__OverlayCallback = (e: any) => {
        let data: ILogMessage
        if (e.type === 'LogLine') {
          data = {
            type: 'LogLine',
            rawLine: e.rawLine,
          }
          subject.next(data)
        } else if (e.type === 'ChangeZone') {
          data = {
            type: 'ChangeZone',
            zoneID: e.zoneID, // 需要check
          }
          subject.next(data)
        }
      }
      addOverlayListener(['LogLine', 'ChangeZone'])
      console.log('event is ready!')
    })

  return subject
}
