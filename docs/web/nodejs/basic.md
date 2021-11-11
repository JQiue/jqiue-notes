---
title: 介绍
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

::: info 前置知识

+ JavaScript
+ HTTP
+ TCP
+ 命令行
:::

NodeJS 内置 V8 引擎，是 JavaScript 的一个运行环境，提供了浏览器中没有的功能，提供了系统级别的 API，使之能够进行文件的读写，进程的管理，以及网络通信，这在浏览器中是做不到的。NodeJS 使用了事件驱动、非阻塞 I/O 的模型，轻量且高效，同时还提供了包管理工具（NPM），NPM 是全球最大的包管理器，比 Apache Maven 的软件包多两倍以上

NodeJS 的目的就是为了实现高性能的 Web 服务器，作者看中的是事件驱动和非堵塞 I/O 模型的优势。C、Lua、Ruby 等语言都曾经作为备选的实现，最终选择 JavaScript 是因为开发门槛低，历史包袱较少，并且 JavaScript 在浏览器中有非常广泛的事件驱动方面的应用，正好符合作者需求，其次，浏览器大战已经分出高下，Chrome 的 JavaScript 引擎 V8 得到性能第一的称号，因此 JavaScript 成为了 NodeJS 的实现语言

NodeJS 打破了 JavaScript 只能运行在浏览器上的局面，统一了前后端编程环境，大大的降低了前后端转换后带来的代价，对于 Web 开发者来说，学习 JavaScript 不仅仅可以在浏览器上和 UI 打交道，也可以在 NodeJS 上随性所欲的访问本地资源

与其他 Web 后端语言相比，NodeJS 除了异步和事件以外，回调函数是最大的一个特色，这种方式对于很多习惯同步编程的人来说，也许很不习惯，因为代码的编写顺序与执行顺序没有关系，可能造成阅读上的障碍，因此与常规的同步编程相比，变得不是那么一目了然，但转变了异步思想后，对业务的处理实际上都是一致的

在 NodeJS 中，自然保留了 JavaScript 单线程的特点，最大的好处是不用担心有多线程那样到处都是状态同步的问题，没有死锁的存在，也没有线程切换时带来的性能开销。但是单线程也有它自己的弱点，这导致无法利用多核 CPU，错误会引起整个应用崩溃，大量占用 CPU 导致无法继续调用异步 I/O。就像浏览器中一样，长时间的执行 JavaScript 会导致 UI 的渲染和响应被中断，但是这个问题最后被解决了，采取 Web Workers 一样的思路，NodeJS 使用子进程来解决单线程的健壮性和无法利用多核 CPU 的问题

NodeJS 适合解决下面这些应用场景中的问题：

+ 处理大流量数据
+ 适合实时交互的应用
+ 完美支持对象数据库（MongoDB）
+ 异步处理大量并发
+ 分布式应用
+ 工具类应用

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
  + 浏览器提供了`window`全局对象
  + NodeJS 的全局对象不叫`window`, 叫`global`

+ this 默认指向不同
  + 浏览器中全局`this`指向`window`
  + NodeJS 中全局`this`默认指向空对象`{}`
  
+ API 不同
  + 浏览器提供了操作 BOM/DOM 的相关 API
  + NodeJS 中没有 HTML 节点也没有浏览器, 所以 NodeJS 没有 DOM/BOM 相关操作

## Server 开发和前端开发的区别

服务端的程序要稳定，必须考虑内存和 CPU，要有一些日志记录，一定是安全的，具有集群和服务拆分的特点，可能会遭受各种恶意的攻击和误操作，客户端独占一个浏览器，不需要考虑内存和 CPU 的问题

## 模块

随着前端的发展，JavaScript 不在局限于表单验证和特效制作上了，经过漫长的过程，JavaScript 终于暴露了自己先天就缺乏的一个功能：模块。对比其他语言来说，Java 有 import，Python 也有 import，Ruby 有 require 用来解决引入代码的机制。JavaScript 通过`<script>`引入代码的方式自然就显得混乱无比，自身根本就没有组织和约束能力，因此必须用命名空间等人为方式来约束代码

虽然前端的 JavaScript 有着更多标准 API，但是对于后端的 JavaScript 来说，规范已经远远落后，有着以下很严重的缺陷：

+ 没有模块系统
+ 标准库少，相对于前端来说
+ 没有标准接口，没有 Web 服务器以及数据库之类的统一接口
+ 缺乏包管理的能力，不能自动加载以及安装依赖

随着时间的发展，JavaScript 社区终于为其制定了响应的规范，其中 CommonJS 规范的提出是一个非常重要的里程碑，它为 JavaScript 提供了一个非常美好的前景，即在任何地方都能运行 JavaScript。JavaScript 不再停留在小脚本的阶段，而可以开发很多富客户端应用：

+ 服务端
+ 命令行
+ 桌面图形
+ 混合应用

NodeJS 借鉴了 CommonJS 来实现了一套模块系统，其中 NPM 对模块的规范完美支持使 NodeJS 应用在开发中事半功倍，CommonJS 非常简短，主要有模块引用、模块定义和模块标识三个部分

模块引用：

```js
const math = require('math');
```

`require()`方法是这个规范中用来引入一个模块到当前上下文的功能，接收一个模块标识

模块定义：

```js
exports.foo = function() {};
```

`require()`方法提供了引入模块的功能，而导出模块的功能则交给`exports`对象，它是唯一的导出接口，在这里还存在一个`module`对象，表示当前模块自身，而`exports`是`module`的属性，在 NodeJS 中一个文件就是一个模块，将其中变量或方法等挂载到`exports`对象上作为属性，即可在其它地方使用`require()`来导入这个模块使用其中的功能

