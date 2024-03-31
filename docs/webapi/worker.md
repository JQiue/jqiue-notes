---
title: Worker
category: Web
article: false
---

Worker 是一种强大的机制，允许我们在主线程之外创建一个独立的工作线程来执行耗时的任务，从而避免阻塞主线程、提高应用程序的响应速度和性能

一个 worker 是使用一个构造函数创建的一个对象运行一个命名的 JavaScript 文件。这个文件包含将在工作线程中运行的代码; worker 不能访问 DOM 或 window 对象

```js
// 创建一个 Worker 实例
const worker = new Worker('worker.js');
```

## 消息传递

Worker 与主线程之间通过 postMessage() 和 onmessage 事件进行消息传递

main.js

```js
// 向 Worker 发送消息
worker.postMessage('Hello, Worker!');

// 监听 Worker 发送的消息
worker.onmessage = (event) => {
  console.log('Received message from Worker:', event.data);
};
```

worker.js

```js
// 监听从主线程发来的消息
onmessage = (event) => {
  console.log('Received message from main thread:', event.data);

  // 处理消息, 并向主线程发送响应
  const result = event.data.toUpperCase();
  postMessage(result);
};
```

## Worker 类型

主流浏览器支持几种不同类型的 Worker

### Dedicated Worker

这是最常见的 Worker 类型，每个 Dedicated Worker 都有自己独立的线程,只能被创建它的页面访问。通过`new Worker('worker.js')`创建。适用于执行耗时的计算任务或长时间运行的后台操作

### Shared Worker

Shared Worker 可以被多个页面或 tab 共享使用，多个页面可以连接到同一个 Shared Worker 实例，实现进程间通信。通过`new SharedWorker('worker.js')`创建。适用于需要在多个页面或 tab 之间共享数据和状态的场景

### Server worker

Service Worker 是一种特殊类型的 Worker，运行在浏览器和网页之间的代理层。它可以拦截和处理网络请求，实现离线缓存、推送通知等高级 web 应用功能。通过`navigator.serviceWorker.register('sw.js')`注册，适用于构建渐进式 Web 应用程序(PWA)

## 参考资料

+ <https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>
