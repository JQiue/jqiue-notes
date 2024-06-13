---
title: 异步编程
category: 编程语言
tag: [Rust]
article: false
order: 10
---

Rust 借鉴了 JavasSript 来编写异步编程，当需要高并发，异步 I/O 就需要改模型了

Rust 和 JavaScript 有所不同：

+ Future 是惰性的，只有被轮询时才会执行
+ 没有内置异步调用所必需的运行时
+ 运行时同时支持单线程和多线程

异步和多线程都可以实现并发编程，但异步更适合 IO 密集型任务，可以有效地降低 CPU 和内存的负担

## Futures

`async/.await`是 Rust 提供的特性，通过`async`标记的函数会转换为 Future，Future 执行遇到堵塞会让出线程的控制权，这就不会导致线程堵塞，首先需要引入`futures`包

```toml
[dependencies]
futures = "0.3"
```

创建一个异步函数

```rust
async fn foo() {
  println!("foo");
}
```

即使调用它也不会执行，因为 Future 是惰性的

```rust
fn main() {
  foo();
}
```

此时应使用`block_on`执行器等待 Future 的完成，让代码看起来像同步的

```rust
use futures::executor::block_on;

fn main() {
  block_on(foo());
}
```

如果想在一个异步函数中调用另一个异步函数，可以使用`.await`语法进行调用

```rust
async fn bar() {
  println!("bar");
}

async fn foo() {
  println!("foo");
  
  bar().await;
}
```

Futures 更适合于需要更底层控制的场景，或者想要自行构建异步运行时的场景

## Tokio

Tokio 是在 Futures 之上构建的一个功能更加丰富的异步运行时库，更适合于大多数常见的网络编程、I/O密集型应用开发场景，提供了更加开箱即用的功能

Tokio 的主要特点包括：

+ 高性能：Tokio 使用 Rust 的并发特性和内存管理，可以提供非常高的性能和吞吐量
+ 可扩展性：Tokio 支持各种异步 I/O 原语，如 TCP、UDP、文件 I/O 等，可以用于构建各种类型的异步应用程序
+ 易用性：Tokio 提供了一个易于使用的API，隐藏了底层的异步细节，使开发人员可以专注于应用程序逻辑
+ 可靠性：Tokio 利用 Rust 的类型系统和所有权模型，可以帮助开发人员编写安全和正确的异步代码
