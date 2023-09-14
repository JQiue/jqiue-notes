---
title: 宏
category: 编程语言
tag: [Rust]
article: false
---

宏和函数有点像，只不过末尾有个`!`，但不产生函数调用，只是展开成源码一起编译

```rust
macro_rules! hello {
  () => {
    println!("hello");
  }
}

fn main() {
  hello!()
}
```

Rust 中还有一系列的宏，都是用的同样的格式控制规则，如 format！write！writeln！

函数则不具备字符串格式化的静态检查功能，而宏可以更好地进行检查

```rust
println!("number1 {} number2 {}"); // 应该接受两个参数用于内部填充
```

## 实现编译期计算

以下代码可以打印出当前源代码的文件名，以及当前代码的行数

```rust
println!("file {} line {} ", file!(), line!());
```
