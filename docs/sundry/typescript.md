---
title: TypeScript
category: 编程语言
author: JQiue
---

JavaScript 可以实现移动终端到后端服务，从物联网到神经网络，几乎无处不在，这么广阔的应用领域，自然对语言的安全性、健壮性和可维护性有着更高的要求。即使 ECMAScript 在不断的发展，但在类型检查方面依然毫无建树，调用别人的没有写注释的函数，为了搞清楚参数类型，不得已翻看函数内部，维护一个重要的底层类库，优化了一个参数类型，但是不知道有多少处引用，提交代码时背脊发量等等，这都因为 JavaScript 是一门动态弱类型语言

为了搞定这些问题，Facebook 在 2014 年推出了 Flow，微软推出了 TypeScript，都致力于 JavaScript 的静态类型检查，如今显然 TypeScript 发展的更好，大量的框架和库都在使用 TypeScript 重构，在 ECMAScript 推出类型检查之前，TypeScript 是目前最好的解决方案

TypeScript（以下简称 ts）是一种开源的渐进式包含类型的 JavaScript 超集，目的是为了增强 JavaScript 的能力使应用扩展更加容易，主要功能之一是为 JavaScript 变量提供了类型支持，实现了静态检查，更容易重构代码和寻找 BUG，这些都是在编译期中实现的，将问题扼杀于摇篮之中，比如`[] == ''`，ts 能够在这种不清不明的地方摆脱出来，ts 最后依然会被编译成标准的 JavaScript 运行在任何地方

::: tip 类型体操
在使用类型表达复杂逻辑时，往往需要一些特殊的写法才能利用类型系统的特点，或者遇到类型系统的限制，需要使用特殊的写法规避，这种写法就像体操运动有技术得分点一样，一定要把动作做到位才能得分，因此编写复杂类型被戏称为类型体操
:::

## Hello World

先安装编译器，自带的`tsc`编译命令无法运行程序，所以需要额外的安装`ts-node`以便于运行

```sh
npm install -g typescript ts-node
```

编译`.ts`文件：

```sh
tsc Test.ts
```

之后就可以运行生成的`.js`文件，如果嫌手动编译麻烦，可以添加`--watch/-W`参数监听文件的改变，以自动编译

此外，还可以通过命令`tsc --init`生成`tsconfig.json`来控制编译过程

## 原始数据类型

ts 使用`:TypeAnnotation`语法来为变量，函数参数以及函数返回值添加类型注解，相当于强类型语言中的类型声明

```ts
// 原始类型
const num: number = 123;
const str: string = '123';
const bool: boolean = true;
```

`null/undefined`是所有类型的子类型，可以赋值给其他类型，`undefined/null`最大的价值就是体现在接口类型上，表示一个可缺省、未定义的属性或表示对象或属性可能是空值，`undefined`可以赋值给`void`类型，但反过来不行

```ts
let un: undefined = undefined;
let nu: null = null;
let vod: void = undefined;
```

## 任意值和未知类型

ts 还提供`any`类型，可以选择性的绕过静态检查的方法，如果没有指定一个变量的类型，默认就是`any`。声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

`any`类型会在对象的调用链中进行传导，所有`any`类型的对象的任意属性都是`any`类型

`unknown`是用来描述类型并不确定的变量，可以将任意类型的值赋值给`unknown`变量，但`unknown`类型的值只能赋值给`unknown`和`any`，和`any`一样是一种顶级类型

## 数组和元组

在 ts 中，为数组定义类型，数组就只能存储该类型的元素，使用后缀`:type[]`或`:Array<type>`定义

```ts
// 数组
let arr1: string[] = [1, 2, 3];
// 泛型定义
let arr2: Array<number> = [1, 2, 3];
```

还可使用接口，一般不会这么做，只会用来表示类数组

```ts
interface ArrayLikeObject {
  [index: number]: number;
  length: number;
  callee: Function;
}

function foo() {
  let args1: [] = arguments; // Error
  let args2: ArrayLikeObject = arguments; // Correct
}
```

当确定了数组类型以及元素类型时，即可创建一个元组，允许不同类型的元素

