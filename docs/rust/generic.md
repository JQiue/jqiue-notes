---
title: 泛型
category: 编程语言
tag: [Rust]
article: false
---

在函数中定义泛型

```rust
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
  a + b
}

add(1, 2);
add(1.1, 2.2);
```

在结构体中定义泛型

```rust
struct Point<T> {
  x: T,
  y: T,
}

let p1 = Point { x: 1, y: 2 };
let p2 = Point { x: 1.1, y: 2.2 };
```

可以使用多个泛型参数

```rust
struct Point<T, U> {
  x: T,
  y: U,
}

let p = Point { x: 1, y: 2.2};
```

常见的枚举类型`Option<T>`和`Result<T, E>`都是泛型的例子
