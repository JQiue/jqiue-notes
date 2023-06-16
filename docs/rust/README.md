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

编写一个代码，使用`rustc main.rs`进行编译生成可执行程序，最后执行生成的可执行程序

```rust
fn main() {
  println!("hello, world!");
}
```

Cargo 是官方构建工具，使用`cargo new <name>`创建，构建项目使用`cargo build`，构建结果在`target`下，优化构建则加上`--release`参数，`cargo run`或直接`run`会编译并运行可执行文件

```rust
.
├── .git
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

::: tip Cargo 常用命令

+ `cargo add <crates>`可以添加依赖项到`Cargo.toml`
+ `cargo update`更新依赖，可以增加`-p`指定依赖
+ `cargo clean`清除编译产物
+ `cargo check`在开发过程中检查代码
:::

`Cargo.toml`使用 TOML (Tom's Obvious, Minimal Language) 格式，这是 Cargo 配置文件的格式。`[package]`是一个片段（section）标题，表明下面的语句用来配置一个包。`[dependencies]`是项目依赖片段的开始

```toml
[package]
name = "hello_world" # 定义项目名字
version = "0.1.0"    # 定义项目版本
edition = "2021"     # 声明使用的 Rust 大版本，2015 2018 2021

[dependencies]
```

::: tip
可以在[这里](https://doc.rust-lang.org/cargo/reference/manifest.html)看到更多关于清单的描述
:::

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

| 符号 | 作用 |
| ---- | ---- |
| +    | 加法 |
| -    | 减法 |
| *    | 乘法 |
| /    | 除法 |
| %    | 取余 |

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

三种循环都可以返回值

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

### match

类似于`switch`，使用`match`来提供模式匹配，当仅需返回一个值就可以不使用代码块

```rust
let n = 6;
match n {
  // 匹配一个值
  1 => println!("匹配一个值"),
  2 | 3 | 4 => println!("匹配多个值"),
  6..=10 => println!("匹配一个区间"),
  _ => println!("其他情况"),
}
```

::: tip
`_`通配符来匹配没有指定的情况
:::

`match`也是一个表达式

```rust
let bol = true;
let binary = match bol {
  true => 1,
  false => 0,
};
```

可以使用绑定值的模式匹配，用于从枚举成员提取值

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz { x: i32, y: i32 },
}

let foo = Role::Foo(1);

match foo {
  Role::Foo(value) => {
    println!("{}", value);
  }
  Role::Bar(value) => {
    println!("{}", value);
  }
  Role::Qux(value) => {
    println!("{}", value);
  }
  Role::Baz { x, y } => {
    println!("{}, {}", x, y);
  }
}
```

### if let

`if let`是一个简单的控制流，相比`match`它只关心一种情况

```rust
let n = 6;
// 只有 n 为 6 才执行代码块
if let 6 = n {
  println!("{}", n)
}
```

当然也可以搭配`else`

```rust
let n = 6;
// 只有 n 为 6 才执行代码块
if let 6 = n {
  println!("{}", n)
} else {
  println!("n isn't 6")
}
```

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

## 数组

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

## 元组

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

## 结构体

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
  username: String::from("someusername123"),
  email: String::from("someone@example.com"),
};

// 实例化单元结构体
let _unit = Unit;

// 实例化元组结构体
let pair = Pair(1, 0.1);

// 通过 . 访问字段
user.username;
```

如果参数和字段名相同可以省略

```rust
let name = "JQiue".to_string();
let email = "someone@example.com".to_string();
let mut jqiue = User { name, email };
```

实例可变，那么字段就是可变的，不允许单独声明某个字段可变性

```rust
let mut user = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

### 方法

可以使用`impl`为结构体定义方法，和函数类似，方法的第一个参数总是`self`，可以是只读的或可变的，指向实例：

```rust
struct User {
  username: String,
  age: u32,
}

impl User {
  fn print_user(&self) {
    println!("{}", self.username);
  }
}

let jqiue = User {
  username: "JQiue".to_string(),
  age: 18
}

jqiue.print_user();
```

### 关联函数

除了方法，`impl`还可以定义不接收`self`的函数，但这类函数和结构体关联，所以被称为**关联函数（associated functions）**。因为它不作用于某个具体的实例，通常用来作为结构体的构造器来返回新的实例，使用`::`调用关联函数

```rust
struct User {
    username: String,
    email: String,
}

impl User {
    fn new(username: String, email: String) -> User {
        User {
          email,
          username,
        }
    }
}

let mut jqiue = User::new("jqiue", "861947542@qq.com");
```

可以拥有多个`impl`块，这是合法的

