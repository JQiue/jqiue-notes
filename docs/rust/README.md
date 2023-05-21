---
title: Rust
category: 编程语言
tag: [Rust]
excerpt: "Rust 简介"
article: false
---

Rust 由 Mozila 一位工程师创造，他对这个语言的期望是：安全，性能，特性广泛，以内存安全为第一原则，注重并发安全，持续提升性能，现代化语言特性，拥抱开源社区。Rust 是通用型语言，适用所有领域绝大数场景，但本质是弥补 C 的内存安全问题，因为世界上百分之 70 的安全漏洞都是非法访问内存引起。Rust 将会为各领域的基础设施做出贡献，但也有可能会出现杀手级应用

## 安装 && 编译 && 运行

在 Windows 安装 Rust 需要有预备环境[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，保持最小安装的组件为：MSVC C++ Build，Windows SDK

编写一个代码，使用`rustc main.rs`进行编译生成可执行程序

```rust
fn main() {
  println!("hello, world!");
}
```

最后执行生成的可执行程序

Cargo 是官方构建工具，使用`cargo new <name>`创建，构建项目使用`cargo build`，构建结果在`target`下，优化构建则加上`--release`参数，`cargo run`会编译并运行可执行文件

```rust
.
├── .git
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

`Cargo.toml`使用 TOML (Tom's Obvious, Minimal Language) 格式，这是 Cargo 配置文件的格式.`[package]`是一个片段（section）标题，表明下面的语句用来配置一个包。`[dependencies]`是项目依赖片段的开始

```toml
[package]
name = "hello_world" # 定义项目名字
version = "0.1.0"    # 定义项目版本
edition = "2021"     # 声明使用的 Rust 大版本，2015 2018 2021

[dependencies]
```

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

`let`用来创建一个变量，并绑定一个值

```rust
let foo = 5;
```

::: tip 为什么是绑定而不是赋值？
涉及到核心原则，即所有权
:::

在 Rust 中变量默认是不可变的，在变量名前加上`mut`表示可变，这么做是因为让编译器保证一定不可变，并暗示其他代码可能改变

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

使用`_`开头的变量会让 Rust 忽略警告未使用的变量

## 数据类型

标量（scalar）类型代表一个单独的值，Rust 有四种基本的标量类型：整型、浮点型、布尔类型和字符类型

+ 整型：

| 长度    | 有符号      | 无符号 |
| ------- | ----------- | ------ |
| 8-bit   | i8          | u8     |
| 16-bit  | i16         | u16    |
| 32-bit  | i32（默认） | u32    |
| 64-bit  | i64         | u64    |
| 128-bit | i128        | u128   |
| arch    | isize       | usize  |

::: tip 整数溢出
如果将一个变量修改为某个超出范围的值就会发生整数溢出，如果是 Debug 模式编译，则会导致 panic。如果是 release 模式，不会触发 panic，但是超出类型最大值的数值会被“环绕”为类型最小值，比如在 u8 中，256 会变成 0，257 会变成 1，以此类推
:::

+ 浮点型：`f32`，`f64`（默认）
+ 布尔型：`bool`，只有 1 字节
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

数学运算

符号|作用
+|加法
-|减法
*|乘法
/|除法
%|取余

## 流程控制

### 条件分支

`if`语句表达式必须是个 bool 类型，Rust 不会隐式将非 bool 类型转换为 bool

```rust
if 2 > 1 {

} else if 2 > 3 {

}
```

`if`也是一个表达式，但必须是一种类型，可以用于变量绑定

```rust
let x = if 1 > 2 {
  2
} else {
  1
}

let number = if true { 1 } else { 2 };
```

### 循环

Rust 有三种循环：`loop`、`while`和`for`

`loop` 是无限循环，直到要求停止

```rust
loop {}
```

`while`循环

```rust
while 1 != 0 {}
```

`for in`可以遍历一个迭代器

```rust
let a = [10, 20, 30, 40, 50];
for element in a {
  println!("the value is: {element}");
}
```

三种循环都是可以返回值

```rust
let mut counter = 0;
let result = loop {
  counter += 1;
  if counter == 10 {
    break counter * 2;
  }
}
```

可以使用`a..b`快速创建一个步长为`1`的迭代器

```rust
// 包含 a ，不包含 b
for n in 1..101 {}
// 包含 a ，也包含 b
for n in 1..=101 {}
```

`break`语句用于终止整个循环，`break`可以用于循环终止时需要返回的值，`continue`是`break`的轻量版本，不会终止整个循环，而是终止当前的迭代，并强制执行新的一轮循环

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
};
```

### if let

`if let`是一个简单的控制流

## 函数

Rust 使用`fn`并用 snake case 风格命名函数，函数的声明可以在作用域中的任意位置

```rust
fn main() {}
fn another_function () {}
```

声明参数时，必须声明参数类型

```rust
fn foo(x: i32, y: char) {}
```

具有返回值的函数必须使用`->`声明返回值类型，在 Rust 中，最后一个表达式的值就是返回值，但仍然可以使用`return`随时进行返回

```rust
fn five() -> i32 {
  5
}

fn six() -> i32 {
  return 6;
}
```

`()`可以用来表达一个函数没有返回值，当没有返回值或以`;`结尾的表达式：

```rust
// 隐式
fn foo() {}
// 显式
fn bar() ->() {}
```

当用`!`作为返回类型时，表示函数永不返回

```rust
fn forever() -> ! {
  loop {};
}
```

`main`是特殊的函数，所有代码都从这个入口中开始运行

## 自定义类型

### 结构体

结构体相比元组，每个元素都赋予名字的含义，每个元素被称为字段，使用`struct`定义结构体

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

实例可变，那么字段就是可变的，不允许单独声明某个字段可变性

```rust
let mut user = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
···

可以使用`impl`为结构体定义方法，和函数类似，方法的第一个参数总是`self`，可以是只读的或可变的，指向实例：

```rust
struct User {
  username: String,
  age: u64,
}

impl User {
  fn print_user(&self) {}
}
```

除了方法，`impl`还可以定义不接收`self`的函数，但这类函数和结构体关联，所以被称为**关联函数（associated functions）**。因为它不作用于某个具体的实例，通常用来作为结构体的构造器来返回新的实例

```rust
struct User {
    email: String,
    username: String,
    active: bool,
    sign_in_count: i32,
}

impl User {
    fn build(email: String, username: String, active: bool, sign_in_count: i32) -> User {
        User {
            email,
            username,
            active,
            sign_in_count,
        }
    }
}
```

可以拥有多个`impl`块，这是合法的

### 枚举

`enum`关键字允许创建一个从数个不同取值中选其一的枚举类型

## 集合

### 动态数组

`Vec<T>`也就是所谓的动态数组，动态数组允许在单个数据结构中存储多个相同类型的值

```rust
let v: Vec<i32> = Vec::new();
```

也提供了简化代码的宏

```rust
let v = vec![1, 2, 3];
```

具有以下方法：

+ `push(value)` - 添加元素，会返回一个`Option<&T>`
+ `get(index)` - 获取元素，获取不到就返回`None`，而不会报错

如果持有了不可变引用，则尝试修改动态数组是不会成功的

```rust
let mut v = vec![1, 2, 3];
let first = &v[0];
v.push(4); // error
```

## 数据结构

### 数组

数组中的每个元素的类型必须相同，数组长度是固定的

```rust
// 初始化定长数组
let a = [1, 2, 3, 4, 5];
// 指定类型和数量（类型和长度都是多余的）
let a: [i32; 5] = [1, 2, 3, 4, 5];
// 指定初始值和数量，用于创建相同的元素，以及指定数量
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

元组是一个将多个其他类型的值组合进一个复合类型的主要方式，元组长度是固定的

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
```

通过`.`访问

```rust
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;
```

可以被解构

```rust
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
```

没有任何值的元组有个特殊的名称，叫做 **单元（unit）** 元组。这种值以及对应的类型都写作`()`，表示空值或空的返回类型。如果表达式不返回任何其他值，则会隐式返回单元值

## 泛型

## 包，单元包，模块，路径

一个包只能拥有一个库单元包，但可以拥有多个二进制单元包，`cargo.toml`没有指定`src/main.rs`就可以运行的原因是，`src/main.rs`默认是一个二进制单元包的根节点无需指定，如果包含`src/lib.rs`，则会视为与包同名的库单元包的根节点，如果在`src/bin`创建更多二进制单元包，这个路径下每个源文件都会视为独立的二进制包，每个包都具有自身的作用域，所以不会导致冲突

在 Rust 中，代码包被称为 **crates**，在`Cargo.toml`中主要通过以下方式描述项目的依赖：

+ 基于官方仓库，通过版本描述
+ 基于项目的 Git 仓库地址，通过 URL 描述
+ 基于本地项目的路径，通过类 Unix 的模式描述

```toml
[dependencies]
rand = "0.3"
hammer = { version = "0.5.0"}
color = { git = "https://github.com/bjz/color-rs" }
geometry = { path = "crates/geometry" }
```

将仓库默认地址替换为国内的地址，加快下载依赖的速度

```rust
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

第一次构建项目时会根据声明的依赖生成`Cargo.lock`，再次构建会优先检索该文件

::: tip
如果想要知道依赖的用法，可以使用`cargo doc --open`
:::

模块可以将单元包中的代码进行分组，允许控制条目的私有性

模块由：函数，结构体，接口，实现，子模块组成

## 属性

## 错误处理

## 标准库

默认情况下，Rust 设定了若干个会自动导入到每个程序作用域中的标准库内容，这组内容被称为**预导入**（preclude）内容，可以在标准库文档中查看预导入的所有内容。如果需要的类型不在预导入内容中，就必须使用`use`语句显式地将其引入作用域。比如`std::io`库提供很多有用的功能，包括接收用户输入的功能

### 输入

```rust
use std::io;
let mut input = String::new();
io::stdin()
    .read_line(&mut input)
    .expect("Failed to read line");
```

### 装箱

默认情况下所有值都是在栈中分配，通过`Box<T>`可以将值包装使它在堆上分配

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

::: tip
因为 Rust 在底层做了大量工作，自动识别输出数据的类型，所以不需要其他语言惯用的`%d`，`%s`来做占位符
:::

## 核心概念

### 所有权

在计算机中所有程序都必须和内存打交道，如何申请空间和释放空间很重要，因此编程语言出现了三种内存管理的流派：

+ 手动管理内存的分配和释放，在程序中通过函数的调用方式申请和释放内存，比如 C/C++
+ 垃圾回收机制（GC），在程序运行时不断寻找不使用的内存，比如 Java，Go
+ 通过所有权来管理内存，编译器在编译时会根据一系列规则来检查

::: tip 栈和堆
都是在内存中运行时可以使用的内存空间，栈存放已知固定大小的数据，无法在编译期确定的数据都只能放在堆中，相对比较松散，操作系统会将请求的堆空间作为特定的大小空间，并标记为已使用，把指向这块空间的指针返回，由此堆的性能肯定是不如栈的，如何管理堆内存这就是所有权存在的意义
:::

Rust 选择了第三种，这种检查只发生在编译期，因此对于运行期不会有任何性能损失，所有权机制的核心思想是：

+ 每个值都有一个所有者（Owner），该所有者是负责分配和释放该值所占用内存的变量或结构体
+ 当所有者被销毁（离开作用域）时，该值所占用的内存也会被自动释放

这种机制保证了内存分配的安全和有效性，并避免了一些内存相关的错误，如内存泄漏、空指针引用等等

比如字符串常量是不可变的，而 String 是可变的，是因为采用了不同的内存处理方式。对于字符串常量而言，在编译期就知道内容，所以会放在栈中。而有些文本是未知的，所以只能在堆上分配空间，其他语言使用 GC 或手动释放这块空间，而 Rust 会在拥有它的变量离开作用域后进行释放，调用一个特殊的`drop`函数，注意，会在所有作用域结束的地方自动调用该函数

```rust
{
  let str = String::form("hello"); // 从这里开始有效
}
// 变量 str 失效
```

在 Rust 中，所有权的转移是通过变量之间的赋值来实现的。当一个值被赋值给另一个变量时，所有权会从前者转移到后者，这叫做**移动**。如果数据是已知固定大小的简单值，则会拷贝并同时推入栈中。但如果是一个引用，则只会拷贝引用，并不会拷贝引用指向堆中的数据，这时会有两个变量指向同一个地址，就导致了一个问题，当离开作用域时，重复释放相同的内容，这就是二次释放。而 Rust 为了解决这一点，在所有权转移后，前者将无法再次访问该值。这种机制保证了值的唯一性和可变性，避免了二次释放带来的问题内存安全问题

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1); // s1 失效
```

在其它语言中可能叫做浅拷贝，但 Rust 使用移动来描述该行为，这里隐藏了一个设计原则：永远不会自动深拷贝，所以任何自动的赋值操作都是高效的

如果确实想要深拷贝，就可以使用一个`clone`方法

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

Rust 提供了一个名为 Copy 的 trait，一旦某种类型的变量拥有 Copy 这种 trait，那么该变量在赋值给其他变量时也会保持可用性，一般来说任何简单标量类型都是 Copy 的，而需要分配内存的资源都不是 Copy 的，比如：

+ 整数类型
+ bool
+ 字符类型
+ 浮点类型
+ 如果元组所有字段都是 Copy 的，那么这个元组也是 Copy 的

将值传给函数也会触发移动或复制，即便是返回值得时候也会发生所有权的转移

```rust
fn main() {
    let s1 = String::from("hello");
    takes_owership(s1); // s1 的值被移动进了函数
                        // s1 在这里开始不在有效
    let n1 = 5;         // n1 的值被复制到了函数
    makes_copy(n1);
                        // n1 由于是 Copy 的，所以仍然有效
}

