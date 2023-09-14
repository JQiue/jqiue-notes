---
title: Rust
category: 编程语言
tag: [Rust]
excerpt: "Rust 简介"
article: false
---

Rust 由 Mozila 一位工程师创造，他对这个语言的期望是：安全，性能，特性广泛，以内存安全为第一原则，注重并发安全，持续提升性能，现代化语言特性，拥抱开源社区。Rust 是通用型语言，适用所有领域绝大数场景，但本质是弥补 C 的内存安全问题，因为世界上百分之 70 的安全漏洞都是非法访问内存引起。Rust 将会为各领域的基础设施做出贡献，但也有可能会出现杀手级应用

## 安装 && 编译 && 运行

一般不单独安装 Rust 的编译器，而是使用 rustup 安装 Rust 相关的一整套工具链：编译器，标准库，cargo 等

在 Windows 安装 Rust 需要有预备环境[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，保持最小安装的组件为：MSVC C++ Build，Windows SDK

编写一个代码，使用`rustc main.rs`进行编译生成可执行程序，最后执行生成的可执行程序

```rust
fn main() {
  println!("hello, world!");
}
```

Cargo 是官方构建工具，使用`cargo new <name>`创建，构建项目使用`cargo build`，构建结果在`target`下，优化构建则加上`--release`参数，`cargo run`或直接`run`会编译并运行可执行文件

```rust
.
├── .git
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

::: tip Cargo 常用命令

+ `cargo add <crates>`可以添加依赖项到`Cargo.toml`
+ `cargo update`更新依赖，可以增加`-p`指定依赖
+ `cargo clean`清除编译产物
+ `cargo check`在开发过程中检查代码
:::

`Cargo.toml`使用 TOML (Tom's Obvious, Minimal Language) 格式，这是 Cargo 配置文件的格式。`[package]`是一个片段（section）标题，表明下面的语句用来配置一个包。`[dependencies]`是项目依赖片段的开始

```toml
[package]
name = "hello_world" # 定义项目名字
version = "0.1.0"    # 定义项目版本
edition = "2021"     # 声明使用的 Rust 大版本，2015 2018 2021

[dependencies]
```

::: tip
可以在[这里](https://doc.rust-lang.org/cargo/reference/manifest.html)看到更多关于清单的描述
:::

## 工具链

rustfmt

## 参考资料

+ [Rust 语言圣经](https://course.rs/about-book.html)
+ Rust 权威指南
+ [Easy Rust](https://dhghomon.github.io/easy_rust/)
+ 深入浅出 Rust