```rust
impl User {
  fn new(username: String, email: String) -> User {
    User {
      email,
      username,
    }
  }
}

impl User {
  fn print_user(&self) {}
}
```

## 枚举

`enum`关键字允许创建一个从多个不同取值中选其一的枚举类型

```rust
enum Role {
  Foo,
  Bar,
  Qux,
}
```

可以指定类型，甚至另一个枚举类型

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}
```

也可以像结构体那样使用`impl`定义方法

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}

impl Role {
  fn call(&self) {}
}
```

### Option

在 Rust 中，通常使用`Option<T>`泛型枚举类型来表示可能存在或不存在的值，它有两种变体：`Some(T)`和`None`，使用这种枚举类型用来明确的处理可能为空的值

```rust
fn divide(a: i32, b: i32) -> Option<i32> {
  if b != 0 {
    Some(a / b)
  } else {
    None
  }
}
fn main() {
  let result = divide(2, 0);

  match result {
    Some(value) => println!("{}", value),
    None => println!("Cannot divide by zero!"),
  }
}
```

## 集合

### 动态数组

`Vec<T>`也就是所谓的动态数组，动态数组允许在单个数据结构中存储多个相同类型的值

```rust
let v1: Vec<i32> = Vec::new();

// 或者简化代码的宏
let v2 = vec![1, 2, 3];
```

具有以下方法：

+ `push(value)` - 添加元素，会返回一个`Option<&T>`
+ `get(index)` - 获取元素，获取不到就返回`None`，而不会报错
+ `pop()` - 移除末尾元素，并返回，获取不到就返回`None`，而不会报错

如果持有了不可变引用，则尝试修改动态数组是不会成功的

```rust
let mut v = vec![1, 2, 3];
let first = &v[0];
v.push(4); // error
```

可以使用`for`来遍历每个元素

```rust
for item in v {
  println!("{}", item)
}
```

如果想要存储不同类型的元素，可以使用枚举来实现

```rust
enum SpreadsheetCell {
  Int(i32),
  Float(f32),
  Text(String),
}

let row = vec![
  SpreadsheetCell::Int(3),
  SpreadsheetCell::Float(3.13),
  SpreadsheetCell::Text("hello".to_string()),
];
```

### String

字符串本身是基于字符的集合，并通过方法将字节解析为文本。Rust 中有两种类型：`String`和`&str`，它们都是标准库的部分

```rust
// 使用 new 构建一个空串
let s1 = String::new();
// 调用 `to_string`
let s2 = "".to_string();
// 使用 from 基于字面量创建
let s3 = String::fron();
```

`String`的内容可以变化

```rust
let s = String::new();
// 使用 push_str
s.push_str("hello");
// 使用 push 
s.push_str(',');
// 使用 + 运算符，此时发生移动
s + "world";
```

这里的`+`会调用`add(self, s: &str)->String`方法，所以只能将`&str`和`String`相加，而不能`String`+`String`。为什么`&String`能够调用`add`是因为这里发生了解引用强制类型转换，将`&String`转换为了`&[..]`

使用`format!`也可以创建，它和`println!`原理相同，常用于复杂的字符串合并

```rust
let s = format!("{}-{}-{}", "a", "b", "c")
```

字符串不支持索引获取字符,但可以使用`chars`或`bytes`方法来遍历字符串

```rust
let mut s1 = String::from("hello, ");
// 返回 char 
for c in s1.chars() {
  println!("{}", c);
}
// 返回对应字节数
for c in s1.bytes() {
  println!("{}", c);
}
```

### HashMap

```rust
use std::collections::HashMap;

let mut colors = HashMap::new();
colors.insert("red", "红色");
colors.get("red");
```

## 闭包

rust 也支持函数式编程，比如闭包，使用`||`声明，并绑定到变量，就像普通函数一样调用

```rust
let my_closure = || println!("This is a closure");
my_closure();
```

在`||`之间可以添加参数

```rust
let add_one = |n: i32| n + 1;
add_one(1);
```

闭包如果只有一行逻辑，就可以省略`{}`，如果复杂也可以使用`{}`定义代码块

```rust
let add = |a: i32, b: i32| {
  let sum = a + b;
  sum
};
```

闭包还可以直接接收闭包以外的变量，这就是闭包的由来，它可以捕获作用域返回内的变量

```rust
let a = 1;
let b = 2;
let add = || a + b;
```

## 迭代器

在 rust中 ，迭代器是惰性的（layzy）。这也就意味着创建迭代器后，除⾮主动调用⽅法来消耗并使用迭代器，否则它们不会产⽣任何的实际效果

