---
title: 库
category: 编程语言
tag: [Rust]
article: false
order: 16
---

## Rand

+ [rand](https://github.com/rust-random/rand) - 随机数生成器

## Serde

Serde 是一个处理数据结构的序列化和反序列化的框架，serde_json 则是用来处理 JSON 的库

可以快速地使用`!json`构建一个 JSON 对象

```rust
use serde_json::json;

fn main() {
  let p = !json({
    "name": "JQiue",
    "age": 24,
    "hobbies": ["sleep", "harmonica"]
  })
  println!("{}", p["hobbies"][0]);
}
```

使用`from_str`从一个字符串中解析成 JSON 对象

```rust
fn main() {
  let str = r#"{
      "name": "Ush2a",
      "age":25
  }"#;
  let v: Value = serde_json::from_str(str).unwrap();
}
```

::: tip 如果访问了不存在的属性咋办？

serde_json 对未类型化的 JSON 提供了一个递归枚举用来表示 serde_json::Value

```rust
enum Value {
  Null,
  Bool(bool),
  Number(Number),
  String(String),
  Array(Vec<Value>),
  Object(Map<String, Value>),
}
```

:::

serde_json 也能将 JSON 映射成 rust 数据结构，这需要提前定义结构体

```rust
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
struct Mobile {
  model: String,
  processor: String,
  memory: u8,
  // 指定默认值
  #[serde(default)]
  display: Display,
  storage: u32,
  battery: u32,
  ttm: String,
  price: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Display {
  dpi: u32,
  hz: u32,
  technology: String,
}

// 实现默认值
impl Default for Display {
  fn default() -> Self {
    Display {
      dpi: 0,
      hz: 0,
      technology: "".to_string(),
    }
  }
}

fn main() {
  let mut mobiles: Vec<Mobile> = Vec::new();

  let mobiles_json_str = fs::read_to_string("mobiles.json").unwrap();

  mobiles = serde_json::from_str(&mobiles_json_str).unwrap();
}
```

## rust-embed

rust-embed 用于在发布期间在编译时将文件加载到 Rust 二进制文件中，并在开发期间从 fs 加载文件

```rust
#[derive(RustEmbed)]
#[folder = "examples/public/"]
#[prefix = "prefix/"]
struct Asset;

fn main() {
  let index_html = Asset::get("prefix/index.html").unwrap();
  println!("{:?}", std::str::from_utf8(index_html.data.as_ref()));

  for file in Asset::iter() {
    println!("{}", file.as_ref());
  }
}
```

## lettre

lettre 是一个功能强大的邮件库

## reqwest

比较知名的 HTTP 请求库

最简单的 GET 请求

```rust
let body = reqwest::get("https://www.rust-lang.org")
    .await?
    .text()
    .await?;
```

发送 POST 请求

```rust
use reqwest::Client;

let client = Client::new();

let res = client.post("http://httpbin.org/post")
  .body("the exact body that is sent")
  .send()
  .await?;
```

发送 JSON 必须开启`json`features

```rust
let mut map = HashMap::new();
map.insert("username", "admin");
map.insert("password", "admin");
let data = client
  .post(url + "/user/login")
  .json(&map)
  .send()
  .await?
  .text()
  .await?;
```

到目前为止，都是基于异步的请求，reqwest 提供了堵塞的请求客户端，必须开启`blocking`features

```rust
use reqwest::blocking;

let data = blocking::get(format!("{url}/ping"))?.text()?;
println!("{data}");
```

## jsonwebtoken

用于生成和验证 jwt 的库

```toml
[dependencies]
jsonwebtoken = "9.2.0"
serde = { version = "1.0.197", features = ["derive"] }
serde_json = "1.0"
time = "0.3.34"
```

```rust
use jsonwebtoken::errors::{Error, ErrorKind};
use jsonwebtoken::{
    decode, encode, Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use serde::{Deserialize, Serialize};
use time::{Duration, OffsetDateTime};

mod jwt_numeric_date {
    //! Custom serialization of OffsetDateTime to conform with the JWT spec (RFC 7519 section 2, "Numeric Date")
    use serde::{self, Deserialize, Deserializer, Serializer};
    use time::OffsetDateTime;

    /// Serializes an OffsetDateTime to a Unix timestamp (milliseconds since 1970/1/1T00:00:00T)
    pub fn serialize<S>(date: &OffsetDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let timestamp = date.unix_timestamp();
        serializer.serialize_i64(timestamp)
    }

    /// Attempts to deserialize an i64 and use as a Unix timestamp
    pub fn deserialize<'de, D>(deserializer: D) -> Result<OffsetDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        OffsetDateTime::from_unix_timestamp(i64::deserialize(deserializer)?)
            .map_err(|_| serde::de::Error::custom("invalid Unix timestamp value"))
    }
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct Data {
    user_id: String,
    is_plus: i8,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct Claims {
    data: Data,
    #[serde(with = "jwt_numeric_date")]
    iat: OffsetDateTime,
    #[serde(with = "jwt_numeric_date")]
    exp: OffsetDateTime,
}

impl Claims {
    pub fn new(data: Data, iat: OffsetDateTime, exp: OffsetDateTime) -> Self {
        // normalize the timestamps by stripping of microseconds
        let iat = iat
            .date()
            .with_hms_milli(iat.hour(), iat.minute(), iat.second(), 0)
            .unwrap()
            .assume_utc();
        let exp = exp
            .date()
            .with_hms_milli(exp.hour(), exp.minute(), exp.second(), 0)
            .unwrap()
            .assume_utc();

        Self { data, iat, exp }
    }
}

// 签发
fn sign(payload: Claims, key: String) -> String {
    let header = Header::default();
    let key = EncodingKey::from_secret(key.as_ref());
    match encode(&header, &payload, &key) {
        Ok(token) => token,
        Err(error) => panic!("{error}"),
    }
}

// 验证
fn verify(token: String, key: String) -> Result<TokenData<Claims>, Error> {
    let key = DecodingKey::from_secret(key.as_ref());
    let validation = Validation::new(Algorithm::HS256);

    match decode::<Claims>(&token, &key, &validation) {
        Ok(c) => Ok(c),
        Err(err) => match *err.kind() {
            ErrorKind::InvalidToken => Err(Error::from(ErrorKind::InvalidToken)), // Example on how to handle a specific error
            ErrorKind::InvalidIssuer => Err(Error::from(ErrorKind::InvalidIssuer)), // Example on how to handle a specific error
            _ => Err(err),
        },
    }
}

fn main() {
    let key = "aurora";
    let iat = OffsetDateTime::now_utc();
    let exp = iat + Duration::days(7);
    let data = Data {
        user_id: "foo_id".to_string(),
        is_plus: 1,
    };
    let my_claims = Claims::new(data, iat, exp);

    let token = sign(my_claims, key.to_string());

    match verify(token, key.to_string()) {
        Ok(res) => {
            println!("{:?}", res.claims.data);
            println!("{:?}", res.header);
        }
        Err(_) => {
            println!("验证失败")
        }
    }
}

```

## Chrono

Chrono 是时间库的首选

获取当前时间

```rust
use chrono::Utc;

let now: chrono::DateTime<Utc> = Utc::now();
println!("Current time: {}", now);

let date_time_str = "2023-04-25 12:34:56";
let date_time: DateTime<Utc> = DateTime::parse_from_str(date_time_str, "%Y-%m-%d %H:%M:%S")
    .unwrap()
    .with_timezone(&Utc);
println!("Parsed time: {}", date_time);
```

解析字符串格式的时间

```rust
let formatted = date_time.format("%Y-%m-%d %H:%M:%S").to_string();
```

格式化时间

```rust
let start = Utc::now();
// 执行某些操作
let end = Utc::now();
let duration = end - start;
println!("Operation took: {:?}", duration);
```

计算时间差

```rust
let date_time: DateTime<Utc> = DateTime::from_utc(NaiveDateTime::from_timestamp(timestamp, 0), Utc);
```

将时间转换为时间戳

```rust
let timestamp: i64 = date_time.timestamp();
```

从时间戳创建时间

```rust
let date_time: DateTime<Utc> = DateTime::from_utc(NaiveDateTime::from_timestamp(timestamp, 0), Utc);
```

日期计算

```rust
let tomorrow = date_time.checked_add_days(1).unwrap();
let last_month = date_time.checked_sub_months(1).unwrap();
```
