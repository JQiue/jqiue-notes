---
title: 函数
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

使用`function`关键字声明函数，然后通过函数名调用

```js
function foo() {}
foo(); 
```

由于定义的函数是被看作全局对象`window`的方法，所以也支持这种调用方式：

```js
function foo() {}
window.foo();
window['foo'];
```

::: danger
至少在浏览器环境中是这样的，但是在其他环境中不一定
:::

函数能够嵌套定义，但是内部函数必须在嵌套它的函数作用域中调用，除非使用闭包

```js
function foo() {
  function bar() {}
  bar(); // 正确
}
bar(); // ReferenceError
```

## 局部变量和外部变量

在函数中声明的变量只在该函数内部可见

```js
function foo() {
  let a = 'a';
  console.log(a);
}
console.log(a); // undefined;
```

函数对定义在外部的变量拥有全部的访问权限

```js
let a = 'a';
function foo() { console.log(a); }
console.log(a); // 'a'
```

::: tip
任何声明在函数外部的变量都被称为全局变量，可被任意函数所访问，除非被局部变量覆盖
:::

当一个函数内部中的变量和外部变量重名，那么会优先使用局部变量

```js
let a = 'a';
function foo() {
  let a = 'aa';
  console.log(a); // aa
}
console.log(a); // a
```

## 参数

可定义参数将任意数据传递给函数

```js
function foo(a) {
  console.log(a); // a
}
foo('a'); 
```

如果没有提供参数，那么定义的参数默认值为`undefined`

```js
function foo(a) {
  console.log(a); // undefined
}
foo();
```

也可以在定义参数的同时指定默认值，当没有传入数据时，就会为该参数赋予默认值

```js
function foo(a = 'a') {
  console.log(a); // 'a'
}
foo();
```

## 返回值

`return`可以出现在函数中任意位置，后面跟上返回值，甚至不带返回值也是可以的

```js
function foo() {
  return;
}
```

::: tip
空值`return`或没有`return`语句的函数返回值均为`undefined`
:::

另外，不要在`return`与返回值之间添加新的一行，这导致 JavaScript 在`return`后面直接加了`;`，不会返回后面的表达式结果

```js
function foo() {
  return
    1 + 2 + 3
}
console.log(foo()); // undefined

/* 实际上它是这样的 */

// function foo() {
//   return;
//     1 + 2 + 3
// }
```

## arguments

`arguments`是每个函数都有的属性，它是一个类数组的对象，包含传入函数中的所有参数，这是过去的一种获取所有参数的唯一办法，至今仍然有效

## 函数表达式

函数在 JavaScript 中不是“语言结构”，而是一种特殊的值，还有一种创建函数的语法叫做**函数表达式**

```js
let foo = function() {};
foo();
```

函数像值一样被赋值给变量，为什么函数后面会有一个分号，因为这里它被看作一个表达式，只是一个特殊值而已，如果只写`foo`是不会调用函数的，只会返回函数的引用，所以需要`foo()`调用

下面这种写法也是 OK 的，看起来就像变量存储了函数，函数可以被当作值一样传递

```js
function foo() {}
let fc = foo;
fc();
```

::: tip 作为值的函数
既然函数也是引用类型，它的引用也可以被传递，访问不带`()`的函数名即可
:::

另外这种写法也没什么区别，仍然是一个函数表达式，即使增加了`func`。它也会成为表达式的一部分，但是它允许函数内部引用自己

```js
let foo = func() {};
```

::: tip 声明函数和函数表达式的区别
声明函数可以无视定义的顺序调用，因为它会被解释器提前，而函数表达式只能在定义后调用，这不难理解，因为函数表达式只有赋值给变量后才能被引用。如果不是特殊用途不推荐使用函数表达式，因为阅读性较差，且定义更为繁琐
:::

### 立即调用的函数表达式

