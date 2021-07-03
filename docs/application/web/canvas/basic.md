---
title: 介绍
category: Web
tag: Canvas
author: JQiue
article: false
---

Canvas API 提供了一个通过 JavaScript 和 HTML 的`<canvas>`元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面

Canvas API 主要聚焦于2D图形。而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形

Canvas 的默认大小为 300 × 150，但是可以用 HTML 的宽高属性来调整 Canvas 的尺寸，该元素的功能就是创建一个画布，剩下的图像绘制交给 JavaScript 完成

Canvas 就像一个普通的 HTML 元素一样可以被设计，但这些样式完全不会影响画布中的实际图像

canvas 元素必须要结束标签

canvas 最初是空白的，为了绘制图形需要 JavaScript 找到渲染的上下文，然后在上面绘制，canvas 只有一个`getContext()`方法用于获取渲染上下文和它的绘画功能，`getContext()`只有一个参数，决定了上下文的格式

```html
<canvas id="canvas"></canvas>
```

```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

但并不是所有的浏览器都支持，所以应编写简单的测试来验证一下`getContext()`是否存在

```java
if(canvas.getContext()){
  var ctx = canvas.getConext('2d');
  // drawing code her
}else{
  // canvas-unsupported code here
}
```

所以一个基本的模板框架就形成了：

```html
<html>

<head>
  <title>Canvas</title>
  <style>
    canvas {
      border: 1px solid black;
    }
  </style>
  <script>
    function draw() {
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
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

canvas 默认被网格所覆盖，网格中的一个单元就是画布中的一个像素，canvas 由 300 × 150 个像素点组成，栅格的起点为画布的左上角（坐标（0，0）），所有的元素都基于这个起点来定位

## 绘制矩形

canvas 支持矩形和路径这两种图形绘制的方式

canvas 提供了三种方法绘制矩形：

+ fillRect(x, y, width, height)：绘制一个填充的矩形
+ strokeRect(x, y, width, height)：绘制一个矩形的边框
+ clearRect(x, y, width, height)：清除指定矩形区域，让清除部分完全透明

## 绘制路径

图形的基本元素是路径，路径是由不同的颜色和宽度的线段或曲线相连形成的不同形状的点的集合

绘制路径需要一些额外的步骤：

1. 创建路径的起点
2. 使用画图方法绘制路径
3. 封闭路径
4. 通过描边或填充来渲染图形

这是要用到的函数：

+ beginPath()：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
+ closePath()：闭合路径之后图形绘制命令又重新指向到上下文中
+ stroke()：通过线条来绘制图形轮廓
+ fill()：通过填充路径的内容区域生成实心的图形