```rust
let v = vec![1, 2, 3];
let v_iter = v.iter();
for item in v {
  println!("{}", item);
}
```

所有的迭代器都实现了标准库中的`Iterator trait`，像下面这样

```rust
trait Iterator {
  type Item;

  fn next(&mut self) -> Option<self::Item>;
}
```

对于迭代器必须要定义一个具体的类型，而这个类型会作为`next`方法的返回值类型，每次调用`next`方法时，会返回一个包括元素的值`Some`，并在结束时返回`None`

rust 迭代器提供了很多方法：

+ `for_each` - 为每个元素执行一次闭包
+ `map` - 遍历每个元素，将结果映射到新的迭代器中并返回
+ `filter` - 根据条件过滤符合条件的元素，然后返回
+ `any` - 判断是否包含满足条件的元素，返回布尔值
+ `all` - 判断所有元素是否满足条件，返回布尔值
+ `max`和`min` - 返回迭代器中最大和最小的元素
+ `sum`和`min` - 返回迭代器中所有元素的和

## 泛型

在函数中定义泛型

```rust
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
  a + b
}

add(1, 2);
add(1.1, 2.2);
```

在结构体中定义泛型

```rust
struct Point<T> {
  x: T,
  y: T,
}

let p1 = Point { x: 1, y: 2 };
let p2 = Point { x: 1.1, y: 2.2 };
```

可以使用多个泛型参数

```rust
struct Point<T, U> {
  x: T,
  y: U,
}

let p = Point { x: 1, y: 2.2};
```

常见的枚举类型`Option<T>`和`Result<T, E>`都是泛型的例子

## 错误处理

Rust 将错误分为两大类：可恢复错误与不可恢复错误。对于可恢复错误，比如文件未找到等，⼀般需要将它们报告给用户并再次尝试进行操作。而不可恢复错误往往就是 bug 的另⼀种说法，比如尝试访问超出数组结尾的位置等。其他大部分的编程语言都没有刻意地区分这两种错误，而是通过异常之类的机制来统⼀处理它们。虽然 Rust 没有类似的异常机制，但它提供了用于可恢复错误的类型`Result<T, E>`，以及在程序出现不可恢复错误时终止运行的`panic!`宏

使用`panic!`会导致不可恢复错误，并打印一段错误提示信息，同时展开并清理当前的调用栈，然后退出程序

```rust
fn main() {
  panic!("燃烧吧！");
}
```

::: tip 直接终止
可以向 Cargo.toml 中添加的`[profile]`区域添加`panic='abort'`来直接终止展开，这样就不会执行任何清理工作，由 OS 来进行回收，也可以在 release 模式使用，`[profile.release]`
:::

### Result

大部分错误没有严重到需要终止程序的地步，与`Option`枚举类型一样，`Result`也被预导入，有两个变体：`Ok`和`Err`，比如在读取文件中

```rust
use std::fs::File;

fn main() {
  let file = File::open("hello.txt");
  match file {
    Ok(file) => {
      println!("找到啦")
    }
    Err(error) => {
      panic!("{}", err)
    }
  }
}
```

无论如何，当 open 失败时都会触发 panic，但是想要根据不同的失败原因来做出处理反应，比如文件不存在时，可以创建这个文件并返回

```rust
use std::{fs::File, io::ErrorKind};

fn main() {
  let file = File::open("hello.txt");
  let file = match file {
    Ok(file) => file,
    Err(error) => match error.kind() {
      ErrorKind::NotFound => match File::create("hello.txt") {
        Ok(fc) => fc,
        Err(e) => panic!("Tried to create file but therr was a problem: {:?}", e),
      },
      other_error => panic!("There was a problem opening the file: {:?}", other_error),
    },
  };
}
```

match 表达式确实有用，但可能用闭包更好一些，看起来阅读性更好

```rust
fn main() {
  let file = File::open("hello.txt").map_err(|error| {
    if error.kind() == ErrorKind::NotFound {
      File::create("hello.txt").unwrap_or_else(|error| {
        panic!("Tried to create file but therr was a problem: {:?}", error)
      });
    } else {
      panic!("There was a problem opening the file: {:?}", error);
    }
  });
}
```

对于`Result`类型本身也定义了很多方法用来应对，比如`unwrap`方法，当返回值是 OK 则返回内部值，否则就会调用`panic!`

```rust
let file = File::open("hello.txt").unwrap();
```

还有一个`expect`用于在`unwrap`的基础上指定错误信息

```rust
let file = File::open("hello.txt").expect("Failed to open hello.txt");
```

