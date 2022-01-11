---
title: 使用 LaTeX 写作 
category: 知识分享
author: JQiue
article: false
---

LaTeX 主要是面向数学、物理、计算机等专业，为学术出版服务的，这里主要介绍一下在数学中的用法

## 语法

所有的语法都写在一对`$`符号中，它只是一种行内语法，并不会单独占一行，而使用一对`$$`可以表示块级语法

## 表示

+ $+$ —— `+`
+ $-$ ——`-`
+ $\times$ —— `\times`
+ $\div$ —— `\div`
+ $=$ —— `=`
+ $\pm$ —— `\pm`
+ $\geq$ ——`\geq`
+ $\leq$ ——`\leq`
+ $\neq$ —— `\neq`
+ $\approx$ —— `\approx`
+ $\frac{x}{y}$ —— `\frac{x}{y}`
+ $\sqrt{x}$ —— `\sqrt{x}`
+ $\sqrt[3]{x}$ —— `\sqrt[3]{x}`
+ $\sum$ —— `\sum`
+ $\log_{a}{b}$ —— `\log_{a}{b}`
+ $\in$ —— `\in`
+ $\notin$ —— `\notin`
+ $\subset$ —— `\subset`
+ $\subseteq$ —— `\subseteq`
+ $\subsetneqq$ —— `\subsetneqq`
+ $\supset$ —— `\supset`
+ $\supseteq$ —— `\supseteq`
+ $\supsetneqq$ —— `\supsetneqq`
+ $\cap$ —— `\cap`
+ $\cup$ —— `\cup`

## 上下标

+ 上标，使用 `^` 来实现
+ 下标，使用 `_` 来实现

上下标默认只作用于之后的一个字符，如果想对连续的几个字符起作用，请将这些字符用花括号 `{}` 括起来。

## 分段函数

$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$

```tex
$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$
```

## 矩阵

<!-- more -->