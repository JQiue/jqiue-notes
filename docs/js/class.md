---
title: 类
category: 编程语言
tag: [JavaScript]
article: false
---

在现代 JavaScript 中，还有一个使用`class`的构造对象的方式，这是一个新的关键字，用来声明构造对象的模板，当然还有一些其他的功能

```js
class ClassName {
  constructor () {}
  method1 () {}
  method2 () {}
  /* ... */
}
```

使用`new ClassName()`方式来创建具有该类中所有列出来的方法的对象，`new`会自动调用`constructor()`用于初始化对象，下面是一个例子

```js
class Foo {

  constructor (name) {
    this.name = name;
  }
  
  sayName() {
    console.log(foo.name);
  }

}

let foo = new Foo('foo');
foo.sayName();
```

应当注意的是，它和字面量对象不一样，方法之间是没有逗号的，在类中，不需要逗号

## class 是什么

其实，它只是一个函数，它实际上就是创建一个`Foo`的函数，函数中的内容来自`constructor`，并且将类中的方法存储到`prototype`

```js
class Foo {}
console.log(typeof Foo); // function
console.log(Foo === Foo.prototype.constructor); // true
```

这看起来就像构造函数的语法糖一样，用构造函数的方式也是和类的结果一样的，但是它们仍然存在的许多差异，通过`class`创建的函数具有特殊的属性标记`IsClassConstructor: true`，这导致必须通过`new`来调用它，否则会抛出语法错误

```js
class Foo {}
Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
```

并且字符串的表示形式都是以`class`开头

```js
class Foo {}
console.log(Foo); // [class Foo]
```

而且类的方法是不可枚举的，类方法中的`enumerable`都被设置了`false`，并且类中的代码都是`use strict`模式

和函数一样，类也可以在表达式中定义，被传递，赋值，返回等

```js
let Foo = class {};
let foo = new Foo();

function makeClass () {
  return class {};
}
```

## getter 和 setter

当然少不了 getter 和 setter

```js
class Foo {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
let foo = new Foo('foo');

console.log(foo.name); // foo
foo.name = 'foooo';
console.log(foo.name); // foooo
```

## 计算属性

也支持使用中括号的计算属性

```js
class Foo {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
let foo = new Foo('foo');

console.log(foo.name); // foo
foo.name = 'foooo';
console.log(foo.name); // foooo
```

## 类字段

也允许定义一些属于类的字段，而不是对象的字段，类的字段对所有的对象可见

```js
class Foo {
  name = 'foo';
}

let foo1 = new Foo();
let foo2 = new Foo();
console.log(foo1.name); // foo
console.log(foo2.name); // foo
```

但是字段只会在类被构造成对象的时候预设好，使用原型是得不到的

```js
class Foo {
  name = 'foo';
}

let foo = new Foo();

console.log(foo.name); // foo
console.log(Foo.prototype.name); // undefined
```

::: tip
类字段还支持更加复杂的表达式和函数调用
:::

## 字段绑定

JavaScript 函数中的`this`是根据调用上下文决定的，这可能会导致在某些情况下丢失掉

```js
class Foo {
  name = 'foo';
  sayName() {
    console.log(this.name);
  }
}

let foo = new Foo();

setTimeout(foo.sayName, 1000); // undefined
```

上面的方法被当作值传递，当调用方法时，其中的`this`已经不指向`foo`了，但是类字段提供了一个解决方案

```js
class Foo {
  name = 'foo';
  sayName = () => {
    console.log(this.name);
  }
}

let foo = new Foo();

setTimeout(foo.sayName, 1000); // foo
```

`sayName`字段是基于对象创建的，每一个对象都有一个独立的方法，`this`总是指向该对象，所以就不必担心`this`丢失了

## 继承

其它的类可以使用`extend`关键字继承一个用`class`定义的类

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {}
  speack() {}
}

class Foo extends Person {
  constructor(name, age) {
    super(name, age);
  }
}

const foo = new Person();
```

## 静态的属性和方法

## 受保护的属性和方法

## 总结

+ `class`是新增的创建对象语法
+ 不必担心`this`丢失问题
