---
title: 万物皆空之原型
category: 编程语言
tag: [JavaScript]
date: 2021-06-28
---

JavaScript 的对象有一个非常特殊的隐藏属性，它要么为`null`，要么就是对另一个对象的引用，这个对象叫做**原型对象**。当从一个对象中读取一个它没有的属性时，会从原型对象中获取该属性，这种行为叫做**原型继承**

使用对象的`__proto__`属性访问原型对象

```js
let A = { name: 'A' };
let B = {};

// B 的原型没有指向 A
console.log(B.name); // undefined
// B 的原型指向了 A
B.__proto__ = A;
console.log(B.name); // 'A'
```

可以看到，访问`B`没有的属性，就会从它的原型对象中进行查找，在这里就可以说“`A`是`B`的原型”，这导致`A`中的所有属性和方法都会在`B`中使用，这就相当于继承了一样

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

但对于访问器属性来说却是一个例外，因为访问器实际上是一个函数来处理的，写入此属性就相当于调用了一个函数一样

```js
let A = { 
  name: 'A',
  get getName() {
    return this.name;
  },
  set setName(value) {
    this.name = value;
  }
};
let B = { __proto__: A };

console.log(A.getName); //'A'
B.setName = 'B';
console.log(A.getName); //'A'
console.log(B.getName); //'B'
```

上述访问器属性中的`this`代表的是`B`，所以`setName`写入操作就相当于`B.name = value`，所以原型对象的数据得到了保护。`this`是不受原型的影响的，无论在哪里，始终代表着`.`前面对象

每个方法中使用的`this`都代表在调用时的对象，因此将数据写入`this`时，会存储到当前调用的对象中

这说明方法是共享的，但是对象状态不是

## F.prototype

每一个函数都有一个`prototype`属性，虽然和对象的`__proto__`有点相似，但它只是一个常规属性。使用`new`构造对象时，会将对象的`__proto__`指向函数的`prototype`

```js
let A = { name: 'A' };

function B() {}
B.prototype = A;

let b = new B();
console.log(b.name); // 'A'
```

函数的`prototype`是一个只有`constructor`属性的对象，而`constructor`指向函数自身

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
B.prototype = { constructor: B };

let b = new B.prototype.constructor();
console.log(b.constructor == B); // true
```

`prototype`本身也是一个对象，所以它也有`__proto__`，它指向的是`Object`的`prototype`

```js
console.log(Foo.prototype.__proto__ === Object.prototype) // true;
```

对于一个普通函数来说`prototype`属性没有任何用处，而构造函数的`prototype`属性非常有用

## 内建原型

下面的代码会调用内建的`toString`方法，但实际上这个对象根本没有这个方法

```js
console.log({});
```

然而`{}`和`new Object()`是一个意思，`Object`是一个内建的对象构造函数，当一个对象被`{}`或`new Object()`创建时，就会将`prototype`设置为`Object.prototype`，所以`toString`是从这里继承的

```js
console.log({}.__proto__ === Object.prototype); // true
console.log({}.toString === Object.prototype.toSgring); // true
```

`Object.prototype`已经是最顶层的对象了，因为该对象的`__proto__`指向了`null`

```js
console.log(Object.prototype.__proto__); // null
```

还有其他的内建对象，也在`prototype`上挂载了方法，比如当创建一个数组时，实际上调用的是`Array`数组构造器，`Array.prototype`为所有的数组提供了操作方法

按照规定，所有的内建对象顶端都是`Object.prototype`，这就是一切都是由对象继承而来的说法

## 更改原生原型

原生的原型当然可以被修改，比如为`String.prototype`添加一个方法，会对所有的字符串可用：

```js
String.prototype.show = function () {
  console.log(this);
}

'芜湖！'.show(); // 芜湖！
```

但这是一个非常不好的想法，因为原型是全局的，假如有两个库都修改了原生原型对象，可能会产生冲突，为此纠缠了两种解决方案

+ polyfilling

```js
if (!String.prototype.show) {
  String.prototype.show = function() {
    console.log(this);
  };
}
```

+ 方法借用

```js
let foo = {
  0: '1',
  1: '2',
  length: 2
};

