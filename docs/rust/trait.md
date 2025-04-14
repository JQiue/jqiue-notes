---
title: Trait
category: 编程语言
tag: [Rust]
article: false
order: 6
---

Trait 类似于接口，但更加灵活，被用来描述类型共享的功能。与传统的接口不同，Trait 可以包含默认实现，并且可以在已有类型上实现 Trait

+ 实现 std::clone::Clone 的值可以在内存中克隆自身
+ 实现 std::fmt::Debug 的值可以使用 println!() 的 `{:?}`格式说明符打印输出来
+ 实现 std::iter::Iterator 的值可以产生值的序列

## 定义和实现

使用`trait`来声明，可以声明方法签名并省略具体实现，以分号直接结束，类型通过`impl Trait for Type`语法来实现 Trait，并实现该类型 trait 方法的行为，`self`表示实现了此 trait 的具体类型的实例

```rust
trait Pet {
  // 必须实现的方法
  fn talk(&self) -> String;
  // 可以拥有默认方法实现的 trait，这就可以指定空的实现，使用默认的 trait 实现，但也不会影响已有的实现，实现了重载
  fn greet(&self) {
    println!("Oh you're a cutie! What's your name? {}", self.talk());
  }
}

struct Dog {
  name: String,
  age: u32,
}

struct Cat {
  lives: i8,
}

impl Pet for Dog {
  fn talk(&self) -> String {
    format!("Woof, my name is {}!", self.name)
  }
  // Dog 使用默认的 greet 实现
}

impl Pet for Cat {
  fn talk(&self) -> String {
    String::from("Miau!")
  }
  // Cat 使用默认的 greet 实现
}
```

Trait 中的方法可以调用其他方法，即使这些方法没有默认实现

