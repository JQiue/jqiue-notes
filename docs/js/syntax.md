---
title: 基本语法
category: 编程语言
tag: [JavaScript]
article: false
---

这里是 JavaScript 基本语法规则

## 注释

```js
// 单行注释，只能注释单行

/*
多行注释
可以注释多行内容
*/
```

::: tip
不支持注释嵌套，不要在多行注释中嵌套另一个多行注释
:::

## 代码块和语句

JavaScript 采用`{}`来区分代码之间的层次以及作用域范围，当存在换行符时，大多数情况下可以省略语句的分号

JavaScript 会将换行符理解成“分号”，但有部分例外，比如在`[]`前不会被添加一个隐式的分号，运行时可能造成错误，所以最好不要省略

## 标识符

+ 由英文字母、数字、符号`$`和`_`组成，但第一个字符不能是数字
+ 不能是 JavaScript 中的关键字和保留字
+ 区分大小写

::: tip
甚至允许非英文字母，从技术上来讲，这样是没问题的，但是使用英文字母是惯例
:::

## 变量

通过关键字`var`声明，由于 JavaScript 是弱类型语言，不需要显式声明变量的数据类型且初始化，数据类型可以随意改变，通过`=`运算符赋值

```js
var foo;
var bar = 3;
```

::: danger
即使不使用`var`也可以直接使用变量名，当解释程序遇到未声明过的变量时，会用该变量名创建一个全局变量，并将其初始化为指定的值，不过这样做非常危险
:::

为了避免上述问题，在 ES6 中新增了`let`关键字，它和`var`大致相同，但`let`是最推荐的变量声明方式

```js
let foo;
let bar = 3;
```

let 和 var 的区别是：

+ `var`没有块级作用域，只有函数作用域以及全局作用域，所以它会穿透一些代码块，而`let`是具有局部作用域的
+ `var`允许同一个作用域下重新声明，而`let`是不允许的
+ `var`声明的变量会被提前，可以在声明前使用，而`let`是不会的

::: danger 变量提升
如果使用了一个未声明的变量，且在后面进行了声明，解释器会将该变量的声明进行提前。如果在声明的同时赋值，赋值操作不会被提前
:::

ES5 前不支持只读变量的定义，但可以通过`Object.defineProperty()`间接实现定义，后在 ES6 中支持以`const`关键字定义只读变量，它和`let`成为了声明变量的主要方式

```js
const PI = 3.14;
```

## 数据类型

JavaScript 有八种基本的数据类型（七种原始类型，一种复杂类型）

+ Number：代表整数和浮点数，除了常规的数字，还包括一些“特殊数值”也属于这种类型：`Infinity`,`-Infinity`,`NaN`，在 JavaScript 中做数学运算是足够安全的，不会因为任何错误而停止，最坏的情况下会得到`NaN`
+ Bigint：任意长的整数
+ String：由`'`、`"`、<code>``</code>括起来的字符序列，单引号和双引号是没什么区别的，但反引号是扩展功能，允许将变量或表达式通过`${...}`嵌入字符串中
+ Boolean：只有两个取值`true`和`false`，在适当的时候会转换为`1`和`0`
+ Null：特殊值`null`不属于任何类型，它是一个独立的类型，只有一个`null`值，JavaScript 中的`null`仅代表“无”、“空”或“未知值”的特殊值
+ Undefined：`undefined`和`null`一样是独立的类型，当一个变量未赋值时，值就是`undefined`
+ Symbol：用于唯一的标识符
+ Object：更复杂的数据结构

::: tip 不同进制的数值表示
二进制用`0b`表示  
八进制用`0`表示  
十进制不需要添加任何额外符号  
十六进制用`0x`表示
:::

### 类型检测

+ `typeof` - 返回该一个说明数据类型的字符串，支持`typeof x`和`typeof(x)`两种形式
+ `instanceof` - 检测一个对象是否为另一个对象的实例

`typeof 1 + 2 + 3`的最终结果是`number34`，这是因为`typeof`本身算一个表达式参与计算，也会考虑优先级

::: tip
如果用`typeof`检测`null`会得到`object`，这是一个设计上的错误，实际上它并不是`object`
:::

### 类型转换

大多数情况下 JavaScript 会将值转换为正确的类型，但某些时候需要将值显示的转换

+ `String(value)` - 将一个值转换为字符串类型
+ `Number(value)` - 将一个值转换为数字类型，这个值应该是一个有效数字，比如将字符串数字转化为数值数字，否则就会返回`NaN`
+ `Boolean(value)` - 将一个值转换为布尔类型，直观上是“空”（0、空串、null、undefined、NaN）的值会变成`false`，剩下的都是`null`

::: danger
包含`0`的字符串是`true`，JavaScript 中的非空字符串总是`true`
:::

