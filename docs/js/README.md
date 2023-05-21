---
title: JavaScript
category: 编程语言
tag: [JavaScript]
excerpt: "JavaScript 简介"
article: false
---

作为万维网 Web 前端最重要的编程语言，JavaScript 的出现使网页和用户之间实现了实时和动态的交互关系，所有的浏览器都嵌入了 JavaScript 解释引擎

JavaScript 在刚诞生时，它的名字叫做“LiveScript”，在当时 Java 很流行，所以碰瓷一下 Java 会有助于它流行。现在 JavaScript 完全成为了一门独立的语言，也拥有了自己的语言规范 ECMAScript

ECMAScript 通常被称为 JavaScript，但后者为更多人所认知。真正的标准其实是 ECMAScript，而 JavaScript 只是其中的一个实现，大部分浏览器厂商都有自己的 ECMAScript 标准实现，比如谷歌的 V8，苹果的 JavaScriptCore，Mozilla 的 JavaScript。学习 JavaScript，实际上学习的是 ECMAScript，对于开发者来说基本不会感知到不同实现的区别

JavaScript 第一版设计的非常大杂烩：

+ 基本语法：借鉴 C 和 Java
+ 数据结构：借鉴 Java，将值分为原始值和对象两大类
+ 函数：借鉴了 Scheme 和 Awk，将函数作为一等公民，且引入闭包
+ 字符串和数组处理：借鉴 Python
+ 原型继承模型：借鉴 Self
+ 正则表达式：借鉴 Perl

为了保持简单，它缺少一些关键的功能，比如块级作用域、模块、子类型等，这些都在后面的版本中补充

ECMAScript 从发布标准至今已经迭代到了 ES11，但很多新特性都是在 ES6 这个版本中添加的，比如：

+ 类
+ 模块化
+ 箭头函数
+ 函数参数默认值
+ 模板字符串
+ 解构赋值
+ 延展操作符
+ Promise
+ Let 和 Const

本系列并不会区分 ES 版本带来的新东西，只会尽量的讲到一些常用的东西，一切不兼容的语法都交给 babel

## JavaScript 的宿主

JavaScript 有局限性，不能够编写独立运行的程序，因此只能在某个解释引擎或宿主上运行，浏览器就是 JavaScript 的宿主。但是浏览器中的 JavaScript 不具备对内存和 CPU 的底层访问，因为浏览器不需要这些功能，JavaScript 的能力很大程度上取决于它运行的环境，比如 Node.js 支持 JavaScript 读取/写入任意文件，执行网络请求等的函数，提供了一些浏览器中没有的功能

浏览器中的 JavaScript 可以做和网页交互、用户交互和 Web 服务器相关的所有事情，比如：

+ 修改网页中的内容，以及更改样式
+ 响应用户的行为，响应鼠标的点击，指针的移动，按键的按动
+ 向远程服务器发送网络请求，下载和上传文件（所谓的 AJAX 和 COMET 技术）
+ 获取或设置 cookie，向访问者提出问题或发送消息
+ 记住客户端的数据（“本地存储”）

但是为了安全，浏览器中的 JavaScript 能力是受限的，比如：

+ 不能读、写、复制和执行硬盘上的任意文件，它没有直接访问操作系统的功能
+ 允许做一些受到限制的文件操作，仅当用户做出特定的行为，JavaScript 才能操作这个文件。例如，用户把文件“拖放”到浏览器中，或者通过`<input>`标签选择了文件
+ 有很多与相机/麦克风和其它设备进行交互的方式，但是这些都需要获得用户的明确许可，因此不存在偷偷摸摸的行为
+ 不同的标签页/窗口之间通常互不了解。有时候，也会有一些联系，例如一个标签页通过 JavaScript 打开的另外一个标签页。但即使在这种情况下，如果两个标签页打开的不是同一个网站（域名、协议或者端口任一不相同的网站），它们都不能相互通信。这就是所谓的“同源策略”，为了解决“同源策略”问题，两个标签页必须都包含一些处理这个问题的特定的 JavaScript 代码，并均允许数据交换。这个限制也是为了用户的信息安全，例如，用户打开的`http://foo.com`网页必须不能访问`http://bar.com`（另外一个标签页打开的网页）也不能从那里窃取信息
+ JavaScript 可以轻松地通过互联网与当前页面所在的服务器进行通信，但是从其他网站/域的服务器中接收数据的能力被削弱了。尽管可以，但是需要来自远程服务器的明确协议（在 HTTP header 中）

在 Node.js 中的 JavaScript 提供了浏览器之外的能力，可用于操作系统层面的控制，因此 Atwood 定律已经实现

::: tip Atwood 定律
Jeff Atwood 即 StackOverflow 的创始人在博客中提到著名的定律：任何可以用 JavaScript 来实现的应用，最终都将用 JavaScript 来实现

