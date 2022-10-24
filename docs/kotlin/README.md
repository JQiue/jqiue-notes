---
title: Kotlin
category: 编程语言
tag: [Kotlin]
---

Kotlin 可以运行在 Java 虚拟机，Android，浏览器上的静态语言，与 Java 完全兼容

## Hello World

从[这里](https://github.com/JetBrains/kotlin/releases)下载编译器，和 JDK 一样配置好环境变量即可

Kotlin 的文件都是以`.kt`结尾的，如果想要编译程序，则可以使用`kotlinc <file>`，此时会生成`.class`文件。然后就可以用`kotlin`运行该文件了

::: danger
使用`java`运行报错是因为 Kotlin 代码使用了原生的 API，这些在 Java 中不支持，需要手动导入，在用`kotlinc`编译的时候的加上`-include-runtime -d <file>`参数即可
:::

## 注释

```kotlin
// 单行注释，只能注释单行

/*
多行注释
可以注释多行内容
*/
```

## 代码块和语句

Kotlin 采用`{}`来区分代码之间的层次以及作用域范围，当存在换行符时，大多数情况下可以省略语句的分号

## 标识符

## 变量

使用`var`关键字声明变量，使用`val`关键字声明只读变量

## 数据类型

完全抛弃了 Java 中的基本类型，全部都是对象类型

## 运算符

## 流程控制

## 函数

使用`fun`关键字声明

```kotlin
fun sum() {}
```

必须有一个声明一个主函数`main`，程序的出入口在这里

```kotlin
fun main() {}
```

## 类和对象

使用`class`声明一个类

```kotlin
class Person {}
fun main () {
  var p = Person();
}
```

构造函数使用`constructor`

```kotlin
class Person {
  constructor() {}
}
```

## 接口

## 泛型

## 标准功能
