---
title: 所有权
category: 编程语言
tag: [Rust]
article: false
order: 12
---

在计算机中所有程序都必须和内存打交道，如何申请空间和释放空间很重要，因此编程语言出现了三种内存管理的流派：

+ 手动管理内存的分配和释放，在程序中通过函数的调用方式申请和释放内存，比如 C/C++
+ 垃圾回收机制（GC），在程序运行时不断寻找不使用的内存，比如 Java，Go，JavaScript
+ 通过所有权来管理内存，编译器在编译时会根据一系列规则来检查

::: tip 栈和堆
都是运行时可以使用的内存空间，栈存放已知固定大小的数据，而无法在编译期确定的数据都只能放在堆中，相对比较松散，操作系统会将请求的堆空间作为特定的大小空间，并标记为已使用，把指向这块空间的指针返回，由此堆的性能肯定是不如栈的，如何管理堆内存这就是所有权存在的意义
:::

## 所有权模型

Rust 选择了第三种，这种检查只发生在编译期，因此对于运行期不会有任何性能损失，所有权机制的核心思想是：

+ 每个值都有一个决定其生命周期的所有者（Owner），该所有者是负责分配和释放该值所占用内存的变量或结构体
+ 当所有者被销毁（离开作用域）时，其拥有的值也会被自动释放（dropped）

这种机制保证了内存分配的安全和有效性，并避免了一些内存相关的错误，如内存泄漏、空指针引用等等

比如字符串字面量`&str`是不可变的，而`String`是可变的，是因为采用了不同的内存处理方式。对于字符串字面量而言，在编译期就知道内容，所以会放在只读数据段中。而有些文本是未知的，所以只能在堆上分配空间，其他语言使用 GC 或手动释放这块空间，而 Rust 会在拥有它的变量离开作用域后进行释放，调用一个特殊的`drop`函数。注意，会在所有作用域结束的地方自动调用该函数

```rust
{
  let str = String::form("hello"); // 从这里开始有效
}
// drop(str)
// 变量 str 失效
```

## 所有权转移（Move）

但这太苛刻了，Rust 进行了扩展：

+ 可以把值转移到另一个所有者，这被称为转移（Move）
+ 可以借用该值，而不需要转移所有权

在 Rust 中，所有权的转移是通过变量之间的赋值来实现的。如果数据是已知固定大小的简单值，则会拷贝并同时推入栈中。但如果是一个引用，则只会拷贝引用，在其它语言中可能叫做浅拷贝，但 Rust 使用转移来描述该行为，并且永远不会自动深拷贝。这时会有两个变量指向同一个地址，就导致了一个问题，当离开作用域时，重复释放相同的内容，这就是二次释放。而 Rust 为了解决这一点，在所有权转移后，前者将无法再次访问该值。这种机制保证了值的唯一性和可变性，避免了二次释放带来的问题内存安全问题

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1);  // s1 失效，触发 panic
```

将值传给函数也会触发转移或复制，即便是返回值的时候也会发生所有权的转移

```rust
fn main() {
  let s1 = String::from("hello");
  takes_owership(s1); // s1 的值被移动进了函数
                      // s1 在这里开始不在有效
  let n1 = 5;         // n1 的值被复制到了函数
  makes_copy(n1);
                      // n1 由于是 Copy 的，所以仍然有效
}

fn takes_owership(value: String) { // 进入作用域
  println!("{}", value); 
} // 被释放

fn makes_copy(value: i32) {
  println!("{}", value);
} // 没有什么事情发生
```

## 克隆（Clone）和复制（Copy）

如果确实想要一份值的副本，则明确调用`clone`方法

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

Rust 提供了一个名为 Copy 的 trait，一旦某种类型的变量拥有 Copy 这种 trait，那么该变量在赋值给其他变量时也会保持可用性，一般来说任何简单标量类型都是 Copy 的，而需要分配内存的资源都不是 Copy 的，比如：

+ 整数类型
+ bool
+ 字符类型
+ 浮点类型
+ 如果元组所有字段都是 Copy 的，那么这个元组也是 Copy 的

## 借用（Borrow）

在下面这个例子中，希望函数保留参数的所有权，就必须将传入的值作为结果返回

```rust
fn main() {
  let s1 = String::from("hello");
  let (s2, len) = calculate_length(s1);
}

fn calculate_length(s: String) -> (String, usize) {
  let length = s.len();
  return (s, length);
}
```

在不转移所有权的前提下，使用`&`创建一个指向该变量的引用，由于引用没有所有权，所以离开作用域时也不会销毁所指向的值，像这种通过引用传递参数给函数的方法就是**借用**，它的类型是`&T`

```rust
fn main() {
  let s1 = String::from("hello");
  let len = calculate_length(&s1);
}

