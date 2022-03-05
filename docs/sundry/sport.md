---
title: 游戏的基础：运动
category: 知识分享
article: false
---

运动是游戏的基础，如何实现一些物理运动是非常有必要的

根据物体的运动方式可以有：移动、转动、滚动、震动等，根据物体运动的路线不同可以分为直线运动和曲线运动

::: demo 直线匀速运动

```html
<div id="box" style="width:100px;height:100px;background-color:red;"></div>
```

```js
function rectilinear_motion(el) {
  let timer = setInterval(() => {
    if(parseInt(window.getComputedStyle(el).left) == 300) {
      clearInterval(timer);
    }
    el.style.left = parseInt(window.getComputedStyle(el).left) + 1 + 'px'
  }, 30);
}

rectilinear_motion(document.querySelector('#box'));
```

:::
