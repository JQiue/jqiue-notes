---
title: 事件
category: Web
article: false
---

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

事件是一种用于人机交互和响应程序内部的控制机制，在 JavaScript 中，对象可以响应一些网页交互事件，比如鼠标事件，包括使用鼠标的常见操作：单机和释放、鼠标指针是否在对象上。当这些事件产生后，就可以编写代码对这些事件做出响应的处理，指定为响应事件而应执行的动作叫做事件处理

首先要认识事件发生和处理的三个基本要素，当事件发生时，必然会牵扯到这些要素

+ 事件源：就是触发事件的对象，当一个元素触发了一个事件，这个元素就是事件源
+ 事件类型：一个元素可以触发多个事件，因此必须根据事件的类型进行分别处理
+ 事件响应：当事件触发后，执行的一些响应步骤，一般通过函数来完成，函数包含了响应要执行的步骤

由于不同的事件具有不同的逻辑，所以就产生了事件类型，比如鼠标产生的事件和键盘产生的事件等等，这里是一些常用的事件类型，更多详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%9C%80%E5%B8%B8%E8%A7%81%E7%9A%84%E7%B1%BB%E5%88%AB)

+ 鼠标事件
  + `click`：单击并释放后
  + `dblclick`：双击
  + `mouseenter`：指针移入到元素内
  + `mouseleave`：指针移出到元素外
+ 键盘事件
  + `keydown`：按下任意键
  + `keyup`：释放任意按键
  + `keypress`：长按任意键
+ 焦点事件
  + `focus`：获得焦点
  + `blur`：失去焦点
+ more...

## 事件处理的实现

直接使用 HTML 元素事件特性

::: demo 事件特性

```html
<button onclick="alert('单击事件触发了')">点击我</button>
```

:::

HTML 有很多这样直接作用于元素的事件特性`on<event>`，被触发时会启动对应的 JavaScript 程序，但应该避免这种使用方式，因为不利于维护 HTML

由于 HTML 特性被看作元素节点的属性，只要为这个事件属性定义一个处理函数就可以了

::: demo DOM 元素的事件属性

```html
<button>点击我</button>
```

```js
document.querySelector('button').onclick = function () {
  alert('单击事件触发了');
};
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
<button>点击我</button>

<script>
  function eventHandler() {
    alert('单击事件触发了');
  }
  document.querySelector('button').addEventListener('click', eventHandler, false);
</script>
```

::: demo addEventListener 方法

```html
<button>点击我</button>
```

```js
function eventHandler() {
  alert('单击事件触发了');
}

document.querySelector('button').addEventListener('click', eventHandler, false);
```

:::

::: tip
如果一个元素注册了多个同类型的事件监听，执行顺序是按照代码书写顺序
:::

::: tip
在事件处理中，`this`指向绑定事件的 DOM 元素
:::

## 删除事件

对于`on<event>`这种处理方式，可以直接赋值为`null`来实现事件的删除

```js
target.onclick = null;
```

如果是`addEventListener`方式，则调用`removeEventListener(type, handle)`方法即可删除对应的事件监听：

```js
let mouseClick = function (){};
target.addEventListener('click', mouseClick);
target.removeEventListener('click', mouseClick);
```

::: tip
必须是同一个函数引用，否则无法删除
:::

## 事件对象

当 DOM 中某个事件被触发时，会同时产生一个描述事件相关信息的对象（触发事件的元素，鼠标的的位置，键盘的状态等等），它通常被当作参数传递给事件处理函数

```html
<body>
  <button id="btn">click</button>
  <script>
    btn.addEventListener('click', event => {
      console.log(event);
    });
  </script>
</body>
```

::: demo event

```html
<button >点击我</button>
```

```js
document.querySelector('button').addEventListener('click', event => {
  alert('事件类型：' + event.type);
}, false);
```

:::

