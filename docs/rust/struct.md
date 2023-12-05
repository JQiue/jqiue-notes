---
title: 结构体
category: 编程语言
tag: [Rust]
article: false
---

结构体相比元组，每个元素都赋予名字的含义，每个元素被称为字段，使用`struct`定义结构体

```rust
// 3 个字段的结构体
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
}

// 单元结构体
struct Unit;

// 元组结构体（实际上就是具名元组）
struct Pair(i32, f32);
```

创建实例：

```rust
let user = User {
  username: String::from("someusername123"),
  email: String::from("someone@example.com"),
};

// 实例化单元结构体
let _unit = Unit;

// 实例化元组结构体
let pair = Pair(1, 0.1);

// 通过 . 访问字段
user.username;
```

如果参数和字段名相同可以省略

```rust
let name = "JQiue".to_string();
let email = "someone@example.com".to_string();
let mut jqiue = User { name, email };
```

## 可变性

实例可变，那么字段就是可变的，不允许单独声明某个字段可变性

```rust
let mut user = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

## 方法

可以使用`impl`为结构体定义方法，和函数类似，方法的第一个参数总是`self`，可以是只读的或可变的，指向实例：

```rust
struct User {
  username: String,
  age: i32,
}

impl User {
  fn print_user(&self) {
    println!("{}", self.username);
  }
}

let jqiue = User {
  username: "JQiue".to_string(),
  age: 18
}

jqiue.print_user();
```

## 关联函数

除了方法，`impl`还可以定义不接收`self`的函数，但这类函数和结构体关联，所以被称为**关联函数（associated functions）**。因为它不作用于某个具体的实例，通常用来作为结构体的构造器来返回新的实例，使用`::`调用关联函数

```rust
struct User {
  username: String,
  email: String,
}

impl User {
  fn new(username: String, email: String) -> User {
    User {
      email,
      username,
    }
  }
}

let jqiue = User::new("jqiue", "861947542@qq.com");
```

可以拥有多个`impl`块，这是合法的

```rust
impl User {
  fn new(username: String, email: String) -> User {
    User {
      email,
      username,
    }
  }
}

impl User {
  fn print_user(&self) {}
}
```