## 运算符

### 数学运算

符号|作用
---|---
+|加法
-|减法
*|乘法
/|除法
%|取余
**|求幂

通常情况下加法用于求和，但是如果用于字符串，它将连接字符串，在表达式中如果有一个字符串，那么最后会转换为字符串，但运算符是按照顺序工作的

```js
1 + 1 + '1' // '21' 而不是 '111'
```

`+`有时候也可作为一元运算符，这会将值合法的转换数字类型，它的效果和`Number()`相同，但更加简短

```js
+true // 1
+"" // 0
```

### 赋值

`=`也是一个运算符，只不过优先级比较低，所以总是等到其他表达式运算完成才轮到`=`，`=`不仅仅可以赋值，也会返回一个值，这很有趣，但是不要使用这样的代码

```js
let foo = 1;
let bar = 2;
let qux = 3 - (foo = bar + 1);
console.log(foo); // 3
console.log(bar); // 0
```

当然也支持链式赋值，尽量不使用这种方式，因为可读性变差了

```js
let foo, bar;
foo = bar = 5;
console.log(foo); // 5
console.log(bar); // 5
```

不仅如此，还支持原地修改，因为经常需要对某个变量进行允许，且存储在该变量中，类似于一种“修改并赋值”的操作

```js
let foo = 2;
foo = foo + 2;
foo = foo * 2;
```

可以使用`+=`和`*=`来表示

```js
foo += 2; // 等同于 foo = foo + 2
foo *= 2; // 等同于 foo = foo * 2
```

也支持自增自减，优先级比大多数运算符高

```js
let foo = 1;
foo++;
foo--;
++foo;
--foo;
```

### 比较

所有的比较运算符返回结果都为布尔值

在进行字符串的大小比较时，会按字符逐个进行比较（字符编码）

```js
'z' > 'a' // true
'abd' > 'abc' // true
'aaa' > 'aa' // true
```

规则如下：

1. 先比较首字符的大小，如果相等进入下一步
2. 比较后面的字符，如果相等则继续向后比较，直至完成
3. 如果两个字符串的字符都用完了，则代表相等，否则未结束的字符串更大

对于不同类型的比较，会将值转换为数值再判定大小

```js
'3' > 1 // true，'3' 被转换为数字 2
'03' > 1 // true，'03' 被转换为数字 1
```

对布尔类型而言，`true`会被转换为`1`,`false`则被转换为`0`

```js
true == 1 // true
false == 0 // true
```

普通的`==`会出现一个问题，它不能区分`0`和`false`和`''`和`false`，这是因为`==`再比较时会先转换类型，如果要严格区分类型再比较就可以使用`===`

`===`不会做任何类型的转换，同样的`!==`也表示“严格不等于”

在非严格相等`==`下，`null`和`undefined`相等，但各不等于其他值

::: tip 特殊值的比较
`NaN`和`NaN`比较会返回`false`，无论是否全等，但是`null`和`undefined`进行`==`比较时会返回`true`，而进行`===`比较时会返回`false`
:::

### 逻辑运算

JavaScript 有三个逻辑运算符：`||`，`&&`，`!`，它们可以用于任何类型

`||`不仅有传统编程上的作用，在 JavaScript 中还有着更为特殊的用法

```js
let result = value1 || value2 || value3;
```

在上述示例中`||`做了这样的事：

1. 从左到右计算操作数
2. 处理操作数时，将其转换为布尔值，如果为`true`则停止计算，并返回当前操作数
3. 如果所有的操作数都是`false`，那么就返回最后一个操作数

返回的是操作数的原值，不会做任何类型转换，这个特性产生了很多有趣的用法

`&&`在传统的编程中，只有操作数都是`true`时才会返回`true`，像`||`一样，操作数可以是任意类型的值，当然它也有着特殊的用法

```js
let result = value1 && value2 && value3;
```

`&&`做了这样的事：

1. 从左到右计算操作数
2. 处理操作数时，将其转换为布尔值，如果为`false`则停止计算，并返回当前操作数
3. 如果所有的操作数都是`true`，那么就返回最后一个操作数

与`||`不同的是，`&&`会返回第一个计算为`false`的操作数

::: danger
不要用`||`或`&&`取代`if`
:::

`!`运算就更加简单了，它只接收一个参数，然后将参数转换为布尔值，并进行取反

```js
!true // false
```

使用`!!`可以将某个值转换为布尔值，也就是取反再取反

```js
!!1 // true 
```

`!`比`&&`和`||`优先级高，`||`是优先级最低的

### 空值合并

空值合并的写法为`a ?? b`，如果`a`是已定义的，则结果为`a`，如果`a`不是已定义的，则结果为`b`

通常`??`的使用场景，是为可能未定义的变量提供一个默认值

