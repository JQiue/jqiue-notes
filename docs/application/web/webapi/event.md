---
title: 事件
category: Web
tags: [WebAPI, Alpha]
author: JQiue
article: false
---

事件是一种用于人机交互和响应程序内部的控制机制，在 JavaScript 中，对象可以响应一些事件，比如鼠标事件，包括使用鼠标的常见操作：单机和释放、鼠标指针是否在对象上。当这些事件产生后，就可以编写代码对这些事件做出响应的处理，指定为响应事件而应执行的动作叫做事件处理

首先要认识事件发生和处理的三个基本要素，当事件发生时，必然会牵扯到这些要素

+ 事件源：就是触发事件的对象，当一个元素触发了一个事件，这个元素就是事件源
+ 事件类型：一个元素可以触发多个事件，因此必须根据事件的类型进行分别处理
+ 事件响应：当事件触发后，执行的一些响应步骤，一般通过函数来完成，函数包含了响应要执行的步骤

由于不同的事件具有不同的逻辑，所以就产生了事件类型，比如鼠标产生的事件和键盘产生的事件等等，这里是一些常用的事件类型，更多详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%9C%80%E5%B8%B8%E8%A7%81%E7%9A%84%E7%B1%BB%E5%88%AB)

+ 鼠标事件
  1. `click`：单击并释放后
  2. `dblclick`：双击
  3. `mouseenter`：指针移入到元素内
  4. `mouseleave`：指针移出到元素外
+ 键盘事件
  1. `keydown`：按下任意键
  2. `keyup`：释放任意按键
  3. `keypress`：长按任意键
+ 焦点事件
  1. `focus`：获得焦点
  2. `blur`：失去焦点

## 事件处理的实现

直接使用 HTML 元素事件特性

```html
<button onclick="alert('单击事件触发了')">click</button>
```

::: demo 事件特性

```html
<button onclick="alert('单击事件触发了')">click</button>
```

:::

HTML 有很多这样直接作用于元素的事件特性`on<event>`，被触发时会启动对应的 JavaScript 程序，但应该避免这种使用方式，因为不利于维护 HTML

在 DOM 模型中，HTML 事件特性被看作元素节点的属性，只要为这个事件属性定义一个处理函数就可以了

```html
<button id="event-example1">click</button>
```

```js
let elem = document.getElementById('event-example1');
elem.onclick = function () {
  alert('单击事件触发了')
}
```

::: demo DOM 元素的事件属性

```html
<button id="event-example1">click</button>
```

```js
let elem = document.getElementById('event-example1');
elem.onclick = function () {
  alert('单击事件触发了');
}
```

:::

这种方式将处理逻辑和 HTML 文档分离，大大提高了维护性，这样便于寻找 BUG

但在现在的技术中更推荐使用`addEventListener()`方法来为元素添加监听事件，它是一个事件源上的方法，事件源可以是文档上的元素，也可以是`window`或者任何被支持的事件对象，所以语法通常是这样的：`target.addEventListener(eventType, handler, useCapture)`

+ `target`是事件发生的对象
+ 参数`eventType`是事件类型
+ 参数`listener`是处理事件的函数
+ 参数`useCapture`是一个逻辑值，用来确定事件监听是捕获阶段、目标阶段还是冒泡阶段

与前两种方式相比，事件监听的优势在于对同一个事件，可以有多个不同的处理

```html
<button id="event-example2">click</button>
```

```js
function eventHandler() {
  alert('单击事件触发了');
}

let elem = document.getElementById('event-example2');
elem.addEventListener('click', eventHandler, false);
```

::: demo addEventListener 方法

```html
<button id="event-example2">click</button>
```

```js
function eventHandler() {
  alert('单击事件触发了');
}

let elem = document.getElementById('event-example2');
elem.addEventListener('click', eventHandler, false);
```

:::

## 事件对象 — Event

