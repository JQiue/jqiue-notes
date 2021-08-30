---
title: 一些 CSS 属性
category: Web
tags: [CSS, Alpha]
author: JQiue
article: false
---

## 字体

通过`font-*`属性来规定字体的样式

::: demo font

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

::: demo font 简写形式

```html
<p style="font: italic bold 18px '楷体'">简写形式</p>
```

:::

## 文本

### 装饰

`text-decoration`可以设置文本的一些装饰样式

::: demo text-decoration

```html
<span style="text-decoration:overline">上划线</span>
<span style="text-decoration:underline">下划线</span>
<span style="text-decoration:line-through">删除线</span>
<a style="text-decoration:none">none</a>
```

:::

### 水平对齐

`text-align`可以规定文本的水平对齐方式

::: demo text-align

```html
<p style="text-align:right">左对齐</p>
<p style="text-align:left">右对齐</p>
<p style="text-align:center">居中</p>
```

:::

### 缩进

`text-indent`可以控制文本的首行缩进距离

::: demo text-indent

```html
<p style="text-indent:2em">当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。</p>
```

:::

::: tip em
em 是一种相对尺寸的单位，1em 默认为父元素的字体大小
:::

### 间距

+ `word-spacing`控制英文单词之间的间距，对中文无效
+ `letter-spacing`控制字符之间的间距，中英文都有效

::: demo

```html
<p>wjq is me</p>
<p style="word-spacing:5px;letter-spacing:5px;">wjq is me</p>
```

:::

### 颜色

`color`属性可以改变文本的颜色

::: demo color

```html
<span style="color:red">红</span>
<span style="color:green">绿</span>
<span style="color:blue">蓝</span>
```

:::

### 阴影

`text-shadow`可为文本创建阴影效果，参数分别是：水平偏移量、垂直偏移量、模糊半径、颜色

::: demo 阴影

```html
<p>文字阴影</p>
```

```css
p {
  text-shadow: 5px 5px 5px green;
}
```

:::

## 垂直对齐

`vertical-align`提供了内联元素的垂直对齐方式，只对内联元素和`table-cell`生效，一般情况下，内容都是基于父元素的基线对齐，而`vertical-align`提供了几个属性来改变对齐方式：

1. `baseline`：默认值，与父元素的基线对齐
2. `top`：对齐行中顶端最高的元素
3. `middle`：居中对齐
4. `bottom`：对齐行中低端最低的元素
5. `text-top`：与文本的顶端对齐
6. `text-bottom`：与文本的地段对齐

## 鼠标指针

一般情况下，都是由浏览器控制鼠标指针的样式的，大多数都是箭头状，指向链接时为手指形状，使用`cursor`属性就可以指定指针停留在元素上的样式

+ `pointer`
+ `wait`
+ `text`
+ `help`

::: demo cursor

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

## 背景

在 CSS 中通常使用`background`来设置元素的可见区域的背景属性（边框到内容才是元素的可见区域）

+ `background-color`：设置背景颜色

::: demo background-color

```html
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 150px;
  background-color: #f40;
}
```

:::

+ `background-image`：设置背景图片，必须提供图片地址并放在`url()`中，如果图片大小没有元素大，则会自动在水平和垂直方向平铺和填充背景

::: demo background-image

```html
<div class="box foo"></div>
<div class="box bar"></div>
```

```css
.box {
  height: 100px;
}
.foo {
  background-image: url(/avatar.png);
}
.bar {
  background-image: url(/bgImage.jpg);
}
```

:::

+ `background-repeat`：设置背景图片是否以及如何重复
  + repeat（默认值）：水平和垂直方向都平铺和填充
  + repeat-x：水平方向平铺和填充
  + repeat-y：垂直方向平铺和填充
  + no-repeat：不平铺图片

::: demo background-repeat

```html
<div class="box foo"></div>
<div class="box bar"></div>
<div class="box quz"></div>
```

```css
.box {
  height: 100px;
  background-image: url(/avatar.png);
}
.foo {
  background-repeat: repeat-x;
}
.bar {
  background-repeat: repeat-y;
}
.quz {
  background-repeat: no-repeat;
}
```

:::

