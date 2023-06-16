---
title: 标准功能
category: 编程语言
tag: [JavaScript]
article: false
---

这里是 JavaScript 中提供的一些标准功能

## 包装对象

很多语言都有包装对象的设计，目的是为了让基本类型获得构造函数上的方法

+ `String()`：将一个字符串转换为字符串对象，如果是`undefined`则返回`undefined`
+ `Number()`：将一个数值转换为数值对象，如果是`undefined`则返回`NaN`
+ `Boolean()`：将一个布尔值转换为布尔对象

## Math

`Math`是用来进行数值运算的对象，它不是构造器

+ Math.PI
+ Math.pow(x, y)：返回 x 的 y 次幂
+ Math.sqrt(x)：返回 x 的平方根
+ Math.ceil(x)：返回大于或等于 x 的最小整数
+ Math.floor(x)：返回小于或等于 x 的最大整数
+ Math.round(x)：返回四舍五入后最接近的整数
+ Math.random()：返回包括 0 到不包括 1 之间的浮点数
+ Math.abs(x)：返回 x 的绝对值
+ Math.max(value1, value2, ...)：返回一组数中的最大值
+ Math.min(value1, value2, ...)：返回一组数中的最小值

## 时间

一个时间对象是由`Date`构造函数产生的，如果不带参数会表示当前的日期和时间

```js
console.log(new Date()); // 显示当前的日期和时间
```

如果传入了一个整数`n`，则表示 1970 年 1 月 1 日 UTC + `n` 之后经过的毫秒数

```js
console.log(new Date(0)) // 1970-01-01T00:00:00.000Z
console.log(new Date(1000)) // 1970-01-01T00:00:1.000Z
```

如果传入了一个字符串，它会自动解析

```js
console.log(new Date("2021-6-21")); // 2021-06-20T16:00:00.000Z or 2021-06-21T11:00:00.000Z
```

如果没有传入时间，则会按照格林尼治标准时间的午夜来设定时间，并根据运行代码后的时区进行调整

当`new Date(year, month, date, hours, minutes, seconds, ms)`是这种形式时，就会根据给定参数创建日期和时间，其中前两个参数是必须的：

+ year 必须是四位数
+ month 从 0（一月）开始，到 11（十二月）结束
+ date 是当月的某一天，如果缺失默认为 1
+ 如果 hours/minutes/seconds/ms 缺失则默认为 0

时间对象也提供了各种方法来访问年月等信息

+ getFullYear()
+ getMonth()
+ getDate()
+ getDay()
+ getHours()，getMinutes()，getSeconds()，getMilliseconds()
+ setFullYear()
+ setMonth()
+ setDate()
+ setHours(hour)，setMinutes(min)，setSeconds(sec)，setMilliseconds(ms)
+ getTime() - 时间戳

时间对象还会自动校准，如果设置了超出范围的值，会自动校准，比如：

```js
console.log(new Date(2021, 0, 33)); // 2021-02-01
```

这说明超出的时间会被自动分配，这个特性通常用来获取给定时间段后的日期

当事件对象转换为数字时，得到的是对应的时间戳，有一个非常重要的作用，可以用来相减测量某个代码的执行时间

```js
let start = new Date(); // 开始测量时间

for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // 结束测量时间

alert( `The loop took ${end - start} ms` );
```

如果想要测量时间间隔，也可以用`Date.now()`，它同样返回的是当前的时间戳，但是它不会创建中间对象，因此程序的速度更快

`Date.parse(str)`可以从一个字符串中读取日期，但是字符串的格式应该为：`YYYY-MM-DDTHH:mm:ss:sssZ`，这样该方法会返回该时间段的时间戳，因此可以通过该方法来立即创建一个对象

```js
let date = new Date(Date.parse('2021-06-21T23:30:00'))
```

::: tip
`T`代表分隔符，`Z`代表 UTC + 0 时区
:::

这是一个求出高考时间的小例子：

::: normal-demo 高考时间

```html
<h1>高考倒计时：<span></span></h1>
```