Rust 提供了`?`运算符用来传播错误，用来将错误返回给调用者，如果出现错误，就会提前终止函数执行，并返回错误。只能用于返回`Result`类型的函数

```rust
fn read_file() -> Result<String, io::Error> {
  let mut file = File::open("hello.txt")?;
  let mut s = String::new();
  file.read_to_string(&mut s)?;
  Ok(s)
}
```

## trait

`trait`与其他语⾔中常被称为接口（interface）的功能类似，但也不尽相同，`trait`被用来描述某些特定类型能够拥有的且能够被其他类型共享的功能。类型的行为由方法组成，当在不同类型上调用了相同的方法时，就称这些类型共享了相同的行为，`trait`提供了将指定方法组合起来的途径

```rust
trait Summary {
  fn summarize(&self) -> String;
}

struct NewsArticle {
  author: String,
  content: String,
}

impl Summary for NewsArticle {
  fn summarize(&self) -> String {
    format!("author: {}, content: {}", self.author, self.content)
  }
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for Tweet {
  fn summarize(&self) -> String {
    format!("username: {}, content: {}", self.username, self.content)
  }
}
```

使用`trait`来声明 trait，可以声明方法签名并省略具体实现，以分号直接结束，每一个类型就可以实现该 trait，实现该类型 trait 方法的行为

当然也可以拥有默认实现的 trait，这就可以指定空的实现，使用默认的 trait 实现，但也不会影响已有的实现，实现了重载

```rust
trait Summary {
  fn summarize(&self) -> String {
    "Read more...".to_string()
  }
}

struct NewsArticle {
  author: String,
  content: String,
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for NewsArticle {}

impl Summary for Tweet {
  fn summarize(&self) -> String {
    format!("username: {}, content: {}", self.username, self.content)
  }
}
```

在 trait 中可以调用其他方法，哪怕没有默认实现

```rust
trait Summary {
  fn summarize(&self) -> String {
    format!("Read more from {}...", self.summarize_author())
  }
  fn summarize_author(&self) -> String;
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for Tweet {
  fn summarize_author(&self) -> String {
    format!("@{}", self.username)
  }
}
```

使用 trait 作为函数参数，这一参数就只能接收任何实现该 trait 的类型，传入其他类型会导致无法通过编译

```rust
fn notify(item: impl Summary) {
  println!("{}", item.summarize());
}
```

但这种只是一个 trait 约束的语法糖，实际上是这样的

```rust
fn notify<T: Summary>(item: T) {
  println!("{}", item.summarize());
}
```

可以使用`+`来指定多个 trait 约束

```rust
fn notify(item: impl Foo + Bar) {}
fn notify<T: Foo + Bar>(item: T) {}
```

如果有多个泛型约束，过多的的 trait 就会导致难以理解，`where`解决了这一点，这样看起来函数签名容易理解的多

```rust
fn sn<T: Foo + Bar, U: Display + Clone>(t: T, u: U) -> i32;
fn sn<T, U>(t: T, u: U) -> i32 where T: Foo + Bar,U: Display + Clone;
```

同样可以返回实现 trait 的类型，但只能返回一个类型，并不支持返回多个类型的写法

```rust
fn returns_summarizable() -> impl Summary {
  Tweet {
    username: "".to_string(),
    content: "".to_string()
  }
}
```

## 智能指针

指针（pointer）是⼀个通用概念，它指代那些包含内存地址的变量，比如`&`就是表示会借用它所指向的值，除了指向数据外没有任何其他功能。而智能指针（smart pointer）则是⼀些数据结构，它们的行为类似于指针但拥有额外的元数据和附加功能。智能指针的概念并不是Rust 所独有的，它最初起源于 C++ 并被⼴泛地应用在多种语言中

在拥有所有权和借用概念的 Rust 中，引用和智能指针之间还有另外⼀个差别：引用是只借用数据的指针；而与之相反地，大多数智能指针本⾝就拥有它们指向的数据。比如`String`和`Vec<T>`都是智能指针，以下是标准库中常见的智能指针：

+ `Box<T>`，用于在堆上分配值
+ `Rc<T>`，允许多重所有权的引用计数类型
+ `Ref<T>`和`RefMut<T>`，可以在运行时而不是编译时执行借用规则的类型

默认情况下所有值都是在栈中分配，通过`Box<T>`可以将值包装使它在堆上分配

```rust
let a = Box::new(5);
```

这种单一值放在堆上没有太多用处，看下下面的枚举，由于 Rust 必须在编译期知道每一种类型的占用大小，而递归是不能够确定大小的

```rust
enum List {
  Cons(i32, List),
  Nil,
}
```