foo.join = Array.prototype.join;

console.log(foo.join(',')); // 1,2
```

内建的`join`方法只会检查正确的索引和`length`，所以它是有用的

## 判断属性

`in`不仅检查自身的属性检查继承而来的属性，那么`for...in`也会迭代继承的属性

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

for (let key in B) {
  if (B.hasOwnProperty(key)) {
    console.log(key); // ownProp
  }
}
```

`B.hasOwnProperty`来自`Object.prototype.hasOwnProperty`，它也是继承的方法，它没有被枚举的原因就是它是不可枚举的，`Object.prototype`其他属性都是不可枚举的

## 现代原型的设置方法

`__proto__`是一种过时的原型设置方式，在 JavaScript 规范中提供了一些现代的方法来设置

+ `Object.create(protoObject)`：创建一个以`protoObject`为原型的新对象
+ `Object.getPrototypeOf(Object)`：返回对象的原型
+ `Object.setPrototype(Object, protoObject)`：修改对象的原型

```js
let A = { name: 'A' };
let B = { name: 'B' };
let C = Object.create(A);

console.log(C.name); // 'A'
console.log(Object.getPrototypeOf(C) === A); // true

// 修改 C 的原型
Object.setPrototypeOf(C, B);
console.log(C.name); // 'B'
```

## 只读和只写属性

在面向对象编程中，属性往往是无法直接读写的，如果想要实现单独的控制就应该使用一些办法来屏蔽外部直接访问属性的接口，通过`this`和`prototype`定义的属性都是可以被读写的，所以应该使用`var`来定义属性，因为`var`定义的属性是有局部作用域的，变相的实现了私有属性，然后通过方法来实现属性的读写

```js
function Person() { 
  var name = null;
  this.getName = function() {
    return name;
  }
  this.setName = function(value) {
    name = value;
  }
}

var foo = new Person();
foo.setName('foo');
foo.getName();
foo.name // undefined
```

## 静态方法

通过`prototype`定义的方法叫实例方法，实例方法要通过一个变量指向构造函数的新对象，而静态方法则可以直接在构造器上定义，因为函数本身就是一个对象：

```js
function Foo() {}
Foo.a = function name() {
  console.log('static method a');
}
Foo.a();
```

静态方法是属于类的方法，不能通过实例来调用，而是直接使用类来调用

## 静态成员

静态成员指不需要实例化就可以访问到成员，也被称为类成员，而非静态成员需要实例化才能访问，所以被称为实例成员，如果一个类所有的成员都是静态的，那么这个类就是静态类

之所以定义静态成员，是因为某些对象的一些特定行为是不会改变的，比如太阳和月亮都是世间唯一的，谈不上个体，因此无需实例化。如果在更广泛的特定下，太阳和月亮都属于行星，它们都属于行星类的一个个体

有一些类虽然可以实例化，但是其中的某一些属性和方法也具有一定的唯一性，这些都应该被定义为静态成员。如果想要将成员声明为静态的，则直接将静态成语赋值给类本身

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.gender = '男';
Person.showGender = function () {
  console.log('我的性别是' + this.gender);
}
Person.showGender();
```

静态成员是一般是公共成员，但是静态成员不能够被继承，因为它属于类，而不属于实例对象

::: caution
静态方法只能访问静态属性，不能访问实例属性
:::

## 总结

+ 对象都有一个隐藏属性`prototype`，当访问对象中没有的属性，就会到这个属性中查找。通过`__proto__`来访问这个对象，`__proto__`的值可以是对象，也可以是`null`，其他类型会被忽略
+ `this`永远代表当前调用的对象，所以访问访问器属性时，不会改写原型对象上的数据
+ 函数都有一个`prototype`，使用构造器创建对象时，会将对象的`__proto__`指向函数的`prototype`，`prototype`是一个只有`constructor`属性的对象，指向函数自身
+ `in`不仅检查自身的属性检查继承而来的属性，排除继承的属性就应该使用`hasOwnProperty(key)`
+ `__proto__`是一种过时的原型设置方式，JavaScript 提供了以新的原型设置方式，`Object.create`，`Object.getPrototypeOf`，`Object.setPrototype`
