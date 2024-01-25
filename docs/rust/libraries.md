---
title: 库
category: 编程语言
tag: [Rust]
article: false
---

## Rand

+ [rand](https://github.com/rust-random/rand) - 随机数生成器

## Serde

Serde 是一个处理数据结构的序列化和反序列化的框架，serde_json 则是用来处理 JSON 的库

可以快速地使用`!json`构建一个 JSON 对象

```rust
use serde_json::json;

fn main() {
  let p = !json({
    "name": "JQiue",
    "age": 24,
    "hobbies": ["sleep", "harmonica"]
  })
  println!("{}", p["hobbies"][0]);
}
```

使用`from_str`从一个字符串中解析成 JSON 对象

```rust
fn main() {
  let str = r#"{
      "name": "Ush2a",
      "age":25
  }"#;
  let v: Value = serde_json::from_str(str).unwrap();
}
```

::: tip 如果访问了不存在的属性咋办？

serde_json 对未类型化的 JSON 提供了一个递归枚举用来表示 serde_json::Value

```rust
enum Value {
  Null,
  Bool(bool),
  Number(Number),
  String(String),
  Array(Vec<Value>),
  Object(Map<String, Value>),
}
```

:::

serde_json 也能将 JSON 映射成 rust 数据结构，这需要提前定义结构体

```rust
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
struct Mobile {
  model: String,
  processor: String,
  memory: u8,
  // 指定默认值
  #[serde(default)]
  display: Display,
  storage: u32,
  battery: u32,
  ttm: String,
  price: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Display {
  dpi: u32,
  hz: u32,
  technology: String,
}

// 实现默认值
impl Default for Display {
  fn default() -> Self {
    Display {
      dpi: 0,
      hz: 0,
      technology: "".to_string(),
    }
  }
}

fn main() {
  let mut mobiles: Vec<Mobile> = Vec::new();

  let mobiles_json_str = fs::read_to_string("mobiles.json").unwrap();

  mobiles = serde_json::from_str(&mobiles_json_str).unwrap();
}
```

## rust-embed

rust-embed 用于在发布期间在编译时将文件加载到 Rust 二进制文件中，并在开发期间从 fs 加载文件

```rust
#[derive(RustEmbed)]
#[folder = "examples/public/"]
#[prefix = "prefix/"]
struct Asset;

fn main() {
  let index_html = Asset::get("prefix/index.html").unwrap();
  println!("{:?}", std::str::from_utf8(index_html.data.as_ref()));

  for file in Asset::iter() {
    println!("{}", file.as_ref());
  }
}
```

## lettre

lettre 是一个功能强大的邮件库