如果在定义一个函数的同时调用这个函数，就会实现立即自执行函数的方式，为什么使用匿名函数而不是具名函数呢？因为在这种调用方式下函数有无标识都没有关系，不影响程序的执行，于是出现了下面的写法

```js
let foo = function () {}();
(function () {})();
(function () {}());
+function () {}();
-function () {}();
void function () {}();
new function () {}();

function () {}() // 抛出语法错误
```

为什么`function () {}()`抛出错误，是因为解释器会将它视为一个缺标识的函数声明。而上面的匿名函数都会被看作一个表达式执行，仔细观察发现都是加一些额外的操作符让解释器将函数视为一个表达式，而不是函数声明，因此绕过了语法检查，这就是匿名自执行函数的本质，更准确的说法是“**立即调用的函数表达式**”

::: danger
在立即调用的函数表达式前后一定要加分号，否则可能会报`{(intermediate value)} is not a function`错误
:::

这种函数有一个封闭的作用域范围，定义在其中的变量随着函数的调用创建，而它是立即执行的函数，调用完成后即销毁。因此可以封装一些变量和函数，由于外部无法引用内部的变量，就能避免和全局对象的冲突。如果想要扩大作用域，可以为函数定义一个参数，将外部的定义的对象作为参数传入，并将内部的变量和函数绑定到对象上，即可实现全局变量和函数，jQuery 就是这么做的：

```js
(function (window, undefined) {
  // jQuery 逻辑实现
})(window);
```

## 箭头函数

创建函数还有一种非常简单的语法，这种方式比函数表达式更好，它被称为**箭头函数**

```js
let foo = () => {};
```

它是下面的简单版本

```js
let foo = function () {};
```

箭头函数可以更简洁，当参数只有一个时，`()`可以省略，但没有参数的时候必须保留

```js
let double = n => { n * 2 };
console.log(double(2)); // 4
```

如果`{}`只有一行语句，也可以省略掉

```js
let double = n => n * 2
console.log(double(2)); // 4
```

除此之外还有其他有趣的特性：

1. 没有`this`，访问到的`this`来自外部的普通函数
2. 没有`arguments`，访问到的`arguments`来自外部的普通函数
3. 不能作为构造器使用`new`调用，这是因为不具有`this`

## 回调函数

既然函数可以传递，就产生了下面的写法

```js
function foo(callback) {
  callback();
}
function bar() {}
foo(bar);
```

从这里看来，`bar`被当作参数传递给`foo`，在`foo`中被调用，因此`bar`被称为**回调函数**

回调函数的主要思想就是通过传递一个函数，且期望在稍后时将其进行回调

## 闭包函数

将一个函数作为返回值的函数就是闭包函数，它的目的是变相的扩大了局部变量的作用域，这导致在任何地方调用该函数都可以访问该作用域中的变量，下面这个例子中`str`本质是一个局部变量，而`bar`被`foo`当作返回值在外部调用，却仍能够访问`str`，但实际上不应该再访问到`str`，这就是闭包函数的作用

```js
function foo() {
  let str = 'abc';
  function bar() { console.log(str); }
  return bar;
}

foo()(); // 'abc'

console.log(str); // undefined
```

闭包的核心就是无论在何处调用该函数，仍能访问声明它所处于环境中的变量，而这个变量是无法被其他程序访问到的

如果过度的使用闭包，会有内存泄露的风险，所以最好及时的释放掉

## 函数也是对象

在 JavaScript 中函数本身也是一个对象，因为函数也可以作为一个值传递，必然属于某种类型。函数是一个可被调用的对象，不仅可以调用，也可以当作对象来处理，进行属性操作，以及引用传递等

作为对象就应该有自己的一些属性：

+ `name`：函数的名字，如果没有声明名字，则会根据上下文推测一个
+ `length`：返回函数入参的个数，但是 rest 参数不参与计数

```js
function foo() {};
let bar = function () {};
let arr = [function () {}];

console.log(foo.name); // 'foo'
console.log(bar.name); // 'name'

console.log(arr[0].name); // ''
```

