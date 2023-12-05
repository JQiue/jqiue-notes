---
title: 一些 CSS 属性
category: Web
tag: [CSS]
article: false
---

::: info 前置知识

+ HTML
:::

## 字体样式

通过`font-*`属性来规定字体的样式

::: normal-demo font

```html
<span style="font-style:normal;">默认</span>
<span style="font-style:italic;">倾斜</span>
<span style="font-weight:lighter;">细线</span>
<span style="font-weight:bold;">加粗</span>
<span style="font-weight:900;">加粗</span>
<span style="font-weight:bolder;">更粗</span>
<span style="font-size:18px;">大小 18px</span>
<span style="font-size:20px;">大小 20px</span>
<span style="font-family:'宋体'">宋体</span>
```

:::

::: tip font-weight 的取值
取值不仅可以是单词，也可以是 100~900 之间的整百数字
:::

::: tip bolder
文字的粗细是有极限的，所以 bold 和 bolder 看起来差不多，和用户电脑安装的字体有关系
:::

::: tip px
px 是一种尺寸单位，在浏览器中字体的默认大小为 16px
:::

::: warning font-family
如果取值是中文需要用单或双引号，设置的字体必须是用户电脑已安装的字体，如果没有就会使用默认的字体。取值是可以写多个的，通过逗号分隔，相当于给字体添加备选方案
:::

::: tip 中英文字体分别设置
对于英文字体来说是处理不了中文的，而中文字体是可以处理英文字体的。只要将英文字体写在中文字体前就可以实现分别设置字体
:::

这些属性都可以直接通过`font`来简写，取值之间使用空格分隔，不需要写出所有的取值，但必须按照顺序

::: normal-demo font 简写形式

```html
<p style="font: italic bold 18px '楷体'">简写形式</p>
```

:::

## 文本

`text-decoration`可以设置文本的一些装饰样式

::: normal-demo text-decoration

```html
<span style="text-decoration:overline">上划线</span>
<span style="text-decoration:underline">下划线</span>
<span style="text-decoration:line-through">删除线</span>
<a style="text-decoration:none">none</a>
```

:::

`text-align`可以规定文本的水平对齐方式

::: normal-demo text-align

```html
<p style="text-align:right">左对齐</p>
<p style="text-align:left">右对齐</p>
<p style="text-align:center">居中</p>
```

:::

`text-indent`可以控制文本的首行缩进距离

::: normal-demo text-indent

```html
<p style="text-indent:2em">当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。</p>
```

:::

::: tip em
em 是一种相对尺寸的单位，1em 默认为父元素的字体大小
:::

+ `word-spacing`控制英文单词之间的间距，对中文无效
+ `letter-spacing`控制字符之间的间距，中英文都有效

::: normal-demo 间距

```html
<p>wjq is me</p>
<p style="word-spacing:5px;letter-spacing:5px;">wjq is me</p>
```

:::

### 颜色

`color`属性可以改变文本的颜色

::: normal-demo color

```html
<span style="color:red">红</span>
<span style="color:green">绿</span>
<span style="color:blue">蓝</span>
```

:::

### 阴影

`text-shadow`可为文本创建阴影效果，参数分别是：水平偏移量、垂直偏移量、模糊半径、颜色

::: normal-demo 阴影

```html
<p>文字阴影</p>
```

```css
p {
  text-shadow: 5px 5px 5px green;
}
```

:::

### 大小写

`text-transform`允许对英语文本的大小写进行控制，可具有一下属性值：

+ `capitalize`：每个单词的首字母大写
+ `uppercase`：全部大写
+ `lowercase`：全部小写

::: normal-demo text-transform

```html
<p>hello, world</p>
<p>hello, world</p>
<p>Hello, World</p>
```

```css
p:nth-child(1) {
  text-transform: capitalize;
}
p:nth-child(2) {
  text-transform: uppercase;
}
p:nth-child(3) {
  text-transform: lowercase;
}
```

:::

### 文本溢出

`text-overflow`用来控制文本溢出时如何显示文本，前提是容器必须设置了`overflow: hidden`，有以下取值：

+ `clip`：在内容区域的极限处截断文本，默认值
+ `ellipsis`：用一个`...`来表示被截断的文本

::: normal-demo text-overflow

```html
<div>
abcdefghijklmnopqrstuvwxyz
</div>
```