fn takes_owership(value: String) { // 进入作用域
    println!("{}", value); 
} // 被释放

fn makes_copy(value: i32) {
    println!("{}", value);
} // 没有什么事情发生
```

### 借用

另外，为了处理一些复杂的场景，Rust 还提供了一些附加机制，如借用（Borrowing）

在下面这个例子中，希望函数保留参数的所有权，就必须将传入的值作为结果返回，但这非常麻烦

```rust
fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("{},{}", s2, len)
}

fn calculate_length(value: String) -> (String, usize) {
    let length = value.len();
    return (value, length);
}
```

如何在不获取所有权的前提下使用值，就要使用引用，在不转移所有权的前提下，使用`&`创建一个指向该变量值的引用，由于引用没有所有权，所以离开作用域时也不会销毁所指向的值

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("{}", len)
}

fn calculate_length(s: &String) -> usize { // s 是一个指向值的引用
    s.len()
} // 什么也不会发生
```

向这种通过引用传递参数给函数的方法就是借用，引用默认是不可变的，不允许去修改引用指向的值。如果想要修改引用的值需要将变量声明为`mut`，同时使用`&mut`传入可变引用

```rust
fn main() {
    let mut s1 = String::from("hello");
    change($mut s1);
}

fn change(s: &mut String) { // s 是一个可变引用
  s.push_str(", world");
}
```

