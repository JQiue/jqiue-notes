---
title: 数组：连续内存与性能的基石
category: 数据结构与算法
article: false
order: 1
---

数组是计算机内存中最基础、对 CPU 缓存最友好的数据结构。它根据存储方式可分为：

+ 值类型数组 (Unboxed)： 如 C/Rust 的 `int[]` 或 `Vec<i32>`。数组直接存储数据值，内存高度紧凑。
+ 引用类型数组 (Boxed)： 如 JavaScript 的 `Array` 或 Java 的 `Object[]`。数组存储的是指向堆上实际数据的指针/引用。

> 引用类型数组牺牲了性能的局部性，因为它需要进行间接寻址（多跳一次内存）

## 动态数组

动态数组（工程术语：Vector / ArrayList）是对静态数组的封装，核心是实现了**自动扩容**功能

由于数组本身的局限性，有必要进行封装以提供更好的功能，通常又被称为**顺序表**或**动态数组**，特点是逻辑相邻的元素，物理地址也是相邻的

核心优势：

+ $O(1)$ 随机访问： 基于地址偏移量计算，性能极高
+ CPU 缓存友好： 连续内存布局保证了高效的数据预取（Prefetching），遍历速度远超链表
+ 存储密度大，空间利用率高

劣势与均摊成本：

+ $O(N)$ 插入/删除： 在数组中间或头部操作代价高昂，需要大量元素搬移（memmove）
+ 扩容成本： 当 Length == Capacity 时，需要申请新内存并将所有旧数据复制到新址。虽然单次耗时 $O(N)$，但由于容量是指数增长（1.5 倍或 2 倍），平摊到每次操作上，追加 (push) 的时间复杂度为均摊 $O(1)$

::: warning ⚠️ 工程警示：为什么现代语言不用手写？

这段代码是学习底层内存管理（malloc/free）和指针操作的绝佳范例。但在现代工程中，我们绝不建议手动实现。Rust 的 `Vec<T>`、C++ 的 `std::vector` 和 Java 的 `ArrayList` 提供了内存安全、异常安全且高度优化的实现。手动操作很容易导致内存泄漏或悬垂指针。

:::

::: code-tabs

@tab C

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
  // 复制旧表的内容到新的空间，本次操作是昂贵的 O(N) 性能抖动点
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

:::

## 多维数组

当数组元素都是数组，即为多维数组，这是二维数组

```js
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

也存在三维数组，或者更多维度的数组

```js
const arr = [
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  [
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18]
  ],
  [
    [19, 20, 21],
    [22, 23, 24],
    [25, 26, 27]
  ],
];
```

## 矩阵与遍历

使用二维数组即可形成矩阵，如何遍历二维数组中的每个元素是一个需要关注的点，多数语言（如 C/Java/JS）采用行主序 (Row-Major) 存储，根据行和列的不同方式可分为行遍历和列遍历：

+ 行遍历（Cache-Friendly）： 访问元素在内存中是连续的，能最大限度利用 CPU 缓存。
+ 列遍历（Cache-Unfriendly）： 每次访问下一个元素都跳跃了一个完整的行长，极易导致 Cache Miss。

```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 行遍历
for (let i = 0; i < matrix.length; i++) {
  for(let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

// 列遍历
for (let i = 0; i < matrix[i].length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    console.log(matrix[j][i]);
  }
}
```

## 稀疏矩阵和稠密矩阵

在矩阵中，为 0 的元素的数量远远大于非 0，并且非 0 元素的排列没有规律即为稀疏矩阵，反之为稠密矩阵

```js
const matrix = [
  [0, 1, 2, 0, 0, 1, 0, 0, 1, 0, 1],
  [0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0]
];

/* 计算稀疏性：0 的元素个数 / 元素总数 */
function sparsity(matrix) {
  let zero = 0;
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        zero++;
      }
      if (i == matrix.length - 1) {
        count = (i + 1) * (j + 1);
      }
    }
  }
  return zero / count;
}
```

由于稀疏矩阵含有许多为 0 的元素，这些为 0 的元素不会包含任何信息，所以要进一步的处理，以便于压缩矩阵的内存空间加速计算
