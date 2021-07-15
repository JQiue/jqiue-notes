---
title: 函数
category: 编程语言
tag: JavaScript
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

函数能够嵌套定义，但是内部函数必须在嵌套它的函数作用域中调用

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
function foo() {
  console.log(a);
}
console.log(a);
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

最新的 JavaScript 语法还支持指定参数传值，不过为了兼容性，应该少使用

```js
function foo(a, b = 'b') {
  console.log(a); // 'a'
  console.log(b); // 'b'
}
foo(a = 'a');
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
```

## arguments

`arguments`是每个函数都有的属性，它是一个类数组的对象，包含传入函数中的所有参数，这是过去的一种获取所有参数的唯一办法，至今仍然有效

## 函数表达式

函数在 JavaScript 中不是“语言结构”，而是一种特殊的值，还有另外一种创建函数的语法叫做**函数表达式**

```js
let foo = function() {};
foo();
```

函数像值一样被赋值给变量，为什么函数后面会有一个分号，因为这里它被看作一个表达式，只是一个特殊值而已，如果只写`foo`是不会调用函数的，只会返回函数的引用，所以需要`foo()`调用

下面这种写法也是 OK 的，看起来就像变量存储了函数，函数可以被当作值一样传递

```js
function foo () {}
let fc = foo;
fc();
```

另外这种写法也没什么区别，任然是一个函数表达式，即使增加了`func`，但它也会成为表达式的一部分，但是它允许函数内部引用自己

```js
let foo = func (){};
```

::: tip 声明函数和函数表达式的区别
声明函数可以无视定义的顺序调用，因为它会被解释器提前，而函数表达式只能在定义后调用，这不难理解，因为函数表达式只有赋值给变量后才能被引用。如果不是特殊用途不推荐使用函数表达式，因为阅读性较差，且定义更为繁琐
:::

::: tip 作为值的函数
既然函数也是引用类型，它的引用也可以被传递，访问不带`()`的函数名即可
:::

### 立即调用的函数表达式

如果在定义一个函数的同时调用这个函数，就会实现立即自执行函数的方式，为什么使用匿名函数而不是具名函数呢？因为在这种调用方式下函数有无标识都没有关系，不影响程序的执行，于是出现了下面的写法

```js
let foo = function () {}();
(function (){})();
(function (){}());
+function (){}();
-function (){}();
void function (){}();
new function (){}();

function (){}() // 抛出语法错误
```

为什么`function (){}()`抛出错误，因为解释器会将它视为一个缺标识的函数声明。而上面的匿名函数都会被看作一个表达式执行，仔细观察发现都是通过加一些额外的操作符让解释器将函数视为一个表达式，而不是函数声明，因此绕过了语法检查，这就是匿名自执行函数的本质，更准确的说法是“**立即调用的函数表达式**”

这种函数的定义方式有一个封闭的作用域范围，因此可以封装一些变量和函数，由于外部无法引用内部的变量，就能避免和全局对象的冲突。如果想要扩大作用域，可以为函数定义一个参数，将外部的定义的对象作为参数传入，并将内部的变量和函数绑定到对象上，即可实现全局变量和函数，jQuery 就是这么做的：

```js
(function (window, undefined) {
  // jQuery 逻辑实现
})(window);
```

## 箭头函数

创建函数还有另一种非常简单的语法，且这种方式比函数表达式更好，它被称为**箭头函数**

```js
let foo = () => {};
```

它是下面的简单版本

```js
let foo = function (){};
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
3. 不能作为构造器使用`new`调用，这是不具有`this`

## 回调函数

既然函数可以传递，就产生了下面的写法

```js
function foo(callback) {
  callback();
}
function bar(){}
foo(bar);
```

从这里看来，`bar`被当作参数传递给`foo`，然后在`foo`中调用，因此`bar`被称为**回调函数**

回调函数的主要思想就是通过传递一个函数，且期望在稍后时将其进行回调

## 闭包函数

将一个函数作为返回值的函数就是闭包函数，它的目的是变相的扩大了局部变量的作用域，这导致在任何地方调用该函数都可以访问该作用域中的变量，下面这个例子中`temp`本质是一个局部变量，而`bar`被`foo`当作返回值在外部调用，却仍能够访问`temp`，但实际上不应该再访问到`temp`，这就是闭包函数的作用。闭包的核心就是无论在何处调用该函数，仍然能够访问它所处于环境中的变量，而这个变量是无法被其他程序访问到的

```js
function foo() {
  let str = 'abc';
  function bar() { console.log(str); }
  return bar;
}

