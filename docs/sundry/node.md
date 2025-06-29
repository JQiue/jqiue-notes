---
title: Node.js
article: false
---

::: tip
基于 Node 12.x.x 开始编写
:::

到目前为止，大部分的前端工作都基于浏览器。但随着技术的发展，JavaScript 被移植到了浏览器环境外运行

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，提供了系统级别的 API，使之能够进行文件的读写，进程的管理，以及网络通信，这在浏览器中是做不到的。Node.js 使用了事件驱动、非阻塞 I/O 的模型，轻量且高效，同时还提供了包管理工具（NPM）

Node.js 的目的就是为了实现高性能的 Web 服务器，作者看中的是事件驱动和非堵塞 I/O 模型的优势

Node.js 打破了 js 只能运行在浏览器上的局面，统一了前后端编程环境，大大的降低了前后端转换后带来的代价，对于 Web 开发者来说，学习 js 不仅仅可以在浏览器上和 UI 打交道，也可以在 Node.js 上随性所欲的访问本地资源

在 Node.js 中，自然保留了 js 单线程的特点，最大的好处是不用担心有多线程那样到处都是状态同步的问题，没有死锁的存在，也没有线程切换时带来的性能开销。但是单线程也有它自己的弱点，这导致无法利用多核 CPU，但是这个问题最后被解决了，采取 Web Workers 一样的思路，Node.js 使用子进程来解决单线程的健壮性和无法利用多核 CPU 的问题

异步 I/O 对于 Node.js 而言非常重要，异步的概念主要是 js 在浏览器中是单线程执行的，而且与 UI 渲染共用一个线程，这导致 js 在执行的时候，UI 渲染和响应处于停滞状态，对于用户来说就会感到页面卡顿，因此用户体验是很差的。但是如果采用异步的方式，JavaScript 和 UI 渲染都不会处于等待，这对用户来说没有感受到卡顿，这样的体验无疑是非常美好的

::: tip 非堵塞 I/O
I/O 即系统的输入和输出，阻塞 I/O 和非堵塞 I/O 的区别在于系统接收输入再到输出的时间内，能不能接受其他输入
:::

对于前端来说，使用异步可以消除掉 UI 堵塞，但是前端获取资源的速度也取决与后端的响应速度，假如有两个资源需要返回，第一个资源需要耗时 M，第二个资源需要耗时 N，如果采用同步的方式，总共耗时为 M + N。但是如果采用异步的方式，第一个资源的获取并不会堵塞第二个资源的获取，因此总耗时为 max(M, N)。随着复杂性的增加，这种同步和异步的优劣会逐渐的凸显出来，会放大异步和同步在性能上的差距。因此异步 I/O 对于 Node.js 的重要性毋庸置疑，当只有后端更快速的响应资源，前端的体验才能更加美好

Node.js 适合解决下面这些应用场景中的问题：

+ 处理大流量数据
+ 适合实时交互的应用
+ 完美支持对象数据库（MongoDB）
+ 异步处理大量并发
+ 分布式应用
+ 工具类应用

## 和浏览器中的一些区别

由于宿主不同所以 js 也有所不同：

+ 内置对象不同
  + 浏览器提供了`window`全局对象
  + Node.js 的全局对象不叫`window`, 叫`global`

+ this 默认指向不同
  + 浏览器中全局`this`指向`window`
  + Node.js 中全局`this`默认指向空对象`{}`
  
+ API 不同
  + 浏览器提供了操作 DOM 的相关 API
  + Node.js 中没有 HTML 节点也没有浏览器, 所以没有 DOM 相关操作

Node.js 运行在服务器时，作为 Web Server，运行在本地时作为打包、构建工具

## 错误优先的回调函数风格

与其他 Web 后端语言相比，Node.js 除了异步和事件以外，回调函数是最大的一个特色，这种方式对于习惯同步编程的人来说，也许很不习惯。因为代码的编写顺序与执行顺序没有关系，可能造成阅读上的障碍，变得不是那么一目了然

对于 Node.js 中的回调函数来说，大多数都是错误优先的回调函数风格，也就是第一个参数是 Error，后面的参数才是结果

```js
function foo(callback) {
  setTimeout(() => {
    if(Math.random() > 0.5) {
      callback(null, 'success');
    } else {
      callback(new Error('fail'));
    }
  }, 0);
}

foo((err, result) => {
  if(err) {
    console.log(err);
  }
});
```

