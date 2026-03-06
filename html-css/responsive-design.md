---
title: 响应式网站设计
category: Web
tag: [HTML, CSS]
article: false
---

随着设备形态越来越丰富，网页早就不只出现在桌面显示器上，还会出现在手机、平板、横屏、竖屏以及各种分辨率环境中。响应式 Web 设计（Responsive Web Design, RWD）的目标，不是为每一种设备单独做一套页面，而是让同一套页面能够根据环境自动调整。

响应式设计不是某一项单独的技术，而是一组设计和实现策略。它通常依赖以下几类能力：

+ 可随容器缩放的图像和媒体
+ 灵活的、基于相对单位的布局
+ 根据视口条件覆盖样式的媒体查询
+ 明确告诉移动浏览器如何计算页面宽度的 viewport 设置

## 视口（Viewport）

对于 PC 端来说，视觉区域通常和浏览器窗口宽度一致；但在移动端，浏览器往往会先假设一个更宽的桌面视口，再把整个页面缩小显示。这会导致页面虽然“完整显示”了，但文字和交互区域都变得很难阅读。

要解决这个问题，需要在 HTML 文档的 `<head>` 中加入 viewport 元标签：

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

这段代码中最关键的是：

+ `name="viewport"`：声明这是一个控制视口的元标签
+ `width=device-width`：让布局视口宽度等于设备宽度
+ `initial-scale=1`：设置页面初始缩放比例

如果没有这句设置，很多移动端页面虽然 technically 能打开，但实际体验会像被整体缩小了一遍。

## 可伸缩的图像和媒体

图像默认会按照原始尺寸显示。在大屏上这通常不是问题，但一旦进入窄屏设备，原始尺寸的图片很可能直接撑破布局。

常见做法是：

```css
img {
  max-width: 100%;
  height: auto;
}
```

这里通常更推荐 `max-width: 100%`，而不是直接写 `width: 100%`。因为 `width: 100%` 会强制图片尽可能填满父容器，连小图也会被放大，容易失真；而 `max-width: 100%` 只会在图片超出容器时将其缩小。

## 弹性布局与流式宽度

定宽页面在屏幕较窄时非常容易出现横向滚动条，这对响应式布局并不友好。一个更自然的思路，是让布局像图像一样随容器伸缩，这就是流式布局。

实现流式布局时，最常见的方式是使用相对单位，例如百分比：

```txt
指定宽度 / 容器宽度 = 百分比宽度
```

例如父容器宽度为 `960px`，子元素期望占 `600px`，那么：

```txt
600 / 960 = 0.625
```

也就是可以写成：

```css
width: 62.5%;
```

::: tip
在用百分比计算宽度时，要先弄清楚元素的“上下文”，也就是它的宽度是基于哪个父元素计算出来的。
:::

## 媒体查询

媒体查询允许根据设备特性为同一份 HTML 应用不同的 CSS 样式，是响应式设计中最常见的能力之一。

基本语法如下：

```css
@media logic type and (feature: value) {
  /* ... */
}
```

+ `logic`：可选，常见值有 `only` 和 `not`
+ `type`：媒体类型，如 `screen`
+ `feature`：媒体特性，如 `min-width`、`max-width`

常见的媒体特性包括：

+ `width`
+ `height`
+ `device-width`
+ `device-height`
+ `color`

在实际开发里，最常用的是 `min-width` 和 `max-width`。它们通常对应断点（breakpoints），也就是当屏幕达到某个宽度后，页面布局开始发生变化的节点。

| 条件        | 含义                                                   | 常见思路                                                   |
| ----------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| `min-width` | 样式应用于宽度大于等于指定值的设备                     | 常用于移动优先（Mobile First），从小屏样式开始向上覆盖     |
| `max-width` | 样式应用于宽度小于等于指定值的设备                     | 常用于桌面优先（Desktop First），从大屏样式开始向下适配     |

例如：

```html
<div class="container">媒体查询</div>
```

```css
.container {
  color: red;
}

@media screen and (min-width: 480px) {
  .container {
    color: blue;
  }
}
```

这段代码表示：默认文字为红色；当屏幕宽度至少为 `480px` 时，切换为蓝色。

## 移动优先

响应式设计里很常见的一种实践是移动优先（Mobile First）：先编写适用于最小屏幕的默认样式，再通过 `min-width` 在更大的屏幕上逐步覆盖。

例如希望：

1. 默认时内容区占满屏幕，背景色为浅蓝
2. 宽度达到 `768px` 时改成较宽的平板布局
3. 宽度达到 `1200px` 时改成桌面布局

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>响应式布局示例</title>
  <style>
    .container {
      background-color: #e0f7fa;
      width: 90%;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      text-align: center;
    }

    @media screen and (min-width: 768px) {
      .container {
        background-color: #e8f5e9;
        width: 700px;
      }
    }

    @media screen and (min-width: 1200px) {
      .container {
        background-color: #fffde7;
        width: 1100px;
      }
    }
  </style>
</head>
<body>
  <div class="container">这是一个响应式内容容器。</div>