但可变引用只能在作用域中声明一个，这种规则避免了数据竞争问题，但是可以巧妙地使用`{}`创建一个新的作用域来创建多个引用

```rust
let mut s1 = String::from("hello");

let r1 = &mut s1;
let r2 = &mut s1; // error
```

同时，不可变引用可以存在多个，但是不可以再拥有不可变引用的情况下同时创建可变引用，这是因为不可变引用只读操作不会影响其他读取数据的地方

### 切片

切片是另一种不需要所有权的类型，允许引用集合中一段连续的元素，字符串切片类型是`&str`，对一个字符串切片如下所示：

```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
```

`[start, end]`分别是开始索引和结束索引，这种语法有一个语法糖：

```rust
let hello = &s[..5];     // 从 0 开始
let world = &s[6..];     // 从 6 开始到末尾
let helloworld = $s[..]; // 整体切片
```

同时，字符串字面量就是切片，变量实际上是一个指向该值的不可变引用

### 生命周期

生命周期（Lifetime）等。借用机制允许多个变量共享同一个值的所有权，而生命周期机制则用于标记变量引用值的有效期，防止悬垂指针和内存泄漏等问题

## 宏

宏和函数有点像，只不过末尾有个`!`，但不产生函数调用，只是展开成源码一起编译

```rust
macro_rules! hello {
  () => {
    println!("hello");
  }
}

fn main() {
  hello!()
}
```

## Unsafe Rust

Unsafe Rust 是 Safe Rust 的超集，编译器依然会进行安全检查，但是下列情况除外：

+ 

如果使用 Safe Rust 和底层操作系统或其它语言打交道，此时的安全检查将鞭长莫及，所以这就是 Unsafe Rust 的意义

Unsafe Rust 不等于不安全，只是将安全性交给开发者自己判断

## 参考资料

+ [Rust 语言圣经](https://course.rs/about-book.html)