## 安装 && 运行

安装：

+ 用于所有主流平台的官方软件包，可访问[Node 镜像](https://registry.npmmirror.com/binary.html?path=node/)
+ 使用[NVM（Node 版本管理器）](https://github.com/coreybutler/nvm-windows/releases) 安装 Node.js

运行 JavaScript：

+ 交互式 - 终端输入`node`即可进入交互式编程
+ 脚本式 - 将代码写到文件中，在命令行中输入`node 文件名`

## 模块

Node.js 使用 CommonJS 规范来实现模块系统，其中 NPM 对模块的规范完美支持使 Node.js 应用在开发中事半功倍，CommonJS 非常简短，主要有模块引用、模块定义和模块标识三个部分

```js
// 引用模块
const math = require('math');

// 定义模块
exports.foo = function() {};
```

`require()`方法提供了引入模块的功能，而导出模块的功能则交给`exports`对象，它是唯一的导出接口，在这里还存在一个`module`对象，表示当前模块自身，而`exports`是`module`的属性。在 Node.js 中一个文件就是一个模块，将其中变量或方法等挂载到`exports`对象上作为属性，即可在其它地方使用`require()`来导入这个模块使用其中的功能

模块标识就是传递给`require()`方法的参数，必须是小驼峰命名的字符串，或者相对路径，亦或者是绝对路径，可以省略掉文件后缀`.js`

Node.js 中引入模块，需要经历 3 个步骤：

1. 路径分析 - 对于不同的模块，路径查找方式会有不同，
2. 文件定位 - 分析扩展名，允许不包含文件的扩展名，但会依次按照`.js`、`.json`、`.node`的顺序补充
3. 编译执行 - 定位到具体文件后，就会根据路径载入并编译，每个编译成功的模块都会将其路径作为索引缓存在`Module._cache`提高二次引入的性能

在 Node.js 中，模块分为三类：

+ Node.js 提供的核心模块
+ 自定义模块
+ 第三方模块

核心模块在 Node.js 进程启动时就已经被加载到了内存，所以文件定位以及编译执行已经被省略，加载速度最快。对于自定义模块通常是动态加载，必须要完整的引入步骤。对于引入的模块会进行缓存，无论是核心模块还是自定义模块，对相同模块的二次加载都是采用缓存优先的策略，但是核心模块的缓存检查会优先自定义模块

::: tip
在分析标识符的过程中，可能会没有查找到对应文件，但是得到了一个目录，此时会将目录作为一个包来处理，Node 对 CommonJS 进行了一些程度上的支持，这导致会在当前目录下寻找`package.json`，然后解析出包描述对象，并从中取出`main`属性指定的文件名进行定位，如果`main`指定的是错的，或者根本没有`pacakge.json`这个文件，那么会将`index`作为默认的文件名，如果都没有成功定位任何文件，则会抛出异常
:::

Node.js 同样支持 ESM，和 CommonJS 有着很多的异同，由于 CommonJS 是 Node.js 默认支持的模块系统，所以从 CommonJS 切换到 ESM 时，要特别注意

+ 大多数情况下可以使用 ES 模块加载 CommonJS 模块
+ 在 ESM 中没有`__filename`和`__dirname`
+ ESM 中没有 JSON 模块加载
+ 更多详见[这里](http://nodejs.cn/api/esm.html)

## 全局变量

在 Node.js 中存在一个全局作用域，可以定义一些不需要使用任何模块加载即可使用的变量、函数或类，同时也预先定义了一些全局方法及全局类，它们都是`global`的属性，在交互模式下声明的变量和方法都是`global`的属性，但是在脚本模式下不是

| 命名            | 说明                                   |
| --------------- | -------------------------------------- |
| `global`        | 全局对象                               |
| `__dirname`     | 提供当前模块的目录名（绝对路径）       |
| `__filename`    | 提供当前模块的文件名（绝对路径）       |
| `module`        | 当前模块的引用                         |
| `exports`       | 导出模块，是`module.exports`的简写方式 |
| `require()`     | 引入模块、JSON、本地文件               |
| `URL`           | 处理 URL 地址的类                      |
| `Buffer`        | 处理二进制数据的类                     |
| `console`       | 打印信息的类                           |
| `process`       | 进程类                                 |
| `setInterval()` | 定时器                                 |
| `setTimeout()`  | 定时器                                 |

这里简单说明几个比较重要的全局变量的用法：

+ `new URL()`：创建一个 URL 对象
+ `require.resolve()`：查询某个模块文件带有绝对路径的文件名
+ `require.cache`：所有已加载模块的缓存区，通过键名来访问已缓存的模块

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
});
```

查看系统情况：

```js
// 系统架构
process.arch
// 内存使用情况
process.memoryUsage()
// 命令行参数
process.argv
// 查看 Node.js 版本
process.version
// 查看环境变量
process.env
// 查看 node 程序的 pid
process.pid
// 杀死某个进程
process.kill(pid);
// 查看当前运行 Node.js 的终端路径
process.cwd()
```

退出 Node.js 程序：

```js
process.exit();
```

## 定时器

Node.js 能在不依赖其它工具的情况下使用`console.time()`和`console.timeEnd()`完成基准测试，`console.time()`记录当前时间，`console.timeEnd()`打印执行到这里的持续时间

```js
let label;
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
}();

