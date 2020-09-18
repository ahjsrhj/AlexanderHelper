# 记录&Tips

统一使用 RxJS.Subject 接受并转发事件

- websocket
- window.\_\_OverlayCallback
  前者为使用 Websocket 时的事件源
  后者为不使用时，此时 window 上会挂上 OverlayPluginApi 这个属性，通过调用

```javascript
OverlayPluginApi.callHandler(
  JSON.stringify({
    call: 'subscribe',
    events: ['LogLine'],
  }),
  e => console.log(e),
)
```

来进行事件注册，注册之后可以在\_\_OverlayCallback 中接收到对应事件，可注册列表如下

1. CombatData
2. LogLine
``` javascript
{
  line: ["39", "2020-09-17T01:25:52.6520000+08:00", "1020D3AA", "雾漫江南", "102279", "102279", "8310", "10000", "0", "0", "50.17752", "117.4736", "10.02", "-1.149434", "", "437348f5a929b506f47055c6a0b164f1"],
  rawLine: "39|2020-09-17T01:25:52.6520000+08:00|1020D3AA|雾漫江南|102279|102279|8310|10000|0|0|50.17752|117.4736|10.02|-1.149434||437348f5a929b506f47055c6a0b164f1",
  type: "LogLine",
}
```
3. ChangeZone
``` javascript
{
  type: 'ChangeZone',
  zoneID: 887
  zoneName: '白银乡'
}
```
4. ChangePrimaryPlayer
``` javascript
{
  type: 'ChangePrimaryPlayer',
  charID: 111,
  charID: '名字'
}
```

对于 `Websocket` 方式, 需要监听 `document` 上的 `onBroadcastMessage` 事件，对应 `Event` 数据结构如下
``` javascript
{
  detail: {
    msg: {
      zoneID?: number
      charName?: string
      charID?: string
    }|string
    msgtype: 'ChangeZone'|'SendCharName'|'Chat'
  }
}
// 当msgtype==='Chat'时，此时msg字段为string字符串，内容为logs本地文件记录行
```

需要将这两种方式统一使用 Subject 转为相同的格式，去对区域变更/日志行进行分析
定义数据格式如下:
``` javascript
{
  type: 'ChangeZone'|'LogLine',
  zoneID?: number,
  rawLine?: string
}
```
