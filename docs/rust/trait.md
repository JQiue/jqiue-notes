---
title: trait
category: 编程语言
tag: [Rust]
article: false
---

`trait`与其他语⾔中常被称为接口（interface）的功能类似，但也不尽相同，`trait`被用来描述某些特定类型能够拥有的且能够被其他类型共享的功能。类型的行为由方法组成，当在不同类型上调用了相同的方法时，就称这些类型共享了相同的行为，`trait`提供了将指定方法组合起来的途径。通常 trait 代表一种能力，即某种类型能够做什么

+ 实现 std::clone::Clone 的值可以在内存中克隆自身
+ 实现 std::fmt::Debug 的值可以使用 println!() 的 `{:?}`格式说明符打印输出来
+ 实现 std::iter::Iterator 的值可以产生值的序列

定义 trait 很简单，只要给它命名并列出特性方法的类型签名即可。使用`trait`来声明，可以声明方法签名并省略具体实现，以分号直接结束，每一个类型就可以实现该 trait，并实现该类型 trait 方法的行为，`self`表示实现了此 trait 的具体类型

```rust
trait Summary {
  fn summarize(&self) -> String;
}

struct NewsArticle {
  author: String,
  content: String,
}

impl Summary for NewsArticle {
  fn summarize(&self) -> String {
    format!("author: {}, content: {}", self.author, self.content)
  }
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for Tweet {
  fn summarize(&self) -> String {
    format!("username: {}, content: {}", self.username, self.content)
  }
}
```

可以拥有默认方法实现的 trait，这就可以指定空的实现，使用默认的 trait 实现，但也不会影响已有的实现，实现了重载

```rust
trait Summary {
  fn summarize(&self) -> String {
    "Read more...".to_string()
  }
}

struct NewsArticle {
  author: String,
  content: String,
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for NewsArticle {}

impl Summary for Tweet {
  fn summarize(&self) -> String {
    format!("username: {}, content: {}", self.username, self.content)
  }
}
```

在 trait 中可以调用其他方法，哪怕没有默认实现

```rust
trait Summary {
  fn summarize(&self) -> String {
    format!("Read more from {}...", self.summarize_author())
  }
  fn summarize_author(&self) -> String;
}

struct Tweet {
  username: String,
  content: String,
}

impl Summary for Tweet {
  fn summarize_author(&self) -> String {
    format!("@{}", self.username)
  }
}
```

## 约束

使用 trait 作为函数参数，这一参数就只能接收任何实现该 trait 的类型，传入其他类型会导致无法通过编译

```rust
fn notify(item: impl Summary) {
  println!("{}", item.summarize());
}
```

但这种只是一个 trait 约束的语法糖，实际上是这样的

```rust
fn notify<T: Summary>(item: T) {
  println!("{}", item.summarize());
}
```

可以使用`+`来指定多个 trait 约束

```rust
fn notify(item: impl Foo + Bar) {}
fn notify<T: Foo + Bar>(item: T) {}
```

如果有多个泛型约束，过多的的 trait 就会导致难以理解，`where`解决了这一点，这样看起来函数签名容易理解的多

```rust
fn sn<T: Foo + Bar, U: Display + Clone>(t: T, u: U) -> i32;
fn sn<T, U>(t: T, u: U) -> i32 where T: Foo + Bar,U: Display + Clone;
```

同样可以返回实现 trait 的类型，但只能返回一个类型，并不支持返回多个类型的写法

```rust
fn returns_summarizable() -> impl Summary {
  Tweet {
    username: "".to_string(),
    content: "".to_string()
  }
}
```

## Derive

Rust 里面为类型 impl 某些 trait 的时候，逻辑是非常机械化的。为许多类型重复而单调地 impl 某些 trait，是非常枯燥的事情。为此，Rust 提供了一个特殊的 attribute，它可以帮我们自动 impl 某些 trait

```rust
#[derive(Copy, Clone, Default, Debug, Hash, PartialEq, Eq, PartialOrd, Ord)]
struct Foo {
  data : i32
}
fn main() {
  let v1 = Foo { data : 0 };
  let v2 = v1;
  println!("{:?}", v2);
}
```

它的语法是，在你希望 impl trait 的类型前面写`#[derive（…）]`，括号里面是你希望 impl 的 trait 的名字。这样写了之后，编译器就帮你自动加上了 impl 块

## 标准库常见的 trait

Display 和 Debug 它们的主要用处就是用在类似 println！这样的地方。只有实现了Display trait 的类型，才能用`{}`格式控制打印出来；只有实现了 Debug trait 的类型，才能用`{：？}``{：#？}`格式控制打印出来