`event.type`获取的是当前事件的类型，更多`event`对象的属性和方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

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
div {
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

通过实验得知，鼠标无论点击到了哪一层元素，事件会从该层开始依次向上层触发。DOM 事件模型分为捕获和冒泡，一个事件发生后，会在元素之间进行传播，这种传播分为三个阶段：

+ 捕获阶段：从最顶层（window）开始向下传播到目标元素
+ 目标阶段：真正到达目标元素
+ 冒泡阶段：从目标元素向最顶层传播

事件冒泡是 IE 的事件流，事件由具体的元素开始触发，然后逐级向上传播，而事件捕获是网景公司提出的，和 IE 的事件流正好相反。直到 W3C 发布标准后，浏览应该同时支持两种调用顺序，首先从捕获阶段开始到目标阶段，再由目标阶段到冒泡阶段结束，这就是所谓的**先捕获再冒泡**

::: tip
几乎所有的事件都会冒泡，但有些例外，比如`focus`
:::

冒泡是默认的事件流，但是可以设置`addEventListener(eventType, handler, true)`第三个参数为`true`变为捕获阶段

::: demo 事件捕获

```html
<div id="foo">
  foo
  <div id="bar">
    bar
    <div id="qux">qux</div>
  </div>
</div>
```

```js
let foo = document.querySelector('#foo');
let bar = document.querySelector('#bar');
let qux = document.querySelector('#qux');

foo.addEventListener('click', () => {
  alert('我是 foo');
}, true);

bar.addEventListener('click', () => {
  alert('我是 bar');
}, true);

qux.addEventListener('click', () => {
  alert('我是 qux');
}, true);
```

```css
div {
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

## 阻止事件

在 HTML 中有些元素默认有些事件，比如`<a>`标签的跳转和表单的提交按钮跳转，如果想要`<a>`标签仅仅作为一个普通的按钮，不想进行页面的跳转，也不想进行锚点定位，可以有以下几种方法：

```html
<!-- 方法一 -->
<a href="javascript:;">链接</a>
```

```html
<!-- 方法二 -->
<a href="https://jinqiu.wang">链接</a>
<script>
  document.querySelector('a').onclick = function () {
    return false;
  }
</script>
```

```html
<!-- 方法三 -->
<a href="https://jinqiu.wang">链接</a>
<script>
  document.querySelector('a').onclick = function (e) {
    e.preventDefault();
  }
</script>
```

+ `e.preventDefault()`可以阻止默认事件行为，但不能阻止冒泡
+ `e.stopPropagation()`可以阻止事件传播，但不能阻止默认事件行为
+ `e.stopImmediatePropagation()`不仅可以阻止事件传播，也能阻止元素同类型事件的其他处理函数触发

对于`on<event>`这种处理程序只需要返回一个`false`也能够阻止行为发生，也意味着阻止传播，对于一些其他的处理程序来说，返回`false`并没有什么意义

有一些事件是可以相互转换的，如果阻止了前一个事件就不会出发第二个时间，比如`<input>`的`mousedown`会导致其获得焦点从而触发`focus`事件，阻止了`mousedown`就不会触发焦点了

```html
<input type="text" value="jinqiu.wang" onfocus="this.value=''">
<input type="text" value="jinqiu.wang" onmousedown="return false;" onfocus="this.value=''">
```

::: demo 后续事件的阻止

```html
<p>获得焦点</p>
<input type="text" value="jinqiu.wang" onfocus="this.value=''">
<p>无法获得焦点</p>
<input type="text" value="jinqiu.wang" onmousedown="return false;" onfocus="this.value=''">
```

:::

`addEventListener`的可选项`passive: true`可以表示事件处理永远都不会调用`preventDefault()`，因为它能明显的改善页面的滚动性能，这是因为用户在屏幕上移动会导致页面滚动，`preventDefault()`正好也能阻止滚动行为，因此一些事件监听在处理滚动时可能会阻止浏览器的主线程，导致 UI 变得卡顿或抖动，一旦设置`passive: true`就会告诉浏览器永远不会调用`preventDefault()`

> [使用_passive_改善的滚屏性能](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD)

对于默认行为来说，有一个专门的`e.defaultPrevented`属性用来表示它，为`true`时表示已经被阻止，可以用来通知其它事件，表示该事件已经被处理

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>

<script>
  document.querySelector('button').oncontextmenu = function (e) {
    e.preventDefault();
    alert('按钮上下文菜单');
  }
  document.querySelector('div').oncontextmenu = function (e) {
    e.preventDefault();
    alert('容器级上下文菜单');
  }
</script>
```

::: demo 产生冒泡

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>
```

```js
document.querySelector('button').oncontextmenu = function (e) {
  e.preventDefault();
  alert('按钮级上下文菜单');
}

document.querySelector('div').oncontextmenu = function (e) {
  e.preventDefault();
  alert('容器级上下文菜单');
}
```

:::

这个示例使用了`e.preventDefault()`阻止了鼠标右击时响应浏览器上下文菜单的默认事件，但是点击`button`时会冒泡到上一级，所以得到了两个菜单，临时解决方案是使用`e.stopstopPropagation()`阻止冒泡

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>

<script>
  document.querySelector('button').oncontextmenu = function (e) {
    e.preventDefault();
    // 阻止按钮事件冒泡
    e.stopstopPropagation();
    alert('按钮上下文菜单');
  }
  document.querySelector('div').oncontextmenu = function (e) {
    e.preventDefault();
    alert('容器级上下文菜单');
  }
</script>
```

::: demo 阻止冒泡

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>
```

```js
document.querySelector('button').oncontextmenu = function (e) {
  e.preventDefault();
  e.stopstopPropagation();
  alert('按钮级上下文菜单');
}

document.querySelector('div').oncontextmenu = function (e) {
  e.preventDefault();
  alert('容器级上下文菜单');
}
```

:::

这样便解决了对每个元素进行单独响应的逻辑，但是却有一个非常不好的地方，那就是永远的拒绝了使用右键单击的路，代价非常大，因此另一个方案是检查一下`document`处理程序是否阻止了浏览器的默认行为，如果这个事件得到了处理，无需再次对这个事件进行响应，因此`e.defaultPrevented`登场了

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>

<script>
  document.querySelector('button').oncontextmenu = function (e) {
    e.preventDefault();
    // 阻止按钮事件冒泡
    // e.stopstopPropagation();
    alert('按钮上下文菜单');
  }
  document.querySelector('div').oncontextmenu = function (e) {
    // 根据默认行为状态来处理
    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();
    alert('容器级上下文菜单');
  }
</script>
```

::: demo defaultPrevented

```html
<div>
  <p>容器级上下文菜单</p>
  <button>按钮级上下文菜单</button>
</div>
```

```js
document.querySelector('button').oncontextmenu = function (e) {
  e.preventDefault();
  alert('按钮级上下文菜单');
}

document.querySelector('div').oncontextmenu = function (e) {
  if (e.defaultPrevented) {
    return;
  }
  e.preventDefault();
  alert('容器级上下文菜单');
}
```

:::

## 事件委托

事件委托也叫事件代理，指的是目标元素并不处理事件，而是由父元素来处理，利用了事件冒泡机制和事件产生的事件对象来实现。这种方式减少了事件注册，节省了大量的内存，还可以为新增的子元素实现动态的事件绑定

```html
<body>
  <div id="father">
    <h1>子元素 1</h1>
    <p>子元素 2</p>
    <span>子元素 3</span>
  </div>
  <script>
    father.addEventListener('click', event => {
      if (event.target.nodeName === 'H1'){
        console.log('子元素1');
      } 
      if (event.target.nodeName === 'P'){
        console.log('子元素2');
      }
      if (event.target.nodeName === 'SPAN'){
        console.log('子元素3');
      }
    });
  </script>
</body>
```

::: demo 事件委托

```html
<div>
  <h1>子元素1</h1>
  <p>子元素2</p>
  <span>子元素3</span>
</div>
```

```js
document.querySelector('div').addEventListener('click', event => {
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

::: demo 树形菜单练习

```html
<ul class="tree" id="tree">
  <li><span>一</span>
    <ul>
      <li><span>1</span>
        <ul>
          <li>(1)</li>
          <li>(2)</li>
          <li>(3)</li>
          <li>(4)</li>
        </ul>
      </li>
      <li><span>2</span>
        <ul>
          <li>(1)</li>
          <li>(2)</li>
          <li>(3)</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><span>二</span>
    <ul>
      <li><span>1</span>
        <ul>
          <li>(1)</li>
          <li>(2)</li>
        </ul>
      </li>
      <li><span>2</span>
        <ul>
          <li>(1)</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

```js
let tree = document.querySelector('#tree');
tree.addEventListener('click', event => {
  if(event.target.nodeName === 'SPAN') {
    event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
  }
});
```

```css
.tree span:hover {
  color: red;
  cursor: pointer;
  font-weight: 600;
}
```

:::

## 事件构造器

HTML 中不仅提供了很多内建事件，还提供了一个事件构造器`Event(type, otiions)`来生成用于自身目的而创建的全新事件，也可以生成`click`这种内置的事件，它有两个参数：

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
elem.addEventListener('hello', event => {
  console.log('hello');
})

// 构造自定义事件 hello
let event = new Event('hello');

// 触发自定义事件
elem.dispatchEvent(event);
```

## 自定义事件

对于全新的事件类型应该使用`CustomEvent`，它和`Event`没什么太多的不同，只有一点不一样，第二参数额外多了一个属性`detail`，这个属性可以传递任何自定义的信息

```html
<body>
  <button id="btn">点击我</button>
  <script>
    btn.addEventListener('foo', event => {
      console.log(event.detail); // {name: "foo"}
    });
    btn.dispatchEvent(new CustomEvent('foo', {
      detail: { name: 'foo' }
    }));
  </script>
</body>
```

## 事件的同步处理

事件是在队列中进行处理的，如果在一个事件处理过程中又触发了一个事件，那么它的处理程序会被排入队列中等待前一个事件处理完成

```html
<button id="btn">点击我</button>

<script>
  btn.onclick = function() {
    alert(1);
    btn.dispatchEvent(new CustomEvent('btn-click'));
    alert(2);
  };

  btn.addEventListener('btn-click', () => alert('btn-click handler'));
</script>
```

::: demo 同步处理的事件

```html
<button>点击我</button>
```

```js
let button = document.querySelector('button');
button.onclick = function() {
  alert(1);
  button.dispatchEvent(new CustomEvent('button-click'));
  alert(2);
};

// 在 1 和 2 之间触发
button.addEventListener('button-click', () => alert('button-click handler'));
```

:::

如果在某些情况下，这个事件是可以冒泡的，那么它将广播到`document`上，沿途触发的事件同样会被同步的方式处理，这可能不是想要的结果，最好优先处理自己的事件，只要将这个事件移动到优先处理的事件后面或者将它变成异步的事件来解决它

```html
<button>点击我</button>

<script>
  let button = document.querySelector('button');
  button.onclick = function() {
    alert(1);
    // 异步触发
    setTimeout(() => button.dispatchEvent(new CustomEvent("button-click", { bubbles: true })));
    alert(2);
  };

  button.addEventListener('button-click', () => alert('button-click handler'));
</script>
```

::: demo 异步处理的事件

```html
<button>点击我</button>
```

```js
let button = document.querySelector('button');
button.onclick = function() {
  alert(1);
  setTimeout(() => button.dispatchEvent(new CustomEvent("button-click", { bubbles: true })));
  alert(2);
};

button.addEventListener('button-click', () => alert('button-click handler'));
```

:::

## 防抖和节流

由于用户和界面交互的太平凡，如果每一次发生的事件都要执行，就会造成性能下降，比如点了两下按钮，实际上这是误触，对应的处理函数不应该触发两次，防抖和节流就是应运而生的两种方案

+ 防抖指事件发生的一定时间段只触发一次处理函数，一旦在一定的时间段内触发，则会重新计算时间再触发处理函数
+ 节流指的是连续触发事件但是在 n 秒中只执行一次函数

下面是使用`mousemove`的例子，当鼠标在上面移动时数字会增加，第一个没有进行处理，第二个使用防抖处理，第三个使用节流处理

::: demo 防抖和节流

```html
<div class="box">0</div>
<div class="box">0</div>
<div class="box">0</div>
```

```css
.box {
  display: inline-block;
  width: 200px;
  height: 150px;
  background-color: #666;
  text-align: center;
  line-height: 150px;
  color: #fff;
  font-size: 20px;
}
```

```js
let divs = document.querySelectorAll('.box');

divs[0].addEventListener('mousemove', event => {
  divs[0].textContent = Number(divs[0].textContent) + 1;
});

// 防抖
function debounce(func, delay) {
  let timeout;
  return function (args) {
    if (timeout) clearTimeout(timeout);
    let flag = !timeout;
    timeout = setTimeout(() => timeout = null, delay);
    if (flag) func.apply(this, args);
  }
}

// 节流
function throttle(func, delay) {
  let timeout;
  return function (args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, delay);
    }
  }
}