/* 执行结果
foo
hello, world
timeout
*/
```

## NPM

有些复杂功能可能需要多个模块组成，维护多个模块关系的就是”包“。简而言之，一个包中有一个或多个模块，为了方便开发人员发布、安装和管理包, Node.js 推出了一个包管理工具：**NPM（Node Package Manager）**,NPM 由三个独立的部分组成：

+ **网站**：是开发者查找包（package）、设置参数以及管理 NPM 使用体验的主要途径
+ **注册表**：是一个巨大的数据库，保存了每个包（package）的信息
+ **命令行工具**：CLI 通过终端运行，开发者通过 CLI 与 NPM 打交道

一个完整符合 CommonJS 的包目录应该包含这些文件：

+ bin - 存放二进制执行文件的目录
+ lib - 存放 JavaScript 代码的目录
+ doc - 存放文档的目录
+ test - 存放进行单元测试的代码
+ package.json - 包描述文件

包描述文件 package.json 用于表达非代码相关的信息，位于包的根目录下，是包的重要组成部分，NPM 的所有行为都与包描述的文件息息相关，可以有以下字段：

+ name：包名。小写字母和数字组成，包名必须是唯一的，否则无法对外发布
+ author：包的作者。由`name`、`email`、`url`组成
+ description：包的简介
+ version：版本号。遵循`major.minor.revision`格式的语义化版本号
+ keywords：关键词词组。在 NPM 用来做分类搜索
+ maintainers：维护者列表。每一个人都由`name`、`email`、`web`三个属性组成
+ contributors：贡献者列表。格式与`maintainers`相同
+ bugs：可以返回 bug 的网址或者其它联系方式
+ licenses：许可证
+ repositories：源代码托管仓库地址
+ dependencies：当前包所依赖的包列表。非常重要，NPM 会根据这个属性来自动加载所依赖的包
+ devDependencies：一些模块只在开发阶段所依赖。NPM 也会根据这个属性来自动加载依赖包
+ scripts：通常放一些安装、编译、测试和卸载包的快捷命令
+ bin：将包作为命令行工具使用
+ main：指定包中其余模块的入口
+ homepage：包的主页地址
+ os：操作系统支持列表
+ cpu：CPU 架构的支持列表
+ engine：支持的 JavaScript 引擎列表
+ directories：包目录说明

在安装了 Node.js 同时，NPM 也自动装好了，NPM 帮助完成了第三方模块的发布、安装和卸载等，与第三方模块形成了一个良好的生态系统

在此之前，为了确认 NPM 没有随着 Node.js 安装出现问题，应该先执行一下`npm -v`，这会打印 NPM 的版本信息。在并不熟悉 NPM 命令之前，可以直接执行`npm`以获得帮助信息，而`npm help <command>`会详细查看具体命令说明

在使用 NPM 创建项目之前，可以通过`npm init`在运行此命令的目录下创建 package.json。同时每行会出现一个问题供选择，这些都会被记录到 package.json 中，这种流程不是必须的，可以添加`--yes`或`-y`参数来生成默认的 package.json

`npm install <package>`安装其他的依赖包是 NPM 中最常用的命令，可缩写成`npm i <package>`，它会在当前目录下创建一个 node_modules 目录，并将所下载的包解压到该目录中，于此同时，它会将依赖的包名写入到 package.json 中的`dependencies`字段里，因此就可以在代码中使用`require()`来引入它，如果是以 devDependency 方式安装的包，则使用`npm uninstall <package> --save --dev`

::: tip
这个包会从远程的 NPM 官方仓库中下载，由于官方仓库可能较慢，推荐使用以下命令更换淘宝镜像源

```sh
npm config set registry https://registry.npmmirror.com
```

:::

如果包中有命令行工具，那么需要添加额外的`-g`参数进行全局模式安装，通过全局模式安装的包都被安装到了一个统一的 node_modules 目录中。这并不意味着全局模式的包在任意地方引用，只是将包作为一个全局可用的可执行命令

卸载包使用`npm uninstall <package> --save/-S`，删除 node_modules 中的包文件，并且会将 package.json 的`dependencies`字段中的相关包名也一并移除，默认是卸载当前命令执行目录的包（可以省略`-s`），卸载全局的包则需要加上`-g`

::: warning
如果卸载了 Node.js，最好手动清理`C:\Users\用户\AppData\Roaming\npm`和`C:\Users\用户\AppData\Roaming\npm-cache`（Windows），给下一次的安装带来干净的环境
:::

更新包同样也有本地和全局之分，运行`npm update`命令，即可实现包的更新，更新全局的包则使用`npm update -g`，这可能很慢，因为依赖太多了

`npm list -g --depth 0`用于查看全局的包，查看本地的包去掉`-g`

package-lock.json 是在使用`npm install`时生成的文件，记录包的来源以及更加确切的版本号，以确保别人复制项目时的依赖版本保持一致，这是 package.json 无法做到的（从 Yarn 借鉴过来）

NPM 包的版本号借鉴了[https://semver.org/](https://semver.org/)

### 发布 NPM 包

可以将自己写的包上传到官方仓库，供给其他人下载使用，首先拥有一个[NPM](https://www.npmjs.com) 官方账号是必须的，如果是第一次使用则用`npm adduser`注册一个账户，成功后就会以该账户进行登录，如果不是第一次则使用`npm login`登录账户，登陆成功后使用`npm publish`命令发布包

::: tip
在发布前，最好检查一下源地址，必须是官方源地址，其次运行`npm publish --dry-run`模拟发布流程检查错误
:::

如果想要撤销发布的包，可以使用`npm unpublish <package> --force`

有时候发布包时，无法避免重名（占着茅坑不拉屎），这会导致发布失败，此时可以使用作用域的方式来解决，每个账户都是以名字为作用域的，只要将包名改为`@username/package`就视为作用域包

作用域包是默认私有发布的，此时需要向官方打钱，所以发布成一个公共的包即可解决该问题，只需使用`npm publish --access=public`

对于作用域包的安装时，也需要加上相应的作用域，比如`npm i @username/package`，在代码中引入时也是如此

通常更新一个包版本，需要手动修改版本号，然后再进行发布，但是 NPM 提供了几个命令用来更好的遵从 Semver 规范：

+ `npm version major` - 升级大版本号
+ `npm version minor` - 升级小版本号
+ `npm version patch` - 升级补丁版本号

发布一个纯 ESM 包，需要做以下几件事：

1. 添加`"type": "module"`到 package.json：node 会使用 esm 加载器运行，默认是 cjs
2. 使用`"exports": "./index.js"`替换`"main": "index.js"`：限制 esm 的导出范围，防止隐式导入
3. 添加`"engines"`字段限制 node 运行版本号
4. 删除`use strict`：esm 不需要这个严格声明
5. 将代码中所有的 cjs 导入导出替换为 esm 导入导出
6. 使用完整的相对文件路径引入文件，文件名和扩展名
7. 使用`node:*`协议导入 node 内置模块：防止混淆，明确告诉 node 导入一个内置的模块

如果是 typescript 发布一个纯 esm 包，则和上大致相同：

1. 如上
2. 如上
3. 如上
4. 如上
5. 删除`namespace`并使用`export`
6. 更改`tsconfig.json`中编译目标位 es，即`module: "es2020"`

## NPX

NPX 是自带的包命令执行工具，常用来执行可执行命令，使用`npx command`会自动在`node_modules`中正确的找到命令并执行

<!-- to be updated -->

## 脚本钩子

在执行了`npm install`之后，如果`scripts`中定义了`preinstall`、`install`、`postinstall`等，就会依次执行`scripts`中定义的钩子

## NPM 的替代 Yarn，pnpm

Yarn 主要用来处理 npm 刚开始的缺点，后来 npm 开始逐渐吸取 yarn 的特性，已经并驾齐驱，它们两个互相切换非常容易

+ `yarn dlx` = `npx`

但 yarn 和 npm 都没有解决磁盘占用空间问题，[pnpm](https://www.pnpm.cn/) 做的更好，它的处理方式非常妙，大大节省了硬盘空间

与 npm 的等价命令

| npm             | yarn        | pnpm             |
| --------------- | ----------- | ---------------- |
| npm init        | yarn init   | pnpm init        |
| npm install     | yarn        | pnpm install     |
| npm i `<pkg>`   | yarn add    | pnpm add `<pkg>` |
| npm run `<cmd>` | yarn run    | pnpm `<cmd>`     |
| npm uninstall   | yarn remove | pnpm remove      |

## 推荐全局安装的包

```sh
npm i nrm npm-check-updates pnpm pm2 yarn -g
```

## 处理 URL

::: tip
URL 是为了标识网络资源位置的一种编码，平常说的网页地址就是 URL 地址，它由**协议、主机、端口、路径**四部分组成
:::

`url` 是针对 URL 字符串相关操作的模块，这是它的一些方法

+ `parse(str)`解析一个字符串为 URL 对象
+ `format(obj)`将一个 URL 对象转换为 URL 字符串
+ `parse(str, bool)`解析一个符合 URL 规则的字符串，并返回一个 URL 对象。第二个参数是可选的，如果为`true`，URL 对象的`query`属性是一个对象
+ `resolve(from, to)`将一个 URL 字符串进行解析拼接，返回新的 URL 字符串

```js
url.resolve("https://jinqiu.wang/foo/bar/qux", "/web") // https://jinqiu.wang/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "web") // https://jinqiu.wang/foo/bar/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "./web") // https://jinqiu.wang/foo/bar/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "../web") // https://jinqiu.wang/foo/web
url.resolve("https://jinqiu.wang/foo/bar/qux", "../../web") // https://jinqiu.wang/web
```

`querystring`模块则针对 URL 中的 query 部分，这是它的一些方法

+ `parse(str)`将一个 query 字符串解析成键值对对象
+ `stringify(obj)`将一个键值对对象解析成 query 字符串
+ `escape(str)`将一个 URL 字符串进行百分比编码
+ `unescape(str)`将一个 URL 百分比编码的字符串进行解码

## HTTP 服务

Node.js 原本的用途就是开发一款高性能的 Web 服务器，`http`就是用来创建服务器的模块，它有两种使用方式：

+ 作为客户端时，发起一个 HTTP 请求，获取服务端响应
+ 作为服务端时，创建一个 HTTP 服务器，监听客户端请求并响应

作为服务端模式时，首先需要通过`http.createServer(callback(request, response))`方法创建一个服务器，然后调用`listen()`方法监听端口，每当客户端请求一次，回调函数就会被调用一次

```js
const http = require("http");
http.createServer((request, response) => {
  response.end("Hello，World");
}).listen(3000);
```

`request`保存着客户端的 HTTP 请求头信息，`response`用来设置服务端给客户端的相应信息

Node.js 不会自动响应客户端，必须负责任的使用`response.end()`去响应客户端并结束，因此可以在结束响应之前，在请求的生命周期内运行任何逻辑，如果没有响应，客户端就会挂起，直到超时并结束响应

使用`request(url, callback(response))`可以创建一个客户端，指定请求对象和请求头数据，然后就会返回一个`request`对象，之后就可以将`request`对象作为一个只写数据流来写入数据和结束请求，结束请求之后就调用回调函数

```js
const req = http.request("http://127.0.0.1:3000", res => {})
req.write("");
req.end();
```

请求信息可以在`request`中获取：

+ `request.method`：HTTP 方法
+ `request.url`：请求路径
+ `request.headers`：请求头信息
+ `request.httpVersion`：协议版本

通过`response`处理响应：

+ `response.statusCode`：响应码，默认 200
+ `response.setHeader(field, value)`
+ `response.getHeader(field)`
+ `response.removeHeader(field)`

处理响应操作时，一定要在`response.write()`以及`response.end()`前使用

Node.js 的 HTTP 读取数据时，会触发`data`事件，并将数据块放到其中等待处理，数据块默认是一个 Buffer 对象，只要读入了新的数据块，就会触发`data`事件，一旦读取完毕，就会触发`end`事件

```js
http.createServer((req, res) => {
  req.on('data', chunk => {
    console.log(chunk);
  });
  req.on('end', () => {
    res.end();
  });
});
```

可以使用`req.setEncoding()`来改变默认的数据块编码方式

根据不同的路径进行不同的响应

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

## 网络

`net`模块提供了基于流的 TCP/IPC 服务端和客户端

建立服务端：

```js
const net = require('net');

