---
title: Webpack 快速上手
category: Web
tags: [Alpha]
author: JQiue
article: false
---

webpack 是一套基于 NodeJS 的"模块打包工具"

在 webpack 刚推出的时候就是一个单纯的 JS模 块打包工具,可以将多个模块的 JS 文件合并打包到一个文件中，但是随着时间的推移、众多开发者的追捧和众多开发者的贡献

现在webpack不仅仅能够打包JS模块, 还可以打包CSS/LESS/SCSS/图片等其它文件

## 为什么要打包模块

模块化虽然解决了代码了维护性和复用性，但是由于导入资源变多了，请求次数变多了，网页性能也就变差了，因此需要一个打包工具将所有的模块合并到一个文件中，再引入到网页中去，而webpack恰恰就是这样的工具

## 安装

不推荐全局安装 webpack，这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败

```shell script
npm install --save--dev webpack
npm install --save--dev webpack-cli
```

::: tip
在webpack 4+版本后，需要额外的安装CLI
:::

## 核心概念

webpack 处理模块时，它递归构建一个关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle，但是仍需告诉 webpack 该从哪里开始，这里需要理解四个核心概念：

+ 入口
+ 输出
+ loader
+ 插件

### 入口

入口指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的，每个依赖项随即被处理，最后输出到称之为 bundles 的文件中

### 输出

出口告诉 webpack 应该在哪里输出它创建的bundle，以及如何命名这些文件

### loader

我们知道的是webpack仅仅只是一个JavaScript打包器，但是通过loader也可以打包非JavaScript文件

### 插件

插件可以用于执行更为广泛的任务，比如打包优化和压缩，可以处理各种各样的任务
