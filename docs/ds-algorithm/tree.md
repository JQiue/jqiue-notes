---
title: 树
category: 数据结构与算法
article: false
order: 6
---

线性结构只能描述一对一的情况，树是一种非线性结构，可以描述一对多的情况，比如公司组织架构，家谱

一棵树可以没有节点，称为空树，也可以只有一个节点，也就是只有根节点

一个树包含一些存在父子关系的节点，树中的每个元素称为节点，每个节点都有唯一的父节点（除了最顶部的根节点），位于树结构最顶部的节点是**根节点**。至少有一个子节点的节点被称为**内部节点**或**非叶子节点**，没有子节点的节点被称为**外部节点**或**叶子节点**

一个节点可以有祖先和后代，祖先包括**父节点**、**祖父节点**、**曾祖父节点**等，后代包括**子节点**，**孙子节点**、**曾孙节点**等

树还存在**子树**的概念，就是以子节点为根的树，由子节点和它的后代节点组成

一个节点的子树的个数被称为度，那么树的度就指的是所有节点的度中最大的那个

节点具有**深度**属性，节点深度取决于它祖先节点的数量或经过的路径，树的深度取决于所有节点深度的最大的那个

::: tip 深度是数节点数还是数路径？
看情况决定
:::

树具有**高度**属性，取决于节点深度最大的那个，同时树可以按层级划分，根节点在第 0 层，它的子节点在第 1 层，以此类推，最后一层相当于数的高度

::: tip 到底是从 0 还是 1 开始数高度？
从第 1 层开始数比较符合人类习惯，从第 0 层开始也没什么毛病，原理都是一样的
:::

由 m（m ≥ 0）棵互不相交的树组成的集合称为森林

根据子节点的排列顺序，还分为**有序树**和**无序树**

树的分类：

+ 一般树 - 任意节点的度不受限制
+ 二叉树 - 任意节点的度最多两个

## 二叉树

二叉树的节点最多有两个子节点，一个是左节点，一个是右节点。二叉树的左子树和右子树是有顺序的，即使某个节点只有一个子树，也要区分左右，所以二叉树是一种有序树

二叉树又根据节点的排列和分布有所不同定义：

+ 真二叉树 - 没有度为 1 的节点
+ 完满二叉树 - 所有的非叶子节点的度为 2
+ 完全二叉树 - 叶子节点都是向左靠齐，且只会出现最后 2 层
+ 满二叉树（完美二叉树） - 没有度为 1 的节点，但是所有的叶子节点都在最后一层

::: tip
满二叉树一定是完全二叉树，但完全二叉树不一定是满二叉树
:::

二叉树的性质：

+ 非空二叉树的第 i 层，最多有 2^2-i^ 个节点
+ 高度为 h 的二叉树上最多有 2^h^ - 1 个节点
+ 任意一棵二叉树，若度为 2 的节点有 n2 个则叶子树必定为 n2 + 1

在同样高度的树中，满二叉树的叶子节点数量最多，总节点数最多，满二叉树一定是真二叉树，但真二叉树不一定是满二叉树

完全二叉树的每一个编号都会和满二叉树中的编号一一对齐，满二叉树一定是一颗完全二叉树，但完全二叉树不一定是满二叉树

性质：

+ 度为 1 的节点只有左子树
+ 度为 1 的节点要么是 1 个，要么是 0 个
+ 同样节点数量的二叉树，完全二叉树的高度最小
+ 假如高度为 h，那么至少有 2^h-1^ 个节点，最多有 2^h^ - 1 个节点（满二叉树）

```js
class Node {
  constructor () {
    this.data = null;
    this.left = null;
    this.right = null;
  }
}
```

## 二叉搜索树

二叉搜索树是二叉树的一种，但是只允许在左节点存储（比父节点）小的值，在右节点存储（比父节点）大的值，定义如下：

+ 任意节点的值都大于其左子树所有节点的值
+ 任意节点的值都小于其右子树所有节点的值
+ 左右子树本身也是一颗二叉搜索树

二叉树的搜索、插入、删除的时间复杂度都是 log(n)

::: code-tabs

@tab C

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
  struct Node *left;
  struct Node *right;
} Node;

Status initRoot(Node **, DataType);
Status isEmpty(Node *);
Status clear(Node **);
Status insert(Node **, DataType);
Status traverse(Node *);

/* 初始化根节点 */
Status initRoot(Node **node, DataType data)
{
  *node = (Node *)malloc(sizeof(Node));
  if (*node == NULL)
  {
    return ERROR;
  }
  (*node)->data = data;
  (*node)->left = NULL;
  (*node)->right = NULL;
  return OK;
}

