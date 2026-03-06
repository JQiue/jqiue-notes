---
title: 链表
category: 数据结构与算法
article: false
order: 2
---

链表也是一种存储有序元素的结构，但和数组不同的是，元素在内存中地址不一定是连续的，每个元素由一个数据项和指向下一个元素的引用组成，相对于传统的数组容量是无限的，在进行插入和删除元素的时候不需要移动其他元素。缺点也很明显，不能像数组那样随机访问，访问某一个元素，必须从表头开始遍历

## 指针链表：用“缓存缺失”换取的极致灵活性

相对顺序存储来说，链式存储的存储空间地址是可以连续的，也可以是不连续的，地址并不对应逻辑关系，链式存储有以下优势：

+ 不需要预先分配大块连续空间，能利用零散的内存
+ 插入和删除元素的复杂度为 O(1)，仅在已知位置（如头结点）时

劣势：

+ 由于内存不连续，CPU 无法进行预取（Prefetch），每次访问节点都可能导致严重的缓存缺失（Cache Miss），执行速度比数组慢几个量级
+ 访问元素的复杂度为 O(n)，必须从第一个元素按顺序访问元素
+ 存储密度低，需要额外的空间表示存储关系，在存储小对象时，额外开销甚至超过数据本身

适用场景：

+ 实现栈或队列（仅操作头尾）
+ 需要频繁地在头部插入数据
+ 对内存地址稳定性有特殊要求的底层算法

::: tip
在现代计算机中，“空间换时间”的准则正在发生变化。由于 CPU 与内存之间的性能鸿沟，顺序存储（数组）带来的缓存收益往往远超链表逻辑上的 $O(1)$ 优势。除非有明确的动态扩容或地址稳定需求，否则首选数组
:::

链表由指向第一个节点的指针表示，第一个节点称为头部，如果链表为空，则头部的值为`NULL`

每个节点至少由两部分组成：

+ 数据
+ 指向下一个节点的引用

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

@tab Rust

```rust
#[derive(Debug)]
struct Node<T> {
  data: T,
  next: Option<Box<Node<T>>>,
}

#[derive(Debug)]
struct List<T> {
  head: Option<Box<Node<T>>>,
  count: u32,
}

impl<T> List<T> {
  pub fn new() -> Self {
    Self {
      head: None,
      count: 0,
    }
  }

  pub fn push_front(&mut self, data: T) {
    // Take the current head, leaving None in its place
    let old_head = self.head.take();
    // Create a new node that points to the old head
    let node = Node {
      data,
      next: old_head,
    };
    // Update the head to the new node and increment count
    self.head = Some(Box::new(node));
    self.count += 1;
  }

  pub fn pop_front(&mut self) -> Option<T> {
    self.head.take().map(|node| {
      self.count -= 1;
      self.head = node.next;
      node.data
    })
  }

  pub fn insert(&mut self, data: T, index: u32) {
    if index > self.count {
      return;
    }

    if index == 0 {
      let old_head = self.head.take();
      self.head = Some(Box::new(Node {
        data,
        next: old_head,
      }));
      self.count += 1;
      return;
    }

    let mut cur_node = &mut self.head;

    for _ in 0..(index - 1) {
      if let Some(node) = cur_node {
        cur_node = &mut node.next;
      }
    }

    if let Some(ref mut prev_node) = cur_node {
      let new_node = Box::new(Node {
        data,
        next: prev_node.next.take(),
      });
      prev_node.next = Some(new_node);
      self.count += 1;
    }
  }

  pub fn len(&self) -> u32 {
    self.count
  }

  pub fn is_empty(&self) -> bool {
    self.count == 0
  }

  pub fn peek(&self) -> Option<&T> {
    self.head.as_ref().map(|node| &node.data)
  }

  pub fn clear(&mut self) {
    self.head.take();
    self.count = 0;
  }
}

// 触发递归 drop 调用时，可能导致栈溢出
impl<T> Drop for List<T> {
  fn drop(&mut self) {
    // Take the head to start the iterative drop process
    let mut cur_link = self.head.take();
    while let Some(node) = cur_link {
      // By taking the next node, we drop the current node without
      cur_link = node.next
    }
  }
}
```

:::

## 静态链表：披着数组外壳的链表灵魂

使用数组实现的链表，下标即指针

+ **本质：** 兼顾了数组的**物理连续性**与链表的**逻辑跳跃性**。
+ **优化点：** 极大地提高了**Cache 命中率**，且规避了频繁申请/释放内存（malloc/new）的系统调用开销。
+ **局限：** 必须预先确定最大容量，丧失了动态链表“无限扩展”的优势。

## 双向链表：LRU 算法的基石与删尾利器

每个节点包含两个指针：`next`（后继）和 `prev`（前驱）

+ **杀手锏：** 实现真正的 **$O(1)$ 删尾**。单链表即便有尾指针，删尾也需要 $O(n)$ 找前驱。
+ **典型应用：LRU (Least Recently Used) 缓存**。**哈希表**负责 $O(1)$ 定位数据。**双向链表**负责 $O(1)$ 移动访问项到头，以及 $O(1)$ 移除过期尾部。

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

最后一个节点的指针指向第一个元素，形成闭环。可以是单向或双向。

+ **应用：** 操作系统进程的时间片调度、播放列表循环、环形缓冲区。

## 有序链表：二分查找的“禁区”

有序链表中的元素是按照一定的顺序进行排列的

## 侵入式链表：当数据不再被“包装”，而是自带挂钩

## 快慢指针：在单次遍历中捕捉“中点”与“环”的几何艺术

在链表的世界里，如果说普通遍历是“散步”，那么**快慢指针（Fast & Slow Pointers）**就是一场精心设计的“赛跑”。它又被称为**龟兔赛跑算法（Tortoise and Hare Algorithm）**

其核心思想是：利用两个步调不一致的指针（通常快指针走 2 步，慢指针走 1 步），通过它们**距离或位置的差值**，来解决链表中的特定问题。

链表不支持随机访问（$O(n)$），这导致很难直接定位“中间点”或检测“环”。快慢指针通过在单次遍历中创造相对位移，强行抵消了链表无法直接计算物理地址的短板。

设定两个指针 slow 和 fast，初始都在 head

+ 步长： $v_{slow} = 1$，$v_{fast} = 2$。
+ 物理效应：当快指针到达终点时，慢指针恰好在链表的中点位置（因为时间相同，路程减半）。
+ 追赶效应：如果链表有环，快指针最终会像操场跑步一样“扣圈”，从后面追上并撞向慢指针。
