---
title: 宏
category: 编程语言
tag: [Rust]
article: false
order: 11
---

宏是 Rust 中强大的元编程工具，允许编写可以生成其他代码的代码。宏和函数类似，但末尾有一个`!`，它们在编译时展开成源代码

## 声明宏

声明式宏使用`macro_rules!`定义，类似于模式匹配

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

### 匹配多种情况

和 match 一样可以匹配多种情况

```rust
macro_rules! six_or_print {
  (6) => {
    6
  };
  () => {
    println!("You didn't give me 6.");
  };
}

fn main() {
  let six = six_or_print!(6);
  six_or_print!();
}
```

### 捕获和使用输入

可以将任何内容设置为宏的输入，有多种捕获方式：

特定模式匹配

```rust
macro_rules! might_print {
  (THis is strange input 하하はは哈哈 but it still works) => {
    println!("You guessed the secret message!")
  };
  () => {
    println!("You didn't guess it");
  };
}

fn main() {
  might_print!(THis is strange input 하하はは哈哈 but it still works);
  might_print!();
}
```

表达式捕获，宏可以理解提供的不同输入，对于`expr`给它一个变量`$input`

```rust
macro_rules! might_print {
  ($input:expr) => {
    println!("You gave me: {:?}", $input);
  };
}

fn main() {
  might_print!(());
  might_print!(6);
  might_print!(vec![1, 2, 3]);
}
```

多个标识符

```rust
macro_rules! check {
  ($input1:ident, $input2:expr) => {
    println!(
      "Is {:?} equal to {:?}? {:?}",
      $input1,
      $input2,
      $input1 == $input2
    );
  };
}

fn main() {
  let x = 6;
  let my_vec = vec![7, 8, 9];
  check!(x, 6);
  check!(my_vec, vec![7, 8, 9]);
  check!(x, 10);
}
```

### 重复模式

使用 * 或 + 可以匹配零个或多个，或者一个或多个重复模式

```rust
macro_rules! vector {
  ( $( $x:expr ),* ) => {
    {
      let mut temp_vec = Vec::new();
      $(
          temp_vec.push($x);
      )*
      temp_vec
    }
  };
}

fn main() {
  let v = vector![1, 2, 3];
  println!("{:?}", v);
}
```

### 静态检查

函数则不具备字符串格式化的静态检查功能，而宏可以更好地进行检查

```rust
println!("number1 {} number2 {}"); // 应该接受两个参数用于内部填充
```

## 过程宏

过程宏更加强大，可以操作输入的 Rust 代码。有三种类型的过程宏：

1. 派生宏（Derive macros）
2. 属性宏（Attribute-like macros）
3. 函数式宏（Function-like macros）

## 内置宏和编译期计算

Rust 提供了许多内置宏，如 println!, vec!, format! 等，一些宏可以在编译期进行计算

```rust
println!("File: {}, line: {}", file!(), line!());
println!("This code is compiled for: {}", std::env::consts::OS);
```
