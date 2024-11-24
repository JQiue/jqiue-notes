---
title: 游戏的基础：运动
category: 知识分享
article: false
---

运动是游戏的核心要素之一，理解和实现各种物理运动对游戏开发至关重要。本文将介绍游戏中常见的运动类型及其实现原理

根据物体的运动方式，可以将运动分为：移动、转动、滚动、震动等。而根据物体运动的路线，又可以分为直线运动和曲线运动

## 匀速直线运动

一个物体沿任意方向移动一般分为在 x 和 y 轴两个方向的移动，匀速直线运动是最基本的运动形式，决定物体运动的关键参数有：

```js
x = 0; // 物体初始位置
v = 3; // 物体在 x 方向的位置
```

::: normal-demo 匀速直线运动

```html
<div class="box" id="one">10fps/s</div>
<div class="box" id="two">33fps/s</div>
<div class="box" id="three">60fps/s</div>
```

```js
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
let v = 1;

function rectilinear_motion(el, x, v) {
  el.style.left = x + v + 'px';
}


setInterval(() => {
  let x = parseInt(window.getComputedStyle(one).left);
  if (x > 100) {
    v = -v;
  } else if(x < 0) {
    v = Math.abs(v);
  }
  rectilinear_motion(one, x, v);
},  100)

setInterval(() => {
  let x = parseInt(window.getComputedStyle(two).left);
  if (x > 100) {
    v = -v;
  } else if(x < 0) {
    v = Math.abs(v);
  }
  rectilinear_motion(two, x, v);
},  30)

setInterval(() => {
  let x = parseInt(window.getComputedStyle(three).left);
  if (x > 100) {
    v = -v;
  } else if(x < 0) {
    v = Math.abs(v);
  }
  rectilinear_motion(three, x, v);
},  16)
```

```css
.box {
  width:50px;
  height:50px;
  background-color:red;
  position: relative;
  line-height:50px;
  font-size: 14px;
}
```

:::

需要注意的是，物体的实际移动速度不仅取决于设定的速度值，还与游戏的帧率（每秒更新次数）有关

## 任意方向移动

在二维平面上，物体的任意方向移动可以分解为在 x 轴和 y 轴上的两个分量，实现这种运动需要用到三角函数

```js
// 物体位置
let x = 0;
let y = 0;

// 目标位置
let targetX;
let targetY;

let angle = Math.atan2(targetY - y, targetX - x); // 计算运动方向角度
let vx = speed * Math.cos(angle);                 // x 方向速度分量
let vy = speed * Math.sin(angle);                 // y 方向速度分量

x += vx;
y += vy;
```

::: normal-demo 任意方向移动

```html
<div class="container">
  <div id="object"></div>
  <p>点击容器内任意位置，物体会向该位置移动</p>
</div>
```

```js
const container = document.querySelector('.container');
const object = document.getElementById('object');
// 初始化物体位置
let objectX = 150;
let objectY = 150;
// 初始化目标位置（初始值与物体位置相同）
let targetX = 150;
let targetY = 150;
// 定义物体移动速度（每帧移动的像素数）
const speed = 3;

container.addEventListener('click', (event) => {
  const rect = container.getBoundingClientRect();
  // targetX = event.clientX - rect.left;
  // targetY = event.clientY - rect.top;
    // 计算鼠标点击位置相对于容器的坐标，并减去物体尺寸的一半
  targetX = event.clientX - rect.left - object.offsetWidth / 2;
  targetY = event.clientY - rect.top - object.offsetHeight / 2;
});

function moveObject() {
  // 计算物体到目标的距离
  const dx = targetX - objectX;
  const dy = targetY - objectY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  // 如果距离大于每帧移动的距离，则移动物体
  if (distance > speed) {
    // 计算移动角度
    const angle = Math.atan2(dy, dx);
    objectX += Math.cos(angle) * speed;
    objectY += Math.sin(angle) * speed;
  } else {
    // 如果距离小于每帧移动距离，直接将物体放置在目标位置
    objectX = targetX;
    objectY = targetY;
  }
  
  // 更新物体的 CSS 位置，确保物体中心对准目标位置
  object.style.left = `${objectX}px`;
  object.style.top = `${objectY}px`;
  
  requestAnimationFrame(moveObject);
}

moveObject();
```

```css
.container {
  width: 300px;
  height: 300px;
  border: 2px solid black;
  position: relative;
  overflow: hidden;
}

#object {
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  left: 150px;
  top: 150px;
}

p {
  text-align: center;
  margin-top: 10px;
}
```

:::

## 重力影响下的运动

模拟重力影响下的运动（如抛物运动）需要考虑重力加速度

```js
const GRAVITY = 9.8;         // 重力加速度，单位：像素/秒^2
let vy = 0;                  // 初始垂直速度

function update(deltaTime) {
  vy += GRAVITY * deltaTime; // 速度随时间变化
  y += vy * deltaTime;       // 位置随速度变化
}
```

## 随机飞溅效果

实现随机飞溅效果需要生成均匀分布或正态分布的随机数

```js
// 均匀分布
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// 近似正态分布（使用 Box-Muller 变换）
function getRandomNormal(mean = 0, stdDev = 1) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
```

