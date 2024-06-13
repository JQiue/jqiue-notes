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

ECS 像一个数据库：

+ 行是实体
+ 列是实体拥有的组件

| ID      | POSITION              | MODEL     |
| ------- | --------------------- | --------- |
| Entity1 | Position {x: 1, y: 1} | Spaceship |
| Entity2 | Position {x: 1, y: 1} | Cat       |

```rust
App::new()
  .add_plugins(DefaultPlugins) // 引入默认插件，会提供渲染一个窗口
  .run()
```

定义组件

```rust
#[derive(Component, Debug)]
struct Position {
  x: f32,
  y: f32,
}

#[derive(Component, Debug)]
struct Velocity {
  x: f32,
  y: f32,
}
```

定义系统

```rust
// 用 Commands 的 spawn 生成一个绑定组件的实体
fn spawn_spaceship(mut commands: Commands) {
  commands.spawn((Position { x: 0.0, y: 0.0 }, Velocity { x: 0.0, y: 0.0 }));
}

// 用 Query 来访问组件
fn update_position(mut query: Query<(&Velocity, &mut Position)>) {
  for (velocity, mut postion) in query.iter_mut() {
    postion.x += velocity.x;
    postion.y += velocity.y;
  }
}

fn print_position(query: Query<(Entity, &Position)>) {
  for (entity, position) in query.iter() {
    info!("Entity {:?} is at postion {:?}", entity, position);
  }
}

fn main() {
  App::new()
  .add_plugins(DefaultPlugins) // 引入默认插件，会提供渲染一个窗口
  .add_systems(Startup, spawn_spaceship) // 启动时运行一次
  .add_systems(Update, print_position) // 每一帧运行一次
  .run()
}
```

## 插件

bevy 本身都是作为修改程序的插件集合

```rust
pub struct HelloPlugin;

impl Plugin for HelloPlugin {
    fn build(&self, app: &mut App) {
        // add things to your app here
    }
}

fn main() {
    App::new()
        .add_plugins((DefaultPlugins, HelloPlugin))
        .add_systems(Startup, add_people)
        .add_systems(Update, (hello_world, (update_people, greet_people).chain()))
        .run();
}
````

可以在自己实现的插件中做相同的事情

```rust
impl Plugin for HelloPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, add_people)
            .add_systems(Update, (update_people, greet_people).chain());
    }
}

fn main() {
    App::new().add_plugins((DefaultPlugins, HelloPlugin)).run();
}
```

## Resource

Resource 表示在 bevy 中全局唯一存在的数据，比如：

+ 时间
+ 渲染器
+ 声音，纹理，网格

```rust

#[derive(Resource)]
struct GreetTimer(Timer);

// time 提供上次更新以来经过的时间，timer 用于跟踪所经过的时间
fn greet_people(query: Query<&Name, With<Person>>, time: Res<Time>, mut timer: ResMut<GreetTimer>) {
  // 使用上次经过的时间来更新 timer
  // 
    if timer.0.tick(time.delta()).just_finished() {
        for name in &query {
            println!("hello {}!", name.0);
        }
    }
}
```
