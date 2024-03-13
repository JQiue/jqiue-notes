---
title: 标准功能
category: 编程语言
tag: [Rust]
article: false
order: 15
---

默认情况下，Rust 设定了若干个会自动导入到每个程序作用域中的标准库内容，这组内容被称为**预导入**（preclude）内容，可以在标准库文档中查看预导入的所有内容。如果需要的类型不在预导入内容中，就必须使用`use`语句显式地将其引入作用域。比如`std::io`库提供很多有用的功能，包括接收用户输入的功能

## 输入

```rust
use std::io;
let mut input = String::new();
io::stdin()
    .read_line(&mut input)
    .expect("Failed to read line");
```

## 格式化输出

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

## 文件操作