```rust
trait Pet {
  fn talk(&self) -> String;
  fn greet(&self) {
      println!("Oh you're a cutie! What's your name? {}", self.talk()); // 调用 talk() 方法
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

Display 和 Debug 它们的主要用处就是用在类似`println!`这样的地方。只有实现 Display 的类型，才能用`{}`格式控制打印出来。只有实现了 Debug 的类型，才能用`{:?}``{:#?}`格式控制打印出来

### Drop

当一个值的所有者离开时，Rust 会清除（drop）这个值。很大程度上，Rust 会自动处理清除值

### Clone 和 Copy

Clone trait 用于标记可以对值进行深复制的类型，即对栈上和堆上的数据一起复制。要实现 Clone，需要实现 `clone` 方法。如果要使用 `#[derive(Clone)]` 语法标记结构体或枚举，要求结构体的每个字段或枚举的每个变体都可调用 `clone` 方法，意味着所有字段或变体的类型都必须实现 Clone

Copy trait 用于标记可以按位复制其值的类型，即复制栈上的数据。Copy 是 Clone 的子集，这意味着实现 Copy 的类型必须同时实现 Clone。由于手动实现这两个 trait 会比较繁琐，Rust 提供了方便的 `derive` 属性来自动实现

```rust
#[derive(Copy, Clone)]
struct Point {
  x: i32,
  y: i32,
}
```

Rust 为数字类型、字符类型、布尔类型、单元值等实现了 Copy，但并非所有类型都可以实现 Copy。对于结构体来说，必须所有字段都实现了 Copy，这个结构体才能实现 Copy

Copy 是一个隐式行为，开发者不能重载 Copy 行为，它永远是简单的位复制。Copy 的隐式行为常发生在执行变量绑定、函数参数传递、函数返回等场景中

```rust
let x = 5;
let y = x; // x 被复制给 y，x 仍然可用
```

与 Copy 不同的是，Clone 是一个显式行为。任何类型都可以实现 Clone，开发者可以按需实现 clone 方法，常用于需要显示创建数据副本的场景

```rust
let s1 = String::from("hello");
let s2 = s1.clone(); // 显式调用 clone 方法
```

### Deref 和 DerefMut

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

```rust
#[derive(Default)]
struct MyStruct {
  field: i32,
}

let my_struct = MyStruct::default(); // field 将被初始化为 0
```

### Borrow 和 BorrowMut

两个 trait 用于泛化对引用和值的借用操作，它们允许在不同的借用场景中使用统一的接口

- `Borrow` - 用于不可变借用，它定义了 `borrow` 方法，返回对所借用数据的不可变引用
- `BorrowMut` - 用于可变借用，它是 `Borrow` 的扩展，额外定义了`borrow_mut`方法，返回对所借用数据的可变引用

这些 trait 主要用于以下场景：

1. 在需要借用数据的地方统一处理引用和值
2. 在哈希表等数据结构中，允许使用不同但等价的键类型

在这个例子中，check 函数可以接受任何能够被借用为`&str`的类型，包括`String`和`&str`

```rust
use std::borrow::Borrow;

fn check<T: Borrow<str>>(s: T) {
  assert_eq!("Hello", s.borrow());
}

fn main() {
  // 可以传入 String
  let owned = "Hello".to_string();
  check(owned);
  
  // 也可以传入 &str
  let borrowed = "Hello";
  check(borrowed);
}
```

Borrow 和 BorrowMut 提供了更大的灵活性，特别是在处理不同但相关的类型时（如 `String`和`str`，或`Vec<T>`和`[T]`），它们允许在不损失所有权的情况下进行高效的借用操作

### From 和 Into

类型会实现 From 和 Into 以加快类型转换

```rust
let s = String::from("hello");
let addr = std::net::Ipv4Addr::from([127, 0, 0, 1]);
let one = i16::from(true);
let bigger = i32::from(123_i16);
println!("{s}, {addr}, {one}, {bigger}");
```

实现 From 后，会自动实现 Into，提供对称的转换能力：

```rust
let s: String = "hello".into();
let addr: std::net::Ipv4Addr = [127, 0, 0, 1].into();
let one: i16 = true.into();
let bigger: i32 = 123_i16.into();
println!("{s}, {addr}, {one}, {bigger}");
```

### TryFrom 和 TryInto

TryFrom 要比 From 更加安全，适用于不总是能够成功转换的场景

### Eq 和 PartialEq

Eq trait 和 PartialEq trait 来自数学中的等价关系和局部等价关系。两者都满足以下两个特性

+ 对称性（Symmetric），即 a == b 可推导出 b == a
+ 传递性（Transitive），即 a == b 且 b == c 可推导出 a == c

Eq 相比 PartialEq 还需要满足反身性（Reflexive），即 a == a

对于浮点数类型，两个非数字值 NaN（Not-a-Number）是互不相等的，即 NaN != NaN，因此 Rust 只为其实现了 PartialEq。实现 Eq 不需要额外的代码，只需要在实现 PartialEq 的基础上，在类型上标记`#[derive(Eq)]`即可

PartialEq 也可以与 derive 属性一起使用，用于比较一个类型的两个实例是否相等，并开启“==”和“!=”运算符功能。在结构体上标记`#[derive(PartialEq)]`，只有所有字段都相等，两个实例才相等，只要有任何字段不相等则两个实例不相等。在枚举上标记`#[derive(PartialEq)]`，当每一个成员都和其自身相等，且和其他成员都不相等时，两个实例才相等

### Fn 和 FnMut 和 FnOnce

闭包或 lambda 表达式具有无法命名的类型，但它们会实现特殊的`Fn`，`FnMut`和`FnOnce`trait，它们定义了闭包如何捕获和使用其环境中的值

+ Fn - 不会修改或消耗捕获的值，甚至可能不捕获任何值。它可以被多次调用，包括并发调用。例如：`|x| println!("{}", x)`
+ FnMut - 可能会修改捕获的值，但不会消耗它们。可以多次调用，但不能并发调用。例如：`|x| { count += 1; println!("{}: {}", count, x) }`
+ FnOnce - 可能会消耗捕获的值，只能被调用一次。例如：`|x| vec.push(x)`

这三种 trait 之间存在一个子类型关系，`Fn`是`FnMut`和`FnOnce`的子类型，`FnMut`是`FnOnce` 的子类型

这意味着可以在需要`FnOnce`的地方使用`FnMut` 或 `Fn`，可以在需要`FnMut`的地方使用`Fn`

```rust
fn call_fn<F: Fn() -> String>(f: F) {
  println!("Fn: {}", f());
  println!("Fn: {}", f()); // 可以多次调用
}

fn call_fn_mut<F: FnMut() -> String>(mut f: F) {
  println!("FnMut: {}", f());
  println!("FnMut: {}", f()); // 可以多次调用，可能会修改捕获的值
}

fn call_fn_once<F: FnOnce() -> String>(f: F) {
  println!("FnOnce: {}", f()); // 只能调用一次
}

fn main() {
  let mut s = String::from("hello");
  call_fn(|| s.clone());
  call_fn_mut(|| {
    s.push_str(" world");
    s.clone()
  });
  call_fn_once(|| s);
  // 以下行会导致编译错误，因为 s 已经被移动
  // println!("{}", s);
}
```

### Iterator

Iterator trait 用于实现迭代器。迭代器是一种可以产生一系列值的对象。Rust 的标准库提供了多种迭代器，例如 `iter`、`iter_mut` 和 `into_iter`。

```rust
let v = vec![1, 2, 3];

// iter() 返回一个迭代器，它产生对 vector 中元素的不可变引用
for i in v.iter() {
    println!("{}", i);
}

// iter_mut() 返回一个迭代器，它产生对 vector 中元素的可变引用
for i in v.iter_mut() {
    *i += 1;
    println!("{}", i);
}

// into_iter() 返回一个迭代器，它会消耗 vector 并产生 vector 中的值
for i in v.into_iter() {
    println!("{}", i);
}
```

### Trait 分类

为了更好地理解和使用 Trait，我们可以将其按照功能进行分类：

- **基本 Trait：** 例如 `Clone`、`Copy`、`Default` 等，这些 Trait 提供了类型基本的能力。
- **运算符 Trait：** 例如 `Add`、`Sub`、`Mul` 等，这些 Trait 允许我们重载运算符。
- **格式化 Trait：** 例如 `Display`、`Debug` 等，这些 Trait 用于控制类型的格式化输出。
- **迭代器 Trait：** 例如 `Iterator`，这个 Trait 用于实现迭代器。
- **并发 Trait：** 例如 `Send`、`Sync` 等，这些 Trait 用于并发编程。

### 并发 Trait

`Send` 和 `Sync` 是 Rust 中用于并发编程的两个重要的 trait。它们用于标记类型是否可以在线程之间安全地传递和共享。

- `Send` trait 标记类型的所有权可以在线程之间安全地传递。如果一个类型实现了 `Send` trait，那么它的值就可以安全地从一个线程移动到另一个线程。这对于在线程之间传递数据至关重要。例如，`MutexGuard` 没有实现 Send，因为在线程之间传递 `MutexGuard` 会导致数据竞争。
- `Sync` trait 标记类型可以在多个线程之间安全地共享（通过引用）。如果一个类型实现了 `Sync` trait，那么它的值就可以安全地被多个线程同时访问。这对于在多个线程之间共享数据至关重要。例如，`Arc<T>` 实现了 Sync，因为它允许多个线程安全地访问同一个数据。

Rust 的编译器会自动为满足特定条件的类型实现 `Send` 和 `Sync` trait。一般来说，如果一个类型的所有字段都实现了 `Send` 和 `Sync` trait，那么这个类型也会自动实现 `Send` 和 `Sync` trait。

但是，如果一个类型包含裸指针或者使用了不安全的代码，那么它可能无法自动实现 `Send` 和 `Sync` trait。在这种情况下，开发者需要手动实现这些 trait，并确保类型的并发安全性。

### 实际应用场景

Trait 在 Rust 中有广泛的应用，以下是一些常见的场景：

- **实现泛型编程：** Trait 可以用于编写泛型函数和结构体，使其可以处理多种类型的数据。例如，可以编写一个泛型函数，用于计算任何实现了 `Add` Trait 的类型的和。
- **实现代码复用：** Trait 可以用于定义共享的行为，并在不同的类型中实现这些行为。例如，可以定义一个 `Drawable` Trait，用于描述可以在屏幕上绘制的类型，然后在不同的图形类型（例如 `Circle`、`Rectangle`）中实现这个 Trait。
- **实现接口：** Trait 可以用于定义接口，并强制类型实现这些接口。例如，可以定义一个 `Read` Trait，用于描述可以读取数据的类型，然后强制所有实现了 `Read` Trait 的类型都必须实现 `read` 方法。

### 总结

总而言之，Trait 是 Rust 中一种强大的抽象机制，它可以用于实现代码的复用和扩展。通过合理地使用 Trait，我们可以编写出更加灵活和可维护的代码。
