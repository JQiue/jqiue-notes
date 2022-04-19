---
title: Koa
category: 框架
article: false
---

koa 是由 Express 人员打造的另一款框架，基于 ES6，解决了回调地狱和麻烦的错误处理问题。和 express 一样都是对 http 进行了封装，大致 api 都差不多

但是 express 内置了很多中间件，而 koa 没有，express 包含路由，视图渲染等特性，koa 只有 http 模块。express 通过回调实现异步，而 koa 使用 generator 和 async/await 使用同步的写法来处理异步，明显好于回调和 Promise

```sh
npm i koa
```

第一个跑起来的程序

```js
const koa = require('koa');

const app = new koa();

app.use(ctx => {
  ctx.response.body = 'Hello, World'
})

app.listen(1024, ()=> {
  console.log('http://localhost:1024');
})
```

## 中间件

`app.use(callback)`会应用对应的中间件方法，并且它返回`this`，所以可以链式表达

`app.use`会传给回调一个 Context，这个对象包含`response`和`request`

由于 koa 没有内置中间件，需要安装引进其他的中间件：

+ koa-router - 处理路由
+ koa-bodyparser - 处理 PostData
