---
title: 标准功能
category: 编程语言
tag: [Rust]
article: false
order: 15
---

默认情况下，Rust 设定了若干个会自动导入到每个程序作用域中的标准库内容，这组内容被称为**预导入**（prelude）内容，可以在标准库文档中查看预导入的所有内容。如果需要的类型不在预导入内容中，就必须使用`use`语句显式地将其引入作用域。比如`std::io`库提供很多有用的功能，包括接收用户输入的功能

## 输入

```rust
use std::io;
let mut input = String::new();
io::stdin()
    .read_line(&mut input)
    .expect("Failed to read line");
```

## 格式化输出

打印操作由`std::fmt`里面所定义的一系列宏来处理，主要包括：

+ `format!`：将格式化文本写到字符串
+ `print!`：与 format! 类似，但将文本输出到控制台（io::stdout）
+ `println!`: 与 print! 类似，但输出结果追加一个换行符
+ `eprint!`：与 print! 类似，但将文本输出到标准错误（io::stderr）
+ `eprintln!`：与 eprint! 类似，但输出结果追加一个换行符

```rust
// {} 会被内容替换
println!("{} days", 31);
// 可以使用位置参数调整替换内容
println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");
// 命名参数
println!("{subject} {verb} {object}",
         object="the lazy dog",
         subject="the quick brown fox",
         verb="jumps over");
// 指定格式
println!("{:b}", 42); // 输出二进制：101010
```

::: tip
Rust 的格式化宏能够自动识别输出数据的类型，因此不需要像其他语言那样使用`%d、%s`等格式说明符
:::

对于所有的基本类型，Rust 都默认实现了 Display trait，用于格式化输出。然而，对于结构体，Rust 没有提供默认的 Display 实现。在这种情况下，可以使用`{:?}`格式说明符，它会使用 Debug trait 来打印结构体的调试表示

```rust
#[derive(Debug)]
struct Point {
  x: i32,
  y: i32,
}

fn main() {
  let point = Point { x: 0, y: 7 };
  println!("Point is: {:?}", point);
  // 输出：Point is: Point { x: 0, y: 7 }
}
```

## 文件操作

读取文件内容：

```rust
use std::fs;
use std::io::{self, Read};

// 读取整个文件内容到字符串
fn read_whole_file() -> io::Result<()> {
  let content = fs::read_to_string("example.txt")?;
  println!("File content: {}", content);
  Ok(())
}

// 读取文件内容到字节数组
fn read_file_to_bytes() -> io::Result<()> {
  let content = fs::read("example.txt")?;
  println!("File content (bytes): {:?}", content);
  Ok(())
}

// 使用 BufReader 逐行读取文件
fn read_lines() -> io::Result<()> {
  let file = fs::File::open("example.txt")?;
  let reader = io::BufReader::new(file);
  for line in reader.lines() {
    println!("{}", line?);
  }
  Ok(())
}
```

写入文件：

```rust
use std::fs::{self, File};
use std::io::{self, Write};

// 写入字符串到文件
fn write_string_to_file() -> io::Result<()> {
  fs::write("output.txt", "Hello, Rust!")?;
  Ok(())
}

// 使用 BufWriter 写入文件
fn write_with_bufwriter() -> io::Result<()> {
  let file = File::create("output.txt")?;
  let mut writer = io::BufWriter::new(file);
  writeln!(writer, "Line 1")?;
  writeln!(writer, "Line 2")?;
  writer.flush()?;
  Ok(())
}
```

文件和目录操作：

```rust
use std::fs;
use std::path::Path;

// 创建目录
fn create_directory() -> io::Result<()> {
  fs::create_dir("new_directory")?;
  Ok(())
}

// 递归创建目录
fn create_directories() -> io::Result<()> {
  fs::create_dir_all("path/to/new/directory")?;
  Ok(())
}

// 遍历目录
fn traverse_directory(dir: &Path) -> io::Result<()> {
  if dir.is_dir() {
    for entry in fs::read_dir(dir)? {
      let entry = entry?;
      let path = entry.path();
      if path.is_dir() {
        println!("Directory: {:?}", path);
        traverse_directory(&path)?;
      } else {
        println!("File: {:?}", path);
      }
    }
  }
  Ok(())
}

// 删除文件
fn remove_file() -> io::Result<()> {
  fs::remove_file("file_to_delete.txt")?;
  Ok(())
}

// 删除目录
fn remove_directory() -> io::Result<()> {
  fs::remove_dir("directory_to_delete")?;
  Ok(())
}

// 重命名文件或目录
fn rename_file_or_directory() -> io::Result<()> {
  fs::rename("old_name.txt", "new_name.txt")?;
  Ok(())
}

// 检查文件或目录是否存在
fn check_existence() {
  let path = Path::new("file_or_directory");
  if path.exists() {
    println!("Path exists");
  } else {
    println!("Path does not exist");
  }
}

// 获取文件元数据
fn get_file_metadata() -> io::Result<()> {
  let metadata = fs::metadata("example.txt")?;
  println!("File size: {} bytes", metadata.len());
  println!("File type: {:?}", metadata.file_type());
  println!("Last modified: {:?}", metadata.modified()?);
  Ok(())
}
```

临时文件和目录：

```rust
use std::fs::File;
use tempfile::{tempdir, NamedTempFile};

// 创建临时文件
fn create_temp_file() -> io::Result<()> {
  let mut file = NamedTempFile::new()?;
  writeln!(file, "Some content")?;
  println!("Temp file path: {:?}", file.path());
  Ok(())
}

// 创建临时目录
fn create_temp_directory() -> io::Result<()> {
  let dir = tempdir()?;
  println!("Temp directory path: {:?}", dir.path());
  // 目录会在 `dir` 离开作用域时自动删除
  Ok(())
}
```

