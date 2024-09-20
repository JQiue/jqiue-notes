---
title: 函数
category: 编程语言
tag: [Rust]
article: false
order: 2
---

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

## 无返回值

`()`可以用来表达一个函数没有返回值，当没有返回值或以`;`结尾的表达式

```rust
// 隐式
fn foo() {}
// 显式
fn bar() -> () {}
```

## main

`main`是特殊的函数，所有代码都从这个入口中开始运行，但传递参数和返回状态码都由单独的 API 来完成

```rust
fn main() {
  for arg in std::env::args() {
    println!("Arg: {}", arg);
  }
  std::process::exit(0);
}
```

## 发散函数

当用`!`作为返回类型时，表示函数永不返回

```rust
fn forever() -> ! {
  loop {};
}
```

发散类型的最大特点就是，它可以被转换为任意一个类型

```rust
fn diverges() -> ! {
    panic!("This function never returns!");
}

fn main() {
  let x: i32 = diverges();
  let y: String = diverges();
  let p = if x {
    panic!("error");
  } else {
    100
  };
}
```

## 函数指针

将一个函数作为值进行传递是函数式编程的关键，Rust 允许通过引用将函数作为一等值传递的能力

```rust
fn hello() {}

fn main() {
  let hello_ref: fn() = hello;
  // 打印函数指针
  println!("{:p}", hello);
  // 调用
  hello_ref();
}
```

函数指针通常用于需要传递纯函数而没有任何捕获的上下文的情况

## 闭包

使用`||`声明，并绑定到变量，就像普通函数一样调用

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

### move

闭包还可以直接捕获闭包以外的变量，这就是闭包的由来，它可以捕获作用域范围内的变量

```rust
let a = 1;
let b = 2;
let add = || a + b;
```

### 回调

很多库提供的 API 会使用回调，也就是用户提供的函数，供库在以后调用

### 性能

Rust 的闭包与大多数其他语言中的闭包不同，最大的区别是在有垃圾回收的语言中，可以在闭包中使用局部变量而无须考虑生命期或所有权。Rust 闭包的设计保证它非常快，比函数指针还要快，快到完全可以用在强度和性能要求极高的环境下。在大多数语言中，闭包是分配在堆上，动态分派，然后由垃圾回收程序负责回收的，因此创建、调用和回收它们都会多花那么一点点 CPU 时间

Rust 闭包完全没有这些性能上的缺点，Rust 没有垃圾回收。与 Rust 中的其他特性一样，闭包不会被分配到堆上，除非把它们装到 Box、Vec 或其他容器里。而且因为每个闭包都有一个不同的类型，所以 Rust 编译器只要知道了你所调用闭包的类型，就可以将该闭包的代码行内化

## 别名

函数作为参数时，为了提升代码可读性，可以使用 type 关键字为函数指针类型定义别名

```rust
type MathOp = fn(i32, i32) -> i32;

fn math(op: MathOp, x: i32, y: i32) -> i32 {
  op(x, y)
}

fn add(x: i32, y: i32) -> i32 {
  x + y
}

fn subtract(x: i32, y: i32) -> i32 {
  x - y
}

fn main() {
  println!("add result: {}", math(add, 1, 1));
  println!("subtract result: {}", math(subtract, 1, 1));
}
```