```css
div {
  border: 1px solid #000;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

:::

## 垂直对齐

`vertical-align`提供了内联元素的垂直对齐方式，只对内联元素和`table-cell`生效，一般情况下，内容都是基于父元素的基线对齐，而`vertical-align`提供了几个属性来改变对齐方式：

+ `baseline`：默认值，与父元素的基线对齐
+ `top`：对齐行中顶端最高的元素
+ `middle`：居中对齐
+ `bottom`：对齐行中低端最低的元素
+ `text-top`：与文本的顶端对齐
+ `text-bottom`：与文本的地段对齐

## 鼠标指针

一般情况下，都是由浏览器控制鼠标指针的样式的，大多数都是箭头状，指向链接时为手指形状，使用`cursor`属性就可以指定指针停留在元素上的样式

+ `pointer`
+ `wait`
+ `text`
+ `help`

::: normal-demo cursor

```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
</ul>
```

```css
ul li {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  background-color: green;
}
.item1 {
  cursor: pointer;
}
.item2 {
  cursor: wait;
}
.item3 {
  cursor: text;
}
.item4 {
  cursor: help;
}
```

:::

## 过渡

在 CSS3 中，可以在不使用 Flash 或 JavaScript 的情况下，当一个元素从一种样式变成另一种样式时为其添加过渡效果，也就是让元素变化的更加平缓。它必须规定需要过渡的属性和过渡的时长，通过`transition: 过渡的属性，过渡的时间，过渡的时间曲线，过渡的时间延迟`

::: normal-demo transition

```html
<div class="box"></div>
```

```css
.box {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s;
}
.box:hover { 
  width: 200px;
}
```

:::

可以同时过渡多个属性，只需要使用`,`隔开每个过渡的属性

::: normal-demo transition

```html
<div class="box"></div>
```

```css
.box {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s, background 2s;
}
.box:hover {
  width: 200px;
  background: purple;
}
```

:::

延时 2S

::: normal-demo transition

```html
<div class="box"></div>
```

```css
.box {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s 2s, background 2s 2s;
}
.box:hover {
  width: 200px;
  background: purple;
}
```

:::

::: caution
`transition`无法过渡`display`，因为元素会被破坏，如果需要元素在可见和不可见过渡应该使用`visibility`
:::

## 动画

动画和过渡有些类似，但是过渡必须通过其他条件来触发（比如`hover`)，而动画不需要触发手段，并且过渡的可控性较差，只能指定起始和结束的状态，而动画可以定义多个状态

在使用动画属性之前必须先了解 CSS3 中`@keyframes`规则，它的作用是用于创建动画的规则，它有点像选择器一样，不过需要几个关键字来指定动画的行为：`from`，`to`

`from`中定义开始时的样式，`to`中定义结束后的样式，只能定义两个关键帧。但是 CSS3 还提供了百分比的形式来创建更多的关键帧，这样就能更加精确的控制了，创建动画帧后，必须将`name`交给`animation`属性进行播放，`name`必须是合法的标识符

```css
/* from...to... */
@keyframes name {
  from{}
  to{}
}

/* 百分比控制 */
@keyframes name {
  0% {}
  50% {}
  100% {}
}
```

::: normal-demo animation

```html
<div class="box"></div>
```

```css
.box {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  animation: play 2s infinite alternate;
}
@keyframes play {
  from {
    width: 80px;
    background: pink;
  }
  to {
    width: 250px;
    background: purple;
  }
}
```

:::

这是关于`animation`的解释：

| 属性                      | 描述                                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation                 | 所有动画属性的简写属性                                                                                                                             |
| animation-name            | 规定 @keyframes 动画的名称                                                                                                                         |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                                                                                                   |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"。                                                                                                                |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。                                                           |
| animation-delay           | 规定动画何时开始。默认是 0。                                                                                                                       |
| animation-iteration-count | 规定动画被播放的次数。默认是 1，可以使用 "infinite"来无限播放                                                                                      |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"，"reverse"逆向播放，"alternate"奇数次正向偶数次逆向，"alternate-reverse"奇数次逆向偶数次正向，"" |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是 "running"。                                                                                                     |

## Web 字体

很遗憾的是，由于大部分设备预装的字体有限，这使得网页字体只能在有限的字体集中选择，但 CSS 规则`@font-face`为字体创造了很多可能，这使得开发者可以链接任意可用的字体在网页中使用

```css
@font-face {
  font-family: 'wjq';
  src: url(/jinqiu.wang/xxx.ttf);
}

p {
  font-family: 'wjq'
}
```

这一语法定义了一个字体，使用`src`链接一个可用的字体文件，并用`font-family`命名，这样就可以在任意元素中使用命名的字体了

除此之外还有一种特殊的图标字体，并不像传统的字母、数字、标点符号一样，这种字体可以像对待文字那样改变样式

## 高亮

CSS3 新增`::selection`伪元素用于内容被高亮时的样式，只有这些属性可以被使用：

+ color
+ background-color
+ caret-color
+ text-decoration
+ text-shadow
+ cursor
+ outline

::: normal-demo selection

```html
<p>
当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢？我甚至可能改变这个世界。
</p>
```

```css
p::selection {
  color: #fff;
  background-color: red;
}
```

:::

## 流动方向

`direction`用于设置文本的溢出方向，一般情况下都是从左向右的顺序，有以下取值：

+ `ltr`：从左向右，默认值
+ `rtl`：从右向左

::: normal-demo direction

```html
<p>1234</p>
```

```css
p {
  direction: rtl;
}
```

:::

## 滚动条

`::scrollbar`提供了对元素的滚动条样式的控制，不仅如此，还有以下属性可以控制控制条：

+ ::-webkit-scrollbar — 整个滚动条
+ ::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头)
+ ::-webkit-scrollbar-thumb — 滚动条上的滚动滑块
+ ::-webkit-scrollbar-track — 滚动条轨道
+ ::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分
+ ::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分
+ ::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮)

::: normal-demo 滚动条

```html
<div class="box">
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
</div>
```

```css
.box {
  overflow: auto;
  width: 200px;
  height: 60px;
}

.box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2em;
}

.box::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101f1c, 0.1);
  border-radius: 2em;
}

.box::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 1);
  border-radius: 2em;
  transition: all, 0.3;
}
.box::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.8);
}
```

:::

## 平滑滚动

在默认情况下，通过锚点导致的滚动是不够平滑的，这导致页面瞬间闪烁到滚动位置，`scroll-behavior`很好的解决了这个问题，以前甚至需要一些 JavaScript 来进行实现

+ `auto`：立即滚动
+ `smooth`：平滑滚动
