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

## 创建 HTTP 服务

NodeJS 原本的用途就是开发一款高性能的 Web 服务器，`http`就是用来创建服务器的模块，它有两种使用方式：

+ 作为客户端时，发起一个 HTTP 请求，获取服务端响应
+ 作为服务端时，创建一个 HTTP 服务器，监听客户端请求并响应

### 服务端模式

首先需要通过`http.createServer(callback(request, response))`方法创建一个服务器，然后调用`listen()`方法监听端口，每当客户端请求一次，回调函数就会被调用一次

```js
const http = require("http");
http.createServer((request, response) => {
  response.end("Hello，World");
}).listen(3000);
```

`request`保存着客户端的 HTTP 请求头信息，`response`用来设置服务端给客户端的相应信息

NodeJS 不会自动响应客户端，必须负责任的使用`response.end()`方法去响应客户端并结束，因此可以在结束响应之前，在请求的生命周期内运行任何逻辑，如果没有响应，客户端就会挂起，直到超时并结束响应

### 客户端模式

`request(url, callback(response))`方法可以创建一个客户端，指定请求对象和请求头数据，然后就会返回一个`request`对象，之后就可以将`request`对象作为一个只写数据流来写入数据和结束请求，结束请求之后就调用回调函数

```js
const req = http.request("http://127.0.0.1:3000", res => {})
req.write("")
req.end();
```

### 读取请求头和设置响应头

请求信息可以在`request`中获取：

+ `request.method`：HTTP 方法
+ `request.url`：请求路径
+ `request.headers`：请求头信息
+ `request.httpVersion`：协议版本

NodeJS 提供了几个修改响应头的方法，`response.setHeader(field, value)`，`response.getHeader(field)`和`response.removeHeader(field)`

对于响应头来说，一定要在`response.write()`以及`response.end`前使用

默认的 HTTP 响应码是`200`，有时需要设置一些别的状态码可以使用`response.statusCode`，也应该在一些结束响应的逻辑前使用

### 数据传输

NodeJS 的 HTTP 读取数据时，会将数据处理成`data`事件的形式，并将数据块放到其中，等待处理，数据块默认是一个 Buffer 对象，只要读入了新的数据块，就会触发`data`事件，一旦读取完毕，就会触发`end`事件

```js
http.createServer((req, res) => {
  req.on('data', chunk => {
    console.log(chunk);
  })
  req.on('end', () => {
    res.end();
  })
});
```

可以使用`req.setEncoding()`来改变默认的数据块编码方式

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

文件读取：

```js
const fs = require('fs');

// 异步
fs.readFile('data.txt', (err, data) => {
  if(err) return err;
  console.log(data);
});

// 同步
let data = fs.readFileSync('data.txt');
```

文件写入：

```js
const fs = require('fs');

// 异步
fs.writeFile('./text.txt', 'hello, world', err => {
  if (err) {
    console.log(err);
  }
});

// 同步
fs.writeFileSync('./data.txt', 'hello, world');
```

::: tip
如果没有该文件，则会尝试创建
:::

`writeFile`是一种覆盖写入，如果想要追加内容，则使用`appendFile`：

```js
const fs = require('fs');

fs.appendFile('data.txt', '追加内容', err => {
  if(err) {
    console.log(err);
  }
})

fs
```

获取目录：

```js
const fs = require('fs');

// 异步
fs.readdir('./', (err, files) => {
  console.log(files);
})

// 同步
const files = fs.readdirSync('./');
```

## 事件触发器

在 NodeJS 中很多对象也会触发各种事件，比如对于代表 Web 服务器的`http.Server`来说，可能会触发”接收到请求“，”产生连接错误“等各种事件，针对于不同的事件，都需要不同的事件处理

所有可能触发时间的对象都是一个继承了`EventEmitter`类的子类对象，`EventEmitter`类定义了很多方法，用来处理和事件相关的事情：

+ `addListener(event, listener)`：监听事件并处理
+ `on(event, listener)`：监听事件并处理
+ `once(event, listener)`：监听事件且只会处理一次
+ `removeListener(event, listener)`：移除事件处理的函数
+ `removeAllListeners([event])`：移除所有的事件处理函数
+ `setMaxListener(n)`：指定事件处理函数的最大数量
+ `listeners(event)`：获取事件的处理函数
+ `emit(event, [arg1, [arg2], ...])`：手动触发事件

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

## 缓冲

如果没有提供编码格式，文件操作以及很多网络操作就会将数据作为 Buffer 类型返回

## 流

流是用于在 NodeJS 中处理流数据的抽象接口，`stream`模块提供了用于实现流接口的 API，在 NodeJS 中提供了很多流对象，比如，HTTP 服务的请求，进程的输出流，流是可读可写的，或者两者兼之，且所有的流都是`EventEmitter`的实例

NodeJS 中有四种基本的流类型：

+ `Writable`：可写入数据的流
+ `Readable`：可读取数据的流
+ `Duplex`：可读可写的双工流
+ `Transform`：可以在写入或读取数据时修改后转换数据的双工流

```js
const fs = require('fs');
const http = require('http');
http.createServer((req, res) => {
  const data = fs.createReadStream('./data.txt');
  data.pipe(res);d
});
```

## 路径

`path`模块提供了用于处理文件和目录的路径的使用工具 API

```js
const path = require('path');

// 拼接路径，sep 在 Windows 下是 \，类 unix 下是 /
console.log(path.join('foo', 'bar', 'baz'));

// 获取文件路径
console.log(path.dirname('./foo/bar.js')); ./foo

// 获取文件名
console.log(path.basename('./foo/bar.js')); bar.js
```

## 工具

`util`模块提供了大量的工具类型的 API

+ `util.promisify(original)`：会将`original`这种错误优先回调风格的函数，转换为一个返回 promise 的版本