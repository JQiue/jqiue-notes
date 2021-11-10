---
title: 面试经历
category: Web
tags: [Beta]
author: JQiue
article: false
---

这里记录的是我面试的一些题目，进行了技术复盘，按照公司划分

## 武汉风行在线技术有限公司（校招 - Web 前端）

人生第一面很慌说实话，对，就是那个风行视频，我在初中使用过他们家的视频软件，还算是有些印象，废话不多说直接上笔试题

+ 随机生成一个 HEX 颜色值
+ 思路：HEX 由 6 个 16 进制数组成，所以我的解法是，用数组一一列举`0~9`和`A~F`，然后使用随机数访问 6 次拼接字符串就行了

```js
function getHex() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F'];
  let hex = '';
  let i = 0;
  while(i < 6) {
    hex += arr[Math.floor(Math.random()*16)];
    i++;
  }
}
```

+ 给一个数组，元素是一个包含`id`属性的对象，值都是正整数，进行从小到大排序，用两种方式
+ 思路：没有什么思路，就是冒泡排序和选择排序，临时只想起冒泡排序怎么写（一天没吃饭就赶着去面试，这并不是理由），还有可能写错了，太遗憾了，一些基本的算法确实重要

```js
// 冒泡排序
function bubble(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length - 1; j++) {
      if(arr[i].id > arr[j + 1].id) {
        let t = arr[j + 1];
        arr[j + 1] = arr[i];
        arr[i] = t;
      }
    }
  }
}

// 选择排序
function select(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    // 找到最小数的索引
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[j].id < arr[minIndex].id) {
        minIndex = j;
      } 
    }
    // 交换
    let t = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = t;
  }
}
```

+ 给一个数 x，判断 x 是否为回文整数，是就输出`true`，否则`false`，比如 121 就输出`true`，-121 就输出`false`
+ 思路：转换为字符串，然后调用`split('')`返回一个字符数组，从首尾开始向中间递增比较，这里当时临时忘了给`split()`加上`''`，否则返回的是整个字符串的数组，第一次手写代码确实太难顶了

```js
function foo(x) {
  let arr = String(x).split('');
  // 两边的索引
  let left = 0;
  let right = arr.length - 1;
  // 死循环比较
  while (true) {
    // 当 left >= right 就是一个回文整数，当时这里写的 ==，只能判断 3 位数的情况，其它位数会产生死循环
    if(left >= right){
      console.log(true);
      return;
    }
    // 如果首尾相等，则两边的索引向中间推进，否则就不是回文整数
    if(arr[left] == arr[right]){
      left++;
      right--;
    } else {
      console.log(false);
      return;
    }
  }
}
```

+ 给一个 HTML，要求是奇数行背景色是`#ccc`，偶数行背景色是`#666`，鼠标悬停到某一行时背景色是`#f40`（忘了背景色是啥，随便），点击某一行时打印该行的内容
+ 思路：获取所有的 tr 元素，遍历数组根据索引判断奇偶行，分别添加背景色，同时监听`mouseover`处理鼠标移入时的事件，并应用背景色，监听`mouseout`处理移出时的事件，用来还原背景色，监听`click`处理打印内容即可

示范 HTML：

```html
<table>
  <tr><td>第一行</td></tr>
  <tr><td>第二行</td></tr>
  <tr><td>第三行</td></tr>
  <tr><td>第四行</td></tr>
</table>
```

```js
let arr = document.querySelectorAll('table tr');
arr.forEach((e, index) => {
  // 用于 mouseout 时还原背景样式
  let beforeColor = '';
  // 判断奇偶行应用不同的背景
  if((index + 1) % 2 == 0) {
    e.style.backgroundColor = '#ccc';
    beforeColor = '#ccc';
  } else {
    e.style.backgroundColor = '#666';
    beforeColor = '#666';
  }
  // 悬停
  e.addEventListener('mouseover', event => {
    e.style.backgroundColor = '#f40';
  })
  // 还原
  e.addEventListener('mouseout', event => {
    e.style.backgroundColor = beforeColor;
  })
  // 点击
  e.addEventListener('click', event => {
    alert(e.textContent);
  })
});
```

::: demo 示例

```html
<table>
  <tr><td>第一行</td></tr>
  <tr><td>第二行</td></tr>
  <tr><td>第三行</td></tr>
  <tr><td>第四行</td></tr>
</table>
```

```js
let arr = document.querySelectorAll('table tr');
arr.forEach((e, index) => {
  // 用于 mouseout 时还原背景样式
  let beforeColor = '';
  // 判断奇偶行应用不同的背景
  if((index + 1) % 2 == 0) {
    e.style.backgroundColor = '#ccc';
    beforeColor = '#ccc';
  } else {
    e.style.backgroundColor = '#666';
    beforeColor = '#666';
  }
  // 悬停
  e.addEventListener('mouseover', event => {
    e.style.backgroundColor = '#f40';
  })
  // 还原
  e.addEventListener('mouseout', event => {
    e.style.backgroundColor = beforeColor;
  })
  // 点击
  e.addEventListener('click', event => {
    alert(e.textContent);
  })
});
```

:::
