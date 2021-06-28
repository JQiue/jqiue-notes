---
title: 接口
category: 编程语言
tag: Java
author: JQiue
article: false
---

抽象类中，抽象方法本质上是定义接口规范，如果一个类没有字段，所有的方法都是抽象方法，那么就可以将该抽象类改写为接口，用`interface`声明

```java
interface Person{
  void show();
}
```

接口比抽象类还要抽象，因为它连字段都不能有，且接口中定义的方法都默认为`public abstract`，因此这两个修饰符不必写出

当一个类具体实现一个接口时，必须使用`implements`关键字

```java
interface Person {
  void show();
}

class Student implements Person {
  pubilc void show();
}
```

类虽然只能继承一个，但是接口可以被实现多个

```java
interface Person {
  void show();
}

interface Ok {
  void say();
}

class Student implements Person, Ok {
  public void show(){}
  public void say(){}
}
```

## 接口继承

一个接口可以通过关键字`extends`继承另一个接口

```java
interface Foo {
  void run();
}
interface Bar extends Foo {
  void say();
}
```

Bar 会获得 Foo 中的抽象方法

## default 方法

接口中的抽象方法可以被声明为`default`，这样实现类就不必覆写`default`方法

```java
interface Foo {
    String getName();
    default void run(){
        System.out.println(getName() + "run");
    }
}
```

目的是为了当新增一个方法时，会涉及到修改所有的实现类，如果是`default`方法，就无需覆写

::: danger
接口中的`default`方法不能访问字段，而抽象类的方法是可以访问字段的
:::

## 静态字段

接口也是拥有静态字段的，但是必须为`final`

```java
interface Person {
  public static final int MALE = 1;
}
```

实际上`public static final`是默认的，因此可以简写为：

```java
interface Person {
  int MALE = 1;
}
```
