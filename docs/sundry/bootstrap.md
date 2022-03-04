---
title: 经典的 CSS 框架 Bootstrap
category: Web
author: JQiue
article: false
---

Bootstrap 是一个非常老，但又经典的 CSS 框架，很多前端 UI 库都或多或少的进行了借鉴和参考。Bootstrap 的使用是基于 class 类名的方式，绝大多数都是这样

## 网格系统

网格系统是让 Bootstrap 出名的一个最主要的功能，它会让页面布局随着屏幕的大小改变，自动改变页面布局

在使用网格系统之前，首先要定义一个容器，容器是 Bootstrap 中最基本的布局元素，使用网格系统是必须的，有三种不同的容器：

+ `.container`, 在每个响应断点处设置最大宽度
+ `.container-fluid`, 所有断点处100%
+ `.container-{breakpoint}`, 宽度：100%，直到指定的断点

```html
<div class="container"></div>
```

然后才能开始使用网格系统，原理是基于行和列的，以下会产生一行两列的布局，每一个列都会均匀的分配剩余的宽度，也就是说下面的列是等宽的，`col-*`也可以用在`row`的外部单独使用

```html
<div class="container">
  <div class="row">
    <div class="col">col1</div>
    <div class="col">col2</div>
  </div>
</div>
```

有时列并不是等宽的，需要一些可自定义的宽度，在这种布局中，Bootstrap 为每一行分配了 12 个列，使用`col-*`，`col-2`表示在 12 个列的宽度中，占据 2 个列的宽度

```html
<div class="container">
  <div class="row">
    <div class="col-2">col1</div>
    <div class="col-2">col2</div>
  </div>
</div>
```

Bootstrap 提供了断点机制，用于在不同屏幕的宽度下调整布局，有六个默认的断点

断点 | 类中缀 | 分辨率
---|---|---
X-Small | None | <576px
Small | `sm` | ≥576px
Medium | `md` | ≥768px
Large | `lg` | ≥992px
Extra large | `xl` | ≥1200px
Extra extra large| `xxl` | ≥1400px

`col-sm-2`表示在屏幕宽度大于 576px 时应用该样式，否则单独占据一行，其他的以此类推

```html
<div class="container">
  <div class="row">
    <div class="col-sm-2">col1</div>
    <div class="col-2">col2</div>
  </div>
</div>
```

如果想控制列在行中的垂直布局可以使用`align-items-*`，这要求行具有一定的高度

+ `align-items-start`：对齐顶部
+ `align-items-center`：居中对齐
+ `align-items-end`：对齐底部

如果想要控制列在行中的水平布局可以使用`justify-content-*`

+ `justify-content-start`：左对齐
+ `justify-content-center`：居中对齐
+ `justify-content-end`：右对齐
+ `justify-content-around`：围绕对齐
+ `justify-content-between`：两端对齐
+ `justify-content-evenly`：均匀对齐

甚至可以使用`order-*`来控制列的排版顺序，取值为`0~5`

`offset-*`可以控制列的偏移量，会将列的左边距增加`*`列，由`margin`属性实现

`p-*`用于调整四个方向的内边距，`px-*`调整水平方向的内边距，`py-*`调整垂直方向的内边距

`g-*`用于控制水平和垂直方向的间隙，`gx-*`可以控制列之间的水平间隙，而`gy-*`则控制垂直方向的间隙，它们都由`padding`实现，当`g-0`则会清除网格内的列间隙

## 通用类

通用类是指对大部分元素可用的通用 CSS 类名

外边距和内边距的前缀分别是`m-*`和`p-*`，然后：

sides设定：

+ t - 设定margin-top或是padding-top
+ b - 设定margin-bottom或是padding-bottom
+ s - 在LTR设定margin-left或是padding-left，RTL设定margin-right或是padding-right
+ e - 在LTR设定margin-right or padding-right，RTL设定margin-left或是padding-left
+ x - 同时设定*-left和*-right
+ y - 同时设定*-top和*-bottom
+ blank - 空白-同时设定margin或padding在元素的四个边缘

size设定：

+ 0 - 设定margin或是padding为0
+ 1 - （预设）设定margin或是padding为$spacer * .25
+ 2 - （预设）设定margin或是padding为$spacer * .5
+ 3 -（预设）设定margin或是padding为$spacer
+ 4 - （预设）设定margin或是padding为$spacer * 1.5
+ 5 - （预设）设定margin或是padding为$spacer * 3
+ auto - 设定margin为auto

背景类使用`bg-*`前缀，可以有以下取值：

+ .bg-primary
+ .bg-secondary
+ .bg-success
+ .bg-danger
+ .bg-warning
+ .bg-info
+ .bg-light
+ .bg-dark
+ .bg-body
+ .bg-white
+ .bg-transparent

## 导航

必须使用一个`navbar`来包装导航

```html
<div class="navbar"></div>
```

如果想要在响应式视图中折叠某个元素，可以增加`navbar-expand-{breakpoint}`，然后在要折叠的元素上增加`navbar-collapse`。注意，折叠的元素最好使用`collapse`包装一下

```html
<div class="navbar navbar-expand-lg">
  <div class="collapse navbar-collapse" id="navmenu"></div>
</div>
```

要想控制折叠的元素可以添加一个带`navbar-toggler`的按钮，然后添加`data-bs-toggle="collapse"`属性指定为折叠控制器，使用`data-bs-target="{Selector}"`指定要被控制的折叠元素，属性值是该元素的选择器

```html
<div class="navbar navbar-expand-lg">
  <button class="navbar-toogler" data-bs-toggle="collapse" data-bs-target="#navmenu"></button>
  <div class="collapse navbar-collapse" id="navmenu"></div>
</div>
```
