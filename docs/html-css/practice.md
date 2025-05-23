---
title: 实践
tag: [html, css]
author: JQiue
article: false
---

## 技巧性

### 快速生成 HTML 片段

有没有在写 HTML 大量的标签、属性、引号等写法所恶心到？以及同样在编写 CSS 时，要写很多的属性、属性值、大括号和分号等。当然，大多数的文本编辑器都或多或少带有代码自动提示功能，在开发之时，帮了很大的忙，但仍然需要手动输入很多代码。而 Emmet 插件，集成了很多代码片段的缩写，在开发时只需要输入简单的缩写，按`tab`键或`Ctrl+E`键就能扩展出所需的代码片段，令人高兴的是，大部分编辑器都集成了该插件，因此没必要去手动安装

Emmet 语法的核心与 CSS 选择器非常相似，也就是说像 CSS 选择器一样来使用它，比如，当在支持 Emmet 的编辑器中写上`ul>li>p`，然后按下触发 Emmet 的快捷键，就会生成：

```html
<ul>
  <li>
    <p></p>
  </li>
</ul>
```

更棒的是，Emmet 还能帮忙生成初始的文档，比如输入`!`：

```html
<!doctype html>
<html lang="en">

<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  
</body>

</html>
```

相邻元素生成`div+p`：

```html
<div></div><p></p>
```

一次性生成多个相同元素`ul>li*5`：

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

更强大的是能帮助生成带有属性的标签，只需要熟悉 CSS 选择器

+ `E#id`添加 id 名
+ `E.class`添加类名
+ `E[attr]`添加属性
+ `E{text}`添加文本

Emmet 不但能够生成标签，还能生成 CSS 属性，Emmet 定义了所有已知 CSS 属性的缩写。比如`font-size`缩写是`fz`，`border` 缩写是`bd`

Emmet 不仅能生成属性名，还能带着一起生成属性值，比如`fz14`会生成`font-size: 14px;`，`dib`生成`display: inline-block;`

还可以生成用于测试的“Lorem Ipsum”假文本内容用于填充，比如`lorem`会生成：

```html
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem fuga expedita odio porro excepturi vero eligendi, animi tempore. Id rem tenetur iusto. Cupiditate cum totam nemo qui dolorum in delectus!
```

