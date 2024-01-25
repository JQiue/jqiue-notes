---
title: 实战
category: 编程语言
tag: [Rust]
article: false
---

## axum

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

### response Image'

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

## 参考资料

+ <https://github.com/joelparkerhenderson/demo-rust-axum?tab=readme-ov-file>
