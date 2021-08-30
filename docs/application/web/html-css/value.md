---
title: CSS 属性的取值
category: Web
tags: [CSS, Alpha]
author: JQiue
article: false
---

每个 CSS 属性对于它可以接收的值都有不同的规定，有的属性只接受预定义的值，有的能接受数字、相对值、百分数、URL 或颜色，且有的可以接受多种类型的值

## inherit

`inherit`可用于任何属性，如果希望该属性的取值和对应的父元素取值相同，就可以使用它

::: demo inherit

```html
<article>
  <p>段落一</p>
</article>
```

```css
article {
  border: 1px solid black;
}
p {
  border: inherit;
}
```

:::

## 预定义的值

大部分属性都有可供使用的预定值，比如，`text-align`可被设置为`center`、`left`、`right`，这些预定值都不需要引号包裹

::: demo

```html
<p>center</p>
```

```css
p {
  text-align: center;
}
```

:::

## 长度和百分数

大部分 CSS 属性值都是长度，所有的长度都应该包括数字和单位，唯一例外的是 0，但是有些单位的取值不一定是绝对的，也可能是相对的

## 纯数字

少部分的属性接受不带单位的数字，比如`line-height`、`z-index`、`opacity`

## URL

像一些需要引用外部的文件的属性，就应该使用`url(file.ext)`，比如`background-image`就是这样的属性，`file.ext`是一种目标文件的路径及文件名，它不需要引号包裹

## 颜色

颜色是 CSS 中最常用的值，但是它们的取值都有一些不相同的地方

### 预定义的颜色

在 HTML 中一些常见的颜色都有对应的英文单词取值，但是它是有限制的，不是所有的颜色都能够用英文单词表达

::: demo 英文单词

```html
<span style="color:red">红色</span>
<span style="color:green">绿色</span>
<span style="color:blue">蓝色</span>
```

:::

### 十六进制

也可以通过十六进制来表示颜色，本质上就是 rgb，每两位表示一个颜色，格式：#000000，前两位代表 R，中间两位代表 G，后面两位代表 B，取值范围`0~F`，两位数的十六进制正好能够表示`0~255`。只要两位值是一样的就可以缩写成一位，否则不能简写，字母也可以小写

::: demo 十六进制

```html
<span style="color:#FF0000">红色</span>
<span style="color:#00FF00">绿色</span>
<span style="color:#0000FF">蓝色</span>
```

:::

### RGB

rgb 就是三原色（**r**ed，**g**reen，**b**lue），通过三原色来混合出不同的颜色，相对于英文单词来说取值更加精确，表现能力更加丰富，可以使用百分数、0~255 之间的取值来指定颜色

::: demo RGB

```html
<span style="color:rgb(255,0,0)">红色</span>
<span style="color:rgb(0,255,0)">绿色</span>
<span style="color:rgb(0,0,255)">蓝色</span>
```

:::

这个格式中的每一个数字都用来设置相对应位置的三原色的亮度，每一个数字的取值是`0~255`之间，0 代表不发光，数值越大就越亮

### RGBA

CSS3 中新增的一种方式，在 RGB 的基础上增加了透明度，最后一个数字用来控制透明度，取值在`0~1`之间，数字越小就越透明

::: demo RGBA

```html
<span style="color:rgb(255,0,0,1)">红色</span>
<span style="color:rgb(255,0,0,0.5)">红色</span>
<span style="color:rgb(255,0,0,0)">红色</span>
```

:::

### HSL 和 HSLA

CSS3 中新增的，HSLA 是除了 RGBA 以外另一种设置透明的方式，HSL 代表色相、饱和度、亮度。色相取值为0 ~ 360，饱和度和亮度取值均为百分数

::: demo

```html
<p id="p1">段落一</p>
<p id="p2">段落二</p>
<p id="p3">段落三</p>
```

```css
#p1 {color:hsl(0, 100%, 50%)}
#p2 {color:hsl(120, 100%, 50%)}
#p3 {color:hsl(300, 100%, 50%)}
```

:::
