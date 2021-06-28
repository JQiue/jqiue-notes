---
title: Map 和 Set
category: 编程语言
tag: JavaScript
author: JQiue
article: false
---

## Map

map 是一个带键的数据集合，就像`object`一样，但是它们最大的区别就是，map 允许使用任何类型的键

```js
let map = new Map();
map.set('1', 'str');
map.set(1, 'num');
map.set(true, 'bool');

let user = {}
map.set(user, 'object');

map.get('1'); // 'str'
map.get(1);  // 'num'
map.get(true); // 'bool'
map.get(user); // 'object'
```

这是 map 方法和属性：

+ new Map(iterable)
+ map.set(key, value)
+ map.get(key)
+ map.has(key)
+ map.delete(key)
+ map.clear()
+ map.keys()
+ map.values()
+ map.entries()
+ map.forEach(callback(value, key, map)))
+ map.size

另外，`map.set()`调用会返回 map 本身，因此可以链式调用：

```js
map.set().set().set();
```

当创建一个 map 后，可以传入一个带有键值对的可迭代对象来初始化：

```js
let map = new Map([
  ['1', 'str'],
  [1, 'num'],
  [true, 'bool'],
])
```

如果想从一个对象来创建 map，只需要通过`Object.entries(obj)`即可创建，因为该方法会将对象转换为符合 map 格式的键值对

另外，如果想将一个 map 转换为对象，也可以通过`Object.fromEntries(map)`来创建

## Set

Set 是一个没有键的数据集合，它的值是唯一的，即使重复添加

```js
let set = new Set();

set.add('foo');
set.add('bar');
set.add('qux');

for (const i of set){
  console.log(i);
}
```

它的属性和方法有：

+ new Set(iterable)
+ set.add(value)
+ set.delete(value)
+ set.has(value)
+ set.forEach(callback(value, value, set))
+ set.keys()
+ set.values()
+ set.clear()
+ set.size

forEach 的回调出现了相同的参数，这是为了和 map 兼容，虽然看来有点奇怪，这导致 map 中用于迭代的方法对 set 也有用

## 弱映射（WeakMap）和弱集合（Weak'Set）

JavaScript 在值被引用时会将其保留在内存中，除非引用指向 null：

```js
let foo = {};

// 引用为 null 时，{} 会被回收
foo = null
```

通常，当对象、数组这类数据结构在内存中时，元素都是可以被访问的，如果一个对象被放到数组中，只要这个数组存在，对象就存在，即使没有其他的引用：

```js
let foo = {};
// 数组保存了 foo 引用的对象，即使覆盖了引用，对象也不会被回收
let arr = [foo];
foo = null;
```

因此，如果将对象作为 map 的键，那么 map 存在，对象也就存在

WeakMap 和 map 的区别就是，必须以对象作为键：

```js
let foo = {};
let weakMap = new weakMap();
weakMap.set(foo, '...');

// foo 引用的对象被回收了
foo = null;
```

和常规的 map，相比，如果一个对象只作为 WeakMap 的键而存在，那么它就会被回收

WeakMap 不支持迭代以及`keys()`，`values()`，`entries()`方法，因为它无法确定数据项是否存在，导致元素的数量是未知的，它只支持下面的方法：

+ get(key)
+ set(key, value)
+ delete(key)
+ has(key)

WeakMap 的主要应用场景是“额外数据的存储”和“数据的缓存”

WeakSet 的表现和 WeakMap 一致，只能添加对象进去，当失去了其他地方的引用时，元素就会被回收，也不可迭代

WeakMap 和 WeakSet 最明显的局限性就是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是并不会阻止 WeakMap/WeakSet 完成其主要工作 — 成为在其它地方管理/存储“额外”的对象数据
