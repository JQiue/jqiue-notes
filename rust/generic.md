---
title: 泛型
category: 编程语言
tag: [Rust]
article: false
order: 7
---

泛型是 Rust 中实现代码复用的重要机制，允许我们编写可以处理多种类型的代码。通过使用泛型，我们可以提高代码的灵活性和可维护性，同时不牺牲性能

## 函数与泛型

在函数中定义泛型允许我们创建可以接受不同类型参数的通用函数，这个例子中，add 函数可以处理任何实现了 Add trait 的类型

```rust
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
  a + b
}

add(1, 2);
add(1.1, 2.2);
```

## 结构体与泛型

泛型结构体允许我们定义可以存储不同类型数据的通用数据结构

```rust
struct Point<T> {
  x: T,
  y: T,
}

impl<T> Point<T> {
  fn new(x: T, y: T) -> Self {
    Point { x, y }
  }
  fn coords(&self) -> (&T, &T) {
    (&self.x, &self.y)
  }
}

let p1 = Point::new(1, 2);
let p2 = Point::new(1.1, 2.2);
```

## 枚举与泛型

Rust 标准库中的`Option<T>`和`Result<T, E>`是泛型枚举的典型例子

```rust
enum Option<T> {
  Some(T),
  None,
}

enum Result<T, E> {
  Ok(T),
  Err(E),
}
```

## 多泛型参数

可以在一个类型定义中使用多个泛型参数

```rust
struct KeyValue<K, V> {
  key: K,
  value: V,
}

let p = KeyValue { key: "name", value: 42};
```

## 约束

trait 约束允许我们限制泛型参数必须实现特定的 trait，传入其他类型会导致无法通过编译

```rust
fn notify(msg: impl Debug) {
  println!("{:?}", msg);
}

notify("Hi");
```

这是一个 trait 约束的语法糖，实际上是这样的

```rust
fn notify<T: Debug>(msg: T) {
  println!("{:?}", msg);
}
```

可以使用`+`来指定多个 trait 约束

```rust
fn notify(item: impl Foo + Bar) {}
fn notify<T: Foo + Bar>(item: T) {}
```

### where

如果有多个泛型约束，过多的的 trait 就会导致难以理解，`where`解决了这一点，这样看起来函数签名容易理解的多

```rust
fn sn<T: Foo + Bar, U: Display + Clone>(t: T, u: U) -> i32;

fn sn<T, U>(t: T, u: U) -> i32 
where 
  T: Foo + Bar,
  U: Display + Clone;
```

同样可以返回实现 trait 的类型，但只能返回一个类型，并不支持返回多个类型的写法

```rust
fn returns() -> impl Debug {
  1
}
```

## turbofish

Rust 中的 turbofish 语法是使用显式类型注解来消除歧义的语法糖。当编译器无法推断出泛型参数的具体类型时，需要使用 turbofish 来消除歧义

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

函数

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

## 泛型的性能

Rust 的泛型实现使用了单态化（monomorphization），这意味着编译器会为每种使用的具体类型生成专门的代码，这保证了使用泛型的代码与手写的特定类型的代码具有相同的运行时性能

泛型在编译时进行静态分发，而 trait 对象使用动态分发。泛型通常更快，但可能导致代码膨胀，而 trait 对象提供了更大的灵活性，但有轻微的运行时开销
