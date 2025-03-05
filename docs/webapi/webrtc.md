---
title: WebRTC
category: Web
article: false
---

在浏览器中使用 JavaScript 处理音视频是困难的，Google 给出了 WebRTC 的答案

## 音视频采集

- 摄像头
- 帧率
- 分辨率
- 宽高比
- 麦克风
- 轨
- 流

## 调用摄像头和麦克风

```js
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(mediastream => {
  // mediastream 是获得到的媒体流
});
```
<!-- to be updated -->
