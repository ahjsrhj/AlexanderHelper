# 亚历山大P1&P2助手

显示双boss阶段血量差，p1时若血量差高于5%，窗体会变成红色背景
血量低的名字会标红


## 食用方式
act内安装 **ngld悬浮窗插件**，添加一个新的悬浮窗，类型选择数据统计。复制地址填入即可。
悬浮窗地址如下：

推荐：[https://alexander.imrhj.cn/](https://alexander.imrhj.cn/)

备用：[https://ahjsrhj.github.io/AlexanderHelper/](https://ahjsrhj.github.io/AlexanderHelper/)

## 配置方式
采用 `url` 后加 `query` 的方式进行配置，支持如下参数
- scale: 界面缩放倍率，默认为1，支持小数，例: `https://alexander.imrhj.cn/?scale=1.2`
- border: 显示边框，默认为0，不展示，设为1展示，例: `https://alexander.imrhj.cn/?border=1`

针对外服做的一些定制：
- p1Main: 有生命活水的名字 例: `https://alexander.imrhj.cn/?p1Main=有生命活水`
- p1Sub: 活水之手的名字 例如: `https://alexander.imrhj.cn/?p1Sub=活水之手`
- p2Main: P2残暴的名字 例如: `https://alexander.imrhj.cn/?p2Main=残暴正义号`
- p2Sub: P2飞机的名字 例如: `https://alexander.imrhj.cn/?p2Sub=巡洋驱逐者`

全部配置范例如下：

`https://alexander.imrhj.cn/?scale=1.2&border=1&p1Main=有生命活水&p1Sub=活水之手&p2Main=残暴正义号&p2Sub=巡洋驱逐者`


## 开发Tips
[记录](./RECORD.md)
