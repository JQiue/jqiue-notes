---
title: 选择器
category: Web
tags: [Alpha]
author: JQiue
article: false
---

选择器简单来说就是 CSS 选择 HTML 元素的工具，通过某一种特征来选中 HTML 元素，并应用相关样式

## 基本选择器

基本选择器有：

+ 标签
+ id
+ 类
+ 通配符
+ 属性

通过 HTML 标签名称匹配元素，选中当前页面上所有此类型的元素，无论藏的有多深，但是不能选中某一个：`标签名 {样式声明}`

::: demo 标签选择器

```html
<p>标签选择器<p>
<ul>
  <li>
    <ul>
      <li>
        <p>标签选择器</p>
      </li>
    </ul>
  </li>
</ul>
```

```css
p {
  color: red;
}
```

:::

由于元素的`id`属性是唯一的，也可以通过`id`选择器来选中具体的元素，`#id属性值 {样式声明}` = `[id=属性值] {样式声明}`（属性选择器）

::: demo id 选择器

```html
<p>id 选择器<p>
<ul>
  <li>
    <ul>
      <li>
        <p id="identity">id 选择器</p>
      </li>
    </ul>
  </li>
</ul>
```

```css
#identity {
  color: red;
}
```

:::

如果想要设置某些元素的样式，但是又不能全部选中，因此标签选择器和 id 选择器是不适合的，但是元素的类名是可以重复的：`.类名 {样式声明}` = `[class~=类名] {样式声明}`

::: demo 类选择器

```html
<p>类选择器<p>
<p class="p-red">类选择器<p>
<ul>
  <li>
    <ul>
      <li>
        <p class="p-red">类选择器</p>
      </li>
    </ul>
  </li>
</ul>
```

```css
.p-red {
  color: red;
}
```

:::

一个 HTML 元素的`class`属性也可以有多个取值

::: demo 类选择器

```html
<p>类选择器<p>
<p class="p-red">类选择器<p>
<ul>
  <li>
    <ul>
      <li>
        <p class="p-red p-font">类选择器</p>
      </li>
    </ul>
  </li>
</ul>
```

```css
.p-red {
  color: red;
}
.p-font {
  font-size: 18px;
}
```

:::

::: tip id 和 class
id 是唯一的，一个 HTML 标签只能绑定一个 id 值，class 并不是唯一的，可以绑定多个值，一般情况下 id 是配合 JavaScript 使用的，否则不要使用 id 设置样式。合理的利用 class 设置样式，可以减少一些冗余的代码，这很能看出一个人的水平
:::

`*`就是一个通配符选择器，匹配页面上所有的元素：`* {样式声明}`

::: demo 通配符选择器

```html
<p>通配符选择器</p>
<ul>
  <li>通配符选择器</li>
  <li>通配符选择器</li>
</ul>
```

```css
* {
  color: green;
}
```

:::

属性选择器是根据已存在的属性名或属性值匹配元素

```css
/* 存在 title 属性的元素 */
[title] {
  color: purple;
}

/* 存在 title 属性并且属性值是 "https://jinqiu.wang" 的元素 */
[title="https://jinqiu.wang"] {
  color: green;
}

/* 存在 id 属性并且属性值子串包含 "jinqiu" 的元素 */
[id*="jinqiu"] {
  color: blue;
}

/* 存在 id 属性并且属性值结尾是 ".wang" 的元素 */
[id$=".wang"] {
  color: red;
}

/* 存在 class 属性并且属性值是多个，包含"logo"的元素 */
[class~="logo"] {
  color: pink;
}
```

::: demo 属性选择器

```html
<div title="foo">foo<div>
<div title="https://jinqiu.wang">bar<div>
<div id="wjq">quz<div>
<div data-suffix="https://jinqiu.wang">qux<div>
<div class="header logo">class<div>
```

```css
[title] {
  color: purple;
}
[title="https://jinqiu.wang"] {
  color: green;
}
[id*="wjq"] {
  color: blue;
}
[data-suffix$=".me"] {
  color: red;
}
[class~="logo"] {
  color: pink;
}
```

:::

## 关系选择器

由多个选择器构成的复合选择器，通过元素在其位置的上下文关系来选中，至少需要两个选择器构成

选择器关系|选择的元素
-|-
A E（后代）| 元素 A 的任意后代元素 E (后代节点指 A的 子节点，子节点的子节点，以此类推)
A>E（直接子元素）| 元素 A 的任意子元素 E (也就是直系后代)
B+E（相邻兄弟）| 元素 B 的任意下一个兄弟元素 E
B~E（相同兄弟）| B 元素的之后的所有同级元素 E
AB（相交）| A 元素和 B 元素相交的元素
A,B（并集）| 元素 A 和元素 B 并集的元素

后代选择器匹配指定元素的所有后代元素，无论有多深