let debounceHandle = debounce(() => divs[1].textContent = Number(divs[1].textContent) + 1, 500);
divs[1].addEventListener('mousemove', event => {
  debounceHandle();
});

let throttleHandle = throttle(() => divs[2].textContent = Number(divs[2].textContent) + 1, 500);
divs[2].addEventListener('mousemove', event => {
  throttleHandle();
});
```

:::

防抖和节流都是通过减少实际处理函数的执行来提高性能的手段，但并没有实质的减少事件的触发次数

先来看防抖函数的实现思路，将一个需要进行防抖的操作放到函数中执行，使用防抖函数进行装饰并返回装饰后的函数，在内部定义一个变量记录定时器的返回值，此时已经产生了闭包，该变量永远存在，通过对定时器的返回值进行判断，标记一个可用来执行实际操作函数的变量，便是基本的实现思路，该函数是一个立即执行的防抖函数

```js
function debounce(func, delay) {
  let timeout;
  return function (args) {
    // 如果有返回值就清除该定时器，重新计时，让 timeout 不为 null
    if (timeout) clearTimeout(timeout);
    // 标记，关系着实际操作的运行
    let flag = !timeout;
    // 在一定 delay 时间后，将 timeout 赋值为 null
    timeout = setTimeout(() => timeout = null, delay);
    // 一旦 timeout 判断为 false 时，flag 一定为 true，此时开始执行实际操作
    if (flag) func.apply(this, args);
  }
}
```

再来看节流函数的实现思路，依然是装饰器加闭包的定时器原理来实现

```js
function throttle(func, delay) {
  let timeout;
  return function (args) {
    // 如果 timeout 取反判断为 true，则执行一次实际操作
    if (!timeout) {
      timeout = setTimeout(() => {
        // 在一定 delay 时间设置 timeout 为 null，让下一次事件触发实际操作
        timeout = null;
        func.apply(this, args);
      }, delay);
    }
  }
}
```

## 鼠标事件

鼠标左键被按下时，会首先触发`mosedown`，左键被释放后，会触发`mouseup`和`click`，在单个动作触发多个事件时，事件的顺序是固定的

与点击相关的事件都会有`button`属性，这个属性允许获得确切的鼠标按钮，通常不在`click`和`contextmenu`事件中使用这个属性，因为它们分别只能被鼠标左键和右键所触发

只有在`mousedown`和`mouseup`事件中才会用到这个属性，因为这两个事件会在任何按键上触发，对于`event.button`的值可能如下：

按键状态|event.button
---|---
左键|0
中键|1
右键|2
后退键|3
前进键|4

::: tip
大多数鼠标只有左键和右键
:::

::: demo event.button

```html
<button>点击我</button>
```

```js
let button = document.querySelector('button');
button.addEventListener('click', event => {
  alert(event.button);
});
button.addEventListener('mousedown', event => {
  alert(event.button);
});
button.addEventListener('mouseup', event => {
  alert(event.button);
});
```

:::

甚至，所有的鼠标事件都包含按下的组合键的信息：

+ `shiftKey`：Shift 键
+ `altKey`：Alt 键
+ `ctrlKey`：Ctrl 键
+ `metaKey`：Win 键

如果在鼠标事件期间按下了对应的键，则它的值为`true`，比如下面的示例中，按下三个键（Ctrl，Shift，Alt）才会触发弹框

::: demo 组合键

```html
<button>点击我</button>
```

```js
let button = document.querySelector('button');
button.addEventListener('click', event => {
  if(event.shiftKey & event.ctrlKey & event.altKey) {
    alert('三键合璧，天下无敌');
  }
});
```

:::

所有的鼠标事件对象都提供了两种形式的坐标：

+ 相对于窗口：`clienX`和`clienY`
+ 相对于文档：`pageX`和`pageY`
+ 相对于元素：`offsetX`和`offsetY`
+ 相对于屏幕：`screenX`和`screenY`

::: demo 鼠标坐标

```html
<input onmousemove="this.value=event.clientX + ', ' + event.clientY" value="移动鼠标测试坐标">
```

:::

有时候双击鼠标会有一些副作用，可能会出现选择文本的干扰

::: demo 双击事件并选择文本

```html
<div ondblclick="alert('double click')">双击我</div>
```

:::

甚至有时按下不松开并移动鼠标也会造成文本选择的干扰，为了避免这些情况，最合理的方法是在`mousedown`上进行处理

::: demo 双击事件并不选择文本

```html
<div ondblclick="alert('double click')" onmousedown="return false">双击我</div>
```

:::

这里虽然解决了问题，但是文本却无法被选中了，其实并不是无法选中，而是要在文本本身以外的地方开始选中，从文本本身开始选中时自然会失效

如果想要保护页面的内容不被复制，可以使用`copy`事件来处理，对于开发者来说，肯定是可以打开调试工具来访问源码进行复制，但是大多数人是不知道的

::: demo copy 事件

```html
<div oncopy="alert('当然，你是不可能复制成功的');return false">这里的内容是被禁止复制的</div>
```

:::

当鼠标从元素身上移动时就会触发对应的移动事件，移动到某个元素上时就会触发`mouseover`，而离开某个元素时就会触发`mouseout`

这些事件都有一个特殊的`relatedTarget`属性，这是对`target`的补充。当从一个元素是上离开到另一个元素时，其中一个元素就是`target`，另一个就变成了`relatedTarget`，对于`mouseover`和`mouseout`来说，`target`和`relatedTarget`是互相相反的

::: tip
`relatedTarget`的取值是可能为`null`的，不一定总是页面上的某个元素的引用，鼠标如果来自窗口外，或者离开了窗口，就会产生这种现象，因此对于`relatedTarget`要记住这个特性，以免发生错误
:::

`mousemove`用来响应鼠标移动的事件，浏览器会一直检查鼠标的位置，如果发现了变化，就会触发`mousemove`，但是这并不意味着每一个像素变化都会触发，如果在非常快速地情况下移动鼠标，某些元素就很有可能被跳过，这对性能有很大的好处，并不需要在每个元素上处理进入和离开的过程

还有一个特别重要的特性就是，快速移动鼠标的情况下，元素可能被忽略掉，如果正式的进入了一个元素产生了`mouseover`，那么必然会产生一个`mouseout`

还有一个触发`mouseout`的地方就是出现在嵌套元素的身上，当鼠标从元素移动到后代时就会触发，其实指针并没有移出元素之外，但是在后代元素上触发了这个事件

这是因为浏览器的逻辑是，指针随时都可以位于单个元素上，如果是嵌套元素就一定是`z-index`最大的那个，因此移动到另一个后代元素，代表着离开了当前元素

此外，还有一个非常重要的细节，后代的`mouseover`会冒泡，因此父级元素如果有`mouseover`处理程序也会被触发，这可能不是一个好现象，因为指针仍然在父元素内，只不过更深入了而已

`mouseenter/mouseleave`和`mouseover/mouseout`相同，但是它们有一些重要的区别：

+ 元素内部与后代之间的转换不会受到影响
+ 不会冒泡

这非常好，只有进入一个元素时才会触发`mouseenter`，而鼠标在当前元素以及后代中的位置并不重要，只有当真正移出元素范围时才触发`mouseenter`，但是它们无法作用于事件委托，这也是一个不好的方面

这是使用`mouseover/mouseout`进行事件委托的表格高亮示例

::: demo 事件委托的应用

```html
<table>
  <tr>
    <td>1</td>
    <td>2</td>
  </tr>
  <tr>
    <td>3</td>
    <td>4</td>
  </tr>
