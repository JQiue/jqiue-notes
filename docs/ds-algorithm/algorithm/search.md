---
title: 查找
tag: 算法
author: JQiue
article: false
---

在一些数据元素中，通过一定的方法找出与给定关键字相同的数据元素的过程

## 线性

### 顺序查找

也叫线性查找，从第一个元素开始，按照顺序进行查找，直到找到元素或最后一个元素为止

时间复杂度：`O(n)`

<CodeGroup>

<CodeGroupItem title="C" active>
```c
int linearSearch(int *list, int value, int size) {
  for (int i = 0; i < size; i++)
  {
    if (list[i] == value) return i;
  }
  return -1;
}
```
</CodeGroupItem>

<CodeGroupItem title="java">
```java
```
</CodeGroupItem>

<CodeGroupItem title="javascript">
```javascript
```
</CodeGroupItem>

<CodeGroupItem title="python">
```python
```
</CodeGroupItem>

</CodeGroup>

### 二分查找

也叫折半查找，将列表划分为一个候选区，通过与候选区的中间值比较，如果正好相等就代表找到了，如果大于中间值，则扔掉中间值左边的候选区，如果小于中间值则扔掉中间值右边的候选区，以此往复直到找到或者没有为止

时间复杂度：`O(logn)`

<CodeGroup>

<CodeGroupItem title="C" active>
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
</CodeGroupItem>

<CodeGroupItem title="java">
```java
```
</CodeGroupItem>

<CodeGroupItem title="javascript">
```javascript
```
</CodeGroupItem>

<CodeGroupItem title="python">
```python
```
</CodeGroupItem>

</CodeGroup>

### 分块查找

## 树

### 二叉搜索树

### 平衡二叉树

### 红黑树

### 前缀树

## 哈希表
