---
title: Webpack 快速上手
category: Web
tags: [Alpha]
author: JQiue
article: false
---

::: info 前置知识

+ Node.js
:::

webpack 是一套基于 NodeJS 的"模块打包工具"，在刚推出的时候就是一个单纯的 JS 模块打包工具，可以将多个模块的 JS 文件合并打包到一个文件中，但是随着时间的推移、众多开发者的追捧和众多开发者的贡献，现在 webpack 不仅仅能够打包 JS 模块, 还可以打包 CSS/LESS/SCSS/图片等其它文件

模块化虽然解决了代码了维护性和复用性，但是由于导入资源变多了，请求次数变多了，网页性能也就变差了，因此需要一个打包工具将所有的模块合并到一个文件中，再引入到网页中去，而 webpack 恰恰就是这样的工具

## 安装

不推荐全局安装 webpack，这会将项目中的 webpack 锁定到指定版本，在使用不同的 webpack 版本打包的项目中，可能会导致构建失败

```sh
npm i webpack webpack-cli --save--dev
```

::: tip
webpack 4+ 版本后，需要额外的安装 CLI
:::

## 核心概念

webpack 处理模块时，它递归构建一个关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle，但是仍需告诉 webpack 该从哪里开始，这里需要理解四个核心概念：

+ 入口
+ 输出
+ loader
+ 插件
+ 模式

入口指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的，每个依赖项随即被处理，最后输出到称之为 bundles 的文件中

出口告诉 webpack 应该在哪里输出它创建的 bundle，以及如何命名这些文件

webpack 仅仅只是一个 JavaScript 打包器，但是通过 loader 也可以打包非 JavaScript 文件

而插件可以用于执行更为广泛的任务，比如打包优化和压缩，可以处理各种各样的任务

模式会应用不同的打包优化

## 最小的使用示例

> 假设已经初始化了一个项目，且安装好了 webpack

在项目中创建一个`src/index.js`文件，随便写点代码，终端中直接执行`npx webpack`，不用理会终端中的信息，此时 webpack 会在根目录创建一个`dist`文件夹，里面是一个打包好的`main.js`文件，这个文件和`src/index.js`中的代码是一样的

然而还没完，webpack 可是一个模块打包器，才打包一个文件根本看不出来什么，继续在`src`中创建一个`foo.js`文件，随便写点代码，在`src/index.js`中使用模块语法引入，在进行一次打包，此时发现还是生成了一个`dist/main.js`文件，然后创建一个`src/index.html`，写好 HTML 基本结构，并引入`main.js`就可以看到代码效果了

::: tip
Webpack 支持 ES module, CommonJS, AMD 等模块化规范，随便使用
:::

## 使用配置文件

上面的 webpack 打包都是默认的配置，如果不按照默认的配置进行创建文件，就无法打包成功，而 webpack 提供了一个配置文件用来控制打包行为，执行`npx webpack`首先会看根目录是否有`webpack.config.js`文件，如果有就按照配置打包，没有就按照默认的方式进行打包

`webpack.config.js`掌控着 webpack 的一切行为，这里可以配置入口，输出，loader，插件，模式，文件的标准结构是这样的：

```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [],
  module: {},
};
```

对于 mode 来说用来控制开发环境和生产环境的打包策略，具有两种取值`development/production`

`entry`则告知入口文件的位置，相对于配置文件，`output`控制输出目录以及打包后的文件，这里借用的 NodeJS 的`path`模块来进行路径拼接

<!-- more -->

## 使用 loader

## 使用 plugins

## 热更新

每次手动输入`webpack`打包，太繁琐，可以直接配置 package.json 的`script`项用来简化操作，但这仍然解决不了需要手动进行打包的过程

webpack 提供了一个`--watch`的额外参数用来监听文件的改变，一旦发生改变就会自动打包，这很是方便

虽然打包已经自动化了，但是仍然需要手动刷新网页查看效果，此时就需要用到`webpack-dev-server`，不仅具备自动打包功能，还能自动打开生成的`index.html`，同时能够实时重新加载，而不必按下 f5 刷新网页，需要进行额外的安装

```js
npm install --save-dev webpack-dev-server
```

执行`npx webpack-dev-server --open`即可，为了避免手动输入，在 package.json 的`script`项配置`"serve": "webpack-dev-server --open"`即可

## 别名

## 很棒的 plugins
