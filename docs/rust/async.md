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

async 和多线程都可以实现并发编程，但 async 更适合 IO 密集型任务，可以有效地降低 CPU 和内存的负担

`async/.await`是 Rust 提供的特性，通过 async 标记的函数会转换为 Future，Future 执行遇到堵塞会让出线程的控制权，这就不会导致线程堵塞，首先需要引入`futures`包

```toml
[dependencies]
futures = "0.3"
```

使用 async 创建一个异步函数

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
