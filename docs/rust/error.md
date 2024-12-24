---
title: 错误处理
category: 编程语言
tag: [Rust]
article: false
order: 8
---

Rust 的错误处理机制是其安全性和可靠性的重要组成部分，与许多其他语言不同，Rust 强制开发者显式地处理错误，这有助于创建更健壮的程序

Rust 将错误分为两大类：

1. 可恢复错误 - 比如文件未找到等，⼀般需要将它们报告给用户并再次尝试进行操作
2. 不可恢复错误 -  而不可恢复错误往往就是 bug 的另⼀种说法，比如尝试访问超出数组结尾的位置等

其他大部分的编程语言都没有刻意地区分这两种错误，而是通过异常之类的机制来统⼀处理它们

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

1. 对于库代码，通常返回 Result，让调用者决定如何处理错误
2. 对于应用代码，可以在 main 函数中使用 ? 运算符
3. 使用 thiserror 或 anyhow 等 crate 来简化错误处理
4. 为自定义错误类型实现 std::error::Error trait
5. 使用有意义的错误消息，帮助用户或开发者理解和解决问题