```ts
// 元组
let zs: [string, number] = ['zs', 23];
```

## void 和 never

`void`表示没有任何类型，和`any`是相反的，只是表示一个没有返回值的函数，声明一个`void`类型的变量没有意义，它的值只能为`undefined/null`

```ts
let noReturn = () => {};
```

`never`表示永远不会有返回值的类型，`never`是所有类型的子类型，可以为所有类型赋值，但反过来不可以。`void`只是表示返回值为空，而`never`则表示函数永远没有返回值

```ts
let error = () => {
  throw new Error('error');
};

let endless = () => {
  while(true) {}
}
```

## 枚举

`enum`关键字可用于定义枚举类型，如果指定成员的初始值，则从`0`开始递增，枚举成员的值是无法被修改的

```ts
enum Role {
  foo,
  bar,
  qux
}

console.log(Role.foo); // 0
console.log(Role.bar); // 1
console.log(Role.qux); // 2

// 字符串枚举
enum Msg {
  Success = '成功',
  Fail = '失败'
}

// 异构枚举，数字和字符串混合
enum Answer {
  Y,
  N = 'No'
}

// 单独作为一种类型注释
enum E {a, b};
let e1: E = 10;
```

## 对象类型

`object`的定义则稍微复杂

```ts
// 前者无法修改属性
let obj1: object = { a: 1, b: 2 };
let obj2: {a: number, y: number } = { a: 1, b: 2 };
```

## 类型推断

如果没有指定类型，ts 会按照一定规则去推断出一个类型

```ts
// 已经推断出是字符串类型
let foo = 'foo';
foo  = 1; // Error
```

如果在定义时没有初始化，之后不管有没有赋值都会被推断为`any`

## 断言

类型断言的操作对象必须满足某些约束关系，否则会得到 2352 的错误，类型断言就像“指鹿为马”一样，但仍然不够准确来形容“鹿”一定是“马”，“白马”和“黑马”才是“马”，对于 ts 类型断言的约束条件就是类型之间可以使用类型断言进行转换

```ts
值 as 类型
// or
<类型>值
```

由于第二种语法可能与泛型冲突，所以最好使用第一种

常用的断言场景：

+ 将一个联合类型断言为其中一个类型
+ 将一个父类断言为更加具体的子类
+ 将任何一个类型断言为 any
+ 将 any 断言为一个具体的类型

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

也可以在值后面添加`!`用来排除`null/undefined`

断言并不是类型转换，不会真的影响到变量的类型

## 联合类型

一般情况下，使用联合类型是因为不能确定变量最终值的类型，通过`|`运算符指定变量可以被赋值的类型范围

```ts
let foo: number | string | boolean;
foo = 1;
foo = '1';
foo = true;
```

当 ts 不确定联合类型的变量是哪个类型的时候，只能访问此联合类型中所有类型的共有属性和方法

```ts
// 这里发生了类型保护：不确定类型有没有 length 属性
function foo(something: string | number) {
  console.log(something.length);
}

// string 和 number 都具有 toString 方法
function foo(something: string | number) {
  console.log(something.toString());
}
```

ts 会推断联合类型变量被赋值时的类型，这意味着：

```ts
let foo: string | number;

foo = "foo";
console.log(foo.length); // Correct
foo = 7;
console.log(foo.length);  // Error，已被推断成 number
```

## 交叉类型

交叉类型既将多个类型合并成一个类型，产生类型叠加，使该类型包含所有类型的特性

```ts
interface Person {
  name: string,
  age: number
}

interface Worker {
  job: string,
}

const jinqiu: Person & Worker = {
  name: 'jinqiu',
  age: 18,
  job: '搬砖'
}
```

## 接口

ts 也有接口的概念，它被用来校验数据类型是否符合要求，多一些和少一些都是不被允许的，所以赋值的时候，对象的形状必须和接口的形状保持一致

```ts
interface Person {
  name: string;
  age: number;
}

// Correct
let foo: Person =  {
  name: 'Foo',
  age: 18
}

// Error
let bar: Person = {
  name: 'Bar'
}

// Error
let qux: Person = {
  name: 'Qux',
  age: 20,
  gender: '男'
}
```

