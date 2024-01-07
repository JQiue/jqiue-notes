---
title: Java
category: 编程语言
tag: [Java]
article: false
---

由詹姆斯高斯林在 90 年代初开发的一种编程语言，Java 介于编译型和解释性语言之间，因为 Java 是将代码编译成一种“字节码”，然后针对不同的平台编写虚拟机，不同的虚拟机负责解释字节码并执行，这样就实现了“一次编写，到处运行”，这意味着 Java 是跨平台的，不过如今非常鸡肋，因为别的语言也能跨平台了

随着 Java 的发展，Java 又分出了三个不同的平台版本：

+ Java SE - Standard Edition
+ Java EE - Enterprise Edition
+ Java ME - Micro Edition

简单来说 Java SE 就是标准版，而 Java EE 是企业版，只是在 SE 的基础上增加了大量的 API 和库，以便于开发 Web 应用，数据库，消息服务等。而 ME 相当于 SE 的瘦身版，一些 SE 的标准库无法在 ME 上使用，它是一个针对于嵌入式设备的版本，因此没有特别需求，不建议学习 Java ME

无论怎么选择，Java SE 的核心技术就是基础

## 版本

从 1995 年发布 1.0 开始，到目前为止，最新的 Java 版本是 Java 15：

| 时间   | 版本      |
| ------ | --------- |
| 1995   | 1.0       |
| 1998   | 1.2       |
| 2000   | 1.3       |
| 2002   | 1.4       |
| 2004   | 1.5 / 5.0 |
| 2005   | 1.6 / 6.0 |
| 2011   | 1.7 / 7.0 |
| 2014   | 1.8 / 8.0 |
| 2017/9 | 1.9 / 9.0 |
| 2018/3 | 10        |
| 2018/9 | 11        |
| 2019/3 | 12        |
| 2019/9 | 13        |
| 2020/3 | 14        |
| 2020/9 | 15        |

Java 有不同的发行商版本

| 发行版   | 厂商          |
| -------- | ------------- |
| Zulu     | Azul          |
| Liberica | Bell Software |

## 环境搭建

推荐 [Liberica](https://bell-sw.com/pages/downloads/#/java-11-lts) 实现，无脑下一步就完事了，这个实现是自动配置环境变量的，无需再找一些七七八八的教程配置

初学者学习 Java，经常听到 JDK、JRE 这些名词

+ JDK - Java Development
+ JRE - Java Runtime Environment

JRE 是运行 Java 字节码的虚拟机，但是需要 JDK 将 Java 源码编译成 Java 字节码，因此 JDK 除了包含 JRE、还提供了编译器，调试器等工具

## 第一个 Java 程序

无论如何，在一个 Java 源代码文件中中总是能找到一个类似这样的定义：

```java
public class ClassName {}
```

这个定义被称为 class（类），类名是`ClassName`，按照习惯，类名和文件名相同，且首字母大写

在类的定义中，有个类似这样的定义：

```java
public class ClassName {
  public static void main(String[] args){}
}
```

这是类中的方法，`main`是方法名，`{}`用来编写语句，Java 规定，某个类定义的`public static void main(String[], args)`是 Java 程序的固定入口

::: tip
从 1.4 及以后的版本中强制了`main`方法必须声明为`public`
:::

Java 中所有的函数都属于某个类的方法，在标准术语中称为成员方法，而不是成员函数

Java 强制每个文件都必须有一个类，且其他东西都定义在类中，所以这就是 Java 看起来非常啰嗦的原因：

```java
public class HelloWorld {
  public static void main(String args[]) {
    System.out.println("hello, world");
  }
}
```

Java 源码本质上是一个文本文件，需要先用`javac`将保存好的 Java 文件编译成字节码文件，会自动生成后缀名为`.class`字节码文件，然后使用`java`命令执行这个字节码文件

::: tip
在 Java 11 版本以后可以直接使用`java`命令执行源码文件，但在实际中的项目中不建议使用
:::

## 参考资料

+ Effective Java
+ Java 核心技术
+ On Java 8
