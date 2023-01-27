---
title: Rust
category: 编程语言
tag: [Rust]
excerpt: "Rust 简介"
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

## 规范

ECMA-262 规范 包含了大部分深入的、详细的、规范化的关于 JavaScript 的信息，这份规范明确地定义了这门语言，但正因其规范化，对于新手来说难以理解。所以，如果你需要关于这门语言细节最权威的信息来源，这份规范就很适合你（去阅读）。但它并不适合日常使用。

每年都会发布一个新版本的规范，最新的规范草案请见 [https://tc39.es/ecma262/](https://tc39.es/ecma262/)，想了解最新最前沿的功能，包括“即将纳入规范的”（所谓的 “stage 3”），请看这里的提案 [https://github.com/tc39/proposals](https://github.com/tc39/proposals)

## 安装 && 编译 && 运行

在 Widnows 安装 Rust 需要有预备环境[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，保持最小安装的组件为：MSVC C++ Build，Windows SDK

编写一个代码：

```rust
fn main() {
  println!("hello, world!");
}
```

使用`rustc main.rs`进行编译生成可执行程序

## Cargo

Cargo 是 Rust 构建工具，通常使用它来创建 Rust 项目，使用`cargo new <name>`，构建项目使用`cargo build`，优化构建则加上`--release`参数。`cargo run`会编译并运行可执行文件

`Cargo.toml`使用 TOML (Tom's Obvious, Minimal Language) 格式，这是 Cargo 配置文件的格式.`[package]`是一个片段（section）标题，表明下面的语句用来配置一个包。`[dependencies]`是项目依赖片段的开始。在 Rust 中，代码包被称为 **crates**

## 预导入 preclude

默认情况下，Rust 设定了若干个会自动导入到每个程序作用域中的标准库内容，这组内容被称为**预导入（preclude）**内容，可以在标准库文档中查看预导入的所有内容。如果需要的类型不在预导入内容中，就必须使用`use`语句显式地将其引入作用域。`std::io`库提供很多有用的功能，包括接收用户输入的功能

```rust
use std::io;
```

## 注释

```rust
// 单行注释，只能注释单行

/// 文档注释
/// # Examples
```

## 代码块和语句

Rust 采用`{}来`区分代码之间的层次以及作用域范围，语句不能省略分号

## 标识符

+ 由英文字母、数字、$、_组成，但第一个字符不能是数字
+ 不能是 Rust 中的关键字和保留字
+ 区分大小写

## 变量和常量

`let`用来创建一个变量

```rust
let foo = 5;
```

在 Rust 中变量默认是不可变的，必须在变量名前加上`mut`表示可变

```rust
let mut foo = 5;
foo = 6;
```

`const`用来声明常量，常量不光默认不能变，它总是不能变，并且必须注明值的类型，常量只能被设置为常量表达式，而不可以是其他任何只能在运行时计算出的值

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

可以在同一个作用于下声明多个变量，这并不意味着之前声明的变量消失了，只不过编译器会使用更近的那个

```rust
fn main() {
  let x = 1;
  let x = 2;
  {
    let x = 3;
    println!("{x}"); // 3
  }
  println!("{x}"); // 2
}
```

## 数据类型

### 标量

标量（scalar）类型代表一个单独的值，Rust 有四种基本的标量类型：整型、浮点型、布尔类型和字符类型

整型：

长度 有符号 无符号
---|---|---
8-bit|i8|u8
16-bit|i16|u16
32-bit|i32|u32
64-bit|i64|u64
128-bit|i128|u128
arch|isize|usize

浮点型：`f32`,`f64`

布尔型：`boll`

字符型：`char`，使用单引号

### 复合

Rust 有两个原生的复合类型：元组（tuple）和数组（array）

数组中的每个元素的类型必须相同。Rust 中的数组与一些其他语言中的数组不同，Rust中的数组长度是固定的

```rust
fn main() {
  let a = [1, 2, 3, 4, 5];
}
```

指定类型和数量

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
```

指定初始值和数量

```rust
let a = [3; 5];
```

使用索引访问数组元素

```rust
fn main() {
  let a = [1, 2, 3, 4, 5];
  let first = a[0];
  let second = a[1];
}
```

元组是一个将多个其他类型的值组合进一个复合类型的主要方式。元组长度固定：一旦声明，其长度不会增大或缩小

```rust
fn main() {
  let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

可以通过索引访问：

```rust
fn main() {
  let x: (i32, f64, u8) = (500, 6.4, 1);
  let five_hundred = x.0;
  let six_point_four = x.1;
  let one = x.2;
}
```

元组可以被解构

```rust
fn main() {
  let tup = (500, 6.4, 1);
  let (x, y, z) = tup;
}
```

不带任何值的元组有个特殊的名称，叫做 **单元（unit）** 元组。这种值以及对应的类型都写作`()`，表示空值或空的返回类型。如果表达式不返回任何其他值，则会隐式返回单元值

## 运算符

## 流程控制

### 条件分支

`if`语句和条件运算符`?`均可实现根据条件来执行不同的语句, if 表达式必须是个 bool 类型，Rust 不会转换其他类型

```rust
if 2 > 1 {

} else if 2 > 3 {

}
```

`if`是一个表达式，所以可以用于变量声明

```rust
let number = if true { 1 } else { 2 };
```

::: tip 代码块的值
代码块的值是其最后一个表达式的值
:::

Rust 有三种循环：loop、while 和 for

loop 是无限循环，直到要求停止

```rust
loop {}
```

while 循环

```rust
while 1 != 0 {
}
```

for 循环

```rust
let a = [10, 20, 30, 40, 50];
for element in a {
  println!("the value is: {element}");
}
```

`break`语句用于终止整个循环，`continue`是`break`的轻量版本，不会终止整个循环，而是终止当前的迭代，并强制执行新的一轮循环

## 函数

使用`fn`声明新函数，Rust 使用 snake case 命名函数，函数的声明可以在作用域中的任意位置

```rust
fn main() {}
fn another_function () {}
```

声明参数，必须声明参数类型

```rust
fn foo(x: i32, y: char) {}
```

具有返回值的函数必须使用`->`声明类型，在 Rust 中，最后一个表达式的值就是返回值，但仍然可以使用`return`随时进行返回

```rust
fn five() -> i32 {
  5
}

fn six() -> i32 {
  return 6;
}
```

## 结构体

定义结构体，需要使用`struct`关键字并为整个结构体提供一个名字

```rust
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}
```

创建实例：

```rust
fn main() {
  let user = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
  };
}
```

可以为结构体定义方法，和函数类似：

```rust
struct User {
  username: String,
  age: u64,
}

impl User {
  fn print_user(&self) {
  }
}
```

方法的第一个参数总是`self`，指向实例

所有在 `impl` 块中定义的函数被称为 **关联函数（associated functions）**，因为它们与 impl 后面命名的类型相关

## 集合

## 参考资料
