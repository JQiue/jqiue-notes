---
title: Unsafe Rust
category: 编程语言
tag: [Rust]
article: false
order: 14
---

如果使用 Safe Rust 和底层操作系统或其它语言打交道，此时的安全检查将鞭长莫及，所以这就是 Unsafe Rust 的意义，Unsafe Rust 不等于不安全，只是将安全性交给开发者自己判断

Unsafe Rust 是 Safe Rust 的超集，编译器依然会进行安全检查，但是下列情况除外：

+ 解引用裸指针
+ 调用不安全的函数
+ 访问或修改可变的静态变量
+ 实现不安全的 trait
