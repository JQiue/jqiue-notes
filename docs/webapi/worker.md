---
title: Worker
category: Web
article: false
---

一个 worker 是使用一个构造函数创建的一个对象 (e.g. Worker()) 运行一个命名的 JavaScript 文件。这个文件包含将在工作线程中运行的代码; workers 运行在另一个全局上下文中，不同于当前的window. 因此，在 Worker 内通过 window获取全局作用域 (而不是self) 将返回错误

## Web Worker

Worker 和 主线程互不干扰，通常用于替主线程分担计算密集型任务，防止主线程中JS执行时阻塞UI。
Worker本身也会耗费资源，因此一旦使用完毕，就应该分别使用terminate和close方法关闭。

## Server worker

Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>

<!-- to be updated -->