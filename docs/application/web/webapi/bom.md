---
title: BOM 操作
category: Web
tab: 前端
author: JQiue
article: false
---

## 定时器

+ 间隔调用：`window.setInterval()`可以指定一定时长的间隔事件来循环调用一个函数，只到使用了`window.clearInterval()`方法取消
+ 延时调用：`window.setTimeout()`在一定的延迟后调用函数，仅仅只调用一次，可以在时间段内使用`window.clearTimeout()`方法取消

```javascript
setInterval(function () {}, 5000);
setTimeout(function () {}, 5000);
```

时间单位都是毫秒，定时器函数调用后会返回一个值，将这个值传入对应的取消函数中就可以取消定时器，虽然没有一个内建的方法能够清除所有的定时器函数，但是可以自己实现一个强制清除的逻辑

```javascript
for (var i = 1; i < 1000; i++){
  clearInterval(i);
  clearTimeout(i);
}
```

## 对话框

+ `window.alert()`：警告对话框
+ `window.confirm()`：确认对话框，选择“确定”返回`true`
+ `window.prompt()`：提示输入对话框，会将输入的内容作为字符串返回

## 窗口交互

+ `window.open()`：打开一个新窗口，返回新窗口的实例
+ `window.close()`：关闭一个窗口，默认关闭当前的窗口，可以传入其他窗口的引用并关闭

## 历史管理

一般浏览器会记住用户打开过的网址历史，并使用“前进”和“后退”两个按钮进行导航，这些都被`history`所记录

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