当 DOM 中某个事件被触发时，会同时产生一个描述事件相关信息的对象（触发事件的元素，鼠标的的位置，键盘的状态等等），这个对象就是 event，它通常被当作参数传递给事件处理函数

::: demo event

```html
<button id='event-example3'>单击事件</button>
```

```js
function eventHandler(event) {
  alert('事件类型：' + event.type);
}

let elem = document.getElementById('event-example3');
elem.addEventListener('click', eventHandler, false);
```

:::

`event.type`获取的是当前事件的类型，更多 event 对象的属性和方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

## 事件流

了解事件流之前先看示范程序，点击不同层次的元素，看看事件是按照什么顺序触发的

::: demo 事件冒泡

```html
<div id="foo" onclick="alert('我是 foo')">
  foo
  <div id="bar" onclick="alert('我是 bar')">
    bar
    <div id="qux" onclick="alert('我是 qux')">qux</div>
  </div>
</div>
```

```css
#foo div,#foo {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
#foo {
  background-color: red;
}
#bar {
  background-color: green;
}
#qux {
  background-color: pink;
}
```

:::

通过实验得知，鼠标无论点击到了哪一层元素，事件会从该层开始依次向上层触发，DOM 事件模型分为捕获和冒泡，一个事件发生后，会在元素之间进行传播，这种传播分为三个阶段：

+ 捕获阶段：事件从最顶层开始向下传播的阶段
+ 目标阶段：真正目标节点正在处理事件的阶段
+ 冒泡阶段：事件从目标节点向上传播的阶段

事件冒泡是 IE 的事件流，事件由具体的元素开始触发，然后逐级向上传播，而事件捕获是网景公司提出的，和 IE 的事件流正好相反。直到 W3C 发布标准后，浏览应该同时支持两种调用顺序，首先从捕获阶段开始到目标阶段，再由目标阶段到冒泡阶段结束，这就是所谓的**先捕获再冒泡**

冒泡是默认的事件流，但是可以设置`addEventListener(eventType, handler, true)`第三个参数为`true`，来设置成捕获阶段

::: demo 事件捕获

```html
<div id="foo-example">
  foo
  <div id="bar-example">
    bar
    <div id="qux-example">qux</div>
  </div>
</div>
```

```css
#foo-example div,#foo-example {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
#foo-example {
  background-color: red;
}
#bar-example {
  background-color: green;
}
#qux-example {
  background-color: pink;
}
```

```js
let foo = document.getElementById('foo-example');
let bar = document.getElementById('bar-example');
let qux = document.getElementById('qux-example');

foo.addEventListener('click', function () {
  alert('我是 foo');
}, true);

bar.addEventListener('click', function () {
  alert('我是 bar');
}, true);

qux.addEventListener('click', function () {
  alert('我是 qux');
}, true);
```

:::

## 阻止事件

在 HTML 中有些元素默认有些事件，比如`<a>`标签的跳转和表单的提交按钮跳转，如果想要`<a>`标签仅仅作为一个普通的按钮，不想进行页面的跳转，也不想进行锚点定位，可以有以下几种方法：

```html
<!-- 方法一 -->
<a href="javascript:;">链接</a>

<!-- 方法二 -->
<a id="event-example4" href="https://wjqis.me">链接</a>
<script>
  document.getElementById('event-example4').onclick = function () {
    return false;
  }
</script>

<!-- 方法三 -->
<a id="event-example5" href="https://wjqis.me">链接</a>
<script>
  document.getElementById('event-example5').onclick = function (e) {
    e.preventDefault();
  }
</script>
```

+ `preventDefault()`可以阻止默认事件行为不会被触发
+ `stopPropagation()`可以阻止冒泡，阻止任何父元素事件处理
+ `stopImmediatePropagation()`不仅可以阻止冒泡，也能阻止元素同类型事件的其他处理函数触发

