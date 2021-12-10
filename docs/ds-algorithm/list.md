---
title: 线性表
category: 数据结构与算法
tags: [Alpha]
author: JQiue
article: false
---

## 顺序存储的线性表

表示用一组连续的地址空间来依次存储数据元素，通常又被称为**顺序表**或**动态数组**，特点是逻辑相邻的元素，物理地址也是相邻的

由于存储位置与起始位置都相差一个常数，只要确定了起始位置，表中的任意元素都可以随机存取。一些高级语言的数组类型也具有随机存取的特性，所以通常使用数组来实现，虽然很多传统的编程语言都提供了数组，但它们大部分都无法修改容量，实现顺序存储的线性表等于将一个数组封装成一个动态的扩容数组，并提供一些操作它的方法

相对于链式存储的优势：

+ 内存空间连续，允许随机访问元素
+ 存储密度大，空间利用率高

劣势：

+ 插入和删除元素需要移动元素
+ 不能确定元素个数，产生额外的空间浪费

### 顺序表的实现

<CodeGroup>

<CodeGroupItem title="C" active>

```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"

// 预定义一些函数的状态码：OK 代表成功，ERROR 代表失败
#define OK 1
#define ERROR 0

// Status 是函数的返回值类型，其值是状态码
typedef int Status;

// 表的初始容量
#define CAPACITY 5

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
Status append();
Status destoryList();
Status ClearList();
Status concatList();

int main(void)
{
  SqList list;
  initList(&list);
  append(&list, 1);
  append(&list, 2);
  append(&list, 2);
  append(&list, 2);
  append(&list, 2);
  append(&list, 2);
  toString(&list);
  return 0;
}

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

## 链式存储的线性表

相对于顺序存储的链式存储来说，存储空间地址是可以连续的，也可以是不连续的，地址并不对应逻辑关系，顺序存储有以下优势：

+ 大小是无限的，不会产生额外的空间浪费
+ 插入和删除元素是高效的，因为它不需要移动额外的元素

劣势：

+ 不允许随机访问，必须从第一个元素按顺序访问元素
+ 存储密度低，需要额外的空间表示存储关系
+ 对缓存不是很友好

链表由指向第一个节点的指针表示，第一个节点称为头部，如果链表为空，则头部的值为`NULL`

每个节点至少由两部分组成：

+ 数据
+ 指向下一个节点的引用

### 链表的实现

<CodeGroup>

<CodeGroupItem title="C" active>

```c
#include "stdio.h"
#include "stdlib.h"

// 预定义一些函数的状态码：OK 代表成功，ERROR 代表失败
#define OK 1
#define ERROR 0

// Status 是函数的返回值类型，其值是状态码
typedef int Status;
// DataType 表示数据的类型
typedef int DataType;

// 定义节点结构体，包含数据域 data 和指向下一个结点的引用
typedef struct Node
{
  DataType data;
  struct Node *next;
} Node, *LinkList;

Status initList(LinkList *);
Status insert(Node *, DataType);
Status delete (LinkList, int);
Status append(LinkList, DataType);
Status push(LinkList *, DataType);
Status getElement(LinkList, int, Node **);
Status locateElement(LinkList, DataType, Node **);
void toString(LinkList);

int main(void)
{
  LinkList list = NULL;
  initList(&list);
  Node *node = NULL;
  locateElement(list, 1, &node);
  printf("%p\n", node);
  toString(list);
  return 0;
}

/* 初始化链表的表头：这里要使用二级指针接收 */
Status initList(LinkList *list)
{
  // 分配空间
  *list = (Node *)malloc(sizeof(Node));
  if (*list == NULL)
  {
    printf("init error");
    return ERROR;
  }
  // 初始化表头的状态
  (*list)->data = 0;
  (*list)->next = NULL;
  return OK;
}

/* 插入到指定节点的后面 */
Status insert(Node *pre_node, DataType data)
{
  // 判断指定节点是否不存在
  if (pre_node == NULL)
  {
    return ERROR;
  }
  // 创建一个节点
  Node *node = (Node *)malloc(sizeof(Node));
  // 初始化节点
  node->data = data;
  // 将上一个节点的 next 作为新节点的 next
  node->next = pre_node->next;
  // 将上一个节点的 next 指向新的节点
  pre_node->next = node;
  return OK;
}

/* 删除指定序号的节点 */
Status delete (LinkList list, int SequenceNumber)
{
  if (SequenceNumber < 1 || list->next == NULL)
    return ERROR;
  Node *currentNode = list;
  // 遍历节点，寻找删除节点的上一个节点
  for (int i = 0; i < SequenceNumber - 1; i++)
  {
    // 如果当前节点为的 next 为 NULL，则表示到了末尾，说明删除的元素不存在
    if (currentNode == NULL)
      return ERROR;
    currentNode = currentNode->next;
  }
  // 保存待删除节点
  Node *deleteNode = currentNode->next;
  // 将删除节点的下一个节点交给上一个节点
  currentNode->next = currentNode->next->next;
  // 释放待删除结点的内存空间
  free(deleteNode);
  return OK;
}

/* 追加一个节点到末尾 */
Status append(LinkList list, DataType data)
{
  // 创建一个节点
  Node *node = (Node *)malloc(sizeof(Node));
  // 临时的节点存储
  Node *last = list;
  // 初始化新节点
  node->data = data;
  node->next = NULL;
  // 遍历节点到末尾
  while (last->next != NULL)
  {
    last = last->next;
  }
  // 插入到最后一个节点后面
  last->next = node;
  return OK;
}

/* 插入到链表最前端 */
Status push(LinkList *list, DataType data)
{
  // 创建一个节点作为新表头
  Node *new_head = (Node *)malloc(sizeof(Node));
  new_head->data = 0;
  new_head->next = NULL;
  // 初始化旧表头
  (*list)->data = data;
  // 旧表头作为新表头的下一个节点
  new_head->next = *list;
  // 指定新节点为表头
  *list = new_head;
  return OK;
}

/* 获取指定位置的元素 */
Status getElement(LinkList list, int SequenceNumber, Node **node)
{
  // 判断序号的合理性
  if (SequenceNumber < 1)
    return ERROR;
  // 临时的节点
  Node *currentNode = list;
  // 遍历节点
  for (int i = 0; i <= SequenceNumber; i++)
  {
    if (currentNode == NULL)
    {
      return ERROR;
    }
    currentNode = currentNode->next;
  }
  // 传回当前节点
  *node = currentNode;
  return OK;
}

/* 按值查找元素 */
Status locateElement(LinkList list, DataType data, Node **node)
{
  // 临时节点
  Node *currentNode = list->next;
  // 遍历节点
  while (currentNode != NULL)
  {
    // 如果当前节点的数据相等就传回当前节点的地址
    if (currentNode->data == data)
    {
      *node = currentNode;
      return OK;
    }
    currentNode = currentNode->next;
  }
  return ERROR;
}

void toString(LinkList list)
{
  Node *node = list->next;
  int size = 0;
  while (node != NULL)
  {
    size += 1;
    printf("(%d, %p)->\n", node->data, node->next);
    node = node->next;
  }
  printf("size = %d\n", size);
}
```

</CodeGroupItem>

<CodeGroupItem title="Java">

```java
class Node {
  int data;
  Node next = null;
}
```

</CodeGroupItem>

<CodeGroupItem title="javascript">

```js
function Node() {
  this.data;
  this.next = null;
}
```

</CodeGroupItem>

<CodeGroupItem title="python">

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
```

</CodeGroupItem>

</CodeGroup>

## 双向链表

## 循环链表

## 静态链表
