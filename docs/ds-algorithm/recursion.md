---
title: 递归
category: 数据结构与算法
article: false
---

递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身，如果没有基线条件，会不断地递归下去，所以每个递归都有一个不再递归调用的条件，防止无限递归

> 要理解递归，就要先理解递归

用 JavaScript 来实现这句话，`understandRecursion()`函数会不断的调用自身，直到`answer`为真，`answer`就是基线条件：

```js
function understandRecursion() {
  const answer = confirm('你理解递归了吗?');
  if(answer == true) {
    return true;
  }
  understandRecursion(answer);
}
```

::: demo 理解递归

```html
<button id="btn">开始理解递归</button>
```

```js
function understandRecursion() {
  const answer = confirm('你理解递归了吗?');
  if(answer == true) {
    return true;
  }
  understandRecursion(answer);
}

document.querySelector('#btn').onclick = function () {
  understandRecursion();
}
```

:::

递归实现一个数字 5 的阶乘：

1. `factorial(5)` = `5 * factorial(4)`
2. `factorial(5)` = `5 * 4 * factorial(3)`
3. `factorial(5)` = `5 * 4 * 3 * factorial(2)`
4. `factorial(5)` = `5 * 4 * 3 * 2 * factorial(1)`
5. `factorial(1)` = `1`

```js
function factorial(n) {
  if(n == 1 || n == 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
```

每当函数被调用时，该函数会进入调用栈的顶部，当使用递归的时候，每个函数调用都会叠在调用栈的顶部，这是因为每个调用都依赖前一个调用的结果。递归并不会无限的执行下去，在这种情况下，如果没有停止递归调用的基线条件，就会产生栈溢出

::: tip
一个程序可使用的内存是有限的，程序会将内存划分为各种区域，栈分区就是其中的一种，栈内存的大小和对应的编译器有关，这是编译期决定的，无法在运行期进行改变，一旦程序使用的栈内存超过最大值，就会发生栈溢出
:::

```js
let count = 0;

function recursive() {
  count++;
  recursive();
}

try {
  recursive();
} catch (error) {
  console.log(count);
}
```

这可以测试不同环境下的可最大递归次数，ES6 中有尾递归优化，如果函数中的最后一个操作是调用函数，会通过跳转指令，而不是进行子程序调用的方式来控制，这意味着这个代码在 ES6 中可以无限的执行下去，因此基线条件非常重要

斐波那契数列是另一个可以用递归来解决的问题，它是一个由 0、1、1、2、3、5、8 等组成的队列，2 由 1 + 1 得到，5 由 2 + 3 得到，以此类推

+ `5` = `fibonacci(4) + fibonacci(3)`
+ `3` = `fibonacci(3) + fibonacci(2)`
+ `2` = `fibonacci(2) + fibonacci(1)`

```js
function fibonacci(n) {
  if (n < 1) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

递归并不代表快，通常使用迭代的方式也能解决递归能解决的问题，但是递归版本更容易理解，需要的代码更加少，甚至有些算法无法使用迭代的方式
