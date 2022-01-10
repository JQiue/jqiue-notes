---
title: 数组
category: 数据结构与算法
tags: [Alpha]
author: JQiue
article: false
---

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构，大多数编程语言的数组只能允许存储同一类型的值，少部分语言（JavaScript）允许任意类型的元素。并且大多数语言的数组长度是固定的，无法动态改变，少部分语言的数组长度是可以动态改变的

由于数组本身的局限性，有必要进行封装以提供更好的功能，通常又被称为**顺序表**或**动态数组**，特点是逻辑相邻的元素，物理地址也是相邻的

由于存储位置与起始位置都相差一个常数，只要确定了起始位置，表中的任意元素都可以随机存取。一些高级语言的数组类型也具有随机存取的特性，所以通常使用数组来实现，虽然很多传统的编程语言都提供了数组，但它们大部分都无法修改容量，实现顺序存储的线性表等于将一个数组封装成一个动态的扩容数组，并提供一些操作它的方法

相对于链式存储的优势：

+ 内存空间连续，允许随机访问元素
+ 存储密度大，空间利用率高

劣势：

+ 插入和删除元素需要移动元素
+ 不能确定元素个数，产生额外的空间浪费

<CodeGroup>

<CodeGroupItem title="C" active>

```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"

// 预定义一些函数的状态码：OK 代表成功，ERROR 代表失败
#define OK 1
#define ERROR 0

// 表的初始容量
#define CAPACITY 5

// Status 是函数的返回值类型，其值是状态码
typedef int Status;

// 元素类型
typedef int ElementType;

// 定义一个包含指向顺序表的首地址、长度、容量的结构体
typedef struct SqList
{
  ElementType *elem;
  int size;
  int capacity;
} SqList;

Status initList(SqList *);
Status isFull(SqList *);
Status insert(SqList *, int, ElementType);
Status append(SqList *, ElementType);
Status delete(SqList *, int);
Status getElement(SqList *, int, ElementType *);
Status locateElement(SqList *, ElementType, int *);
Status increaseCapacity(SqList *);
void toString();

/* 待实现 */
Status destoryList();
Status ClearList();
Status concatList();

/* 
 * 这里的关键点就是创建一个 CAPACITY * sizeof(ElementType) 大小的空间，进行强转后赋值给 elem，此时 elem 指向这个空间地址
 */
Status initList(SqList *list)
{
  // 分配表的内存空间大小
  list->elem = (ElementType *)malloc(CAPACITY * sizeof(ElementType));
  list->size = 0;
  list->capacity = CAPACITY;
  return OK;
}

Status isFull(SqList *list){
  if(list->size == list->capacity) {
    printf("List is full\n");
    return OK;
  }
  return ERROR;
}

/* 
 * 插入函数是根据元素排列的序号来实现的，序号 1 开始，而不是传一个数组的索引
 */
Status insert(SqList *list, int SequenceNumber, ElementType e)
{
  // 判断容量，不足则扩容
  if (isFull(list))
  {
    increaseCapacity(list);
  }
  // 边界判断（序号大于表的长度，小于 1），注意这里要考虑 size 为 0 的情况
  if (SequenceNumber < 1 || SequenceNumber - 1 > list->size)
    return ERROR;

  // 从当前序号位置开始向右移动元素
  for (int i = list->size; i >= SequenceNumber; i--)
  {
    // 元素右移
    list->elem[i] = list->elem[i - 1];
  }
  list->elem[SequenceNumber - 1] = e;
  // 元素个数增加
  list->size++;
  return OK;
}

/* 
 * 删除元素的函数也是根据元素序号来实现的
 */
Status delete(SqList *list, int SequenceNumber)
{
  // 边界判断
  if (SequenceNumber < 1 || SequenceNumber > list->size)
    return ERROR;
  // 从元素当前位置的索引开始从右向左移，便实现了删除
  for (int i = SequenceNumber; i < list->size; i++)
  {
    // 第 i 个元素赋值给第 i - 1 个，实现元素左移
    list->elem[i - 1] = list->elem[i];
  }
  // 减少元素的个数
  list->size--;
  return OK;
}

/* 
 * 由于函数的返回值表示了状态，需要额外的参数来接收获取的元素
 */
Status getElement(SqList *list, int SequenceNumber, ElementType *e)
{
  // 边界判断
  if (SequenceNumber < 1 || SequenceNumber > list->size) 
    return ERROR;
  // 序号 - 1 得到元素的索引，并返回给外界
  *e = list->elem[SequenceNumber - 1];
  return OK;
}

/* 
 * 用于查找元素在表中的序号
 */
Status locateElement(SqList *list, ElementType e, int *SequenceNumber)
{
  // 较为简单，无脑遍历即可
  for (int i = 0; i <= list->size; i++)
  {
    // 每一次进行值比较，符合就返回当前元素的序号，并结束函数
    if (list->elem[i] == e)
    {
      *SequenceNumber = i + 1;
      return OK;
    }
  }
  // 遍历完没找到后返回一个 -1，表示没有
  *SequenceNumber = -1;
  return ERROR;
}

/* 
 * 对数组进行扩容
 */
Status increaseCapacity(SqList *list)
{
  // 扩容 1.5 倍
  list->capacity *= 1.5;
  // 开辟扩容后的新空间
  ElementType *new_elem = (ElementType *)malloc(list->capacity * sizeof(ElementType));
  // 复制旧表的内容到新的空间
  memcpy(new_elem, list->elem, sizeof(ElementType) * list->size);
  // 释放旧表的内存空间
  free(list->elem);
  // 指向新的空间地址
  list->elem = new_elem;
  printf("The capacity increase to %d\n", list->capacity);
  return OK;
}

Status append(SqList *list, ElementType e)
{
  // 判断容量，不足则扩容
  if (isFull(list))
  {
    increaseCapacity(list);
  }
  list->elem[list->size] = e;
  list->size++;
  return OK;
}

/* 就是一个简简单单看一下表的状态啥样的打印函数 */
void toString(SqList *list)
{
  printf("size = %d, capacity = %d\n", list->size, list->capacity);
  if (list->size == 0)
  {
    printf("[]");
    return;
  }
  printf("[");
  for (int i = 0; i < list->size; i++)
  {
    if (i != list->size - 1)
    {
      printf("%d, ", list->elem[i]);
    }
    else
    {
      printf("%d]", list->elem[i]);
    }
  }
}
```

</CodeGroupItem>

</CodeGroup>