---
title: 这年头还要学 jQuery ？
category: Web
article: false
---

::: info 前置知识
HTML/CSS/JavaScript/WebAPI
:::

根据名字就知道，jQuery 就是一款查询的库，简化了原生 JS 操作，毕竟口号是：写得少，做的多

jQuery 本质是一个闭包函数，不同函数内部的数据不会相互干扰

jQuery 在被引入后，就像这样用：

```js
jQuery();
```

这大小写的方式也太反人类了，jQuery 提供了`$()`来代替`jQuery()`，这样更加省事，它们是等价的

```js
$();
```

`$()`的值可以是很多东西，jQuery 会做不同的处理

## 加载

通常情况下，`window.onload`只会在文档加载完成后被执行一次，即使多次编写，这是因为被后面的覆盖了

但`$(callback)`同样会在文档加载完成后执行其中的回调，可以使用任意多个

```js
$(document).ready(function () {});
$(function () {});
```

## 选择器

`$(selector, [context])`接受一个 CSS 选择器字符串，进行页面元素的匹配，如果没有传入`context`，jQuery 就会在当前`document`中查找

## 创建元素

`$(html)`可以接受一个包含 HTML 标记的字符串，然后动态的创建由 jQuery 对象包装的 DOM 元素，相当于`$(document.createElement('div'))`

## 事件

<!-- more -->

## ajax

## 元素

## 文档

## CSS

## 效果

## 静态方法

+ `each`：遍历对象或数组
+ `map`：遍历对象或数组

## 释放使用权

很多 JavaScript 库都提供了类似 jQuery 这样便捷的访问方式，所以很有可能在使用多个库时，多个库作者提供的便捷访问方式冲突(A 库通过`$`访问，B 框架也通过`$`访问)

因此 jQuery 提供了一个`jQuery.noConflic()`静态方法来释放`$`的使用权，它会返回新的 jQuery 函数。之后的操作应该在这个方法后面执行

```js
const jq = jQuery.noConflic();
jq(function () {});
```

当然，`$`在前端已经成为了 jQuery 的代表性符号，应该没有哪个库的作者去碰瓷 jQuery

## 插件

<!-- more -->