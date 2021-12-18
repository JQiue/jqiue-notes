---
title: 结构性
category: 设计模式
tags: [Alpha]
author: JQiue
article: false
---

### 适配器模式

适配器模式是将一个类的接口转换成客户希望的另一个接口，使原本由于接口不兼容而不能一起工作的类可以一起工作

```js
class Adaptee {
  foo(){
    return 'foo';
  }
}

class Target {
  constructor(){
    this.adaptee = new Adaptee();
  }
  bar() {
    return `bar -> ${this.adaptee.foo()}`;
  }
}

let target = new Target();
console.log(target.bar());  // 'foo'
```

设计原则：

+ 旧接口和使用者相分离
+ 符合开放封闭原则

使用场景：

+ 使用一个已经存在的对象，但其方法或接口不符合要求，封装旧接口
+ 创建一个可复用的对象，该对象可以与其他不相关或不可见的对象协同工作
+ 适用已经存在一个或多个对象，但是不能进行继承以匹配它的接口
+ Vue computed 转换 data

### 装饰器模式

### 代理模式

### 外观模式

### 桥接模式

### 组合模式

### 享元模式
