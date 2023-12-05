---
title: 对象
category: 编程语言
tag: [JavaScript]
article: false
---

对象是一种复杂的类型，用于存储更复杂的实体，JavaScript 可以使用两种方式创建对象，这两种方式是等同的，但通常使用字面量形式创建

```js
let foo = new Object(); // 构造函数形式
let bar = {}; // 字面量形式
```

## 属性

对象的属性是一种键值对形式，其中“键”位于`:`的左边，“值”在`:`的右边，属性可以在对象创建时指定，也可以在之后添加，可以通过`.`来访问对象的属性值，同时可以进行修改

```js
let user = {
  name: "zs",
  age: 23
}
console.log(user.name) // "zs"

// 添加一个属性
user.gender = "male";
console.log(user.gender) // "male"
```

可以使用使用`delete`移除属性

```js
let user = {
  name: "zs",
  age: 23
}
delete user.age;
console.log(user.age) // undefined
```

## 方括号

属性值还可以是多字词语，但必须加上引号，但访问这种多字属性，`.`就没有作用了，应该使用方括号`[]`访问

```js
let user = {
  name: "zs",
  age: 23,
  "is handsome": false
}
user.is handsome // SyntaxError
user["is handsome"] // ok
```

方括号非常强大，甚至可以根据表达式来获取属性名，而`.`却做不了这一点

```js
let key = "is handsome"
let user = {
  name: "zs",
  age: 23,
  "is handsome": false
}
user[key] // ok
```

当然创建对象的时候也可以使用方括号

```js
let key = "is handsome"
let user = {
  name: "zs",
  age: 23,
  [key]: false
}
```

这非常牛逼，意味着可以写很复杂的表达式，但是相对于`.`来说更加麻烦。所以当属性名简单就用`.`，需要一些复杂的内容，就用方括号

## 简写属性

这是新特性提供的内容，当变量名和属性名相同时，即可简写

```js
let name = 'zs';

let user = {
  name, // 与 name: name 相同，会寻找是否有 name 的变量，否则报错
  age: 23
}
```

## 属性名限制

对于对象的属性来说，它并不遵守关键字以及保留字规范，使用这些作为键是没有问题的

```js
let obj = {
  var: 1,
  let: 2,
  for: 3,
  0: 4
}

console.log(obj.var); // 1
console.log(obj.let); // 2
console.log(obj['0']); // 4
```

这是因为属性名会被转换为字符串，所以无视这套规则，但除了一个名为`__proto__`的属性

## 属性检测

即使访问一个不存在的属性也不会报错，因为会动态的创建一个不存在的属性，而这个属性值默认为`undefined`，因此可以写一些代码进行检查

```js
let user = {};
console.log(user.name === undefined); // true
```

JavaScript 提供了一个特别的检查属性是否存在的操作符`in`，应该使用字符串形式的属性，如果不这么做，JavaScript 会将该属性视为一个变量

```js
let user = { name: "zs" };
console.log("name" in user); // true
console.log("age" in user); // false
```

大部分情况下使用`undefined`比较就可以判断了，但是有一个例外情况，就是属性存在，且存储的值是`undefined`，所以这种对比方式有问题，但是`in`仍是对的

## 遍历属性

`for...in`可以遍历一个对象的所有键，这和`for`循环是不一样的东西

```js
for (key in object) {
  // 每遍历一个键就执行的代码
}
```

遍历键时会按照一定的顺序排序，对于整数属性来说，会按照小到大进行排序

```js
let codes = {
  "3": 3,
  "2": 2,
  4: 4,
  1: 1
};

for (let key in codes) {
  console.log(key); // "1", "2", "3", "4"
}
```

对于其他类型的键来说，会按照创建的顺序进行排序

注意，必须是整数，像`+1`、`-2`就不行，如果想要使用整数属性，且必须按照创建的顺序进行排序，不要采用这种方式来欺骗程序，因为它无法转换为真正的整数

