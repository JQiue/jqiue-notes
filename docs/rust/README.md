---
title: Rust
category: 编程语言
tag: [Rust]
excerpt: "Rust 简介"
article: false
---
## 安装 && 编译 && 运行

在 Windows 安装 Rust 需要有预备环境[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，保持最小安装的组件为：MSVC C++ Build，Windows SDK

编写一个代码：

```rust
fn main() {
  println!("hello, world!");
}
```

使用`rustc main.rs`进行编译生成可执行程序

## Cargo

Cargo 是 Rust 官网构建工具，通常使用它来创建 Rust 项目，使用`cargo new <name>`，构建项目使用`cargo build`，优化构建则加上`--release`参数。`cargo run`会编译并运行可执行文件

`Cargo.toml`使用 TOML (Tom's Obvious, Minimal Language) 格式，这是 Cargo 配置文件的格式.`[package]`是一个片段（section）标题，表明下面的语句用来配置一个包。`[dependencies]`是项目依赖片段的开始。在 Rust 中，代码包被称为 **crates**

## 注释

```rust
// 单行注释，只能注释单行

/* 块注释 */

/// 文档注释
//! 为注释所属的项生成帮助文档
```

## 代码块和语句

Rust 采用`{}`来区分代码之间的层次以及作用域范围，语句不能省略分号

## 标识符

+ 由英文字母、数字、$、_组成，但第一个字符不能是数字
+ 不能是 Rust 中的关键字和保留字
+ 区分大小写

## 变量和常量

`let`用来创建一个变量

```rust
let foo = 5;
```

在 Rust 中变量默认是不可变的，在变量名前加上`mut`表示可变

```rust
let mut foo = 5;
foo = 6;
```

`const`用来声明常量，常量不光默认不能变，它总是不能变，并且必须注明值的类型，常量只能被设置为常量表达式，而不可以是其他任何只能在运行时计算出的值

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

可以在同一个作用域下声明多个变量，这并不意味着之前声明的变量消失了，只不过编译器会使用更近的那个

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

标量（scalar）类型代表一个单独的值，Rust 有四种基本的标量类型：整型、浮点型、布尔类型和字符类型

+ 整型：

| 长度    | 有符号 | 无符号 |
| ------- | ------ | ------ |
| 8-bit   | i8     | u8     |
| 16-bit  | i16    | u16    |
| 32-bit  | i32    | u32    |
| 64-bit  | i64    | u64    |
| 128-bit | i128   | u128   |
| arch    | isize  | usize  |

+ 浮点型：`f32`，`f64`
+ 布尔型：`bool`
+ 字符型：`char`，使用单引号，都是 4 字节
+ 单元类型：`()`，唯一可能的值就是`()`这个空元组

Rust 有两个原生的复合类型：和数组（array）和元组（tuple）

### 类型转换

Rust 只能用`as`关键字进行显式类型转换，不支持隐式转换

```rust
let decimal = 1.2345;
let integer = decimal as u8;
```

### 类型推断

Rust 类型推导也是很智能的，不仅可以通过右值推导类型，还能根据后续使用推导类型，因此不需要声明变量的类型

### 类型别名

`type`关键字可以定义某个类型的别名，但必须使用驼峰命名法

```rust
type Inch = u8;
let inches:inch = 8;
```

## 表达式

Rust 中几乎所有语句都是表达式，在一个语句上加`;`表示忽略该值

代码块也是表达式，代码块的值是其最后一个语句表达式的值，如果是以`;`结束，则返回`()`

```rust
let x = 1;
let y = {
  x*x
};
```

## 运算符

## 流程控制

### 条件分支

`if`语句和条件运算符`?`均可实现根据条件来执行不同的语句, 表达式必须是个 bool 类型，Rust 不会转换其他类型

```rust
if 2 > 1 {

} else if 2 > 3 {

}
```

`if`也是一个表达式，所以可以用于变量声明

```rust
let x = if 1 > 2 {
  2
} else {
  1
}
```

```rust
let number = if true { 1 } else { 2 };
```

### 循环

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

`for in`可以遍历一个迭代器

```rust
let a = [10, 20, 30, 40, 50];
for element in a {
  println!("the value is: {element}");
}
```

可以使用`a..b`快速创建一个步长为`1`的迭代器

```rust
// 包含 a ，不包含 b
for n in 1..101 {}
// 包含 a ，也包含 b
for n in 1..=101 {}
```

`break`语句用于终止整个循环，`continue`是`break`的轻量版本，不会终止整个循环，而是终止当前的迭代，并强制执行新的一轮循环

### 匹配

类似于`switch`，使用`match`来提供模式匹配

```rust
let n = 6;
match n {
  // 匹配一个值
  1 => println!("匹配一个值"),
  2 | 3 | 4 => println!("匹配多个个值"),
  6..=10 => println!("匹配一个区间"),
  _ => println!("其他情况"),
}
```

`match`也是一个表达式

```rust
let bol = true;
let binary = match bol {
  true => 1,
  false => 0,
}
```

## 函数

使用`fn`声明新函数，Rust 使用 snake case 命名函数，函数的声明可以在作用域中的任意位置

```rust
fn main() {}
fn another_function () {}
```

声明参数时，必须声明参数类型

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

## 自定义类型

### 结构体

使用`struct`关键字定义结构体

```rust
// 4 个字段的结构体
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}

// 单元结构体
struct Unit;

// 元组结构体（实际上就是具名元组）
struct Pair(i32, f32);
```

创建实例：

```rust
let user = User {
  email: String::from("someone@example.com"),
  username: String::from("someusername123"),
  active: true,
  sign_in_count: 1,
};

// 实例化单元结构体
let _unit = Unit;

// 实例化元组结构体
let pair = Pair(1, 0.1);

// 通过 . 访问字段
user.username;
```

可以为结构体定义方法，和函数类似，方法的第一个参数总是`self`，指向实例：

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

所有在 `impl` 块中定义的函数被称为**关联函数（associated functions）**，因为它们与 impl 后面命名的类型相关

### 枚举

`enum`关键字允许创建一个从数个不同取值中选其一的枚举类型

## 集合

## 数据结构

### 数组

数组中的每个元素的类型必须相同，数组长度是固定的

```rust
// 初始化定长数组
let a = [1, 2, 3, 4, 5];
// 指定类型和数量（类型和长度都是多余的）
let a: [i32; 5] = [1, 2, 3, 4, 5];
// 指定初始值和数量
let a = [3; 5];
```

使用索引访问数组元素

```rust
let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
```

使用`len()`返回数组长度

```rust
let a = [1, 2, 3, 4, 5];
a.len();
```

可以使用切片语法

```rust
let a = [1, 2, 3, 4, 5];
// 完整的部分
let a_slice1 = &a;
// 从索引 1 开始切，但不包含 4
let a_slice2 = &a[1..4];
```

### 元组

元组是一个将多个其他类型的值组合进一个复合类型的主要方式。元组长度是固定，一旦声明，其长度不会增大或缩小

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
```

可以通过索引访问：

```rust
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;
```

元组可以被解构

```rust
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
```

没有任何值的元组有个特殊的名称，叫做 **单元（unit）** 元组。这种值以及对应的类型都写作`()`，表示空值或空的返回类型。如果表达式不返回任何其他值，则会隐式返回单元值

## 泛型

## 模块

模块由：函数，结构体，接口，实现，子模块组成

## 属性

## 错误处理

## 标准库

默认情况下，Rust 设定了若干个会自动导入到每个程序作用域中的标准库内容，这组内容被称为**预导入**（preclude）内容，可以在标准库文档中查看预导入的所有内容。如果需要的类型不在预导入内容中，就必须使用`use`语句显式地将其引入作用域。比如`std::io`库提供很多有用的功能，包括接收用户输入的功能

```rust
use std::io;
```

### 格式化输出

打印操作由 std::fmt 里面所定义的一系列宏来处理，包括：

+ `format!`：将格式化文本写到字符串。
+ `print!`：与 format! 类似，但将文本输出到控制台（io::stdout）
+ `println!`: 与 print! 类似，但输出结果追加一个换行符。
+ `eprint!`：与 print! 类似，但将文本输出到标准错误（io::stderr）
+ `eprintln!`：与 eprint! 类似，但输出结果追加一个换行符

```rust
// {} 会被内容替换
println!("{} days", 31);
// 可以使用位置参数调整替换内容
println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");
```

## 参考资料
