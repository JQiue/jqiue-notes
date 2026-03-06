---
title: 所有权 - 从地狱到天堂
category: 编程语言
tag: [Rust]
article: false
order: 12
---

在计算机中，所有程序都必须和内存打交道。如何申请空间、如何释放空间，会直接影响程序的性能和安全，因此编程语言逐渐形成了三种典型的内存管理方式：

+ 手动管理内存的分配和释放，比如 C/C++
+ 通过垃圾回收机制（GC）在运行时回收不再使用的内存，比如 Java、Go、JavaScript
+ 通过所有权在编译期检查资源的使用规则，这就是 Rust 的做法

Rust 选择了第三种方案。它不是把内存管理交给运行时，而是尽量在编译阶段把问题提前发现，因此不会额外引入 GC 的运行时成本。

::: tip 栈和堆
栈和堆都是运行时可用的内存空间。栈存放的是已知固定大小的数据，而无法在编译期确定大小的数据通常需要放到堆中。堆的管理比栈复杂得多，因此如何安全地管理堆内存，就是所有权存在的核心背景。
:::

## 所有权到底解决了什么问题

所有权的核心思想很简单：

+ 每个值都有一个所有者（owner）
+ 一个值在同一时刻只能有一个所有者
+ 当所有者离开作用域时，这个值会被自动释放（drop）

```rust
{
  let s = String::from("hello"); // 从这里开始有效
}
// 离开作用域后自动 drop(s)
```

这种机制保证了内存分配的安全和有效性，并避免了一些常见的内存错误，比如重复释放、悬垂引用和部分内存泄漏问题。

比如 `&str` 和 `String` 的差别，本质上就和内存管理方式有关。`&str` 往往指向编译期已知的字符串切片，而 `String` 会在堆上分配可增长的内存。Rust 会在拥有 `String` 的变量离开作用域时自动回收它，因此不需要程序员手动释放。

## Move：为什么赋值后原变量不能再用

如果所有权规则只有“离开作用域就释放”，那还不够，因为变量之间还会赋值、传参、返回。

Rust 的做法是：把堆上资源的控制权也纳入所有权系统。对于 `String` 这类管理堆内存的值，赋值默认不是深拷贝，而是发生所有权转移（move）。

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1); // 编译错误，s1 已失效
```

为什么要这样设计？因为如果 `s1` 和 `s2` 同时指向同一块堆内存，而离开作用域时又都去释放它，就会产生二次释放（double free）。Rust 通过 move 明确规定：资源的最终负责人只能有一个。

将值传给函数、从函数中返回值，也会触发 move 或 copy：

```rust
fn main() {
  let s1 = String::from("hello");
  takes_ownership(s1); // s1 被移动进函数

  let n1 = 5; // i32 是 Copy 的
  makes_copy(n1);
  println!("{}", n1); // 仍然有效
}

fn takes_ownership(value: String) {
  println!("{}", value);
}

fn makes_copy(value: i32) {
  println!("{}", value);
}
```

## Copy 和 Clone：什么时候会复制

并不是所有赋值都会触发 move。像整数、布尔值、字符、浮点数这类简单标量，复制成本低，也不会涉及堆资源所有权，因此它们通常实现了 `Copy` trait。

+ 整数
+ `bool`
+ 字符
+ 浮点数
+ 如果元组中的所有字段都是 `Copy`，那么这个元组也是 `Copy`

如果一个值实现了 `Copy`，赋值时会直接复制一份，原变量仍然可用。

如果某个值没有实现 `Copy`，但你又确实需要一份完整副本，就需要显式调用 `clone()` 方法：

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

这里的重点不是“Rust 不允许复制”，而是“Rust 不允许对昂贵或危险的复制做隐式决定”。

## Borrow：我只是想用一下，为什么还要转移所有权

如果每次把值传给函数都发生 move，代码会变得非常不方便。下面这个例子中，函数只是想读一下字符串长度，却把所有权拿走了：

```rust
fn main() {
  let s1 = String::from("hello");
  let (s2, len) = calculate_length(s1);
}

fn calculate_length(s: String) -> (String, usize) {
  let length = s.len();
  (s, length)
}
```

这时就需要借用（borrow）。借用的意思是：可以临时使用这个值，但不拿走它的所有权。

```rust
fn main() {
  let s1 = String::from("hello");
  let len = calculate_length(&s1);
  println!("{}", s1); // 仍然有效
}

fn calculate_length(s: &String) -> usize {
  s.len()
}
```

这里的 `&String` 是不可变引用，它只是借来读，不负责释放资源。

### 可变借用

默认引用是不可变的。如果需要修改借来的值，就要使用可变借用 `&mut T`：

```rust
fn main() {
  let mut s1 = String::from("hello");
  change(&mut s1);
}

