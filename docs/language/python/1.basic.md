---
title: 介绍 && 环境搭建
category: 编程语言
tag: Python
author: JQiue
prev: false
article: false
---

Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义”。

Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的

基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大的库，利用这些 Python 库，程序员可以把使用其它语言制作的各种模块（尤其是C语言和 C++）很轻松地联结在一起，因此 Python 又常被称为“胶水”语言。这使 Python 几乎无所不能，不管是传统的 Web 开发，PC 软件开发，Linux 运维，还是当下最热门的机器学习，大数据分析，网络爬虫，它都能胜任

同时 Python 也是完全面向对象的语言，函数，模块，数字，字符串都是对象，在 Python 中一切皆对象

从整体上来看，Python 最大的特点就是简单：

1. 语法简洁明了，即使是非专业的初学者也非常容易上手
2. 和其他语言相比，要实现同一个功能，而 Python 的代码往往是最短的

**“Life is short，you need Python”，人生苦短，我用Python**

## Python 的缺点

Python 运行速度是最慢的，甚至比 Java 还慢，当然这是所有的解释性语言的通病，正是因为 Python 屏蔽了很多底层细节，这个代价是非常大的，这个过程中 Python 需要做出很多很多工作，消耗了很多资源。虽然缺点是运行速度慢，但这并不是什么大问题，因为计算机的运行速度是越来越快的，只要多花钱就可以堆很高的性能，即用硬件的性能来弥补软件的不足。

## 2 VS 3

Python 3.x 是一次重大升级，为了避免引入历史包袱，Python 3.x 和 Python 2.x 并没有考虑兼容性，这导致大部分已经使用 Python 2.x 生产的应用项目无法升级 Python 3.x，虽然官方仍在维护 Python 2.x，但是大部分刚刚起步的项目却使用的 Python 3.x，学新不学旧才是最聪明的做法，因此 Python3 才是学习的主力，但是对于学透的人来说，无非就是写法上的不同

## Python 的解释器

Python 不仅在说语言本身，也包括具体的实现，Python 实际上是一个可以通过不同的方式来实现的语言规范

+ [CPython](http://www.python.org/) 官方版本的 C 语言实现，大部分人的选择
+ [Jython](http://www.jython.org/) 可以运行在 Java 平台，如果想要和 Java 代码库进行对接，或为 JVM 编写，就应该考虑它
+ [IronPython](https://ironpython.net/) 可以运行在 .NET 和 Mono 平台
+ [PyPy](https://www.pypy.org/) 支持 JIT 即时编译，具有静态类型，特点是运行速度快

## 环境搭建

和其他高级语言一样，Python 也需要编译器或叫解释器来运行程序，在系统上安装 Python 就像安装普通软件一样简单，下载安装包一路猛击即可

安装包地址：[Download](https://www.python.org/downloads/)

选择一个版本，点击Download，然后下拉到最下面，即可看到下图：

![download](https://gitee.com/jqiue/img_upload/raw/master/images/Snipaste_2020-09-12_22-13-34.png)

前缀说明：

+ 以`windows x86-64`开头的是64位的 Python 安装程序
+ 以`windows x86`开头的是32位的 Python 安装程序

后缀说明：

+ `embeddable zip file`表示`.zip`格式的绿色免安装版本，可以直接嵌入（集成）到其它的应用程序中
+ `executable installer`表示`.exe`格式的可执行程序，这是完整的离线安装包，一般选择这个即可
+ `web-based installer`表示通过网络安装的，也就是说下载到的是一个空壳，安装过程中还需要联网下载真正的 Python 安装包

安装时候请尽量勾选`Add Python 3.8 to PATH`，这样就可以在系统任何位置使用 Python 提供的命令工具

安装完成后会获得四个可运行程序：

![exe](https://gitee.com/jqiue/img_upload/raw/master/images/Snipaste_2020-09-12_23-21-00.png)

+ Module Docs：类库文档
+ IDLE：简易开发环境
+ Manuals：使用手册
+ Python：进入交互式命令界面

## 运行

Python 支持两种代码的运行方式

### 交互式

在命令行窗口中直接输入代码并按下回车就能立即看到结果，还可以继续输入下一行代码，再次回车看到结果，整个过程就像和计算机对话一样，这就是为什么很多非程序员喜欢 Python 的原因，只要输入执行的运算，Python 就能立即显示答案，优点是适合学习语法和部分代码，缺点是代码不能保存，不能用来做太大的项目

### 文件式

创建一个以`.py`为后缀的源文件，将所有的代码放入源文件中，让解释器逐行读取并执行，源文件是纯文本文件，文件式编写是最正统的开发模式，也是最主流的使用方式，Python3.x 已经将 UTF-8 作为默认的编码格式，这意味着它可以支持中文（不建议这么做），运行源文件通常有两种办法：

1. 使用 IDLE 打开源文件，然后在菜单中选择`Run->Run Module`，或者按下 F5
2. 使用 python 提供的命令来执行源文件（安装编译器勾选 Add Python to PATH），进入源文件目录下执行`python <源文件路径>`，可以是相对路径，也可以是绝对路径