</table>
```

```js
let table = document.querySelector('table');

table.onmouseover = function (e) {
  console.log(e.target);
  e.target.style.background = 'pink';
}

table.onmouseout = function (e) {
  e.target.style.background = '';
}
```

```css
table td {
  border: 1px solid #000;
  width: 150px;
  text-align: center;
  cursor: pointer;
}
```

:::

## 键盘事件

需要处理键盘行为时，就应该使用键盘事件，当按下时会触发`keydown`事件，而当释放按键时触发`keyup`事件

对于键盘事件对象来说，可以通过`key`来获取字符，而`code`属性允许获取物理上的按键代码

::: demo 键盘事件上的信息

```html
<p>key：<br>code：</p>
<input type="text">
```

```js
document.querySelector('input').onkeydown = function (e) {
  document.querySelector('p').textContent = 'key：' + e.key + '，code：' + e.code;
}
```

:::

如果使用不同的语言，只会导致`key`的值不一样，而`code`则始终是一样的，如果某些键没有产生字符，则`key`和`code`大致是一样的

对于一个按键如果按下足够长的时间，会一直触发`keydown`，然后释放时才转到`keyup`，对于重复触发的事件来说，事件对象的`repeat`将被设置为`true`

键盘可能会触发一些不可控的变数，比如`Ctrl+S`会保存网页，但是阻止`keydown`便能阻止它，因此可以阻止大多数键盘的行为，除了少数按键以外，比如`Alt+F4`，在 Windows 上用来关闭窗口

## 滚动事件

`scroll`事件能够对页面或元素的滚动作出反应，这是一个示例：

::: demo scroll

```html
<p>当前窗口已滚动的像素：<span>0 px</span></p>
```

```js
window.onscroll = function(e) {
  document.querySelector('span').textContent = window.pageYOffset + 'px';
}
```

:::

不能在`scroll`事件中使用`e.preventDefault()`来阻止滚动，启动滚动的方法有很多种，但是使用 CSS 的`overflow`会更加可靠一些

滚动有以下应用场景：

+ 无限的页面
+ “到顶部”以及“到底部”的按钮
+ 按需加载图像

## 表单事件

表单和一些其它的控件元素有很多特殊的事件，对于文档中的表单来说，它们是`document.forms`的成员，因此可以使用这种方式来获取文档上的表单，且当有了表单后，其中的任何元素都可以使用`form.elements`来获取

```html
<form name="foo">
  <input type="text" name="one">
