---
title: 更好的编写习惯
category: Web
tag: HTML
author: JQiue
article: false
---

## 教条式的规则

```html
<!DOCTYPE html>
```

```html
<html lang="en-US">
```

```html
<meta charset="utf-8">
```

```html
<meta name="viewport" content="width=device-width">
```

元素名字和属性名/值全部使用小写

抛弃尾随的斜杠

```html
<input type="text">
```

有些标签是可闭合也可以不闭合，比如`<body>`或者`<li>`等元素，但是这些最好还是闭合，虽然代码简化了，但是可读性会变的很差

```html
<ul>
  <li>item1
  <li>item2
</ul>
```

上面的确实变的简单，但感觉很奇怪，尤其是在复杂的代码中更是如此。修改如下：

```html
<ul>
  <li>item1</li>
  <li>item2</li>
</ul>
```

其实可以在后期的压缩环节实现删除可选闭合的部分，写代码的时候还是要保留，提高阅读性

有不少标签属性，无需设置属性值，比如 disabled、checked 与 selected

```html
<input type="checkbox" checked>
<input type="checkbox" checked="true">
<input type="checkbox" checked="checked">
```

以上都会被选中，实际上 checked 属性不需要设置值，只需要添加此属性，复选框就会被选中，disabled 或者 selected 等属性也是同样的道理，无需设置属性值，可以节省若干代码量，也符合标准

## 内容、表现和行为分离

内容、表现和行为分离是前端页面基本原则

1. 网页的组成部分

应用于项目中的网页通常有如下几个部分构成：

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

```javascript
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

## 属性顺序

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

## type 属性

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

## 注释规范

注释对于团队开发和后期维护有着重要的作用，但是也增加了代码的体积。尽量不要写注释，尽可能减少文档的体积，如果必须要添加注释，那么就要遵循如下规则：

+ 详尽注释，解释代码解决问题、解决思路、是否为新鲜方案等
+ 模块注释，github建议不使用模块结束注释

```html
<!-- 列表模块 -->
<div></div>
<!-- /列表模块 -->
```

待办注释，给人一个提示

```html
<!-- TODO:待办事项 -->
```

## 标签嵌套规则

通常情况下行内级元素不能包含块级元素，注意的是“通常”，也就是说大部分元素都要遵守前面的的规则。

在HTML5中元素的分类已经不是按照块级元素和行内元素来分了，而是按照如下分类来分：**Flow（流式元素）、Heading（标题元素）、Sectioning（章节元素）、Phrasing（段落元素）、Embedded（嵌入元素）、Interactive（交互元素）、Metadata（元数据元素）**

![1](http://qs0jixwj6.hn-bkt.clouddn.com/web-html-5.jpg)

+ Flow（流式元素）:在应用程序和文档的主体部分中使用的大部分元素都被分类为流式元素

> a， abbr， address， area（如果它是map元素的后裔）， article， aside， audio， b， bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， del， details， dfn,  div, dl，em， embed， fieldset， figure， footer， form， h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， ins， kbd， keygen， label， map， mark， math， menu， meter，nav，noscript， object， ol， output， p， pre， progress， q， ruby， s， samp， script， section， select，small， span， strong， style（如果该元素设置了scoped属性）， sub， sup， svg， table，textarea， time，
u， ul， var， video， wbr， text

+ Heading（标题元素）:标题式元素定义一个区块/章节（section）（无论是明确的使用章节式内容的元素标记，或者标题式内容自身所隐含的）的标题

> h1， h2， h3， h4， h5， h6， hgroup

+ Sectioning（章节元素）:章节式元素是用于定义标题及页脚范围的元素

> article， aside， nav， section

+ Phrasing（段落元素）:段落式元素是文档中的文本、标记段落级文本的元素

> a（如果其只包含段落式元素）， abbr， area（如果它是map元素的后裔）， audio， b， bdi， bdo， br， button， canvas， cite， code， command， datalist， del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素）， mark， math， meter， noscript， object， output， progress， q， ruby， s， samp， script，select， small， span， strong， sub， sup， svg， textarea，
time， u， var， video， wbr， text

+ Embedded（嵌入元素）:嵌入式元素是引用或插入到文档中其他资源的元素

> audio， canvas， embed， iframe， img， math， object， svg， video

+ Interactive（交互元素）:交互式元素是专门用于与用户交互的元素

> a， audio（如果设置了controls属性）， button， details， embed， iframe， img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label， menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， textarea， video（如果设置了controls属性）

+ Metadata（元数据元素）:元数据元素是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

> base，command，link，meta，noscript，script，style，title

各分类会有交叉或重叠的现象，这说明在html5中，元素可能属于上述所有分类中的一个或多个

需要注意的是，HTML5中的这种元素分类与inline、block没有任何关系，任何元素都可以在CSS中被定义为display:inline或者display:block

+ 元素开始与结束标签嵌套错误，页面可以在大部分浏览器被正常解析，IE9会出现解析错误
+ 在`<p>`元素内嵌入`<div>`等元素造成所有浏览器的解析错误

```html
<p><div></div></p>
```

以上写法会被Chrome内核浏览器解析成

```html
<p></p>
<div></div>
<p></p>
```

+ 在`<a>`元素内嵌入`<a>`元素会导致所有浏览器的解析错误
+ 在列表元素`<li><dt><dd>`等插入非列表兄弟元素会导致IE6\IE7的解析错误

每个元素基本都有自己的嵌套规则（即父元素可以是什么，子元素可以是什么），除了严格嵌套约束之外的一些规则就是语义嵌套约束，对于语义嵌套约束，如果不遵守，页面可能正常，但也可能解析错误，尽量要遵守，不过也要遵循最佳实践，比如导航菜单经常就会有`<ul>`元素作为`<li>`的子元素
