---
title: Node.js 现代工程指南
article: false
---

::: tip
基于 Node 20.x.x 开始编写
:::

## 核心架构：重新定义高性能

### 运行时哲学：从 V8 到 Libuv

Node.js 的高性能并非源于 JavaScript 语言本身，而是 V8 引擎的高效指令转换与 Libuv 事件循环机制的精密协作。V8 负责将代码压榨至机器码级别的执行效率，而 Libuv 则通过事件驱动的非阻塞 I/O 屏蔽了底层操作系统的复杂性。必须明确：Node.js 是 C++ 编写的异步容器，JavaScript 仅是其暴露给开发者的逻辑契约。

### 异步 I/O 的本质：吞吐量 vs 延迟

异步 I/O 的设计初衷不是为了缩短单次请求的延迟 (Latency)，而是为了最大化系统的吞吐量 (Throughput)。通过将耗时的 I/O 操作挂起并释放执行栈，Node.js 能够以极小的内存开销维系海量并发连接。在架构设计时，必须警惕任何形式的同步阻塞调用，那将直接瘫痪整个事件循环。

### 并发模型：单线程无锁编程与多核利用 (Cluster/Worker)

单线程模型规避了传统多线程编程中的锁竞争与上下文切换开销，但同时也带来了无法直接压榨多核性能的局限。在生产环境，必须通过 Cluster 模式实现进程级的水平扩展，或利用 Worker Threads 处理密集型计算任务。二者的权衡在于：Cluster 侧重于服务的可用性与吞吐，Worker Threads 则用于解决特定计算场景下的主线程阻塞。

### 宿主契约：Node.js 与浏览器的能力边界

尽管共享 V8，但 Node.js 拥有完全不同的宿主能力。浏览器受限于沙箱安全协议，而 Node.js 拥有操作系统原语的完全控制权。在 Node.js 中，禁止使用任何 DOM/BOM 概念，重点应聚焦于 Buffer 处理、文件流管控以及网络协议栈的深度定制。

## 现代模块标准：ESM 全面接管

### 模块终局：ESM 的必然替代性

CommonJS (CJS) 的运行时同步加载机制已沦为技术负债。ESM (ECMAScript Modules) 凭借静态分析能力、极致的 Tree-shaking 效果以及对顶级 await 的原生支持，确立了其作为现代工程唯一合法标准的地位。

### 割裂现实：CJS 与 ESM 的互操作陷阱与性能开销

在混合生态中，通过 import() 动态加载 CJS 虽能维持运行，但必须警惕由此产生的包装层开销与逻辑断层。严禁在 ESM 项目中通过 createRequire 反向引入 CJS，此类做法通常意味着架构层面的设计腐败与治理失控。

### 工程化导出：基于 exports 的权限管控

现代包开发必须废弃传统的 main 字段。强制在 package.json 中配置 exports 映射，明确定义 CJS 和 ESM 的入口路径。这不仅是兼容性适配，更是精细化管控包内部私有成员访问权限的硬性约束。

### 发布清单：纯 ESM 包的强制准则

+ 声明：在 package.json 中声明 "type": "module"。
+ 重构：严禁使用 __dirname 与 __filename，必须切换至 import.meta.url 进行路径解析。
+ 规范：导入语句必须包含完整的文件扩展名（如 .js），遵循原生 ESM 的路径查找逻辑。

## 生产级 API 实战精要

## 异步控制流：从错误优先回调到原生 Promise

错误优先回调（Error-First Callbacks）已退化为底层协议，不再推荐用于业务开发。应用层必须统一采用 async/await 配合 try-catch 进行流控。对于旧版 API，必须立即调用 util.promisify 或引入 fs/promises 模块进行重构。

## 高性能 I/O：流 (Stream) 的分块处理与 Pipeline 模式

传统的 pipe() 在错误处理上存在严重缺陷，极易引发内存泄漏与文件句柄残留。 绝对禁止直接在生产环境使用 readable.pipe(writable)。必须升级为 stream/promises 中的 pipeline 函数，通过其内置的自动清理机制确保数据流的安全关闭。

## 网络编程：构建高吞吐量的 HTTP 服务

Node.js 处理 HTTP 的核心在于对 IncomingMessage 和 ServerResponse 流的控制。在高负载场景下，务必显式设置 keepAlive 以复用 TCP 连接，并合理配置 headersTimeout 与 keepAliveTimeout 以压制慢速连接攻击。

## 全局原语：进程控制 (Process) 与二进制基石 (Buffer)

Buffer 是 Node.js 处理二进制数据的核心。在 2026 年的工程实践中，应优先使用更具语义的 Uint8Array 及其衍生视图，除非涉及特定的 Node.js 底层二进制 API。

## 包管理与依赖治理

### 工具选型：npm, Yarn 与 pnpm 的工程化对比

pnpm 凭借内容寻址存储（CAS）与硬链接机制，已成为现代工程的首选。其严格的非扁平化 node_modules 结构能有效杜绝“幽灵依赖”，这是维持大型复杂项目依赖健壮性的关键。

