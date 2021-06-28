---
title: 万物皆空之原型
category: 编程语言
tag: JavaScript
author: JQiue
article: false
---

## 原型

JavaScript 的对象有一个非常特殊的隐藏属性`prototype`，它要么为`null`，要么就是对另一个对象的引用，这个对象叫做**原型对象**

当从一个对象中读取一个没有的属性时，会从原型对象中获取该属性，这种行为叫做**原型继承**

使用对象的`__proto__`属性获取原型对象

```js
let A = { name: 'A' };
let B = {};

// B 的原型没有指向 A
console.log(B.name); // undefined
// B 的原型指向了 A
B.__proto__ = A;
console.log(B.name); // 'A'
```

可以看到，如果访问`B`没有的属性，就会从它的原型对象中进行查找，在这里就可以说“`A`是`B`的原型”，这导致`A`中的所有属性和方法都会在`B`中使用，这就相当于继承了一样

原型是可以很长很长的，就像一条链子一样

```js
let A = { name: 'A' };
let B = {};
let C = {};

B.__proto__ = A;
C.__proto__ = B;
console.log(C.name); // 'A'
```

在这个例子中，`C`的原型指向了`B`，而`B`的原型指向了`A`，而`name`是通过原型链找到的

使用原型链有两个限制：

1. 引用不能闭环
2. `__proto__`的值可以是对象，也可以是`null`，其他类型会被忽略

原型仅用于读取属性，对于属性的写入/删除操作都是在原对象中进行操作的

```js
let A = { name: 'A' };
let B = { __proto__: A };

B.name = 'B';
console.log(B.name); //'B'
```

但是对于访问器属性来说却是一个例外，因为访问器实际上是一个函数来处理的，写入此属性就相当于调用了一个函数一样

```js
let A = { 
  name: 'A',
  get getName(){
    return this.name;
  },
  set setName(value){
    this.name = value;
  }
};
let B = { __proto__: A };

console.log(A.getName); //'A'
console.log(B.getName); //'B'
```

上述访问器属性中的`this`代表的是`B`，所以`setName`写入操作就相当于`B.name = value`，所以原型对象的数据得到了保护

`this`是不受原型的影响的，无论在哪里，`this`始终代表着`.`前面对象

每个方法中使用的`this`都代表在调用时的对象，因此将数据写入`this`时，会存储到当前调用的对象中

这说明方法是共享的，但是对象状态不是

此外，`for...in`还会迭代继承的属性

```js
let A = { name: 'A' };
let B = { __proto__: A };
for (let key in B) console.log(key); // name
```

如果想要排除继承的属性就应该使用`hasOwnProperty(key)`，不是自己的属性会返回`false`

```js
let A = { name: 'A' };
let B = { 
  ownProp: 'yes',
  __proto__: A 
};
for (let key in B){
  if (B.hasOwnProperty(key)) {
    console.log(key); // ownProp
  }
}
```

`B.hasOwnProperty`来自`Object.prototype.hasOwnProperty`，它也是继承的方法，它没有被枚举的原因就是它是不可枚举的，`Object.prototype`其他属性都是不可枚举的

## F.prototype

每一个函数都有一个`prototype`属性，虽然和对象的`__proto__`有点相似，它只是一个常规属性，作用是使用`new Function()`构造对象的时候，将对象的`__proto__`指向函数的`prototype`

```js
let A = { name: 'A' };

function B() {}
B.prototype = A;

var b = new B();
console.log(b.name); // 'A'
```

当函数的`prototype`没有指向时，它默认指向一个属性只有`constructor`的对象，而属性`constructor`指向函数自身

```js
function B() {}
console.log(B.prototype.constructor == B); // true
```

那么使用`constructor`构造一个对象也是可以的

```js
function B() {}
let b = new B.prototype.constructor();
```

如果更改了`prototype`，就不会有`constructor`了

```js
function B() {}
B.prototype = {};

let b = new B.prototype.constructor();
console.log(b.constructor == B); // false
```

因为它只存在于函数的`prototype`中，一旦更改，`constructor`的值取决于我们，为了保证正确的`constructor`，可以添加一个属性到默认的`prototype`，而不是选择完全覆盖，这样`constructor`得以保留下来

```js
function B() {}
B.prototype.foo = {};

let b = new B.prototype.constructor();
console.log(b.constructor == B); // true
```

手动添加也是可以的

```js
function B() {}
B.prototype = {
  constructor: B
};

let b = new B.prototype.constructor();
console.log(b.constructor == B); // true
```

`prototype`本身也是一个对象，所以它也有`__proto__`，它指向的是`Object`的`prototype`

```js
console.log(Foo.prototype.__proto__ === Object.prototype);
```

## 内建原型

## 特殊的 Function 和 Object

在 JavaScript 中函数是一等公民，不仅拥有传统函数的使用方式，还充当了类的构造器，同时每一个声明的函数都是`Function`类的实例，`Function`是 JavaScript 中内建的类，用`function`关键字声明的函数实际上是通过`new Function()`创建函数对象的一种简写形式

```js
function Foo() {}
Foo.__proto__ === Function.prototype;
```

`Function`本身也是一个构造函数，但它也是属于自己创造出来的实例

```js
Function.__proto__ === Function.prototype; // true
```

对象可以通过`{}`来创建，但对象都是`Object`类的实例，实际上每一个对象都是`new Object()`的简写形式，这又说明了`Object`本身也是一个构造函数，因此它实际上也是`Function`类的实例

```js
Object.__proto__ === Function.prototype; // true
```

因为得出了`Function.__proto__ === Function.prototype`的结论，所以下面也是成立的：

```js
Object.__proto__ === Function.__proto__; // true
```

## 判断属性

对象的`hasOwnProperty()`方法能够判断一个属性是否为自己的，而不是继承而来的

```js
function Foo() {
    this.a = 1;
}
Foo.prototype.b = 2;
Object.prototype.c = 3;
var obj = new Foo();
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('b')); // false
console.log(obj.hasOwnProperty('c')); // true
```

如果想要判断一个属性是否为原型链上的属性，则可以使用`in`关键字来判断

```js
console.log('a' in obj); // true
console.log('b' in obj); // true
console.log('c' in obj); // true
```
