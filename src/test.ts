import * as Rx from 'rxjs'
import { map, scan, filter } from 'rxjs/operators'

const bossLine =
  '37|2020-09-05T21:05:51.3440000+08:00|4000BE27|有生命活水|00002D6F|5419766|12889320|10000|10000|0||100|100|2.384186E-07|-4.792213E-05|01|0|0|0||5d49346282276ae155b3c5510f829982'
const handLine =
  '37|2020-09-05T21:05:51.4770000+08:00|4000BE27|活水之手|00002D70|5409156|12889320|10000|10000|0||100|100|2.384186E-07|-4.792213E-05|01|0|0|0||2652d242fc5f381ed6a2e6a055f0ebf8'

const bossStartHP = 5419766
const handStartHP = 5409156

window.OverlayPluginApi = {
  ready: true,
  callHandler: (e: any) => {
    console.log('_callHandler', e)
  },
}

const sendEvent = (data: any) => {
  if (window.__OverlayCallback) {
    window.__OverlayCallback(data)
  }
}

const sendLineEvent = (line: string) => {
  sendEvent({
    type: 'LogLine',
    rawLine: line,
  })
}

const checkSubscription = Rx.timer(0, 300)
  .pipe(filter(() => window.__OverlayCallback != null))
  .subscribe(() => {
    checkSubscription.unsubscribe()

    sendEvent({
      type: 'ChangeZone',
      zoneID: 887,
    })

    const bossSubscription = Rx.timer(0, 1000)
      .pipe(
        map(() => 100000 - Math.floor(20000 * Math.random())),
        scan((hp, value) => hp - value, bossStartHP),
        map(hp => (hp <= 0 ? 0 : hp)),
        map(hp => {
          if (hp === 0) {
            bossSubscription.unsubscribe()
            handSubscription.unsubscribe()
          }
          return bossLine.replace(`${bossStartHP}`, `${hp}`)
        }),
      )
      .subscribe(sendLineEvent)
    const handSubscription = Rx.timer(0, 1000)
      .pipe(
        map(() => 90000 - Math.floor(20000 * Math.random())),
        scan((hp, value) => hp - value, handStartHP),
        map(hp => (hp <= 0 ? 0 : hp)),
        map(hp => {
          return handLine.replace(`${handStartHP}`, `${hp}`)
        }),
      )
      .subscribe(sendLineEvent)
  })
