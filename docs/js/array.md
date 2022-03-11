---
title: 数组
category: 编程语言
tag: [JavaScript]
---

虽然对象允许储存数据，但对象中的属性是没有顺序的，有很多时候需要一个有序集合的结构，里面的元素是按照顺序排列的，数组（Array）就是这样的结构

## 声明和访问

创建数组有两种方式：

```js
// 使用构造函数
let arr = new Array();
// 字面量
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
let arr = [1, 'zs', {name: 'foo'}, true, [], function() {} ];
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

## 空位

允许数组的某个位置是空元素，即两个逗号之间没有任何值，如果对空位进行访问，将会得到`undefined`

```js
[1, ,2]
```

空位不会影响`length`属性的计算，因为 JavaScript 认为该空位虽然没有值，但仍然是有效的

```js
let arr = [1, ,2];
console.log(arr.length); //3
```

需要注意的是，最后一个元素后面有逗号时，并不能产生空位

```js
let arr = [1, ,2,];
console.log(arr.length); //3
```

使用`delete`删除一个元素，也会形成空位

```js
let arr = [1, 2, 3];
delete arr[1];
console.log(arr.length); //3
```

空位和`undefined`是不一样的，空位会被`forEach`方法，`for...in`、以及`Object.keys`方法跳过

## 数组是一种特殊的对象

使用方括号访问元素实际上是来自对象的语法，数组扩展了对象，提供了特殊的方法来处理有序的数据集合以及`lenght`属性，从本质上来讲，数组就是一个对象

数组真正特殊的就是内部实现，JavaScript 尝试将元素一个接一个的存储在连续的内存区域，还有一些其他的优化，使得数组运行的很快

一定要将数组当作“有序集合”来使用，而不是当作常规对象一样使用，否则针对数组的优化将不会存在

使用`typeof []`判断数组会返回一个`object`字符串，为了区分对象和数组应该使用`Array.isArray()`来进行判断

## 类似于数组一样的对象

如果一个对象的所有键都是正整数或`0`，且拥有`length`属性，那么这个对象就很像数组，在语法上被称为**类数组**

```js
let obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0];  // a
obj[1];  // b
obj[2];  // c
obj.length;  3

obj.push('d'); // error，报错
```

但是，仅仅只是像而已，因为它并不会拥有数组特有的方法，同时类数组的`length`不会随着成员变化而变化

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

因为数组也是对象，使用`for...in`也是可以的，但通常不使用它来遍历数组，因为它会遍历所有的属性，不仅仅只有元素，比如“类数组”

```js
let arr = [1, 2, 3];

for (let item in arr) {
  console.log(item);
}
```

原型上也提供了几个遍历方法：

+ `arr.forEach(callback(item, index, array))`：为每个元素运行一个函数
+ `arr.map(callback(item, index, array))`：将返回值得结果添加到新的数组，并将整个数组返回

从性能来讲，遍历效率最高的依次是：`for > forEach > for...of > map > for...in`

## 多维数组

数组中的元素当然也可以是数组，因此可以实现矩阵：

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

## 使用迭代器进行访问

ES6 为 Array 增加了一个“iterator”属性，通过`Symbol.iterator`访问，因此可以调用迭代器的方法来进行访问

```js
let arr = [1, 2, 3, 4];

