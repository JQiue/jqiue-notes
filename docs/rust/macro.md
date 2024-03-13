---
title: 宏
category: 编程语言
tag: [Rust]
article: false
order: 11
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

可以将任何内容设置为宏的输入

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

宏可以理解提供的不同输入，对于`expr`给它一个变量`$input`

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

支持多个标识符

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