由于无法推断递归类型的大小，但是可以间接的通过`Box<T>`来确定大小，因为它是一个指针，指针的大小是恒定的，不会因为数据的大小产生变化，所以可以将以上的代码放到堆上

```rust
enum List {
  Cons(i32, Box<List>),
  Nil
}

let list = List::Cons(1, 
  Box::new(List::Cons(2, 
    Box::new(List::Nil))));
```

通过装箱，就打破了无限递归的过程，从而使编译器可以计算出一个`List`需要多大的空间

每个变量拥有一个所有者，这就是下面代码不能工作的原因

```rust
fn takes_a_string(input: String) {
  println!("It is: {}", input)
}

fn also_takes_a_string(input: String) {
  println!("It is: {}", input)
}

fn main() {
  let user_name = String::from("User MacUserson");
  
  takes_a_string(user_name);
  also_takes_a_string(user_name); // error
}
```

而`Rc<T>`可以打破这一点，让多重所有权发生

```rust
fn main() {
  let s = Rc::new("hello".to_string());
  takes_a_string(s.to_string());
  also_takes_a_string(s.to_string());
}
```

但是`Rc<T>`是通过不可变引用使程序共享只读数据，如果允许持有多个可变引用，就会违反借用规则导致数据竞争，而`RefCell<T>`允许持有不可变引用的前提下对数据进行修改，也就是说某些特定情况下，需要一个值对外保持不可变的同时能够使用方法内部修改自身，`RefCell`通过`borrow`和`borrow_mut`来提供方法

```rust
let s = RefCell::new("hello".to_string());
takes_a_string(s.borrow().to_string());
s.borrow_mut().push_str("world");
also_takes_a_string(s.borrow().to_string());
```

将`Rc<T>`和`RefCell<T>`结合起来拥有一个多重所有权的可变数据也是很常用的

总结来说：

+ `Rc<T>`允许⼀份数据有多个所有者，而`Box<T>`和`RefCell<T>`都只有⼀个所有者
+ `Box<T>`允许在编译时检查的可变或不可变借⽤，`Rc<T>`仅允许编译时检查的不可变借⽤，`RefCell<T>`类型则通过其内部可变性模式使我们可以修改⼀个不可变类型的内部值，是在运行时而不是编译时
+ 由于`RefCell<T>`允许我们在运行时检查可变借⽤，所以即便`RefCell<T>`本⾝是不可变的，我们仍然能够更改其中存储的值
+ `Box<T>`类型拥有固定的⼤⼩并指向⼀段分配于堆上的数据
+ `Rc<T>`类型通过记录堆上数据的引⽤次数使该数据可以拥有多个所有者

## 并发

并发编程（concurrent programming）与并行编程（parallel programming）这两种概念随着计算机设备的多核心化而变得越来越重要。前者允许程序中的不同部分相互独立地运行，而后者则允许程序中的不同部分同时执行

可以使用`thread:spawn`创建新的线程，接受一个闭包，在闭包中运行新线程中的代码

```rust
use std::{
  thread::{self, spawn},
  time::Duration,
};

fn main() {
  spawn(|| {
    for i in 1..10 {
      println!("{} from the spawned thread!", i);
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for i in 1..10 {
    println!("{} from the main thread!", i);
    thread::sleep(Duration::from_millis(1000));
  }
}
```

上面的代码只要主线程运行结束，创建的新线程会立即停止，无论是否运行完成，`thread::sleep`会让当前的线程停止执行一段时间，并允许一个不同的线程继续运行，但无法保证执行顺序，这取决于操作系统的线程调度策略。新线程会返回一个自持所有权的 JoinHandle，调用它的`join`方法可以堵塞当前线程知道对应的新线程运行结束，这就能保证新线程能够在主线程退出执行完毕，所以在并发编程中，调用`join`的时机值得注意

```rust
use std::{
  thread::{self, spawn},
  time::Duration,
};

fn main() {
  let handle = spawn(|| {
    for i in 1..10 {
      println!("{} from the spawned thread!", i);
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for i in 1..10 {
    println!("{} from the main thread!", i);
    thread::sleep(Duration::from_millis(1000));
  }
  handle.join().unwrap();
}
```

使用 move 闭包可以让某个线程使用另一个线程的数据，比如下面的代码是行不通的，这是因为闭包捕获`v`，而又因为在新线程中允许这个闭包，但这导致了一个问题，Rust 不知道新线程运行多久，所以不能确定`v`的引用是否一直有效

```rust
use std::thread;
fn main() {
  let v = vec![1, 2, 3];
  let handle = thread::spawn(|| {
    println!("Here's a vector: {:?}", v);
  });
  handle.join().unwrap();
}
```

