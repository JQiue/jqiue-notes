---
title: 浏览器提供的能力
category: Web
article: false
---

`window` 作为全局变量，代表了脚本正在运行的窗口，将浏览器的 API 暴露给 Javascript 代码，其`document`属性指向窗口中载入的 DOM 文档

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

## 消息框

+ `alert()`：警告对话框
+ `confirm()`：确认对话框，选择“确定”返回`true`
+ `prompt()`：提示输入对话框，会将输入的内容作为字符串返回

## 窗口交互

+ `open(url, name, params)`：打开一个新窗口，返回新窗口的实例
+ `close()`：关闭窗口，默认关闭当前的窗口，只能由该窗口的实例所关闭
+ `opener`：返回打开当前窗口的那个窗口的引用，如果当前窗口不是由其他窗口打开的，则返回`null`

::: normal-demo 窗口

```html
<button id="open">打开弹窗</button>
<button id="close">关闭弹窗</button>
```

```js
document.querySelector('#open').addEventListener('click', () => {
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=nomenubar=no,width=0,height=0,left=-1000,top=-1000`;
  const newWindow = window.open('/', 'newWindow', params);
  document.querySelector('#close').addEventListener('click', () => {
    newWindow.close();
  });
});
```

:::

## 窗口尺寸

+ `innerWidth/innerHeight`：返回内部窗口的宽度和高度，都是只读的
+ `resizeTo(x, y)`：绝对调整窗口尺寸
+ `resizeBy(xDelta, yDelta)`：相对调整窗口尺寸

## 屏幕对象

`screen`对象包含了设备的屏幕信息

+ `screen.width`：返回屏幕的真实宽度
+ `screen.height`：返回屏幕的真实高度
+ `screen.availWidth`：返回屏幕的可用宽度
+ `screen.availHeight`：返回屏幕的可用高度（不会计算操作系统任务栏所占的高度）

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

## 历史记录

一般浏览器会记住用户打开过的网址历史，并使用“前进”和“后退”两个按钮进行导航，这些都可以使用`history`进行操作，历史记录是由栈实现的

+ `history.length`：返回历史记录的长度
+ `history.back()`：和后退按钮是等效的，默认后退一步，可以传入整数表示后退的步数
+ `history.forward()`：和前进按钮是等效的，默认前进一步，可以传入整数表示前进的步数
+ `history.go()`：可以跳转到指定的位置，如果传入一个整数就表示前进或后退，如果传入一个 URL 则表示跳转到历史中的某一个地址，如果为 0，则会刷新页面

## 设备信息

`navigator`对象包含了客户端设备的信息，通常做一些浏览器的类型检测，从而做出不同的兼容性处理

+ `navigator.appVersion`：返回浏览器版本信息
+ `navigator.onLine`：返回浏览器联网状态

## 跨窗口通信

`window.postMessage(message, targetOrigin)`可以实现跨窗口通信，不会被限制

`targetOrigin`最好指定目标窗口的协议，地址或端口，这三者的任意一项不符合都不会发送，不要指定为`*`，这可能有安全问题

其他窗口可以监听`message`事件来获取信息

```js
window.addEventListener('message', (message) => {
  /* message 有三个属性：
    1. data：其他 window 传来的对象
    2. origin：发送方的 origin 
    3. source：发送方窗口的引用
  */
}, false )
```

## 打印文档

调用`print()`即可打印当前文档，如果想要打印某个某个元素，可以使用一些其它的技巧

## 通知

`Notification`允许调用操作系统级别的通知，在进行通知之前，必须向用户请求通知权限

::: danger
只能在 HTTPS 中使用，并且只适用于桌面浏览器，大多数移动浏览器没有实现它
:::

```js
Notification.requestPermission( function(status) {
  console.log(status); // 仅当值为 "granted" 时显示通知
});
```

`Notification.permission`会返回一个字符串，表示权限状态：

+ `default`：还没有询问用户授权
+ `granted`：询问过用户，并授予权限
+ `denied`：用户拒绝授予权限

创建一个通知非常简单，`Notification(title, options)`是一个构造方法：

`options`包含以下属性：

+ `dir` : 文字的方向；它的值可以是 `auto（自动）`, `ltr（从左到右）`, or `rtl（从右到左）`
+ `lang`: 指定通知中所使用的语言
+ `body`: 通知中额外显示的字符串
+ `tag`: 赋予通知一个 ID，以便在必要的时候对通知进行刷新、替换或移除。
+ `icon`: 一个图片的 URL，将被用于显示通知的图标。

```js
const notice = new Notifications('title', {body: '这是一个通知'})
```

::: normal-demo 通知

```html
<button id="request">获取通知权限</button>
<button id="send">发送通知</button>
```

```js
document.querySelector('#request').onclick = (event) => {
  Notification.requestPermission( function(status) {
    if(Notification.permission == status) {
      alert('用户已经授予通知权限');
    }
    if(Notification.permission == 'denied') {
      alert('用户拒绝授予通知权限');
    }
  });
}

document.querySelector('#send').onclick = (event) => {
  if(Notification.permission == 'default') {
    alert('没有询问用户授予通知权限');
    return;
  }
  if(Notification.permission == 'denied') {
    alert('用户没有授予通知权限');
    return;
  }
  const n = new Notification("JQiue's notes", {
    body: 'Hello, World'
  });
  n.onshow = event => {
    setTimeout(n.close.bind(n), 3000);
  }
  n.onclick = event => {
    alert('你点击了通知');
  }
  n.onclose = event => {
    alert('通知已经关闭了')
  }
}
```

:::