</form>
<script>
  let foo = document.forms.foo;
  let input = foo.elements.one;
</script>
```

值得一提的是，当为表单或其中的控件元素添加`name`特性后，便可以在`forms`和`elements`中直接使用`name`对应的值作为属性来引用，而不必使用一些其它的方法来定位元素

当然也可能会出现名字相同的元素，比如在单选按钮中，在这种情况下，`elements.name`将是一个集合

```html
<form name="foo">
  <input type="radio" name="gender">
  <input type="radio" name="gender">
</form>
<script>
  let foo = document.forms.foo;
  let inputs = foo.elements.gender;
  console.log(inputs); // RadioNodeList(2)
</script>
```

甚至可以通过更短的方式来访问元素，直接将`form.elements.name`写成`form.name`是等效的

```html
<form name="foo">
  <input type="text" name="one">
</form>
<script>
  let foo = document.forms.foo;
  console.log(foo.elements.one == foo.one); // true
</script>
```

每一个对应的元素都可以反向的引用其对应的表单，使用`form`属性

```html
<form name="foo">
  <input type="text" name="one">
</form>
<script>
  let foo = document.forms.foo;
  let one = foo.one;
  // 反向引用
  console.log(one.form == foo); // true
</script>
```

对于`<input>`来说，访问不同的`type`的`value`有所不同：

+ type = `text`：`value`
+ type = `radio`：`checked`（布尔值）

对于`<textarea>`也是使用`value`来访问

对于`<select>`来说有三个重要的属性：

+ `options`：所有的`<option>`的集合
+ `value`：当前所选择的`<option>`的`value`
+ `selectedIndex`：当前所选择的`<option>`索引编号

其中有三种方式来设置`value`：

+ 将对应`<opition>`元素的`selected`设为`true`
+ 将`<select>`的`value`设置为对应`<option>`的`value`
+ 将`<select>`的`selectedIndex`设置对应`<option>`的索引编号

当点击某个元素或使用键盘上的`Tab`选中时，该元素会获得聚焦，在 HTML 中有一个`autofocus`特性会让网页在加载完成后默认的聚焦到元素上，聚焦意味着一个元素可以接受数据，当失去焦点的时候意味着数据已经输入完毕

当元素聚焦时会触发`focus`事件，当失去焦点时会触发`blur`事件

::: demo 焦点事件

```html
<p>没有任何元素获得焦点</p>
<input type="text">
```

```js
document.querySelector('input').onfocus = function (e) {
  document.querySelector('p').textContent = '获得焦点'
};