如果加上`move`关键字，就会强制闭包获取它的所有权，不再借助 rust 的推导，当然也让主线程无法再使用这个引用

```rust
use std::thread;
fn main() {
  let v = vec![1, 2, 3];
  let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
  });
  handle.join().unwrap();
}
```

如果需要再进程之间通信，则使用消息传递机制就可以了，rust 实现了一个名为 channel 的编程概念，通常由发送者和接收者两个部分组成

```rust
fn main() {
  // 返回一个含有发送端和接收端的元组
  let (tx, rx) = channel();
  spawn(move || {
    tx.send("hello").unwrap(); // 发送数据
  });
  let received = rx.recv().unwrap();  // 接收数据
  println!("{}", received);
}
```

在接收端有两个方法`recv`和`try_recv`，前者会堵塞主线程执行只到有值传入通道，返回`Result<T, E>`，如果通道的发送端全部关闭了，就会返回一个错误来表示当前通道再也没有需要接受的数据。而后者不会堵塞线程，它会立即返回`Result<T,E>`，当通道有数据时返回`Ok`，否则返回`Err`

这段代码很显而易见的表明主线程确实在等待新线程发送的值，并且将`rx`视为迭代器，不再调用`recv`方法

```rust
fn main() {
  let (tx, rx) = channel();
  spawn(move || {
    let vals = vec!["hello", ",", "world"];
    for val in vals {
      tx.send(val).unwrap();
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for received in rx {
    println!("{}", received);
  }
}
```

::: tip
`send`会获得参数的所有权，一旦被发出，后续就不能够再使用，这可以阻止使用已发送的值
:::

通过消息传递是一种不错的并发通信机制，通过共享内存是另一种解决方案，互斥体在任意时刻只允许一个线程访问数据，因此线程必须首先发出信号来获取互斥体的锁，这种数据结构用来记录谁当前拥有数据的唯一访问权，但互斥体非常难用，因为它的规则：

+ 在使用数据前必须尝试获取锁
+ 使用完互斥体守护的数据后必须释放锁，这样其他线程才能继续完成获取锁的操作

但在 rust 中，由于类型系统和所有权，可以保证不会在加锁和解锁这两个步骤中出现错误，其中`Mutex<T>`是一个智能指针，创建一个共享内存的互斥体，而它的方法`lock`用于获取锁来访问数据，这个调用会堵塞当前线程直到取得锁为止，一旦拿到了锁，就可以将返回值看作指向数据的可变引用，rust 会在使用数据之前加锁，直到离开作用域就会自动释放锁

```rust
fn main() {
  let counter = Arc::new(Mutex::new(0));
  let mut handles = vec![];
  for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = spawn(move || {
      let mut num = counter.lock().unwrap();
      *num += 1;
    });
    handles.push(handle);
  }
  for handle in handles {
    handle.join().unwrap();
  }
  println!("{}", counter.lock().unwrap());
}
```

在以上代码中，`Arc<T>`是一个和`Rc<T>`类似的引用计数指针，但是`Rc<T>`在多线程中并不安全，而`Arc<T>`是一个原子引用计数，保证安全的在多个线程中共享，但是要付出一定的性能开销，所以`Rc<T>`适合在单线程中

## 包，单元包，模块，路径

一个包只能拥有一个库单元包，但可以拥有多个二进制单元包，`cargo.toml`没有指定`src/main.rs`就可以运行的原因是因为`src/main.rs`默认是一个二进制单元包的根节点无需指定，如果包含`src/lib.rs`，则会视为与包同名的库单元包的根节点，如果在`src/bin`创建更多二进制单元包，这个路径下每个源文件都会视为独立的二进制包，每个包都具有自身的作用域，所以不会导致冲突

在 Rust 中，代码包被称为 **crate**，在`Cargo.toml`中主要通过以下方式描述项目的依赖：

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

模块可以将单元包中的代码进行分组，使用`mod`声明，允许控制条目的私有性，模块条目：函数，结构体，接口，实现以及子模块默认是私有的，可以使用`pub`关键字暴露路径

```rust
mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    fn add_two() {}
  }
}
```

可以使用绝对路径或相对路径来调用其中的函数

```rust
mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    fn add_two() {}
  }
}

fn test() {
  // 绝对路径
  crate::foo::foo_a::add_one();
  // 相对路径
  foo::foo_a::add_one();
}
```

也可以使用`super`关键字从父模块构造相对路径，好处是将来需要移动代码时避免更新这部分相对路径

```rust
fn a() {}

mod foo {
  fn add_one() {
    super::a();
  }
  mod foo_a {
    fn add_two() {
      super::add_one();
    }
  }
}
```

