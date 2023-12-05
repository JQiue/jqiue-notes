---
title: Cargo
category: 编程语言
tag: [Rust]
article: false
---

## 包，单元包，模块，路径

一个包只能拥有一个库单元包，但可以拥有多个二进制单元包，`cargo.toml`没有指定`src/main.rs`就可以运行的原因是因为`src/main.rs`默认是一个二进制单元包的根节点无需指定，如果包含`src/lib.rs`，则会视为与包同名的库单元包的根节点，如果在`src/bin`创建更多二进制单元包，这个路径下每个源文件都会视为独立的二进制包，每个包都具有自身的作用域，所以不会导致冲突

在 Rust 中，代码包被称为 **crate**，在`Cargo.toml`中主要通过以下方式描述项目的依赖：

+ 基于官方仓库，通过版本描述
+ 基于项目的 Git 仓库地址，通过 URL 描述
+ 基于本地项目的路径，通过类 Unix 的模式描述

```toml
[dependencies]
rand = "0.3"
hammer = { version = "0.5.0"}
color = { git = "https://github.com/bjz/color-rs" }
geometry = { path = "crates/geometry" }
```

添加`$CARGO_HOME/config`文件，将仓库默认地址替换为国内的地址，加快下载依赖的速度

```rust
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

第一次构建项目时会根据声明的依赖生成`Cargo.lock`，再次构建会优先检索该文件

::: tip
如果想要知道依赖的用法，可以使用`cargo doc --open`
:::

模块可以将单元包中的代码进行分组，使用`mod`声明，允许控制条目的私有性，模块条目：函数，结构体，接口，实现以及子模块默认是私有的，可以使用`pub`关键字暴露路径

```rust
mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    fn add_two() {}
  }
}
```

可以使用绝对路径或相对路径来调用其中的函数

```rust
mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    fn add_two() {}
  }
}

fn test() {
  // 绝对路径
  crate::foo::foo_a::add_one();
  // 相对路径
  foo::foo_a::add_one();
}
```

也可以使用`super`关键字从父模块构造相对路径，好处是将来需要移动代码时避免更新这部分相对路径

```rust
fn a() {}

mod foo {
  fn add_one() {
    super::a();
  }
  mod foo_a {
    fn add_two() {
      super::add_one();
    }
  }
}
```

定义结构体时，它的字段本身保持私有状态，所以可以决定是否将某个字段公开，与此同时应当注意提供一个构造函数，否则是无法构造实例的

```rust
mod foo {
  pub struct User {
    pub username: String,
    phone: String,
  }
  impl User {
    pub fn new(username: &str, phone: &str) -> User {
      User {
        username: username.to_string(),
        phone: phone.to_string(),
      }
    }
  }
}

fn test() {
  let jqiue = foo::User::new("JQiue", "188****419");
}
```

枚举成员是默认公开的，否则不能实现最大作用

```rust
pub foo {
  pub enum Appetizer {
    Soup,
    Salad,
  }
}
```

使用`use`关键字可以简化使用相对路径和绝对路径的写法

```rust
use foo::foo_a::add_one;

mod foo {
  pub mod foo_a {
    pub fn add_one() {}
  }
  mod foo_b {
    pub fn add_two() {}
  }
}

fn test() {
  add_one()
}
```

可以使用`as`为类型指定别名，它同样解决了使用`use`无法区分类型问题

```rust
use std::fmt::Result;
use std::io::Result as IoResult;
```

使用`mod`声明模块时，也会搜索同名文件中模块的代码，这意味着模块可以拆分为不同的文件

```rust
// src/lib.rs
mod front_of_house;

pub fn eat_at_restaurant() {}

