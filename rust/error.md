---
title: 错误处理
category: 编程语言
tag: [Rust]
article: false
order: 8
---

Rust 的错误处理并不是在运行时临时补救，而是通过类型系统和控制流把“错误要不要处理”这件事提前摆到代码表面。

如果想先看错误处理的通用模型，可以先读 [编程语言中的错误处理模型](/sundry/error.html)。本篇只关注 Rust 自己的做法：`panic!`、`Result<T, E>`、`?`、自定义错误类型，以及实际开发中的边界选择。

## Rust 如何区分错误

Rust 通常把错误分成两类：

1. 可恢复错误：通过 `Result<T, E>` 表示，例如文件不存在、网络请求失败、解析失败
2. 不可恢复错误：通过 `panic!` 终止当前线程，通常意味着程序进入了不该继续运行的状态

这种划分的重点不在“严重程度”，而在“调用者是否还有合理的处理空间”。

## `panic!`：不可恢复错误

`panic!` 用于处理程序已经无法合理继续执行的情况：

```rust
fn main() {
  panic!("燃烧吧！");
}
```

发生 panic 后，Rust 默认会展开调用栈（unwind），清理沿途作用域中的资源。如果希望在发布版本中直接终止程序而不是展开栈，可以在 `Cargo.toml` 中设置：

```toml
[profile.release]
panic = "abort"
```

一般来说，`panic!` 更适合表示：

+ 明确的程序 bug
+ 被破坏的内部不变量
+ 不值得恢复的致命状态

如果一个错误理论上应该交给调用者决定如何处理，那它通常就不该直接变成 panic。

## `Result<T, E>`：可恢复错误

Rust 处理可恢复错误的核心类型是 `Result<T, E>`：

```rust
enum Result<T, E> {
  Ok(T),
  Err(E),
}
```

它要求调用者显式面对两种结果：成功还是失败。

例如读取文件：

```rust
use std::fs::File;

fn main() {
  let file = File::open("hello.txt");

  match file {
    Ok(file) => println!("{:?}", file),
    Err(error) => println!("{:?}", error),
  }
}
```

如果想根据不同错误类型分别处理，可以继续匹配 `Err` 中的具体值：

```rust
use std::{fs::File, io::ErrorKind};

fn main() {
  let file = File::open("hello.txt");

  let file = match file {
    Ok(file) => file,
    Err(error) => match error.kind() {
      ErrorKind::NotFound => match File::create("hello.txt") {
        Ok(file) => file,
        Err(error) => panic!("Tried to create file but there was a problem: {:?}", error),
      },
      other_error => panic!("There was a problem opening the file: {:?}", other_error),
    },
  };

  println!("{:?}", file);
}
```

这段代码体现了 Rust 的典型风格：错误不是隐藏在控制流之外，而是直接进入分支判断。

## `?`：让错误传播更安静

显式匹配虽然清楚，但在多层调用中会很吵。因此 Rust 提供了 `?` 运算符，用来在遇到 `Err` 时立刻把错误向上传播。

```rust
use std::fs::File;
use std::io;

fn open_file() -> Result<File, io::Error> {
  let file = File::open("hello.txt")?;
  Ok(file)
}
```

`?` 的行为可以理解为：

+ 如果结果是 `Ok(value)`，就取出 `value` 继续执行
+ 如果结果是 `Err(error)`，就立刻返回这个错误

它的价值不在于“更短”，而在于把正常路径保留下来，把错误传播压缩成一个明确符号。

## 什么时候该 `unwrap` / `expect`

`unwrap` 和 `expect` 都会在拿到 `Err` 时触发 panic：

```rust
let file = File::open("hello.txt").unwrap();
let file = File::open("hello.txt").expect("failed to open hello.txt");
```

它们适合的场景很有限：

+ 示例代码
+ 测试代码
+ 你能明确保证这里不可能失败
+ 即使失败，也就是程序设计本身出了问题

相比之下，`expect` 通常比 `unwrap` 更好，因为它至少留下了清晰的上下文。

在库代码和正式业务逻辑中，默认应该优先考虑 `Result` 和 `?`，而不是把不确定失败路径直接升级成 panic。

## 自定义错误类型

对于稍复杂的程序，标准库错误类型通常不够表达业务语义，这时就需要定义自己的错误类型。

```rust
use std::error::Error;
use std::fmt;

#[derive(Debug)]
struct AppError {
  kind: String,
  message: String,
}

impl fmt::Display for AppError {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "{}: {}", self.kind, self.message)
  }
}

impl Error for AppError {}
```

自定义错误类型的意义不只是“包一层结构体”，而是让错误开始具备业务语义。例如：

+ 配置缺失
+ 用户输入非法
+ 外部服务不可用
+ 权限不足

只要错误开始跨模块传播，自定义错误类型通常就值得引入。

## 库代码和应用代码的边界

Rust 错误处理里一个很重要的边界是：库代码和应用代码的策略不完全一样。

+ 库代码通常应该返回 `Result`，把处理权交给调用者
+ 应用代码可以在边界层统一决定记录日志、转换错误、友好提示或退出程序

这个边界很关键，因为 Rust 的显式错误处理并不意味着“所有地方都自己处理”。更多时候，真正应该做的是：

+ 在底层保留错误信息
+ 在中间层用 `?` 继续传播
+ 在最外层决定如何落地

## 常用实践

+ 优先返回 `Result`，而不是动不动 `panic!`
+ 用 `?` 保持正常路径清晰
+ 用 `expect` 替代没有上下文的 `unwrap`
+ 为跨模块错误定义统一类型
+ 在应用边界统一记录日志和转换错误
+ 需要快速搭建应用时，可以用 `thiserror`、`anyhow` 等 crate 减少样板代码

## 总结

Rust 的错误处理核心不是“如何捕获异常”，而是把可恢复和不可恢复错误明确区分，并通过类型系统强迫开发者面对失败路径。`Result<T, E>` 负责表达可恢复错误，`panic!` 负责终止不可信状态，`?` 则在两者之间让传播过程保持可读。这样的代价是代码更显式，但回报是控制流更稳定、错误边界更清楚。