定义结构体时，它的字段本身保持私有状态，所以可以决定是否将某个字段公开，与此同时应当注意提供一个构造函数，否则是无法构造实例的

```rust
mod foo {
  pub struct User {
    pub username: String,
    phone: String,
  }
  impl User {
    pub fn new(username: &str, phone: &str) -> User {
      User {
        username: username.to_string(),
        phone: phone.to_string(),
      }
    }
  }
}

fn test() {
  let jqiue = foo::User::new("JQiue", "188****419");
}
```

枚举成员是默认公开的，否则不能实现最大作用

```rust
pub foo {
  pub enum Appetizer {
    Soup,
    Salad,
  }
}
```

使用`use`关键字可以简化使用相对路径和绝对路径的写法

```rust
use foo::foo_a::add_one;

mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    pub fn add_two() {}
  }
}

fn test() {
  add_one()
}
```

可以使用`as`为类型指定别名，它同样解决了使用`use`无法区分类型问题

```rust
use std::fmt::Result;
use std::io::Result as IoResult;
```

使用`mod`声明模块时，也会搜索同名文件中模块的代码，这意味着模块可以拆分为不同的文件

```rust
// src/lib.rs
mod front_of_house;

pub fn eat_at_restaurant() {}

// src/front_of_house
pub mod hosting {
  pub fn add_to_waitlist() {}
}
```

## 属性

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

### 格式化输出

打印操作由`std::fmt`里面所定义的一系列宏来处理，包括：

+ `format!`：将格式化文本写到字符串。
+ `print!`：与 format! 类似，但将文本输出到控制台（io::stdout）
+ `println!`: 与 print! 类似，但输出结果追加一个换行符
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

对于所有的基础类型都默认实现了 Display，但没有为结构体提供默认的 Display 实现，因此需要告知宏`{:?}`使用名为 Debug 的 trait 打印出友好形式的结构体

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

如果在不获取所有权的前提下使用值，就要使用引用，在不转移所有权的前提下，使用`&`创建一个指向该变量值的引用，由于引用没有所有权，所以离开作用域时也不会销毁所指向的值

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

像这种通过引用传递参数给函数的方法就是借用，而引用默认是不可变的，不允许去修改引用指向的值。只有声明变量为`mut`，同时使用`&mut`传入可变引用才可以修改

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

普通泛型保证类型具有期望的行为，生命周期是另外一种泛型，用于确保引用的有效期，防止悬垂指针和内存泄漏等问题。每个引用都有自己的生命周期，对应着引用有效时的作用域，大多数情况都可以被推导出来，当出现多个可能的类型就必须手动声明类型，而当引用的生命周期可能以不同的方式相关联，就必须手动标注生命周期，用来确保运行时引用是有效的

在这段代码中，由于 x 离开作用域就会释放，导致这段代码不合法，因为 x 的生命周期没有活到打印它的范围，所以编译失败

```rust
{
  let r;
  {
    let x = 5;
    r = &x;
  }
  println!("r: {}", r);
}
```

在这段代码中，返回字符最长的那个切片类型，就涉及到生命周期错误，因为无法确定返回的引用是 x 还是 y，所以无法知晓传入的引用的具体生命周期，也不能用生命周期检查其来确定，因此需要补充一个泛型生命周期参数，来定义引用之间的关系，从而使检查器进行分析

```rust
fn longest<'a'>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}
```

生命周期参数语法必须以`'`开头，通常使用小写字符，和泛型一样简短，`'a`通常是开发者默认使用的名称，一般会将生命周期参数填写到`&`的后面，并用一个空格与引用类型分开，在上面这个函数中的意思就是，参数和返回值的所有引用都必须拥有相同的生命周期，它们活的一样长

在没有显式标注的情况下，使用了以下规则来计算引用的生命周期：

+ 每个引用参数都有自己的生命周期参数，`fn foo<'a>(x: &'a i32');`，多个参数拥有两个不同的生命周期参数，`fn foo<'a, 'b>(x: &'a i32', y: &'b i32);`，以此类推
+ 当只存在一个输入生命周期参数时，这个生命周期参数会被赋予所有输出生命周期参数，`fn foo<'a>(x: &'a i32) -> &'a i32`
+ 当拥有多个输入生命周期参数，而其中一个是`&self`或`&mut self`时，`self`的生命周期会被赋予所有的输出生命周期参数

```rust
fn first_word(s: &str) -> &str {}
// 第一条规则
fn first_word<'a>(s: &'a str) -> &str {}
// 第二条规则
fn first_word<'a>(s: &'a str) -> &'a str {}

// 不适用任何规则，无法推导生命周期，所以需要标注
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {}
```

