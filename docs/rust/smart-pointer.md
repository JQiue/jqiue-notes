---
title: 智能指针
category: 编程语言
tag: [Rust]
article: false
---

指针（pointer）是⼀个通用概念，它指代那些包含内存地址的变量，比如`&`就是表示会借用它所指向的值，除了指向数据外没有任何其他功能。而智能指针（smart pointer）则是⼀些数据结构，它们的行为类似于指针但拥有额外的元数据和附加功能。智能指针的概念并不是 Rust 所独有的，它最初起源于 C++ 并被⼴泛地应用在多种语言中

在拥有所有权和借用概念的 Rust 中，引用和智能指针之间还有另外⼀个差别：引用是只借用数据的指针；而与之相反地，大多数智能指针本⾝就拥有它们指向的数据。比如`String`和`Vec<T>`都是智能指针，以下是标准库中常见的智能指针：

+ `Box<T>`，用于在堆上分配值
+ `Rc<T>`，允许多重所有权的引用计数类型
+ `Ref<T>`和`RefMut<T>`，可以在运行时而不是编译时执行借用规则的类型

## Box

默认情况下所有值都是在栈中分配，通过`Box<T>`可以将值包装使它在堆上分配

```rust
let a = Box::new(5);
```

这种单一值放在堆上没有太多用处，看下下面的枚举，由于 Rust 必须在编译期知道每一种类型的占用大小，而递归是不能够确定大小的

```rust
enum List {
  Cons(i32, List),
  Nil,
}
```

由于无法推断递归类型的大小，但是可以间接的通过`Box<T>`来确定大小，因为它是一个指针，指针的大小是恒定的，不会因为数据的大小产生变化，所以可以将以上的代码放到堆上

```rust
enum List {
  Cons(i32, Box<List>),
  Nil
}

let list = List::Cons(1, 
  Box::new(List::Cons(2, 
    Box::new(List::Nil))));
```

通过装箱，就打破了无限递归的过程，从而使编译器可以计算出一个`List`需要多大的空间

## Rc 和 Arc

每个变量拥有一个所有者，这就是下面代码不能工作的原因

```rust
fn takes_a_string(input: String) {
  println!("It is: {}", input)
}

fn also_takes_a_string(input: String) {
  println!("It is: {}", input)
}

fn main() {
  let user_name = String::from("User MacUserson");
  
  takes_a_string(user_name);
  also_takes_a_string(user_name); // error
}
```

而`Rc<T>`可以打破这一点，让多重所有权发生

```rust
fn main() {
  let s = Rc::new("hello".to_string());
  takes_a_string(s.to_string());
  also_takes_a_string(s.to_string());
}
```

`Rc<T>`是通过不可变引用使程序共享只读数据，如果允许持有多个可变引用，就会违反借用规则导致数据竞争，而`RefCell<T>`允许持有不可变引用的前提下对数据进行修改，也就是说某些特定情况下，需要一个值对外保持不可变的同时能够使用方法内部修改自身，`RefCell`通过`borrow`和`borrow_mut`来提供方法

```rust
let s = RefCell::new("hello".to_string());
takes_a_string(s.borrow().to_string());
s.borrow_mut().push_str("world");
also_takes_a_string(s.borrow().to_string());
```

将`Rc<T>`和`RefCell<T>`结合起来拥有一个多重所有权的可变数据也是很常用的

`Arc<T>`和`Rc<T>`是等价的，区别在于 Arc 可以在线程间共享引用，而 Rc 会使用更快的非线程安全代码更新其引用计数。所以不需要线程共享指针，没必要使用 Arc 带来的性能开销

总结来说：

+ `Rc<T>`允许⼀份数据有多个所有者，而`Box<T>`和`RefCell<T>`都只有⼀个所有者
+ `Box<T>`允许在编译时检查的可变或不可变借⽤，`Rc<T>`仅允许编译时检查的不可变借⽤，`RefCell<T>`类型则通过其内部可变性模式使我们可以修改⼀个不可变类型的内部值，是在运行时而不是编译时
+ 由于`RefCell<T>`允许我们在运行时检查可变借⽤，所以即便`RefCell<T>`本⾝是不可变的，我们仍然能够更改其中存储的值
+ `Box<T>`类型拥有固定的⼤⼩并指向⼀段分配于堆上的数据
+ `Rc<T>`类型通过记录堆上数据的引⽤次数使该数据可以拥有多个所有者
+ `Arc<T>`类型通过原子引用计数来在线程间安全的共享指针
