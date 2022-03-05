---
title: 排序
category: 数据结构与算法
article: false
---

排序即是将一组“无序”的变成有序的过程

## 冒泡排序

比较相邻的两个元素，如果前面比后面大，则交换它们，每一趟都会产生一个最大或最小的数被排好序

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>

```c
void swap(int *list, a, b){

}

void bubble(int *list, int size){
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

</CodeGroup>

## 选择排序

找到元素中最小的值并放在最前面，接着找到第二小的值并放到第二位，以此类推

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>

```c
void select(int *list, int size){
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

</CodeGroup>

## 插入排序

每次都会排好一个元素，如果第一个元素已经排好序，它会和第二个元素进行比较，第二个元素将会决定待在原位置还是插入到第一个元素之前，这样两个元素已经排好序，接着和第三个元素比较，以此类推

时间复杂度：O(n^2^)

<CodeGroup>

<CodeGroupItem title="C" active>

```c
void insert(int *list, int size) {
  for (int i = 1; i < size; i++)
  {
    int temp = list[i];
    int j = i - 1; // 当前已排序的位置
    // 寻找插入位置
    while (list[j] > temp && j >= 0)
    {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = temp;
  }
}
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript">

```js
function insert(array) {
  let temp;
  for (let i = 1; i < array.length; i++) {
    temp = array[i];
    let j = i - 1; 
    while(array[j] > temp && j >= 0){
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
  return array;
}
```

</CodeGroupItem>

</CodeGroup>

## 归并排序

## 快速排序

## 堆排序

## 希尔排序

## 计数排序

## 桶排序

## 基数排序
