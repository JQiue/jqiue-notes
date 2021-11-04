---
title: 面经，面经
category: Web
tags: [Alpha]
author: JQiue
article: false
---

## HTML

### `DOCTYPE`，严格模式和混杂模式

DOCTYPE 是一种标准通用标记语言的文档类型声明，目的是告诉标准通用标记语言解析器要使用什么样的文档类型定义（DTD）来解析文档，必须位于文档的第一行，HTML5 的声明是`<DOCTYPE html>`

严格模式被称为标准模式，指浏览器按照最新的标准解析代码。混杂模式又被称为怪异模式，兼容模式，使浏览器用自己的方式解析代码，模拟老式的浏览器的行为，防止老的站点无法工作

### 常见的标签，以及使用的场景

随便扯，详见[这里](/application/web/html-css/elements/)

### title 和 alt 属性

`title`用于提供元素的额外信息文本以提示用户，`alt`用于`<img>`无法显示图片时的替代文本

### data-*

为了解决 HTML 自定义特性的问题，所以才引入了`data-*`，允许开发人员自定义非标准的属性能力，在 DOM 元素对象中使用`elem.dataset`访问

### src 和 href

都是用来引入外部的资源，`src`会将指定的资源加载到指定的页面位置，会将资源下载并应用到文档内，此时会暂停文档处理等待资源加载完毕，比如 JavaScript 脚本。`href` 将当前元素和外部资源建立联系，会并行的下载资源不会对当期文档进行处理

### 全局属性

