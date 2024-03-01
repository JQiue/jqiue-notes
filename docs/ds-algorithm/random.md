---
title: 随机
category: 数据结构与算法
article: false
order: 12
---

将有序的变成无序的过程

## 随机打乱

对数组元素进行一次或多次随机交换，就可以打乱顺序，时间复杂度 O(n^2^)，缺点是分布不均匀

```js
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```

## 移位

随机选择一个位置 k，将其后面的元素往前挪 k 位，时间复杂度 O(n)，缺点是分布不均匀

```js
function shuffle(arr) {
  let n = arr.length;
  let k = Math.floor(Math.random() * n);
  for (let i = 0; i < k; i++) {
    let temp = arr[0];
    for (let j = 0; j < n - 1; j++) {
      arr[j] = arr[j + 1];
    }
    arr[n - 1] = temp;
  }
}
```

## Fisher-Yates

Fisher-Yates 洗牌算法的分布非常均匀，时间复杂度 O(n)，重点是:

+ 从数组末尾开始交换元素
+ 每次随机选择前面的索引进行交换
+ 交换完成后 currentIndex 就少 1

```js
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
```

<!-- todo -->