> <https://blog.codinghorror.com/the-principle-of-least-power/>
:::

## JavaScript “上层语言”

JavaScript 的语法也不能满足所有人的需求，这是正常的，因此出现了很多新语言，这些语言在被浏览器执行之前，都会被编译成 JavaScript，比如：

+ CoffeeScript
+ TypeScript
+ Dart
+ Brython

## 规范

ECMA-262 规范 包含了大部分深入的、详细的、规范化的关于 JavaScript 的信息，这份规范明确地定义了这门语言，但正因其规范化，对于新手来说难以理解。所以，如果你需要关于这门语言细节最权威的信息来源，这份规范就很适合你（去阅读）。但它并不适合日常使用。

每年都会发布一个新版本的规范，最新的规范草案请见 [https://tc39.es/ecma262/](https://tc39.es/ecma262/)，想了解最新最前沿的功能，包括“即将纳入规范的”（所谓的 “stage 3”），请看这里的提案 [https://github.com/tc39/proposals](https://github.com/tc39/proposals)

## 编辑器的选择

根据爱好选择它们

+ IDE：集成开发环境，具有强大的编辑功能，具备完整的开发功能
  + Visual Studio Code：免费，通过插件获得和 IDE 一样的功能
  + WebStorm：收费，开箱即用的开发环境

+ 轻量编辑器：不具备完整的开发环境，具有一些比普通记事本更强的编辑能力
  + Visual Studio Code：没错，还是一个优秀的编辑器
  + Sublime Text：免费

## 浏览器的选择与使用

浏览器是运行 JavaScript 的环境，选择一个趁手的浏览器也很有必要：

+ Google Chrome：大多数人的选择
+ Edge：正成为大多数人的选择，因为 Edge 和 Google Chrome 使用的同样的内核，但 Google Chrome 的某些功能无法在国内使用
+ FireFox：其次的选择
+ 其他浏览器（opera，Safari）

在浏览器中按下`F12`即可显示开发者工具，在 Console 标签页中会显示 JavaScript 执行的信息，一些错误会在这里得到提示，同时也可以在这里输入 JavaScript 代码并执行，通常输入单行代码按下`enter`就执行了，但可以使用`Shift+enter`来进行换行输入多行代码，对于 windows 操作系统上的大多数浏览器来说，都是通过`F12`打开开发者工具

## 运行 JavaScript

JavaScript 有两种运行方式，一种是直接在浏览器的开发者工具中控制台直接输入代码执行，另一种在 HTML 文档中嵌入 JavaScript 代码执行

+ 通过`<script>`标签来定义 JavaScript 代码，当浏览器解析到这个元素时，就会执行该元素中的代码，可重复创建该元素

```html
<!DOCTYPE HTML>
<html>

<body>

  <script>
    // your JavaScript code
  </script>

</body>

</html>
```

+ 在元素的事件属性中编写，当事件触发时就会执行，

```html
<button onclick="alert('点我干嘛')">别点我!</button>
```

+ 可以使用单独的`.js`后缀文件通过`<script>`的`src`属性引入执行，它可以是完整的 URL

```html
<script src= "index.js"></script>
```

::: tip
简单的 JavaScript 最好嵌入到 HTML 中，只有复杂的 JavaScript 才放入单独的文件中，独立文件的好处不仅仅让 HTML 文档变得简洁，也会让浏览器下载并进行缓存
:::

::: warning
代码可以放在页面的任意位置使用，但是放置的位置不同，将影响 JS 执行的顺序。引入外部 JS 的`<script>`标签中，不能再包含任何的代码，否则不能工作
:::

`<script>`中的`type`和`language`不是必须的

## JavaScript 的内存分布

JavaScript 划分了两种内存：

+ 栈内存：存放基本类型
+ 堆内存：存放引用类型

栈内存自动分配相对固定大小的内存空间，并由系统自动释放。堆内存是动态分配内存，内存大小不一，也不会自动释放

| 栈内存                   | 堆内存                 |
| ------------------------ | ---------------------- |
| 基本数据类型             | 引用数据类型           |
| 按值访问                 | 按引用访问             |
| 值的大小固定             | 值的大小不固定         |
| 自动分配内存空间         | 由代码指定分配         |
| 空间小，效率高           | 空间大，效率低         |
| 先进后出，遵循栈结构特点 | 无序存储，根据引用获取 |

## 参考资料

+ JavaScript 高级程序设计
+ JavaScript 权威指南
+ 你不知道的 JavaScript
+ 现代 JavaScript 教程
+ 廖雪峰
+ JavaScript 语言精髓与编程实践
+ JavaScript 忍者秘籍
+ JavaScript 二十年
+ 学习 JavaScript 设计模式
