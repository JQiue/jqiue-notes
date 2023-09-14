---
title: 闭包
category: 编程语言
tag: [Rust]
article: false
---

rust 也支持函数式编程，比如闭包，使用`||`声明，并绑定到变量，就像普通函数一样调用

```rust
let my_closure = || println!("This is a closure");
my_closure();
```

在`||`之间可以添加参数

```rust
let add_one = |n: i32| n + 1;
add_one(1);
```

闭包如果只有一行逻辑，就可以省略`{}`，如果复杂也可以使用`{}`定义代码块

```rust
let add = |a: i32, b: i32| {
  let sum = a + b;
  sum
};
```

闭包还可以直接接收闭包以外的变量，这就是闭包的由来，它可以捕获作用域返回内的变量

```rust
let a = 1;
let b = 2;
let add = || a + b;
```