不想完全匹配一个形状可以使用可选属性，使用`?:`

```ts
interface Person { 
  name: string;
  age?: number;
}

let foo: Person =  {
  name: 'Foo'
}
```

也可以定义任意属性，用来允许未知的属性

```ts
interface Person {
  name: string;
  age?: number;
  [prop: string]: any;
}

let foo: Person = {
  name: "",
  age: 0,
  gender: "男"
};
```

::: danger
如果定义了任意属性，已经确定的属性类型和可选的属性类型必须是任意属性类型的子类型
:::

一个接口中只能定义一个任意属性，但是其他属性必须是任意属性类型的子集，所以任意属性可以使用联合类型，如果同时存在任意属性、可选属性，那么任意属性的数据类型要带`undefined`

只读属性在对象创建后不可修改，使用`readonly`定义，必须第一次给对象赋值

```ts
interface Person {
  name: string;
  readonly age: number;
}

let foo:Person = {
  name: 'foo',
  age: 18
}

foo.age = 19; // Error
```

## 函数

ts 也可以约束函数的输入和输出，多余和少于的参数都是不被允许的

```ts
let sum: (x:number, y:number) => number;

function sumFC (x:number, y:number): number{
  return x + y;
}

sum = sumFC;
```

::: tip
不要混淆定义函数的`=>`和箭头函数中的`=>`
:::

也可以使用接口也可以定义函数的形状

```ts
interface SumFc {
  (x: number, y: number): number;
}
let sum: SumFc;
```

可选参数可以用来打破多余或少于的参数，可选参数必须在最后面

```ts
function foo(id: number, name: string, age?:number) {}
```

默认参数会被识别成可选参数，这意味着不用放在最后面的限制了

```ts
function foo(id: number, name: string = 'bar', age: number) {}
```

ts 的函数具有重载的能力，即可以声明多个同名，但参数类型不同的函数，在调用时会自动给根据参数类型匹配对应的函数

```ts
function add() {}
```

## 类型别名

可以使用`type`为类型定义一个别名

```ts
type Message = string | string[];
let msg: Message;
```

也可以定义基础类型的取值范围，本质上是将一个联合类型赋予别名

```ts
type name = 'foo' | 'bar' | 'qux'
```

## 类

在 ts 中，可以使用三种修饰符来控制属性或方法的访问权限：

+ `public` - 可以被任何人访问，默认的
+ `protected` - 不能在类外部访问，但允许子类访问
+ `private` - 不能在类外部访问，子类也不允许访问

当构造函数修饰为`private`时，该类不允许被继承或者实例化，当构造函数修饰为`protected`时，该类只允许被继承

`get`和`set`关键字都可以对变量进行封装保护，虽然它们看起来像定义一个方法

```ts
class Person {
  private _name: string;
  constructor(name: string) {
    return  this._name;
  }
  // 利用函数重载的方式
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

const foo = new Person('foo');
console.log(foo.name);  // 不需要加 ()
foo.name = 'fooo'
```

可以使用`abstract`关键字定义一个抽象类，抽象类不允许实例化，只能被子类继承，子类必须实现

```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  // 抽象方法，必须子类实现
  public abstract run();
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom');
```

接口不仅可以定义对象的形状，还可以抽离类的共有特性，并被类所实现

```ts
interface Person {
  say(): void;
}

class student implements Person {
  say() {}
}
```

一个类可以实现多个接口

```ts
interface Person {
  say(): void;
}

interface Student {
  goToSchool(): void;
}

class student implements Person, Student {
  say() {}
  goToSchool() {}
}
```

接口也可以继承接口，使接口更加抽象

```ts
interface Person {
  name: string;
}

interface Student extends Person {
  age: number;
}

interface Teacher extends Person {
  age: number;
}
```

## 泛型

泛型即对类型变量的一个别称，由于目前不确定类型，那么为类型声明一个变量是可行的。`T`是对类型声明一个变量，在使用的时候指定该类型，进行泛型擦除操作

