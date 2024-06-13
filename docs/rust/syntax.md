---
title: 基本语法
category: 编程语言
tag: [Rust]
excerpt: "Rust 语法"
article: false
order: 1
---

这里是 Rust 的基本语法规则

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

### r\#

如果需要使用 Rust 关键字作为标识符，可以在关键字前面加上前缀 r#，这样编译器就会将其解析为标识符而非关键字。这个前缀可以用于任何 Rust 关键字

```rust
let r#return = 123;
```

## 变量和常量

`let`用来创建一个变量，并绑定一个值

```rust
let foo = 5;
```

::: tip 为什么是绑定而不是赋值？
涉及到核心原则，即所有权
:::

在 Rust 中变量默认是不可变的，这么做是因为让编译器保证一定不可变，声明`mut`表示可变，暗示其他代码可能改变

```rust
let mut foo = 5;
foo = 6;
```

`const`用来声明常量，常量只能被设置为常量表达式，而不能是任何在运行时计算出的值，因为编译时就会对常量进行求值，并内嵌

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

### Shadowing

可以在同一个作用域下声明多个变量，这并不意味着之前声明的变量消失了，只不过编译器会使用更近的那个，这被称为”Shadowing“

```rust
let x = 1;
let x = 2;
{
  let x = 3;
  println!("{x}"); // 3
}
println!("{x}"); // 2
```

### static

可`static`声明静态变量，它在整个程序执行过程中都不会被回收

```rust
static GLOBAL: i32 = 0;
```

::: caution 静态变量

+ 必须在声明的时候马上初始化
+ 初始化必须是编译期可确定的常量，不能包括执行期才能确定的表达式、语句和函数调用
+ 带有`mut`修饰的静态变量，在使用的时候必须使用`unsafe`关键字
:::

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
| 机器字  | isize       | usize  |

机器字值运行代码的的机器上内存地址的宽度，通常是 32 或 64

::: tip 整数溢出
如果将一个变量修改为某个超出范围的值就会发生整数溢出，如果在 Debug 模式编译，则会导致 panic。如果是 release 模式，不会触发 panic，但是超出类型最大值的数值会被“环绕”为类型最小值，比如在 u8 中，256 会变成 0，257 会变成 1，以此类推
:::

+ 浮点型：`f32`，32 字节，`f64`（默认），64 字节
+ 布尔型：`bool`，只有 1 字节
+ 字符型：`char`，使用单引号，都是 4 字节
+ 单元类型：`()`，唯一可能的值就是`()`这个空元组

::: tip
对于 ASCII 字符其实只需占用一个字节的空间，因此 Rust 提供了单字节字符字面量来表示，可以使用`b`来修饰字面量，代表这个字面量存储在 u8 类型的数组中，占用空间要比 char 数组更小

```rust
let x: u8 = 1;
let y: u8 = b'1';
let x: &[u8;5] = b'hello';
```

:::

Rust 有两个原生的复合类型：和数组（array）和元组（tuple）

### 类型转换

Rust 只能用`as`关键字进行显式类型转换，不支持隐式转换

```rust
let decimal = 1.2345;
let integer = decimal as u8;
```

::: warning
as 关键字用于 Rust 中原生数据类型间的转换。需要注意的是，短类型转换为长类型是没有问题的，但是长类型转换为短类型会被截断处理。此外，当有符号类型向无符号类型转换时，不适合使用 as 关键字
:::

数字与 String 类型间的转换是常见的场景。使用`to_string()`可以将任意数字转换为 String 类型，使用`parse()`可以将 String 类型解析为指定的数字类型

但有一些比较重要的自动转换，这也被称为“解引用强制转换”，因为他们实现了内置的 Defer trait

+ `&String -> &str`
+ `&Vec<T> -> &[T]`
+ `&Box<T> -> &T`

### 类型推导

Rust 类型推导也是很智能的，不仅可以通过右值推导类型，还能根据后续使用推导类型，因此不需要声明变量的类型

### 类型别名

`type`关键字可以定义某个类型的别名，但必须使用驼峰命名法

```rust
type Inch = u8;
let inches:inch = 8;
type Double<T> = (T, Vec<T>);
```

## 表达式

Rust 中几乎所有语句都是表达式，在一个语句上加`;`表示忽略该值

代码块也是表达式，代码块的值是其最后一个语句表达式的值，如果是以`;`结束，则返回`()`

```rust
let x = 1;
let y = {
  x * x
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

`if`语句表达式必须是个 bool 类型，Rust 不会隐式的将非 bool 类型转换为 bool

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

三种循环都是表达式

```rust
let mut counter = 0;
let result = loop {
  counter += 1;
  if counter == 10 {
    break counter * 2;
  }
}
```

::: tip
loop 是唯一返回有意义的值的循环结构。 这是因为它保证至少被输入一次
:::

`break`语句用于终止整个循环，`break`可以用于循环终止时需要返回的值，`continue`是`break`的轻量版本，不会终止整个循环，而是终止当前的迭代，并强制执行新的一轮循环

```rust
let x = loop {
  break 1;
};
println!("{x}") // 1
```

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

匹配任意值并绑定到变量

```rust
let n = 11;
match n {
  // 匹配一个值
  1 => println!("匹配一个值"),
  2 | 3 | 4 => println!("匹配多个值"),
  6..=10 => println!("匹配一个区间"),
  n => println!("{n}"),
}
```

当需要获取 pattern 中的一部分整体时，可以收用`@`

```rust
match [1, 2, 3] {
 [1, rest @ ..  ]  => { print!("{rest:?}") }, 
  _ => {  } 
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

### while let

`while let`用于处理循环中可选值的情况

```rust
let mut vec = vec![1, 2, 3];
// 匹配 Option
while let Some(value) = vec.pop() {
  println!("{value}");
}
```
