/** @format */

import * as Rx from 'rxjs'
import { ILogMessage } from '../model/actModel'

const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search)

export default function initActWebSocket():
  | Rx.Subject<ILogMessage>
  | undefined {
  if (!getHost()) {
    return undefined
  }
  const url = new URLSearchParams(window.location.search)
  const wsUri = `${url.get('HOST_PORT')}MiniParse` || undefined
  if (wsUri) {
    const webs = new ActWebsocket(wsUri)
    try {
      webs.connect()
    } catch (e) {
      console.log(e)
    }
    window.onbeforeunload = () => {
      webs.close()
    }
    window.addEventListener(
      'unload',
      () => {
        webs.close()
      },
      false,
    )
    return webs.subject
  }
  return undefined
}

class ActWebsocket {
  uri: string
  id?: string
  activate: boolean
  websocket?: WebSocket
  public subject: Rx.Subject<ILogMessage>

  constructor(uri: string, path = 'MiniParse') {
    // url check
    this.uri = uri
    this.activate = false
    this.subject = new Rx.Subject<ILogMessage>()
  }
  connect() {
    if (typeof this.websocket !== 'undefined' && this.websocket !== null)
      this.close()
    this.activate = true
    this.websocket = new WebSocket(this.uri)
    this.websocket.onopen = (evt: Event) => {
      this.onopen(evt)
    }
    this.websocket.onmessage = (evt: MessageEvent) => {
      this.onmessage(evt)
    }
    this.websocket.onclose = (evt: CloseEvent) => {
      this.onclose(evt)
    }
    this.websocket.onerror = (evt: Event) => {
      this.onerror(evt)
    }
  }
  close() {
    this.activate = false
    if (this.websocket !== null && typeof this.websocket !== 'undefined') {
      this.websocket.close()
    }
  }
  onopen(evt: Event) {}
  onclose(evt: CloseEvent) {
    this.websocket = undefined
    if (this.activate) {
      setTimeout(() => {
        this.connect()
      }, 5000)
    }
  }
  onmessage(evt: MessageEvent) {
    if (evt.data === '.') {
      // ping pong
      this.websocket?.send('.')
    } else {
      try {
        const obj = JSON.parse(evt.data)
        const { type, msg, msgtype } = obj
        if (
          type === 'broadcast' &&
          (msgtype === 'ChangeZone' || msgtype === 'Chat')
        ) {
          const data: ILogMessage = {
            type: msgtype === 'ChangeZone' ? 'ChangeZone' : 'LogLine',
            zoneID: msgtype === 'ChangeZone' ? msg.zoneID : undefined,
            rawLine: msgtype === 'Chat' ? msg : undefined,
          }
          this.subject.next(data)
        }
      } catch (e) {}
    }
  }
  onerror(evt: Event) {
    this.websocket?.close()
  }

  onRecvMessage(e: Event) {}

  onBroadcastMessage(e: Event) {}
}