## 对象的引用

与原始类型相比，和对象的根本区别在于对象是通过“引用”来访问的

```js
let foo = "balabala";
let bar = foo;
foo = "moximoxi";
console.log(bar); // balabala
```

这是原始类型的存储和复制，拷贝过来的值是独立的，不会被后续的操作所影响，但对象不是这样的

```js
let user = {
  name: "zs"
};

let admin = user;

console.log(admin.name); // "zs"
user.name = "ls";
console.log(admin.name); // "ls"
```

这个例子说明对象之间的拷贝不是独立的，两个变量都保存着同一份对象的引用，当使用任意一个变量操作对象时，另一个变量也会受到影响，相当于这个对象有两个名字而已

对象之间进行比较时，实际上比较的是引用，由于两个变量都保存的同一个引用，所以它们相等，这也说明引用相等，那么对象就是相等的

```js
let user = {};
let userClone = user;
console.log(user == cloneUser); // true
console.log(user === cloneUser); // true
```

如果想要拷贝一个对象，但是简单的赋值操作会创建一个相同对象的引用，可以通过遍历对象现有的属性结构，将之赋值给新的对象

```js
let user = {
  name: 'zs',
  age: 23
};

let cloneUser = {};

for (let key in user) {
  cloneUser[key] = user[key];
}

console.log(user == cloneObj); // false
```

当然，JavaScript 提供了`Object.assign`方法达到同样的效果，`Object.assign(dest, [src1, src2, ...])`，该方法会将第二个参数中所有对象的属性都拷贝到第一个参数的对象中，如果属性存在，那么它会被覆盖

```js
let user = {name: 'zs'};
let foo = {canView: true};
let bar = {canEdit: true};

Object.assign(user, foo, bar);
console.log(user); // user = {name: 'zs', canView: true, canEdit: true}
```

使用扩展运算符也可以做到这点

```js
let foo = {canView: true};
let bar = {canEdit: true};

let cloneObj = {...foo, ...bar};
console.log(cloneObj); // {canView: true, canEdit: true}
```

这些方式都是简单的拷贝叫做浅拷贝，因为对象的属性也可以是对其他对象的引用，很显然用这种方式已经不行了。为了解决这样的问题，就必须检查每个属性值，如果是一个对象，那么也要同样的复制它的结构，这种叫做“深拷贝”

`JSON.parse()`是最常用的深拷贝方式之一，原理是利用`JSON.stringify()`将对象序列化成字符串，再使用`JSON.parse()`反序列化成对象，但是它无法处理属性为方法的情况

```js
let foo = {
  a: 1,
  bar: {
    a: 2
  }
}

let clone = JSON.parse(JSON.stringify(foo));

clone.a // 1
clone.bar.a; // 2
clone.show(); // TypeError
```

也可以手动实现深拷贝函数

```js
function deepCopy(object) {
  // 不是 object 则直接退出
  if (!object || typeof object !== "object") return;
  // 判断是数组还是对象
  let newObject = Array.isArray(object) ? [] : {};
  // 遍历当前对象
  for (let key in object) {
    // 判断是是否为自身的属性
    if (object.hasOwnProperty(key)) {
      // 是一个对象就递归调用，否则将当前对象的属性值赋值到新对象上
      newObject[key] = typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }
  return newObject;
}

let foo = {
  a: 1,
  bar: {
    a: 2
  }
}

let clone = deepCopy(foo);

clone.a // 1
clone.bar.a; // 2
clone.show(); // 3
```

不要自己造轮子，因为有很多 JavaScript 库实现了该需求，比如 lodash 中的`_.cloneDeep(obj)`，它的性能比自己手写的更好

## 对象的方法

在 JavaScript 中，行为由属性中的函数表示，作为对象属性的函数被称为方法。可以在对象象创建后才指定一个函数作为方法，也可以在创建时指定

