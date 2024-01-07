---
title: 性能优化
category: 编程语言
tag: [Rust]
article: false
---

## 测量

如果想要测量执行时间

```rust
use std::time::Instant;

let start = Instant::now();
func_to_test();
let duration = start.elapsed();
```

## 构建优化

使用`--release`标识构建，并在 Cargo.toml 中加入以下项：

```toml
[profile.release]
lto = true # 链接时间优化(LTO)是一种整体程序优化技术，可以将运行时性能提高 10-20% 甚至更多
codegen-units = 1 #  crate 分割成多个 codegen units，以实现并行化（从而加快）编译。然而，这可能会导致它错过一些潜在的优化。如果你想以更大的编译时间为代价来潜在地提高运行时性能，可以将单元数设置为一个
panic = "abort" # 如果不需要捕捉或解除恐慌，可以告诉编译器在恐慌时简单地中止。这可能会减少二进制大小，并略微提高性能
strip = true # 自动从二进制中剥离符号
opt-level = "s" # 优化二进制大小，可以有多个选项，在平衡中决定是否激进
```

可以为特定的 CPU 体系来构建，需要设置环境变量`RUSTFLAGS="-C target-cpu=native"`，这样就会构建特定平台的 CPU 架构指令，会牺牲一定的兼容性

如果想分析 crate 占用大小，可以安装`cargo install cargo-bloat --no-default-features`，然后使用`cargo bloat --release --crates`进行构建就会分析每个依赖占用的大小

## 参考资料

+ [Rust 性能手册](https://blues-star.github.io/perf-book-zh/title-page.html)