```ts
function foo<T>(param: T): T {
  return param;
}
```

编译会自动知道参数类型，也可以手动指定

```ts
function foo<T>(param: T): T {
  return param;
}

foo('2');
foo<number>(1);
```

可以同时指定多个泛型

```ts
function add<T, P>(first: T, second: P): T {
  return first + second;
}

foo<number, number>(1, 2);
```

也可以使用在类上

```ts
class Foo<T> {}

new Foo<string>();
```

可以使用在接口上

```ts
interface {}
```

泛型可以被约束，只允许传入包含`length`属性的变量

```ts
function foo<T extends { length: number }>(args: T):T {
  console.log(args.length);
  return args;
}
```

泛型可以指定约束的范围只允许传入该类型，非常灵活

```ts
// 要么是 number，要么是 string
class Foo<T extends number | string> {}

new Foo<string>();
```

ts 中的`keyof`操作符可以将一个类型映射为它所有成员名称的联合类型，通常结合泛型使用

```ts
interface Person {
  name: string;
  age: number;
  gender: string;
}

class Student {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]
  }
}
```

## 装饰器

装饰器本质上是一个函数，可以装饰类、方法、访问器、属性和参数

```ts
function decorator(target: any) {}

@decorator
class Foo() {}
```

装饰器会在程序运行的时候就调用一次

也可以这样定义装饰器

```ts
function decorator(flag: boolean) {
  if(falg) {
    return function (target: any) {}
  } else {
    return function (target: any) {}
  }
}

@decorator(false)
class Foo() {}
```

## 类型声明文件

当使用第三方库时，需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

比如 jQuery，在 ts 中并不知道`$`和`jQuery`是什么东西，使用时会报错，所以需要使用`declare var`来定义它的类型：

```ts
declare var $: (selector: string) => any;
declare var $: (readyFunc: () => void) => any;
```

并没有声明变量，只是定义了全局变量`jQuery`的类型

除了`declare var`以外，还有很多其他声明语句：

+ `declare function`声明全局方法
+ `declare class`声明全局类
+ `declare enum`声明全局枚举类型
+ `declare namespace`声明（含有子属性的）全局对象
+ `interface`和`type`声明全局类型
+ `export`导出变量
+ `export default` ES6 默认导出
+ `export =`CommonJS 导出模块
+ `export asnamespace`UMD 库声明全局变量
+ `declare global`扩展全局变量
+ `declare module`扩展模块
+ `/// <reference />`三斜线指令

通常会将声明语句放到一个单独的文件`xxx.d.ts`中，必须以`.d.ts`为后缀，ts 会解析该后缀文件，在其它文件中就可以使用该类型定义了

对于类型声明文件，有一个`@types`用来管理所有第三方库的声明文件，只需要安装对应的声明模块即可，比如`@types/jquery`，同时在这个[页面](https://www.typescriptlang.org/dt/search?search=)可以搜索想要的声明模块

JavaScript 中的内置对象已经在 ts 中定义好了类型，但 Node.js 不是内置对象的一部分，需要引入`@types/node`

## 命名空间

在 JavaScript 中通常使用闭包等方式来避免变量泄露给全局空间，因此 ts 提供了`namespace`关键字来描述，只有被`export`声明的才会暴露

```ts
// 只暴露 Page
namespace Home {
  class Footer {}
  class Content {}
  class Header {}
  export class Page {
    constructor () {
      new Footer();
      new Content();
      new Header();
    }
  }
}

new Homp.page();

new Footer(); // Error
```

如果出现命名空间文件不在一个文件的方式，可以添加引用标记

`component.ts`：

```ts
namespace Components {
  class Footer {}
  class Content {}
  class Header {}
}
```

`page.ts`:

```ts
///<reference path="./components.ts" />
namespace Home {
  export class Page {
    constructor () {
      new Components.Footer();
      new Components.Content();
      new Components.Header();
    }
  }
}
```

也支持接口：

```ts
namespace User {
  export interface Foo {
    name: string
  }
}

const user: User.foo = { name: foo };
```

也支持嵌套：

```ts
namespace Father {
  export namespace Son {}
}
```