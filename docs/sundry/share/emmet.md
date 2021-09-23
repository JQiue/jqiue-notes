---
title: 起飞吧，HTML
category: Web
tags: [emmet, Beta]
time: 2019-05-12
author: JQiue
---

有没有在写 HTML 大量的标签、属性、引号等写法所恶心到？以及同样在编写 CSS时，要写很多的属性、属性值、大括号和分号等。当然，大多数的文本编辑器都或多或少带有代码自动提示功能，在开发之时，帮了很大的忙，但仍然需要手动输入很多代码。而 Emmet 插件，集成了很多代码片段的缩写，在开发时只需要输入简单的缩写，按`tab`键或`Ctrl+E`键就能扩展出所需的代码片段，令人高兴的是，大部分编辑器都集成了该插件，因此没必要去手动安装

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

一次性生成多个相同元素`ul>li*5`:

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

+ `E#id`添加id名
+ `E.class`添加类名
+ `E[attr]`添加属性
+ `E{text}`添加文本

Emmet 不但能够生成标签，还能生成 CSS 属性，Emmet 定义了所有已知 CSS 属性的缩写。比如`font-size`缩写是`fz`，`border` 缩写是`bd`

Emmet 不仅能生成属性名，还能带着一起生成属性值，比如`fz14`会生成`font-size: 14px;`，`dib`生成`display: inline-block;`

更多详见[Emmet](https://docs.emmet.io/)