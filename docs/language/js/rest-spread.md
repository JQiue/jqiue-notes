---
title: Rest 和 Spread
category: 编程语言
tags: [JavaScript, Alpha]
author: JQiue
article: false
---

在 JavaScript 中，无论函数定义了多少个参数，都可以传入任意数量的参数，且不会报错，但是只有部分参数被当作值传递，为了解决这个问题，JavaScript 支持`...`语法来将剩余的参数收集到数组中

```js
function sum (...args) {
  let result = 0;
  for (let value of args) result += value;
  return result;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

::: danger
`...`的参数必须位于函数参数列表最末尾处
:::

`...`语法还可以在调用的时候拆包一个可迭代对象用来传值

```js
function sum (...args) {
  let result = 0;
  for (let value of args) result += value;
  return result;
}

let args1 = [1, 2, 3];
let args2 = [1, 2, 3, 4, 5];

console.log(sum(...args1)); // 6
console.log(sum(...args2)); // 15
```

不仅如此，`...`也可以跟普通值混用

```js
let args = [3, 5];
console.log(sum(1, 2, ...args, 4)); // 15
```

同时展开多个可迭代对象

```js
let args1 = [1, 2, 3];
let args2 = [1, 2, 3, 4, 5];
console.log(sum(...args1, ...args2)); // 21
```

在数组中展开

```js
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
let merge = [...arr, ...arr2];
console.log(merge); // [1, 2, 3, 4, 5, 6]
```

将字符串展开为字符数组

```js
let str = 'wjqis.me';
let strArr = [...str];
console.log(strArr); // ['w', 'j', 'q', 'i', 's', '.', 'm', 'e']
```

展开对象，看来像拷贝了对象，其实是一种浅拷贝

```js
let foo = { name: 'foo', age: 23 };
let fooCopy = { ...foo };
console.log(fooCopy); // { name: 'foo', age: 23 }
```

+ 当`...`出现在定义函数参数的列表时，它就是 rest 参数
+ 当`...`出现在表达式中，它就是 spread 语法
