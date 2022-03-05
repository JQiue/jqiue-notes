---
title: 解构赋值
category: 编程语言
tag: [JavaScript]
article: false
---

解构赋值是一种特殊的语法，可以将数组或对象拆到单个一系列的变量中

## 数组解构

```js
let arr = ['foo', 'bar'];
let [foo, bar] = arr;

console.log(foo); // 'foo'
console.log(bar); // 'bar'
```

它只是下面这种更简单的写法：

```js
let arr = ['foo', 'bar'];
let foo = arr[0];
let bar = arr[1];

console.log(foo); // 'foo'
console.log(bar); // 'bar'
```

另外，解构赋值是绝对的按照顺序来赋值的，如果数组中有不想要的元素，可以添加额外的逗号丢弃：

```js
let arr = ['foo', '?', 'bar'];
let [foo, , bar] = arr;

console.log(foo); // 'foo'
console.log(bar); // 'bar'
```

等号右边是任何可以被迭代的对象，等号左边也可以是任何可以被赋值的东西

### rest

如果想要将后续的所有元素搜集起来，就可以使用`...`再加上一个参数来接收，它是一个数组：

```js
let arr = ['foo', 'bar', 'quz', 'qux'];
let [foo, bar, ...rest] = arr;
console.log(foo); // 'foo'
console.log(bar); // 'bar'
console.log(rest); // ['quz', 'qux']
```

### 默认值

如果变量的数量大于实际元素的数量，赋值也不会报错，只是得到一个`undefined`，但是可以通过`=`来给一个变量赋值一个默认的值

```js
let arr = ['foo', 'bar'];
let [foo, bar, quz = 'quz'] = arr;
console.log(foo); // 'foo'
console.log(bar); // 'bar'
console.log(quz); // 'quz'
```

::: tip
默认值还可以是表达式
:::

## 对象解构

对象也是可以被解构的，和数组稍微不同的是，结构的变量名只需要对应对象中的键即可，即使不按照顺序编写：

```js
let obj = { name: 'foo', age: 18, gender: 'male' };
let {name, age, gender} = obj;
console.log(name); // 'foo'
console.log(age); // 18
console.log(gender); // 'male
```

注意，不再是`[]`，而是`{}`，如果等号左边的变量无法匹配对象的键则会得到`undefined`

如果想要另起一个变量来接受属性值，则需要添加`:`来指定映射关系

```js
let obj = { name: 'foo', age: 18, gender: 'male' };
let {name: n, age: a, gender: g} = obj;
console.log(n); // 'foo'
console.log(a); // 18
console.log(g); // 'male
```

## 嵌套解构

解构赋值可以通过更复杂的匹配模式来解构更深层次的对象和数组

```js
let person = {
  foo: { name: 'foo', age: 15 },
  num: 1,
  extra: true
}

let {foo: {name, age}, num, extra} = person;

console.log(name);  // 'foo'
console.log(age);  // 15
console.log(num);  // 1
console.log(extra); // true
```

这似乎看起来就像套娃一样，但是只要左边的匹配规则遵循右边的对象就可以完全解构出来数据

## 交换值

甚至可以不需要额外的临时变量进行值的互换

```js
let a = 1, b = 2;
console.log(a, b); // 1 2
[b, a] = [a, b];
console.log(a, b); // 2 1
```

## 智能函数参数

函数在传参的时候也可以借助解构赋值

```js
let names = ['foo', 'bar'];

function show([foo, bar]) {
  console.log(foo);
  console.log(bar);
}
show(names);
```

只需要在定义函数参数的时候使用就可以了，为什么叫做智能函数参数，则是因为一个函数如果有默认参数，那么通过解构赋值的写法会让它更加简洁

## 总结

+ 解构赋值是用来将数组或对象用来拆分到单一的变量中的特殊语法
+ 解构赋值是绝对的按照顺序来赋值的，如果数组中有不想要的元素，可以添加额外的逗号丢弃
+ 如果变量的数量大于实际元素的数量，赋值也不会报错，只是得到`undefined`
+ 对象的解构必须对应对象中的键名，即使不按照顺序编写，也会正确的进行结构。如果需要另一个变量来接收，则增加`:`指定映射
+ 可以使用更复杂的匹配模式来解构更深层次的数组和对象，只要规则模式能够匹配即可
+ 函数在传参时也可以使用解构赋值拆分数组或对象
