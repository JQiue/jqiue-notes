---
title: 错误处理
category: 编程语言
tag: [Rust]
article: false
order: 8
---

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

## Result

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

这是一些其他的常用方法：

+ `is_ok()`和`is_err()`：返回 bool 值，告诉 Result 是成功的结果还是错误的结果
+ `ok()`：返回`Option<T>`类型的成功值，否则返回 None
+ `err()`：返回`Option<E>`类型的错误值
+ `result.unwrap_or(fallback)`：返回成功值，否则返回 fallback，丢弃错误值

## ?

Rust 提供了`?`运算符用来传播错误，用来将错误返回给调用者，如果出现错误，就会提前终止函数执行，并返回错误。只能用于返回`Result`类型的函数

```rust
fn read_file() -> Result<String, io::Error> {
  let mut file = File::open("hello.txt")?;
  let mut s = String::new();
  file.read_to_string(&mut s)?;
  Ok(s)
}
```