net.createServer(socket => {
  console.log('客户端已连接');
  socket.on('data', buffer => {
    console.log(buffer, buffer.toString());
  });
  socket.on('end', () => {
    console.log('客户端已断开');
  });
}).listen(8124, () => {
  console.log('server bound');
});
```

建立客户端：

```js
const net = require('net');

const socket = net.connect({
  host: '127.0.0.1',
  port: 8124
});

// 向服务端写入数据
socket.write();
```

## 文件操作

`fs`模块提供了操作系统文件的能力

::: tip
读取文件时，如果不指定编码，则返回 Buffer，大部分异步方法都是错误优先的回调方式
:::

读取文件数据：

```js
// 异步
fs.readFile('data.txt', (err, data) => {
  if(err) return err;
  console.log(data);
});

// 同步
let data = fs.readFileSync('data.txt');
```

写入数据，如果没有该文件，则会尝试创建：

```js
// 异步
fs.writeFile('./text.txt', 'hello, world', err => {});

// 同步
fs.writeFileSync('./data.txt', 'hello, world');
```

`writeFile`是一种覆盖写入，如果想要追加内容，则使用`appendFile`：

```js
// 异步
fs.appendFile('data.txt', '追加内容', err => {})

// 同步
fs.appendFileSync('data.txt', '追加内容');
```

获取目录项：

```js
// 异步
fs.readdir('./', (err, files) => {})