模块标识就是传递给`require()`方法的参数，必须是小驼峰命名的字符串，或者相对路径，亦或者是绝对路径，可以省略掉文件后缀`.js`

NodeJS 中引入模块，需要经历 3 个步骤：

1. 路径分析：对于不同的模块，路径查找方式会有不同，
2. 文件定位：分析扩展名，允许不包含文件的扩展名，但会依次按照`.js`、`.json`、`.node`的顺序补充
3. 编译执行：定位到具体文件后，就会根据路径载入并编译，每个编译成功的模块都会将其路径作为索引缓存在`Module._cache`提高二次引入的性能

在 NodeJS 中，模块分为两类：NodeJS 提供的核心模块，用户自定义的模块。核心模块在 NodeJS 进程启动时就已经被加载到了内存，所以文件定位以及编译执行已经被省略，加载速度最快。对于自定义模块通常是动态加载，必须要完整的引入步骤。对于引入的模块会进行缓存，无论是核心模块还是自定义模块，对相同模块的二次加载都是采用缓存优先的策略，但是核心模块的缓存检查会优先自定义模块

::: tip
在分析标识符的过程中，可能会没有查找到对应文件，但是得到了一个目录，此时会将目录作为一个包来处理，NodeJS 对 CommonJS 进行了一些程度上的支持，这导致会在当前目录下寻找`package.json`，然后解析出包描述对象，并从中取出`main`属性指定的文件名进行定位，如果`main`指定的是错的，或者根本没有`pacakge.json`这个文件，那么会将`index`作为默认的文件名，如果都没有成功定位任何文件，则会抛出异常
:::

## 异步 IO

异步 I/O 对于 NodeJS 而言非常重要，异步的概念主要是 JavaScript 在浏览器中是单线程执行的，而且与 UI 渲染共用一个线程，这导致 JavaScript 在执行的时候，UI 渲染和响应处于停滞状态，对于用户来说就会感到页面卡顿，因此用户体验是很差的。但是如果采用异步的方式，JavaScript 和 UI 渲染都不会处于等待，这对用户来说没有感受到卡断，这样的体验无疑是非常美好的

对于前端来说，使用异步可以消除掉 UI 堵塞，但是前端获取资源的速度也取决与后端的响应速度，假如有两个资源需要返回，第一个资源需要耗时 M，第二个资源需要耗时 N，如果采用同步的方式，总共耗时为 M + N。但是如果采用异步的方式，第一个资源的获取并不会堵塞第二个资源的获取，因此总耗时为 max(M, N)。随着复杂性的增加，这种同步和异步的优劣会逐渐的凸显出来，会放大异步和同步在性能上的差距。因此异步 I/O 对于 NodeJS 的重要性毋庸置疑，当只有后端更快速的响应资源，前端的体验才能更加美好

## 全局变量

在 NodeJS 中存在一个全局作用域，可以定义一些不需要使用任何模块加载即可使用的变量、函数或类，同时也预先定义了一些全局方法及全局类，它们都是`global`的属性

命名|说明
---|---
`global`|全局对象
`__dirname`|提供当前模块的目录名（绝对路径）
`__filename`|提供当前模块的文件名（绝对路径）
`module`|当前模块的引用
`exports`|导出模块，是`module.exports`的简写方式
`require()`|引入模块、JSON、本地文件
`URL`|处理 URL 地址的类
`Buffer`|处理二进制数据的类
`console`|打印信息的类
`process`|进程类
`setInterval()`|定时器
`setTimeout()`|定时器

这里简单说明几个比较重要的全局变量的用法：

+ `require.resolve()`：查询某个模块文件带有绝对路径的文件名
+ `require.cache`：所有已加载模块的缓存区，通过键名来访问已缓存的模块
+ `new URL()`：创建一个 URL 对象
+ `process.env`：查看当前环境变量
+ `process.cwd()`：查看当前运行 NodeJS 的终端路径

::: tip 卸载模块
`delete require.cache(require.resolve('module'))`
:::

使用`process`实现标准的 I/O 流读写：

```js
// 执行到这里时等待
process.stdin.resume();
// 设置输入流的编码
process.stdin.setEncoding('utf8');
// 监听输入流的数据
process.stdin.on('data', function (text) {
  // 将数据输出到输出流
  process.stdout.write(text);
  
})
```

查看系统情况：

```js
// 系统架构
console.log(process.arch);
// 内存使用情况
console.log(process.memoryUsage());
// 命令行参数
console.log(process.argv);
```

退出 NodeJS 程序：

```js
process.exit();
```

Node 可以在不依赖其它工具的情况下使用`console.time()`和`console.timeEnd()`完成基准测试，`console.time()`记录当前时间，`console.timeEnd()`打印执行到这里的持续时间

```js
var label;
console.time(label);

/* 
  运行期间的代码
*/

console.timeEnd(label);
```

当事件循环进行一次完整的过程后，可以称之为一个滴答，而`process.nextTick(callback)`会将一个函数在下一个滴答之前执行，而不是排入任务队列，比`setTimeout`更加有效率：

```js
/* 加入任务队列 */
setTimeout(()=>console.log('timeout'), 0);

/* 不加入任务队列，等待下一个任务循环前执行 */
process.nextTick(() => {
  console.log('hello, world');
});

/* 正常执行 */
+function foo() {
  console.log('foo');
}()

/* 执行结果
foo
hello, world
timeout
*/
```