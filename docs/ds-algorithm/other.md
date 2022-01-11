---
title: 其它结构
category: 数据结构与算法
tags: [集合, 字典, 哈希表]
author: JQiue
article: false
---

## 集合

集合是由一组无序且唯一（即不能重复）的项组成的，该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中，集合中没有顺序概念

<CodeGroup>

<CodeGroupItem title="JavaScript">

```js
class Set {
  constructor() {
    this.items = {};
  }
  has(element) {
    return element in this.items;
  }
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
  union(set) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    set.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  intersection(set) {
    const intersectionSet = new Set();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (set.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  }
  difference(set) {
    const differenceSet = new Set();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!set.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  }
  isSubSetOf(set) {
    if(this.size() > set.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every(value => {
      if(!set.has(value)){
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
}
```

</CodeGroup>

</CodeGroupItem>

### 多重集

一般的集合只能计算元素有或者没有，但多重集可以计算同一个元素出现的次数，一个元素在多重集中出现的次数被称为重复度

## 字典

字典中，存储的是键值对，其中键名是用来查询特定元素的。字典和集合很相似，集合以值的形式存储元素，字典则是以键值的形式来存储元素。字典也称作映射、符号表或关联数组，在计算机科学中，字典经常用来保存对象的引用地址

<CodeGroup>

<CodeGroupItem title="JavaScript">

```js
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor() {
    this.table = {};
  }
  /* 使用字符串作为键名是最理想的，JavaScript 不是强类型，需要一个函数保证键是字符串 */
  defaultToString(item) {
    if (item === null) {
      return 'NULL';
    } else if (item === undefined) {
      return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`;
    }
    return item.toString();
  }
  hasKey(key) {
    return this.table[this.defaultToString(key)] != null;
  }
  set(key, value) {
    if (key != null && value != null) {
      // 转换
      const tableKey = this.defaultToString(key);
      // 构造一个键值对
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.defaultToString(key)];
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.defaultToString(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  /* 以数组形式返回所有的键值对 */
  keyValues() {
    const valuePairs = [];
    for (const key in this.table) {
      valuePairs.push(this.table[key]);
    }
    return valuePairs;
  }
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  clear() {
    this.table = {};
  }
  size() {
    return Object.keys(this.table).length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
```

</CodeGroup>

</CodeGroupItem>

## 散列表

数组查找已经够快了，但是只能根据下标进行访问，如果根据内容查找，依然需要遍历每一个数组元素

散列表是字典类的一种，也叫哈希表，是通过计算一个键值对的函数，将所需要查询的数据映射到表中的某个位置来访问数据，这个映射函数被称为哈希函数或散列函数，极大的增强了查找速度

哈希函数能够决定容器的访问效率，常用的哈希函数有：

+ loselose - 将键中的每个字符对应的 ASCII 值相加并取余
+ djb2 - 在 loselose 的基础上改进使用幻数，减少键冲突

::: tip 幻数
在编程中直接使用的常数
:::

<CodeGroup>

<CodeGroupItem title="JavaScript">

```js
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTable {
  constructor() {
    this.table = [];
  }
  defaultToString(item) {
    if (item === null) {
      return 'NULL';
    } else if (item === undefined) {
      return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`;
    }
    return item.toString();
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.defaultToString(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    // 取余压缩，37 意味着最多只能存放 36 个元素
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key != null && value != null) {
      // 得到哈希值
      const position = this.hashCode(key);
      // 插入
      this.table[position] = new ValuePair(key, value);
    }
  }
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.get(hash);
    if(valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table(this.hashCode(key));
    return valuePair
  }
}
```

</CodeGroup>

</CodeGroupItem>

有时候，一些建会产生相同的哈希值，当不同的值在哈希表中对应相同位置时，就被称为冲突。使用一个数据结构来保存数据的目的显然不是丢失掉这些数据，而是通过某种方法来将它们保存起来，因此发生这种情况时必须要去解决

+ 分离链接 - 为每一个位置创建一个链表存储元素，需要额外的空间
+ 线性探查 - 如果该位置有值，则看下一个位置，直到发现空位置
+ 双散列法 - 一个哈希函数解决不了冲突就是用第二个哈希函数继续计算，只到解决为止



<!-- to be updated -->