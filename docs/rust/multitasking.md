---
title: 多任务处理
category: 编程语言
tag: [Rust]
article: false
order: 9
---

并发编程（concurrent programming）与并行编程（parallel programming）这两种概念随着计算机设备的多核心化而变得越来越重要。前者允许程序中的不同部分相互独立地运行，而后者则允许程序中的不同部分同时执行

可以使用`thread:spawn`创建新的线程，接受一个闭包，在闭包中运行新线程中的代码

```rust
use std::{
  thread::{self, spawn},
  time::Duration,
};

fn main() {
  spawn(|| {
    for i in 1..10 {
      println!("{} from the spawned thread!", i);
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for i in 1..10 {
    println!("{} from the main thread!", i);
    thread::sleep(Duration::from_millis(1000));
  }
}
```

上面的代码只要主线程运行结束，创建的新线程会立即停止，无论是否运行完成，`thread::sleep`会让当前的线程停止执行一段时间，并允许一个不同的线程继续运行，但无法保证执行顺序，这取决于操作系统的线程调度策略。新线程会返回一个自持所有权的 JoinHandle，调用它的`join`方法可以堵塞当前线程直到对应的新线程运行结束，这保证新线程能够在主线程退出前执行完毕，所以在并发编程中，调用`join`的时机值得注意

```rust
use std::{
  thread::{self, spawn},
  time::Duration,
};

fn main() {
  let handle = spawn(|| {
    for i in 1..10 {
      println!("{} from the spawned thread!", i);
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for i in 1..10 {
    println!("{} from the main thread!", i);
    thread::sleep(Duration::from_millis(1000));
  }
  handle.join().unwrap();
}
```

## move

使用 move 闭包可以让某个线程使用另一个线程的数据，比如下面的代码是行不通的，这是因为闭包捕获`v`，而又因为在新线程中运行这个闭包，但这导致了一个问题，Rust 不知道新线程运行多久，所以不能确定`v`的引用是否一直有效

```rust
use std::thread;
fn main() {
  let v = vec![1, 2, 3];
  let handle = thread::spawn(|| {
    println!("Here's a vector: {:?}", v);
  });
  handle.join().unwrap();
}
```

加上`move`关键字，就会强制闭包获取它的所有权，不再借助 rust 的推导，当然也让主线程无法再使用这个引用

```rust
use std::thread;
fn main() {
  let v = vec![1, 2, 3];
  let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
  });
  handle.join().unwrap();
}
```

## 线程通信

### 消息传递

如果需要在线程之间通信，则使用消息传递机制就可以了，rust 实现了一个名为 channel 的编程概念，通常由发送者和接收者两个部分组成

```rust
fn main() {
  // 返回一个含有发送端和接收端的元组
  let (tx, rx) = channel();
  spawn(move || {
    tx.send("hello").unwrap(); // 发送数据
  });
  let received = rx.recv().unwrap();  // 接收数据
  println!("{}", received);
}
```

在接收端有两个方法`recv`和`try_recv`，前者会堵塞主线程执行只到有值传入通道，返回`Result<T, E>`，如果通道的发送端全部关闭了，就会返回一个错误来表示当前通道再也没有需要接受的数据。而后者不会堵塞线程，它会立即返回`Result<T,E>`，当通道有数据时返回`Ok`，否则返回`Err`

这段代码很显而易见的表明主线程确实在等待新线程发送的值，并且将`rx`视为迭代器，不再调用`recv`方法

```rust
fn main() {
  let (tx, rx) = channel();
  spawn(move || {
    let vals = vec!["hello", ",", "world"];
    for val in vals {
      tx.send(val).unwrap();
      thread::sleep(Duration::from_millis(1000));
    }
  });
  for received in rx {
    println!("{}", received);
  }
}
```

::: tip
`send`会获得参数的所有权，一旦被发出，后续就不能够再使用，这可以阻止使用已发送的值
:::

### 共享内存

通过消息传递是一种不错的并发通信机制，通过共享内存是另一种解决方案，互斥体在任意时刻只允许一个线程访问数据，因此线程必须首先发出信号来获取互斥体的锁，这种数据结构用来记录谁当前拥有数据的唯一访问权，但互斥体非常难用，因为它的规则：

+ 在使用数据前必须尝试获取锁
+ 使用完互斥体守护的数据后必须释放锁，这样其他线程才能继续完成获取锁的操作

但在 rust 中，由于类型系统和所有权，可以保证不会在加锁和解锁这两个步骤中出现错误，其中`Mutex<T>`是一个智能指针，创建一个共享内存的互斥体，而它的方法`lock`用于获取锁来访问数据，这个调用会堵塞当前线程直到取得锁为止，一旦拿到了锁，就可以将返回值看作指向数据的可变引用，rust 会在使用数据之前加锁，直到离开作用域就会自动释放锁

```rust
fn main() {
  let counter = Arc::new(Mutex::new(0));
  let mut handles = vec![];
  for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = spawn(move || {
      let mut num = counter.lock().unwrap();
      *num += 1;
    });
    handles.push(handle);
  }
  for handle in handles {
    handle.join().unwrap();
  }
  println!("{}", counter.lock().unwrap());
}
```

在以上代码中，`Arc<T>`是一个和`Rc<T>`类似的引用计数指针，但是`Rc<T>`在多线程中并不安全，而`Arc<T>`是一个原子引用计数，保证安全的在多个线程中共享，但是要付出一定的性能开销，所以`Rc<T>`适合在单线程中

## Send 和 Sync

如果将 T 值移动到另一个线程是安全的，则类型 T 为 Send

如果同时从多个线程访问 T 值是安全的，则类型 T 为 Sync。更准确地说，定义是：当且仅当 &T 为 Send 时，T 为 Sync

大部分类型都属于 `Send + Sync`

+ `i8`、`f32`、`bool`、`char`、`&str`…
+ `(T1, T2)`、`[T; N]`、`&[T]`、`struct { x: T }`…
+ `String`、`Option<T>`、`Vec<T>`、`Box<T>`…
+ `Arc<T>`：明确通过原子引用计数实现线程安全。
+ `Mutex<T>`：明确通过内部锁定实现线程安全。
+ `AtomicBool`、`AtomicU8`…：使用特殊的原子指令