+ `background-position`：设置背景图片的在元素中的位置，默认情况下总是显示在元素的左上角，属性有两个取值，前面控制水平方向，后面控制垂直方向。也可以通过像素精准的控制图片的位置，它的取值可以是负的
  + 水平方向：`left`，`center`，`right`|像素
  + 垂直方向：`top`，`center`，`bottom`|像素

::: demo background-position

```html
<div class="box foo"></div>
<div class="box bar"></div>
<div class="box qux"></div>
```

```css
.box {
  margin: 0 auto;
  border: 1px solid black;
  width: 99px;
  height: 99px;
  background-color: pink;
  background-image: url(/avatar.png);
  background-repeat: no-repeat;
}
.foo {
  background-position: right bottom;
}
.bar {
  background-position: 20px 30px;
}
.qux {
  background-position: -20px -20px;
}
```

:::

::: tip
可以同时设置背景颜色和图片，图片会在颜色的上面
:::

+ `background-size`：设置背景图片的大小，可以通过像素取值，也可以通过`cover`或`contain`来自动计算图片大小覆盖背景
+ `background-attachment`：设置背景图片是否固定或者随着页面的其余部分滚动，`scroll`是默认属性随着页面的滚动而滚动，`fixed`则不会随着页面而滚动

上面都是一些单独的属性，CSS 也提供了`background`属性进行缩写：`background: 背景颜色 背景图片 平铺方式 固定方式 定位方式`，在缩写方式中，任何属性都可以省略

::: tip 背景图片和插入图片的区别
插入图片的语义比背景图片的要强，利于搜索引擎收录
:::

::: tip 精灵图技术
精灵图也叫雪碧图，是一种图片的合成技术，目的是将很多图片拼接到一张图片中，利用 CSS 背景定位来显示所需要的图片，大大的减少了网页中的请求次数
:::

## 转换

在 CSS3 中，转换属性能够对元素进行移动，缩放，旋转，拉长或拉伸

### 2D 转换

通过`transform`属性来控制元素的转换行为，它的取值是转换方法

+ translate(x,y)：水平或垂直方向平移
+ rotate(angle)：顺时针或逆时针旋转
+ scale(x,y)：水平或垂直方向缩放（取值是1默认不变，大于1代表放大，小于1代表缩小，水平和垂直参数一样可以简写一个参数）
+ skew(x-angle,y-angle)：x轴或y轴倾斜

::: demo

```html
<ul class="exam1">
  <li>默认</li>
  <li>平移</li>
  <li>旋转</li>
  <li>缩放</li>
  <li>倾斜</li>
</ul>
```

```css
.exam1 {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  }
.exam1 li{
  list-style: none;
  width: 70px;
  height: 30px;
  line-height: 30px;
  background: pink;
  margin: 20px auto;
  text-align: center;
}
.exam1 li:nth-child(2){
  transform: translate(10px,10px);
}
.exam1 li:nth-child(3){
  transform: rotate(45deg);
}
.exam1 li:nth-child(4){
  transform: scale(1,1);
} 
.exam1 li:nth-child(5){
  transform: skew(10deg,20deg);
}
```

:::

### 3D 转换

通过在2d转换的方法后面添加一个大写的X或者Y或者Z来定义3D转换

### 透视属性

perspective 属性用来改变 3D 元素的视图，只影响 3D 转换元素，只有子元素获得透视效果，本身不获得透视效果，具有近大远小的视觉效果，取值为像素，像素越小代表越近，反之越远

::: demo

```html
<div class="exam2">
  <div></div>
</div>
```

```css
.exam2 {
  margin: 0 auto;
  width: 150px;
  height: 180px;
  border: 1px solid black;
  perspective: 500px;
}
.exam2 div {
  height: 180px;
  background: pink;
  transform: rotateX(20deg);
}
```

:::

## 过渡

在CSS3中，可以通过不适用Flash或JavaScript的情况下，当一个元素从一种样式变成另一种样式时添加效果，也就是让元素变化的更加平缓，它必须规定需要过渡的属性和过渡的时长

通过 transition 来规定过渡效果，有四个属性值：过渡的属性，过渡的时间，过渡的时间曲线，过渡的时间延迟

::: demo

```html
<div class="gd-exam1"></div>
```

```css
.gd-exam1 {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s;
}
.gd-exam1:hover { 
  width: 200px;
}
```

:::