```js
let user = {
  name: 'zs',
  age: 23,
  foo: function() {
    console.log('foo');
  }
};

user.bar = function () {
  console.log('bar');
}

user.foo(); // foo
user.bar(); // bar
```

这种声明方式可以被简写，也就是去掉了`function`

```js
let user = {
  name: 'zs',
  age: 23,
  sayHello() {
    console.log('hello');
  }
};
```

## this

通常情况下，对象中的方法都是访问对象中的属性来完成相关操作，但是这种方式存在一些问题

```js
let user = {
  name: 'zs',
  sayName() {
    console.log(user.name); // // TypeError: Cannot read property 'name' of null
  }
};

let admin = user;
user = null;
admin.sayName(); 
```

这样的代码是不可靠的，那么`this`就是这种问题的解决方案，因为`this`永远代表着调用该方法的对象

```js
let user = {
  name: 'zs',
  sayName () {
    console.log(this.name); // 替换为 this
  }
};

let admin = user;
user = null;
admin.sayName(); // 'zs'
```

不同于其他编程语言，`this`在 JavaScript 中可以用于任意函数，而不仅仅是对象的方法

```js
function sayHi() {
  console.log(this.name);
}
```

上面的代码不会报错，因为`this`的值会在运行时计算出来，取决于代码的上下文

```js
function sayHi() {
  console.log(this.name);
}

let user = { name: 'zs' };
let admin = { name: 'admin' };

user.sayHi = sayHi;
admin.sayHi = sayHi;

user.sayHi(); // 'zs'
admin.sayHi(); // 'admin'
```

在上述代码中，`this`正确的发挥了它的作用：`this`的取值根据代码上下文决定

但在严格模式下，`this`等于`undefined`，在非严格模式下`this`会是全局对象（浏览器中的window）

另外提到一点，箭头函数中是没有`this`的，如果在箭头函数中引用了`this`，那么`this`的值取决于外部的函数，这是箭头函数的一个特性。如果不想要一个独立的`this`，反而想从上下文中获取，它非常有用

## 对象构造器

常规的`{...}`语法虽然允许创建一个对象，但是大多数情况下，都需要创建许多类似的对象，这可以使用构造函数和`new`操作符实现。构造函数就是一个普通的函数，没什么区别，可以被当作普通函数调用，也可以当作构造器产生一个对象，一般构造函数的命名是以大写开头的

```js
function User(name) {
  this.name = name;
}

let user = new User('zs');
console.log(user.name); // zs
```

`new User()`是这么做的：

1. 创建一个新的对象`{}`
2. 将新对象的`__proto__`指向构造器的`prototype`
3. 将构造器的`this`指向新对象
4. 执行函数体，返回`this`的值

它和`{...}`语法创建的对象是差不多的

构造函数的目的是实现可重用的对象创建代码，比使用字面量对象更加简短。从技术上来讲，任何一个函数都可以通过`new`来运行（除了箭头函数，因为没有自己的`this`），”首字母大写“只是一个约定，用于区分构造函数和普通函数

一般来说构造函数是没有`return`语句的，如果有`return`语句，就分为两种情况：

1. 如果返回的是原始类型，则忽略，继续返回`this`
2. 如果返回的是一个对象，则返回该对象，而不是`this`

```js
function User(name) {
  this.name = name;
  return {};
}

let user = new User('zs');
console.log(user.name); // undefined
```

::: tip
如果构造器没有参数，可以省略`new`后面的括号，虽然规范上允许，但最好不要这么做
:::

在构造器中也是可以定义方法的，但是不能在构造器中使用简化方法，因为无法通过语法检查

```js
function User(name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  };
}

let zs = new User('zs');
zs.sayName(); // 'zs'
```

在一个函数内部，可以使用`new.target`来检查该函数是否被`new`调用，还是常规调用，如果作为常规调用`new.target`则为`undefined`，这种方式可以让一个函数以不同的调用方法进行不同的工作