## 网络编程

Rust 标准库提供了`std::net`模块，用于网络编程。这个模块包含了处理 TCP 和 UDP 通信的基本类型

### TCP 通信

创建一个简单的 TCP 服务器：

```rust
use std::net::{TcpListener, TcpStream};
use std::io::{Read, Write};

fn handle_client(mut stream: TcpStream) {
  let mut buffer = [0; 512];
  loop {
    let bytes_read = stream.read(&mut buffer).unwrap();
    if bytes_read == 0 {
        return;
    }
    stream.write(&buffer[..bytes_read]).unwrap();
    // write!(stream, "{}", message)?;  或者使用 write!
  }
}

fn main() -> std::io::Result<()> {
  let listener = TcpListener::bind("127.0.0.1:8080")?;
  println!("Server listening on port 8080");

  for stream in listener.incoming() {
    match stream {
      Ok(stream) => {
          std::thread::spawn(|| handle_client(stream));
      }
      Err(e) => {
          eprintln!("Failed to establish connection: {}", e);
      }
    }
  }
  Ok(())
}
```

创建一个简单的 TCP 客户端：

```rust
use std::net::TcpStream;
use std::io::{Read, Write};

fn main() -> std::io::Result<()> {
  let mut stream = TcpStream::connect("127.0.0.1:8080")?;
  stream.write(b"Hello, server!")?;
  let mut buffer = [0; 512];
  let bytes_read = stream.read(&mut buffer)?;
  println!("Received: {}", String::from_utf8_lossy(&buffer[..bytes_read]));
  Ok(())
}
```

对 TcpStream 的每次 write 调用都会导致一次 system 调用，`BufWriter<W>`可以提高对同一文件或网络套接字进行小而重复的写入调用的程序的速度

```rust
use std::io::{BufWriter, Write};

fn send_message(stream: &mut TcpStream, message: &str) -> std::io::Result<()> {
  let mut writer = BufWriter::new(stream);
  writer.write_all(message.as_bytes())?;
  writer.flush()?;
  Ok(())
}
```

### UDP 通信

创建一个简单的 UDP 服务端：

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
  // 创建 UDP 服务器
  let server_socket = UdpSocket::bind("127.0.0.1:8080")?;
  println!("UDP server listening on 127.0.0.1:8080");
  let mut buf = [0; 512];
  loop {
    let (amt, src) = server_socket.recv_from(&mut buf)?;
    println!("Received {} bytes from {}", amt, src);
    // 回复客户端
    server_socket.send_to(&buf[..amt], src)?;
  }
}
```

创建一个简单的 UDP 客户端：

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
  let socket = UdpSocket::bind("127.0.0.1:0")?;
  socket.connect("127.0.0.1:8080")?;
  socket.send(b"Hello, server!")?;
  let mut buf = [0; 512];
  let (amt, _) = socket.recv_from(&mut buf)?;
  println!("Received: {}", String::from_utf8_lossy(&buf[..amt]));
  Ok(())
}
```

### 异步网络编程

对于高性能的网络应用，Rust 生态系统提供了许多异步网络库，如 tokio。这里是一个使用 tokio 的简单 TCP 服务器示例

```rust
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let listener = TcpListener::bind("127.0.0.1:8080").await?;
  println!("Server listening on 127.0.0.1:8080");
  loop {
    let (mut socket, _) = listener.accept().await?;
    tokio::spawn(async move {
      let mut buf = [0; 1024];
      loop {
        let n = match socket.read(&mut buf).await {
          Ok(n) if n == 0 => return,
          Ok(n) => n,
          Err(e) => {
            eprintln!("Failed to read from socket: {}", e);
            return;
          }
        };
        if let Err(e) = socket.write_all(&buf[0..n]).await {
          eprintln!("Failed to write to socket: {}", e);
          return;
        }
      }
    });
  }
}
```

### HTTP

如果不使用第三方库，可以使用 Rust 标准库来创建一个基本的 HTTP 服务器。这种方法更加底层，需要手动解析 HTTP 请求和构造 HTTP 响应。虽然这种方法在实际应用中不够实用，但它可以帮助我们理解 HTTP 服务器的工作原理

```rust
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

fn handle_client(mut stream: TcpStream) {
  let mut buffer = [0; 1024];
  stream.read(&mut buffer).unwrap();
  let response = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n<html><body>Hello from Rust!</body></html>\r\n";
  stream.write(response.as_bytes()).unwrap();
  stream.flush().unwrap();
}

fn main() -> std::io::Result<()> {
  let listener = TcpListener::bind("127.0.0.1:3000")?;
  println!("Server listening on port http://127.0.0.1:3000");
  for stream in listener.incoming() {
    match stream {
      Ok(stream) => {
        thread::spawn(|| {
          handle_client(stream);
        });
      }
      Err(e) => {
        eprintln!("Connection failed: {}", e);
      }
    }
  }
  Ok(())
}
```

HTTP 响应由三个主要部分组成：

+ 状态行
+ 头部（Headers）
+ 空行
+ 消息体（Body）

浏览器首先读取状态行，了解请求是否成功（200 表示成功）。然后解析头部，了解如何处理接下来的内容。遇到空行后，浏览器知道头部结束，接下来是消息体。根据 Content-Type，浏览器知道应该将消息体作为 HTML 来渲染

```plain
HTTP/1.1 200 OK\r\n
Content-Type: text/html; charset=UTF-8\r\n
\r\n
<html><body>Hello from Rust!</body></html>\r\n
```
