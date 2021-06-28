---
title: 介绍
category: Web
tab: 前端
author: JQiue
article: false
---

Web API 是一套操作浏览器和页面元素功能的 api，就是一堆写好的函数和一些内置的对象，由 BOM 和 DOM 两部分组成。用 JavaScript 访问这些 api 来操作 BOM 和 DOM 就可以实现一些交互功能，所以需要一定的 JavaScript 语法基础

::: tip
api 是一个程序预定义的接口，开发人员能够通过这些接口来对一个程序做一些操作，Web APIs 就是浏览器提供的一套接口
:::

## DOM

文档对象模型（Document Object Model）简称 DOM，它提供了对 HTML 文档的结构化描述，定义了一些方式使程序能够访问结构改变文档的结构、样式和内容，DOM 将 HTML 文档解析成了一个由节点和对象组成的数据集合，DOM 是对页面的完全面向对象的表述，可以使用 JavaScript 进行修改，一个在 HTML 文档中运行的 JavaScript 能够访问`document`对象来进行 DOM 操作，DOM 文档中的逻辑结构可以用节点树来表示，通过对文档的解析，元素就被转换为 DOM 树中的节点对象

## BOM

BOM 是浏览器对象模型（Browser Object Model）的缩写，它提供了独立网页内容而与浏览器窗口进行交互的 api，由一些对象组成，被称为宿主对象，可以用来管理浏览器历史、地址、浏览器信息，其中`window`是最核心的一个对象，它是浏览器窗口的一个实例，因此产生了其他对象，比如：document、location、history 等等