```js
function Foo() {
  console.log(new.target);
}
Foo(); // undefined
new Foo(); // Function: Foo
```

## 可选链

可选链操作符用于解决连接对象链深处的属性值，不必验证每一个引用是否有效，比如一个对象`user`，大多数用户的地址存储在`user.address`中，街道地址存储在`user.address.street`中，但有些用户没有提供街道信息。在这种情况下，如果用户没有提供`user.address`，当尝试访问`user.address.street`会得到一个错误

```js
let user = {}
console.log(user.address.street); // TypeError: Cannot read property 'street' of undefined
```

因为`user.address`的返回结果是`undefined`，访问`user.address.street`当然会失败，但是在很多场景中，并不需要这种错误，更加希望得到的是`undefined`

一般的解决方式是使用`if`或条件运算符`?`来对值进行检查

```js
let user = {};
if (user.address) {
  console.log(user.address.street);
} else {
  console.log(undefined);
}

console.log(user.address ? user.address.street : undefined);
```

这种写法虽然解决了错误，但是不够优雅，如果访问的属性更加深入，这就是问题了，写出来的代码令人难以理解，这就是可选链`?.`语法引入的原因，只是替代了`.`调用，当前面的引用是`undefined`或`null`，他会停止继续调用，立即返回该部分

```js
let user = {};
console.log(user?.address?.street) // undefined
```

这样的写法简洁明了，且就算`user`不存在，也没有关系，但是从逻辑上来讲，`user`对象是肯定存在的，所以不要过度的使用可选链，应改为`user.address?.street`

::: caution
`?.`前面的变量必须是已声明的，否则会触发一个错误
:::

可选链也有”短路效应“，当左边部分不存在就会终止后面的所有代码运行。可选链不是一个运算符，而是一个特殊的语法结构，它还可以与函数和方括号一起使用

```js
let user = {};
user?.['name']; // 访问不存在的属性
user.sayHi?.(); // 调用不存在的方法
```

可选链会检查左边的部分，如果存在才会运行右边的操作部分

::: tip
可选链不能成为被赋值的部分，这会抛出一个错误
:::

## Symbol

对象的属性只能是字符串或 Symbol 类型，而 Symbol 类型是用来给对象创建隐藏属性的，使用`Symbol()`来创建一个唯一的标识符类型：

```js
// id 是 symbol 实例化的对象
let id = Symbol();
```

在创建的同时，也可以给 Symbol 一个描述：

```js
let id = Symbol('id');
```

Symbol 是绝对唯一的，并不会因为具有相同的描述而一样：

```js
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); // false
```

前面说过，Symbol 就是为了给对象创建一个隐藏属性的，其他地方不能访问且重写这些属性：

```js
let id = Symbol('id');
let user = { name: 'foo' };

// Symbol 对象作为对象的键并赋值
user[id] = 1;
// 通过 Symbol 访问
console.log(user[id]); // 1
```

和字符串键不同的是，Symbol 永远也不会产生冲突。如果想要在字面量对象中使用 Symbol，需要使用方括号：

```js
let id = Symbol("id");

let user = {
  name: "foo",
  [id]: 1
};
```

由于隐藏特性，for...in 是无法遍历它们的，但是`Object.assign()`会同时复制字符串和 Symbol 属性

::: tip
Symbol 并不是绝对的隐藏的，有一个内置方法`Object.getOwnPropertySymbols(obj)`允许获得该对象所有的 Symbol
:::

一般情况下，Symbol 是不相同的，虽然它们有相同的名字，如果要获得名字相同的 Symbol 具有相同的实体，就必须借助一个全局的 Symbol 注册表，可以保证每次访问相同名字的 Symbol 都返回的是相同的 Symbol

使用`Symbol.for()`即可读取一个 Symbol（不存在时则创建），如果有就返回该 Symbol，没有就创建一个 Symbol