fn calculate_length(s: &String) -> usize { // s 是一个指向 String 类型
  s.len()
} // 什么也不会发生
```

引用默认是不可变的，使用`&mut`声明可变引用，它的类型是`&mut T`

```rust
fn main() {
    let mut s1 = String::from("hello");
    change($mut s1);
}

fn change(s: &mut String) { // s 是一个可变引用
  s.push_str(", world");
}
```

可变引用只能在作用域中声明一个，避免了数据竞争，但是可以巧妙地使用`{}`创建一个新的作用域来创建多个可变引用

```rust
let mut s1 = String::from("hello");

let r1 = &mut s1;
let r2 = &mut s1; // error
```

同时，不可变引用可以存在多个，但不能在拥有不可变引用的情况下同时创建可变引用

## 切片（Slice）

切片是另一种不需要所有权的类型，允许借用集合中一段连续的元素，`String`切片类型是`&str`

```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
```

`[start, end]`分别是开始索引和结束索引，并提供了一些语法糖：

```rust
let hello = &s[..5];     // 从 0 开始
let world = &s[6..];     // 从 6 开始到末尾
let helloworld = $s[..]; // 整体切片
```

同时，字符串字面量就是切片，变量实际上是一个指向该值的不可变引用

字符串之间的比较规则是包含的字符，以及顺序相同就是相等的，无论是否指向同一个引用

## 生命周期（Lifetime）

生命周期是 Rust 中另一种形式的泛型，用于确保引用在使用时保持有效。它的主要目的是防止悬垂指针和内存泄漏等问题。每个引用都有自己的生命周期，对应着引用有效的作用域

大多数情况下，生命周期可以被编译器自动推导。但在某些复杂情况下，特别是当引用的生命周期可能以不同方式相关联时，需要手动标注生命周期

在这段代码中，由于 x 离开作用域就会释放，导致这段代码不合法，因为 x 的生命周期没有活到打印它的范围，所以编译失败

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

### 标注

在这段代码中，返回字符最长的那个切片类型，就涉及到生命周期错误，因为无法确定返回的引用是 x 还是 y，所以无法知晓传入的引用的具体生命周期，也不能用生命周期检查其来确定，因此需要补充一个泛型生命周期参数，来定义引用之间的关系，从而使检查器进行分析

```rust
fn longest<'a'>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}
```

生命周期参数语法必须以`'`开头，通常使用小写字符，和泛型一样简短，`'a`通常是开发者默认使用的名称，一般会将生命周期参数填写到`&`的后面，并用一个空格与引用类型分开，在上面这个函数中的意思就是，参数和返回值的所有引用都必须拥有相同的生命周期，它们活的一样长

### 省略规则

在没有显式标注的情况下，使用了以下规则来计算引用的生命周期：

+ 每个引用参数都有自己的生命周期参数，`fn foo<'a>(x: &'a i32');`，多个参数拥有两个不同的生命周期参数，`fn foo<'a, 'b>(x: &'a i32', y: &'b i32);`，以此类推
+ 当只存在一个输入生命周期参数时，这个生命周期参数会被赋予所有输出生命周期参数，`fn foo<'a>(x: &'a i32) -> &'a i32`
+ 当拥有多个输入生命周期参数，而其中一个是`&self`或`&mut self`时，`self`的生命周期会被赋予所有的输出生命周期参数

```rust
fn first_word(s: &str) -> &str {}
// 第一条规则
fn first_word<'a>(s: &'a str) -> &str {}
// 第二条规则
fn first_word<'a>(s: &'a str) -> &'a str {}

// 不适用任何规则，无法推导生命周期，所以需要标注
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {}
```

### 静态生命周期

Rust 还有一种特殊的生命周期`'static`，它表示整个程序的执行期，意味着在程序中总是可以用的，不过需要思考是否需要该引用存活的那么久，否则就会尝试创建一个悬垂引用

### 在结构体中使用生命周期

当结构体包含引用时，需要为每个引用指定生命周期

```rust
struct ImportantExcerpt<'a> {
  part: &'a str,
}

fn main() {
  let novel = String::from("Call me Ishmael. Some years ago...");
  let first_sentence = novel.split('.').next().expect("Could not find a '.'");
  let excerpt = ImportantExcerpt {
    part: first_sentence,
  };
}
```

## Drop trait

实现 Drop trait 的值，在被 drop 时会执行额外的代码

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
  // 手动 drop
  drop(a);
  println!("Exiting main");
}
```
