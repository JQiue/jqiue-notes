---
title: trait
category: 编程语言
tag: [Rust]
article: false
order: 6
---

`trait`与其他语⾔中常被称为接口（interface）的功能类似，但也不尽相同，`trait`被用来描述某些特定类型能够拥有的且能够被其他类型共享的功能。类型的行为由方法组成，当在不同类型上调用了相同的方法时，就称这些类型共享了相同的行为，`trait`提供了将指定方法组合起来的途径。通常 trait 代表一种能力，即某种类型能够做什么

+ 实现 std::clone::Clone 的值可以在内存中克隆自身
+ 实现 std::fmt::Debug 的值可以使用 println!() 的 `{:?}`格式说明符打印输出来
+ 实现 std::iter::Iterator 的值可以产生值的序列

定义 trait 很简单，只要给它命名并列出特性方法的类型签名即可。使用`trait`来声明，可以声明方法签名并省略具体实现，以分号直接结束，每一个类型就可以实现该 trait，并实现该类型 trait 方法的行为，`self`表示实现了此 trait 的具体类型

```rust
struct Dog {
  name: String,
  age: String,
}

struct Cat {
    lives: i8,
}

trait Pet {
  // 必须实现
  fn talk(&self) -> String;
  // 可以拥有默认方法实现的 trait，这就可以指定空的实现，使用默认的 trait 实现，但也不会影响已有的实现，实现了重载
  fn greet(&self) {
    println!("Oh you're a cutie! What's your name? {}", self.talk());
  }
}

impl Pet for Dog {
  fn talk(&self) -> String {
    format!("Woof, my name is {}!", self.name)
  }
}

impl Pet for Cat {
  fn talk(&self) -> String {
    String::from("Miau!")
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

它的语法是，在你希望 impl trait 的类型前面写`#[derive()]`，括号里面是你希望 impl 的 trait 的名字。这样写了之后，编译器就帮你自动加上了 impl 块

## 实用 Trait

### Display 和 Debug

Display 和 Debug 它们的主要用处就是用在类似 println! 这样的地方。只有实现 Display 的类型，才能用`{}`格式控制打印出来

只有实现了 Debug 的类型，才能用`{:?}``{:#?}`格式控制打印出来

### Drop

当一个值的所有者离开时，Rust 会清除（drop）这个值。很大程度上，Rust 会自动处理清除值

### Copy 和 Clone

Clone trait 用于标记可以对值进行深复制的类型，即对栈上和堆上的数据一起复制。要实现 Clone，需要实现 clone 方法。如果要使用#[derive(Clone)]语法标记结构体或枚举，要求结构体的每个字段或枚举的每个值都可调用clone方法，意味着所有字段或值的类型都必须实现Clone

Copy trait用于标记可以按位复制其值的类型，即复制栈上的数据。Copy继承自Clone，这意味着要实现Copy的类型，必须实现Clone的 clone 方法。如果想让一个类型实现 Copy，就必须同时实现 Clone，会比较烦琐且累赘，所以Rust提供了方便的 derive 属性来完成这项重复的工作

Rust为 数字类型、字符类型、布尔类型、单元值等实现了Copy，但并非所有类型都可以实现Copy。对于结构体来说，必须所有字段都实现了 Copy，这个结构体才能实现 Copy

Copy 是一个隐式行为。开发者不能重载Copy行为，它永远是简单的位复制。Copy的隐式行为常发生在执行变量绑定、函数参数传递、函数返回等场景中。与Copy不同的是，Clone是一个显式行为。任何类型都可以实现Clone，开发者可以按需实现clone方法

### Deref

实现 Deref 的值，在解引用时会自动转换成 Target 类型

```rust
struct SmartPtr {
  s: String,
}

impl Deref for SmartPtr {
  type Target = String;
  fn deref(&self) -> &Self::Target {
    &self.s
  }
}

fn main() {
  let p = SmartPtr {
    s: "Hello World".to_string(),
  };
  println!("{}", *p);
}
```

### Default

Default 为类型提供有用的默认值，通常用于为结构体的字段提供默认值。如果结构体每个字段的类型都实现了 Default，那么 Default 可以与 derive 属性一起使用，对每个字段的类型都使用默认值

### Borrow 和 BorrowMut

### From 和 Into

类型会实现 From 和 Into 以加快类型转换

```rust
let s = String::from("hello");
let addr = std::net::Ipv4Addr::from([127, 0, 0, 1]);
let one = i16::from(true);
let bigger = i32::from(123_i16);
println!("{s}, {addr}, {one}, {bigger}");
```

实现 From 后，系统会自动实现 Into：

```rust
let s: String = "hello".into();
let addr: std::net::Ipv4Addr = [127, 0, 0, 1].into();
let one: i16 = true.into();
let bigger: i32 = 123_i16.into();
println!("{s}, {addr}, {one}, {bigger}");
```

### Eq 和 PartialEq

Eq trait 和 PartialEq trait 来自数学中的等价关系和局部等价关系。两者都满足以下两个特性

+ 对称性（Symmetric），即 a == b 可推导出 b == a
+ 传递性（Transitive），即 a == b 且 b == c 可推导出 a == c

Eq 相比 PartialEq 还需要满足反身性（Reflexive），即 a == a

对于浮点数类型，两个非数字值NaN（Not-a-Number）是互不相等的，即 NaN != NaN，因此 Rust 只为其实现了 PartialEq。实现 Eq 不需要额外的代码，只需要在实现 PartialEq 的基础上，在类型上标记`#[derive(Eq)]`即可

PartialEq 也可以与 derive 属性一起使用，用于比较一个类型的两个实例是否相等，并开启“==”和“!=”运算符功能。在结构体上标记`#[derive(PartialEq)]`，只有所有字段都相等，两个实例才相等，只要有任何字段不相等则两个实例不相等。在枚举上标记`#[derive(PartialEq)]`，当每一个成员都和其自身相等，且和其他成员都不相等时，两个实例才相等

### Fn 和 FnMut 和 FnOnce

闭包或 lambda 表达式具有无法命名的类型，不过，它们会实现特殊的 Fn， FnMut 和 FnOnce 特征

+ Fn - 既不会耗用也不会修改捕获的值，或许也不会捕获任何值。它可被并发调用多次
+ FnMut - 可能会改变捕获的值。可以多次调用它，但不能并发调用它。如果使用 FnOnce，或许只能调用它一次。它可能会耗用所捕获的值
+ FnMut - 是 FnOnce 的子类型。Fn 是 FnMut 和 FnOnce 的子类型。可以在任何需要调用 FnOnce 的地方使用 FnMut，还可在任何需要调用 FnMut 或 FnOnce 的地方 使用 Fn
