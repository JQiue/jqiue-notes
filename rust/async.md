---
title: 异步编程
category: 编程语言
tag: [Rust]
article: false
order: 10
---

Rust 的 async/await 语法灵感来源于 JavaScript 等语言，但其底层实现更注重性能和内存安全，Rust 的异步编程模型特别适合高并发的 I/O 密集型任务，能够有效减少资源占用

Rust 和 JavaScript 有所不同：

+ Future 是惰性的，只有在被轮询（poll）时才会执行，从而避免不必要的计算，提升性能
+ 与 JavaScript 的内置事件循环不同，Rust 没有内置异步运行时，用户需要显式选择运行时（如 tokio 或 async-std），以支持异步任务的调度和执行
+ 异步运行时（如 tokio）支持单线程和多线程模型，相比 JavaScript 的单线程事件循环，Rust 提供了更大的灵活性，同时通过编译期检查保证内存安全

基于上述特点，Rust 的异步编程特别适合 I/O 密集型任务，通过非阻塞 I/O 和高效的运行时调度，显著降低 CPU 和内存的负担，而多线程则更适合 CPU 密集型任务

## Futures

`async/await` 是 Rust 语言提供的语法糖，用于简化异步编程，但需要结合异步运行时（如 tokio）来实际执行。使用 async 标记的函数在编译时会被转换为一个实现了 `Future` trait 的类型，这个 Future 代表一个可能在未来完成的操作。Future 在执行（通过 poll 方法驱动）时，如果遇到未就绪的操作（如异步 I/O），会返回 Pending 状态，允许运行时调度其他任务，从而避免阻塞当前线程，实现高效的并发

创建一个异步函数，即使调用它也不会执行，因为 Future 是惰性的

```rust
async fn foo() {
  println!("foo");
}

fn main() {
  foo();
}
```

对于简单的阻塞执行，可以引入`futures` crate 来使用其执行器如`block_on`。对于生产级异步应用，推荐使用完整的运行时如`Tokio`

```toml
[dependencies]
futures = "0.3"
```

`block_on`会阻塞当前线程直到`Future`完成，适合简单场景。但对于非阻塞并发，推荐使用`Tokio`的多线程执行器

```rust
use futures::executor::block_on;

fn main() {
  block_on(foo());
}
```

如果想在一个异步函数中调用另一个异步函数，可以使用`.await`语法进行调用

```rust
async fn bar() {
  println!("bar");
}

async fn foo() {
  println!("foo");

  bar().await;
}
```

Futures 更适合于需要更底层控制的场景，或者想要自行构建异步运行时的场景

## Tokio

Tokio 是在 Futures 之上构建的一个功能更加丰富的异步运行时库，更适合于大多数常见的网络编程、I/O 密集型应用开发场景，提供了更加开箱即用的功能。Tokio 的主要特点包括：

+ 高性能：使用 Rust 的并发特性和内存管理，可以提供非常高的性能和吞吐量
+ 可扩展性：支持各种异步 I/O 原语，如 TCP、UDP、文件 I/O 等，可以用于构建各种类型的异步应用程序
+ 易用性：提供了一个易于使用的 API，隐藏了底层的异步细节，使开发人员可以专注于应用程序逻辑
+ 可靠性：利用 Rust 的类型系统和所有权模型，可以帮助开发人员编写安全和正确的异步代码

::: code-tabs

@tab 同步单线程

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addrs = [
        SocketAddr::from(([0, 0, 0, 0], 8080)),
        SocketAddr::from(([127, 0, 0, 1], 8080)),
    ];
    let listener = std::net::TcpListener::bind(&addrs[..])?;
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                handle_connection(stream);
            }
            Err(err) => eprintln!("{err}"),
        }
    }
}
```

@tab 同步多线程

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addrs = [
        SocketAddr::from(([0, 0, 0, 0], 8080)),
        SocketAddr::from(([127, 0, 0, 1], 8080)),
    ];
    let listener = std::net::TcpListener::bind(&addrs[..])?;
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                std::thread::spawn(move || {
                    handle_connection(stream);
                });
            }
            Err(err) => eprintln!("{err}"),
        }
    }
    Ok(())
}
```

@tab Tokio 异步

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addrs = [
        SocketAddr::from(([0, 0, 0, 0], 8080)),
        SocketAddr::from(([127, 0, 0, 1], 8080)),
    ];
    let listener = tokio::net::TcpListener::bind(&addrs[..])?;
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                tokio::spawn(async {
                    handle_connection(stream);
                });
            }
            Err(err) => eprintln!("{err}"),
        }
    }
    Ok(())
}
```

@tab 响应代码

```rust
fn handle_connection(mut stream: std::net::TcpStream) {
    let mut buf = [0; 128];
    let n = stream.read(&mut buf[..]).unwrap();
    let response = format!(
        "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\nHello, Tokio!{}",
        12,
        String::from_utf8_lossy(&buf)
    );
    stream.write_all(response.as_bytes()).unwrap();
}

fn find_end_of_http_headers(buf: &[u8]) -> Option<usize> {
    if buf.len() < 4 {
        return None;
    }
    for i in 0..=buf.len().saturating_sub(4) {
        if &buf[i..i + 4] == b"\r\n\r\n" {
            return Some(i + 4);
        }
    }
    None
}

async fn handle_connection_async(mut stream: tokio::net::TcpStream) {
    let mut buf = [0; 1024];
    let mut buffer = Vec::new();
    loop {
        let n = match stream.read(&mut buf).await {
            Ok(0) | Err(_) => return,
            Ok(n) => n,
        };
        buffer.extend_from_slice(&buf[..n]);
        if let Some(end_of_headers) = find_end_of_http_headers(&buffer) {
            println!("找到结束标志，处理请求...");
            let response = format!(
                "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\nHello, World!\r\n{}",
                buffer.len() + 12,
                String::from_utf8_lossy(&buffer)
            );
            if stream.write_all(response.as_bytes()).await.is_err() {
                return;
            }
            let _ = stream.shutdown().await;
            return;
        }
        println!("继续读取数据...");
    }
}
```

:::

### 运行时

```rust
// 创建一个默认配置的运行时
fn main() {
  let rt = tokio::runtime::Runtime::new().unwrap();
}

#[tokio::main]
async fn main() {

}
```

### 任务调度

`tokio::spawn`用于在 Tokio 运行时中调度一个异步任务（Future），返回一个`JoinHandle<T>`，其中`T`是任务的返回类型。这允许任务在后台并发执行，而不阻塞当前任务。`Tokio`的运行时（多线程或当前线程模式）会自动管理任务的调度，利用工作窃取（work-stealing）来平衡负载。高性能场景下，它比`std::thread::spawn`更高效，因为它复用线程池而非创建新 OS 线程。适用于 I/O 密集任务，如处理多个网络连接

```rust
use tokio::net::TcpListener;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();

    loop {
        let (stream, _) = listener.accept().await.unwrap();
        // Spawn 一个新任务处理连接
        tokio::spawn(async move {
            // 处理逻辑，例如读取数据
            println!("处理新连接");
            // 返回值可选
            Ok::<_, std::io::Error>(())
        });
    }
}
```

### join! 宏

`tokio::join!` 宏用于并发等待多个异步操作（Future）完成，返回一个元组包含每个 Future 的结果。类似于 futures::join_all，但集成 Tokio 运行时。支持错误传播：如果任一 Future 返回 Err，结果会是Err。适用于需要并行执行多个独立任务的场景，如同时发送多个 HTTP 请求

