---
title: 介绍 && 第一个 Java 程序
category: 编程语言
tag: Java
author: JQiue
prev: false
article: false
---

由詹姆斯高斯林在90年代初开发的一种编程语言，Java 介于编译型和解释性语言之间，因为 Java 是将代码编译成一种“字节码”，然后针对不同的平台编写虚拟机，不同的虚拟机负责解释字节码并执行，这样就实现了“一次编写，到处运行”的结果

随着 Java 的发展，Java 又分出了三个不同版本：

+ Java SE：Standard Edition
+ Java EE：Enterprise Edition
+ Java ME：Micro Edition

简单来说 Java SE 就是标准版，而 Java EE 是企业版，只是在 SE 的基础上增加了大量的 API 和库，以便于开发 Web 应用，数据库，消息服务等，而 ME 相当于 SE 的瘦身版，一些 SE 的标准库无法在 ME 上使用，它是一个针对于嵌入式设备的版本，因此没有特别需求，不建议学习 Java ME

因此学习线路如下：

1. 首先学习 Java SE，掌握 Java 语言本身以及 Java 标准库的使用
2. 继续学习 Java EE，掌握 Spring 框架等等
3. 如果学习移动开发，就深入 Android 平台，掌握 APP 开发

无论怎么选择，Java SE 的核心技术就是基础

## 版本

从 1995 年发布 1.0 开始，到目前为止，最新的 Java 版本是 Java 15：

时间|版本
---|---
1995|1.0
1998|1.2
2000|1.3
2002|1.4
2004|1.5 / 5.0
2005|1.6 / 6.0
2011|1.7 / 7.0
2014|1.8 / 8.0
2017/9|1.9 / 9.0
2018/3|10
2018/9|11
2019/3|12
2019/9|13
2020/3|14
2020/9|15

## 名词解释

初学者学习 Java，经常听到 JDK、JRE 这些名词，

+ JDK：Java Development
+ JRE：Java Runtime Environment

JRE 是运行 Java 字节码的虚拟机，但是需要 JDK 将 Java 源码编译成 Java 字节码，因此 JDK 除了 包含 JRE、还提供了编译器，调试器等开发工具

## 安装 JDK

推荐的 [Liberica](https://bell-sw.com/pages/downloads/#/java-11-lts) 实现的 JDK，无脑下一步就完事了，这个实现是自动配置环境变量的，无需再找一些七七八八的教程配置

## 第一个 Java 程序

```java
public class HelloWorld {
    public static void main(String args[]) {
        System.out.println("hello, world!!!");
    }
}
```

无论如何，在一个 Java 源代码中总是能找到一个类似这样的定义：

```java
public class ClassName {

}
```

这个定义被称为 class（类），类名是`ClassName`，按照习惯，类名和文件名相同，且首字母大写

在类的定义中，有个类似这样的定义：

```java
public static void main(String[] args){
    ...
}
```

这是一个类中的方法，`main`是方法名，`{}`用来编写 Java 语句，Java 规定，某个类定义的`public static void main(String[], args)`是 Java 程序的固定入口，所以 Java 程序总是从 main 方法开始执行

::: tip
从 1.4 及以后的版本中强制了`main`方法必须声明为`public`
:::

Java 中所有的函数都属于某个类的方法，在标准术语中称为成员方法，而不是成员函数

Java 源码本质上是一个文本文件，需要先用`javac`将保存好的 Java 文件编译成字节码文件，字节码会被自动生成，后缀名是`.class`，然后使用`java`命令执行这个字节码文件

::: tip
在 Java 11 版本以后可以直接使用`java`命令执行源码文件，但在实际中的项目中不建议使用
:::