// 同步
const files = fs.readdirSync('./');
```

获取文件的信息：

```js
// 异步
fs.stat('./data.txt', (err, stats) => {
  // 判断是否为目录
  console.log(stats.isDirectory());
  // 判断是否为文件
  console.log(stats.isFile());
  // 文件的大小
  console.log(stats.size);
  // 最后一次被访问的时间
  console.log(stats.atime);
});

// 同步
const stats = fs.statSync('./data.txt');
```

创建目录：

```js
fs.mkdir('./temp/', err => {});
fs.mkdirSync('./temp/');
```

判断路径是否存在：

```js
// 同步
fs.existsSync('./data.txt');

// 异步（已废弃，不推荐使用）
fs.exists('./data.txt', res => {})
```

## 事件触发器

在 Node.js 中很多对象也会触发各种事件，比如对于代表 Web 服务器的`http.Server`来说，可能会触发”接收到请求“，”产生连接错误“等各种事件，针对于不同的事件，都需要不同的事件处理

所有可能触发事件的对象都是一个继承了`EventEmitter`类的子类对象，`EventEmitter`类定义了很多方法，用来处理和事件相关的事情：

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

## Buffer

在内存中数据都是二进制，如果没有提供编码格式，文件操作以及很多网络操作就会将数据作为 Buffer 类型返回

创建 Buffer：

```js
// 分配 11 字节的内存空间，每个字节由两个十六进制组成
const buf1 = Buffer.alloc(11, 'jinqiu.wang');
console.log(buf1.toString()); // jinqiu.wang

