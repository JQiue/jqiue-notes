---
title: 拖拽
category: Web
tags: [Alpha]
author: JQiue
article: false
---

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

在网页中，有几种特定的情况会使用默认的推拽行为，比如拖拽选中文本，推拽图像和推拽链接等，当一个图像或链接被拖拽时，图像或链接的 URL 会被设定为拖拽数据

除了图像、链接、选择的文本可以被拖拽之外，其它的元素在默认情况下是不可拖拽的，要使它们可拖拽必须完成三件事：

+ 设置元素的`draggable`属性为`true`
+ 为`dragstart`事件添加一个监听程序
+ 在监听程序中设置拖拽数据

::: tip
当一个元素被设置为可拖拽时，其中的文本和子元素无法选中
:::

所有拖拽事件都有一个名为`dataTransfer`的属性，它持有拖拽数据，当拖拽文本时，数据就是文本本身，拖拽链接时，数据就是链接的 URL

<!-- to be updated -->