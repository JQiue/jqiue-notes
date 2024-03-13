---
title: 泛型
category: 编程语言
tag: [Rust]
article: false
order: 7
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

## 结构体与泛型

在结构体中定义泛型

```rust
struct Point<T> {
  x: T,
  y: T,
}

impl<T> Point<T> {
    fn coords(&self) -> (&T, &T) {
        (&self.x, &self.y)
    }
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

## 约束

使用 trait 作为函数参数，这一参数就只能接收任何实现该 trait 的类型，传入其他类型会导致无法通过编译

```rust
fn notify(msg: impl Debug) {
  println!("{:?}", msg);
}

notify("Hi");
```

但这只是一个 trait 约束的语法糖，实际上是这样的

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
