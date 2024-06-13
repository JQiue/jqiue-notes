---
title: 链表
category: 数据结构与算法
article: false
order: 2
---

存储多个元素，数组是最常见的数据结构，几乎每种语言都实现了数组，这很方便。但是它有一个很严重的缺点，插入和删除的成本都非常高，可能需要移动大量的元素

链表也是一种存储有序元素的结构，但和数组不同的是，元素在内存中地址不一定是连续的，每个元素由一个数据项和指向下一个元素的引用组成，相对于传统的数组容量是无限的，在进行插入和删除元素的时候不需要移动其他元素。缺点也很明显，不能像数组那样随机访问，访问某一个元素，必须从表头开始遍历

相对顺序存储来说，链式存储的存储空间地址是可以连续的，也可以是不连续的，地址并不对应逻辑关系，链式存储有以下优势：

+ 大小是无限的，不会产生额外的空间浪费
+ 插入和删除元素的复杂度为 O(1)

劣势：

+ 访问元素的复杂度为 O(n)，必须从第一个元素按顺序访问元素
+ 存储密度低，需要额外的空间表示存储关系
+ 对缓存不是很友好

链表由指向第一个节点的指针表示，第一个节点称为头部，如果链表为空，则头部的值为`NULL`

每个节点至少由两部分组成：

+ 数据
+ 指向下一个节点的引用

ADT：

+ 插入
+ 删除元素
+ 删除链表
+ 计数
+ 查找

::: code-tabs

@tab C

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
void print();

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
Status delete(LinkList list, int SequenceNumber)
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

void print(LinkList list)
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

@tab JavaScript

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
  }
  // 头插法
  push(data) {
    let node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.count++;
  }
  // 尾插法
  append(data) {
    let node = new Node(data);
    if (this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }
  removeAt(index) {
    if (index >= this.count || index < 0) {
      return undefined;
    }
    let current = this.head;
    if (index == 0) {
      this.head = current.next;
    } else {
      let previous = this.getElement(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;
    return current.data;
  }
  insert(data, index) {
    if (index > this.count || index < 0) {
      return false;
    } else {
      let node = new Node(data);
      if (this.head == null) {
        this.head = node;
      } else if (index == 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
    }
    this.count++;
    return true;
  }
  getElementAt(index) {
    if (index >= this.count || index < 0) {
      return undefined;
    }
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }
  indexOf(data) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if(data == current.data) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  // 反转（迭代）
  reverse() {
    let current, prev, next;
    current = this.head;
    prev = null;
    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
  // 反转（递归）
  reverseRecursion(node) {
    if(node.next == null) {
      this.head = node;
      return;
    }
    this.reverseRecursion(node.next);
    node.next.next = node;
    node.next = null;
  }
  isEmpty() {
    return this.count == 0;
  }
  size() {
    return this.count;
  }
}
```

@tab rust

```rust

```

:::

## 双向链表

在链表中，一个节点只有链向下一个节点的链接。而在双向链表中，链接是双向的，一个节点链向下一个元素，另一个节点链向前一个元素，可以很方便的访问回到上一个节点

::: code-tabs

@tab JavaScript

```js
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
  push(data) {
    // 创建新节点
    const node = new Node(data);
    // 判断为空的情况
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }
  removeAt(index) {
    // 判断边界
    if (index >= this.count || index < 0) {
      return undefined;
    }
    let current = this.head;
    if (index == 0) {
      this.head = current.next;
      this.head.prev = null;
    } else if (index == this.count - 1) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // 拿到删除结点的上一个节点
      let previous = this.getElementAt(index - 1);
      // 拿到当前要被删除的节点
      current = previous.next;
      previous.next = current.next;
      current.next.prev = previous;
    }
    this.count--;
    return current.data;
  }
  insert(data, index) {
    // 判断边界
    if (index > this.count || index < 0) {
      return false;
    } else {
      const node = new Node(data);
      let current = this.head;
      // 为空的情况
      if (this.head == null) {
        this.head = node;
        this.tail = node;
      } else if (index == 0) { // 插入到第一个节点的情况
        node.next = current;
        current.prev = node;
        this.head = node;
      } else if (index == this.count) { // 插入到最后一个元素末尾的情况
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      } else { // 插入到中间的情况
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
      }
    }
    this.count++;
    return true;
  }
  getElementAt(index) {
    // 边界判断
    if (index >= this.count || index < 0) {
      return undefined;
    }
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }
  indexOf(data) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (data == current.data) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  isEmpty() {
    return this.count == 0;
  }
  size() {
    return this.count;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.data}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.data}`;
      current = current.next;
    }
    return objString;
  }
}
```

:::

## 循环链表

循环链表和普通链表的唯一区别就是最后一个元素的指针总是指向第一个元素，它可以是单向或双向的

## 有序链表

有序链表中的元素是按照一定的顺序进行排列的

## 静态链表

静态链表兼顾了顺序表和链表的优点，在插入和删除是不需要移动元素，同时可以进行随机访问