/* 插入节点 */
Status insert(Node **root, DataType data)
{
  /* 如果没有初始化根节点就进行初始化 */
  if (*root == NULL)
  {
    initRoot(root, data);
    return OK;
  }
  Node *node = *root;
  Node *parent = NULL;
  /* 寻找父节点 */
  while (node != NULL)
  {
    // 保存父节点
    parent = node;
    // 和当前节点进行比较，小就往左，大就往右，相等就覆盖
    if (data < node->data)
    {
      node = node->left;
    }
    else if (data > node->data)
    {
      node = node->right;
    }
    else
    {
      node->data = data;
      return OK;
    }
  }
  /* 判断插入到父节点的哪个位置 */
  if (data < parent->data)
  {
    // 创建节点
    parent->left = (Node *)malloc(sizeof(Node));
    // 初始化节点
    parent->left->data = data;
    parent->left->left = NULL;
    parent->left->right = NULL;
  }
  else
  {
    // 创建节点
    parent->right = (Node *)malloc(sizeof(Node));
    // 初始化节点
    parent->right->data = data;
    parent->right->left = NULL;
    parent->right->right = NULL;
  }
}

/* 前序遍历（DLR）的递归实现，只需要改变打印函数的位置就可以相应的实现中序、后序遍历 */
Status traverse(Node *root){
  if(root == NULL){
    return ERROR;
  }
  printf("%d ", root->data);
  traverse(root->left);
  traverse(root->right);
}
```

@tab JavaScript

```js
/* 节点 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  /* 构造一个引用指向根节点 */
  constructor() {
    this.root = null;
  }
  /* 插入节点的算法 */
  insertNode(node, data) {
    // 节点大于左节点就往右，否则往左，找一个位置插入
    if (node.data > data) {
      // 如果当前节点不为空，则继续遍历，否则插入到该位置
      if (node.left == null) {
        node.left = new Node(data);
      } else {
        this.insertNode(node.left, data);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(data);
      } else {
        this.insertNode(node.right, data);
      }
    }
  }
  // 搜索节点的算法
  searchNode(node, data) {
    if (node == null) {
      return false;
    }
    if (node.data > data) {
      return this.searchNode(node.left, data);
    } else if (node.data < data) {
      return this.searchNode(node.right, data);
    } else if (node.data == data) {
      return true;
    } else {
      return false;
    }
  }
  // 删除节点的算法
  removeNode (node, data) {
    if (node == null) {
      return null;
    }
    if (node.data > data) {
      this.removeNode(node.left, data);
      return node;
    } else if (node.data < data) {
      this.removeNode(node.right, data);
      return node;
    } else {
      /* 找到了 */
      // 处理叶子节点的情况
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      // 处理只有一侧子节点的情况
      if (node.left == null) {
        node = node.right;
        return node;
      } else if(node.right == null) {
        node = node.left;
        return node;
      }
      // 处理有两侧子节点的情况
      const aux = this.minNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }
  /* 根据二叉树特性，最小的节点一定在整棵树的最左边 */
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  /* 根据二叉树特性，最大的节点一定在整棵树的最右边 */
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  insert(data) {
    if (!this.root) {
      this.root = new Node(data);
    } else {
      this.insertNode(this.root, data);
    }
  }
  search(data) {
    return this.searchNode(this.root, data);
  }
  remove(data) {
    this.root = this.removeNode(this.root, data);
  }
  min() {
    return this.minNode(this.root);
  }
  max() {
    return this.maxNode(this.root);
  }
}
```

:::

## 树的遍历

## 平衡树

二叉搜索树在某些极端的情况下，会出现退化的情况，比如插入的值依次越来越小，二叉搜索树就会退化成链表，非常影响树的查找性能，让树平衡就是为了降低树的高度

AVL（Adelson-Velskii-Landi）树是一种自平衡树，用来解决二叉搜索树的性能问题，在添加或移除节点时，任意节点的左子树和右子树的高度最多差 1，让它的节点尽量的均匀分布

## 红黑树

红黑树也是一个自平衡二叉搜索树，AVL 树在进行添加或移除节点的时候可能会造成旋转，所以需要一个包含多次插入和删除的自平衡树

## 堆

堆是一种特殊的二叉树，能够高效、快速的找出最大值和最小值，常用于优先队列，也用于堆排序算法中，也被用于非常出名的堆排序算法中

堆具有两个特性：

+ 是一颗完全二叉树
+ 不是最小堆就是最大堆，即所有的节点都大于等于或着小于等于它的每个子节点

::: code-tabs

@tab JavaScript

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  compare(a, b) {
    return a > b ? true : false;
  }
  swap(array, a, b) {
    let t = array[a];
    array[a] = array[b];
    array[b] = t;
  }
  siftUp(index) {
    let parent = this.getParentIndex(index); 
    while (index > 0 && this.compare(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) { 
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    return Math.floor(index / 2);
  }
  insert(data) {
    if (data != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }
  extract() {}
  findMinimum() {}
  size() {
    return this.heap.length;
  }
  isEmpty () {
    return this.size() == 0;
  }
}
```

:::

## B 树

## B+ 树