更多详见[Emmet](https://docs.emmet.io/)

### 常用的布局方式

+ 水平居中
+ 垂直居中
+ 水平垂直居中
+ 左右布局
+ 左中右布局
+ 圣杯
+ 飞翼
+ 自适应宽高

水平居中：

+ `margin: 0 auto`，仅仅适用于标准流元素
+ 利用绝对定位，在定位流中设置`left: 50%`，然后设置`margin-left`为该元素的宽度一半即可实现，这个值是负数

水平垂直居中：

+ 利用绝对定位，设置`left: 50%`和`top: 50%`将元素从左上角定位到页面中心，然后使用`transform: translate(-50%, -50%)`移动自身宽高的半距离即可实现
+ 利用绝对定位，设置四个方向的偏移属性都为 0，并设置`margin: auto`由于宽高固定，可以实现对应方向平分，适应盒子有宽高的情况
+ 利用绝对定位，使用已知的宽高情况
+ 利用 flex 布局，需要考虑兼容性问题

### 布局尺寸技巧

同尺寸大小的的布局会让页面更加的对称，不要纠结使用 12px 后，其他的地方使用 13px 还是 14px 等等尺寸中纠结，应该在一定的尺寸设计系统中的遵守尺寸大小规则，比如：

+ 4px（16 * 0.25）
+ 8px（16 * 0.5）
+ 12px（16 * 0.75）
+ 16px（16 * 1）
+ 24px（16 * 1.5）
+ 32px（16 * 2）
+ 48px（16 * 3）
+ 64px（16 * 4）
+ 96px（16 * 6）
+ 128px（16 * 8）
+ 192px（16 * 12）
+ 256px（16 * 16）
+ 384px（16 * 24）
+ 512px（16 * 32）
+ 640px（16 * 40）
+ 768px（16 * 48）

很多前端框架都是这么做的，就是为了快速的建立一套设计系统，当然这并不是固定的，完全可以根据需求再调整

### 设表先关

当事件触发时，先清除定时器，再设置一个新的定时器，防止动画累积

### 拉终停表

在定时器内部每次 (每次信号量增加)都要判断是否走到了终点，要不要停止定时器; 如果走到或超过了终点，强行拉到重点，并停止定时器

### 无缝连续滚动

障眼法

### 跑马灯轮播图

### 呼吸灯轮播图

将图片重叠到同一个位置，切换 z-index、透明度等实现

## 更好的编写习惯

### 教条式的规则

最具有现代标准的 HTML 结构：

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title></title>
  </head>
  <body>
  </body>
<html>
```

元素名字和属性名/值全部使用小写

抛弃尾随的斜杠

```html
<!-- 不好 -->
<input type="text"/>

<!-- 好 -->
<input type="text">
```

有些标签是可闭合也可以不闭合，比如`<body>`或者`<li>`等元素，但是这些最好还是闭合，虽然代码简化了，但是可读性会变的很差，不然感觉很奇怪，尤其是在复杂的代码中更是如此，其实可以在后期的压缩环节实现删除可选闭合的部分，写代码的时候还是要保留，提高阅读性

```html
<!-- 不好 -->
<ul>
  <li>item1
  <li>item2
</ul>

<!-- 好 -->
<ul>
  <li>item1</li>
  <li>item2</li>
</ul>
```

有不少标签属性，无需设置属性值，比如`disabled`、`checked` 与 `selected`

```html
<input type="checkbox" checked>
<input type="checkbox" checked="true">
<input type="checkbox" checked="checked">
```

以上都会被选中，实际上 checked 属性不需要设置值，只需要添加此属性，复选框就会被选中，disabled 或者 selected 等属性也是同样的道理，无需设置属性值，可以节省若干代码量，也符合标准

### 内容、表现和行为分离

内容、表现和行为分离是前端页面基本原则，应用于项目中的网页通常有如下几个部分构成：

+ 通过 HTML 结构创建的结构与填写的文本，它是页面基本框架与实质内容
+ CSS 代码部分，负责对 HTML 结构和其中的文本内容进行美化修饰，也就是网页的表现部分
+ JavaScript 代码部分，负责对内容增加一些动态效果，可以称之为行为

上述三个部分的结合可以使网页更加美观有动感，交互能力也更加强大，当你的网页也可以只有内容部分，不需要 CSS 与 JavaScript，这当然是可以的，只是这样的网页很难满足实际项目的需求，首先看第一段代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JQiue's notes</title>
  </head>
<body>
  <div style="color: pink; font-size: 14px;"><b>foo</b></div>
  <div onclick="this.style.color='red'">bar</div>
</body>
</html>
```

以上 CSS 与 JavaScript 代码嵌套进 HTML 中，如此简单的代码就让人感到很凌乱，可以想象的是，如果代码量庞大，页面是有多么的臃肿。修改页面的样式和行为非常困难，内心应该是崩溃的。而且对搜索引擎优化也不友好，因为搜索引擎真正想要的是页面中的内容，而不是嵌套的 CSS 代码和 js 代码，修改如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JQiue's notes</title>
  <style>
    div:nth-child(1){
      color: pink;
      font-size: 14px;
      font-weight: bold;
    }
  </style>
  <script>
    window.onload = function() {
      document.getElementsByTagName('div')[1].onclick = function() {
        this.style.color='green';
      }
    }
</script>
</head>
<body>
  <div>foo</div>
  <div>bar</div>
</body>
</html>
```

以上代码已经实现了三者分离的效果，内容非常的简洁，无论对于程序员还是搜索引擎都比较友好。但在代码比较少的情况下是不错的选择，如果代码量非常大，页面依然会非常臃肿，拆分成不同的页面引入是不错的选择，修改如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JQiue's notes</title>
    <link rel="stylesheet" href="index.css">
    <script src="index.html"></script>
</head>
<body>
  <div>foo</div>
  <div>bar</div>
</body>
</html>
```

```css
div:nth-child(1){
  color: pink;
  font-size: 14px;
  font-weight: bold;
}
```

```js
window.onload = function() {
  document.getElementsByTagName('div')[1].onclick = function() {
    this.style.color='red';
  }
}
```

如果要修改样式和行为，甚至不需要去触碰这些 HTML 代码，只需要去修改 CSS 和 js 文件即可，极大的提高了代码可读性

主要规则如下：

+ css 和 js 代码尽量不要嵌入 html 中
+ css 尽可能不用内联样式，代码量小可以使用
+ 页面中尽量保证只有一个 js 文件引入，如果有多个，可以在部署时压缩为一个
+ 尽量使用 css 属性替代标签规定文本的表现，比如尽量避免使用`<b>`, `<u>`, `<center>`, `<font>`和`<b>`等

布局页面的最终目的是在于用户有良好交互与视觉体验的前提下，能够做到页面以非常简洁的形式展现在开发者和搜索引擎面前，以便于代码开发维护和搜索引擎的抓取

### 属性顺序

HTML 标签具有一些属性，比如`type`、`class`或者`id`等，通常会在一个元素中写入很多个属性，为了提高可读性，推荐属性按照如下顺序排列：

1. class
2. id, name
3. data-*
4. src, for, type, href
5. title, alt
6. aria-*, role
7. disabled、checked 或者 selected

```html
<input class="text" id="text" type="text" disabled>
```

### type 属性

项目中，通常需要引入外部 css 文件或者 js 文件

```html
<link rel="stylesheet" href="index.css" type="text/css">
<script src="index.js" type="text/javascript"></script>
```

这些标签有默认属性，因此就不需要在标签中声明了，修改如下：

```html
<link rel="stylesheet" href="index.css">
<script src="index.js"></script>
```

### 注释规范

注释对于团队开发和后期维护有着重要的作用，但是也增加了代码的体积。尽量不要写注释，尽可能减少文档的体积，如果必须要添加注释，那么就要遵循如下规则：

+ 详尽注释，解释代码解决问题、解决思路、是否为新鲜方案等
+ 模块注释，Github 建议不使用模块结束注释

```html
<!-- 列表模块 -->
<div></div>
<!-- /列表模块 -->
```

待办注释，给人一个提示

```html
<!-- TODO:待办事项 -->
```

### 标签嵌套规则

通常情况下行内级元素不能包含块级元素，注意的是“通常”，也就是说大部分元素都要遵守前面的的规则

在 HTML5 中元素的分类已经不是按照块级元素和行内元素来分了，而是按照如下分类来分：**Flow（流式元素）、Heading（标题元素）、Sectioning（章节元素）、Phrasing（段落元素）、Embedded（嵌入元素）、Interactive（交互元素）、Metadata（元数据元素）**

![better-code-1](../images/better-code-1.jpg)

+ Flow（流式元素）:在应用程序和文档的主体部分中使用的大部分元素都被分类为流式元素

> a， abbr， address， area（如果它是 map 元素的后裔），article， aside， audio， b， bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， del， details， dfn,  div, dl，em， embed， fieldset， figure， footer， form， h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， ins， kbd， keygen， label， map， mark， math， menu， meter，nav，noscript， object， ol， output， p， pre， progress， q， ruby， s， samp， script， section， select，small， span， strong， style（如果该元素设置了 scoped 属性）， sub， sup， svg， table，textarea， time，
u， ul， var， video， wbr， text

+ Heading（标题元素）:标题式元素定义一个区块/章节（section）（无论是明确的使用章节式内容的元素标记，或者标题式内容自身所隐含的）的标题

> h1， h2， h3， h4， h5， h6， hgroup

+ Sectioning（章节元素）:章节式元素是用于定义标题及页脚范围的元素

> article， aside， nav， section

+ Phrasing（段落元素）:段落式元素是文档中的文本、标记段落级文本的元素

> a（如果其只包含段落式元素）， abbr， area（如果它是 map 元素的后裔）， audio， b， bdi， bdo， br， button， canvas， cite， code， command， datalist， del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素）， mark， math， meter， noscript， object， output， progress， q， ruby， s， samp， script，select， small， span， strong， sub， sup， svg， textarea，
time， u， var， video， wbr， text

+ Embedded（嵌入元素）:嵌入式元素是引用或插入到文档中其他资源的元素

> audio， canvas， embed， iframe， img， math， object， svg， video

+ Interactive（交互元素）:交互式元素是专门用于与用户交互的元素

> a， audio（如果设置了 controls 属性）， button， details， embed， iframe， img（如果设置了 usemap 属性）， input（如果 type 属性不为 hidden 状态）， keygen， label， menu（如果 type 属性为 toolbar 状态），object（如果设置了 usemap 属性）， select， textarea， video（如果设置了 controls 属性）

+ Metadata（元数据元素）:元数据元素是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

> base，command，link，meta，noscript，script，style，title

各分类会有交叉或重叠的现象，这说明在 html5 中，元素可能属于上述所有分类中的一个或多个

需要注意的是，HTML5 中的这种元素分类与 inline、block 没有任何关系，任何元素都可以在 CSS 中被定义为 display:inline 或者 display:block

+ 元素开始与结束标签嵌套错误，页面可以在大部分浏览器被正常解析，IE9 会出现解析错误
+ 在`<p>`元素内嵌入`<div>`等元素造成所有浏览器的解析错误

```html
<p><div></div></p>
```

以上写法会被 Chrome 内核浏览器解析成

```html
<p></p>
<div></div>
<p></p>
```

+ 在`<a>`元素内嵌入`<a>`元素会导致所有浏览器的解析错误
+ 在列表元素`<li><dt><dd>`等插入非列表兄弟元素会导致 IE6\IE7 的解析错误

每个元素基本都有自己的嵌套规则（即父元素可以是什么，子元素可以是什么），除了严格嵌套约束之外的一些规则就是语义嵌套约束，对于语义嵌套约束，如果不遵守，页面可能正常，但也可能解析错误，尽量要遵守，不过也要遵循最佳实践，比如导航菜单经常就会有`<ul>`元素作为`<li>`的子元素

### 宽高分离

所谓“宽度分离原则”，就是 CSS 中的 width 属性不与影响宽度的
 padding/border （有时候包括 margin）属性共存，也就是不能出现以
下的组合：

```css
.box { 
  width: 100px;
  border: 1px solid;
}
```

而是 width 单独占用一层标签, 其他属性利用流动性在内部自适应

```css
.father {
  width: 180px;
}
.son {
  margin: 0 20px;
  padding: 20px;
  border: 1px solid;
}
```

当一件事情的发展可以被多个因素所左右的时候，这个事情最终的结果就会变数很大而不可预期。宽度在这里也是类似，由于盒尺寸中的 4 个盒子都能影响宽度，自然页面元素的最终宽度就很容易发生变化而导致意想不到的布局发生

### 不要使用 * 选择器

这种做法易产生没必要的消耗。通配符应该是一个慎用的选择器，因为它会选择所有的标签元素。对于普通内联元素（非图片等替，box-sizing 无论是什么值，对其渲染表现都没有影响，因此，对这些元素而言就是没有必要的消耗
