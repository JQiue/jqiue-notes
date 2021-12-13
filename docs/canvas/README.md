---
title: Canvas
category: Web
tags: [Alpha]
author: JQiue
article: false
---

::: info

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

Canvas API 提供了一个通过 JavaScript 和 HTML 的`<canvas>`元素来绘制图形的方式，它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面，注意它是非插件形式的，并不需要额外安装一些其它的东西

Canvas API 主要聚焦于 2D 图形，而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形

Canvas 的默认大小为 300 × 150 像素，但是可以用 HTML 的宽高属性来调整 Canvas 的尺寸，该元素的功能就是创建一个画布，剩下的图像绘制交给 JavaScript 完成

Canvas 就像一个普通的 HTML 元素一样可以被设计，但这些样式完全不会影响画布中的实际图像

::: danger
canvas 元素必须要结束标签
:::

画布最初是空白的，为了绘制图形需要 JavaScript 找到渲染的上下文，然后在上面绘制，canvas 只有一个`getContext()`方法用于获取渲染上下文和它的绘画功能，`getContext()`的参数，决定了上下文的格式

```html
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  </script>
</body>
```

但并不是所有的浏览器都支持，所以应编写简单的测试来验证一下`getContext()`是否存在

```js
if(canvas.getContext('2d')){
  var ctx = canvas.getConext('2d');
  // drawing code her
} else {
  // canvas-unsupported code here
}
```

所以一个基本的模板框架就形成了：

```html
<html>

<head>
  <title>Canvas</title>
  <script>
    function draw() {
      var canvas = document.getElementById('canvas');
      if (canvas.getContext('2d')) {
        var ctx = canvas.getContext('2d');
      } else {
        alert('当前浏览器不支持 Canvas，请换浏览器再试');
      }
    }
  </script>
</head>

<body onload="draw();">
  <canvas id="canvas"></canvas>
</body>

</html>
```

## 栅格

画布默认被网格所覆盖，网格中的一个单元就是画布中的一个像素，默认大小的画布由 300 × 150 个像素点组成，栅格的起点为画布的左上角（坐标（0，0）），所有的元素都基于这个起点来定位

## 画一条直线

想象一下画画时需要做什么？没错就是移动笔，`ctx.moveTo(x, y)`就是这样的方法，用于确定笔在画布上的起点，注意它只是移动笔而已，具体的绘制还需要别的方法，比如`ctx.lineTo(x, y)`方法用于画一条直线，它会从当前笔的坐标和该方法指定的坐标连接成一条直线，笔的落点也移动到了这个位置，之后都以这个位置为基础绘制

此外笔的粗细可以使用`ctx.lineWidth`属性调整，它默认是`1`。而笔的颜色可以使用`ctx.strokeStyle`属性设置，默认是`#000000`，可以使用 CSS 颜色属性那样的取值

::: tip
在所有的绘制方法之前，必须先调用一下`ctx.moveTo`来确定笔的起始位置
:::

尽管画了一条直线，但是需要调用`ctx.stroke()`方法进行绘制着色

如果绘制的闭合线段形成了多边形想要对其进行填充，就可以使用`ctx.fill()`方法，颜色取决于`ctx.fillStyle`属性，默认为`#000000`

::: tip
如果起点和终点的路径没有重合，调用`ctx.fill()`是无效的，因为它只能绘制闭合路径
:::

此外，canvas 是基于状态的绘制，在某些情况我们需要对不同的路径进行着色，`stroke`和`fill`在后续的多次调用中总会以最后一次为准，这会改变之前所有绘制的东西，这个时候`beginPath`和`closePath`方法就派上用场了，我们可以将单独的一个绘制放到这两个方法之间，形成独立的状态，永远不会被其他所影响

`beginPath`不一定要和`closePath`成对出现，`beginPath`只代表重新规划一条路径，`closePath`只代表闭合路径之后图形绘制命令又重新指向到上下文中

::: tip
如果不是闭合路径时，`beginPath`和`closePath`会自动将路径进行封闭
:::

```js
// 绿色的线
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();
        
// 粉色的线
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(400, 400);
ctx.strokeStyle = 'pink';
ctx.stroke();
ctx.closePath();
```

## 绘制弧线

`arc(x, y, radius, startAngle, endAngle, anticlockwise)`用于绘制一条弧线

## 绘制多边形

canvas 支持矩形和路径这两种图形绘制的方式，提供了三种方法绘制矩形：

+ fillRect(x, y, width, height)：绘制一个填充的矩形
+ strokeRect(x, y, width, height)：绘制一个矩形的边框
+ clearRect(x, y, width, height)：清除指定矩形区域，让清除部分完全透明

## 渐变

`createLinearGradient(startX, startY, endX, endY)`用于创建线性渐变

`addColorStop(stop, color)`方法规定渐变对象中的颜色和停止位置

+ stop：渐变中开始与结束的位置，是`0.0`到`1.0`之间的值
+ color：颜色

`createRadialGradient()`用于创建放射性/环形的渐变

## 文字绘制

`fillText(text, x, y, maxWidth)`用于创建实心文本

`ctx.strokeText(text, x, y, maxWidth)`用于创建空心文本

## 图片绘制