```js
let id = Symbol.for('id');
let theId = Symbol.for('id');
console.log(id === theId); // true
```

和全局 Symbol 相反的是，还有一个反向调用的`Symbol.keyFor()`，作用是完全反过来，通过全局 Symbol 返回描述

```js
let id = Symbol.for('id');
let idDesc = Symbol.keyFor(id);
console.log(idDesc); // id
```

`Symbol.keyFor`只适用于全局 Symbol，如果是非全局的，将会返回`undefined`

JavaScript 也有很多内置的 Symbol，可以用来微调对象的各个方面

## 可迭代对象

可迭代对象是数组的泛化，不仅仅数组可以被迭代，字符串，以及其他对象都可以被迭代的，可迭代对象就是属性中有`Symbol.iterator`的对象

总结来说，可以使用`for...of`的对象被称为可迭代对象，因为可迭代对象必须实现`Symbol.iterator`方法，该方法会被`for...of`自动调用，一些内置的可迭代对象比如字符串和数组，都实现了`Symbol.iterator`

下面的示例是一个手动实现的可迭代对象

```js
let range = {
  from: 1,
  to: 10
}

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return {
          done: false,
          value: this.current++
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}

for (item of range) {
  console.log(item);
}
```

## 全局对象

全局对象提供了可以在任何地方使用的变量和函数，被内置于语言的环境中，在浏览器中，它的名字是`window`，而 Node.js 则是`global`，其他的环境也可能是别的名字

但是在最近，`globalThis`被作为全局对象的标准加入到了 JavaScript 中，所有的环境都应该支持该对象

在浏览器中，使用`var`定义的全局变量以及函数才会成为全局对象的属性，而`let/const`不行

## 属性配置

虽然对象的属性看起来像简单的键值对，但实际上属性是一个更加强大的东西。对象的属性除了有一个 value 值以外，还有三个特殊的特性，也叫做标志：

+ `writable`：为`true`时，可以被修改，否则只是可读的
+ `enumerable`：为`true`时，可以被迭代，否则不能
+ `configurable`：为`true`时，可以被删除，标志可以被修改
  
通常为对象创建属性时，它们都默认为`true`。如果想要获得属性的标志，就要用到`Object.getOwnPropertyDescriptor(obj, propertyName)`，它会返回一个描述该属性标志的对象

```js
let foo = { name: 'foo' };

let descriptor = Object.getOwnPropertyDescriptor(foo, 'name');
console.log(descriptor); // { value: 'foo', writable: true, enumerable: true, configurable: true }
```

JavaScript 提供了`Object.defineProperty(obj, propertyName, descriptor)`来为一个对象定义属性。如果属性存在，就会更新标志，否则就会用所给的值和标志来创建属性。没错，这是另一个为对象创建属性的方法，如果没有提供标志，那么默认为`false`

```js
let foo = {};

Object.defineProperty(foo, 'name', {
  value: "foo"
});

let descriptor = Object.getOwnPropertyDescriptor(foo, 'name');
console.log(descriptor); // { value: 'foo', writable: false, enumerable: false, configurable: false }
```

现在看看标志对属性的影响，当`writable:false`时，属性值是一种只读状态，是无法修改的，除非再次使用`defineProperty`覆盖

```js
let foo = { name: 'foo' };

Object.defineProperty(foo, 'name', {
  writable: false
});

let descriptor = Object.getOwnPropertyDescriptor(foo, 'name');
console.log(descriptor);

foo.name = 'bar';
console.log(foo); // { name: 'foo' }
```

::: tip
另外，在非严格模式下是不会出现报错的，只是会默默的忽略掉
:::

这是`enumerable:false`的情况，通常内置的`toString`是不会被枚举出来的，如果自定义了`toString`，就会被枚举。如果不想被枚举，该标志就派上了用场