### 版本确定性：锁文件 (lockfile) 与语义化版本 (Semver)

锁文件是构建一致性的最后防线。必须确保 pnpm-lock.yaml 或 package-lock.json 进入版本管理。对于生产环境，执行安装时必须使用 pnpm install --frozen-lockfile，严禁在构建阶段产生版本漂移。

### 自动化工作流：脚本钩子 (Scripts) 与 NPX 实战

利用 pre-commit 钩子集成 Lint 与类型检查。利用 npx 运行一次性工具，避免将开发辅助工具污染全局环境变量或项目核心依赖。

### 私有生态：NPM 作用域包与发布管控

对于企业级资产，必须使用 @scope 进行命名空间隔离。结合私有镜像仓库（如 Verdaccio 或 Nexus），构建端到端的内部组件分发闭环。

## 性能优化与边界认知

### 生产环境运维：基于 PM2 的进程守护与集群配置

PM2 不仅是简单的进程守候工具，更是单机维度的负载均衡器。利用其 max_memory_restart 策略可以有效压制不可预知的内存抖动，确保服务在极端情况下的自愈能力。

### 性能诊疗：火焰图 (0x) 与 CPU/IO 瓶颈定位

当应用响应变慢时，依靠日志是低效的。必须生成 CPU Profile 并在火焰图中寻找长耗时的热点函数。如果热点出现在原生模块，通常意味着 I/O 阻塞；如果出现在 JS 逻辑，则需优化算法复杂度。

### 避坑指南：识别非索引查询与未限制的并发

+ 非索引查询：数据库慢查询会迅速占满 Node.js 连接池，导致异步回调积压。
+ 未限制的并发：严禁使用 Promise.all 处理海量异步请求。必须使用 p-limit 等工具控制并发上限，防止瞬时压力拖垮下游服务。

### 架构边界：Node.js 的禁区与局限性

Node.js 不是全能银弹。在面对大规模加解密、高性能视频转码或超大规模矩阵运算等 CPU 密集型 场景时，Node.js 往往表现疲软。此时的正确策略不是强行调优，而是将其作为网关层，将重负载逻辑卸载至 Rust 或 C++ 编写的底层模块或微服务中。



JavaScript 的疆域早已突破浏览器沙箱。Node.js 将 V8 引擎嵌入系统层，赋予脚本直接操控文件、网络、进程的能力——这是浏览器安全模型刻意禁止的。其核心并非“用 JavaScript 写后端”，而是通过事件驱动与非阻塞 I/O 模型，在单线程中榨取高并发吞吐。这种设计不是妥协，而是明确取舍：放弃多线程并行，换取无锁编程的确定性；牺牲 CPU 密集型任务效率，换取 I/O 密集场景的极致响应

单线程不等于单核绑定。Node.js 从未依赖 Web Workers（那是浏览器 API），而是通过 cluster 模块派生子进程，或使用 worker_threads 创建轻量级线程。前者以进程隔离换取稳定性，后者以共享内存换取通信效率。选择哪条路径，取决于任务是 I/O 密集还是 CPU 密集

异步 I/O 的价值不在“避免卡顿”——那是前端语境。在服务端，它意味着一个线程可同时处理数千连接。同步模型下，M+N 的延迟是必然；异步模型下，max(M, N) 是理论极限。但极限不等于现实：回调地狱、错误传播断裂、资源泄漏，才是工程落地的真实成本

## 与浏览器环境的本质差异

宿主环境不同，全局契约即不同：

+ 全局对象是`global`，而非`window`
+ 全局`this`默认指向空对象`{}`，而非`window`
+ 无 DOM，只有系统原语

这些不是“区别”，而是边界。试图在 Node.js 中模拟 DOM，或在浏览器中调用 fs，都是对运行时契约的误读

Node.js 运行在服务器时，作为 Web Server，运行在本地时作为打包、构建工具

## 错误优先的回调函数风格：一种过时但必须理解的约定

大多数都是错误优先的回调函数风格，也就是第一个参数是 Error，后面的参数才是结果

```js
fs.readFile('file', (err, data) => {
  if (err) throw err;
  // handle data
});
```

这种模式将控制流与数据流耦合，导致逻辑碎片化。现代代码应禁止直接使用回调风格，转而通过`util.promisify`或原生 Promise API 封装。Node.js 10+ 已全面支持`async/await`，继续编写回调链是对可维护性的主动放弃。

## 模块系统：CJS 与 ESM 的割裂现实

Node.js 同时承载两套模块规范，但它们并非对等共存。

CommonJS（CJS）是历史默认：

```js
const mod = require('./mod');
module.exports = { foo };
```

ECMAScript Modules（ESM）是未来方向：

```js
import mod from './mod.js';
export const foo = {};
```

关键差异不是语法，而是加载时机与作用域：

+ CJS 同步加载，模块缓存在 `require.cache`
+ ESM 异步加载，顶层变量不挂载到 `global`
+ ESM 中无 `__dirname`、`__filename` —— 必须通过 `import.meta.url` 推导
+ JSON 加载在 ESM 中需显式声明：`import data from './data.json' assert { type: 'json' }`