```js
let h1 = document.querySelector('h1');
let span = document.querySelector('span');

setInterval(() => {
  let nd = new Date();
  let td = new Date(new Date().getFullYear(), 5, 7);
  let diff = td - nd;
  let day = parseInt(diff / (1000 * 60 * 60 * 24));
  let hours = parseInt(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  let minutes = parseInt(diff % (1000 * 60 * 60) / (1000 * 60));
  let seconds = parseInt(diff % (1000 * 60 * 60) % (1000 * 60) / 1000);
  span.textContent = `${day}天${hours}小时${minutes}分钟${seconds}秒`;
}, 1000);
```

:::

## JSON

JSON 是表示值和对象的通用格式，它是为 JavaScript 而设计的，但是很多语言都有用来处理它的库，通常用来进行数据交换，JavaScript 提供了下列方法用来处理 JSON 数据：

+ JSON.stringify()：将对象转换为 JSON
+ JSON.parse()：将 JSON 转换为对象

```js
let foo = {
  name: 'foo',
  age: 18,
  wife: null
}

console.log(JSON.stringify(foo)); // {"name":"foo","age":18,"wife":null}
```

得到的 JSON 字符串是一个被称为 JSON 编码的对象，和普通对象区别在于：

1. 对象的键会被处理成双引号
2. 且所有的字符串都转换为双引号

JSON 是一种语言无关的数据规范，一些特殊的对象属性会被`JSON.stringify()`跳过：

1. 函数属性
2. Symbol 属性
3. 值为`undefined`的属性

JSON 也支持嵌套转换，另外，`stringify`其实支持三个参数，第一个参数是需要被编码的值，第二个是用于指定要编码的属性，第三个是用于格式化空格的数量

```js
let foo = {
  name: 'foo',
  age: 18,
  wife: null,
  room: {
    number: 23,
    participants: ['foo', 'ann']
  }
}

// 仅对 name 和 age 键进行编码
console.log(JSON.stringify(foo, ['name', 'age'])); // {"name":"foo","age":18}


// 缩进 2 个空格
console.log(JSON.stringify(foo, ['name', 'age']), 2); 
/* 
{
  "name": "foo",
  "age": 18
}
 */
```

JSON 也支持自定义的格式，就像`toString`一样，只要为对象添加`toJSON`方法，如果可用，那么`JSON.stringify`就会调用它

```js
let foo = {
  name: 'foo',
  age: 18,
  wife: null,
  toJSON() {
    return '1'
  }
}

console.log(JSON.stringify(foo)); // "1"
```

如果想要解码 JSON 对象就要用到`JSON.parse`

```js
let str = '{"name":"foo","age":18,"tag":["person","student"]}';
let foo = JSON.parse(str);
console.log(foo); // { name: 'foo', age: 18, tag: [ 'person', 'student' ] }
```

如果 JSON 中包含日期，会被解析为字符串，而不是日期对象

```js
let str = '{"name":"foo","age":18,"tag":["person","student"],"date":"2021-06-21T12:00:00"}';
let foo = JSON.parse(str);
// 此时的 date 是一个字符串
console.lot(foo.date.getFullYear()) // TypeError
```

因此就必须借助第二个参数来对转换值进行映射：

```js
let str = '{"name":"foo","age":18,"tag":["person","student"],"date":"2021-06-21T12:00:00"}';
let foo = JSON.parse(str, function(key, value) {
  // 当 key 为 date 时进行值类型的转换
  if (key == 'date') return new Date(value);
  return value;
});
// 此时的 date 是一个日期对象，可以正常调用
console.lot(foo.date.getFullYear()) // 2021
```

## 正则表达式

在 JavaScript中，正则表达式也是对象，可以使用两种方式来创建一个正则表达式。两种方式都是等价的，在实际应用中，通常使用字面量表达式，构建时还可以添加第二个参数，表示修饰符

```js
// 字面量
const re1 = /abc/i;
// 构造函数
const re2 = new RegExp('abc', 'i');
```

正则对象有修饰符相关属性

+ `ignoreCase`：是否设置了`i`
+ `global`：是否设置了`g`
+ `multiline`：是否设置了`m`
+ `flags`：返回包含已设置的修饰符，按字母排序

