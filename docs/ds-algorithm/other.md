---
title: 其它结构
category: 数据结构与算法
tags: [集合, 字典, Alpha]
author: JQiue
article: false
---

## 集合

集合是由一组无序且唯一（即不能重复）的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中

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
}
```

## 字典

字典中，存储的是键值对，其中键名是用来查询特定元素的。字典和集合很相似，集合以值的形式存储元素，字典则是以键值的形式来存储元素。字典也称作映射、符号表或关联数组，在计算机科学中，字典经常用来保存对象的引用地址

```js
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

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
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  keys() {}
  values() {}
  keyValues() {
    const valuePairs = [];
    for(const key in this.table){
      valuePairs.push(this.table[key]);
    }
    return valuePairs;
  }
  clear() {}
  size() {}
  isEmpty() {}
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`; // {1} 
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`; // {2} 
    }
    return objString; // {3} 
  }
}
```

## 哈希表

<!-- to be updated -->