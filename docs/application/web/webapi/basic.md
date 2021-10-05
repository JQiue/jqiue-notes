---
title: 介绍
category: Web
tags: [Alpha]
author: JQiue
article: false
---

JavaScript 最初就是为 Web 浏览器创建的，虽然在此之后发展成了具有多种用途和平台的语言，平台可以是浏览器，一个 Web 服务器，或者其他的主机，它们每一个都提供了特定于平台的功能，JavaScript 将它称之为主机环境

主机环境提供了自己的对象和语言核心以外的函数，比如浏览器提供了控制网页的方法，NodeJS 提供了服务器端功能

那么 WebAPI 是为 JavaScript 提供的一套操作浏览器和页面元素功能的 api，就是一堆写好的函数和一些内置的对象，由 BOM 和 DOM 两部分组成。用 JavaScript 访问这些 api 来操作 BOM 和 DOM 就可以实现一些交互功能，所以需要一定的 JavaScript 语法基础

::: tip
api 是一个程序预定义的接口，开发人员能够通过这些接口来对一个程序做一些操作，Web APIs 就是浏览器提供的一套接口
:::

在这里的主机环境中，有一个叫做`window`的根对象，它扮演了两个角色：代表 JavaScript 的全局对象，代表浏览器窗口，提供了控制的方法

所以如果在浏览器中，这样的代码是等效的：

```js
function foo() {
  console.log('foo');
}

// 全局函数就是全局对象的方法
window.foo();
```

在浏览器中，window 由三个部分组成：DOM，BOM，JavaScript 核心

## DOM

文档对象模型（Document Object Model）简称 DOM，它提供了对 HTML 文档的结构化描述，定义了一些方式使程序能够改变文档的结构、样式和内容，DOM 将 HTML 文档解析成了一个由节点和对象组成的数据集合。DOM 是对页面的完全面向对象的表述，可以使用 JavaScript 进行修改，一个在 HTML 文档中运行的 JavaScript 能够访问`document`对象来进行 DOM 操作，DOM 文档中的逻辑结构可以用节点树来表示，通过对文档的解析，元素就被转换为 DOM 树中的节点对象

除此之外，还有一份针对 CSS 规则和样式表的单独规范 CSSOM（CSS Object Model），它描述了如何将 CSS 表示为对象，并修改它们，通常情况下 CSSOM 和 DOM 是一起使用的，但是很少通过 JavaScript 修改样式，只是做一些 CSS 类的添加和移除

## BOM

BOM 是浏览器对象模型（Browser Object Model）的缩写，它提供了 DOM 之外而与浏览器窗口进行交互的 api，由一些对象组成，被称为宿主对象。可以用来管理浏览器历史、地址、浏览器信息

比如`alert/confirm/prompt`就是 BOM 中的部分，它们和 DOM 没有直接关系

在 HTML 规范中，不仅是 HTML 语言（标签，特性），还包括一些对象、方法和浏览器特定的 DOM 扩展，这是广义上的 HTML
