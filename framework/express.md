---
title: Express
category: 框架
tag: ["Express", "Node.js"]
article: false
---

Express 是 Node.js 生态里最经典、最广泛使用的 Web 框架之一。它的价值不在于“功能最先进”，而在于用很低的心智负担，把路由、中间件、请求响应处理这些服务端基础能力组织起来。

如果只用一句话概括：

+ Express 更偏“快速搭建 Web 应用”
+ Koa 更偏“围绕中间件模型自由拼装”

## Express 到底是什么

Express 是建立在 Node.js `http` 模块之上的 Web 框架。它帮你做的事情主要有三类：

+ 封装请求对象和响应对象
+ 提供清晰的路由组织方式
+ 提供中间件机制，让请求处理可以分层扩展

它并不试图像大型全家桶框架那样规定一切，而是提供一个足够实用、足够直接的应用骨架。

## Express 为什么流行

Express 长期流行，主要不是因为它“最强”，而是因为它在很多项目里足够好用：

+ 上手快
+ 文档和案例多
+ 中间件生态成熟
+ 很适合搭 API、后台服务、传统 Web 应用

对很多 Node.js 项目来说，Express 的吸引力在于：你几乎不用先理解太多框架哲学，就能先把服务跑起来。

## 第一个跑起来的程序

```sh
npm i express
```

最小示例：

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('server run at http://localhost:3000');
});
```

这个例子里有三个最重要的入口：

+ `express()`：创建应用实例
+ `app.get()`：注册一个 GET 路由
+ `app.listen()`：启动 HTTP 服务

Express 的很多能力，都是围绕这个应用对象逐步扩展出来的。

## 路由：把 URL 映射到处理逻辑

Express 的路由结构非常直接：

```js
app.METHOD(PATH, HANDLER)
```

其中：

+ `METHOD`：HTTP 请求方法，如 `get`、`post`
+ `PATH`：请求路径
+ `HANDLER`：匹配成功后执行的处理函数

例如：

```js
app.get('/', (req, res) => {
  res.send('hello');
});
```

这也是 Express 最易懂的一点：你几乎可以直接从代码表面看到“什么路径会触发什么逻辑”。

### `app.all()`

`app.all()` 可以匹配所有请求方法：

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next();
});
```

它常用于：

+ 某个路径的统一前置处理
+ 权限校验
+ 统一日志
+ 特定路由段的公共中间件

## Express 的核心：中间件

如果说路由负责“把请求分发到哪里”，那中间件负责“请求在到达目标前后，要经过哪些处理层”。

最常见的中间件形式是：

```js
app.use((req, res, next) => {
  console.log('中间件执行');
  next();
});
```

中间件可以访问：

+ `req`：请求对象
+ `res`：响应对象
+ `next`：把控制权交给下一个中间件或路由处理器

这个模型非常重要，因为 Express 应用本质上就是一条由中间件和路由共同组成的处理链。

## 中间件的顺序很重要

Express 中间件是按注册顺序执行的，这意味着顺序本身就是控制流的一部分。

```js
app.use((req, res, next) => {
  console.log('A');
  next();
});

app.use((req, res, next) => {
  console.log('B');
  next();
});

app.get('/', (req, res) => {
  res.send('hello');
});
```

请求进入 `/` 时，通常会先经过 `A`，再经过 `B`，最后进入路由处理函数。

所以在 Express 里，很多问题不是“有没有装中间件”，而是“把它放在了哪一层”。

## 中间件的常见类型

Express 里常见的中间件大概有这几类：

+ 应用级中间件：作用于整个应用，例如日志、鉴权、通用数据处理
+ 路由级中间件：只作用于某些路由
+ 错误处理中间件：专门处理异常和失败响应
+ 内置中间件：如 `express.static()`、`express.json()`
+ 第三方中间件：由社区提供，用于补充框架能力

这种设计让 Express 既能快速起步，又能逐步扩展。

## 请求对象和响应对象

Express 的另一个核心价值，是对 Node.js 原生请求响应对象做了更好用的封装。

### `req`

请求对象 `req` 常用来读取：

+ 路径参数
+ 查询参数
+ 请求头
+ 请求体

例如：

```js
app.get('/user/:id', (req, res) => {
  res.json({
    params: req.params,
    query: req.query,
  });
});
```

### `res`

响应对象 `res` 常用来发送结果：

+ `res.send()`：发送字符串、对象、Buffer 等
+ `res.json()`：返回 JSON
+ `res.status()`：设置状态码

例如：

```js
app.get('/api', (req, res) => {
  res.status(200).json({ ok: true });
});
```

Express 的很多“开发体验好”，就是因为这些封装把 Node 原生 HTTP 接口变得更顺手了。

## 托管静态文件

`express.static()` 可以直接提供静态资源访问能力：

```js
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('files'));
```

这在前后端未完全分离、后台管理页面、静态资源托管等场景里很常见。

## 错误处理中间件

Express 的错误处理中间件和普通中间件有一个明显区别：它要多接收一个 `err` 参数。

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error',
  });
});
```

它通常放在中间件链和路由之后，用来做统一错误出口。

这类中间件的价值在于：

+ 不需要每个路由都单独写错误响应
+ 应用可以有统一的错误格式
+ 日志和用户响应可以在边界层统一处理

## Express 中使用 TypeScript

Express 和 TypeScript 一起使用时，经常会遇到一个现实问题：中间件会给 `req`、`res` 挂新属性，但默认类型并不知道这些扩展。

例如：

```ts
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
```

或者直接扩展全局类型声明：

```ts
declare namespace Express {
  interface Request {
    auth: string;
  }
}
```

这背后反映的是 Express 的一个特点：它非常灵活，但这种灵活性在 TypeScript 下往往需要你自己补上类型边界。

## Express 适合什么项目

Express 很适合：

+ 快速搭建 REST API
+ 做中小型后端服务
+ 做传统 Web 应用和后台管理服务
+ 团队希望用较低成本进入 Node.js 服务端开发

它不一定最适合：

+ 你非常在意极致性能和更强的类型约束
+ 你希望框架默认提供更现代的结构化约定
+ 你想围绕更纯粹的中间件模型做高度定制

## Express 的优点和代价

优点：

+ 学习成本低
+ 路由和中间件模型直观
+ 生态成熟
+ 很适合快速落地业务服务

代价：

+ 历史包袱相对更重
+ 大型项目里需要靠团队约定维持结构
+ 在类型系统和异步错误边界上，不如一些更新的方案自然

## 总结

Express 的价值，不在于它有多少“高级魔法”，而在于它用一套非常直接的路由和中间件机制，把 Node.js Web 服务最常见的需求组织了起来。只要理解了 `app`、路由、`req/res`、中间件链和错误处理中间件，你就已经掌握了 Express 的基本骨架。剩下的工程能力，本质上都是围绕这套骨架继续扩展。
