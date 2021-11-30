---
title: 面试经历
category: 知识分享
tags: [Beta]
author: JQiue
---

这里记录的是我面试的一些题目，进行了技术复盘，按照公司划分

## 武汉风行在线技术有限公司（校招 - Web 前端

人生第一面很慌说实话，对，就是那个风行视频，我在初中使用过他们家的视频软件，还算是有些印象。笔试轻松通过，隔了一个星期让我去第二面，面了一个多小时，回来后等消息，过了几天人事打电话询问我的在校日期和成绩排名，之后没有二面结果反馈，心已凉，面试流程效率太低，已经决定即使后续有消息也不考虑入职

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
+ 思路：没有什么思路，就是冒泡排序和选择排序，注意取对象的 id 值进行比较就行了

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
+ 思路：转换为字符串，然后调用`split('')`返回一个字符数组，从首尾开始向中间递增比较，注意要给给`split()`加上`''`，否则返回的是整个字符串的数组

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

## 德生科技（校招 - Web 前端）

直接视频面试，什么基础都没有问，只问你会做什么，有过技术开发的经历，有没有开发过小程序，接不接受出差，真是好家伙

## 小鱼易连（校招 - Web 前端）

第一面是用它们家的会议软件在线进行笔试，大概有三十多个人吧，笔试皆为选择题，其实据我做题的体验来看，选题非常不用心，有很多错误，敷衍的笔试筛选，做完估计错了两道三题，随后等了两个星期的结果，主动询问人事是否通过，然后发了邮件说没有通过，总体上来说，这公司爱好做题家，刷题就行了，反正我是无缘了

+ 哪些操作会触发 GPU 硬件加速
+ 哪些事件不会触发冒泡
+ 数组使用 delete 删除后，length 的变化
+ Flex 不能实现哪些布局
+ 当鼠标移动到一个元素并点击会发生什么事件
+ CSS 属性 clear 会影响元素的什么
+ 哪些算法是基于值的比较
+ 动态规划和贪心

## 北京华胜天隆信息技术有限公司武汉分公司（校招 - Web 前端）

呃，这个公司就不说了，直接上题

+ `opacity: 0;`和`visibility: hidden`触发事件问题
+ Vue 事件绑定原理
+ 重排和重绘
+ 程序输出结果题

```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
```

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
```

```js
var name = 'jack';
(function () {
  if(typeof name === 'undefined'){
    var name = 'tom';
    console.log('hello' + name);
  } else {
    console.log('goodbye' + name);
  }
})();
```

+ 手写一个压缩字符串的方法，比如`abbcccdddd`会被压缩成`a1b2c3d4`

```js
function resolve(str) {
  let tempArr = str.split('');
  let count = 0, chat = tempArr[0];
  let zipArr = tempArr.map((element, index) => {
    if(chat !== element){
      zipChat = chat + count;
      chat = element;
      count = 1;
      return zipChat;
    }
    count++;
  });
  return zipArr.join('');
}
```