## 圆周运动

圆周运动需要考虑角速度和向心力

```js
const centerX = 100, centerY = 100; // 圆心坐标
const radius = 50; // 半径
let angle = 0; // 初始角度
const angularSpeed = 0.05; // 角速度

function update() {
  angle += angularSpeed;
  x = centerX + radius * Math.cos(angle);
  y = centerY + radius * Math.sin(angle);
}
```

## 视差滚动

视差滚动可以创造出层次感和深度感

```js
const layers = [
  { element: document.querySelector('.bg-far'), speed: 0.1 },
  { element: document.querySelector('.bg-mid'), speed: 0.4 },
  { element: document.querySelector('.bg-near'), speed: 0.7 }
];

function updateParallax(scrollY) {
  layers.forEach(layer => {
    const yOffset = scrollY * layer.speed;
    layer.element.style.transform = `translateY(${yOffset}px)`;
  });
}

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  updateParallax(scrollY);
});
```

::: normal-demo

```html
<div class="box">
  <div class="parallax-container">
    <div class="bg-far layer"></div>
    <div class="bg-mid layer"></div>
    <div class="bg-near layer"></div>
  </div>
  <div style="height: 2000px;"></div>
</div>
```

```js
const box = document.querySelector('.box');
const layers = [
  { element: document.querySelector('.bg-far'), speed: 0.1 },
  { element: document.querySelector('.bg-mid'), speed: 0.4 },
  { element: document.querySelector('.bg-near'), speed: 0.7 }
];

function updateParallax() {
  console.log("scroll");
  const scrollY = window.pageYOffset;
  layers.forEach(layer => {
    const OffsetY = scrollY * layer.speed;
    layer.element.style.transform = `translateY(${OffsetY}px)`;
  });
}

// box.addEventListener('scroll', updateParallax);
addEventListener("scroll", (event) => { 
  console.log("scroll");
});

// 初始化一次以设置初始位置
updateParallax();
```

```css
/* 视差容器 */
.parallax-container {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto; /* 使容器居中 */
  overflow: hidden;
  border: 1px solid #ccc; /* 可选：添加边框以便于查看容器范围 */
}
/* 公共层样式 */
.layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.bg-far {
  background-color: lightblue;
}

.bg-mid {
  background-color: lightgreen;
}

.bg-near {
  background-color: lightcoral;
}
```

:::

## 碰撞检测

碰撞检测是游戏物理的重要组成部分，以下是一个简单的矩形碰撞检测示例：

::: normal-demo 矩形碰撞

```html
<p>按 W，A，S，D 或者方向键进行碰撞检测</p>
<div class="box" tabindex="0">
  <canvas id="canvas"></canvas>
</div>
```

```js
const box = document.querySelector(".box");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 300);
const CANVAS_HEIGHT = (canvas.height = 300);
let PositionX = 0;
let PositionY = 0;
let speedX = 0;
let speedY = 0;
let gameFrame = 0;
let staggerFrame = 8;
const keyType = {
  up: false,
  down: false,
  left: false,
  right: false,
};

document.addEventListener("keydown", (event) => {
  console.log(event.code);
  if (event.code == "KeyD" || event.code == "ArrowRight") {
    keyType.right = true;
    speedX = 1;
  }
  if (event.code == "KeyA" || event.code == "ArrowLeft") {
    keyType.left = true;
    speedX = -1;
  }
  if (event.code == "KeyS" || event.code == "ArrowDown") {
    keyType.down = true;
    speedY = 1;
  }
  if (event.code == "KeyW" || event.code == "ArrowUp") {
    keyType.up = true;
    speedY = -1;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code == "KeyD" || event.code == "ArrowRight") {
    keyType.right = false;
    speedX = 0;
  }
  if (event.code == "KeyA" || event.code == "ArrowLeft") {
    keyType.left = false;
    speedX = 0;
  }
  if (event.code == "KeyS" || event.code == "ArrowDown") {
    keyType.down = false;
    speedY = 0;
  }
  if (event.code == "KeyW" || event.code == "ArrowUp") {
    keyType.up = false;
    speedY = 0;
  }
});

let enemy = true;

function animate(params) {
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (keyType.right || keyType.left) {
    PositionX += speedX;
  }
  if (keyType.down || keyType.up) {
    PositionY += speedY;
  }
  gameFrame++;
  ctx.fillRect(PositionX, PositionY, 50, 50);
  if (PositionX + 50 > 150 && PositionY + 50 > 150 && PositionX < 150 + 50 && PositionY < 150 + 50) {
    enemy = false;
  } else {
    enemy = true;
  }
  if(!enemy) ctx.fillStyle = 'red';
  ctx.fillRect(150, 150, 50, 50);
  requestAnimationFrame(animate);
}
animate();
```

```css
.box {
  border: 5px solid #000;
  margin: 0 auto;
  width: 300px;
  height: 300px;
}
#canvas {
  width: 300px;
  height: 300px;
}
```

:::

## 光线

旋转，向量，圆，伪影，左右判定，外积，旋转速度，曲率，反射，
