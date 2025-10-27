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

或者定义一个立即执行的表达式类

```js
new(class {});
```

## 实例属性

在类中使用`constructor`方法定义属于实例的属性，这可能需要借助`this`，然而在类中只需要这么做

```js
class Foo {
  name = 'foo';
  age = 18;
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

## 静态属性和方法

JavaScript 提供了`static`关键字用于定义一个只属于类的属性，这在实例中是访问不到的

```js
class Person {
  static name = 'foo'
  static age = 18
}

const p = new Person();
console.log(Person.name); // 'foo'
console.log(p.name); // undefined
```

::: caution
声明一个静态属性是一个非常新的特性，可能会有兼容性问题，最好只用来声明静态方法
:::

静态方法中的`this`指向类

## 私有属性和方法

一般情况下，类的属性和方法都是可以被访问的，为了保护它们不受任意的修改，有必要对该属性进行一个读写控制

JavaScript 并没有提供原生的语法支持，所以需要一些故意的地方，让它看起来像私有的

```js
class Person {
  constructor(name) {
    this._name = name;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
}

const p = new Person();
console.log(p.setName('foo'));
console.log(p.getName());
console.log(p._name); // 仍然可以直接访问属性
```

这种方式并没有什么强制性的约束力，如果想要更强的约束力，需要采用 IIFE 的方式

```js
(function () {
  let _name = '';
  class Person {
    constructor(name) {
      _name = name;
    }
    getName() {
      return _name;
    }
    setName(name) {
      _name = name;
    }
  }
  globalThis.Person = Person;
})();

const p = new Person('foo');
console.log(p.getName());
setName('bar');
console.log(p.getName());
```

这很简单，如果不主动暴露函数中的变量，外界是无法访问的

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

实例属性和静态属性都会被子类所继承

## super

`super`是一种特殊的关键字，当`super`在子类的构造方法中作为函数调用时，代表着父类的构造方法。虽然代表着父类的构造方法，但在父类的构造方法中的`this`实际上指向子类的实例

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, sex) {
    super(name);
    this.sex = sex;
  }
}

const s = new Student('foo', 18);

console.log(s.name); // 'foo'
console.log(s.sex); // 18
```

注意，`super`必须位于子类的构造方法中的第一行位置，优先于其它的代码执行

如果`super`作为对象使用，实际上指向父类的`prototype`，所以无法访问实例上的属性，但调用父类的方法时，父类方法的`this`指向子类的实例

## 总结

+ `class`是新增的创建对象语法，本质上是一个函数，只能用`new`语法创建对象
+ 定义实例属性不需要使用`this`，但是在`constructor`则需要
+ 将一个方法作为属性赋值给实例属性，不必担心`this`丢失问题
+ 也可以使用 getter/setter
+ `static`可以声明一个静态属性，但最好用来声明静态方法，其中的`this`指向类
+ 原生语法没有提供私有属性和方法的设置，需要一些技巧来实现
+ 其它的类可以使用`extend`关键字继承一个用`class`定义的类，实例属性和静态属性都会被子类所继承
+ `super`在子类构造函数中表示父类的构造方法，但`this`指向子类，必须作为第一行代码执行
