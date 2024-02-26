---
title: 泛型
category: 编程语言
tag: [Rust]
article: false
---

## 函数与泛型

在函数中定义泛型

```rust
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
  a + b
}

add(1, 2);
add(1.1, 2.2);
```

## 方法与泛型

```rust
impl<T> Rectangle<T> { 
  fn width(&self) -> &T { 
    &self.width 
  } 
  fn height(&self) -> &T { 
    &self.height 
  } 
}
```

## 结构体与泛型

在结构体中定义泛型

```rust
struct Point<T> {
  x: T,
  y: T,
}

let p1 = Point { x: 1, y: 2 };
let p2 = Point { x: 1.1, y: 2.2 };
```

## 枚举与泛型

常见的枚举类型`Option<T>`和`Result<T, E>`都是泛型的例子

## 多泛型参数

可以使用多个泛型参数

```rust
struct Point<T, U> {
  x: T,
  y: U,
}

let p = Point { x: 1, y: 2.2};
```

## turbofish

Rust 中的 turbofish 语法是使用显式类型注解来消除歧义的语法糖

当编译器无法推断出泛型参数的具体类型时,需要使用 turbofish 来消除歧义

```rust
let v: Vec<i32> = Vec::new(); // 编译器可以推断
// error 泛型参数不明确, 编译器无法推断 需要 turbofish
let v = Vec::new();
// turbofish
let v = Vec::<i32>::new();
```

枚举

```rust
Option::<i32>::None;

struct Point<T>(T);
let p = Point::<i32>(1); 
```

方法

```rust
fn foo<T>(v: Vec<T>) {
  // ...
}

foo(Vec::<i32>::new());
```

```rust
let closure = |x: i32| {
  x 
};

let c = closure as fn(i32) -> i32;
```