rust 还有一种特殊的生命周期`'static`，它表示整个程序的执行期，意味着在程序中总是可以用的，不过需要思考是否需要该引用存活的那么久，否则就会尝试创建一个悬垂引用

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

如果使用 Safe Rust 和底层操作系统或其它语言打交道，此时的安全检查将鞭长莫及，所以这就是 Unsafe Rust 的意义，Unsafe Rust 不等于不安全，只是将安全性交给开发者自己判断

Unsafe Rust 是 Safe Rust 的超集，编译器依然会进行安全检查，但是下列情况除外：

+ 解引用裸指针
+ 调用不安全的函数
+ 访问或修改可变的静态变量
+ 实现不安全的 trait

## 工作空间

工作空间用于将代码拆分多个代码包，`Cargo.toml`有所不同，以`workspace`区域开始，同时指定二进制包的位置来添加成员

```toml
[workspace]

members=[
  "main"
]
```

此时整个目录如下：

```
├── Cargo.lock
├── Cargo.toml
├── main
│ ├── Cargo.toml
│ └── src
│     └── main.rs
└── target
```

`cargo build`会将所有成员的产物放在根目录的`target`中

添加一个库包`cargo new add-one --lib`，此时目录如下：

```
├── Cargo.lock
├── Cargo.toml
├── add-one
│ ├── Cargo.toml
│ └── src
│ └── lib.rs
├── main
│ ├── Cargo.toml
│ └── src
│ └── main.rs
└── target
```

cargo 不会自动引入依赖，所以需要主动引入包之间的依赖关系

```toml
[package]
name = "main"
version = "0.1.0"
edition = "2021"

[dependencies]
add-one = { path = "../add-one" }
```

为了在根目录运行二进制包，需要使用`cargo run -p main`来指定

整个工作空间只会在根目录下有`Cargo.lock`文件，即使在每个包中添加相同的依赖包，cargo 也不会重复下载，保证相同的包都是一个版本，节约了磁盘空间，确保了包之间彼此兼容

## 基准测试

在 Rust 中，有两种方式可以实现：

+ 官方提供的`benchmark`
+ 社区实现，例如`criterion.rs`

官方提供的测试工具只能在非 stable 下使用，首先切换 Rust 版本

1. 安装`nightly`，`rustup install nightly`
2. 切换到`ngihtly`，`rustup override set nightly`

然后在代码中编写`benchmark`代码

```rust
#![feature(test)]

extern crate test;

fn sum(mut count: i32) {
  let mut num = 0;
  while count > 0 {
    num += count;
    count -= 1;
  }
  println!("{num}");
}

#[bench]
fn bench_test(b: &mut Bencher) {
  b.iter(|| sum(10000));
}
```

标有`#[bench]`的函数，`iter`接收没有参数的闭包用于使基准测试重复运行。在进行测试后会显示以 ns 为单位的执行每次迭代花费的时间

标准版的`benchmark`最有名的是`criterion.rs`，有以下特点：

+ 统计分析，跟上一次的结果进行对比
+ 图表

首先在`Cargo.toml`添加以下内容：

```toml
[dev-dependencies]
criterion = "0.5"

[[bench]]
name = "fibonacci"
harness = false
```

其中`[[bench]]`中的`name`和`benches/`目录下的文件名匹配，`harness`表示不使用内置的基准测试工具，随后就可以在`benches/fibonacci.rs`中编写测试代码了

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

pub fn slow_fibonacci(nth: usize) -> u64 {
  if nth <= 1 {
    return nth as u64;
  } else {
    return slow_fibonacci(nth - 1) + slow_fibonacci(nth - 2);
  }
}

pub fn fast_fibonacci(nth: usize) -> u64 {
  let mut a = 0;
  let mut b = 1;
  let mut c = 0;
  for _ in 1..nth {
    c = a + b;
    a = b;
    b = c;
  }
  c
}

fn fibonacci_benchmark(c: &mut Criterion) {
  c.bench_function("fib 20", |b: &mut criterion::Bencher| {
    b.iter(|| slow_fibonacci(black_box(20)))
  });
}

criterion_group!(benches, fibonacci_benchmark);
criterion_main!(benches);
```

`bench_function`函数是用于在给定的名称的闭包中运行基准代码，随后就可以使用`cargo bench`运行了

## 工具链

rustfmt

## 参考资料

+ [Rust 语言圣经](https://course.rs/about-book.html)
+ Rust 权威指南
+ [Easy Rust](https://dhghomon.github.io/easy_rust/)
