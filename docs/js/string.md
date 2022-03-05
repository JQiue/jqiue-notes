---
title: 字符串
category: Web
tag: [JavaScript]
article: false
---

## 不可变

## 模板字符串

模板字符串是一种增强的字符串写法，使用``` ` ```来标记，用来解决字符串拼接麻烦的问题，

```js
let name = 'JQiue';
console.log(`I'm ${JQiue}`); // I'm JQiue
```

并且可以在模板字符串中嵌入表达式，使用`${expression}`

```js
console.log(`${1 + 2}`); // 2
```

解决多行字符串的问题，新插入的行都会成为模板字符串的部分

```js
console.log(`
Hello
I'm JQiue
`);
```

在一个函数后使用模板字符串，就能够用函数解析模板字符串，然后在函数中返回想要返回的东西，这是一个非常高级的功能

```js
function tags(strings, name, age) {
  console.log(strings, name, age); // [ "I'm ", ',', ' this year' ] JQiue 22
}

tags `I'm ${'JQiue'},${22} this year`
```

## 方法

查找：

+ `str.indexOf(str, fromIndex)`：返回指定值第一次出现的索引
+ `str.lastIndexOf(str)`：返回指定值最后一次出现的索引
+ `str.chatAt(index)`：返回在指定位置的字符
+ `str.match(reg)`：返回一个字符串匹配正则表达式的结果
+ `str.search(reg)`：执行正则表达式和 String 对象之间的一个搜索匹配
+ `str.includes(str, fromIndex)`：是否包含指定参数

截取：

+ `str.slice(start, end)`：提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
+ `str.substring(start， end)`：返回一个字符串在开始索引到结束索引之间的一个子集
+ `str.trim()`：删除字符串两端的空白

替换：

+ `str.replace(reg|substr, newSubStr)`：返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串

转换：

+ `str.toLowerCase()`：转换为小写
+ `str.toUpperCase()`：转换为大写
+ `str.split(reg|separator)`：使用指定的分割符，将字符串分割成数组

其他：

+ `str.toString()`：返回指定对象的字符串形式
+ `str.valueOf()`：字符串对象转换为其对应的基本字符串
+ `str.concat(str1, str2, ...)`：连接字符串
+ `str.repeat(conut)`：返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本
+ `str.toSource()`：返回对象的源代码

## 总结