```js
let foo = {
  name: 'foo',
  toString() {
    return this.name;
  }
};

Object.defineProperty(foo, 'toString', {
  enumerable: false
});

for (const key in foo) console.log(key); // name
```

`configurable:false`一般被预设为内置对象中，通常用于防止更改属性标志，以及属性不能被删除

```js
let foo = { name: 'foo' };

Object.defineProperty(foo, 'name', {
  configurable: false
});

// 在此之前 writable: true
Object.defineProperty(foo, 'name', {
  writable: false,
}); // TypeError: Cannot redefine property: name
```

一旦`configurable:false`时，这个属性标志就不能够再改变了，连覆盖都不行，可以用来创建一个“永不可变”的属性

```js
let foo = { name: 'foo' };

Object.defineProperty(foo, 'name', {
  writable: false,
  configurable: false
});

// 下面都是无效的
foo.name = 'foooo';
Object.defineProperty(foo, 'name', {
  value: 'foooooooo',
});
```

## getter 和 setter

对象属性有两种类型，一个是数据属性，还有一个是访问器属性。访问器属性由“getter”和“setter”方法表示，使用`get`和`set`声明

```js
let user = {
  firstName: 'f',
  lastName: 'oo',
  get fullName() {
    return this.firstName + this.lastName;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(user.fullName); // foo
user.fullName = 'b ar';
console.log(user.fullName); // bar
```

当访问`p.fullName`时，getter 会起作用，当`p.fullName`被赋值时，setter 会起作用

访问器属性的描述也是有所不同的，没有`value`和`writable`，但是有`get`和`set`

+ `get`：一个无参数的函数，读取时使用
+ `set`：一个参数的函数，写入时使用
+ `enumerable`：可被枚举
+ `configurable`：可配置属性

```js
let user = {
  firstName: 'f',
  lastName: 'oo'
};

Object.defineProperty(user, 'fullName', {
  get() {
    return this.firstName + this.lastName;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
})

console.log(user.fullName); // foo
user.fullName = 'b ar';
console.log(user.fullName); // bar
```

另外，一个对象属性不能同时是数据属性和访问器属性

getter 和 setter 的作用就是为了在取值和赋值之前进一步封装，控制和调整这些属性的行为。并且最大的好处就是处理一些兼容性，因为有的对象属性需要被保留，旧的代码不能被删掉，就可以添加一个访问器属性用来添加一个额外的属性，且旧的属性也能工作

::: tip
另外，几乎所有的键值对获取方法，都不会考虑继承属性，只会对对象自身进行操作
:::

## 总结

+ 对象是一种复杂类型，有自己的属性和方法，在字面量的情况下可以简写，方括号用于访问多词属性，属性名并不遵守标准规范
+ 可以使用`in`检测属性，使用`for...in`遍历一个对象
+ 对象是通过引用访问的，存在多个变量引用同一个对象的情况，`Object.assign()`和扩展运算符用于浅拷贝一个对象，深拷贝可以使用 JSON 方法实现，但是有局限性，最好使用一些库
+ `this`的取值取决于上下文
+ 可以用`new 构造器函数()`的方式来创建对象，在函数内部可以使用`new.target`检查函数是什么样的方式调用
+ 可选链`?.`用于解决链式调用的错误问题，当左边引用不为对象时，则返回`undefined`，并停止调用，避免代码报错
+ Symbol 用于创建唯一的数据类型，在对象中 Symbol 属性是隐藏的，无法被`for...in`遍历，而`Object.assign()`可以，`Symbol.for()`用于访问全局存在的 Symbol，`Symbol.keyFor()`返回 Symbol 的描述
+ 属性配置可以用三个标志用来控制对象的属性权限，使用`Object.getOwnPropertyDescriptor(obj, property)`的标志描述器，使用`Object.defineProperty(obj, {})`设置一个属性的标志
+ getter 和 setter 是一种特殊的属性，用于在取值或赋值前进一步的封装
