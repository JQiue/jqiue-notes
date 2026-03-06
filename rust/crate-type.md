---
title: 链接类型
category: 编程语言
tag: [Rust]
article: false
order: 10
---

`crate_type` 属性用于指定 Rust crate 的输出类型，可以在 `Cargo.toml` 中通过 `crate-type` 字段进行配置。常见的 crate 类型包括：

- `bin`：生成可执行文件
- `lib`：生成 Rust 库

如果执行`rustc --help|grep crate-type`，可以看到更多可用的类型 `--crate-type <bin|lib|rlib|dylib|cdylib|staticlib|proc-macro>`

执行`cargo new`时默认创建的是`bin`，这要求`src/main.rs`文件存在。如果想创建一个库，可以使用`cargo new --lib`，这会创建一个包含`src/lib.rs`的库项目

一般这两个类型足以应付大多数需求，但在某些情况下，可能需要生成动态库或静态库以供其他语言调用

## rlib

生成库文件，具体类型由编译器根据上下文决定，但通常是`lib`，用于 Rust 内部代码共享或者其他项目的依赖

## dylib

生成动态库，在 Windows 上是`.dll`，Linux 上是`.so`，MacOS 上是`.dylib`，但是这种库只能被 Rust 程序调用，因为它包含 Rust 特有的元数据

## cdylib

cdylib 也是动态库，但不包含 Rust 特有的元数据，适合外部程序调用，生成文件同`dylib`

## staticlib

生成静态链接库，适合与其他语言的程序进行静态链接，生成文件在 Windows 上是`.lib`，Linux/MacOS 上是`.a`，这意味着库代码会被直接嵌入到最终的可执行文件中

## libloading

libloading 是一个 Rust crate，允许在运行时动态加载共享库（如 `.so` 或 `.dll`），并调用其中的函数。它提供了一种跨平台的方式来处理动态库加载，适用于需要在运行时决定加载哪个库的场景，例如插件系统，使用 Rust 自己的 ABI 能够支持更为丰富的 Rust 类型包括泛型和 trait 对象

公用的插件类型

```toml
[package]
name = "plugin-api"
version = "0.1.0"
edition = "2024"

[dependencies]
```

```rust
#[derive(Debug)]
pub struct Comment {
    pub comment: String,
    pub user_id: String,
    pub ua: Option<String>,
    pub ip: Option<String>,
}

pub type NameFn = fn() -> String;
pub type VersionFn = fn() -> String;
pub type PreSaveFn = fn(comment: &mut Comment);
pub type PostSaveFn = fn(comment: Comment) -> Comment;
```

插件1

```toml
[package]
name = "plugin-one"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["dylib"]

[dependencies]
plugin-api = { workspace = true }
```

```rust
use plugin_api::Comment;

#[unsafe(no_mangle)]
pub fn name() -> String {
    "Plugin One".to_string()
}

#[unsafe(no_mangle)]
pub fn version() -> String {
    "0.0.1".to_string()
}

#[unsafe(no_mangle)]
pub fn pre_save(comment: &mut Comment) {
    comment.ip = None;
}
```

插件2

```toml
[package]
name = "plugin-two"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["dylib"]

[dependencies]
plugin-api = { workspace = true }
```

```rust
use plugin_api::Comment;

#[unsafe(no_mangle)]
pub fn name() -> String {
    "Plugin Two".to_string()
}

#[unsafe(no_mangle)]
pub fn version() -> String {
    "0.0.1".to_string()
}

#[unsafe(no_mangle)]
pub fn pre_save(comment: &mut Comment) {
    comment.comment = "[Plugin Two]".to_string();
}
```

main.rs

```toml
[package]
name = "call"
version = "0.1.0"
edition = "2024"

[dependencies]
libloading = { workspace = true }
plugin-api = { workspace = true }
```

```rust
use std::fs::{self};

use libloading::{Library, Symbol};
use plugin_api::{Comment, NameFn, PreSaveFn, VersionFn};

pub fn scan_plugins() {
    let entries = fs::read_dir("./plugins").unwrap();
    for entry in entries {
        let path = entry.unwrap().path();
        if path.is_file() {
            println!("Found plugin file: {:?}", path);
            let lib = unsafe { Library::new(path).unwrap() };
            let name: Symbol<NameFn> = unsafe { lib.get(b"name").unwrap() };
            let version: Symbol<VersionFn> = unsafe { lib.get(b"version").unwrap() };
            println!("Loaded plugin: {} v{}", name(), version());
        }
    }
}

pub fn plugin_call_pre_save(comment: &mut Comment) {
    let entries = fs::read_dir("./plugins").unwrap();
    for entry in entries {
        let path = entry.unwrap().path();
        if path.is_file() {
            println!("Found plugin file: {:?}", path);
            let lib = unsafe { Library::new(path).unwrap() };
            let pre_save_fn: Symbol<PreSaveFn> = unsafe { lib.get(b"pre_save").unwrap() };
            pre_save_fn(comment);
        }
    }
}

fn create_comment(mut comment: &mut Comment) {
    plugin_call_pre_save(&mut comment);
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    scan_plugins();
    let mut comment = Comment {
        user_id: 1.to_string(),
        comment: "1".to_string(),
        ua: Some("edge".to_string()),
        ip: Some("127.0.0.1".to_string()),
    };
    println!("before {:?}", comment);
    create_comment(&mut comment);
    println!("after {:?}", comment);
    Ok(())
}
```
