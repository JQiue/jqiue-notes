---
title: 实战
category: 编程语言
tag: [Rust]
article: false
order: 18
---

## 发布 crate

步骤：

1. 登录 <https://crates.io> 获取 API Token
2. 使用`cargo login <token>`
3. 创建`cargo new --lib <name>`
4. 填写必须的清单
5. 发布`cargo publish --registry crates-io`

```toml
[package]
name = ""
description = ""
version = "0.1.0"
edition = "2021"
authors = [""]
license = ""
readme = "README.md"
```

## Axum

+ axum: web framework that focuses on ergonomics and modularity.
+ tower: library for building robust clients and servers.
+ hyper: fast and safe HTTP library for the Rust language.
+ tokio: platform for writing asynchronous I/O backed applications.
+ Serde: serialization/deserialization framework.

```toml
[dependencies]

axum = "~0.7.0"
tower = "~0.4.13"
hyper = { version = "~1.0.1", features = ["full"] }
tokio = { version = "~1.34.0", features = ["full"] }
serde = { version = "~1.0.193", features = ["derive"] }
serde_json = { version = "~1.0.108" }
```

```rust
#[tokio::main]
async fn main() {
  let router = Router::new().route("/", get(|| async { "hello world" }));

  match tokio::net::TcpListener::bind("0.0.0.0:3000").await {
    Ok(listener) => {
      println!("Server run at http://localhost:3000");
      axum::serve(listener, router).await.unwrap();
    }
    Err(err) => panic!("{err}"),
  }
}
```

### 处理器函数 - handle function

```rust
async fn hello() -> String {
  "hello world".into()
}

#[tokio::main]
async fn main() {
  let router = Router::new().route("/", get(hello));
  // ..
}
```

在 handle 中，只要实现了`IntoResponse`，就可以作为路由的处理函数，以下类型自动实现了`IntoResponse`，更多详见该 trait 的 impl：

+ `()`：返回空响应
+ `String`和`&'static str`：返回文本响应
+ `Result<T, E>`：返回结果响应，其中 T 和 E 都要实现了`IntoResponse`

axum 也提供了一些常用的响应类型，是对响应体的包装：

+ `axum::response::StatusCode`：返回状态码响应
+ `axum::response::Html`：返回 HTML 响应
+ `axum::response::Json`：返回 JSON 响应
+ `axum::response::Redirect`：返回重定向响应
+ `axum::response::Bytes`：返回字节响应
+ `axum::response::File`：返回文件响应

`(StatusCode, R)`返回状态码和响应体，其中 R 要实现了`IntoResponse`

如果需要完全控制响应，则可以使`axum::response::Response`，它是一个底层的响应类型，可以直接构建 HTTP 响应

```rust
async fn hello() -> String {
  axum::response::Response::builder()
    .status(200)
    .header("Content-Type", "text/plain")
    .body("hello".to_string())
    .unwrap()
}
```

### 路由回退 - fallback

没有命中路由时，可以使用 fallback 来处理未匹配的请求

```rust
async fn fallback(uri: axum::http::Uri) -> impl IntoResponse {
  (
    axum::http::StatusCode::NOT_FOUND,
    format!("No route {}", uri),
  )
}

let router = Router::new().fallback(fallback).route("/", get(hello));
```

### response Image

```toml
[dependencies]
base64 = "0.21.5"
http = "1.0.0"
```

```rust
use axum::{
  response::{AppendHeaders, IntoResponse},
};

use http::header;
use base64::{engine, Engine};

async fn get_image() -> impl IntoResponse {
  let png = concat!(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB",
    "CAYAAAAfFcSJAAAADUlEQVR42mPk+89Q",
    "DwADvgGOSHzRgAAAAABJRU5ErkJggg=="
  );
  (
    AppendHeaders([(header::CONTENT_TYPE, "image/png")]),
    engine::general_purpose::STANDARD.decode(png).unwrap(),
  )
}
```

### 多个 HTTP 动词

axum 路由可以使用多个 HTTP 动词

