---
title: 错误处理
category: 编程语言
tag: [Rust]
article: false
order: 8
---

Rust 的错误处理机制是其安全性和可靠性的重要组成部分，强制开发者显式地处理错误，强制开发者显式处理错误以提高程序健壮性，Rust 将错误分为两大类：

1. 可恢复错误 - 通过`Result<T, E>`类型表示，比如文件未找到，开发者可以捕获并处理以继续运行，例如向用户报告错误或执行替代逻辑
2. 不可恢复错误 - 通过`panic!`宏触发，通常表示程序中的 bug，例如访问超出数组边界的情况，导致程序终止

::: tip 补充
不可恢复错误通常由 `panic!` 触发，可能源于程序中的 bug（如数组越界），也可能是开发者主动选择终止程序（如关键资源缺失）。Rust 允许通过`catch_unwind`捕获部分 panic，但在生产环境中通常不建议这样做
:::

与许多语言（如 Java 或 Python）通过异常（`try-catch`）统一处理所有错误不同，Rust 通过`Result<T, E>`强制开发者在编译期显式处理可恢复错误，而不可恢复错误通过`panic!`触发，通常导致程序终止。这种设计提高了代码的可靠性和可预测性

## panic

`panic!`用于处理不可恢复错误

```rust
fn main() {
  panic!("燃烧吧！");
}
```

在发生 panic 时，程序默认会展开调用栈，这个过程可能会消耗大量资源。如果希望立即终止程序，可以在 Cargo.toml 中设置

```toml
[profile.release]
panic = 'abort'
```

## Result

大部分错误没有严重到需要终止程序的地步，`Result<T, E>`是 Rust 处理可恢复错误的主要方式，比如在读取文件中

```rust
use std::fs::File;

fn main() {
  let file = File::open("hello.txt");
  match file {
    Ok(file) => file,
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

## 自定义错误类型

对于复杂的应用，通常会定义自己的错误类型

```rust
use std::fmt;
use std::error::Error;

#[derive(Debug)]
struct AppError {
  kind: String,
  message: String,
}

impl fmt::Display for AppError {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
      write!(f, "{}: {}", self.kind, self.message)
  }
}

impl Error for AppError {}
```

## 错误处理最佳实践

1. 对于库代码，通常返回 `Result`，让调用者决定如何处理错误
2. 对于应用代码，可以在 main 函数中使用 `?` 运算符
3. 使用 thiserror 或 anyhow 等 crate 来简化错误处理
4. 为自定义错误类型实现 `std::error::Error` Trait
5. 使用有意义的错误消息，帮助用户或开发者理解和解决问题
6. 在应用程序和库中不要使用`unwrap`处理错误，优先使用`expect`，除非导致了噪音情况下
7. 在测试中，文档中可以使用`unwrap`处理错误
