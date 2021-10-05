---
title: 核心 API
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

## 处理 URL

NodeJS 提供了一些针对 URL 相关操作的模块

url 模块用于解析 URL 字符串

::: tip
URL 是为了标识网络资源位置的一种编码，平常说的网页地址就是 URL 地址，它由**协议、主机、端口、路径**四部分组成
:::

+ parse(str, bool)：解析一个符合 URL 规则的字符串，并返回一个 URL 对象，第二个参数是可选的，如果为`true`，URL 对象的`query`属性是一个对象，而不是字符串

```js
const url = require("url");
url.parse("https://jinqiu.wang");
```

`parse()`会返回这样的对象：

```js
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'jinqiu.wang',
  port: null,
  hostname: 'jinqiu.wang',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://jinqiu.wang/'
}
```

`format(obj)`将一个 URL 对象转换为 URL 字符串

```js
const urlObj = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'jinqiu.wang',
  port: null,
  hostname: 'jinqiu.wang',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://jinqiu.wang/'
}
url.format(urlObj) // http://jinqiu.wang/
```

`resolve(from, to)`将一个 URL 字符串进行解析拼接，返回新的 URL 字符串

```js
url.resolve("https://jinqiu.wang/foo/bar/qux", "/web") // https://jinqiu.wang/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "web") // https://jinqiu.wang/foo/bar/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "./web") // https://jinqiu.wang/foo/bar/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "../web") // https://jinqiu.wang/foo/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "../../web") // https://jinqiu.wang/web
```

querystring 针对 URL 中的 query 部分

+ parse(str)：将一个 query 字符串解析成键值对对象

```js
const str = "https://jinqiu.wang/?name=zs&age=23"
querystring.parse(url.parse(url).query) // {name: 'zs', age: '23'}
```

+ stringify(obj)：将一个键值对对象解析成 query 字符串

```js
const obj = { name: 'zs', age: '23' }
querystring.stringify(obj) // name=zs&age=23
```

+ escape(str)：将一个 URL 字符串进行百分比编码

```js
qs.escape("https://jinqiu.wang/?name=zs&age=23") // https%3A%2F%2Fjinqiu.wang%2F%3Fname%3Dzs%26age%3D23
```

+ unescape(str)：将一个 URL 百分比编码的字符串进行解码

```js
qs.unescape("https%3A%2F%2Fjinqiu.wang%2F%3Fname%3Dzs%26age%3D23"); // https://jinqiu.wang/?name=zs&age=23
```

## 创建 Web 服务

NodeJS 原本的用途就是开发一款高性能的 Web 服务器，`http`就是用来创建服务器的模块，它有两种使用方式：

+ 作为客户端时，发起一个 HTTP 请求，获取服务端响应
+ 作为服务端时，创建一个 HTTP 服务器，监听客户端请求并响应

### 服务端模式

首先需要通过`createServer`方法创建一个服务器，然后调用`listen`方法监听端口，每当客户端请求一次，回调函数就会被调用一次

```js
const http = require("http");
http.createServer((request, response) => {
  response.end("Hello，World");
}).listen(3000);
```

`request`保存着客户端的请求信息，`response`用来设置服务端给客户端的相应信息

### 客户端模式

`request`方法可以创建一个客户端，指定请求对象和请求头数据，然后就会返回一个`request`对象，之后就可以将`request`对象作为一个只写数据流来写入数据和结束请求，结束请求之后就调用回调函数

```js
const req = http.request("http://127.0.0.1:3000", res => {})
req.write("")
req.end();
```

### 路由实现

根据不同的路径实现不同的功能

```js
const url = require('url');
const http = require('http');

function route(pathname, response) {
  if (pathname === '/favicon.ico') {
    return;
  } else if (pathname === '/') {
    console.log('/');
  } else if (pathname === '/a') {
    console.log('/a');
  } else if (pathname === '/b') {
    console.log('/b');
  } else {
    response.end('404');
  }
}

function onRequest(request, response) {
  const pathname = url.parse(request.url).pathname;
  route(pathname, response);
  response.end();
}

http.createServer(onRequest).listen(3000);

console.log('Server start at http://localhost:3000');
```

## 文件操作

异步的文件读取

```js
const fs = require('fs');
fs.readFile('data.txt', (err, data) => {
  if(err) return err;
  console.log(data);
});
console.log(data);
```

同步的文件读取

```js
const fs = require('fs');
let data = fs.readFileSync('data.txt');
console.log(data);
```

## 事件触发器

事件处理的流程

```js
// 引入事件模块
const events = require('events');

// 创建事件触发器
const eventEmitter = new events.EventEmitter();

// 创建事件处理函数
const eventHandler = function () {
  console.log('事件触发了');  
};

// 绑定事件
eventEmitter.on('handler', eventHandler);

// 触发事件
eventEmitter.emit('handler');
```