详见[这里](/application/web/html-css/basic/#全局属性)

### 语义化

用正确的标签做正确的事，对于 HTML 结构来说更加清晰，有利于 SEO，方便其他设备更好的解析页面，使代码更具有可读性

### SEO

SEO 叫做搜索引擎优化，便于网站内容在搜索引擎中排名靠前，是用来将网站内容曝光在用户面前的重要手段，所以良好的 HTML 页面结构对 SEO 非常重要，使用合理的 title，description，keyword，尽量使用语义化的 HTML 标签，将重要的内容放到前面，图片最好加上 alt 属性，提高网站加载速度，最重要的是优质的网页内容

### 表单

`action`作用是指定处理表单的服务器地址，`method`指定表单的请求方法，默认是 GET 请求，`name`用于标记表单便于 JavaScript 获取，`<label>`提供了内容绑定元素的能力，默认情况下点击内容是不会聚焦到元素的

### `<script>`的 defer 和 async 的区别

详见[这里](/application/web/webapi/event/#加载脚本)

## CSS

### 加载方式

1. 行内
2. 内部
3. 外部
4. @import

### 选择器

详见[这里](/application/web/html-css/selectors/)

### 伪类和伪元素

伪元素会在在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为伪元素。例如：

```css
p::before {content:"第一章：";}
p::after {content:"Hot!";}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
```

伪类用于将特殊的效果添加到特定选择器上，它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {color: #FF00FF}
p:first-child {color: red}
```

伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变

`:`用于 CSS3 伪类，`::`用于 CSS3 伪元素

### 层叠，优先级，继承

层叠性是 CSS 处理冲突的一种能力，在同一个 CSS 样式规则中重复使用了某个属性，或不同的选择器选中后都使用了某个属性，才会发生层叠性，优先级较高的就会生效。当多个选择器选中同一个标签，并且设置相同的属性时，如何层叠就由优先级来确定。部分父元素的属性会被后代所继承，但不是所有的属性都会被继承，以`color/font-/text-/line-/list-/cursor`开头的属性会被继承，更好的利用继承性可以提高效率

无继承性的属性：

+ display：规定元素应该生成的框的类型
文本属性：
+ vertical-align：垂直文本对齐  
+ text-decoration：规定添加到文本的装饰  
+ text-shadow：文本阴影效果  
+ white-space：空白符的处理  
+ unicode-bidi：设置文本的方向
+ 盒子模型的属性：width、height、margin、border、padding  
+ 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment  
+ 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index  
+ 生成内容属性：content、counter-reset、counter-increment  
+ 轮廓样式属性：outline-style、outline-width、outline-color、outline  
+ 页面样式属性：size、page-break-before、page-break-after  
+ 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during  

有继承性的属性：

+ font-family：字体系列  
+ font-weight：字体的粗细  
+ font-size：字体的大小  
+ font-style：字体的风格  
+ text-indent：文本缩进  
+ text-align：文本水平对齐  
+ line-height：行高  
+ word-spacing：单词之间的间距  
+ letter-spacing：中文或者字母之间的间距  
+ text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）  
+ color：文本颜色  
+ visibility：控制元素显示隐藏
+ list-style：列表风格，包括list-style-type、list-style-image等
+ cursor：光标显示为何种形态

### 取值单位

常见的 CSS 布局单位：

+ px
+ 百分比
+ em 和 rem
+ rem
+ vw/vh

像素（px）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS 像素和物理像素

+ CSS 像素：为 web 开发者提供，在 CSS 中使用的一个抽象单位
+ 物理像素：只与设备的硬件密度有关，任何设备的物理像素都是固定的

百分比（%），当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素

em 和 rem 相对于 px 更具灵活性，它们都是相对长度单位，它们之间的区别：em 相对于父元素，rem 相对于根元素

em： 文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(默认16px) (相对父元素的字体大小倍数)

rem： rem是CSS3新增的一个相对单位，相对于根元素的`font-size`的倍数。作用：利用rem可以实现简单的响应式布局，可以利用html元素中字体的大小与屏幕间的比值来设置font-size的值，以此实现当屏幕分辨率变化时让元素也随之变化

vw/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了vw和vh外，还有 vmin 和 vmax 两个相关的单位

+ vw：相对于视窗的宽度，视窗宽度是100vw；
+ vh：相对于视窗的高度，视窗高度是100vh；
+ vmin：vw和vh中的较小值；
+ vmax：vw和vh中的较大值；

vw/vh 和百分比很类似，两者的区别：

+ 百分比（%）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate等)
+ vw/vm：相对于视窗的尺寸

px、em、rem 的区别及使用场景

区别：

+ px 是固定的像素，一旦设置了就无法因为适应页面大小而改变
+ em 和rem相对于px更具有灵活性，他们是相对长度单位，其长度不是固定的，更适用于响应式布局
+ em 是相对于其父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要+ 知道他父元素的大小。而 rem 是相对于根元素，这样就意味着，只需要在根元素确定一个参考值

使用场景：

+ 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用px即可 。
+ 对于需要适配各种移动设备，使用rem，例如需要适配iPhone和iPad等分辨率差别比较挺大的设备。

### 盒模型

盒模型都是由四个部分组成的，分别是margin、border、padding和content。
标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同：

标准盒模型的width和height属性的范围只包含了content，
IE盒模型的width和height属性的范围包含了border、padding和content。

可以通过修改元素的box-sizing属性来改变元素的盒模型：

+ box-sizing: content-box表示标准盒模型（默认值）
+ box-sizing: border-box表示IE盒模型（怪异盒模型）

### 行内和块级元素

对于行内元素和块级元素，其特点如下：

行内元素:

+ 设置宽高无效
+ 可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；
+ 不会自动换行

块级元素:

+ 可以设置宽高
+ 设置margin和padding都有效
+ 可以自动换行
+ 多个块状，默认排列从上到下

`display`可以改变元素的显示模式：

+ block： 会独占一行，多个元素会另起一行，可以设置width、height、margin和padding属性；
+ inline： 元素不会独占一行，设置width、height属性无效。但可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；
+ inline-block： 将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在同一行内

### 边距

需要在border 外侧添加空白，且空白处不需要背景（色）时，使用 margin；
需要在 border 内测添加空白，且空白处需要背景（色）时，使用 padding。

margin 重叠问题

问题描述：
两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向

计算原则：

折叠合并后外边距的计算原则如下：

如果两者都是正数，那么就去最大者
如果是一正一负，就会正值减去负值的绝对值
两个都是负值时，用0减去两个中绝对值大的那个

解决办法：

对于折叠的情况，主要有两种：兄弟之间重叠和父子之间重叠

（1）兄弟之间重叠

底部元素变为行内盒子：display: inline-block
底部元素设置浮动：float
底部元素的position的值为absolute/fixed

（2）父子之间重叠

父元素加入：overflow: hidden
父元素添加透明边框：border:1px solid transparent
子元素变为行内盒子：display: inline-block
子元素加入浮动属性或定位

### 元素空隙

浏览器会把inline内联元素间的空白字符（空格、换行、Tab等）渲染成一个空格

解决办法：

+ 为`<li>`设置float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。
+ 将所有`<li>`写在同一行。不足：代码不美观。
+ 将`<ul>`内的字符尺寸直接设为0，即font-size:0。不足：`<ul>`中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。
+ 消除`<ul>`的字符间隔letter-spacing:-8px，不足：这也设置了`<li>`内的字符间隔，因此需要将`<li>`内的字符间隔设为默认letter-spacing:normal。

### 隐藏元素

+ display: none：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
+ visibility: hidden：元素在页面中仍占据空间，但是不会响应绑定的监听事件。  
+ opacity: 0：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件
+ position: absolute：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏
+ z-index: 负值：来使其他元素遮盖住该元素，以此来实现隐藏
+ clip/clip-path ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件
+ transform: scale(0,0)：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件

### 溢出

单行文本溢出

```css
overflow: hidden; 
text-overflow: ellipsis;     
white-space: nowrap;
```

### 定位

详见[这里](/application/web/html-css/layout/#清除浮动)

z-index属性在下列情况下会失效：

+ 父元素position为relative时，子元素的z-index失效。解决：父元素position改为absolute或static；
+ 元素没有设置position属性为非static属性。解决：设置该元素的position属性为relative，absolute或+ 是fixed中的一种；
+ 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为display：inline-block；

### 行高

line-height 指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离；
如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
一个容器没有设置高度，那么撑开容器高度的是 line-height，而不是容器内的文本内容；
把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；
line-height 和 height 都能撑开一个高度；

line-height 的赋值方式：

+ 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
+ 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
+ 百分比：将计算后的值传递给后代

### 居中（垂直或水平）

### 浮动

为什么需要清除浮动？清除浮动的方式

浮动的定义： 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）

浮动的工作原理：

浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
浮动元素碰到包含它的边框或者其他浮动元素的边框停留

浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”

浮动元素引起的问题？

父元素的高度无法被撑开，影响与父元素同级的元素
与浮动元素同级的非浮动元素会跟随其后
若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

清除浮动的方式如下：

+ 给父级div定义height属性
+ 最后一个浮动元素之后添加一个空的div标签，并添加clear:both样式
+ 包含浮动元素的父级标签添加overflow:hidden或者overflow:auto
+ 使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1 触发 hasLayout**

```css
.clearfix:after{
  content: "\200B";
  display: table; 
  height: 0;
  clear: both;
}
.clearfix{
  *zoom: 1;
}
```

使用 clear 属性清除浮动的原理？

使用clear属性清除浮动，其语法如下：

```css
clear:none|left|right|both
```

如果单看字面意思，clear:left 是“清除左浮动”，clear:right 是“清除右浮动”，实际上，这种解释是有问题的，因为浮动一直还在，并没有清除

官方对clear属性解释：“元素盒子的边不能和前面的浮动元素相邻”，对元素设置clear属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动

还需要注意 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3个字，也就是clear属性对“后面的”浮动元素是不闻不问的。考虑到float属性要么是left，要么是right，不可能同时存在，同时由于clear属性对“后面的”浮动元素不闻不问，因此，当clear:left有效的时候，clear:right必定无效，也就是此时clear:left等同于设置clear:both；同样地，clear:right如果有效也是等同于设置clear:both。由此可见，clear:left和clear:right这两个声明就没有任何使用的价值，至少在CSS世界中是如此，直接使用clear:both吧

一般使用伪元素的方式清除浮动：

.clear::after{  content:'';  display: block;   clear:both;}

clear 属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置display属性值的原因。

### BFC

先来看两个相关的概念：

+ Box: Box 是 CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个Box就是我们所说的盒模型。
Formatting context：块级上下⽂格式化，它是⻚⾯中的⼀块渲染区域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其他元素的关系和相互作⽤。

+ 块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。
通俗来讲：BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响

创建BFC的条件：

+ 根元素：body；
+ 元素设置浮动：float 除 none 以外的值；
+ 元素设置绝对定位：position (absolute、fixed)；
+ display 值为：inline-block、table-cell、table-caption、flex等；
+ overflow 值为：hidden、auto、scroll；

BFC 的特点：

+ 垂直方向上，自上而下排列，和文档流的排列方式一致
+ 在BFC中上下相邻的两个容器的margin会重叠
+ 计算BFC的高度时，需要计算浮动元素的高度
+ BFC区域不会与浮动的容器发生重叠
+ BFC是独立的容器，容器内部元素不会影响外部元素
+ 每个元素的左margin值和容器的左border相接触

BFC的作用：

+ 解决margin的重叠问题：由于BFC是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素+ 变为两个BFC，就解决了margin重叠的问题
+ 解决高度塌陷的问题：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0
+ 解决这个问题，只需要把父元素变成一个BFC。常用的办法是给父元素设置overflow:hidden。
+ 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```css
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }
```

```html
<div class="left"></div>
<div class="right"></div>
```

左侧设置float:left，右侧设置overflow: hidden。这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

### Flex

flex布局是CSS3新增的一种布局方式，可以通过将一个元素的display属性值设置为flex从而使它成为一个flex容器，它的所有子元素都会成为它的项目。一个容器默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用flex-direction来指定主轴的方向。

可以使用justify-content来指定元素在主轴上的排列方式，使用align-items来指定元素在交叉轴上的排列方式。还可以使用flex-wrap来规定当一行排列不下时的换行方式。对于容器中的项目，可以使用order属性来指定项目的排列顺序，还可以使用flex-grow来指定当排列空间有剩余的时候，项目的放大比例，还可以使用flex-shrink来指定当排列空间不足时，项目的缩小比例。

### RGBA 和 Opacity

### 变形

### 过渡和动画

transition是过度属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧

animation是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于flash的补间动画，但是它可以设置多个关键帧（用@keyframe定义）完成动画

### 新特性

+ 新增各种CSS选择器 （: not(.input)：所有 class 不是“input”的节点）
+ 圆角 （border-radius:8px）
+ 多列布局 （multi-column layout）
+ 阴影和反射 （Shadoweflect）
+ 文字特效 （text-shadow）
+ 文字渲染 （Text-decoration）
+ 线性渐变 （gradient）
+ 旋转 （transform）
+ 增加了旋转,缩放,定位,倾斜,动画,多背景

### 媒体查询

媒体查询由⼀个可选的媒体类型和零个或多个使⽤媒体功能的限制了样式表范围的表达式组成，例如宽度、⾼度和颜⾊。媒体查询，添加⾃CSS3，允许内容的呈现针对⼀个特定范围的输出设备⽽进⾏裁剪，⽽不必改变内容本身，适合web⽹⻚应对不同型号的设备⽽做出对应的响应适配

媒体查询包含⼀个可选的媒体类型和满⾜CSS3规范的条件下，包含零个或多个表达式，这些表达式描述了媒体特征，最终会被解析为true或false。如果媒体查询中指定的媒体类型匹配展示⽂档所使⽤的设备类型，并且所有的表达式的值都是true，那么该媒体查询的结果为true。那么媒体查询内的样式将会⽣效

### 精灵图（雪碧图）

CSSS prites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

优点：

利用CSS Sprites能很好地减少网页的http请求，从而大大提高了页面的性能，这是CSS Sprites最大的优点
CSS Sprites能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和

缺点：

在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
CSSSprites在开发的时候相对来说有点麻烦，需要借助photoshop或其他工具来对每个背景单元测量其准确的位置

维护方面：CSS Sprites在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的CSS，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动CSS。

### 响应式设计

响应式网站设计（Responsive Web design）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

关于原理： 基本原理是通过媒体查询（@media）查询检测不同的设备屏幕尺寸做处理。
关于兼容： 页面头部必须有mate声明的viewport

### 兼容性

### 样式重置

### 预处理器和后处理器

预处理器， 如：less，sass，stylus，用来预编译sass或者less，增加了css代码的复用性。层级，mixin， 变量，循环， 函数等对编写以及开发UI组件都极为方便。

后处理器， 如： postCss，通常是在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

预处理器为css增加一些编程特性，无需考虑浏览器的兼容问题，可以在CSS中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让css更加的简洁，增加适应性以及可读性，可维护性等。

其它css预处理器语言：Sass（Scss）, Less, Stylus, Turbine, Swithch css, CSS Cacheer, DT Css。

使用原因：

结构清晰， 便于扩展
可以很方便的屏蔽浏览器私有语法的差异
可以轻松实现多重继承
完美的兼容了CSS代码，可以应用到老项目中

### 应用场景

两栏布局的实现

一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应，两栏布局的具体实现：

利用浮动，将左边元素宽度设置为200px，并且设置向左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）。

```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  background: tomato;
}
.right {
  margin-left: 200px;
  width: auto;
  background: gold;
}
```

利用浮动，左侧元素设置固定大小，并左浮动，右侧元素设置overflow: hidden; 这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。

```css
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }
```

利用flex布局，将左边元素设置为固定宽度200px，将右边的元素设置为flex:1。

```css
.outer {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  flex: 1;
  background: gold;
}
```

利用绝对定位，将父级元素设置为相对定位。左边元素设置为absolute定位，并且宽度设置为200px。将右边元素的margin-left的值设置为200px。

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
```

