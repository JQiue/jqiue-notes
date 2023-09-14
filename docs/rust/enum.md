---
title: 枚举
category: 编程语言
tag: [Rust]
article: false
---

`enum`关键字允许创建一个从多个不同取值中选其一的枚举类型

```rust
enum Role {
  Foo,
  Bar,
  Qux,
}
```

可以指定类型，甚至另一个枚举类型

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}
```

也可以像结构体那样使用`impl`定义方法

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}

impl Role {
  fn call(&self) {}
}
```

## Option

在 Rust 中，通常使用`Option<T>`泛型枚举类型来表示可能存在或不存在的值，它有两种变体：`Some(T)`和`None`，使用这种枚举类型用来明确的处理可能为空的值

```rust
fn divide(a: i32, b: i32) -> Option<i32> {
  if b != 0 {
    Some(a / b)
  } else {
    None
  }
}
fn main() {
  let result = divide(2, 0);

  match result {
    Some(value) => println!("{}", value),
    None => println!("Cannot divide by zero!"),
  }
}
```