```rust
async fn get_foo() -> String {
   "GET foo".to_string()
}

async fn put_foo() -> String {
   "PUT foo".to_string()
}

async fn patch_foo() -> String {
   "PATCH foo".to_string()
}

async fn post_foo() -> String {
   "POST foo".to_string()
}

async fn delete_foo() -> String {
   "DELETE foo".to_string()
}

let app = axum::Router::new()
    .route("/foo",
        get(get_foo)
        .put(put_foo)
        .patch(patch_foo)
        .post(post_foo)
        .delete(delete_foo),
    )
```

### 提取器 - Extractors

Axum 提取器用于从请求中提取数据并将其传递给处理函数

```rust
use axum::{extract};
use serde_json::{json, Value};


#[tokio::main]
async fn main() {
  let router = Router::new()
    .route("/get_id/{id}", post(health_check))
    .fallback(fallback);
}

// 提取 path
async fn get_id_with_path(extract::Path(id): extract::Path<String>) -> String {
  format!("get id: {id}")
}

// 提取 query
async fn get_id_with_query(
  extract::Query(params): extract::Query<HashMap<String, String>>,
) -> String {
  format!("get items with query params: {params:?}")
}

// 提取 json payload，响应头类型必须是 application/json
async fn put_json(extract::Json(data): extract::Json<Value>) -> String {
  format!("put JSON data: {data}")
}

// 提取 uri 完整的请求 URI
async fn uri(uri: axum::http::Uri) -> String {
  format!("The URI is: {:?}", uri)
}
```

由于提取器从左向右执行，所以不消费请求主体的提取器应该放在消耗主体的提取器之前，否则会编译失败，比如`extract::Path`应该放在`extract::Json`之前，这也意味着不能同时使用多个消耗请求主体的提取器

### 共享状态

在 Axum 中有三种方式可以在路由中共享状态：

+ App state 通过`Router::with_state`方法将状态传递给路由，常用于 DB 连接，配置等
+ Request extensions 可以在中间件中插入数据，更加灵活，但是缺点是提取不存在的扩展时会得到运行时错误
+ Task-local（tokio::task_local!）与 Tokio 任务绑定的局部变量，跨 await 保持，可用于在同一异步任务内传递上下文（例如 tracing span id），不适合跨线程的共享

```rust
#[derive(Debug)]
struct AppState {
    // ...
}

let app_state = Arc::new(AppState { /* ... */ });
let router = Router::new()
    .route("/foo", get(foo))
    .route("/bar", get(bar))
    .with_state(app_state);

async fn foo(State(state): State<Arc<AppState>>) -> impl IntoResponse {
  // ..
}

async fn bar(State(state): State<Arc<AppState>>) -> impl IntoResponse {
  // ..
}
```

request extensions 是一个以类型为键的容器，每种具体的类型在 extensions 中只能存储一个值，插入值时，键是值的静态类型，相同类型会覆盖先前值；要存多个不同的值，需用不同的类型（newtype、结构体或元组）

```rust
use std::sync::Arc;

struct ExtState {
  a: String,
  b: String,
}

let shared_state = Arc::new(AppState { /* ... */ });
let app = Router::new()
    .route("/", get(handler))
    .layer(middleware::from_fn(add_request_ext));

async fn add_request_ext(mut req: Request, next: Next) -> Response {
    let id = format!(
        "{}",
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_nanos()
    );
    let ext_state = ExtState {
        a: "a".to_owned(),
        b: "b".to_owned(),
    };
    req.extensions_mut().insert(Arc::new(state));
    req.extensions_mut().insert(id);
    next.run(req).await
}

async fn handler(
    Extension(req_id): Extension<String>
    Extension(ext_state): Extension<Arc<ExtState>>
) {
    // ...
}
```

### 中间件 - middleware

```toml
tower-http = { version = "0.5.0", features = ["fs", "cors"] }
```

```rust
use http::Method;
use tower_http::{
  cors::{Any, CorsLayer}
};

let cors = CorsLayer::new()
  .allow_methods([Method::GET, Method::POST])
  .allow_origin(Any);

Router::new()
  .route("/", get(|| async { "hello world" }))
  .layer(cors);
```

## 构建多个二进制文件

`src/main.rs`是一个入口点，Rust 允许多个入口点构建不同的二进制文件

