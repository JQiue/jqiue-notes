---
title: 介绍
category: 编程语言
tags: [NodeJS, Alpha]
author: JQiue
article: false
---

::: info 必须的知识
必须了解基本的 JavaScript 语法（至少 ES6），以及模块化语法，最好有服务器相关知识
:::

NodeJS 内置 V8 引擎，是 JavaScript 的一个运行环境，提供了浏览器中没有的功能，提供了系统级别的 API，使之能够进行文件的读写，进程的管理，以及网络通信，这在浏览器中是做不到的，NodeJS 使用了事件驱动、非阻塞 I/O 的模型，轻量且高效，同时还提供了包管理工具（NPM），NPM 是全球最大的包管理器，比 Apache Maven 的软件包多两倍以上

NodeJS 的目的就是为了实现高性能的 Web 服务器，作者看中的是事件机制和异步 IO 模型的优势，并不是 JavaScript。作者需要一种不带 IO 功能，且支持事件机制的语言，于是自然选择了 JavaScript。虽然它和浏览器中的 DOM 没有了联系，但是它天生就能够处理 DOM

+ 处理大流量数据
+ 适合实时交互的应用
+ 完美支持对象数据库（MongoDB）
+ 异步处理大量并发

运行在服务器时，作为 Web Server，运行在本地时作为打包，构建工具。服务端开发的思路和套路和前端是完全不一样的

## 安装 NodeJS

+ 用于所有主流平台的官方软件包，可访问[NodeJS官网](http://nodejs.cn/download/)
+ 使用[NVM（NodeJS 版本管理器）](https://github.com/coreybutler/nvm-windows/releases) 安装 NodeJS

## 运行 JavaScript

+ 交互式：终端输入`node`即可进入交互式编程
+ 文件式：在命令行中输入`node 文件名`

## 和浏览器中的一些区别

NodeJS 和浏览器都是 JavaScript 的运行环境，但是由于宿主不同所以特点也有所不同

+ 内置对象不同
  + 浏览器提供了 window 全局对象
  + NodeJS 的全局对象不叫 window, 叫 global

+ this 默认指向不同
  + 浏览器中全局 this 指向 window
  + NodeJS 中全局 this 默认指向空对象
  
+ API 不同
  + 浏览器提供了操作 BOM/DOM 的相关 API
  + NodeJS 中没有 HTML 节点也没有浏览器, 所以 NodeJS 没有DOM/BOM 相关操作

## Server 开发和前端开发的区别

服务端的程序要稳定，必须考虑内存和 CPU，要有一些日志记录，一定是安全的，具有集群和服务拆分的特点，可能会遭受各种恶意的攻击和误操作，客户端独占一个浏览器，不需要考虑内存和 CPU 的问题

## 模块

NodeJS 提供了内置的模块来提供操作系统 API 的能力，也可以通过 NPM 下载第三方模块，也可以自定模块使用，NodeJS 模块语法是基于 CommonJS 规范的。在 NodeJS 中，所有的 js 文件都可以看作模块，可以通过`require()`语法导入

+ 如果传入的是 NodeJS 内置模块，不需要做路径解析
+ 如果是自定义模块需要做路径解析，支持`/`或盘符开头`c:`绝对路径，也支持`./`开头的相对路径

## 全局变量

命名|说明
---|---
__dirname|提供当前模块的目录名（绝对路径）
__filename|提供当前模块的文件名（绝对路径）
module|当前模块的引用
exports|导出模块，是`module.exports`的简写方式
require()|引入模块、JSON、本地文件
URL|处理 URL 地址的类
Buffer|处理二进制数据的类
console|打印信息的类
process|进程类
setInterval()|定时器
setTimeout()|定时器