利用绝对定位，将父级元素设置为相对定位。左边元素宽度设置为200px，右边元素设置为绝对定位，左边定位为200px，其余方向定位为0。

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  background: gold;
}
```

三栏布局的实现

三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局，三栏布局的具体实现：

利用绝对定位，左右两栏设置为绝对定位，中间设置对应方向大小的margin的值。

```css
.outer {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}
```

利用flex布局，左右两栏设置固定大小，中间一栏设置为flex:1。

```css
.outer {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1;
  background: lightgreen;
}
```

利用浮动，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的margin值，注意这种方式**，中间一栏必须放到最后：**

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}
```

圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。

```css
.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;

  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
```

双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的。

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: left;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.wrapper {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
}
```

实现一个三角形

CSS绘制三角形主要用到的是border属性，也就是边框。
平时在给盒子设置边框时，往往都设置很窄，就可能误以为边框是由矩形组成的。实际上，border属性是右三角形组成的，下面看一个例子：

```css
div {
    width: 0;
    height: 0;
    border: 100px solid;
    border-color: orange blue red green;
}
```

将元素的长宽都设置为0，显示出来的效果是这样的：

所以可以根据border这个特性来绘制三角形：

三角1

```css
div {    
  width: 0;  
  height: 0;
  border-top: 50px solid red;    
  border-right: 50px solid transparent;    
  border-left: 50px solid transparent;
}
```

三角2

```css
div {
    width: 0;
    height: 0;
    border-bottom: 50px solid red;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}
