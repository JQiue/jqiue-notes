---
title: 盒模型
category: Web
tags: [Alpha]
author: JQiue
article: false
---

盒模型是 CSS 中非常重要的的概念，关乎元素的尺寸和显示，任何元素都可以看作一个盒子，盒模型仅仅只是一个比喻，一般指那些可以设置宽高/内外边距的元素

![box-model-1](../images/box-model-1.png)

+ 内容（content）：显示内容的地方
+ 边框（border）：环绕在内容和内边距外面一层
+ 内边距（padding）：边框和内容的之间的距离
+ 外边距（margin）：元素与元素之间的距离

## 标准盒模型和 IE 盒模型

标准盒模型也叫 w3c 标准盒模型，如果给元素设置`width`和`height`，设置的是内容宽高，再加上`padding`和`border`一起决定盒子的大小。因为`margin`是不可见区域，所以不会参与计算，它只会影响盒子外部的空间

IE 盒模型又叫怪异盒模型，在这种模型中，`width`和`height`会影响元素的可见区域，所以内容的宽度是宽度减去边框和内边距，盒子的大小并不是标准盒模型中的累加方式

现在浏览器都是使用的标准盒模型，所以想要使用 IE 盒模型，可以为元素添加`box-sizing: border-box`来实现

::: demo 标准盒模型和 IE 盒模型

```html
<div class="box w3cbox"></div>
<div class="box iebox"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border: 5px solid;
  background: pink;
}
.iebox {
  box-sizing: border-box;
}
```

:::

## 宽度和高度

大部分元素都可以设置宽高，宽高的取值可以是固定长度，也可以是百分数，以适应响应式布局，百分数是相对于父元素的宽高来计算的，不仅如此还有最小和最大尺寸`min-width`、`max-width`、`min-height`、`max-height`

## 外边距，内边距，边框

外边距是不可见的部分，作用仅仅是隔开元素之间的距离，当然取值也可以为负，这样盒子就会收缩，`margin`可以控制一个元素的所有边距，也可以单独控制一个边距：

+ `margin-top`
+ `margin-right`
+ `margin-bottom`
+ `margin-left`

::: demo margin 为正

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container{
  border: 2px solid black;
}
.box {
  margin-left: 20px;
  width: 100px;
  height: 100px;
  border: 5px solid;
  background: pink;
}
```

:::

::: demo margin 为负

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container{
  border: 2px solid black;
}
.box {
  margin-left: -20px;
  width: 100px;
  height: 100px;
  border: 5px solid;
  background: pink;
}
```

:::

::: demo margin 设置盒子居中

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  border: 2px solid black;
}
.box {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 5px solid;
  background: pink;
}
```

:::

::: tip
`margin: 0 auto`只能使块级元素居中，不能使内容和内联元素居中。`text-align`只能使内容和内联元素居中，不能使块级元素居中
:::

在两个元素外边距相邻的情况下，将会发生折叠现象，即两个元素之间的距离取决于外边距最大的那个，这仅限于处于垂直方向的元素

::: demo 外边距折叠

```html
<div class="container">
  <div class="box foo"></div>
  <div class="box bar"></div>
