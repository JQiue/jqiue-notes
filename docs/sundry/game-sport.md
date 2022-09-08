---
title: 游戏的基础：运动
category: 知识分享
article: false
---

运动是游戏的基础，如何实现一些物理运动是非常有必要的

根据物体的运动方式可以有：移动、转动、滚动、震动等，根据物体运动的路线不同可以分为直线运动和曲线运动

## 匀速直线运动

决定物体运动的只有：

```js
x = 0; // 物体初始位置
v = 3; // 物体在 x 方向的位置
```

::: normal-demo 直线匀速运动

```html
<div id="box"></div>
```

```js
function rectilinear_motion(el, x, v) {
  el.style.left = x + v + 'px';
}

const el = document.querySelector('#box');
let v = 1;

setInterval(() => {
  let x = parseInt(window.getComputedStyle(el).left);
  if (x > 100) {
    v = -v;
  } else if(x < 0) {
    v = Math.abs(v);
  }
  rectilinear_motion(el, x, v);
},  30)
```

```css
#box {
  width:50px;
  height:50px;
  background-color:red;
  position: relative;
}
```

:::

物体的移动速度不仅仅取决于速度，还取决于帧

一个物体沿任意方向移动一般分为在 x 和 y 轴两个方向的移动

## 任意方向移动

这需要三角函数，正弦，余弦，弧度

## 运动中的重力

这需要抛物运动，重力加速度，计算误差，积分

## 随机飞溅

这需要均匀随机数，正态分布

## 圆周运动

这需要角速度，向心力

## 卷动

这需要镜头位置，卷动幅度，比例关系，区域坐标和画面坐标，波纹扭曲、正弦波、波长、振幅、周期，透视、梯形，视景体，近似

## 碰撞检测

这需要德摩根定律，勾股定理、距离，平方比较，内积、微分，条件划分，向量、圆的方程式，维度扩展

## 光线

旋转，向量，圆，伪影，左右判定，外积，旋转速度，曲率，反射，