```js
const reg = /abc/igm;
console.log(reg.ignoreCase); // true
console.log(reg.global); // true
console.log(reg.multiline); // true
console.log(reg.flags);  // gim
```

与修饰符无关的属性

+ `lastIndex`：表示下一次搜索的位置
+ `source`：返回正则表达式的字符串形式，不包括反斜杠

实例方法

+ `test(str)`：是否能匹配当前字符串
+ `exec(str)`：返回匹配结果

```js
let reg = /a/;
reg.test('abcabc'); // true
```

如果带有`g`修饰符，每一次`test`方法都会从上一次结束位置开始向后匹配

```js
let reg = /a/g;
reg.test(reg.lastIndex, 'abcabc'); // 0, true
reg.test(reg.lastIndex, 'abcabc'); // 1, true 
reg.test(reg.lastIndex, 'abcabc'); // 4, false
```

带有`g`修饰符时，正则对象的`lastIndex`可以指定开始搜索的位置

`exec`方法会返回一个数组，成员是匹配成功的字符串，否则返回`null`

```js
let reg = /a/;
reg.exec('abcabc'); // [ 'a', index: 0, input: 'abcabc', groups: undefined ]
reg.exec('bcd'); // null
```

成功时还包含两个属性

+ `input`：匹配到的字符串
+ `index`：匹配成功的开始位置

如果正则表达式加上了`g`修饰符，就可以使用多次`exec`方法，下一次搜索的位置从上一次匹配成功结束的位置开始

```js
let reg = /a/g;
reg.exec('abcabc');
```

所以在`g`修饰符允许匹配多次的情况下，可以利用循环完成全部匹配

对一个正则对象使用`typeof`会得到`object`
<!-- more -->

## eval

`eval()`是一个很强大的函数，它的作用是计算一个字符串，并转换为对应的表达式或语句执行，它本身并不返回什么数据，目的就是执行字符串中的表达式或语句

```js
let foo = 2;
eval('f' + 'oo'); // 会变成 foo，并访问 foo 变量的值返回
eval('console.log("bar")'); // 输出 bar
```

## URI

JavaScript 提供了用来处理 URI 的函数

+ `encodeURI()`用于将一个字符串编码成一个有效的 URI
+ `decodeURI()`则是对已经编码的字符串进行解码
+ `encodeURIComponent()`和`decodeURIComponent()`也是如此，它们区别在于编码和解码的特殊字符

```js
let strURI = 'https://jinqiu.wang/index?foo=张三&bar=33';
encodeURI(strURI); // https://jinqiu.wang/index?foo=%E5%BC%A0%E4%B8%89&bar=33
decodeURI(encodeURI(strURI)); // https://jinqiu.wang/index?foo=张三&bar=33
encodeURIComponent(strURI); // https%3A%2F%2Fjinqiu.wang%2Findex%3Ffoo%3D%E5%BC%A0%E4%B8%89%26bar%3D33
decodeURIComponent(encodeURIComponent(strURI)); // https://jinqiu.wang/index?foo=张三&bar=33
```

这对于向服务器发送数据有用，因为用户输入的数据可能包含一些非法的数据导致服务器无法解析，所以要进行编码

## 类型转换

+ `parseFloat()`：将一个字符串转换为浮点数，而且会解析字符串中的数字，直到不是数字部分的字符。如果字符串不是以一个有效的数字开头，则返回`NaN`，有效数字前的空格会被忽略
+ `parseInt()`：将一个字符串转换为整数，而且会解析字符串中的数字，直到不是数字部分的字符。如果字符串不是以一个有效的数字开头，则返回`NaN`，有效数字前的空格会被忽略

```js
let foo = '2.3';
let bar = '174cm';
let qux = 'hello';

parseFloat(foo); // 2.3
parseFloat(bar); // 174
parseFloat(qux); // NaN
```

## 判断

+ `isFinite()`：判断一个数值是否为有限数，是就返回`true`
+ `isNaN()`：判断一个数值是否不是数字，是就是返回`true`
