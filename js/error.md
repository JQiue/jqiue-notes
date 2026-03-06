---
title: 错误处理
category: 编程语言
tag: [JavaScript]
article: false
---

JavaScript 的错误处理核心不在于“有没有 `try...catch`”，而在于同步代码和异步代码的错误传播路径并不一样。

如果想先看错误处理的共性模型，可以先读 [编程语言中的错误处理模型](/sundry/error.html)。本篇只关注 JavaScript 自己的机制：`try...catch`、`throw`、`Error` 对象、`finally`，以及 Promise / `async` / `await` 场景下的错误边界。

## JavaScript 中的错误是什么

在 JavaScript 中，程序运行出错时通常会抛出一个错误对象。最常见的内建错误类型包括：

+ `ReferenceError`
+ `TypeError`
+ `SyntaxError`
+ `RangeError`
+ `URIError`

例如：

```js
1 / 0; // JavaScript 不会因为这个抛错，而是得到 Infinity
foo; // ReferenceError
null.f(); // TypeError
```

JavaScript 里需要特别注意的一点是：不是所有“看起来不对劲”的行为都会抛错，真正能进入错误处理流程的，是那些明确抛出了异常的情况。

## `try...catch`：处理同步运行时错误

`try...catch` 用于捕获同步代码中的运行时错误：

```js
try {
  // 执行代码
} catch (error) {
  // 错误处理
}
```

例如：

```js
try {
  foo;
} catch (error) {
  console.log('发生了错误');
}
```

这里 `foo` 未定义，会触发 `ReferenceError`，随后控制流跳转到 `catch`。

需要注意的是，`try...catch` 只能处理运行时错误，不能处理语法错误；而且它默认只对当前这段同步执行路径生效。

## `Error` 对象

发生错误时，`catch` 捕获到的通常是一个错误对象。最常见的两个属性是：

+ `name`：错误类型名称
+ `message`：错误描述

```js
try {
  foo;
} catch (error) {
  console.log(error.name); // ReferenceError
  console.log(error.message); // foo is not defined
}
```

`Error` 及其子类的价值不只是“打印报错”，更重要的是：它让错误具备了基本结构，便于分类、重抛和统一处理。

## `throw`：主动抛出错误

除了运行时自动抛出的错误，也可以通过 `throw` 主动抛出异常：

```js
const user = { name: 'foo' };

if (!user.age) {
  throw new SyntaxError('没有定义 age 属性');
}
```

更常见、更稳妥的做法是抛出 `Error` 或其子类，而不是随手抛一个字符串。因为错误对象更容易保留类型和上下文。

## `catch` 不应该吞掉所有错误

`catch` 的问题不在于“能不能抓到”，而在于抓到之后怎么处理。

如果一个 `catch` 把所有错误都吞掉，最终会让真正的问题被掩盖掉。因此更合理的做法通常是：

+ 只处理当前层真正理解的错误
+ 不属于本层职责的错误继续抛出

例如：

```js
const user = { name: 'foo' };

try {
  foo; // ReferenceError

  if (!user.age) {
    throw new SyntaxError('没有定义 age 属性');
  }
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(error.message);
  } else {
    throw error;
  }
}
```

这段代码的重点不是语法，而是边界意识：`catch` 应该只处理自己知道怎么处理的错误。

## `finally`：保证收尾逻辑执行

`finally` 无论是否发生错误都会执行，适合放资源清理、状态回滚、收尾打印等逻辑：

```js
try {
  // 尝试执行的代码
} catch (error) {
  // 错误处理
} finally {
  // 总会执行的代码
}
```

即使 `try` 中出现了 `return`，`finally` 依然会先执行：

```js
function fn() {
  try {
    return 1;
  } finally {
    console.log('finally');
  }
}

console.log(fn());
```

## JavaScript 最容易误解的点：异步错误

JavaScript 里最容易踩坑的地方，不是同步错误，而是异步错误。

下面这段代码无法按很多人的直觉工作：

```js
try {
  setTimeout(() => {
    throw new Error('fail');
  }, 1000);
} catch (error) {
  console.log(error);
}
```

原因不是 `throw` 失效了，而是 `try...catch` 只包住了当前同步调用栈；`setTimeout` 的回调会在之后的事件循环中执行，已经不在原来的调用链上了。

这也是 JavaScript 错误处理和很多同步语言相比最不直观的地方：异步任务里的错误，不会天然沿着原来的同步结构冒泡。

## Promise 和 `async` / `await`

在 Promise 模型下，错误通常会变成 rejected 状态：

```js
Promise.reject(new Error('fail'))
  .catch((error) => {
    console.log(error.message);
  });
```

而在 `async` / `await` 语法下，Promise rejection 又可以重新用 `try...catch` 的形式来处理：

```js
async function main() {
  try {
    await Promise.reject(new Error('fail'));
  } catch (error) {
    console.log(error.message);
  }
}
```

这里看起来像同步异常，其实底层仍然是 Promise 错误传播，只是 `await` 把写法重新拉回了更直观的结构。

## 全局错误边界

不是所有错误都会被本地 `try...catch` 接住，因此 JavaScript 还需要关注全局错误边界。

浏览器环境里常见的有：

+ `window.onerror`
+ `unhandledrejection`

Node.js 环境里常见的有：

+ `uncaughtException`
+ `unhandledRejection`

这些机制适合做最后一道兜底监控和日志记录，但不适合替代正常的局部错误处理。全局兜底的意义在于“别让错误彻底沉没”，而不是“所有错误都拖到最后再处理”。

## 常见实践

+ 同步代码用 `try...catch` 捕获运行时错误
+ 主动抛错时优先抛 `Error` 对象，而不是字符串
+ `catch` 只处理当前层真正理解的错误
+ 需要收尾时使用 `finally`
+ Promise 错误要么 `.catch()`，要么在 `async` 函数里用 `try...catch`
+ 对未处理错误设置全局监控边界

## 总结

JavaScript 错误处理最大的特点，不是 `try...catch` 本身，而是同步和异步路径并不共享同一套传播机制。同步代码中的错误通常沿调用栈传播，而异步代码中的错误更可能包在回调、Promise 或任务边界里。理解这一点之后，JavaScript 的错误处理就不再只是“怎么抓住异常”，而是“在哪个执行上下文里处理异常”。
