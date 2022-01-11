---
title: TypeScript 是怎么做类型体操的
category: 编程语言
author: JQiue
article: false
---

::: info 前置知识

+ JavaScript
:::

::: tip 类型体操
在使用类型表达复杂逻辑时，往往需要一些特殊的写法才能利用类型系统的特点，或者遇到类型系统的限制，需要使用特殊的写法规避，这种写法就像体操运动有技术得分点一样，一定要把动作做到位才能得分，因此编写复杂类型被戏称为类型体操
:::

TypeScript（以下简称 TS）是一种开源的渐进式包含类型的 JavaScript 超集，由微软创建并维护，目的是为了增强 JavaScript 的能力使应用扩展更加容易，主要功能之一是为 JavaScript 变量提供了类型支持，实现了静态检查，更容易重构代码和寻找 BUG，这些都是在编译期中实现的，将问题扼杀于摇篮之中，TS 最后依然会被编译成 JavaScript

## 来做体操吧

先安装编译器，自带的`tsc`编译命令无法允许程序，所以需要额外的安装`ts-node`以便于运行

```sh
npm install -g typescript
npm install -g ts-node
```

编译`.ts`文件：

```sh
tsc Test.ts
```

## 类型系统

ts 使用`:TypeAnnotation`语法来为变量，函数参数以及函数返回值添加类型注解

```ts
const num: number = 123;
function foo(num:number):number {
  return num;
}
```

::: tip
ts 的类型是可选的
:::

编译时会检查值是否符合，否则就会报错错误

像一些 JavaScript 原始类型正好适用于 ts 的类型系统：`string`、`number`、`boolean`

而数组则是由 ts 提供了专门的类型语法，使用后缀`:type[]`

```ts
let names: string[] = [];

names.push('foo');
names.push('bar');

console.log(names); 

names.push(123); // Error
```

## 接口

## 泛型

<!-- more -->