::: tip
如果直接在一个数组中声明函数，那么该函数的`name`是无法推断的
:::

## Function 构造器

JavaScript 也提供了另一种创建函数的方法，只不过很少使用，提供了`Function`构造器来创建一个函数：`let func_name = new Function(arg1, arg2, ..., func_body)`，在这个形式中，每个参数都是字符串，而参数列表是可以省略的

```js
let func = new Function('a', 'b', 'return a + b');
console.log(func(1, 2)); // 3
```

与其他的方法相比，它是通过字符串创建的，允许将字符串变为函数，这种应用场景只有比较复杂的地方可以用到：从服务器种获得代码并编译成函数运行

::: tip 闭包
通常闭包指向创建函数时自身所处于的环境，但是使用`new Function()`创建的函数却指向全局环境
:::

## 生成器函数

通常情况下，函数只会返回一个单一的值，但是 Generator 函数可以按需返回一个接一个的值，要创建 Generator 需要一个特殊的语法结构：`function *`

```js
function* generateSeq() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generateSeq();
```

此函数被调用时，不会运行函数中的代码，而是返回一个特殊的”Generator“对象，用来管理执行流程，这个对象的主要方法就是`next()`，当被调用时，就会执行最近的`yield value`语句，然后暂停执行，将生产出的值返回出去，产出的结果是具有两个属性的对象：

1. `value`：产出值
2. `done`：如果执行完成则返回`true`，否则为`false`

```js
function* generateSeq() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generateSeq();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: true }
console.log(generator.next()); // { value: undefined, done: true } 
```

一旦产出完成，继续调用`next()`已经没有了意义

另外生成器对象是可以被`for...of`迭代的，因为它具有`next()`方法

```js
function* generateSeq() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(const value of generator) {
  console.log(value); // 1，2，3
}
```

注意，如果最后一个值使用的`return`返回，它将产出`done: true`，`for...of`会检查并忽略掉`value`，所以最好全部使用`yield`返回

由于它是可迭代的，spread 语法对它同样适用

```js
function* generateSeq() {
  yield 1;
  yield 2;
  yield 3;
}

let arr = [0, ...generateSeq()];
console.log(arr); // [0, 1, 2, 3]
```

除此之外`yield`还可以加个`*`表示委托给另一个”generator“或可迭代对象（字符串、数组等）

```js
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}

let generator = g2();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: 4, done: false }
console.log(generator.next()); // { value: 5, done: false }
```

这种感觉就像将`g1`里的语句写在`g2`里面一样

`yield`会使生成器函数暂停执行，并将后面的表达式结果返回，直到`next()`方法被再次调用，如果将参数传递给`next()`，该值会成为当前`yield`操作的返回值

```js
function* g() {
  let result = yield 2;
  console.log(result); // 2
}

let generator = g();

generator.next();
generator.next(2);
```

第一次调用`next()`时应不带参数，即使带了也会被忽略，此时开始执行`yield`后面的表达式并返回结果，然后执行就暂停了，当第二次调用`next()`时，开始恢复执行

与常规函数不同的是，生成器函数可以通过`yield/next`互相交换结果

## 装饰器

装饰器是一种特殊的函数，用于接受一个函数并改变它的行为，简而言之，可以为任何函数进行一些功能上的装饰

这是一个缓存函数结果的装饰器实现：

```js
function foo(x) {
    console.log('Called with ', x);
    return x;
}

function Decorator(func) {
    let cache = new Map();
    return function (x) {
        if(cache.has(x)){
            return cache.get(x); // 直接返回缓存中的结果
        }
        let result = func(x); // 调用被装饰的函数
        cache.set(x, result); // 缓存结果
        return result;
    }
}

foo = Decorator(foo);

foo(1); // 第一次会调用被装饰的函数
foo(1); // 因为结果被缓存，所以这一次被装饰的函数不会被调用
foo(2); // 是一个新的结果，被装饰的函数将会被调用
foo(2); // 结果被缓存，并不会调用被装饰的函数
```