// 创建包含指定字符串、数组或缓冲区的新缓冲区，默认编码是 utf8，如果指定了 encoding 参数，则使用该编码
const buf2 = Buffer.from('a');

// 合并缓冲区，用于处理图片的分包上传
const buf3 = Buffer.concat('jinqiu');
const buf4 = Buffer.concat('.wang');
const buf5 = Buffer.concat([buf3, buf4]);
```

在处理网络请求中的数据时，通常使用 Buffer 来进行拼接

## 流

使用`fs`读取的文件会一次性读取到内存中，如果文件过大，很容易造成内存爆满，因为它不能对文件进行分块处理。而流可以有序的实现将一个数据分块的流向另一个地方，可以做到边读边写，甚至可以控制读取或写入文件的速度

流是用于在 Node.js 中处理流数据的抽象接口，`stream`模块提供了用于实现流接口的 API，在 Node.js 中提供了很多流对象。比如 HTTP 服务的响应流，进程的输入输出流。流是可读可写的，或者两者兼之，且所有的流都是`EventEmitter`的实例

Node.js 中有四种基本的流类型：

+ `Writable` - 可写入数据的流
+ `Readable` - 可读取数据的流
+ `Duplex` - 可读可写的双工流
+ `Transform` - 可以在写入或读取数据时修改后转换数据的双工流

```js
// 创建文件的可读流对象
const rs = fs.createReadStream('data.txt');
// 创建文件的可写流对象
const ws = fs.createWriteStream('data-copy.txt');
// 通过流进行拷贝
rs.pipe(ws);
// 监听流的事件
rs.on('data', chunk => {
  console.log(chunk.toString());
});
rs.on('end', () => {
  console.log('拷贝完成');
});
```

HTTP 的流

```js
http.createServer((req, res) => {
  const data = fs.createReadStream('./data.txt');
  data.pipe(res);
});
```

控制流的速率：

```js
const rs = fs.createReadStream("./data.txt", {
  highWaterMark: 1024
});