更致命的是互操作陷阱：CJS 可导入 ESM，但返回的是动态`Module`对象，无法解构；ESM 导入 CJS 虽看似平滑，却隐藏了运行时包装开销。**混合项目必须显式声明边界**，否则升级 Node 版本可能引发静默错误。

包入口应优先使用 `exports` 字段替代 `main`，通过条件导出（conditional exports）隔离 CJS/ESM：

```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.cjs"
    }
  }
}
```

这不是可选项，而是现代包发布的强制规范。

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

## 全局变量：少即是多

`global`不是垃圾桶。真正高频使用的全局标识屈指可数：

| 标识                         | 用途                                           |
| ---------------------------- | ---------------------------------------------- |
| `process`                    | 进程控制、环境变量、标准 I/O                   |
| `Buffer`                     | 二进制数据操作（已脱离 global，但无需 import） |
| `console`                    | 日志输出（生产环境应替换为结构化日志库）       |
| `setTimeout` / `setInterval` | 定时器（注意：非精确调度）                     |
| `__dirname`                  | 提供当前模块的目录名（绝对路径）               |
| `__filename`                 | 提供当前模块的文件名（绝对路径）               |
| `module`                     | 当前模块的引用                                 |
| `exports`                    | 导出模块，是`module.exports`的简写方式         |
| `require()`                  | 引入模块、JSON、本地文件                       |
| `URL`                        | 处理 URL 地址的类                              |

这里简单说明几个比较重要的全局变量的用法：

+ `new URL()`：创建一个 URL 对象
+ `require.resolve()`：查询某个模块文件带有绝对路径的文件名
+ `require.cache`：所有已加载模块的缓存区，通过键名来访问已缓存的模块

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

## 包管理：npm 不再是唯一答案

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

### package.lock - 锁文件

是在使用`npm install`时生成的文件，记录包的来源以及更加确切的版本号，以确保别人复制项目时的依赖版本保持一致，这是 package.json 无法做到的（从 Yarn 借鉴过来）。`npm i`时，会有以下行为：

+ 锁文件不存在时，会安装 package.json 中声明版本范围内最高兼容版本，并生成 package.lock.json
+ 锁存在时，会严格按照锁文件版本安装依赖版本

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

## NPM 的替代 Yarn，Pnpm

Yarn 主要用来处理 npm 刚开始的缺点，后来 npm 开始逐渐吸取 yarn 的特性，已经并驾齐驱，它们两个互相切换非常容易

+ `yarn dlx` = `npx`

但 yarn 和 npm 都没有解决磁盘占用空间问题，[pnpm](https://pnpm.io/) 做的更好，它的处理方式非常妙，大大节省了硬盘空间。与 npm 的等价命令：

| npm             | yarn        | pnpm             |
| --------------- | ----------- | ---------------- |
| npm init        | yarn init   | pnpm init        |
| npm install     | yarn        | pnpm install     |
| npm i `<pkg>`   | yarn add    | pnpm add `<pkg>` |
| npm run `<cmd>` | yarn run    | pnpm `<cmd>`     |
| npm uninstall   | yarn remove | pnpm remove      |

## 推荐全局安装的包

```sh
npm i nrm npm-check-updates pnpm pm2 yarn nrm -g
```

## 原生 API 精要

## 处理 URL

::: tip
URL 是为了标识网络资源位置的一种编码，平常说的网页地址就是 URL 地址，它由**协议、主机、端口、路径**四部分组成
:::

`url` 是针对 URL 字符串相关操作的模块，这是它的一些方法

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

## 性能优化：先测量，再行动

没有火焰图（flame graph）的性能优化都是猜测。0x、clinic 等工具可生成可视化调用栈，定位热点函数。

但更常见的问题是：过度优化。Node.js 的瓶颈通常不在 JavaScript 执行，而在：

+ 未索引的数据库查询
+ 未压缩的网络传输
+ 未缓存的重复计算
+ 未限制的并发请求

优化前先问：这是 CPU-bound 还是 I/O-bound？答案决定工具链选择。

```sh
npm i 0x -g
```

使用`0x`命令行执行`js`文件，当退出程序时就会立即打开浏览器生成一个火焰图

```sh
0x -o app.js
```

## 边界：Node.js 不是什么

Node.js 不是通用系统编程语言。它不适合：

+ 实时音视频处理（缺乏低延迟保证）
+ 高频交易系统（GC 停顿不可控）
+ 操作系统内核模块（无 direct hardware access）

它的优势场景始终明确：高并发、I/O 密集、快速迭代的网络服务。超出此边界，便是与运行时对抗。

生态繁荣掩盖不了核心模型的单一，当 Deno 提供安全沙箱，Bun 内置打包器，Node.js 的回应是渐进演进——兼容性优先于革新。这既是优势，也是枷锁。

掌握 Node.js，不是记住 API，而是理解事件循环如何将异步 I/O 转化为吞吐优势，又在何处设下陷阱。技术细节会过时，但对并发模型的判断力，才是长期有效的护城河。

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