```toml
[[bin]]
# src/bin/one.rs or src/bin/one/main.rs
name = "one"
[[bin]]
# src/bin/two.rs or src/bin/two/main.rs
name = "two"
```

当不遵循约定时需要指定路径

```toml
[[bin]]
name = "app"
path = "src/app.rs"
```

## 爬虫

+ 请求库 - reqwest
+ 解析库 - scraper

```rust
use scraper::{Html, Selector};

fn main() {
  let html = r#"
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Hello, World</title>
    </head>
    <body>
      <h1 class="foor">Hello, <i>World</i></h1>
    </body>
    </html>
"#;
  let document = Html::parse_document(html);
  let selector = Selector::parse("title").unwrap();
  for element in document.select(&selector) {
    println!("{:?}", element.text().collect::<Vec<_>>());
  }
}
```

## Actix Web

```toml
[dependencies]
actix-web = "4.5.1"
actix-cors = "0.6.5"
```

```rust
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;

async fn index() -> impl Responder {
  HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  let port = 3000;
  println!("Server running at http://localhost:{port}");
  HttpServer::new(|| {
    // 配置 CORS
    let cors = Cors::permissive();
    App::new()
      .wrap(cors)
      .route("/", web::get().to(index))
  })
  .bind(("localhost", port))?
  .run()
  .await
}
```

### App state

```rust
#[derive(Debug, Clone)]
struct AppState {
  foo: string,
}

let foo = "foo".to_string();
let state = AppState { foo };

HttpServer::new(move || {
    App::new()
      .app_data(web::Data::new(state.clone()))
  })
  .bind(server_url)?
  .workers(workers)
  .run()
  .await;
```

### macro

```rust
#[get("/")]
async fn index() -> impl Responder {
  HttpResponse::Ok().body("Hello world!")
}

App::new().wrap(cors).service(index)
```

### multiple HTTP verbs

```rust
async fn index() -> impl Responder {
  HttpResponse::Ok().body("Hello world!")
}

App::new().wrap(cors).service(
  resource("/")
    .route(web::get().to(index))   // GET /
    .route(web::post().to(index)), // POST /
)
```

### response HTML

```rust
async fn get_html() -> impl Responder {
  HttpResponse::Ok()
    .content_type(ContentType::html())
    .body("<h1>Hello World</h1>")
}
```

response HTML file

```rust
async fn get_html() -> impl Responder {
  HttpResponse::Ok()
    .content_type(ContentType::html())
    .body(include_str!("./index.html"))
}
```

### scope

```rust
async fn foo() -> impl Responder {
  HttpResponse::Ok().body("foo")
}

async fn bar() -> impl Responder {
  HttpResponse::Ok().body("bar")
}

App::new().wrap(cors).service(
  web::scope("/v1/api")
    .route("/foo", web::get().to(foo))
    .route("/bar", web::get().to(bar)),
)
```

### response StatusCode

```rust
async fn get_status_code() -> impl Responder {
  HttpResponse::NotFound()
}
```

response StatusCode and content

```rust
async fn get_status_code() -> impl Responder {
  HttpResponse::NotFound().body("不见了")
}
```

### response Image

```rust
async fn get_image() -> impl Responder {
  let png = concat!(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB",
    "CAYAAAAfFcSJAAAADUlEQVR42mPk+89Q",
    "DwADvgGOSHzRgAAAAABJRU5ErkJggg=="
  );
  HttpResponse::Ok()
    .content_type(ContentType::png())
    .body(engine::general_purpose::STANDARD.decode(png).unwrap())
}
```

### response JSON

```rust
async fn get_json() -> impl Responder {
  HttpResponse::Ok().json(json!({"a":"b"}))
}
```

### Extractors

### 中间件

```rust
App::new()
  .wrap_fn(|req, srv| {
    if let Some(host_header) = req.headers().get(USER_AGENT) {
      if let Ok(host_value) = host_header.to_str() {
        req.extensions_mut().insert(host_value.to_string());
      }
    }
    let fut = srv.call(req);
    async { fut.await }
  })
  .wrap(SecureDomians::new(secure_domians.clone()))
  .wrap(middleware::Logger::default())
  .wrap(Cors::permissive())
  .app_data(web::Data::new(state.clone()))
  .configure(config_app)
```