</body>
</html>
```

这种方式的重点不只是写法，而是设计顺序：先保证小屏可用，再向大屏扩展。

## 宏观布局与微观布局

响应式设计不只是断点切换，还包括布局层级的区分。

+ 宏观布局：页面整体结构，比如页眉、主内容、侧边栏、页脚如何排列
+ 微观布局：组件内部细节，比如按钮组、卡片列表、导航条内部元素如何对齐

较小屏幕通常更适合单列布局，先保证内容流动顺序自然，再在较大屏幕上通过媒体查询调整结构。

例如：

```html
<body>
  <header>…</header>
  <main>
    <article>…</article>
    <aside>…</aside>
  </main>
  <footer>…</footer>
</body>
```

这类页面骨架属于宏观布局；而文章卡片、导航、表单内部元素的排布，则更偏微观布局。

## 使用 Flexbox 做响应式布局

Flexbox 是一维布局模型，擅长处理同一条主轴上的对齐、间距、顺序和换行问题，因此非常适合组件级响应式布局。

常见概念：

+ 弹性容器（Flex Container）：应用了 `display: flex` 的父元素
+ 弹性项目（Flex Items）：容器中的直接子元素

常见属性：

| 属性              | 作用       | 示例值                                                                    |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `flex-direction`  | 主轴方向   | `row`、`row-reverse`、`column`、`column-reverse`                          |
| `justify-content` | 主轴对齐   | `flex-start`、`center`、`space-between`、`space-around`、`space-evenly` |
| `align-items`     | 交叉轴对齐 | `stretch`、`center`、`flex-start`、`flex-end`、`baseline`               |
| `flex-wrap`       | 是否换行   | `nowrap`、`wrap`、`wrap-reverse`                                         |

例如，在移动端垂直堆叠三张卡片，桌面端再改成横向排列：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flex 响应式示例</title>
  <style>
    .flex-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card {
      background-color: #f0f0f0;
      width: 90%;
      margin: 5px;
      padding: 10px;
      text-align: center;
    }

    @media screen and (min-width: 768px) {
      .flex-container {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .card {
        width: calc(33.33% - 30px);
      }
    }
  </style>
</head>
<body>
  <div class="flex-container">
    <div class="card">卡片 1</div>
    <div class="card">卡片 2</div>
    <div class="card">卡片 3</div>
  </div>
</body>
</html>
```

这个例子体现的是：默认先让布局在小屏幕上自然堆叠，再在更宽的屏幕下切换成更高信息密度的排列方式。

## 使用 Grid 做响应式布局

CSS Grid 是二维布局系统，擅长同时控制行和列，非常适合页面级结构的搭建。

常见概念：

| 术语               | 含义 |
| ------------------ | ---- |
| Grid Container     | 应用 `display: grid` 的父元素 |
| Grid Item          | 网格容器的直接子元素 |
| Grid Track         | 网格中的行或列 |
| Grid Cell          | 行列相交形成的最小单元格 |

Grid 的核心能力是定义行列结构：

| 属性                    | 作用       | 示例值      |
| ----------------------- | ---------- | ----------- |
| `grid-template-columns` | 定义列轨道 | `1fr 2fr 1fr` |
| `grid-template-rows`    | 定义行轨道 | `auto 100px` |

> `fr`（fraction）是 Grid 常用单位，表示对剩余可用空间的按份分配。

下面这个例子展示了：移动端单列堆叠，桌面端再变成“主内容 + 侧边栏”的双列布局。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid 响应式示例</title>
  <style>
    .grid-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      grid-template-areas:
        "header"
        "main"
        "aside"
        "footer";
      max-width: 100%;
    }

    header {
      grid-area: header;
      background-color: #ffe0b2;
      padding: 20px;
    }

    main {
      grid-area: main;
      background-color: #e0f7fa;
      padding: 20px;
    }

    aside {
      grid-area: aside;
      background-color: #fce4ec;
      padding: 20px;
    }

    footer {
      grid-area: footer;
      background-color: #cfd8dc;
      padding: 20px;
    }

    @media screen and (min-width: 1024px) {
      .grid-layout {
        grid-template-columns: 3fr 1fr;
        grid-template-areas:
          "header header"
          "main aside"
          "footer footer";
      }
    }
  </style>
</head>
<body>
  <div class="grid-layout">
    <header>页眉</header>
    <main>主内容区域</main>
    <aside>侧边栏</aside>
    <footer>页脚</footer>
  </div>
</body>
</html>
```

在这个例子里：

+ 小屏幕默认只有一列，内容按自然顺序向下排列
+ 到了大屏幕后，媒体查询把它切换成了经典的双列桌面布局

## Flexbox 和 Grid 怎么选

它们并不是互斥关系。

+ Grid 更适合宏观布局，也就是页面结构级别的行列组织
+ Flexbox 更适合微观布局，也就是组件内部元素的排列、对齐和间距处理

实践中很常见的组合方式是：

+ 用 Grid 搭页面骨架
+ 用 Flexbox 处理导航、按钮组、卡片内部内容

## 总结

响应式网站设计的核心不是“给不同设备写很多套样式”，而是用同一套页面结构，在不同环境下提供尽可能自然的阅读和交互体验。

要做好响应式设计，至少需要把这几件事想清楚：

+ 先让页面在小屏上可用
+ 使用 viewport 让移动端按设备宽度布局
+ 使用流式尺寸、可伸缩媒体和媒体查询来适配不同环境
+ 区分宏观布局和微观布局，合理使用 Grid 和 Flexbox
