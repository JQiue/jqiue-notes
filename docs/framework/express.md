---
title: Express
category: 框架
article: false
---

Express 是基于 Node.js 的后端框架，特点是：

+ 封装 req 和 res 接口
+ 封装路由处理
+ 提供中间件机制

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

中间件就是将一次请求的处理拆分成许多小部分，分而治之。这样做完全符合开放封闭原则，可以复用也可以扩展。中间件是在响应未结束前调用的函数，使用`app.use()`，可以访问请求对象和响应对象，同时要调用`next`方法放行

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

在 Express 种总结的中间件有以下几种：

+ 应用级中间件 - 公共功能的中间件，例如日志记录、获取公共数据
+ 路由级中间件 - 针对路由不同功能的中间件，用于业务处理
+ 错误处理中间件 - 用于捕获异常
+ 内置中间件 - 最常用的中间件，例如 express.static 是 express 内置的中间件，用于返回静态文件
+ 第三方中间件 - 一个框架要保证扩展性，肯定得支持第三方开发者贡献自己的代码

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

## Express 中使用 TypeScript

+ 问题1：express 类型定义文件不准确
+ 问题2：当使用中间件对请求或响应作出修改时，实际上类型声明文件没有跟着改变

比如通常需要对 body 类型进行扩展

```ts
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

router.post('/getData', (req: RequestWithBody, res: Response) => {

})
```

扩展 Request 类型定义

```ts
declare namespace Express {
  interface Request {
    auth: string
  }
}

router.post('/getData', (req: Request, res: Response) => {
  req.auth
})
```