## Anyhow

`anyhow`用于简化错误处理和提供更好的错误报告。这个库适合用于应用程序，而不是用于创建库，因为它提供了一个非结构化的，方便使用的错误类型

Rust 的标准库提供了 Result 和 Option 类型用于错误处理，但它们通常需要指定错误类型。与此不同，anyhow::Result 允许更简单地创建和处理错误

任何返回 Result 的函数都可以轻松地改为返回 anyhow::Result

```rust
fn do_something() -> Result<(), std::io::Error> {
    //...
    Ok(())
}

// 使用 anyhow::Result
fn do_something_anyhow() -> anyhow::Result<()> {
    //...
    Ok(())
}
```

## SeaORM

选择数据库和运行时

```toml
[dependencies]
sea-orm = { version = "1.1.4", features = [
  "sqlx-mysql",
  "runtime-tokio-rustls",
  "macros",
] }
```

安装`sea-orm-cli`用于迁移数据或生成实体

```sh
cargo install sea-orm-cli
```

### 迁移

将模型同步到数据库中

```sh
sea migration init      Initialize migration directory
sea migration generate  Generate a new, empty migration
sea migration fresh     Drop all tables from the database, then reapply all migrations
sea migration refresh   Rollback all applied migrations, then reapply all migrations
sea migration reset     Rollback all applied migrations
sea migration status    Check the status of all migrations
sea migration up        Apply pending migrations
sea migration down      Rollback applied migrations
sea migration help      Print this message or the help of the given subcommand(s)
```

Sea ORM Migration 系统会记录已执行过的迁移文件，如果直接修改已执行过的迁移文件，这些更改不会自动应用。要更新架构，有如下选择：

1. 生成新的迁移文件，`sea migrate generate <filename>`
2. 如果是开发环境，可直接`sea migarte fresh`重新执行所有的迁移

### 从现有数据库中生成实体

需要提供`DATABASE_URL`，默认会读取`.env`

```plain
DATABASE_URL=mysql://username:password@host/database
```

使用下面生成实体，实体是进行 CRUD 关键

```sh
sea-orm-cli generate entity -o src/entitys
```

### Select

定义实体后就可以进行查询了

根据主键查询

```rust
// 查询主键为 1 的一条记录
Entity::find_by_id(1).one(db).await;
// 查询复合主键为 1,2 的一条记录
Entity::find_by_id(1, 2).one(db).await;
```

查询所有数据

```rust
Entity::find().all(db).await;
```

条件查询

```rust
// WHERE id BETWEEN 2 AND 3
Entity::find().filter(Column::Id.between(2, 3)).all(db).await;
// WHERE id NOT BETWEEN 2 AND 3
Entity::find().filter(Column::Id.not_between(2, 3)).all(db).await;
// WHERE Name LIKE foo
Entity::find().filter(Column::Name.like("foo")).all(db).await;
// WHERE Name NOT LIKE foo
Entity::find().filter(Column::Name.not_like("foo")).all(db).await;
// name = foo%
Entity::find().filter(Column::Name.starts_with("foo")).all(db).await;
// name = %foo
Entity::find().filter(Column::Name.ends_with("foo")).all(db).await;
// name = %foo%
Entity::find().filter(Column::Name.contains("foo")).all(db).await;
```

### Insert

插入一个 Model

```rust
let model = ActiveModel {
    name: Set("foo".to_owned()),
    ..Default::default()
};

Entity::insert(model).exec(&db).await?;
```

插入多个 Model

```rust
let foo = ActiveModel {
    name: Set("foo".to_owned()),
    ..Default::default()
};
let bar = ActiveModel {
    name: Set("bar".to_owned()),
    ..Default::default()
};

Entity::insert_many([foo, bar]).exec(&db).await?;
```

### Update

更新一个 Model

```rust
let model = ActiveModel {
    id: Set(1),
    name: Set("Orange".to_owned()),
    ..Default::default()
};

Entity::update(model.clone())
  .filter(fruit::Column::Name.contains("foo"))
  .exec(&db)
  .await?,
```

更新多个 Model