```

三角3

```css
div {
    width: 0;
    height: 0;
    border-left: 50px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```

（4）三角4

```css
div {
    width: 0;
    height: 0;
    border-right: 50px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```

三角5

```css
div {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
```

还有很多，就不一一实现了，总体的原则就是通过上下左右边框来控制三角形的方向，用边框的宽度比来控制三角形的角度

实现一个扇形

用 CSS 实现扇形的思路和三角形基本一致，就是多了一个圆角的样式，实现一个90°的扇形：

```css
div{
  border: 100px solid transparent;
  width: 0;
  heigt: 0;
  border-radius: 100px;
  border-top-color: red;
}
```

实现一个宽高自适应的正方形

利用 vw 来实现：

```css
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```

利用元素的`margin/padding`百分比是相对父元素width的性质来实现：

```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```

利用子元素的margin-top的值来实现：

```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

画一条0.5px的线

采用transform: scale()的方式，该方法用来定义元素的2D 缩放转换：

transform: scale(0.5,0.5);

采用meta viewport的方式

`<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>`

这样就能缩放到原来的0.5倍，如果是1px那么就会变成0.5px。viewport只针对于移动端，只在移动端上才能看到效果

设置小于12px的字体

在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。
解决办法：

使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。

使用css3的transform缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/inline-block/...；
使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

如何解决 1px 问题？

1px 问题指的是：在一些 Retina屏幕 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

```js
window.devicePixelRatio = 设备的物理像素 / CSS像素
```

打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 devicePixelRatio 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是2：

这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。
解决1px 问题的三种思路：

思路一：直接写 0.5px

如果之前 1px 的样式这样写：

```css
border:1px solid #333;
```

可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：

```html
<div id="container" data-device={{window.devicePixelRatio}}></div>
```

然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为2的情况：

```css
#container[data-device="2"] {
  border:0.5px solid #333
}
```

直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要8及以上的版本，安卓系统则直接不兼容

思路二：伪元素先放大后缩小

这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。
思路是先放大、后缩小：在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果

代码如下：

```css
#container[data-device="2"] {
    position: relative;
}

#container[data-device="2"]::after{
      position:absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      content:"";
      transform: scale(0.5);
      transform-origin: left top;
      box-sizing: border-box;
      border: 1px solid #333;
    }
}
```

思路三：viewport 缩放来解决

这个思路就是对 meta 标签里几个关键属性下手：
`<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">`

这里针对像素比为2的页面，把整个页面缩放为了原来的1/2大小。这样，本来占用2个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```js
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了

## WebAPI

### DOM

### BOM

### Event

### 存储

### 拖拽

## JavaScript

网景公司的布兰登艾奇，用十天设计出了 LiveScript 第一个版本，在发布前为了讨好 Sun 公司和 Java 程序员，LiveScript 改为 JavaScript

微软不甘示弱，在 IE 3.0 推出 JScript，为什么不是 JavaScript 是因为被网景公司所注册，因此必须是一个新的名字

对于开发者来说，两种浏览器都支持脚本，但是语法和功能都有所不同，这就犯了难

但是致力于消费级标准的 ECMA 组织，审时度势，觉得有必要将网页标准的语法和功能统一，于是发布了 ECMAScript 标准，之后对该标准进行了修改，更新到了 ECMAScript 3，简称 ES3

因此 JavaScript 和 JScript 是 ECMAScript 的两种实现

后来的浏览器厂商都会尽量根据 ECMAScript 标准来实现自己的语言脚本

在此之后，ES 几乎没有任何升级，其中 ES4 甚至被直接放弃了，直到 ES5 横空出世，同时 Node.js 发布，JavaScript 已经火了

随着 JavaScript 的高速发展，JS 本身的能力，以及适应不了发展的速度了，于是 ES 标准越更新越快，从 2015 年 发布 ES6，随后的 ES 7 甚至直接更名为 ES 2016，这很可能年更 ES 了

### 数据类型

详见[这里](/language/js/syntax/#变量和常量)

### 原始类型和引用类型

### == 和 ===

`==`会自动转换类型再比较，而`===`不会

### null 和 undefined

### 深拷贝和浅拷贝

### 0.1 + 0.2

当然，`0.1 + 0.2`不等于`0.3`，前提要知道的是 JavaScript 计算时，会将值转换成二进制，而`0.1`和`0.2`在计算时丢失了两次精度，所以最终导致结果不等于`0.3`

不仅仅`0.1`和`0.2`相加才会产生这种问题，还有其他的浮点数也会产生这种现象

解决这个问题有很多种，比如借助数学计算库，或者用`toFixed()`保留小数即可

### 函数

### 数组

### 字符串

### 对象

### 闭包

### 原型链

### 迭代器

### Promise

### 事件循环（eventloop）- 宏任务和微任务

## Vue

### 双向绑定

### Diff

### 计算属性和 Watch 的应用场景

### 组件的生命周期

## NodeJS

### 模块化开发

### 非堵塞异步 IO

### NPM

## Webpack

### 打包过程

## HTTP

### 状态码

### 请求方法

### 请求类型

1.`HTTP` 的URL 以http:// 开头，而HTTPS 的URL 以https:// 开头
2.`HTTP` 是不安全的，而 HTTPS 是安全的
3.`HTTP` 标准端口是80 ，而 HTTPS 的标准端口是443
4.`在OSI` 网络模型中，HTTP工作于应用层，而HTTPS 的安全传输机制工作在传输层
5.`HTTP` 无法加密，而HTTPS 对传输的数据进行加密
6.`HTTP`无需证书，而HTTPS 需要CA机构wosign的颁发的SSL证书

## 浏览器

### Web 标准和 W3C

Web 标准分为结构、表现、行为，W3C 对 Web 标准提出了规范化的要求，比如标签小写，标签闭合，不允许随便嵌套，使用外联 CSS 和 JavaScript，实现结构表现相分离，提高页面效率

### 渐进增强和优雅降级

渐进增强针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验

优雅降级一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

### 浏览器内核

### 一个 URL 到网页呈现的过程

### 页面白屏

### 客户端存储

### 同源策略

### 标签页通信

### 渲染方式：重绘、回流

网页生成过程：

HTML被HTML解析器解析成DOM 树
css则被css解析器解析成CSSOM 树
结合DOM树和CSSOM树，生成一棵渲染树(Render Tree)
生成布局（flow），即将所有渲染树的所有节点进行平面合成
将布局绘制（paint）在屏幕上

重排(也称回流):
当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。
触发：

添加或者删除可见的DOM元素
元素尺寸改变——边距、填充、边框、宽度和高度

重绘：
当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。
触发：

改变元素的color、background、box-shadow等属性

重排优化建议：

分离读写操作
样式集中修改
缓存需要修改的DOM元素
尽量只修改position：absolute或fixed元素，对其他元素影响不大
动画开始GPU加速，translate使用3D变化

transform 不重绘，不回流
是因为transform属于合成属性，对合成属性进行transition/animate动画时，将会创建一个合成层。这使得动画元素在一个独立的层中进行渲染。当元素的内容没有发生改变，就没有必要进行重绘。浏览器会通过重新复合来创建动画帧。

## Git

### git pull 和 git fetch

### 分支开发

## 正则表达式

## Java

## Spring

## MySQL

## MongoDB

## Redis

## Nginx

## 数据结构
