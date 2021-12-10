---
title: 队列
category: 数据结构与算法
tags: [Alpha]
author: JQiue
article: false
---

## 顺序存储的队列

### 顺序队列的实现

<CodeGroup>

<CodeGroupItem title="C" active>

```c
#include "stdio.h"
#include "stdlib.h"

#define OK 1
#define ERROR 0
#define CAPACITY 10

typedef int Status;
typedef int ElementType;
typedef struct Queue
{
  ElementType *array;
  int front, rear;
  int capacity;
  int size;
} Queue;

Status initQueue(Queue **);
Status isEmpty(Queue *);
Status isFull(Queue *);
Status enQueue(Queue *, ElementType);
Status deQueue(Queue *, ElementType *);

int main(void)
{
  Queue *q = NULL;
  initQueue(&q);
  return 0;
}

/* 初始化队列 */
Status initQueue(Queue **q)
{
  // 开辟队列空间
  (*q) = (Queue *)malloc(sizeof(Queue));
  if(*q == NULL) {
    return ERROR;
  }
  // 初始化容量
  (*q)->capacity = CAPACITY;
  // 开辟连续的元素存储空间
  (*q)->array = (ElementType *)malloc((*q)->capacity * sizeof(ElementType));
  // 初始化队头，队尾，长度
  (*q)->front = (*q)->size = 0;
  // 非常关键的一个赋值，影响入队的操作
  (*q)->rear = (*q)->capacity - 1;
  printf("queue = %p, capacity = %d, size = %d, front = %d, rear = %d, array = %p\n", (*q), (*q)->capacity, (*q)->size, (*q)->front, (*q)->rear, (*q)->array);
  return OK;
}

/* 判断队列是否为空 */
Status isEmpty(Queue *q)
{
  if (q->size == 0)
  {
    printf("Queqe is empty\n");
    return OK;
  }
  return ERROR;
}

/* 判断队列是否满了 */
Status isFull(Queue *q)
{
  // 当长度等于容量就代表满了
  if (q->size == q->capacity)
  {
    printf("Queqe is full\n");
    return OK;
  }
  return ERROR;
}

/* 入队 */
Status enQueue(Queue *q, ElementType e)
{
  // 判断是否满了
  if (isFull(q))
  {
    return ERROR;
  }
  // 算出队尾的位置，这里的取模计算永远使队尾在固定的范围移动
  q->rear = (q->rear + 1) % q->capacity;
  // 插入元素
  q->array[q->rear] = e;
  // 增加长度
  q->size++;
  printf("%d enqueued to queue\n", e);
  return OK;
}

/* 出队 */
Status deQueue(Queue *q, ElementType *e)
{
  // 判断是否为空
  if (isEmpty(q))
  {
    return ERROR;
  }
  // 将当前队头的元素返回出去
  *e = q->array[q->front];
  // 移动队头，同样通过取模计算出队头的合理位置
  q->front = (q->front + 1) % q->capacity;
  // 长度减少
  q->size--;
  printf("%d dequeued from queue\n", *e);
  return OK;
}
```

</CodeGroupItem>

<CodeGroupItem title="java">
```java
```
</CodeGroupItem>

<CodeGroupItem title="javascript">
```js
```
</CodeGroupItem>

<CodeGroupItem title="python">
```python
```
</CodeGroupItem>

</CodeGroup>

## 链式存储的队列

### 链式队列的实现

<CodeGroup>

<CodeGroupItem title="C" active>

```c
#include "stdio.h"
#include "stdlib.h"

#define OK 1
#define ERROR 0

typedef int Status;
typedef int DataType;
typedef struct Node
{
  DataType data;
  struct Node *next;
} Node;
typedef struct Queue
{
  Node *front;
  Node *rear;
  int size;
} Queue, *LinkedQueue;

Status initQueue(LinkedQueue *);
Status isEmpty(LinkedQueue);
Status enQueue(LinkedQueue, DataType data);
Status deQueue(LinkedQueue, DataType *data);

int main(void)
{
  LinkedQueue q = NULL;
  initQueue(&q);
  return 0;
}

/* 初始化队列 */
Status initQueue(LinkedQueue *q)
{
  // 开辟描述队列结构体的空间
  *q = (Queue *)malloc(sizeof(Queue));
  // 判断开辟空间是否失败
  if(*q == NULL) {
    return ERROR;
  }
  // 创建一个头节点
  Node *head = (Node *)malloc(sizeof(Node));
  // 初始化头节点
  head->data = 0;
  head->next = NULL;
  // 初始化队头，队尾，长度
  (*q)->front = head;
  (*q)->rear = head;
  (*q)->size = 0;
  return OK;
}

/* 判断队列是否为空 */
Status isEmpty(LinkedQueue q){
  // 当队头和队尾相等时即为空
  if(q->front == q->rear){
    printf("Queue is empty\n");   
    return OK;
  }
  return ERROR;
}

/* 入队 */
Status enQueue(LinkedQueue q, DataType data){
  // 创建一个节点
  Node *node = (Node *)malloc(sizeof(Node));
  // 初始化节点
  node->data = data;
  node->next = NULL;
  // 将节点插入队尾位置
  q->rear->next = node;
  // 移动队尾
  q->rear = node;
  printf("%d enqueued to queue\n", data);
  return OK;
}

/* 出队 */
Status deQueue(LinkedQueue q, DataType *data) {
  // 判断是否为空
  if(isEmpty(q)) {
    return ERROR;
  }
  // 创建一个临时的节点，存储队头元素的地址（不是头结点），稍后释放该节点的空间
  Node *tempNode = q->front->next;
  // 返回队头元素的数据（此时队头指向头节点）
  *data = tempNode->data;
  // 修改头结点的指针，相对于移动了队头
  q->front->next = tempNode->next;
  printf("%d dequeued from queue\n", tempNode->data);
  // 释放节点空间
  free(tempNode);
  return OK;
}
```

</CodeGroupItem>

<CodeGroupItem title="java">
```java
```
</CodeGroupItem>

<CodeGroupItem title="javascript">
```js
```
</CodeGroupItem>

<CodeGroupItem title="python">
```python
```
</CodeGroupItem>

</CodeGroup>

## 双端队列

## 阻塞队列

## 并发队列