## 重新指定 this

函数本质上是由某个对象执行的，如果脱离的执行上下文，就会产生丢失问题，即可能产生没有定义该方法的调用错误

```js
let user = {
  something() {
    return 1;
  },
  foo(x) {
    console.log('Called with', x);
    return x * this.something(); // TypeError: this.something is not a function
  }
}

const func = user.foo;

func(); // 实际上是由全局对象 window 调用，this 指向 window
```

对象的方法在传递的过程中就会发生`this`指向丢失问题，为了解决这个问题，可以使用属于函数上的原型方法来绑定`this`：

+ `Function.prototype.call(ctx, arg1, arg2, ...)`
+ `Function.prototype.apply(ctx, [arg1, arg2, ...])`
+ `Function.prototype.bind(ctx, arg1, arg2, ...)`

`call()`方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数，该方法的语法和作用与`apply()`方法类似，只有一个区别，就是`call()`方法接受的是一个参数列表，而`apply()`接受的是一个包含多个参数的数组，在转发`this`时会立即调用

```js
let user = {
  something() {
    return 1;
  },
  foo(x) {
    console.log('Called with', x); Called with  1
    return x * this.something(); 
  }
}

const func = user.foo;

/* 三种解决方案 */
func.call(user, 1);
func.apply(user, [1]);
func.bind(user, 1)();
```

`bind()`用于返回原方法的拷贝，并拥有指定的`this`值和参数，但是不会被调用

在调用返回后的函数，仍然为其可以传入参数，将会排在被指定的参数后面

```js
function foo(x, ...args) {
  console.log(x, args);  // 1 [ 2, 3, 4 ]
}

foo.bind(this, 1)(2, 3, 4);
```

`bind()`可以有很多用处：

+ 偏函数
+ 柯里化

## 函数的柯里化

柯里化就是将接收多个参数的函数变成接受单一参数的函数，并且返回接受剩下的参数而且返回结果的新函数的技术

```js
// 普通函数
function add(a, b) {
  return a + b;
}

// 柯里化
function curryingAdd(a) {
  return function (b) {
    return a + b;
  }
}

add(1, 2); // 3
curryingAdd(1)(2); // 3
```

费这么大一圈干什么呢？当然有如下的好处：

+ 参数复用
+ 提前确认
+ 延迟运行

<!-- to be updated -->

## 总结

+ 函数支持声明的同时指定参数的默认值，支持指定参数传值
+ `arguments`是个类数组对象，包含传入函数的所有参数，是一种过去获取所有参数的办法
+ 函数表达式只能在定义后调用，只要将函数视为表达式，就可以立即调用
+ 箭头函数是一种简化的函数写法，没有`this`，`arguments`，不能作为构造器
+ 回调函数的主要思想就是通过传递一个函数，且期望在稍后时将其进行回调
+ 闭包函数就是将一个函数作为返回值，并且能够在外部调用的时候访问内部定义的变量，使用闭包会有内存泄漏的风险
+ 函数也是对象，具有`name`和`length`属性
+ `new Function()`是另一种创建函数的方法
+ 生成器是用来创建迭代算法的函数，使用`function*`创建，被调用时不会执行任何代码，而是返回一个迭代器对象，使用`next()`方法来执行内部的语句，直到遇到`yield value`关键字时才会停止执行，并将`value`返回，然后等待调用下一次`next()`，生成器函数可以使用`for...of`进行迭代，生成器函数中最好不要使用`return`来返回值，spread 语法同样可以扩展它
+ 装饰器在不改变原有函数的功能上去添加一些额外的功能
+ 函数本质上是由某个对象执行的，如果脱离的执行上下文，可能会产生丢失问题，需要使用`call()`，`apply)(`，`bind()`解决
