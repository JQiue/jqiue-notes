---
title: 包管理器：NPM
category: Web
tags: [NodeJS, NPM, Alpha]
author: JQiue
article: false
---

在模块化中，可以将任何文件看成一个模块，但是有些复杂功能可能需要多个模块组成，维护多个模块关系的就是”包“，简而言之，一个包中有一个或多个模块，在 NodeJS 中为了方便开发人员发布、安装和管理包, NodeJS 推出了一个包管理工具：**NPM（Node Package Manager）**

在安装了 NodeJS 同时，NPM 也自动装好了，通过 NPM 相关操作就能够管理我们所需要的包

NPM 由三个独立的部分组成：

+ **网站**：是开发者查找包（package）、设置参数以及管理 npm 使用体验的主要途径
+ **注册表**：是一个巨大的数据库，保存了每个包（package）的信息
+ **命令行工具**：CLI 通过终端运行，开发者通过 CLI 与 NPM 打交道

## 创建 package.json

每一个通过 NodeJS 环境下创建的项目，都会有一个 package.json 文件，该文件描述了整个项目的模块关系，package.json 遵循 JSON 格式的规范

手动创建：将文件命名为`package.json`放入项目的根目录下，它可以是空的，比如：

```json
{}
```

使用 NPM 命令生成：

```sh
npm init
```

此为初始化命令，会再运行此命令的目录下创建 package.json，同时每行会出现一个问题供选择，这些问题都会被记录到 package.json 中，这种流程式的命令行不是必须的，可以添加`--yes`或`-y`参数运行`npm init`命令来生成默认的 package.json，这么做只会问作者是谁

### 配置项

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

1. name 是最重要的字段，包名和版本一起构成了唯一标识符，它的取值有一定的规则，不能是已经发布的包名
2. version 是很重要的字段，说明包的版本
3. description 描述有助于其他用户发现这个包
4. author 是一个人，人是具有 name 字段的对象，author 一般为 npm 账户名，其 email 和url 是可选的
5. scripts 是一个包含脚本命令的字典，一般用于简化命令操作
6. devDependencies 是开发依赖
7. dependencies 是运行依赖

## NPM 命令操作

NPM 是通过命令行来管理包的，因此就涉及到对包安装，卸载以及更新

安装包有两种方式：本地安装和全局安装，安装的包都会在规定的`node_modules`目录中

### 本地安装和全局安装

如果想从自己的模块中使用 Node.js 中的`require`方法来依赖某个包，则应该安装在本地，它会在运行命令的目录下创建`node_modules`目录并安装在其中，这是 npm 的默认安装方式

```sh
npm install <package_name>
```

如果某个包只是想当作命令行工具使用它，则推荐全局安装这个包，它会被安装在`C:\Users\用户\AppData\Roaming\npm`的`node_modules`目录中，这个目录中的包是可以在任何项目中使用的

```sh
npm install <package_name> -g
```

::: tip
由于官方仓库地址较慢，推荐使用以下命令更换淘宝镜像源

```sh
npm config set registry https://registry.npm.taobao.org
```

:::

### 卸载包

和安装相似的是，卸载本地的包是默认的行为，卸载全局的包则需要加上`-g`

```sh
npm uninstall <package>
```

但此命令只会删除`node_modules`下的文件，不会移除 package.json 列表依赖，这时候需要`--save`

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

### 更新包

更新包同样也有本地和全局之分，在 package.json 所在路径，运行`npm update`命令，即可实现包的更新，更新全局的包则使用`npm update -g`，这可能很慢，因为依赖太多了

### 查看包

查看全局的包，查看本地的包去掉`-g`

```sh
npm list -g --depth 0
```

### 写入 package.json

执行``

## 很棒的第三方包

1. [npm-check-updates](https://github.com/raineorshine/npm-check-updates)：检查 package.json 依赖项升级最新版本，只是修改 package.json 文件，需要执行`npm install`更新已安装的包
2. [nrm](https://github.com/Pana/nrm)：是一个注册表管理器，用于快速切换下载源
3. [live-server](https://github.com/tapio/live-server)：是一个具有实时重新加载功能的小型开发服务器
4. [rimraf](https://github.com/isaacs/rimraf)：是一个类似于 UNIX command`rm rf`命令的包，能大大加快移除文件的速度，可以快速的移除`node_modules`了
5. [anywhere](https://github.com/JacksonTian/anywhere)：快速启动一个静态的文件服务器
6. [nodemon](https://github.com/remy/nodemon)：监听 NodeJS 应用程序的更改，并自动重启服务器
7. [lodash](https://github.com/lodash/lodash)：现代 JavaScript 实用工具库
