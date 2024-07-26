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

# Web framework that focuses on ergonomics and modularity.
axum = "~0.7.0"
# Modular reusable components for building robust clients and servers.
tower = "~0.4.13"
# A fast and correct HTTP library.
hyper = { version = "~1.0.1", features = ["full"] } 
# Event-driven, non-blocking I/O platform.
tokio = { version = "~1.34.0", features = ["full"] }
# A serialization/deserialization framework.
serde = { version = "~1.0.193", features = ["derive"] }
# Serde serializion/deserialization of JSON data.
serde_json = { version = "~1.0.108" }
```

### HelloWorld

```rust
#[tokio::main]
async fn main() {
    // build our application with a single route
  let router = Router::new().route("/", get(|| async { "hello world" }));

  // run our app with hyper, listening globally on port 3000
  match tokio::net::TcpListener::bind("0.0.0.0:3000").await {
    Ok(listener) => {
      println!("Server run at http://localhost:3000");
      axum::serve(listener, router).await.unwrap();
    }
    Err(err) => panic!("{err}"),
  }
}
```

### handle function

```rust
async fn hello() -> String {
  "hello world".into()
}

let router = Router::new().route("/", get(hello));
```

### router fallback

```rust
async fn fallback(uri: axum::http::Uri) -> impl axum::response::IntoResponse {
  (
    axum::http::StatusCode::NOT_FOUND,
    format!("No route {}", uri),
  )
}

let router = Router::new().fallback(fallback).route("/", get(hello));
```

### response HTML

response text

```rust
use axum::{response::Html};

async fn get_html() -> Html<String> {
  Html("<h1>hello world</h1>".to_string())
}
```

response file

```rust
async fn get_html() -> Html<String> {
  Html(include_str!("./index.html").to_string())
}
```

### response StatusCode

```rust
use axum::{http::StatusCode};

async fn status_code() -> http::StatusCode {
  StatusCode::NOT_FOUND
}
```

response StatusCode and content

```rust
async fn status_code() -> (http::StatusCode, String) {
  (StatusCode::NOT_FOUND, "不见了".to_string())
}
```

### response Uri

```rust
use axum::{http::{Uri}};

async fn uri(uri: Uri) -> String {
  format!("The URI is: {:?}", uri)
}
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

### multiple HTTP verbs

axum routes can use HTTP verbs, including GET, PUT, PATCH, POST, DELETE.

```rust
/// axum handler for "GET /foo" which returns a string message.
/// This shows our naming convention for HTTP GET handlers.
async fn get_foo() -> String {
   "GET foo".to_string()
}

/// axum handler for "PUT /foo" which returns a string message.
/// This shows our naming convention for HTTP PUT handlers.
async fn put_foo() -> String {
   "PUT foo".to_string()
}

/// axum handler for "PATCH /foo" which returns a string message.
/// This shows our naming convention for HTTP PATCH handlers.
async fn patch_foo() -> String {
   "PATCH foo".to_string()
}

/// axum handler for "POST /foo" which returns a string message.
/// This shows our naming convention for HTTP POST handlers.
async fn post_foo() -> String {
   "POST foo".to_string()
}

/// axum handler for "DELETE /foo" which returns a string message.
/// This shows our naming convention for HTTP DELETE handlers.
async fn delete_foo() -> String {
   "DELETE foo".to_string()
}

let app = axum::Router::new()
    …
    .route("/foo",
        get(get_foo)
        .put(put_foo)
        .patch(patch_foo)
        .post(post_foo)
        .delete(delete_foo),
    )
```

### Extractors

An axum "extractor" is how you pick apart the incoming request in order to get any parts that your handler needs.

This section shows how to:

+ Extract path parameters
+ Extract query parameters
+ Extract a JSON payload
+ Respond with a JSON payload

```rust
use axum::{extract};
use serde_json::{json, Value};

// Extract path parameters
async fn get_id_with_path(extract::Path(id): extract::Path<String>) -> String {
  format!("get id: {id}")
}

// Extract query parameters
async fn get_id_with_query(
  extract::Query(params): extract::Query<HashMap<String, String>>,
) -> String {
  format!("get items with query params: {params:?}")
}

async fn get_json() -> extract::Json<Value> {
  json!({
  "code": 200,
  "success": true,
  "payload": {
      "features": [
          "serde",
          "json"
      ],
      "homepage": null
  }})
  .into()
}

async fn put_json(extract::Json(data): extract::Json<Value>) -> String {
  format!("put JSON data: {data}")
}
```

### CORS

```toml
# 启用 cors
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

### use SeaORM

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

sea-orm = { version = "0.12", features = [
  "sqlx-mysql",
  "runtime-tokio-rustls",
  "macros",
] }
```

安装`sea-orm-cli`用于迁移数据或生成实体

```sh
cargo install sea-orm-cli
```

### 从现有数据库中生成实体

需要提供`.env`

```plain
DATABASE_URL=mysql://username:password@host/database
```

使用下面命令迁移

```sh
sea-orm-cli generate entity -o src/entitys
```

实体是进行 CRUD 关键

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

插入一个 model

```rust
let model = ActiveModel {
    name: Set("foo".to_owned()),
    ..Default::default()
};

Entity::insert(model).exec(&db).await?;
```

插入多个 model

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

更新一个 model

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

更新多个 model

```rust
Entity::update_many()
    .col_expr(Column::Id, Expr::value(Value::Int(None)))
    .filter(fruit::Column::Name.contains("foo"))
    .exec(&db)
    .await?;
```

### Delete

删除一个 model

```rust
let model = ActiveModel {
  id: Set(3),
  ..Default::default()
};

// WHERE "id" = $1",
Entity::delete(model).exec(&db).await?;
```

根据主键删除 model

```rust
// WHERE "id" = $1",
Entity::delete_by_id(1).exec(&db).await?;
```

删除多个 model

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

## Prisma Client Rust

Prisma Client Rust 是一个自动生成的查询构建器，它利用 Prisma 生态系统提供简单且完全类型安全的数据库访问

## 参考资料

+ <https://github.com/joelparkerhenderson/demo-rust-axum?tab=readme-ov-file>