foo()();
```

## 函数也是对象

在 JavaScript 中函数本身也是一个对象，因为函数也可以作为一个值传递，必然属于某种类型，函数是一个可被调用的对象，不仅可以调用，也可以当作对象来处理，进行属性操作，以及引用传递等

那么作为对象就应该有自己的一些属性：

1. `name`：函数的名字，如果没有声明名字，则会根据上下文推测一个
2. `length`：返回函数入参的个数，但是 rest 参数不参与计数

::: tip
如果直接在一个数组中声明函数，那么该函数的`name`是无法推断的
:::

## Function 构造器

JavaScript 也提供了另一种创建函数的方法，只不过很少使用，提供了`Function`构造器来创建一个函数：`let func_name = new Function(arg1, arg2, ..., func_body)`，在这个形式中，每个参数都是字符串，而参数列表是可以省略的

```js
let func = new Function('a', 'b', 'return a + b');
console.log(func(1, 2)); // 3
```

与其他的方法相比，它是通过字符串创建的，允许将字符串变为函数，这种应用场景只有比较复杂的地方可以用到：从服务器种获得代码并编译成函数允许

::: tip 闭包
通常闭包指向创建函数时自身所处于的环境，但是使用`new Function()`创建的函数却指向全局环境
:::

## 内置函数

JavaScript 也内置了一些与定义的函数，用于处理一些常见的操作，预定义函数可以看作为全局对象的方法，而且常量`NaN`和`Infinity`看作它的属性，该类无需使用`new`创建，而是会在引擎初始化时被创建，方法和属性可以立即使用，且无需引用对象

`eval()`是一个很强大的函数，它的作用是计算一个字符串，并转换为对应的表达式或语句执行，它本身并不返回什么数据，目的就是执行字符串中的表达式或语句

```js
let x3 = 2;
eval('x' + 3); // 会变成 x3 ，并返回访问 x3 变量的值
eval('')
```

::: demo eval()

```html
<p id="eg1"></p>
<p id="eg2"></p>
```

```js
let x3 = 2;
document.querySelector('#eg1').innerText = eval('x' + 3);
document.querySelector('#eg2').innerText = eval(x3 + 3);
```

:::

`encodeURI()`用于将一个字符串编码成一个有效的 URI，而`decodeURI()`则是对已经编码的字符串进行解码。`encodeURIComponent()`和`decodeURIComponent()`也是如此，它们区别在于编码和解码的特殊字符

::: demo encodeURI()/encodeURIComponent() 和 decodeURI()/decodeURIComponent()

```html
<p id="eg3"></p>
<p id="eg4"></p>
<p id="eg5"></p>
<p id="eg6"></p>
```

```js
let str = 'https://wjqis.me/index?foo=张三&bar=33';
document.querySelector('#eg3').innerText = encodeURI(str);
document.querySelector('#eg4').innerText = decodeURI(encodeURI(str));
document.querySelector('#eg5').innerText = encodeURIComponent(str);
document.querySelector('#eg6').innerText = decodeURIComponent(encodeURIComponent(str));
```

:::

::: tip
这对于向服务器发送数据有用，因为用户输入的数据可能包含一些非法的数据导致服务器无法解析，所以要进行编码
:::

`parseFloat()`：将一个字符串转换为浮点数，而且会解析字符串中的数字，直到不是数字部分的字符，如果字符串不是以一个有效的数字开头，则返回`NaN`，有效数字前的空格会被忽略

::: demo parseFloat()

```html
<p id="eg7"></p>
<p id="eg8"></p>
<p id="eg9"></p>
```

```js
let foo = '2.3';
let bar = '174cm';
let qux = 'hello';
document.querySelector('#eg7').innerText = parseFloat(foo)
document.querySelector('#eg8').innerText = parseFloat(bar)
document.querySelector('#eg9').innerText = parseFloat(qux)
```

:::

+ `parseInt()`：将一个字符串转换为整数，如果不能转换将会返回`NaN`
+ `String()`：将一个对象转换为字符串，如果是`undefined`则返回`undefined`
+ `Number()：将一个对象转换为数值，如果是`undefined`则返回`NaN`
+ `Boolean()`：将一个对象转换为逻辑值
+ `isFinite()`：判断一个数值是否为有限数，是就返回`true`
+ `isNaN()`：判断一个数值是否不是数字，是就是返回`true`

## 函数的柯里化
