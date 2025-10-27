---
title: 查找
category: 数据结构与算法
article: false
order: 10
---

在一些数据元素中，通过一定的方法找出与给定关键字相同的数据元素的过程

## 暴力搜索

也叫线性查找，从第一个元素开始，按照顺序进行查找，直到找到元素或最后一个元素为止

时间复杂度：O(n)

```c
int linearSearch(int *list, int value, int size) {
  for (int i = 0; i < size; i++)
  {
    if (list[i] == value) return i;
  }
  return -1;
}
```

```js
function linearSearch(list) {
  for (let i = 0; i < list.length; i++)
  {
    if (list[i] == value) return i;
  }
  return -1;
}
```

## 二进制搜索

也叫折半查找或二分查找，将列表划分为一个候选区，通过与候选区的中间值比较，如果正好相等就代表找到了，如果大于中间值，则扔掉中间值左边的候选区，如果小于中间值则扔掉中间值右边的候选区，以此往复直到找到或者没有为止，但只适用于具有顺序排列的结构

时间复杂度：O(logn)

```c
int binarySearch(int *list, int value, int size) {
  int left = 0;
  int right = size - 1;
  while (left <= right)
  {
    int mid = (left + right) / 2;
    if(list[mid] == value) {
      return mid;
    } else if (list[mid] > value) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
```

```js
function binarySearch(list, value) {
  let left = 0;
  let right = list.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if(value > arr[middle]) {
      left = middle + 1;
    } else if (value < arr[middle]) {
      right = middle - 1;
    } else {
      return middle;
    }
  }
}
```

## 内插搜索

## 分块查找
