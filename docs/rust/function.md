---
title: 函数
category: 编程语言
tag: [Rust]
article: false
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

### type

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
