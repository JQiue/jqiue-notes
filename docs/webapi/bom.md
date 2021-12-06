---
title: BOM
category: Web
tags: [Alpha]
author: JQiue
article: false
---

## 定时器

+ 间隔调用：`setInterval(callback, delay)`指定一定时长的间隔时间来调用一个函数
+ 延时调用：`setTimeout(callback, delay)`在一定的延迟后调用函数，仅仅只调用一次

时间单位都是毫秒，两个定时器都会返回一个值被用于取消，比如`clearTimeout(timer)/clearInterval(timer)`

```js
let timer1 = setInterval(function () {}, 5000);
let timer2 = setTimeout(function () {}, 5000);
```

虽然没有内建的方法能够清除所有的定时器函数，但是可以实现一个强制清除的逻辑

```js
for (var i = 1; i < 1000; i++){
  clearInterval(i);
  clearTimeout(i);
}
```

## 对话框

+ `alert()`：警告对话框
+ `confirm()`：确认对话框，选择“确定”返回`true`
+ `prompt()`：提示输入对话框，会将输入的内容作为字符串返回

## 窗口交互

+ `open(url, name, params)`：打开一个新窗口，返回新窗口的实例
+ `close()`：关闭一个窗口，默认关闭当前的窗口，可以传入其他窗口的引用并关闭

::: demo 窗口

```html
<button id="btn">弹窗</button>
```

```js
document.querySelector('#btn').addEventListener('click', () => {
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=nomenubar=no,width=0,height=0,left=-1000,top=-1000`;
  const newWindow = window.open('/', 'newWindow', params);
});
```

:::

## 历史管理

一般浏览器会记住用户打开过的网址历史，并使用“前进”和“后退”两个按钮进行导航，这些都可以使用`history`进行操作

+ `history.length`：返回历史记录的长度
+ `history.back()`：和后退按钮是等效的，默认后退一步，可以传入整数表示后退的步数
+ `history.forward()`：和前进按钮是等效的，默认前进一步，可以传入整数表示前进的步数
+ `history.go()`：可以跳转到指定的位置，如果传入一个整数就表示前进或后退，如果传入一个 URL 则表示跳转到历史中的某一个地址，如果为 0，则会刷新页面

## 地址管理

`location`描述的是当前窗口对象打开的 URL 地址信息

+ `location.href`：返回 URL，如果做赋值操作，就会跳转到指定页面
+ `location.hash`：返回哈希值
+ `location.hostname`：返回主机名
+ `location.port`：返回端口
+ `location.host`：返回主机名和端口
+ `location.protocol`：返回协议部分
+ `location.search`：返回查询字符串
+ `location.reload()`：重新加载页面

## 设备信息

`navigator`对象包含了客户端设备的信息，通常做一些浏览器的类型检测，从而做出不同的兼容性处理

+ `navigator.appVersion`：返回浏览器版本信息
+ `navigator.onLine`：返回浏览器联网状态

## 屏幕对象

`screen`对象包含了设备的屏幕信息

+ `screen.width`：返回屏幕的真实宽度
+ `screen.height`：返回屏幕的真实高度
+ `screen.availWidth`：返回屏幕的可用宽度
+ `screen.availHeight`：返回屏幕的可用高度（不会计算操作系统任务栏所占的高度）

## 跨窗口通信

<!-- to be updated -->