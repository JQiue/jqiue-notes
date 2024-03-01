---
title: Rust
category: 编程语言
tag: [Rust]
excerpt: "Rust 简介"
article: false
---

Rust 由 Mozila 一位工程师创造，他对这个语言的期望是：安全，性能，特性广泛，以内存安全为第一原则，注重并发安全，持续提升性能，现代化语言特性，拥抱开源社区。Rust 是通用型语言，适用所有领域绝大数场景，但本质是弥补 C 的内存安全问题，因为百分之 70 的安全漏洞都是非法访问内存引起。Rust 将会为各领域的基础设施做出贡献，但也有可能会出现杀手级应用

## 安装 && 编译 && 运行

一般不单独安装 Rust 的编译器，而是使用 rustup 安装 Rust 相关的一整套工具链：编译器，标准库，Cargo 等

::: tip
可以为 rustup 添加国内源，详见[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/rustup/)

```
RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup
RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
```

:::

在 Windows 安装 Rust 需要有预备环境[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，保持最小安装的组件为：MSVC C++ Build 和 Windows SDK

编写一个代码，使用`rustc main.rs`进行编译生成可执行程序，最后执行生成的可执行程序

```rust
fn main() {
  println!("hello, world!");
}
```

## Cargo

Cargo 是官方构建工具，用来管理 Rust 项目，使用`cargo new <name>`创建项目，构建项目使用`cargo build`，构建结果在`target`下，`cargo run`或直接`run`会编译并运行可执行文件

::: tip 为 Cargo 添加国内源

详见[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index/)

:::

```
.
├── .git
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

Cargo 常用命令

+ `cargo add <crates>`添加依赖项到`Cargo.toml`
+ `cargo update`更新依赖，可以增加`-p`指定依赖
+ `cargo clean`清除编译产物
+ `cargo check`在开发过程中检查代码
+ `cargo install`安装可执行程序

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

### crate

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

```toml
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'rsproxy-sparse'

# 清华
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
[source.tuna-sparse]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

# 中科大
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
[source.ustc-sparse]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

# 字节
[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"
```

::: tip
如果想要知道依赖的用法，可以使用`cargo doc --open`
:::

### Cargo.lock

Cargo.lock 文件在 Rust 项目中有以下几个主要作用：

1. 锁定 crate 依赖的版本：Cargo.lock 记录了项目第一次执行 cargo check/build/test 时将哪个具体版本的依赖包拉取下来，并锁定依赖包不会随 cargo update 变更版本
2. 重复构建：当重复运行 cargo build 时，Cargo 会用 Cargo.lock 中记录的版本来建立包依赖关系,不会重新下载版本。保证重复构建结果一致
3. CI/CD 环境：通过提交 Cargo.lock 到版本控制中可以确保其他开发者的 CI 环境在构建项目时使用完全一致的包依赖版本
4. 孤立环境构建：在没有联网的环境下,通过 Cargo.lock 记录的本地依赖版本信息可以完成项目构建
5. 依赖升级：cargo update 会更新 Cargo.lock 中的依赖版本，方便跟踪依赖是否已经升级

## rustfmt

rustfmt 是格式化工具，可以为项目添加一个`rustfmt.toml`进行配置

```toml
max_width = 100                   // 设置最大行宽为 100 个字符
tab_spaces = 2                    // 设置缩进宽度为 2 个空格
```

然后执行`cargo fmt`进行格式化

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

Cargo 不会自动引入依赖，所以需要主动引入包之间的依赖关系

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

除此之外，还有不包含的`[package]`的工作目录，被称为**虚拟清单**（virtual manifest）。对于没有主`package`的场景且希望将所有的`package`组织在一起时非常适合

## 参考资料

+ Rust 权威指南
+ [Rust 语言圣经](https://course.rs/about-book.html)
+ [LearnRustEasy](https://rustycab.github.io/LearnRustEasy/chapter_1.html)
+ [Easy Rust](https://dhghomon.github.io/easy_rust/)
+ 深入浅出 Rust
+ [Rust 生态社区指南](https://blessed.rs/crates)
+ [Comprehensive Rust - Google 发布的 Rust 教程](https://google.github.io/comprehensive-rust/)
+ [Rust Language Cheat Sheet](https://cheats.rs/)
+ [Rust 生态系统的非官方指南](https://blessed.rs/crates)
+ [Rust 库和程序的索引](https://lib.rs/)