document.querySelector('input').onblur = function (e) {
  document.querySelector('p').textContent = '失去焦点'
};
```

:::

焦点也会有丢失现象发生，比如`alert`会将焦点移到自己身上，那么另一个已经获得焦点的元素将失去焦点并触发`blur`，或者一个元素从 DOM 中移除，也会导致焦点丢失

大多数元素并不支持聚焦，因为它们本身并不需要接受数据，但是 HTML 特性`tabindex`可以适用到这些不支持`focus/blur`的元素身上，任何具有`tabindex`的元素都会变成可聚焦的：

+ `tabindex`接收一个负值，表示是可聚焦的，但不能通过键盘导航来访问该元素
+ `tabindex`接收`0`，表示是可聚焦的，可以通过键盘导航来访问该元素，但是顺序是与当前处于文档中的顺序来决定的
+ `tabindex`接收一个正值，表示是可聚焦的，可以通过键盘导航来访问该元素，但是它的访问顺序是按照`tabindex`的数值递增来决定获得焦点的顺序，如果拥有相同的数值，则按照在文档中的顺序来决定

::: demo tabindex

```html
<div tabindex="1">1</div>
<div tabindex="0">0</div>
<div tabindex="2">2</div>
<div tabindex="-1">-1</div>
```

```js
```

```css
div {
  cursor: pointer;
}
:focus {
  outline: 1px dashed red;
}
```

:::

`focus/blur`不支持事件冒泡，但是支持事件捕获，如果一定需要冒泡的需求，可以使用`focusin/foucusout`事件，它们和`focus/blur`完全一样，但是只能使用`addaddEventListener`处理

另外，可以使用`document.activeElement`来获取当前聚焦元素

在进行表单提交时，会触发`submit`事件，提交表单有两种方式：

+ 在`<input>`中按下`Enter`
+ 点击`<input type="submit">`或`<input type="image">`

::: demo submit 事件

```html
<form name="foo">
  <input type="text">
  <input type="image">
  <input type="submit" value="提交">