rs.on("readable", () => {
  let chunk;
  setTimeout(() => {
    if ((chunk = rs.read()) !== null) {
      res.write(chunk);
    }
   }, 1000);
});
```

`highWaterMark`决定缓冲区的大小

对于一个可读流来说，都是以暂停模式开始的，可以使用`read()`来消费它，只要不停的调用它，会一次性返回`highWaterMark`大小的数据块，然而监听`data`事件就能让暂停状态变成流动模式

`pipeline`用于将一些列流传输到一起，并在管道完全完成时收到通知

```js
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
```

## 路径

`path`模块用于处理文件和目录的路径

```js
const path = require('path');

// 拼接路径，sep 在 Windows 下是 \，类 unix 下是 /
console.log(path.join('foo', 'bar', 'baz'));

// 获取文件路径
console.log(path.dirname('./foo/bar.js')); // ./foo

// 获取文件名
console.log(path.basename('./foo/bar.js')); // bar.js

// 获取文件扩展名
console.log(path.extname('bar.js')); // .html
```

## 子线程

`child_process`提供了创建子进程的方法：

```js
const cp = require('child_process')
cp.spawn('node', ['worker.js'])
cp.exec('node worker.js', function (err, stdout, stderr) {
  // todo
})
cp.execFile('worker.js', function (err, stdout, stderr) {
  // todo
})
cp.fork('./worker.js')
```

进程之间的通信：

```js
// parent.js
const cp = require('child_process');
const n = cp.fork('./sub.js');

n.on('message', function (m) {
    console.log('PARENT got message: ' + m);
});
n.send({hello: 'workd'});

// sub.js
process.on('message', function (m) {
    console.log('CHILD got message: ' + m);
});
process.send({foo: 'bar'});
```

<!-- to be updated -->

## 集群

`cluster`模块允许设立一个主进程和若干个`worker`进程，由主进程监控和协调`worker`进程的运行

```js
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
    console.log('是主进程');
    const cpusLength = os.cpus().length // cpu 核数
    for (let i = 0; i < cpusLength; i++) {
        // fork() 方法用于新建一个 worker 进程，上下文都复制主进程。只有主进程才能调用这个方法
        // 该方法返回一个 worker 对象
        cluster.fork();
    }
} else {
    console.log('不是主进程');
    // 运行该 demo 之后，可以运行 top 命令看下 node 的进程数量
    // 如果电脑是 4 核 CPU ，会生成 4 个子进程，另外还有 1 个主进程，一共 5 个 node 进程
    // 其中， 4 个子进程受理 http-server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world');
    }).listen(8000)  // 注意，这里就不会有端口冲突的问题了！！！
}
```

## 工具

`util`模块提供了大量的工具类型的 API

+ `util.promisify(original)`：会将`original`这种错误优先回调风格的函数，进行 Promise 化

```js
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
readFile('data.txt').then(res => {
  console.log(data, data.toString());
});
```

## 压缩

zlib 模块提供了使用 Gzip、Deflate/Inflate、以及 Brotli 实现的压缩功能

## 逐行读取

`readline`模块提供了读取可读流的接口，使用该程序时 Node.js 进程不会关闭，因为在等待输入流中的数据，必须在某个时机手动关闭

```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 监听到行尾输入`\n、\r 或\n\r`时触发
rl.on('line', input => {
  console.log(fb(i));
  // 关闭
  rl.close();
});

