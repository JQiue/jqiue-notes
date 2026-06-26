---
title: Koa
category: 框架
tag: ["Koa", "Node.js"]
article: false
---

Koa 是由 Express 团队核心成员打造的一个更轻量的 Node.js Web 框架。它并不追求“什么都内置”，而是把重点放在更小的核心、更清晰的中间件模型，以及更自然的异步控制流上。

如果只用一句话概括：

+ Express 更像开箱即用的 Web 框架
+ Koa 更像一个围绕中间件组织起来的极简内核

## Koa 到底解决了什么问题

Koa 诞生时，Node.js 社区还长期处在回调风格和 Generator 过渡阶段。它想解决的问题，不只是“再做一个 Web 框架”，而是让服务端中间件的组织方式更清晰。

它的核心思路是：

+ 核心尽量小
+ 不预设太多应用层能力
+ 用统一的 `Context` 对象封装请求和响应
+ 用可组合的中间件处理控制流

所以 Koa 的魅力不在于功能多，而在于抽象干净。

## Koa 和 Express 的区别

两者都建立在 Node.js 的 `http` 模块之上，但设计取向不同。

| 对比项   | Express                    | Koa                                  |
| -------- | -------------------------- | ------------------------------------ |
| 核心定位 | 更完整、更偏“可直接搭应用” | 更轻量、更偏“可自由拼装”             |
| 内置能力 | 路由、中间件生态更成熟     | 核心能力更少，很多能力依赖社区中间件 |
| 异步模型 | 历史包袱更重               | 更自然地拥抱 `async/await`           |
| 编程体验 | 熟悉、直接                 | 更强调中间件组合和控制流             |

简单说：

+ 如果你想快速搭一个传统 Web 服务，Express 往往更直接
+ 如果你更在意中间件模型和框架内核的简洁性，Koa 会更顺手

## 第一个跑起来的程序

```sh
npm i koa
```

最小示例：

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Hello, World';
});

app.listen(1024, () => {
  console.log('http://localhost:1024');
});
```

这里最重要的不是返回一段字符串，而是先认识 Koa 的两个核心入口：

+ `new Koa()`：创建应用实例
+ `app.use()`：注册中间件

## Koa 的核心：Context

Koa 不会把请求对象和响应对象直接扔得到处都是，而是把它们统一包装进一个 `ctx`（context）对象里。

在中间件中，最常见的就是通过 `ctx` 读请求、写响应：

```js
app.use((ctx) => {
  ctx.body = {
    method: ctx.method,
    url: ctx.url,
  };
});
```

你可以把 `ctx` 理解成“这次请求的上下文容器”。

它通常包括：

+ 请求信息：`ctx.request`、`ctx.method`、`ctx.url`
+ 响应控制：`ctx.response`、`ctx.status`、`ctx.body`
+ 以及框架额外提供的一些便捷访问方式

Koa 的很多优雅感，都来自这个统一上下文。

## Koa 真正的灵魂：中间件模型

`app.use(callback)` 用来注册中间件。Koa 的中间件通常长这样：

```js
app.use(async (ctx, next) => {
  // 进入这一层时的逻辑
  await next();
  // 下游执行完成后返回这一层时的逻辑
});
```

这里的关键不是语法，而是 `next()`。

`next()` 的意义是：把控制权交给下一个中间件。等下游执行完之后，再回到当前中间件继续执行后半段逻辑。

这就形成了 Koa 最经典的“洋葱模型”。

## 洋葱模型

看一个例子：

```js
app.use(async (ctx, next) => {
  console.log('middleware 1 start');
  await next();
  console.log('middleware 1 end');
});

app.use(async (ctx, next) => {
  console.log('middleware 2 start');
  await next();
  console.log('middleware 2 end');
});

app.use(async (ctx) => {
  console.log('middleware 3');
  ctx.body = 'ok';
});
```

请求进来后的执行顺序通常是：

```txt
middleware 1 start
middleware 2 start
middleware 3
middleware 2 end
middleware 1 end
```

这就是所谓的洋葱模型：

+ 先一层层向内进入
+ 到达最里面后，再一层层向外返回

这套模型非常适合做：

+ 日志
+ 统一错误处理
+ 鉴权
+ 请求耗时统计
+ 响应包装

因为它天然支持“请求前做一段事，请求后再做一段事”。

## 路由、请求体和中间件生态

Koa 的核心很小，所以很多常见能力都依赖社区中间件补齐。

常见组合包括：

+ `@koa/router`：处理路由
+ `koa-bodyparser`：处理 JSON / 表单请求体
+ `koa-static`：托管静态资源

例如：

```sh
npm i koa @koa/router koa-bodyparser
```

```js
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => {
  ctx.body = 'home';
});

router.post('/user', (ctx) => {
  ctx.body = {
    received: ctx.request.body,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
```

这个例子已经能体现 Koa 的基本使用方式：

+ 核心应用负责挂载中间件
+ 路由是额外安装的
+ 请求体解析也是额外安装的

这既是 Koa 的优点，也是它的门槛。优点是自由度高，门槛是你得自己决定应用栈怎么拼。

## 错误处理

Koa 很适合做统一错误处理中间件，因为洋葱模型天然支持把整个调用链包起来：

```js
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message || 'Internal Server Error',
    };
    ctx.app.emit('error', error, ctx);
  }
});
```

这类写法很常见，因为它能把应用内部抛出的错误集中收口，不需要每个路由都自己写一遍 `try...catch`。

如果需要，还可以继续监听应用级错误事件：

```js
app.on('error', (error, ctx) => {
  console.error('server error', error);
});
```

## Koa 适合什么项目

Koa 比较适合：

+ 你希望自己掌控中间件组合
+ 你喜欢更小、更纯粹的框架内核
+ 你写的是 API 服务、中间层服务、轻量后端
+ 你愿意自己决定路由、鉴权、参数校验、错误处理的拼装方式

它不一定最适合：

+ 想要尽可能多的现成功能开箱即用
+ 团队成员对 Node.js 中间件模型不熟
+ 你更希望框架直接替你做很多约定

简单说，Koa 更像“给你一个干净内核，让你自己搭”；如果你想少做选择题，它未必是第一选项。

## Koa 的优点和代价

优点：

+ 核心小，抽象清晰
+ 中间件模型优雅
+ `async/await` 体验自然
+ 很适合构建自定义 API 服务栈

代价：

+ 很多能力要自己装
+ 项目结构更依赖团队约定
+ 对初学者来说，不如更“全家桶式”的框架直接

## 总结

Koa 的价值不在于“比 Express 更新”，也不在于“更轻”这两个字本身，而在于它用一个干净的中间件模型，把 Web 服务的控制流组织得很漂亮。只要理解了 `ctx`、`next()` 和洋葱模型，你就抓住了 Koa 的核心。剩下的路由、请求体解析、错误处理，本质上都是围绕这套模型继续拼装。