</form>
```

```js
document.querySelector('form').onsubmit = function (e) {
  alert('submit 触发了');
  return false;
};
```

:::

在`submit`中使用`return false`会阻止表单发送，有趣的是使用`Enter`发送表单时，会触发`<input type="submit>`一次`click`事件，真很有趣

如果要手动将表单提交到服务器，可以调用`form.submit`方法，它不会产生`submit`事件，会向`form.action`的值所指向的服务器进行`form.method`方式提交

## 数据更新事件

对于元素来说，产生的更改也会触发相应的事件

+ `change`
+ `input`

`change`事件可以在`<input>`失去焦点后触发，但是数据状态必须已经发生改变

::: demo 失去焦点

```html
<input type="text" onchange="alert(this.value)">
```

:::

对于`<select>`，以及`<input>`的`type`为`checkbox/radio`时，会在选项更改后立即触发

还有一个`input`事件只要监测到数据改变了就会触发，无论是键盘上的数据，还是鼠标粘贴等改变数据的操作，如果想要处理输入值的每次更改，这个事件是最好的选择，另外，该事件不会在不涉及值更改的输入上触发，比如方向键

## 剪切板事件

剪切板是界面中最常用的操作之一，IE 是最早支持的，随着 HTML5 到来，剪切板事件已经纳入了标准

剪切板事件是当发生复制/粘贴/剪切操作时触发的事件，分别是`copy`，`paste`，`cut`

::: demo 剪切板事件

```html
<input type="text" oncopy="alert(event.type)" onpaste="alert(event.type)" oncut="alert(event.type)">
```

:::

如果想要访问剪切板上的数据，可以使用`ClipboardEvent`类的方法，比如`event.clipboardData.getData('text/plain')`用于获取对应的数据

::: demo 访问数据

```html
<input type="text" onpaste="alert(event.type + ':' + event.clipboardData.getData('text/plain'))">
```

:::

`event.clipboardData`可以读写剪切板中的数据，但是在规范中有很多方法可以用于不同的数据类型，而不仅仅是文本

要访问剪切板中的数据，可以通过 clipboard 对象，它由 navigator.clipboard 返回，所有的操作都通过这个对象进行

由于用户可能会将敏感数据放在剪切板，涉及到浏览器外的操作系统，所以这个 API 的安全限制比较多，调用的时候必须明确获得用户的许可，“写入权限”会自动授予，但是“读取权限”必须被明确授予，也就是说在进行读取操作的时候，浏览器会弹一个对话框询问用户是否同意

clipboard 提供了四个方法用于读写剪切板，他们都是异步方法，返回 promise 对象

+ readText() 用于读取剪切板中的文本信息

```js
navigator.clipboard.readText();
```

+ read() 读取剪切板中的数据，可以是文本也可以是二进制

```js
navigator.clipboard.read();
```

## 文档事件

HTML 有三个非常重要的生命周期事件：

+ `DOMContentLoaded`：已经完全加载了 HTML，并构建了 DOM 树，但是图像、样式表之类的外部资源可能没有加载完成
+ `load`：不仅加载完了 HTML，还加载完了所有的外部资源
+ `beforeunload/unload`：当用户离开页面时

`DOMContentLoaded`事件发生在`document`身上，必须使用`addEventListener`来处理它，`DOMContentLoaded`可以在文档加载完毕后触发，所以在这里可以访问任何元素，包括`<img>`，但是它不会等待图片加载，此时无法访问图片的大小

