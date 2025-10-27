---
title: Canvas
category: Web
article: false
---

::: info

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

在 Web 中实现了基于 OpenGL 的 WebGL 标准，通过 Canvas 元素作为 Dom 接口访问

Canvas API 提供了一个通过 JavaScript 和 HTML 的`<canvas>`元素来绘制图形的方式，它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面，Canvas API 主要聚焦于 2D 图形，而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形

Canvas 的默认大小为 300 × 150 像素，但是可以用宽高属性来调整 Canvas 的尺寸，该元素的功能就是创建一个画布，剩下的图像绘制交给 JavaScript 完成

::: tip 注意
不要使用 CSS 选择器设置 Canvas 的宽高，而是使用它自身的 width 和 height 属性
:::


Canvas 就像一个普通的 HTML 元素一样可以被设计，但这些样式完全不会影响画布中的实际图像

::: caution
canvas 元素必须要结束标签
:::

画布最初是空白的，为了绘制图形需要 JavaScript 找到渲染的上下文，然后在上面绘制，Canvas 元素有一个`getContext()`方法用于获取渲染上下文和它的绘画功能，`getContext()`的参数，决定了上下文的格式

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

想象一下画画时需要做什么？没错就是移动笔，`ctx.moveTo(x, y)`就是这样的方法，用于确定笔在画布上的起点，注意它只是移动笔而已，具体的绘制还需要别的方法，`ctx.lineTo(x, y)`方法用于画一条直线，它会从当前笔的坐标和该方法指定的坐标连接成一条直线，笔的落点也移动到了这个位置，之后都以这个位置为基础绘制

此外笔的粗细可以使用`ctx.lineWidth`属性调整，它默认是`1`。而笔的颜色可以使用`ctx.strokeStyle`属性设置，默认是`#000000`，可以使用 CSS 颜色属性那样的取值

::: tip
在所有的绘制方法之前，必须先调用一下`moveTo`来确定笔的起始位置
:::

尽管画了一条直线，但是需要调用`ctx.stroke()`方法进行绘制着色

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

## 填充

如果绘制的闭合线段形成了多边形想要对其进行填充，就可以使用`ctx.fill()`方法，颜色取决于`ctx.fillStyle`属性，默认为`#000000`

::: tip
如果起点和终点的路径没有重合，调用`ctx.fill()`是无效的，因为它只能绘制闭合路径
:::

## 绘制弧线

`ctx.arc(x, y, r, startAngle, endAngle, anticlockwise)`用于绘制一条弧线

| 参数             | 描述                                                              |
| ---------------- | ----------------------------------------------------------------- |
| x                | 圆心的 x 坐标                                                     |
| y                | 圆心的 y 坐标                                                     |
| r                | 半径                                                              |
| sAngle           | 起始角，以弧度计（弧的圆形的三点钟位置是 0 度）                   |
| eAngle           | 结束角，以弧度计，通常和 PI 计算                                  |
| counterclockwise | 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针 |

## 绘制多边形

`ctx.rect(x, y, width, height)`用于创建一个矩形，注意是封闭的路径

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

只需要两步，获得图片源，使用`drawImage(image, x, y)`绘制到画布上

```js
const img = new Image();
img.src = 'image.png';
ctx.drawImage(img, 0, 0);
```

+ `drawImage(image, dx, dy, width, height)`
+ `drawImage(image, dx, dy, width, height)`
+ `drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`：`sx`和`sy`表示从什么地方开始裁切图片，`sWidth`和`sHeight`分别表示裁切的宽度和高度

## three.js

three.js 是一个 3D JavaScript 库，它封装了底层的图形接口，能够用简单的代码实现三维场景的渲染，一个典型的 three.js 至少需要包括：

+ 渲染器（Renderer）
+ 场景（Scene）
+ 照相机（Camera）

渲染器和 Canvas 元素绑定

```js
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("mainCanvas"),
});

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
```

创建场景，场景就是一个容器

```js
const scene = new THREE.Scene();
```

创建相机，相机也要被添加到场景中

```js
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 5);
scene.add(camera);
```

创建长方体，添加到场景中

```js
const geometry = new THREE.BoxGeometry(1, 2, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

定义了场景的物体和相机后就可以使用渲染器渲染画面

```js
renderer.render(scene, camera);
```

### 照相机

照相机是三维空间到二维屏幕的投影方式，而针对不同的投影方式又分为正交投影照相机和透视投影照相机

+ 正交 - 类似于数学课上黑板画出来的效果
+ 透视 - 类似人眼在真实世界中看到的”近大远小“

正交投影照相机的参数非常直观，这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，称其为**视景体**（Frustum）。只有在视景体内部的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉

```js
THREE.OrthographicCamera(left, right, top, bottom, near, far)
```
