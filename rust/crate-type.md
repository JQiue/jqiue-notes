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
