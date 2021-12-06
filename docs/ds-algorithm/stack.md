---
title: 栈
category: 数据结构
tags: [Beta]
author: JQiue
---

栈只是一种特殊的线性表，它是线性表的一种具体形式，也就是必须通过顺序表或链表来实现它，但是它在操作上有一些特殊的要求和限制，只能在一端进行操作。对于栈来说，表尾称之为栈顶，而表头称之为栈底。新的元素总是靠近栈顶，旧的元素总是靠近栈底，栈就像弹夹一样，最先压进去的子弹一定是最后出来的，所以它遵循先进后出或后进先出的原则，即 LIFO（Last In First Out）。栈被用于编译器和内存中保存变量、方法调用等，也在浏览器中用于历史记录

+ 往栈中添加元素的操作，叫做入栈
+ 从栈中移除元素的操作，叫做出栈

::: tip 栈和内存栈
数据结构中的栈和内存中的栈空间是有区别的，虽然它们有点联系
:::

## 顺序存储的栈

使用数组实现，不需要额外的指针空间，但是它的容量无法增长

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

typedef struct Stack
{
  ElementType *base;
  ElementType *top;
  int size;
  int capacity;
} Stack, *SqStack;

Status initStack(SqStack *);
Status isFull(SqStack);
Status isEmpty(SqStack);
Status push(SqStack, ElementType);
Status pop(SqStack, ElementType *);
Status peek(SqStack);

int main(void)
{
  SqStack s = NULL;
  initStack(&s);
  return 0;
}

/* 初始化栈 */
Status initStack(SqStack *s)
{
  // 开辟栈空间
  *s = (Stack *)malloc(sizeof(Stack));
  if ((*s) == NULL){
    return ERROR;
  }
  // 初始化容量
  (*s)->capacity = CAPACITY;
  // 开辟一块连续的空间将基地址交给栈底
  (*s)->base = (ElementType *)malloc((*s)->capacity * sizeof(ElementType));
  // 初始化栈顶
  (*s)->top = (*s)->base;
  // 初始化长度
  (*s)->size = 0;
  return OK;
}

/* 判断栈是否满了 */
Status isFull(SqStack s)
{
  // 这里的指针相减会得到一个地址字节除以类型字节的整数偏差量
  if (s->top - s->base >= s->capacity)
  {
    printf("Stack is full\n");
    return OK;
  }
  return ERROR;
}

/* 判断栈是否为空 */
Status isEmpty(SqStack s)
{
  // 当栈顶和栈底相等就是没有元素
  if (s->top == s->base)
  {
    printf("Stack is empty\n");
    return OK;
  }
  return ERROR;
}

/* 入栈 */
Status push(SqStack s, ElementType e)
{
  // 判断栈是否满了
  if (isFull(s))
  {
    return ERROR;
  }
  // 赋值到当前栈顶位置，并移动栈顶
  *(s->top++) = e;
  printf("push %d in stack\n", e);
  return OK;
}

/* 出栈 */
Status pop(SqStack s, ElementType *e)
{
  // 判断栈底是否为空
  if (isEmpty(s))
  {
    return ERROR;
  }
  // 移动栈顶到需要弹出的元素位置并赋值
  *e = *(--s->top);
  printf("pop %d out stack\n", *e);
  return OK;
}

/* 偷看一个栈顶的元素，而不做出栈操作 */
Status peek(SqStack s)
{
  if (isEmpty(s))
  {
    return ERROR;
  }
  printf("The top element is %d\n", *(s->top - 1));
  return OK;
}
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript">

```js
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items[this.items.length] = element;
  }
  pop() {
    if (this.isEmpty()) {
      return -1;
    }
    const element = this.items[this.items.length - 1];
    this.items.length--;
    return element;
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items.length = 0;
  }
}
```

</CodeGroupItem>

</CodeGroup>

## 链式存储的栈

和顺序存储的栈相比，它有无限的大小，但是需要额外的内存

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

typedef struct Stack
{
  Node *top;
} Stack, *LinkedStack;

Status initStack(LinkedStack *);
Status isEmpty(LinkedStack);
Status push(LinkedStack, DataType);
Status pop(LinkedStack, Node **);
Status peek(LinkedStack);

int main(void)
{
  LinkedStack s = NULL;
  initStack(&s);
  return 0;
}

/* 初始化栈 */
Status initStack(LinkedStack *s)
{
  (*s) = (Stack *)malloc(sizeof(Stack));
  (*s)->top = NULL;
  return OK;
}

/* 判断是否为空 */
Status isEmpty(LinkedStack s)
{
  if (s->top == NULL)
  {
    printf("Stack is empty\n");
    return OK;
  }
  return ERROR;
}

/* 入栈 */
Status push(LinkedStack s, DataType data)
{
  // 创建一个节点元素
  Node *node = (Node *)malloc(sizeof(Node));
  node->data = data;
  // 由于必须从栈顶插入，所以要使用表头插入法
  node->next = s->top;
  s->top = node;
  printf("push %d in stack\n", data);
  return OK;
}

/* 出栈 */
Status pop(LinkedStack s, Node **node)
{
  // 判断是否为空
  if (isEmpty(s)){
    return ERROR;
  }
  // 将当前栈顶元素传回给外界
  *node = s->top;
  // 移动栈顶
  s->top = s->top->next;
  printf("(%d, %p) popped from stack\n", (*node)->data, (*node)->next);
  return OK;
}

/* 看一下栈顶元素 */
Status peek(LinkedStack s)
{
  if (isEmpty(s))
    return ERROR;
  printf("The top element is (%d, %p)\n", s->top->data, s->top->next);
  return OK;
}
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript">

```js
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element) {
    this.items[this.count++] = element;
  }
  pop() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.items[this.count-- - 1];
  }
  peek() {
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let str = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      str = `${str}, ${this.items[i]}`;
    }
    return str;
  }
}
```

</CodeGroupItem>

</CodeGroup>

## 应用

栈应用很广，在回溯问题中，可以存储访问过的任务和路径、撤销的操作，可以用来处理计算机科学问题

在现实中十进制是最主要的方式，然而在计算机中二进制是最重要的，因为计算机中所有的内容都是用二进制表示，没有十进制和二进制互相转换的能力，和计算机交流就很困难

这是一个十进制转二进制的算法

```js
function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';
  while (number > 0) { 
    rem = Math.floor(number % 2);    // 求余
    remStack.push(rem);              // 放入栈中
    number = Math.floor(number / 2); // 获得下一次被除数
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString(); // 从栈中取出
  }
  return binaryString;
}
```

这是改进后的算法，十进制可以转换为 2~16 之间的任意进制

```js
function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEF';
  let number = decNumber;
  let rem;
  let baseString = '';
  if (!(base >= 2 && base <= 16)) { // 判断是否能够在基数内进行转换
    return ''
  }
  while (number > 0) {
    rem = Math.floor(number % base); // 求余
    remStack.push(rem); // 放入栈中
    number = Math.floor(number / base); // 获得下一次被除数
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; // 从栈中取出并转换
  }
  return baseString;
}
```