::: tip
如果一个元素注册了两个同类型的事件监听，执行顺序是谁写在前先执行谁
:::

## 事件委托

事件委托也叫事件代理，指的是目标元素并不处理事件，而是由父元素来处理，利用了事件冒泡机制和事件产生的事件对象来实现，这种方式减少了事件注册，节省了大量的内存，还可以为新增的子元素实现动态的事件绑定

::: demo 事件委托

```html
<div id="father">
  <h1 class="son1">子元素1</h1>
  <p class="son2">子元素2</p>
  <span class="son3">子元素3</span>
</div>
```

```js
document.getElementById('father').addEventListener('click', function (event) {
  if (event.target.nodeName === 'H1'){
    alert('子元素1');
  } 
  if (event.target.nodeName === 'P'){
    alert('子元素2');
  } 
  if (event.target.nodeName === 'SPAN'){
    alert('子元素3');
  }
});
```

:::

`event.target`会返会目标的元素节点对象，可以通过判断该对象的`nodeName`或`class`来做一些事件处理

::: danger
事件委托应该看情况使用，不是所有的事件都应该委托，否则会产生事件误判的问题，本不应该触发的事件却被触发了
:::

## 自定义事件

HTML 中不仅提供了很多内建事件，还提供了一个事件构造器`Event(type, otiions)`来自定义自己的事件类型，它有两个参数：

+ `type`：事件类型，可以是`click`这样的字符串，也可以是自己定义的`myclick`
+ `options`：有两个可选属性的对象，`bubbles: true/false`，为`true`时会冒泡，`cancelable: true/false`，为`true`时会阻止默认行为。默认情况下两者都为`false`

```js
let event = new Event('hello');
```

自定义事件必须通过`elem.dispatchEvent(event)`来调用，换句话说，这个方法是唯一能够触发自定义事件的办法

```js
let event = new Event('hello');
elem.dispatchEvent(event);
```

对于自定义事件，应该使用`addEventListener`来处理它，而不是`on<event>`

```js
// 监听 hello 事件
elem.addEventListener('hello', e => {
  console.log('hello');
})

// 定义自定义事件 hello
let event = new Event('hello');

// 触发自定义事件
elem.dispatchEvent(event);
```

## 事件的同步处理

事件是在队列中进行处理的，如果在一个事件处理过程中又触发了一个事件，那么它的处理程序会被排入队列中等待前一个事件处理完成

```html
<button id="btn">click me</button>
<script>
  btn.onclick = function() {
    alert(1);
    btn.dispatchEvent(new CustomEvent('btn-click'));
    alert(2);
  };

  btn.addEventListener('btn-click', () => alert('btn-click handler'));
</script>
```

::: demo

```html
<button id="btn">click me</button>
```

```js
btn.onclick = function() {
  alert(1);
  btn.dispatchEvent(new CustomEvent('btn-click'));
  alert(2);
};

btn.addEventListener('btn-click', () => alert('btn-click handler'));
```

:::

## UI 事件

## 表单事件

## 剪切板事件

剪切板是界面中最常用的操作之一，IE 是最早支持的，随着 HTML5 到来，剪切板事件已经纳入了标准

要访问剪切板中的数据，可以通过 clipboard 对象，它由 navigator.clipboard 返回，所有的操作都通过这个对象进行

由于用户可能会将敏感数据放在剪切板，所以这个 API 的安全限制比较多，调用的时候必须明确获得用户的许可，“写入权限”会自动授予，但是“读取权限”必须被明确授予，也就是说在进行读取操作的时候，浏览器会弹一个对话框询问用户是否同意

clipboard 提供了四个方法用于读写剪切板，他们都是异步方法，返回 promise 对象

+ readText() 用于读取剪切板中的文本信息

```js
navigator.clipboard.readText();
```

+ read() 读取剪切板中的数据，可以是文本也可以是二进制

```js
navigator.clipboard.read();
```

## 文档
