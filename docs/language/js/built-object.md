---
title: 常用的内置对象
category: 编程语言
tag: Javascript
author: JQiue
article: false
---

这里是 JavaScript 中提供的一些工具对象

## 日期和时间

一个时间对象是由`Date`构造函数产生的，如果不带参数会表示当前的日期和时间

```js
console.log(new Date()); // 显示当前的日期和时间
```

如果传入了一个整数，则表示 1970 年 1 月 1 日 UTC+0 之后经过的毫秒数

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

`Date`也提供了各种方法来访问年月等信息

+ getFullYear()
+ getMonth()
+ getDate()
+ getDay()
+ getHours()，getMinutes()，getSeconds()，getMilliseconds()
+ setFullYear()
+ setMonth()
+ setDate()
+ setHours(hour)，setMinutes(min)，setSeconds(sec)，setMilliseconds(ms)

Date 对象还会自动校准，如果设置了超出范围的值，会自动校准，比如：

```js
console.log(new Date(2021, 0, 33)); // 2021-02-01
```

这说明超出的时间会被自动分配，这个特性通常用来获取给定时间段后的日期

当 Date 转换为数字时，得到的是对应的时间戳，有一个非常重要的作用，可以用来相减测量某个代码的执行时间

```js
let start = new Date(); // 开始测量时间


for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // 结束测量时间

alert( `The loop took ${end - start} ms` );
```

如果想要测量时间间隔，也可以用`Date.now()`，它同样返回的是当前的时间戳，但是它不会创建中间对象，因此程序的速度更快

`Date.parse(str)`方法可以从一个字符串中读取日期，但是字符串的格式应该为：`YYYY-MM-DDTHH:mm:ss:sssZ`，这样该方法会返回该时间段的时间戳，因此可以通过该方法来立即创建一个对象

```js
let date = new Date(Date.parse('2021-06-21T23:30:00'))
```

::: tip
`T`代表分隔符，`Z`代表 UTC + 0 时区
:::

## Math

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

## RegExp