const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
```

## 类型数组

由于 JavaScript 数组不是强类型的，这导致它可以存储任意类型的元素，而类型数组则用于单一类型的数据，类型数组是一种新的补充，建立在 ArrayBuffer 的基础上，作用是分配一款连续的内存空间，语法是`let arr = new TypeArray(length)`，`TypeArray`可以替换下表中的之一

可用的类型数组 | 数据类型
---|---
Int8Array | 8 位二进制补码整数
Uint8Array | 8 位无符号整数
Uint8ClampedArray | 8 位无符号整数
Int16Array | 16 位二进制补码整数
Uint16Array | 16 位无符号整数
Int32Array | 32 位二进制补码整数
Uint32Array | 32 位无符号整数
Float32Array | 32 位 IEEE 浮点数
Float64Array | 64 位 IEEE 浮点

```js
let int16 = new Int16Array(5);
int16[0] = 1;
int16[1] = 2;
int16[2] = 3;
int16[3] = 4;
int16[4] = 5;
console.log(int16);
```

常常用来处理一些二进制数据，使用起来和普通数组是一致的

<!-- to be updated -->

## 方法

JavaScript 中的数组既可以是队列，也可以是栈

队列方法

+ `arr.shift()`：数组首端取出一个元素
+ `arr.unshift(value)`：数组首端添加一个元素，返回新的长度

栈方法

+ `arr.pop()`：数组末端删除一个元素
+ `arr.push(value)`：数组末端添加一个元素，返回新的长度

分割

+ `arr.splice(start, num, element1, ...)`：从 start 开始，删除 num 个元素，并用 element1 以及更多元素替换，返回由删除元素组成的数组，会改变原有数组
+ `arr.slice(start, end)`，返回从 start 开始到 end（不包含）索引之间的元素数组，不会更改，只是一种浅拷贝
+ `str.split(delim)`：通过`delim`分隔符将一个字符串分割成一个数组

::: tip
splice 和 slice 还支持反向索引，从 -1 开始
:::

合并

+ `arr.concat(arg1, ...)`：用于合并来自其他数组和其他的值，并返回一个新的数组，只复制数组中的元素，如果看起来像数组则会被当作整体添加
+ `arr.join(glue)`：将数组通过`glue`连接成一个字符串，`glue`是可选的

转换

+ `arr.keys()`：返回一个由索引组成的可迭代对象
+ `arr.values()`：返回一个由元素组成的可迭代对象
+ `Array.from(arrayLike)`：从一个类数组或可迭代对象中创建一个新的浅拷贝数组

查找

+ `arr.indexOf(item, from)`：从 from 处从左向右搜索元素，找不到返回 -1
+ `arr.lastIndexOf(item, from)`：和上面一样，只不过是从右到左
+ `arr.includes(item, from)`：从 from 处开始搜索 item，找到就返回 true

排序

+ `arr.sort(callback(a, b))`：对数组进行原位排序，在默认情况下，是将每一个元素看作字符串排序的，如果要按照自己的规则排序，应该提供一个执行比较的排序函数，规则是 a 代表前一项元素，b 代表后一项元素，如果需要交换位置，则返回任意的正数，否则返回负数，比如`arr.sort((a, b) => a - b)`则是从小到大排序
+ `arr.reverse()`：反转数组元素的索引顺序，会改变原数组

::: tip
sort 方法实现了通用的排序算法
:::

其他方法

+ `arr.forEach(callback(item, index, array))`：为每个元素运行一个函数
+ `arr.map(callback(item, index, array))`：将返回值得结果添加到新的数组，并将整个数组返回
+ `arr.find(callback(item, index, array))`：执行一个函数，如果该元素满足条件，则返回该元素，否则返回`undefined`
+ `arr.findIndex(callback(value, index, array))`：返回测试通过的第一个元素的索引，否则返回 -1
+ `arr.filter(callback(item, index, array))`：执行一个函数，如果返回 true，就将 item 添加到一个数组中并继续迭代，迭代完成后返回数组
+ `arr.reduce(callback(previousValue, item, index, array), initial)`：和`forEach/map`不同的是，函数会将返回的结果传给下一个函数的第一个参数 previousValue，如果传入了 initial，则 previousValue 的值会从 initial 开始，返回累计处理的结果
+ `arr.some(callback(item, index, array))`：当至少有一个元素通过了函数的测试就会返回 true
+ `arr.every(callback(item, index, array))`：当全部元素通过了函数的测试就会返回 true
+ `arr.fill(value, start, end)`：从 start 到 end 用重复的 value 填充
+ `arr.flat(depath)`：按照一个指定的深度递归遍历数组，并将所有的元素合并为一个新的数组
+ `Array.isArray(arr)`：检查 arr 是否为一个数组

会修改原数组的方法有：splice、sort、reverse、push、pop、shift、unshift

## 手写一个数组的深克隆拷贝算法

由于 JavaScript 数组的项可能是基本类型也可能是引用类型，所以要判断一下项的类型

```js
function clone(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    // 如果数据项是数组，则递归
    if(Array.is(array[i])) {
      clone(array[i]);
    } else {
      // 数据项不是数组则拷贝
      resutl.push(array[i]);
    }
  }
  return result;
}
```

## 总结

+ JavaScript 数组是可变长度的，并且能够存储不同类型的元素
+ `length`是数组的一个属性，返回`索引 + 1`的数，会随着数组的变换而变化，并且是可写的，一旦写入小于当前`length`就会发生截断，并且不可逆
+ 数组允许空位存在，即在两个值之间可以有一个不存在的位置，没有任何东西，不会影响`length`计算，`delete`删除一个元素就会产生空位，空位会被各种遍历方法跳过
+ 类数组只是看起来像数组的对象，没有数组的方法
+ 数组的元素可以是数组
+ 最好不要使用`for...in`遍历数组，而是使用`for...of`，因为它能够区分数组和类数组
+ 数组可以被转换为一个迭代器对象进行遍历

<!-- to be updated -->