</div>
```

```css
.container {
  border: 2px solid black;
}
.box {
  width: 100px;
  height: 100px;
  border: 5px solid;
  background: pink;
}
.foo {
  margin-bottom: 100px;
}
.bar {
  margin-top: 50px;
}
```

:::

::: tip margin-top
如果两个元素是嵌套关系, 设置了子元素的外边距, 父元素也会被子元素外边距顶下来，可以给父元素设置`border`解决
:::

和外边距不同的是，内边距不能为负，内边距通常将内容推离边框，`padding`可以控制四个方向的内边距，也可以使用单独方向的内边距：

+ `padding-top`
+ `padding-right`
+ `padding-bottom`
+ `padding-left`

::: demo 内边距

```html
<div class="box">内容</div>
```

```css
.box {
  padding-left: 20px;
  border: 2px solid;
}
```

:::

边框有大量的属性可以设置，每个边框都可以有自己的样式，宽度和颜色，`border`可以设置四个方向的边框样式，也可以单独设置某个方向的边框样式：

+ `border-top`
+ `border-right`
+ `border-bottom`
+ `border-left`

::: demo 边框

```html
<div class="box"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border-top: 1px solid pink;
  border-right: 2px dotted red;
  border-bottom: 3px dashed blue;
  border-left: none;
}
```

:::

边框也可以通过`border-radius`属性设置成圆角的

::: demo 圆角边框

```html
<div class="box"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border: 5px solid pink;
  border-radius: 20px;
}
```

:::

::: tip
将圆角边框设置成宽高的一半，这个元素就是正圆的
:::

## 显示类型：display

内联元素和块级元素的本质就是`display`属性值不同，内联的取值为`inline`，块级的取值为`block`，同时还可以让一个元素混合显示，具有内联和块级元素的中间状态，取值为`inline-block`时，这元素和其他内容出现同一行，且拥有块级元素的属性

::: demo display: inline-block

```html
<p class="paragraph">当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个<span>世界</span>，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢？我甚至可能改变这个世界。<p>
```

```css
.paragraph span {
  display: inline-block;
  width: 50px;
  height: 60px;
  margin-left: 10px;
  background-color: pink;
}
```

:::

`display`的作用是改变一个元素的显示模式，它可以将元素在“块级”和“内联”之间进行转换，当然它的作用不仅仅如此，还可以设置为`none`，从文档流中完全删除

## 元素的可见性

`visibility`属性的目的是控制元素的可见性，和`display`不同的是，`visibility`隐藏元素时，元素不会被移除，仍然会在文档流中占据位置，取值为`hidden`时不可见，为`visible`时可见

::: demo visibility

```html
<p>This is <span>the</span> paragraph</p>
<p>This is <span style="visibility: hidden;">the</span> paragraph</p>
```

:::

## 行高

行高和盒子的高度不是同一个概念，如果一个盒子没有设置高度，则会被内容的行高撑开，并且内容在行高中默认是垂直居中的，因此如果将盒子的高度和内容的行高设置相同就会让内容在盒子中垂直居中，仅适用于一行，如果是多行则选择`padding`来实现垂直居中

CSS 并没有提供设置行间距的属性，只能通过行高`line-height`来间接设置行间距，因为`行间距 = 行高 - 内容高度`，内容的高度由字号决定，如果没有设置行高，父元素就会被内容的高度撑起，所以看起来就像行高撑起一样。内容在行高中默认是垂直居中的，如果行高比内容的高度要大，就会出现行空隙，这个就是行间距。

::: demo 行高

```html
<p class="sentence foo">People always say that it's too late. However, in fact, now is the best appropriate time. For a man who really wants to seek for something, every period of life is younger and timely.</p>
<p class="sentence bar">People always say that it's too late. However, in fact, now is the best appropriate time. For a man who really wants to seek for something, every period of life is younger and timely.</p>
```

```css
.sentence {
  font-size: 18px;
}
.foo {
  line-height: 18px;
}
.bar {
  line-height: 36px;
}
```

:::

## 内容的溢出

当往一个具有约束尺寸的盒子中塞很多东西时，往往就会产生溢出现象，就像这样：

::: demo 溢出现象

```html
<div>aaaaaaaaaaaaaaaaaaaaa</div>
```

```css
div {
  width: 150px;
  border: 1px solid #000;
}
```

:::

但是溢出的东西并不会老实的呆在盒子的返回内，CSS 对此提供了一些控制能力，`overflow`是用来控制元素的溢出方式，这些是它的取值：

+ `visible`：溢出内容可见，默认项
+ `hidden`：隐藏溢出部分
+ `scroll`：无论是否溢出，都添加滚动条
+ `auto`：滚动条仅在溢出时出现

::: demo overflow

```html
<div class="box1">aaaaaaaaaaaaaaaaaaa</div>
<div class="box2">aaaaaaaaaaaaaaaaaaa</div>
<div class="box3">aaaaaaaaaaaaaaaaaaa</div>
<div class="box4">aaaaaaaaaaaaaaaaaaa</div>
```

```css
div {
  width: 150px;
  border: 1px solid #000;
}
.box2 {
  overflow: hidden;
}
.box3 {
  overflow: scroll;
}
.box4 {
  overflow: auto;
}
```

:::

如果改变了`overflow`的取值，就产生了 BFC，结果就是盒子里的东西不会突出盒子，内容会被收纳不会遮盖外面的东西，并且盒子之外的东西不能够混进盒子里

## 可替换元素

顾名思义，可替换元素就是可以被替换的元素，比如`<img>`，其中的内容来自于对应的`src`属性，并用该资源替换掉`<img>`本身，由于图片本身并不知道宽高，所以无法通过 CSS 控制，因此`<img>`的宽高实际上由其加载的内容决定

再比如视频会被描述具有宽高，在 HTML 上会以文件的大小显示，CSS 不能影响元素内部的布局，只能影响它们在页面上于其它元素的位置