当然可以同时过渡多个属性，只需要使用`,`隔开每个过渡的属性即可

::: demo

```html
<div class="gd-exam2"></div>
```

```css
.gd-exam2 {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s, background 2s;
}
.gd-exam2:hover {
  width: 200px;
  background: purple;
}
```

:::

延时2S

::: demo

```html
<div class="gd-exam3"></div>
```

```css
.gd-exam3{
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  transition : width 2s 2s, background 2s 2s;
}
.gd-exam3:hover{
  width: 200px;
  background: purple;
}
```

:::

## 动画

动画和过渡有些类似，但是过渡必须通过其他条件来触发(比如hover)，而动画不需要触发手段，并且过渡的可控性较差，只能指定起始和结束的状态，而动画可以定义多个状态

在使用动画属性之前必须先了解CSS3中`@keyframes`规则，它的作用用于创建动画的规则，它有点像选择器一样使用，不过需要几个关键字来指定动画的行为：`from`,`to`，`from`中定义开始时的样式，`to`中定义结束后的样式，这可能和过渡效果一样了，但是CSS3还提供了百分比的形式来控制样式，这样就能更加精确的控制了，创建动画帧后，必须将name交给animation属性进行播放，name必须是合法的标识符

```css
@keyframes name{
  from{}
  to{}
}
@keyframes name{
  0%{}
  50%{}
  100%{}
}
```

::: demo

```html
<div class="dh-exam1"></div>
```

```css
.dh-exam1 {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: pink;
  animation: play1 2s infinite alternate;
}
@keyframes play1 {
  from{width: 80px;background: pink;}
  to{width: 250px;background: purple;}
}
```

:::

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

很遗憾的是，由于大部分设备预装的字体有限，这使得网页字体只能在有限的字体集中选择，但 CSS 规则`@font-face`为字体创造了很多可能，这使得开发者可以链接任意可用的字体给网页使用

```css
@font-face {
  font-family: '';
  src: url();
}
```

这一语法定义了一个字体，使用`src`链接一个可用的字体文件，并用`font-family`命名，这样就可以在任意元素中使用命名的字体了

::: demo @font-face

```html
<p>随性而驰骋，淡然而笃定</p>
```

```css
@font-face {
  font-family: 'wjq';
  src: url(/ZCOOLKuaiLe-Regular.ttf);
}
p {
  font-family: 'wjq';
}
```

:::

除此之外还有一种特殊的图标字体，并不像传统的字母、数字、标点符号一样，这种字体可以像对待文字那样改变样式

## 元素

### 圆角边框

`border-radius`可为元素设置圆角

### 盒子阴影

`border-shadow`可为元素设置阴影效果，参数：水平偏移量、垂直偏移量、模糊半径、颜色

当在所有的参数后加上`inset`后，就变成内阴影了

::: demo 盒子阴影

```html
<div class="box1">外阴影</div>
<div class="box2">内阴影</div>
```

```css
div.box1,div.box2 {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
.box1 {
  box-shadow: 0 0 15px orange;
}
.box2 {
  box-shadow: 0 0 15px orange inset;
}
```

:::

甚至可以添加多重阴影，只需要使用`,`分割

::: demo 多重阴影

```html
<div class="box"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  box-shadow: 0 0 5px 10px pink, 0 0 5px 20px green;
}
```

:::

### 不透明度

`opacity`可以设置元素的透明度，它的取值 0~1，不需要带单位

::: demo

```html
<div class="box box1"></div>
<div class="box box2"></div>
<div class="box box3"></div>
```

```css
div.box {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: black;
}

.box1 {
  opacity: 1;
}
.box2 {
  opacity: 0.6;
}
.box3 {
  opacity: 0.3;
}
```

:::

::: tip
opacity 和使用 RGBA 或 HSLA 设置的透明是不同的，opacity 影响的是整个元素,包括内容，RGBA 和 HSLA 只是影响背景的透明度
:::

### 轮廓

`outline`可以设置元素的轮廓，轮廓是围绕在元素边框外面的线，不会影响大小，有三个参数：颜色、风格、尺寸

::: demo 轮廓

```html
<div class="box">111</div>
```

```css
.box {
  width: 100px;
  border: 5px solid #000;
  outline: green solid 5px;
}
```

:::

## 渐变
