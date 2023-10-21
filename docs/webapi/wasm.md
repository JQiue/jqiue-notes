---
title: WebAssembly
article: false
---

能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑

当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适：

1. 计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的计算性能。这包括科学计算、图像处理、物理模拟等领域
2. 游戏开发： 在游戏开发中，性能要求较高。使用 WebAssembly 可以将底层游戏引擎或关键算法部分编写为高效的原生代码，以获得更好的游戏性能
3. 虚拟化和模拟： 在虚拟化、模拟和仿真领域，WebAssembly 可以用于实现更快速和高性能的虚拟机、模拟器或仿真器，以实现更高的效率和更真实的体验
4. 多平台应用： WebAssembly 是一种平台无关的技术，可以在不同的平台和设备上运行，包括浏览器、移动设备和服务器。使用 WebAssembly 可以实现跨平台的应用程序和库，以提供一致的性能和功能
5. 重构现有代码库： 如果你有一个现有的代码库，使用 JavaScript 运行时可能会导致性能瓶颈。将关键部分的代码重写为 WebAssembly，可以在不重写整个应用程序的情况下提高性能

需要注意的是，WebAssembly 不适用于所有情况。对于简单的计算任务、DOM 操作、事件处理等，直接使用 JavaScript 可能更加方便和高效

在实际应用中，可以通过使用 WebAssembly 和 JavaScript 的混合编程，根据具体需求和任务的特点，选择合适的工具和技术来实现最佳性能和开发效率的平衡

## 使用 Rust

首先需要基本的 Rust 环境，创建 Rust 项目：`cargo new wasm-example`

编辑 Cargo.toml

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "*"
```

编写 Rust 代码

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci_recursive(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)
}
```

安装构建 Wasm 的工具：`cargo install wasm-pack`

开始构建：`wasm-pack build`，此时会生成一个标准的 NPM 模块

### 在前端项目中引用

加载 Wasm 文件必须将该文件放在服务器中，前端项目通过请求获取：

```js
fetch('http://localhost:8080/wasm_example.wasm')
  .then(res => res.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(res => {
    const { fibonacci_recursive } = res.instance.exports;
    fibonacci_recursive(10)
  })
```
