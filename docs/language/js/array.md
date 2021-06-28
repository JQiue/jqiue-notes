---
title: 数组
category: 编程语言
tag: JavaScript
author: JQiue
article: false
---


虽然对象允许储存数据，但对象中的属性是没有顺序的，有很多时候需要一个有序集合的结构，里面的元素是按照顺序排列的，数组（Array）就是这样的结构

## 声明

创建数组有两种语法：

```js
let arr = new Array();
let arr = [];
```

通常使用第二种方式，可以在`[]`添加初始的元素：

```js
let names = ['zs', 'ls', 'ww'];
```

并通过下标访问对应的元素，从`0`开始

```js
names[0]; // 'zs'
names[1]; // 'ww'
```

甚至可以替换元素

```js
names[2] = 'zz'; // ['zs', 'ls', 'zz']
```

也可以新增一个元素

```js
nams[3] = 'zq'; // ['zs', 'ls', 'zz', 'zq']
```

且可以存储任何类型的元素

```js
let arr = [1, 'zs', {name: 'foo'}, true , function(){} ];
```

## length

`length`不是数组的长度，而是最大索引值加`1`，会随着数组的修改而自动更新，准确来说它不是数组中元素的个数，比如一个数组的索引值很大，那么它的`length`也很大

```js
let arr = [1, 2, 3];
arr[10] = 10;
console.log(arr.length); // 11
```

最妙的是，`length`还是可写的，如果减少了它，数组就会发生截断现象，且不可逆

```js
let arr = [1, 2, 3, 4, 5];
console.log(arr[2]); // 3 
arr.length = 2;
console.log(arr); // [1, 2]
arr.length = 5;
console.log(arr[2]); // undefined 
```

所以清空数组最好的方式就是`arr.length = 0;`

## 数组是一种特殊的对象

使用方括号访问元素实际上是来自对象的语法，数组扩展了对象，提供了特殊的方法来处理有序的数据集合以及`lenght`属性，从本质上来讲，数组就是一个对象

数组真正特殊的就是内部实现，JavaScript 尝试将元素一个接一个的存储在连续的内存区域，还有一些其他的优化，使得数组运行的很快

一定要将数组当作“有序集合”来使用，而不是当作常规对象一样使用，否则针对数组的优化将不会存在

## 遍历

可以使用传统的`for`循环遍历数组：

```js
let arr = [1, 2, 3];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

JavaScript 也提供了另一种循环方式：`for...of`，尽管它和`for...in`有点像，但是它不能获取当前元素的索引，只是获取元素值

```js
let arr = [1, 2, 3];

for (let item of arr) {
  console.log(item);
}
```

因为数组也是对象，使用`for...in`也是可以的

```js
let arr = [1, 2, 3];

for (let item in arr) {
  console.log(item);
}
```

但通常不使用它来遍历数组，因为它会遍历所有的属性，不仅仅只有元素，比如“类数组”

::: tip
“类数组”只是看起来像数组一样的对象，也具有`length`和索引属性，但是也有其他非数字的数以及方法，`for...in`会将“类数组”对象中的所有属性遍历出来
:::

## 多维数组

数组中的元素当然也可以是数组，因此可以用于多维数组种，比如矩阵：

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

## 方法

队列方法

+ `shift`：数组首端取出一个元素
+ `unshift`：数组首端添加一个元素

栈方法

+ `pop`：数组末端取出一个元素
+ `push`：数组末端添加一个元素

JavaScript 中的数组既可以是队列，也可以是栈

+ `splice(start, num, element1, ...)`：从 start 开始，删除 num 个元素，并用 element1 以及更多元素替换，然后返回所有删除的元素
+ `slice(start, end)`，返回从 start 开始到 end（不包含） 索引之间的元素

::: tip
splice 和 slice 还支持反向索引，从 -1 开始
:::

+ `concat(arg1, ...)`：用于合并来自其他数组和其他的值，并返回一个新的数组，只复制数组中的元素，如果看起来像数组则会被当作整体添加
+ `forEach(callback(item, index, array))`：为每个元素运行一个函数
+ `indexOf(item, from)`：从 from 处从左向右搜索元素，找不到返回 -1
+ `lastIndexOf(item, from)`：和上面一样，只不过是从右到左
+ `includes(item, from)`：从 from 处开始搜索 item，找到就返回 true
+ `find(callback(item, index, array))`：如果返回 true，则停止迭代并返回 item
+ `filter(callback(item, index, array))`：如果返回 true，就将 item 添加到一个数组中并继续迭代，迭代完成后返回数组
+ `map(callback(item, index, array))`：返回后的结果会替换当前元素的位置，并将整个数组返回
+ `sort(callback())`：对数组进行原位排序，并不返回新的数组，在默认情况下，是将每一个元素看作字符串排序的，如果要按照自己的规则排序，应该提供一个执行比较的排序函数，比如`arr.sort((a, b) => a - b)`则是从小到大排序

::: tip
sort 方法实现了通用的排序算法
:::

+ `reverse()`：反转数组元素的索引顺序
+ `str.split(delim)`：通过`delim`分隔符将一个字符串分割成一个数组
+ `join(glue)`：将数组通过`glue`连接成一个字符串
+ `reduce(callback(previousValue, item, index, array), initial)`：和`forEach/map`不同的是，函数会将返回的结果传给下一个函数的第一个参数 previousValue，如果传入了 initial，则 previousValue 的值会从 initial 开始
+ `some(callback(item, index, array))`：当至少有一个元素通过了函数的测试就会返回 true
+ `every(callback(item, index, array))`：当全部元素通过了函数的测试就会返回 true
+ `Array.isArray(arr)`：检查 arr 是否为一个数组
+ `fill(value, start, end)`：从 start 到 end 用重复的 value 填充
+ `flat(depath)`：按照一个指定的深度递归遍历数组，并将所有的元素合并为一个新的数组
