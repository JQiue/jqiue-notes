---
title: 创建型
category: 设计模式
author: JQiue
article: false
---

## 工厂模式

工厂模式是将`new`操作单独封装，遇到`new`的时候就需要考虑是否该适用工厂模式了

```js
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {}
  func1() {}
  func2() {}
}

class Creator {
  create(name){
    return new Product(name);
  }
}

const creator = new Creator();
const product1 = creator.create('product1');
product1.init();
```

意义：

+ 构造函数和创建者分离
+ 符合开放封闭原则

使用场景：

+ jQuery
+ React.createElement
+ Vue 异步组件

## 单例模式

单例模式就是保证一个类只有一个实例，实现方法就是先判断实例是否存在，如果存在直接返回，不存在就创建了再返回，确保一个类只有一个实例对象

<CodeGroup>

<CodeGroupItem title="Java" active>

```java
public class SingleObject {
  private SingleObject instance = null;
  // 私有化构造方法
  private SingleObject (){}
  // 获取实例的唯一方法
  public SingleObject getInstance() {
  // 判断实例是否存在，否则只 new 一次
    if(instance == null) {
      return new SingleObject();
    }
    return instance;
  }
}

public class Main {
  public static void main(String args[]) {
    // 报错，构造方法私有化了
    // SingleObject instance = new SingleObject();
    SingleObject instance = SingleObject.getInstance();
  }
}
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript">

```js
class SingleObject {}

SingleObject.getInstance = (function() {
  let instance;
  return function(){
    if(!instance) {
      instance = new SingleObject();
    }
    return instance;
  }
})();

let single1 = SingleObject.getInstance();
let single2 = SingleObject.getInstance();
console.log(single1 === single2); // true
```

</CodeGroupItem>

</CodeGroup>

意义：

+ 符合单一职责原则
+ 没法开放封闭原则，但是绝对不违反开放封闭原则

使用场景：

+ 模拟登录框
+ jQuery 只有一个`$`
+ 购物车
+ Vuex 和 Redux 中的 store

## 原型模式

## 抽象工厂模式

## 建造者模式