如果文档在加载的时候遇到了`<script>`，就会等待这个脚本执行完成后继续加载，因为脚本可能需要修改 DOM，所以`DOMContentLoaded`会等待它执行结束，这说明脚本会堵塞文档的加载

虽然`DOMContentLoaded`不会等待外部样式表，但是如果样式表后有一个脚本，那么脚本会等待样式表加载完成，同时 HTML 在等待脚本以及前面的样式表加载完成，因为脚本可能会访问一些样式相关的属性，这导致脚本必须等待

当整个页面的资源被加载完成后，包括图片，外部样式等，才会触发`window`上的`load`事件，如果绑定到元素上会在元素加载完成后触发，`window.onload`始终是最后触发的

当离开了这个页面就会触发`unload`，通常用来关闭页面的时候去做些什么事情，比如发送一些数据，但是由于页面已经被卸载，所有就无法接收响应，同时一些弹框方法也是失效的，但是如果在这里处理一些同步的的操作就会导致关闭会有延迟，而`beforeunload`则可以在页面离开前提示用户是否确定离开，相比`unload`多了一个确认的步骤，`beforeunload`会阻止`unload`事件的执行，并且优先执行

如果想在页面关闭时发送数据，可以使用`navigator.sendBeacon(url, data)`方法，它会在后台发送数据，即使离开了页面也不会影响它的执行，请求方式是 POST，通常可以发送一些字符串化的对象

对于文档的加载状态是有迹可循的，`document.readyState`反映了文档的加载状态：

+ `loading`：正在加载中
+ `interactive`：文档已经加载完成
+ `complete`：文档中的所有资源均加载完成

还有一个`readystatechange`事件，会在状态改变时触发

```js
console.log(document.readyState); // 'loading'
document.addEventListener('readystatechange', function (e) {
  console.log(document.readyState); // 'interactive' ,,, 'complete'
})
```

## 加载脚本

现在的脚本往往比 HTML 本身更大，处理的时间更加久，上面说过脚本会堵塞页面的加载，对于外部的脚本来说也是如此，必须等待下载完，并执行结束后才能继续加载文档，这会导致一些问题：

+ 脚本不能访问身后的文档元素
+ 如果有一个非常笨重的脚本，会严重的堵塞页面的加载，造成体验问题

对于这种问题的解决办法是将脚本置于文档底部，这时就可以处理页面上的元素，而且不会堵塞页面

```html
<body>
  <!-- 所有的文档内容 -->
  <!-- ...... -->
  <script></script>
</body>
```

但这不是最完美的，如果文档非常长，脚本被延后到最后处理，会产生明显的延迟，对于网速较快的人来说感知不明显，但是对于慢网速的人来说就有点难受

但是`script`有两个特性可以解决这个问题：

+ `defer`：告诉浏览器不需要等待脚本，继续处理文档，脚本会在旁边自动下载，等待文档处理完成后才会执行，并且保持相对顺序的依次执行，这对于需要依赖的脚本有用
+ `async`：告诉浏览器不需要等待脚本，继续处理文档，但是`async`脚本之间没有顺序可言，当下载完后就立即执行了，是一个完全独立运行的脚本

`DOMContentLoaded`事件会在`defer`脚本全部执行完后，才会触发，对于`async`脚本来说，它可能先触发也可能后触发

::: tip
`defer`仅适用于具有`src`属性的外部脚本，否则就会忽略`defer`
:::

除此之外有一个动态添加脚本的方式，就是使用 JavaScript 动态的创建一个脚本，并追加到文档中，当被追加到文档后就会立即执行，此时这个脚本：

+ 是异步的，不会等待其它东西，也不会有东西等待它
+ 先加载完成的脚本先执行

```js
let script = document.createElement('script');
script.src = 'jinqiu.wang/foo.js';
document.body.append(script);
```

对于这种脚本的创建方式，必须等到加载完成后才能调用其中的函数，但是还好`load`事件能够帮助我们，它会在脚本加载完成后触发，因此可以使用脚本中的变量、函数等等

如果一个脚本加载失败了，会触发一个`error`事件，对于失败信息无法获取更多，只能通过这种方式知道脚本加载失败了

`load`和`eroor`事件也适用于其它具有`src`属性的外部资源

::: tip
对于`<img>`来说，必须获得`src`才能够被开始加载，而`<ifrma>`不管加载成功还是失败都会触发`load`事件
:::

## 触摸事件

## 全屏

如果想要以全屏的方式展示一个元素，可以调用`elem.requestFullscreen()`方法，同样使用`document.exitFullscreen()`来退出全屏，对于用户来说也可以使用自己的方式来退出（F11 或 ESC）

全屏和退出全屏都会触发一次`fullscreenchange`事件

`document.fullscreenElement`可以获取全屏元素，以此来判断是否为全屏状态

::: tip
无法在网页加载后立即进入全屏状态，必须在事件处理中调用
:::

## 页面可见

## 服务端事件

[https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events)

<!-- more -->
<!-- to b e updated -->

## 振动
