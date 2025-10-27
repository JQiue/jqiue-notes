---
title: 模块化
category: 编程语言
tag: [Rust]
article: false
order: 13
---

一个包只能拥有一个库单元包，但可以拥有多个二进制单元包，`cargo.toml`没有指定`src/main.rs`就可以运行的原因是因为`src/main.rs`默认是一个二进制单元包的根节点无需指定，如果包含`src/lib.rs`，则会视为与包同名的库单元包的根节点，如果在`src/bin`创建更多二进制单元包，这个路径下每个源文件都会视为独立的二进制包，每个包都具有自身的作用域，所以不会导致冲突

每个源码文件都隐式定义了一个模块，文件路径决定了模块名称。主模块默认为 src/lib.rs 或 src/main.rs 中的模块

## mod

在源码文件内使用 mod 声明另一个子模块

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

## super

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

## use

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

## 独立模块

使用 mod.rs 对应的文件组织较复杂的模块代码
