---
title: 树
category: 数据结构
tags: [Alpha]
author: JQiue
article: false
---

线性结构只能描述一对一的情况，树是一种非线性结构，可以描述一对多的情况

树是由一个或多个节点组成的有限集合，有且仅有一个节点称为根，当节点数大于 1 时，其余节点分为 m 个互不相交的有限集合，每个集合本身又是一棵树，称为子树。节点只有一个直接前驱，但可能有多个直接后驱

树的基本概念：

1. 根：没有前驱的节点
2. 叶子：没有后驱的节点
3. 非叶子：有后驱的节点
4. 子树：以子节点为根的树
5. 节点的度：子树的个数（有几个直接后续就是几度）
6. 树的度：所有节点的度中最大的
7. 层数：根节点在第 1 层，根节点的子节点在第 2 层，以此类推
8. 节点的深度：从根节点到当前节点的唯一路径上的节点总数
9. 节点的高度：从当前节点到最远叶子节点的路径上的节点总数
10. 树的深度：所有节点深度的最大值
11. 树的高度：所有节点高度的最大值
12. 双亲：当前的节点的直接前驱
13. 孩子：当前节点的直接后驱
14. 兄弟：拥有同一个直接前驱
15. 有序树：树中任意节点的子节点之间有顺序关系
16. 无序树：树中任意节点的子节点之间没有顺序关系

一棵树可以没有节点，称为空树，也可以只有一个节点，也就是只有根节点

树的分类：

1. 一般树：任意节点的度不受限制
2. 二叉树：任意节点的度最多两个
3. 森林：由 m（m ≥ 0）棵互不相交的树组成的集合

## 二叉树

二叉树的左子树和右子树是有顺序的，即使某个节点只有一个子树，也要区分左右，所以二叉树是一种有序树

二叉树的性质：

+ 非空二叉树的第 i 层，最多有 2^2-i^ 个节点
+ 高度为 h 的二叉树上最多有 2^h^ - 1 个节点
+ 任意一棵二叉树，若度为 2 的节点有 n2 个则叶子树必定为 n2 + 1

二叉树的分类：

+ 真二叉树：所有节点的度要么是 0，要么是 2，没有度为 1 的节点
+ 满二叉树：所有节点的度要么是 0，要么是 2，但是所有的叶子节点都在最后一层
+ 完全二叉树：叶子节点只会出现最后 2 层，且最后 1 层的叶子节点都是向左靠齐

在同样高度的树中，满二叉树的叶子节点数量最多，总节点数最多，满二叉树一定是真二叉树，但真二叉树不一定是满二叉树

完全二叉树的每一个编号都会和满二叉树中的编号一一对齐，满二叉树一定是一颗完全二叉树，但完全二叉树不一定是满二叉树

性质：

+ 度为 1 的节点只有左子树
+ 度为 1 的节点要么是 1 个，要么是 0 个
+ 同样节点数量的二叉树，完全二叉树的高度最小
+ 假如高度为 h，那么至少有 2^h-1^ 个节点，最多有 2^h^ - 1 个节点（满二叉树）

### 二叉搜索树的实现

二叉搜索树的定义如下：

+ 任意节点的值都大于其左子树所有节点的值
+ 任意节点的值都小于其右子树所有节点的值
+ 左右子树本身也是一颗二叉搜索树

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
  struct Node *left;
  struct Node *right;
} Node;

Status initRoot(Node **, DataType);
Status isEmpty(Node *);
Status clear(Node **);
Status insert(Node **, DataType);
Status traverse(Node *);

int main(void)
{
  Node *root = NULL;
  return 0;
}

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

</CodeGroupItem>

</CodeGroup>

## B 树

## 堆

## 红黑树