```js
let user = 'foo';
console.log(user ?? "bar");
```

`??`似乎和`||`用法相同，，但`||`是长期存在，并被长期的用于这种目的，另一方面，`??`是最近才被添加到 JavaScript 中的，他们最重要的区别是：

1. `||`返回第一个为真的值
2. `??`返回第一个已经定义的值

`||`无法区分`false`，`0`，空串，以及`null/undefined`，它无法考虑下面这种情况

```js
let height = 0;
console.log(height || 100); // 100
console.log(height ?? 100); // 0
```

这种情况使用`??`才能得出正确的结果

出于安全，JavaScript 禁止`??`和`||`以及`&&`连用，除非明确的使用括号来指定优先级

```js
let x = 1 && 2 ?? 3; // Syntax error
let y = (1 && 2) ?? 3; // ok
```

## 流程控制

### 条件分支

`if`语句和条件运算符`?`均可实现根据条件来执行不同的语句

```js
if (2 == 2) console.log('2 == 2');
```

在上面这个例子中，括号中的表达式会被转换为布尔值，为`true`则执行，`false`则不执行，这仅执行一条语句，如果想执行多条，必须将执行的语句放在`{}`中

```js
if (2 == 2) {
  console.log('1');
  console.log('2');
}
```

::: tip
当省略`{}`时，`if`只会决定紧跟后面的一条语句是否执行
:::

`if`也可以包含一个可选的`case`块，如果条件不成立，就会执行`case`代码块中的语句

```js
let age = 17;
if (age > 18) {
  console.log('成年了');
} else {
  console.log('还未成年呢');
}
```

在这个基础上还能使用`else if`产生更多的条件分支

```js
let score = 59;
if (score >= 90) {
  console.log('你太优秀了');
} else if (score >= 60) {
  console.log('刚刚及格');
} else {
  console.log('继续努力');
}
```

::: tip
最后一个`else`是可选的
:::

有时候需要更加简单的方式达到目的，而条件运算符可以帮忙做到这一点

```js
let ageFlag;
let age;
if (age > 18) {
  ageFlag = true;
} else {
  ageFlag = false;
}
```

使用`?`

```js
let age;
let ageFlag = age > 18 ? true : false;
```

条件运算符的语法是`let result = condition ? value1 : value2`，当`condition`为`true`则返回`value1`，否则返回`value2`

虽然`?`可替代`if`，但是可读性较差，当需要根据条件返回值时就使用`?`，当需要执行不同的代码结构时应该使用`if`

### 循环

JavaScript 有`while`，`do...while`，`for`三种循环结构

这是`while`的循环结构，当`condition`为真时，就会执行循环体中的语句，循环体的每一次执行叫做**迭代**

```js
while (condition) {
  // 代码
}
```

这是`do...while`的循环结构，它将检查条件移动到下方，这导致无论如何循环体都会执行一次，然后再判断条件

```js
do {
  // 代码
} while
```

`for`循环是最为复杂的，但也是最常用的

```js
for (begin; condition; step) {
  // code
}
```

它的工作步骤为：

1. 进入循环，`begin`先执行一次
2. 检查`condition`，为真则执行循环体
3. 然后执行`step`
4. 一直重复 2，3 步骤，直到`condition`不满足

在`begin`处声明的变量只对循环体可见，`for`语句中的任何语句段都可以省略，比如当`(;;)`时就是一个死循环

`break`语句用于终止整个循环，`continue`是`break`的轻量版本，不会终止整个循环，而是终止当前的迭代，并强制执行新的一轮循环

### switch

`switch`可以代替多个`if`，它比`if`描述的更加形象。`switch`至少有一个`case`代码块和一个可选的`default`代码块

```js
switch (x) {
  case 'value1':
    // code
    break;
  case 'value2':
    // code
    break;
  default:
    // code
}
```

1. `x`会先和第一个`case`的值进行比较是否严格相等，然后比较第二个，以此类推
2. 如果相等，就会执行`case`对应的代码块，直到遇到最近的`break`
3. 如果都没有符合`case`，则执行`default`代码块

`switch`和`case`允许任意表达式

::: danger
如果没有`break`，将不会检查`case`，就会执行下一个`case`中的代码块
:::

`case`也有分组的能力，这种方式导致无论`3`还是`5`都执行的相同的代码块，且没有`break`的副作用

```js
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

  case 3: // (*) 下面这两个 case 被分在一组
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;

  default:
    alert('The result is strange. Really.');
}
```

## Rest 和 Spread

在 JavaScript 中，无论函数定义了多少个参数，都可以传入任意数量的参数，且不会报错，但是只有部分参数被当作值传递，为了解决这个问题，JavaScript 支持`...`语法来将剩余的参数收集到数组中

