---
title: 页面的布局
category: Web
tags: [CSS, Alpha]
author: JQiue
article: false
---

## 文档流

网页的布局方式其实就是指浏览器是如何对网页中的元素进行排版的，标准流也叫文档流，也是浏览器默认的排版方式，会将元素分为块级元素/行内元素/行内块级元素

## 浮动流

`float`是 CSS 中最令人意外的属性，它的设计初衷只是用来实现文字环绕图片的效果，浮动流是一种“半脱离标准流”的排版方式，只有水平排版这一种方式，只能设置某个浮动元素左对齐或右对齐，同时也不能使用`margin: 0 auto`来实现居中对齐，也不区分块级元素/行内元素/行内块级元素，且都可以设置宽高间距属性

::: demo float

```html
<div class="float-box"><div class="float-example1"></div>当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。</div>
<div class="float-box"><div class="float-example2"></div>当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。</div>
```

```css
.float-box div {
  width: 100px;
  height: 50px;
  background-color: red;
}
.float-example1 {
  float: left;
}
.float-example2 {
  float: right;
}
```

:::

::: tip
浮动元素不会覆盖文字，图片，表单元素
:::

::: warning
脱标即脱离标准流，当某一个元素浮动之后，这个元素看起来像是在标准流中删除了一样，如果前面的元素没有浮动，而后面的元素浮动了，这个时候后面的元素可以覆盖前面的元素，就说明了浮动流元素已经和标准流没有了任何关联，因此就不会占用了标准流的位置
![layout-1](../../images/layout-1.png)
:::

### 浮动元素的贴靠

前提知道的是，当浮动元素水平方向移动时，如果碰到含有边框或者另一个浮动元素就会停止移动，并贴靠在旁边，如果父元素的宽度不能显示所有的浮动元素，那么会从最后一个元素开始贴靠，如果都不能显示，将会紧贴父元素的左边或者右边，浮动顺序会按照左浮动找左浮动，右浮动找右浮动的顺序进行贴靠

::: demo 贴靠现象

```html
<div class="float-box2">
  <div class="float-a">a</div>
  <div class="float-b">b</div>
  <div class="float-c">c</div>
  <div class="float-d">d</div>
</div>
<div class="float-box3">
  <div class="float-h">h</div>
  <div class="float-g">g</div>
  <div class="float-f">f</div>
  <div class="float-e">e</div>
</div>
```

```css
.float-box2,.float-box3 {
  width: 350px;
  height: 200px;
  border: 1px solid #000;
}
.float-box2 div {
  float: left;
}
.float-box3 div {
  float: left;
}
.float-a,.float-e {
  width: 100px;
  height: 50px;
  background-color: red;
}
.float-b,.float-f {
  width: 100px;
  height: 100px;
  background-color: green;
}
.float-c,.float-g {
  width: 100px;
  height: 150px;
  background-color: blue;
}
.float-d,.float-h {
  width: 100px;
  height: 50px;
  background-color: pink;
}
```

:::

### 清除浮动

浮动元素脱离了标准流，导致父元素无法检测到子元素而无法撑开高度，所以会造成父元素高度坍塌的问题，对后续元素布局造成影响

1. 设置父元素：overflow：hidden/auto
2. 不想受到影响的元素：clear: left/right/both
3. display：block
4. positon：fixed
5. postion：absolute

由于触发了 BFC，这个容器就是页面上完全独立的容器，为了不影响其他元素的布局以及保证这个规则，会让子元素一起参与计算高度，变相的实现清除内部浮动的目的，有时候出于布局需要可能无法使用这些属性

解决高度坍塌常用的还有以下几种办法：

1. 让父元素也浮动起来，这样父元素也脱离了文档流，父元素就能自适应子元素的高度，优点是代码量极少，缺点是将错就错的办法，会影响父元素之后的其他元素排列问题
2. 给父元素添加固定高度，这个方法只适用于已知子元素高度的情况，缺点是不够灵活，难以维护
3. 在浮动的子元素后面添加一个空元素设置`clear:both`，简单易懂，容易掌握，缺点是增加无意义的标签，不利于以后维护
4. 为浮动最后一个子元素设置为元素`::after{clear:both}`，这里是用伪类替代了空元素，优点是结构和语义完全正确，缺点是会导致代码量增加

## 定位流

定位流是为了解决更加精细的元素定位，也是一种脱离标准流的排版，通过`position`属性来设置一个元素的定位类型，它的取值有四种，对应着不同的定位属性，同时也需要设置`top`、`left`、`right`、`bottom`属性来调整元素的偏移距离

::: danger
不能同时设置相反方向的偏移量
:::

+ `static`：静态定位是 CSS 元素中的默认值，不会受到偏移属性的影响
+ `relative`：相对定位并没有脱离标准流，而是继续在标准流中占用空间，相对于在标准流中位置的移动，由于不脱离标准流，因此是区分块级/行内/行内块元素的，并且设置边距等属性时也会影响标准流中其他的元素
+ `absolute`：绝对定位的元素是脱离标准流的，不会占用标准流的位置，不区分块级/行内/行内块元素，设置边距等属性不会影响标准流中其他的元素，默认情况下所有的绝对定位元素，都会以 body 作为参考点移动，如果一个绝对定位元素的祖先元素也是定位流（除了静态定位），则会以那个祖先元素作为参考点
+ `fixed`：固定定位是脱离标准流的，和绝对定位一样不区分行内/块级/行内块级元素，相对于浏览器窗口进行定位
::: warning 注意点
如果以 body 为参考点，那么会以首屏的宽度和高度作为参考点，而不是整个网页的宽度和高度作为参考点，绝对定位的元素会忽略祖先元素的 padding
:::

::: tip 子绝父相
一般情况下是不会单独使用绝对定位的，而是和相对定位搭配起来使用，因此设置绝对定位元素同时也会将父元素设置相对定位，避免绝对定位参考点不同的弊端
:::

::: tip 水平居中
在以前可以通过设置 margin 来实现水平居中，但仅仅适用于标准流元素，在定位流中设置`left: 50%`，然后设置`margin-left`为该元素的宽度一半即可，这个值是负数
:::

## z-index

使用各种定位后很容易出现重叠现象，`z-index`属性用于设置元素的堆叠顺序，拥有更高堆叠顺序的元素总是处于堆叠顺序较低的元素前面，只对定位元素上生效，取值为整数

::: demo z-index

```html
<div class="container">
  <div class="box1">box1</div>
  <div class="box2">box2</div>
  <div class="box3">box3</div>
  <div class="box4">box4</div>
</div>
```

```css
.container {
  height: 150px;
}
.container>div {
  position: absolute;
  width: 100px;
  height: 80px;
  border: 1px solid #666;
}
.box1 {
  background-color: red;
  left: 100px;
  top: 40px;
  z-index: 50;
}
.box2 {
  background-color: pink;
  left: 0;
  top: 60px;
  z-index: 90;
}
/* 增加权重 */
.container>.box3 {
  position: static;
  background-color: gray;
  /* 对 static 不起作用 */
  z-index: 9999;
}
.box4 {
  background-color: orange;
  left: 40px;
  top: 50px;
  z-index: 999;
}
```

:::
