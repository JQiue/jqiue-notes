---
title: 包和 NPM
category: Web
tags: [Alpha]
author: JQiue
article: false
---

在模块化中，可以将任何文件看成一个模块，但是有些复杂功能可能需要多个模块组成，维护多个模块关系的就是”包“。简而言之，一个包中有一个或多个模块，在 NodeJS 中为了方便开发人员发布、安装和管理包, NodeJS 推出了一个包管理工具：**NPM（Node Package Manager）**

## 包结构

一个完整符合 CommonJS 的包目录应该包含这些文件：

+ bin：存放二进制执行文件的目录
+ lib：存放 JavaScript 代码的目录
+ doc：存放文档的目录
+ test：存放进行单元测试的代码
+ package.json：包描述文件

## 包描述文件和 NPM

包描述文件（package.json）用于表达非代码相关的信息，是一个 JSON 格式的文件，位于包的根目录下，是包的重要组成部分，NPM 的所有行为都与包描述的文件息息相关，package.json 可以有以下字段：

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
+ scripts：脚本说明对象。通常放一些安装、编译、测试和卸载包的快捷命令
+ bin：将包作为命令行工具使用
+ main：指定包中其余模块的入口
+ homepage：包的主页地址
+ os：操作系统支持列表
+ cpu：CPU 架构的支持列表
+ engine：支持的 JavaScript 引擎列表
+ builtin：标明包是为内建在底层系统的标准组件
+ directories：包目录说明
+ implements：实现规范的列表

但对于 NPM 实际需要的字段只有：name、version、description、keywords、repositories、author、bin、main、scripts、engines、dependencies、devDependencies

在安装了 NodeJS 同时，NPM 也自动装好了，NPM 帮助完成了第三方模块的发布、安装和依赖等，通过 NPM，NodeJS 与第三方模块形成了一个良好的生态系统

NPM 由三个独立的部分组成：

+ **网站**：是开发者查找包（package）、设置参数以及管理 npm 使用体验的主要途径
+ **注册表**：是一个巨大的数据库，保存了每个包（package）的信息
+ **命令行工具**：CLI 通过终端运行，开发者通过 CLI 与 NPM 打交道

在此之前，为了确认 NPM 没有随着 NodeJS 安装出现问题，应该先执行一下`npm -v`，这会打印 NPM 的版本信息。在并不熟悉 NPM 命令之前，可以直接执行`npm`以获得帮助信息，而`npm help <command>`会详细查看具体命令说明

在使用 NPM 创建项目之前，目录下应该至少有一个 package.json 文件，它对 NPM 非常重要，可以手动生成，也可以通过`npm init`交互生成。此为初始化命令，会在运行此命令的目录下创建 package.json，同时每行会出现一个问题供选择，这些问题都会被记录到 package.json 中，这种流程式的命令行不是必须的，可以添加`--yes`或`-y`参数来生成默认的 package.json

```json
{
  "name": "",
  "version": "",
  "description": "",
  "author": {},
  "scripts": {},
  "devDependencies": {},
  "dependencies": {}
}
```

接下来开始为项目安装一些所需要的依赖包了，这是 NPM 中最常用的命令，它的命令是`npm install <package_name>`，也可缩写成`npm i <package_name>`，它会在当前目录下创建一个 node_modules 目录，并将所下载的包解压到该目录中，于此同时，它会将依赖的包名写入到 package.json 中的`dependencies`字段里，当安装好依赖包后，就可以在代码中使用`require()`来引入它

::: tip
这个包会从远程的 NPM 官方仓库中下载，由于官方仓库可能较慢，推荐使用以下命令更换淘宝镜像源

```sh
npm config set registry https://registry.npm.taobao.org
```

:::

如果包中有命令行工具，那么需要添加额外的`-g`参数进行全局模式安装，通过全局模式安装的包都被安装到了一个统一的 node_modules 目录中。这并不意味着全局模式的包可以在任意地方被`require()`引用，只是为了将包作为一个全局可用的可执行命令

卸载包使用`npm uninstall <package_name>`，会删除 node_modules 中的包文件，并且会将 package.json 的`dependencies`字段中的相关包名也一并移除掉，这个命令是默认是卸载项目本地的包，卸载全局的包则需要加上`-g`

```sh
npm uninstall <package> --save
```

如果是以 devDependency 方式安装的包，必须使用`--save --dev`

```sh
npm uninstall <package> --save --save
```

::: warning
如果卸载了 NodeJS，则应该手动移除掉`C:\Users\用户\AppData\Roaming\npm`和`C:\Users\用户\AppData\Roaming\npm-cache`，给下一次安装 NodeJS 时带来干净的 npm 包环境
:::

更新包同样也有本地和全局之分，在 package.json 所在路径，运行`npm update`命令，即可实现包的更新，更新全局的包则使用`npm update -g`，这可能很慢，因为依赖太多了

查看全局的包，查看本地的包去掉`-g`

```sh
npm list -g --depth 0
```

写入 package.json

执行``

## 很棒的第三方包

1. [npm-check-updates](https://github.com/raineorshine/npm-check-updates)：检查 package.json 依赖项升级最新版本，只是修改 package.json 文件，需要执行`npm install`更新已安装的包
2. [nrm](https://github.com/Pana/nrm)：是一个注册表管理器，用于快速切换下载源
3. [live-server](https://github.com/tapio/live-server)：是一个具有实时重新加载功能的小型开发服务器
4. [rimraf](https://github.com/isaacs/rimraf)：是一个类似于 UNIX command`rm rf`命令的包，能大大加快移除文件的速度，可以快速的移除`node_modules`了
5. [anywhere](https://github.com/JacksonTian/anywhere)：快速启动一个静态的文件服务器
6. [nodemon](https://github.com/remy/nodemon)：监听 NodeJS 应用程序的更改，并自动重启服务器
7. [lodash](https://github.com/lodash/lodash)：现代 JavaScript 实用工具库
