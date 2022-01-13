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

TypeScript（以下简称 TS）是一种开源的渐进式包含类型的 JavaScript 超集，由微软创建并维护，目的是为了增强 JavaScript 的能力使应用扩展更加容易，主要功能之一是为 JavaScript 变量提供了类型支持，实现了静态检查，更容易重构代码和寻找 BUG，这些都是在编译期中实现的，将问题扼杀于摇篮之中，比如`[] == ''`，TypeScript 能够在这种不清不明的地方摆脱出来，TS 最后依然会被编译成 JavaScript

## Hello World

先安装编译器，自带的`tsc`编译命令无法允许程序，所以需要额外的安装`ts-node`以便于运行

```sh
npm install -g typescript
npm install -g ts-node
```

编译`.ts`文件：

```sh
tsc Test.ts
```

之后就可以运行生成的`.js`文件，如果嫌手动执行麻烦，可以添加`--watch`参数监听文件的改变，以自动编译

此外，还可以通过`tsconfig.json`来控制编译过程，用命令`tsc --init`即可生成

## 类型系统

JavaScript 无法检测是否按照约定的类型对变量进行复制，而 ts 的类型系统很好的解决了这一点，编译时会检查值是否符合，否则就会报错错误

ts 使用`:TypeAnnotation`语法来为变量，函数参数以及函数返回值添加类型注解

像一些 JavaScript 原始类型正好适用于 ts 的类型系统：`string`、`number`、`boolean`

```ts
const num: number = 123;

function foo(num:number):number {
  return num;
}
```

::: tip
ts 的类型是可选的
:::

在 ts 中，数组也可以定义类型，这样数组只能存储该类型的元素，而数组则是由 ts 提供了专门的类型语法，使用后缀`:type[]`

```ts
let names: string[] = [];

names.push('foo');
names.push('bar');

console.log(names); // ['foo', 'bar']

names.push(123); // Error
```

有时候，数组可以被 ts 当作成元组，当确定了数组类型以及类型时，元组允许不同类型的元素

```ts
let zs: [string, number];
zs = ['zs', 23];
console.log(zs); // [ 'zs', 23 ]
```

ts 还提供`any`类型，选择性的绕过静态检查的方法，ts 无法检测该类型的变量是否存在以及类型正确，`any`类型会在对象的调用链中进行传导，所有的`any`类型对象的任意属性都是`any`类型，`any`类型无法提供静态检查，如果没有充足的理由，否则不建议使用

`unknown`是用来描述类型并不确定的变量，可以将任意类型的值赋值给`unknown`变量，但`unknown`类型的值只能赋值给`unknown`和`any`

`void`表示没有返回值的函数

`undefined/null`都是十分鸡肋的类型，和 JavaScript 中的效果是一样的，`undefined`最大的价值就是体现在接口类型上，表示一个可缺省、未定义的属性，`undefined`可以赋值给`void`类型，但反过来不行。`null`主要体现在接口指定上，表示对象或属性可能是空值

`never`表示永远不会发生值的类型，`never`是所有类型的子类型，可以为所有类型赋值，但反过来不可以

+ object

ts 无法做到绝对智能的类型检测，在某些情况下它是无法区分的

```ts
let arr: number[] = [1, 2, 3, 4]
let than2: number = arr.find(num => num > 2); // error TS2322: Type 'number | undefined' is not assignable to type 'number'.
```

对于这种情况可以使用`as`语法做类型断言

```ts
let arr: number[] = [1, 2, 3, 4]
let than2: number = arr.find(num => num > 2) as number; // ok
```

也可以使用`<type>`形式

```ts
let arr: number[] = [1, 2, 3, 4]
let than2: number = <number> arr.find(num => num > 2); // ok
```

::: tip 类型断言
类型断言的操作对象必须满足某些约束关系，否则会得到 2352 的错误，类型断言就像“指鹿为马”一样，但仍然不够准确来形容“鹿”一定是“马”，“白马”和“黑马”才是“马”，对于 ts 类型断言的约束条件就是类型之间可以使用类型断言进行转换 
:::

“字面量 + as const”语法结构可以进行常量断言

也可以在值后面添加`!`用来排除`null/undefined`

## 接口

## 泛型

<!-- more -->
