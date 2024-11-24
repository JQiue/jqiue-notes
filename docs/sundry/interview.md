---
title: 面试经历
category: 知识分享
article: false

---

这里记录的是我面试的一些题目，进行了技术复盘，按照公司划分

## 面试技巧

一个好的面试题，一定是具有区分度、深度、以及覆盖面的，从此可以看出面试官的水平

在面试过程中一定会发生以下情况：

+ 打断 - 意味着不感兴趣，也可能是一种提示
+ 争论 - 争论的技巧
+ 难题 - 展现分析过程

题目总结为以下类型：

+ 项目型
+ 知识型
+ 开发型
+ 案例型
+ 有趣的

自我介绍时间大致在 1~3 分钟，给面试官留出时间看简历，介绍的内容主要有下：

1. 个人信息
2. 对前端有兴趣
<!-- 3. 上家公司的职责
4. 最满意的项目
5. 离职原因 -->

```plain
你好，我是 xxx，2022 年 6 月毕业于 xxx，专业是软件工程

我对前端兴趣来源于本科期间的 Python 相关课程，在此之前我是做 Java 后端的，当时前端对我来说就是 html、css、js、jQuery 时代，一个页面写好后，就开始往里面嵌入对应的 JSP 代码，这就是那个时候对前端的理解

而在使用 Python 做一些网页爬虫程序期间，我又开始重新去认识前端，这个时候彻底颠覆了我对前端的概念，在短短的时间内，前端已经发生了翻天覆地的变化，不再操作 DOM，而是使用诸如 Vue 或 React 之类的框架来完成

在这期间又开始去了解 ES6 语法，了解前端工程化相关的知识，Vue 是我接触的第一个前端框架，对于我来说上手简单，也听说过 React 的大名，但耐于精力，我并没有去学习 React

然后开始接触 Node.js，并逐渐使用 Node.js 替代 Java 开发后端应用

所以，我希望我以后是一个会后端，也会前端，而不仅仅局限于某个领域

以上就是我的个人介绍，谢谢！
```

反问环节：

+ 培养体系
+ 工作环境

## 武汉风行在线技术有限公司（秋季校招 - Web 前端）

人生第一面很慌说实话，对，就是那个风行视频，我在初中使用过他们家的视频软件，还算是有些印象。笔试轻松通过，隔了一个星期让我去第二面，面了一个多小时，回来后等消息，过了几天人事打电话询问我的在校日期和成绩排名，之后没有二面结果反馈，心已凉，面试流程效率太低

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
+ 思路：就是排序算法选一个，注意取对象的 id 值进行比较就行了

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
+ 思路：转换为字符串，然后调用`split('')`返回一个字符数组，从首尾开始向中间递增比较，注意要给`split()`加上`''`，否则返回的是整个字符串的数组

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

::: normal-demo 示例

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

## 德生科技（秋季校招 - Web 前端）

直接视频面试，什么基础都没有问，只问你会做什么，有过技术开发的经历，有没有开发过小程序，接不接受出差，真是好家伙

## 小鱼易连（秋季校招 - Web 前端）

第一面是用它们家的会议软件在线进行笔试，大概有三十多个人吧。笔试皆为选择题，据我做题的体验来看，选题非常不用心，有很多错误，敷衍的笔试筛选，做完估计错了两道三题。随后等了两个星期的结果，主动询问人事说没有通过。总体上来说，这公司爱好做题家，刷题就行了

+ 哪些操作会触发 GPU 硬件加速
+ 哪些事件不会触发冒泡
+ 数组使用 delete 删除后，length 的变化
+ Flex 不能实现哪些布局
+ 当鼠标移动到一个元素并点击会发生什么事件
+ CSS 属性 clear 会影响元素的什么
+ 哪些算法是基于值的比较
+ 动态规划和贪心

## 北京华胜天隆信息技术有限公司武汉分公司（秋季校招 - Web 前端）

呃，这个公司就不说了，直接上题

+ `opacity: 0;`和`visibility: hidden`触发事件问题
+ Vue 事件绑定原理
+ 重排和重绘
+ 程序输出结果题

```js
// i 是什么？
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}

for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
```

```js
// 打印结果是什么？
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

+ 题目：手写一个压缩字符串的算法，比如`abbcccdddd`会被压缩成`a1b2c3d4`，只考虑字符都是字母的情况
+ 思路：先`split('')`拆一下字符串，大致就是使用双指针法

```js
function resolve(str) {
  // 拆分
  let charArr = str.split('');
  // 记录出现次数，和当前比较的字符
  let count = 0, char = charArr[0];
  // 遍历字符数组
  let zipArr = charArr.map((element, index) => {
    // 当前遍历的字符和被比较的字符不一样，输出压缩后的字符
    if(element !== char) {
      // 处理最后一个字符的问题，当 element 为最后一个不同的字符时，map 已经停止遍历了
      if(charArr.length - 1 == index){
        return char + count + element + 1;
      }
      // 拼接返回
      let zipChar = char + count;
      // 重新计算次数和下一次被比较的字符
      count = 1;
      char = element;
      return zipChar;
    }
    // 当 element 不是最后一个不同的字符时且可以被压缩时，进行特殊处理
    if(element == char && charArr.length - 1 == index){
      return char + (count + 1);
    }
    count++;
  });
  return zipArr.join('');
}
```

## 武汉噢易云计算股份有限公司（春季校招 - Web 前端）

面试流程比较正规，先做笔试，最后两道算法只做出一道，而且才 AC 30%，丢人了，最后还是过了，然后技术面，非常的不像技术面，先从我的爱好聊起，开始逐渐问一些 Vue 相关问题，比如不用脚手架怎么使用 Vue，v-if 能解决的为什么要用路由等等，也问过如何随机排序一个数组的元素，本人忐忑的回答着，最后依然过了，等待第三面中

## 数支（武汉）互联科技有限公司（实习生 - Web 前端）

先询问会不会用 React 做一个拖拽程序，我当时不会，但还是答应去做，加了总监的钉钉，拿到题（英文的）开始边学 React 边做，三天勉强完成，然后通过。第二面的面试官非常和蔼，整个面试过程很舒服，很轻松，基本上都是问一些基础知识，等待第三面