function fb(i) {
  if (i == 1 || i == 2) return 1;
  return fb(i - 1) + fb(i - 2);
}
```

## 库

+ [npm-check-updates](https://github.com/raineorshine/npm-check-updates) - 检查 package.json 依赖项版本
+ [nrm](https://github.com/Pana/nrm) - 是一个注册表管理器，用于快速切换下载源
+ [nodemon](https://github.com/remy/nodemon) - 监听 Node.js 应用程序的更改，并自动重启服务器
+ [concurrently](https://github.com/open-cli-tools/concurrently) - 同时执行多个 NPM 命令
+ [live-server](https://github.com/tapio/live-server) - 是一个具有实时重新加载功能的小型开发服务器
+ [rimraf](https://github.com/isaacs/rimraf) - 是一个类似于 UNIX command`rm rf`命令的包，能大大加快移除文件的速度，可以快速的移除`node_modules`了
+ [anywhere](https://github.com/JacksonTian/anywhere) - 快速启动一个静态的文件服务器
+ [Progress](https://github.com/visionmedia/node-progress) - 终端进度条
+ [chalk](https://github.com/chalk/chalk) - 为终端进行着色
+ [nodemailer](https://github.com/nodemailer/nodemailer) - 发送邮件
+ [glob](https://github.com/isaacs/node-glob) - 模式匹配目录文件
+ [commitlint](https://github.com/conventional-changelog/commitlint) - 规范 Git 提交信息
+ [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - 根据 commit 自动生成 CHANGELOG.md

```sh
conventional-changelog -p angular -i CHANGELOG.md -s
```

+ [standard-version](https://github.com/conventional-changelog/standard-version) - 标准化发布版本控制

+ [pm2](https://github.com/Unitech/pm2) - 基于 Node.js 进程的管理进程管理工具

```sh
pm2 start app.js --watch # 以实时监控 app.js 启动，文件发生改动后会自动 reload
pm2 start --name <AppName> app.js  #  app.js 启动，以 AppName 命名该进程
pm2 start --name <AppName> npm -- start  # 启动 npm start 项目
pm2 start --name <AppName>  npm -- run <scripts> -n  # 启动 npm run 项目
pm2 start pm2confg.json # 以配置文件形式启动
pm2 list                # 显示所有应用状态
PM2 show <id|appname>   # 显示某个应用的详细信息
pm2 monit               # 监视所有应用
pm2 log                 # 显示所有进程日志
pm2 log <id|appname>    # 显示某个进程日志
pm2 stop <id|appname>   # 停止某个应用
pm2 stop all            # 停止所有应用
pm2 restart all         # 重启所有应用
pm2 stop <id|appname>   # 重启某个应用
pm2 stop all            # 停止所有应用
PM2 delete all          # 杀死并删除所有应用
PM2 delete <id|appname> # 杀死并删除某个应用
pm2 startup             # 设置开机自启动
pm2 unstartup           # 禁用开机自启动
```

配置文件可用`pm2 init simple`生成：

```js
module.exports = {
  apps: [
    {
      name: 'aurora',
      script: './build/app.js',
      max_memory_restart: '100M',
      instances: 'max',
      instance_var: 'INSTANCE_ID',
      error_file: './log/pm2.error.log',
      out_file: './log/pm2.out.log',
    },
  ],
};
```

比较重要的可用属性

| 字段      | 描述                                                       |
| --------- | ---------------------------------------------------------- |
| instances | 要启动的应用实例数量，可以指定数字，或者指定 “max”自动分配 |
| exec_mode | 启动应用程序的模式，可以是“cluster”或“fork”，默认 fork     |

## 性能优化

在做性能优化前，需要先做 Profile，可以使用 0x 包来生成一个火焰图进行分析：

```sh
npm i 0x -g
```

使用`0x`命令行执行`js`文件，当退出程序时就会立即打开浏览器生成一个火焰图

```sh
0x -o app.js
```

## 参考资料

+ Node.js 高级编程
+ Node.js 权威指南
+ Node.js 实战
+ Node.js 硬实战
+ Node 与 Express 开发
+ 了不起的 Node.js 将 JavaScript 进行到底
+ 深入浅出 Node.js
+ [NodeSchool](https://nodeschool.io/zh-cn/)
+ [基于 Node.js 的轻量级私有仓库](https://verdaccio.org/)
