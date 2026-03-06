---
title: 错误处理
category: 编程语言
tag: [Java]
article: false
order: 6
---

Java 的错误处理建立在异常体系之上，但它和 Python、JavaScript 最大的区别在于：Java 不只是“能抛异常”，还试图通过类型系统约束一部分异常必须被显式处理。

如果想先看错误处理的共性模型，可以先读 [编程语言中的错误处理模型](/sundry/error.html)。本篇只关注 Java 自己的机制：`Throwable` 层级、checked / unchecked exception、`try-catch-finally`，以及 Java 异常设计的取舍。

## Java 的异常层级

Java 中所有错误和异常的顶层父类都是 `Throwable`。

它下面主要分成两支：

+ `Error`
+ `Exception`

其中：

+ `Error` 通常表示 JVM 或运行环境层面的严重问题，一般不以业务代码恢复为目标
+ `Exception` 才是应用开发中最常接触的异常体系

而 `Exception` 又可以继续分成两类：

+ checked exception：编译器要求显式处理或显式声明抛出
+ unchecked exception：通常是 `RuntimeException` 及其子类，不强制在编译期处理

## checked 和 unchecked

这是 Java 错误处理里最有代表性的分界。

### checked exception

checked exception 的特点是：如果一个方法可能抛出这类异常，调用者必须处理，或者继续在方法签名中用 `throws` 声明。

它的目标是把错误处理责任提前暴露到接口层。

### unchecked exception

unchecked exception 通常指 `RuntimeException` 及其子类。这类异常不要求在编译期显式处理，常见于：

+ 空指针
+ 非法参数
+ 数组越界
+ 状态不合法

它们更接近“程序员写错了”或“调用约束被违反了”的情况。

## `try-catch-finally`

Java 使用 `try-catch-finally` 处理异常：

```java
try {
    // 可能抛出异常的代码
} catch (Exception e) {
    // 异常处理
} finally {
    // 总会执行的收尾逻辑
}
```

`catch` 用于按类型捕获异常，`finally` 用于保证清理逻辑执行。

例如：

```java
try {
    int result = 1 / 0;
} catch (ArithmeticException e) {
    System.out.println("division by zero");
} finally {
    System.out.println("finally");
}
```

这里的重点不是语法，而是职责：

+ `try` 负责正常路径
+ `catch` 负责失败路径
+ `finally` 负责善后

## `throws`：把处理权继续往上交

Java 并不要求每一层都立刻解决异常。很多时候，当前方法并没有足够上下文处理问题，这时可以把异常继续向上抛：

```java
void readFile() throws IOException {
    // ...
}
```

这也是 Java checked exception 设计的关键点：异常不仅是一种运行时行为，也是一种接口契约。

## Java 异常处理的常见问题

+ 机械地 `catch Exception`，导致异常类型语义被抹平
+ 捕获后只打印日志，不做传播、不做转换，也不真正处理
+ 在不该恢复的地方强行恢复，掩盖程序状态问题
+ 方法签名里堆满 `throws`，却没有清晰的异常边界设计

Java 的异常体系很强，但如果边界不清晰，最后也会退化成“哪里都能抛，哪里都随便抓”。

## Java 的取舍

Java 的异常设计一直有争议，核心原因就在于 checked exception。

它的优点是：

+ 强迫开发者正视一部分失败路径
+ 让接口层显式暴露错误可能性

它的代价是：

+ 样板代码较多
+ 传播链过长时容易显得繁琐
+ 部分团队最后会因为嫌麻烦而退化成宽泛捕获

所以 Java 异常处理写得好不好，关键不在于“有没有 `try-catch`”，而在于有没有把异常边界设计清楚。

## 常见实践

+ 能捕获具体异常类型时，不要直接 `catch Exception`
+ 当前层没有处理能力时，用 `throws` 继续向上交
+ 用 `finally` 或更现代的资源管理方式保证清理逻辑
+ 不要把日志打印当成错误处理的终点
+ 区分真正可恢复异常和程序状态类异常

## 总结

Java 的错误处理不是单纯的异常捕获机制，而是一套和类型系统绑定得很深的异常传播模型。`try-catch-finally` 负责组织控制流，checked / unchecked exception 负责区分哪些失败路径必须被显式面对。它的优势是边界清晰、约束较强，代价是写法容易变重。因此，Java 异常处理真正的重点不是“会不会写 `catch`”，而是“是否设计好了异常的责任边界”。