// src/front_of_house
pub mod hosting {
  pub fn add_to_waitlist() {}
}
```

## Unsafe Rust

如果使用 Safe Rust 和底层操作系统或其它语言打交道，此时的安全检查将鞭长莫及，所以这就是 Unsafe Rust 的意义，Unsafe Rust 不等于不安全，只是将安全性交给开发者自己判断

Unsafe Rust 是 Safe Rust 的超集，编译器依然会进行安全检查，但是下列情况除外：

+ 解引用裸指针
+ 调用不安全的函数
+ 访问或修改可变的静态变量
+ 实现不安全的 trait

## Workspace

工作空间用于将代码拆分多个代码包，`Cargo.toml`有所不同，以`workspace`区域开始，同时指定二进制包的位置来添加成员

```toml
[workspace]
members=[
  "main"
]
```

此时整个目录如下：

```
├── Cargo.toml
├── main
│ ├── Cargo.toml
│ └── src
│     └── main.rs
└── target
```

`cargo build`会将所有成员的产物放在根目录的`target`中

添加一个库包`cargo new add-one --lib`，此时目录如下：

```
├── Cargo.toml
├── add-one
│ ├── Cargo.toml
│ └── src
│    └── lib.rs
└── main
  ├── Cargo.toml
  └── src
     └── main.rs
```

cargo 不会自动引入依赖，所以需要主动引入包之间的依赖关系

```toml
[package]
name = "main"
version = "0.1.0"
edition = "2021"

[workspace]
members=[
  "main",
  "add-one"
]

[dependencies]
add-one = { path = "../add-one" }
```

为了在根目录运行二进制包，需要使用`cargo run -p main`来指定

整个工作空间只会在根目录下有`Cargo.lock`文件，即使在每个包中添加相同的依赖包，Cargo 也不会重复下载，保证相同的包都是一个版本，节约了磁盘空间，确保了包之间彼此兼容

除此之外，还有不包含的`[package]`的工作目录，被称为虚拟清单（virtual manifest）。对于没有主`package`的场景希望将所有的`package`组织在一起时非常适合

## 基准测试

在 Rust 中，有两种方式可以实现：

+ 官方提供的`benchmark`
+ 社区实现，例如`criterion.rs`

官方提供的测试工具只能在非 stable 下使用，首先切换 Rust 版本

1. 安装`nightly`，`rustup install nightly`
2. 切换到`ngihtly`，`rustup override set nightly`

然后在代码中编写`benchmark`代码

```rust
#![feature(test)]

extern crate test;

fn sum(mut count: i32) {
  let mut num = 0;
  while count > 0 {
    num += count;
    count -= 1;
  }
  println!("{num}");
}

#[bench]
fn bench_test(b: &mut Bencher) {
  b.iter(|| sum(10000));
}
```

标有`#[bench]`的函数，`iter`接收没有参数的闭包用于使基准测试重复运行。在进行测试后会显示以 ns 为单位的执行每次迭代花费的时间

标准版的`benchmark`最有名的是`criterion.rs`，有以下特点：

+ 统计分析，跟上一次的结果进行对比
+ 图表

首先在`Cargo.toml`添加以下内容：

```toml
[dev-dependencies]
criterion = "0.5"

[[bench]]
name = "fibonacci"
harness = false
```

其中`[[bench]]`中的`name`和`benches/`目录下的文件名匹配，`harness`表示不使用内置的基准测试工具，随后就可以在`benches/fibonacci.rs`中编写测试代码了

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

pub fn slow_fibonacci(nth: usize) -> u64 {
  if nth <= 1 {
    return nth as u64;
  } else {
    return slow_fibonacci(nth - 1) + slow_fibonacci(nth - 2);
  }
}

pub fn fast_fibonacci(nth: usize) -> u64 {
  let mut a = 0;
  let mut b = 1;
  let mut c = 0;
  for _ in 1..nth {
    c = a + b;
    a = b;
    b = c;
  }
  c
}

fn fibonacci_benchmark(c: &mut Criterion) {
  c.bench_function("fib 20", |b: &mut criterion::Bencher| {
    b.iter(|| slow_fibonacci(black_box(20)))
  });
}

criterion_group!(benches, fibonacci_benchmark);
criterion_main!(benches);
```

`bench_function`函数是用于在给定的名称的闭包中运行基准代码，随后就可以使用`cargo bench`运行了