```rust
Entity::update_many()
    .col_expr(Column::Id, Expr::value(Value::Int(None)))
    .filter(fruit::Column::Name.contains("foo"))
    .exec(&db)
    .await?;
```

### Delete

删除一个 Model

```rust
let model = ActiveModel {
  id: Set(3),
  ..Default::default()
};

// WHERE "id" = $1",
Entity::delete(model).exec(&db).await?;
```

根据主键删除 Model

```rust
// WHERE "id" = $1",
Entity::delete_by_id(1).exec(&db).await?;
```

删除多个 Model

```rust
Entity::delete_many()
    .filter(Column::Name.contains("foo"))
    .exec(&db)
    .await?;
```

## 静态链接

Rust 编译器默认情况下会采用动态链接的方式来链接 C/C++ 标准库：

+ Windows：Rust 默认使用 MSVCRT（Microsoft Visual C++ Runtime）作为 C 标准库
+ Linux：Rust 默认使用 glibc（GNU C Library）作为 C 标准库

优点是：更小的可执行体积文件，易于更新，更好的系统集成，而缺点则是：依赖性更强，运行时性能略有损失

想避免这些缺点，可以选择静态链接

在 Windows 为`.cargo/config.toml`添加以下内容开启静态链接

```toml
[target.x86_64-pc-windows-msvc]
rustflags = ["-C", "target-feature=+crt-static"]
```

在 Linux 中则添加以下内容使用 MUSL 作为静态链接

```toml
[target.x86_64-unknown-linux-musl]
rustflags = [
  "-C", "target-feature=+crt-static",
  "-C", "link-self-contained=yes",
]
```

## OpenDAL

## Rouille

Rouille 是一个微型 web 同步I/O框架库，但是它的性能也是足够的

```toml
[dependencies]
rouille = "3.6.2"
```

```rust
use rouille::Request;
use rouille::Response;

rouille::start_server("0.0.0.0:80", move |request| {
  Response::text("hello world")
});
```

### router

```rust
pub fn handle_routing(request: &Request) -> Response {
  router!(request,
    (GET) (/) => {
      Response::text("hello world")
    },
    (GET) (/get_html) => {
      Response::html("html")
    },
    (GET)(/user) => {
      if let Ok(user) = store.get_users() {
        Response::json(&ResponseJson{ data: user, code: 1})
      } else {
        Response::json(&ResponseJson::<Vec<i32>>{ data: vec![], code: 0})
      }
    },
    (POST) (/user) => {
      let body = try_or_400!(post_input!(request, {
        id: String,
        display_name: String
      }));
      if let Ok(_) = store.create_user(body.id, body.display_name) {
        Response::text("user created successfully!")
      } else {
        Response::text("user created failed!")
      }
    },
    _ => log(request, io::stdout(), || Response::empty_404())
  )
}
```

### middleware

```rust
use std::io;

use rouille::{log, Response};

pub fn log_middleware(request: &rouille::Request, response: Response) -> Response {
  log(request, io::stdout(), || response)
}

pub fn cors_middleware(request: &rouille::Request, response: Response) -> Response {
  let response = response
    .with_additional_header("Access-Control-Allow-Origin", "*")
    .with_additional_header("Access-Control-Allow-Methods", "*")
    .with_additional_header("Access-Control-Allow-Headers", "*");
  if request.method() == "OPTIONS" {
    Response::empty_204()
      .with_additional_header("Access-Control-Allow-Origin", "*")
      .with_additional_header("Access-Control-Allow-Methods", "*")
      .with_additional_header("Access-Control-Allow-Headers", "*")
  } else {
    response
  }
}
```

```rust
start_server("localhost:3000", move |request| {
  log_middleware(request, cors_middleware(request, handle_routing(request)))
});
```

## Prisma Client Rust

Prisma Client Rust 是一个自动生成的查询构建器，它利用 Prisma 生态系统提供简单且完全类型安全的数据库访问

```rust
prisma-client-rust = { git = "https://github.com/Brendonovich/prisma-client-rust", tag = "0.6.11", default-features = false, features = [
  "sqlite",
] }
```

## 参考资料

+ <https://github.com/joelparkerhenderson/demo-rust-axum?tab=readme-ov-file>