```js
function sum (...args) {
  let result = 0;
  for (let value of args) result += value;
  return result;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

::: danger
`...`的参数必须位于函数参数列表最末尾处
:::

`...`语法还可以在调用的时候拆包一个可迭代对象用来传值

```js
function sum (...args) {
  let result = 0;
  for (let value of args) result += value;
  return result;
}

let args1 = [1, 2, 3];
let args2 = [1, 2, 3, 4, 5];

console.log(sum(...args1)); // 6
console.log(sum(...args2)); // 15
```

不仅如此，`...`也可以跟普通值混用

```js
let args = [3, 5];
console.log(sum(1, 2, ...args, 4)); // 15
```

同时展开多个可迭代对象

```js
let args1 = [1, 2, 3];
let args2 = [1, 2, 3, 4, 5];
console.log(sum(...args1, ...args2)); // 21
```

在数组中展开

```js
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
let merge = [...arr, ...arr2];
console.log(merge); // [1, 2, 3, 4, 5, 6]
```

将字符串展开为字符数组

```js
let str = 'jinqiu.wang';
let strArr = [...str];
console.log(strArr); // ['j', 'i', 'n', 'q', 'i', 'u', '.', 'w', 'a', 'n', 'g']
```

展开对象，看来像拷贝了对象，其实是一种浅拷贝

```js
let foo = { name: 'foo', age: 23 };
let fooCopy = { ...foo };
console.log(fooCopy); // { name: 'foo', age: 23 }
```

## 迭代器

迭代器的目的就是为了提供统一遍历方式，对于数组可能使用 for 或 forEach，对于对象使用 for in。而这些可以被迭代的对象本身具有一个`Symbol.iterator`方法，当调用它后就会返回一个迭代器对象，然后它具有`next()`方法用于返回每次迭代的项。但一般不会这么做，而是使用 for...of

只要具有`Symbol.iterator`，就是可遍历的，因此能够使用 for...of 统一进行遍历，比如常见的原生可遍历的有

+ 数组
+ 字符串
+ Set
+ Map
+ arguments
+ ...

反过来，没有`Symbol.iterator`即不可遍历，比如：

+ 一般对象

如果要将一个对象变成可遍历的，必须手动实现它的`Symbol.iterator`

```js
const person = {name: 'foo', age: 18};

person[Symbol.iterator] = () => {
  let index = 0;
  return {
    next() {
      index++;
      if(index === 1) {
        return { value: person.name, done: false };
      } else if (index === 2){
        return { value: person.age, done: false };
      } else {
        return {done: true}
      }
    }
  }
}

for (const iterator of person) {
  console.log(iterator); // foo, 18
}
```

## 严格模式

JavaScript 是不断发展的，但没有带来任何兼容性的问题，即使新的特性被加入，旧的特性也不会改变，这么做有利于兼容旧代码，但 JavaScript 中设计的不合理的地方也被保留了下来，这种情况一直持续到 ES5 出现

严格模式是 ES5 新增的功能，虽然 ES5 可以向后兼容，如果使用严格模式，那么将会被禁止一些不再建议使用的语法，这样消除了 JavaScript 语法的一些不合理，不严谨的地方。如果在第一行声明了`"use strict"`字符串，则代表全局范围使用严格模式，也可以在函数内的第一行中使用，这样就是局部的严格模式。严格模式的兼容性非常好，在一些不被支持的浏览器中，它只会被看作一个字符串，可以大胆使用

这是一些在严格模式下的要求：

+ 变量使用前必须提前声明，且必须使用`var`关键字，否则就会抛出错误
+ 对象的属性不能够重复，且不能对只读属性赋值
+ 函数的`arguments`是只读的，参数列表不能存在同名的
+ 不能够使用`with`语句
+ `this`不再指向全局对象
+ 不再支持八进制数值

## 总结

+ 大多数情况下可以省略语句的分号，由引擎自动添加，但有部分例外
+ 使用`var`会产生各种旧的问题，最好使用新的声明方式`let`
+ 有八种数据类型，要注意区分`null`和`undefined`
+ `+`不仅可以做数学运算，还可以连接字符串，也可以作为一元运算符转换一个值为数字类型
+ `=`不仅会赋值，也会返回一个值
+ `==`在进行比较时会尝试将值进行类型转换，而`===`则不会
+ `||`和`&&`不仅有传统上的作用，还会返回操作数，由此产生了一种替补值的用法，`??`是一种新的用来取代前两者的用法
+ 严格模式是一种对老旧的语法兼容性进行修正的模式
+ `for...in`语句以任意顺序遍历一个对象的除`Symbol`以外的可枚举属性，包括继承的可枚举属性
+ `for...of`语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
+ 当`...`出现在定义函数参数的列表时，它就是 rest
+ 当`...`出现在表达式中，它就是 spread
