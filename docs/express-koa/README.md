---
title: Express
category: 框架
article: false
---

```js
npm i express
```

创建实例

```js
const express = require('express');
// 创建服务器
const app = express();
app.get('/',(req, res)=>{
    res.send('hello')
})
// 监听 3000 端口
app.listen(3000, () => {
    console.log('server run at http://localhost:3000');
})
```

## 路由

这是路由结构：`app.METHOD(PATH, HANDLER)`

+ `METHOD` - 请求动词
+ `PATH` - 请求路径
+ `HANDLER` - 匹配时执行的处理函数

```js
// 监听到路径为 / 的 GET 请求并执行处理函数
app.get('/',(req, res)=>{
    res.send('hello')
})
```

`app.all()`是一个特殊的路由方法，会在其他路由方法之前运行，但必须调用`next()`放行

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

## 中间件

中间件是在响应未结束前调用的函数，使用`app.use()`，可以访问请求对象和响应对象，同时要调用`next`方法放行

```js
app.use((req, res, next) => {
  console.log("中间件执行");
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});
```

中间件可以定义多个，但必须注意顺序

## 托管静态文件

`express.static`中间件可提供静态文件访问能力，可以调用多次使用多个静态资源目录，也可以使用前缀地址来访问

```js
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static('files'))
```

<!-- to be updated -->

## 请求对象



## 响应对象