---
title: 核心 API
category: 编程语言
tag: [NodeJS, Runtime]
author: JQiue
article: false
---

NodeJS 提供了一些针对 URL 相关操作的模块

## url

url 模块用于解析 URL 字符串

::: tip
URL 是为了标识网络资源位置的一种编码，平常说的网页地址就是 URL 地址，它由**协议、主机、端口、路径**四部分组成
:::

+ parse(str, bool)：解析一个符合 URL 规则的字符串，并返回一个 URL 对象，第二个参数是可选的，如果为`true`，URL 对象的`query`属性是一个对象，而不是字符串

```js
const url = require("url");
url.parse("https://wjqis.me");
```

`parse()`会返回这样的对象：

```js
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'wjqis.me',
  port: null,
  hostname: 'wjqis.me',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://wjqis.me/'
}
```

+ format(obj)：将一个 URL 对象转换为 URL 字符串

```js
const urlObj = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'wjqis.me',
  port: null,
  hostname: 'wjqis.me',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://wjqis.me/'
}
url.format(urlObj) // http://wjqis.me/
```

+ resolve(from, to)：将一个 URL 字符串进行解析拼接，返回新的 URL 字符串

```js
url.resolve("https://wjqis.me/foo/bar/qux", "/web") // https://wjqis.me/web
url.resolve("https://wjqis.me/foo/bar/qux", "web") // https://wjqis.me/foo/bar/web
url.resolve("https://wjqis.me/foo/bar/qux", "./web") // https://wjqis.me/foo/bar/web
url.resolve("https://wjqis.me/foo/bar/qux", "../web") // https://wjqis.me/foo/web
url.resolve("https://wjqis.me/foo/bar/qux", "../../web") // https://wjqis.me/web
```

## querystring

querystring 针对 URL 中的 query 部分

+ parse(str)：将一个 query 字符串解析成键值对对象

```js
const str = "https://wjqis.me/?name=zs&age=23"
querystring.parse(url.parse(url).query) // {name: 'zs', age: '23'}
```

+ stringify(obj)：将一个键值对对象解析成 query 字符串

```js
const obj = { name: 'zs', age: '23' }
querystring.stringify(obj) // name=zs&age=23
```

+ escape(str)：将一个 URL 字符串进行百分比编码

```js
qs.escape("https://wjqis.me/?name=zs&age=23") // https%3A%2F%2Fwjqis.me%2F%3Fname%3Dzs%26age%3D23
```

+ unescape(str)：将一个 URL 百分比编码的字符串进行解码

```js
qs.unescape("https%3A%2F%2Fwjqis.me%2F%3Fname%3Dzs%26age%3D23"); // https://wjqis.me/?name=zs&age=23
```

## http

NodeJS 原本的用途就是开发一款高性能的 Web 服务器，`http`就是用来创建服务器的模块，它有两种使用方式：

+ 作为客户端时，发起一个 HTTP 请求，获取服务端响应
+ 作为服务端时，创建一个 HTTP 服务器，监听客户端请求并响应

### 服务端模式

首先需要通过`createServer`方法创建一个服务器，然后调用`listen`方法监听端口，每当客户端请求一次，回调函数就会被调用一次

```js
const http = require("http")
http.createServer((request, response) => {
  response.end("Hello，World");
}).listen(3000)
```

### 客户端模式

`request`方法可以创建一个客户端，指定请求对象和请求头数据，然后就会返回一个`request`对象，之后就可以将`request`对象作为一个只写数据流来写入数据和结束请求，结束请求之后就调用回调函数

```js
const req = http.request("http://127.0.0.1:3000", res => {})
req.write("")
req.end();
```
