---
title: Bevy
article: false
---

bevy 是一个用 Rust 制作的游戏引擎

## 安装 && 启动

```sh
cargo add bevy
```

```rust
use bevy::prelude::*;

fn main() {
  App::new().run()
}
```

## ECS

ECS 将数据和行为的关注点分为不同的部分：

+ 实体 - 是指向组件的唯一 ID，本质是将组件连接在一起构成游戏中的单个对象
+ 组件 - 是纯粹的数据结构，比如位置，速度
+ 系统 - 是对具有特定组件的实体进行操作的函数

ECS 使其更容易维护以及充分利用多核处理器，ECS 中的系统只要不存在冲突的数据依赖性就可以并行运行，从而提高游戏性能