fn change(s: &mut String) {
  s.push_str(", world");
}
```

Rust 对可变借用的限制很严格：

+ 同一时刻只能有一个可变引用
+ 可以有多个不可变引用
+ 但不能在存在不可变引用的同时再创建可变引用

```rust
let mut s1 = String::from("hello");

let r1 = &mut s1;
let r2 = &mut s1; // error
```

这些限制不是语法洁癖，而是为了避免数据竞争。Rust 选择在编译期直接阻止这种风险。

## Slice：不拿走所有权，只看一部分数据

切片（slice）也是一种借用。它允许你只借用集合中的一段连续数据，而不是整个值的所有权。

对于字符串来说，切片类型是 `&str`：

```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
```

`[start..end]` 表示从 `start` 开始，到 `end` 结束但不包含 `end`。Rust 还提供了一些简写形式：

```rust
let hello = &s[..5]; // 从 0 开始
let world = &s[6..]; // 从 6 到末尾
let all = &s[..];    // 整体切片
```

切片本质上仍然是引用，所以它同样服从借用规则。

## Lifetime：编译器到底在防什么

借用解决了“我只想临时使用”的问题，但随之而来的新问题是：这个引用到底能活多久？

生命周期（lifetime）并不是一个额外的运行时机制，而是 Rust 在编译期用来描述“引用在什么范围内有效”的规则。

大多数情况下，生命周期可以由编译器自动推导。但当一个引用的来源和返回关系不够明确时，就需要手动标注。

先看一个最典型的无效引用例子：

```rust
{
  let r;
  {
    let x = 5;
    r = &x;
  }
  println!("r: {}", r);
}
```

这里 `x` 已经在内层作用域结束时被销毁，但 `r` 还想继续使用它，因此会被编译器拒绝。这就是生命周期检查器正在防止的事情：悬垂引用。

### 生命周期标注

生命周期是 Rust 中另一种形式的泛型，用来描述多个引用之间的关系。

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}
```

这里的 `'a` 不是在延长任何值的寿命，而是在告诉编译器：返回值的生命周期不会超过 `x` 和 `y` 中较短的那个。

生命周期参数必须以 `'` 开头，通常用简短的小写字母表示，例如 `'a`、`'b`。它描述的不是“活多久”，而是“这些引用的有效期如何关联”。

### 省略规则

很多时候不需要手写生命周期，是因为 Rust 内置了一组生命周期省略规则：

+ 每个引用参数都会获得自己的生命周期参数
+ 如果只有一个输入生命周期参数，那么它会被赋给所有输出生命周期参数
+ 如果有多个输入生命周期参数，且其中一个是 `&self` 或 `&mut self`，那么 `self` 的生命周期会赋给所有输出生命周期参数

```rust
fn first_word(s: &str) -> &str {}
// 第一条规则
fn first_word<'a>(s: &'a str) -> &str {}
// 第二条规则
fn first_word<'a>(s: &'a str) -> &'a str {}

// 不适用任何规则，无法推导，所以需要显式标注
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {}
```

### `'static`

Rust 还有一种特殊生命周期 `'static`，它表示该引用在整个程序运行期间都有效。

这通常出现在字符串字面量中，因为字面量直接存放在程序的只读数据段中：

```rust
let s: &'static str = "hello";
```

但 `'static` 不是“哪里不会写就都加上”的万能解。它意味着这个引用要活得非常久，因此只有在语义上确实成立时才应该使用。

### 结构体中的生命周期

当结构体字段中包含引用时，也需要用生命周期参数说明这个结构体实例不能比它引用的数据活得更久：

```rust
struct ImportantExcerpt<'a> {
  part: &'a str,
}

fn main() {
  let novel = String::from("Call me Ishmael. Some years ago...");
  let first_sentence = novel
    .split('.')
    .next()
    .expect("Could not find a '.'");

  let excerpt = ImportantExcerpt {
    part: first_sentence,
  };
}
```

## Drop：离开作用域时到底发生了什么

前面说过，所有者离开作用域时会自动触发资源释放。这个行为背后就是 `Drop` trait。

实现了 `Drop` 的类型，会在销毁时执行额外逻辑：

```rust
struct Droppable {
  name: &'static str,
}

impl Drop for Droppable {
  fn drop(&mut self) {
    println!("Dropping {}", self.name);
  }
}

fn main() {
  let a = Droppable { name: "a" };
  {
    let b = Droppable { name: "b" };
    {
      let c = Droppable { name: "c" };
    }
  }

  drop(a); // 手动提前释放
  println!("Exiting main");
}
```

不过 `Drop` 并不总是“自动且完美”的。对于链表、树这类递归数据结构，默认析构可能会递归释放每个节点，结构过深时甚至可能造成栈溢出，因此在这类场景中往往需要手动控制销毁过程。

## 总结

理解了所有权、借用、生命周期和 Drop 之间的关系后，Rust 的内存安全模型就不再像一组难记的规则，而是一套彼此配合、相互约束的系统。
