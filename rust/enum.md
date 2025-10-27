---
title: 枚举
category: 编程语言
tag: [Rust]
article: false
order: 5
---

`enum`关键字允许创建一个从多个不同取值中选其一的枚举类型

```rust
enum Role {
  Foo,
  Bar,
  Qux,
}
```

可以指定类型，甚至另一个枚举类型

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}
```

也可以像结构体那样使用`impl`定义方法

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x:i32, y:i32},
}

impl Role {
  fn call(&self) {}
}
```

## 方法

可以像结构体一样为枚举实现方法：

```rust
enum Role {
  Foo(i32),
  Bar(f32),
  Qux(String),
  Baz{x: i32, y: i32},
}

impl Role {
  fn call(&self) {
    // 方法实现
  }
  // 可以添加更多方法
}
```

## Option

在 Rust 中，通常使用`Option<T>`泛型枚举类型来表示可能存在或不存在的值，它有两种变体：`Some(T)`和`None`，使用这种枚举类型用来明确的处理可能为空的值

```rust
fn divide(a: i32, b: i32) -> Option<i32> {
  if b != 0 {
    Some(a / b)
  } else {
    None
  }
}
fn main() {
  let result = divide(2, 0);
  match result {
    Some(value) => println!("{}", value),
    None => println!("Cannot divide by zero!"),
  }
}
```

## Result

`Result<T, E>`是另一个常用的枚举类型，用于处理可能出错的操作：

```rust

```

+ `unwrap()`：当返回值是 OK 则返回内部值，否则就会调用`panic!`
+ `expect`：在`unwrap`的基础上指定错误信息
+ `unwrap_or(fallback)`：返回成功值，否则返回 fallback,，丢弃错误值
+ `is_ok()`和`is_err()`：返回 bool 值，告诉 Result 是成功的结果还是错误的结果
+ `ok()`：返回`Option<T>`类型的成功值，否则返回`None`
+ `err()`：返回`Option<E>`类型的错误值
+ `map()`：
+ `map_err(|e| )`：

## ? 运算符

`?`运算符是 Rust 提供的简化处理`Result`和`Option`的语法糖，如果遇到第二个变体就会立即返回，否则提取值并继续执行：

+ 只能用于返回 Result 或 Option 类型的函数
+ 如果是 Result，错误类型必须匹配或可转换
+ 如果是 Option，遇到 None 会直接返回 None

```rust
fn read_file() -> Result<String, io::Error> {
  let mut file = File::open("hello.txt")?;
  let mut s = String::new();
  file.read_to_string(&mut s)?;
  Ok(s)
}
```

`?`依赖于 Try trait（目前还是不稳定特性）