::: demo 后代选择器

```html
<p>后代元素</p>
<div class="parent">
  <p>后代元素</p>
  <p>后代元素</p>
  <div>
    <p>后代元素</p>
    <p>后代元素</p>
  </div>
</div>
<p>后代元素</p>
```

```css
.parent p {
  color: red;
}
```

:::

直接子元素选择器匹配指定元素的直接子元素，而不是所有的1后代元素

::: demo 子元素选择器

```html
<p>子元素</p>
<div class="parent">
  <p>子元素</p>
  <p>子元素</p>
  <div>
    <p>子元素</p>
    <p>子元素</p>
  </div>
</div>
<p>子元素</p>
```

```css
.parent>p {
  color: red;
}
```

:::

交集选择器匹配指定元素之间的相交元素

::: demo 交集选择器

```html
<p>交集元素</p>
<p class="foo">交集元素</p>
<p class="foo">交集元素</p>
<p>交集元素</p>
```

```css
p.foo {
  color: red;
}
```

:::

并集选择器匹配指定选择器中所有的并集元素

::: demo 并集选择器

```html
<p class="foo">并集元素</p>
<p class="bar">并集元素</p>
<p class="foo">并集元素</p>
<p class="bar">并集元素</p>
```

```css
.foo,.bar {
  color: red;
}
```

:::

相邻兄弟选择器选中紧跟在指定元素后面的元素，一定是相邻的

::: demo 相邻兄弟选择器

```html
<div>相邻兄弟选择器</div>
<p>相邻兄弟选择器</p>
<p>相邻兄弟选择器</p>
<div>相邻兄弟选择器</div>
<p>相邻兄弟选择器</p>
```

```css
div+p {
  color: red;
}
```

:::

通用兄弟选择器选中指定元素后面的元素，不一定相邻

::: demo 通用兄弟选择器

```html
<div>通用兄弟选择器</div>
<p>通用兄弟选择器</p>
<span>通用兄弟选择器</span>
<p>通用兄弟选择器</p>
<div>通用兄弟选择器</div>
<p>通用兄弟选择器</p>
<p>通用兄弟选择器</p>
```

```css
div~p {
  color: red;
}
```

:::

## 伪类选择器

伪类一般反映的是无法在 CSS 中可以轻松可靠检测到的元素的状态或者属性，同一个标签，根据不同的状态，有不同的样式

+ 静态伪类：只能用于`超链接`的样式
  + `:link`：超链接点击之前
  + `:visited`：超链接点击之后
+ 动态伪类：所有的标签都适用
  + `:hover`：鼠标放到标签上
  + `:active`：鼠标长按标签
  + `:focus`：某个标签获得了焦点（比如输入框）

::: demo 伪类

```html
<a href="www.taobao.com">淘宝</a>
```

```css
a:link {
  color: red;
}

a:visited {
  color: green;
}

a:hover {
  color: blue;
}

a:active {
  color: purple;
}
```

:::

::: tip 超链接的四种状态
`<a>`标签有四种伪类：`link`,`visited`,`hover`,`active`
> 必须按照”爱恨原则“顺序进行书写，即：love hate
:::

## 伪类结构选择器

根据元素在文档中所处的位置来选中

+ `:first-child`：同级第一个元素
+ `:last-child`：同级最后一个元素
+ `:first-of-type`：同级中同类型第一个元素
+ `:last-of-type`：同级中同类型最后一个元素
+ `:nth-child(an+b)`：同级别第 n 个元素，从前往后
+ `:nth-last-child(an+b)`：同级别第 n 个元素，从后往前
+ `:nth-of-type(an+b)`：同级中同类型第 n 个元素
+ `:nth-last-of-type(an+b)`：同级中同类型第 n 个元素，从后往前

::: tip
a 和 b 是用户自定义的取值，而 n 是一个计数器，从 0 开始递增，如果取值为`odd`，则选中所有的奇数元素，`even`则选中所有的偶数元素
:::

## 伪元素选择器

伪元素是在匹配选中的元素的某一个位置添加一个虚拟的行内元素，在 CSS2 中伪元素通常用一个`:`来表示，但是为了区分和伪类的关系，在 CSS3 中引入了`::`来表示

+ `::before`：成为匹配选中元素的第一个子元素
+ `::after`：成为匹配选中元素的最后一个子元素
+ `::first-letter`：选中元素的第一个字母
+ `::first-line`：选中元素的首行

使用`::before`或`::after`的选择器，通过`content`属性来为这个伪元素添加内容

::: demo 伪元素选择器

```html
<span>内容</span>
```

```css
span::before {
  content: "♥";
}

span::after {
  content: "→";
}
```

:::

::: tip
content 属性可以插入内容，也可以不插入，也可以插入图片，也可以通过`attr()`获取元素的属性插入
:::
