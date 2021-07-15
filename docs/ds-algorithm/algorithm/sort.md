---
title: 排序
tag: 算法
author: JQiue
article: false
---

排序即是将一组“无序”的变成有序的

## 冒泡排序

比较相邻的两个元素，如果前面比后面大，则交换这两个元素，每一趟都会产生一个最大的数被排好序

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>
```c
// 升序
void bubbleSort(int *list, int size){
  for (int i = 0; i < size; i++)
  {
    for (int j = 0; j < size - i - 1; j++) {
      if (list[j] > list[j + 1]){
        int temp;
        temp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = temp;
      }
    }
  }
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

## 选择排序

每一趟记录最大或最小的数，然后放到最前面

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>
```c
void selectSort(int *list, int size){
  for (int i = 0; i < size; i++)
  {
    int minIndex = i;
    for (int j = i + 1; j < size; j++)
    {
      if(list[j] < list[minIndex]) {
        minIndex = j;
      }
    }
    int temp;
    temp = list[i];
    list[i] = list[minIndex];
    list[minIndex] = temp;
  }
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

## 插入排序

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>
```c
void insertSort(int *list, int size) {
  for (int i = 1; i < size; i++)
  {
    int j = i - 1; // 当前已排序的位置
    int temp = list[i];
    // 寻找插入位置
    while (list[j] > temp && j >= 0)
    {
      list[j + 1] = list[j];
      j -= 1;
    }
    list[j + 1] = temp;
  }
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

## 快速排序

## 堆排序

## 归并排序

## 希尔排序

## 桶排序

## 基数排序
