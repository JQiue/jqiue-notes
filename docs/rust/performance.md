---
title: 性能优化
category: 编程语言
tag: [Rust]
article: false
order: 17
---

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

### 使用 cargo-wizard 自动配置 Cargo 项目

Cargo 子命令 cargo-wizard，它简化了 Cargo 项目的配置，以实现最大的运行时性能、最快的编译时间或最小的二进制大小

```sh
cargo install cargo-wizard
```

项目中使用`cargo wizard`快速配置

## 参考资料

+ [Rust 性能手册](https://blues-star.github.io/perf-book-zh/title-page.html)
+ [优化 Rust 二进制大小](https://github.com/johnthagen/min-sized-rust)
