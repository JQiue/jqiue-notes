---
title: 关于 Web 前端的一切
category: Web
article: false
---

这里主要记录前端开发中的所有工程技术

## Lint

在计算机科学中，lint 是一种工具的名称，用来标记代码中，某些可疑的，不具有结构性的语句，是一种静态程序分析工具

Lint 工具的优势：

+ 避免低级bug，找出可能发生的语法错误
+ 提示删除多余的代码
+ 确保代码遵循最佳实践
+ 统一团队的代码风格

### JavaScriptLint

在 JavaScript 发展的过程中出现过很多很多 lint 工具，比如：

+ JSLint
+ JSHint
+ ESLint

JSLint 可以说是最早出现的 JavaScript 的 lint 工具，但是它及其具有个人风格，这让自由的人很难接受，虽然它仍然还在更新。由于 JSLint 的规则让人无法接受，所以基于 JSLint 的 JSHint 出现了，在 JSLint 的基础上增加了很多配置项，给了开发者很大的自由

ESLint 是下一代 JS Linter 工具，但是速度远远不如 JSLint。随着 ES6 的出现，由于 JSLint 短期内无法提供支持，而 ESLint 只需要有合适的解析器就能进行语法检查，这时 Babel 为 ESLint 提供了支持，让 ESLint 最快的成为了支持 ES6 语法的 lint 工具

```sh
npm install -g eslint
```

在项目中使用`eslint --init`，一问一答后就会在根目录中生成`.eslintrc.js`文件

此时使用`ESlint <file/folder>`可对目录中的代码进行检查

### CSSLint

## prettier

是一款代码格式化工具，它不同于 Lint，只是做一些代码风格检查

## CSS 预处理器

众所周知，CSS 具有大量重复的代码，这看起来很不优雅，CSS 预处理器帮忙做到了简化，常见的预处理器有：

+ Sass
+ Less

Sass 是最成熟的预处理器，它的后缀文件一般为`scss`或`sass`，`sass`以严格的缩进语法来书写，省略了大括号和分号，而`scss`和平常的`css`类似

嵌套规则：

```scss
/* css */
.header span {
  color: red;
}

/* scss */
.header {
  span {
    color: red;
  }
}

/* sass */
.header
  span
    color: red
```

在嵌套规则中引用父选择器

```scss
/* css */
.header span {}
.header span:active {}
.header span:hover {}

/* scss */
.header {
  span {
    &:active {}
    &:hover {}
  }
}

/* sass */
.header
  span
    &:active
    &:hover
```

变量 - 任何符合 CSS 取值都可以定义，甚至能参与表达式计算

```scss
/* css */
.title {
  color: #666;
}
.subtitle {
  color: #666;
}
.titletitle {
  color: #666;
}

/* scss */
$text-color: #666;
.title {
  color: $text-color;
}
.subtitle {
  color: $text-color;
}
.titletitle {
  color: $text-color;
}
```

当一个代码很大的时候，可以被拆分一个单独的 Sass 文件引入，文件最好以`_`开头，否则会单独编译出一个 CSS 文件，通过`@import`语法导入

```scss
/* foo.scss */
span {
  color: red;
}
```

引入时不需要加`_`

```scss
@import 'foo'
```

混入 - 抽取公共的代码样式

```scss
/* scss */
@mixin singleline-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text {
  width: 600px;
  @include singleline-ellipsis;
}

.content-text {
  width: 1000px;
  @include singleline-ellipsis;
}

/* css */
.text {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content-text {
  width: 1000px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

且支持传参，使用`$`定义

```scss
/* scss */
@mixin singleline-ellipsis($width) {
  width: $width;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text {
  @include singleline-ellipsis(600px);
}

.content-text {
  @include singleline-ellipsis(1000px);
}

/* css */
.text {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content-text {
  width: 1000px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

还可以搭配`@content`语法，它在被导入的时候被内容所填充

```scss
/* scss */
@mixin ipad {
  @media screen and(min-width: 768px) {
    @content;
  }
}

.text {
  color: red;
  @include ipad {
    color: pink;
  }
}

/* css */
.text {
  color: red;
}

@media screen and (min-width: 768px) {
  .text {
    color: pink;
  }
}
```

## babel

Babel 是一个 JavaScript 转义器，它将使用了最新的 ECMAScript 特性代码转换成了使用最广泛支持的 ES5 特性的等价代码，让开发人员享受新特性带来的爽点同时，避免了大部分兼容性问题

```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

`babel.config.json`文件配置

```json
{
  "presets": ["@babel/preset-env"]
}
```

启动

```sh
babel src --out-dir dist
```

## webPack

模块化虽然解决了代码了维护性和复用性，但是由于导入资源变多了，请求次数变多了，网页性能也就变差了，因此需要一个打包工具将所有的模块合并到一个文件中，再引入到网页中去，而 webpack 恰恰就是这样的工具

webpack 是一套基于 Node.js 的"模块打包工具"，在刚推出的时候就是一个单纯的 JS 模块打包工具，可以将多个模块的 JS 文件合并打包到一个文件中，但是随着时间的推移、众多开发者的追捧和众多开发者的贡献，现在 webpack 不仅仅能够打包 JS 模块, 还可以打包 CSS/LESS/SCSS/图片等其它文件

不推荐全局安装 webpack，在使用不同版本的 webpack 版本打包的项目中，这可能会导致构建失败

```sh
npm i webpack webpack-cli --save-dev
```

::: tip
webpack 4+ 版本后，需要额外的安装 CLI
:::

webpack 处理模块时，它递归构建一个关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle，但是仍需告诉 webpack 该从哪里开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的，每个依赖项随即被处理，最后输出到称之为 bundles 的文件中

这里需要理解四个核心概念：

+ 模式 - 模式会应用不同的打包优化
+ 入口 - 入口指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
+ loader - 通过 loader 也可以打包非 JavaScript 文件
+ 插件 - 插件可以用于执行更为广泛的任务，比如打包优化和压缩，可以处理各种各样的任务
+ 输出 - 出口告诉 webpack 应该在哪里输出它创建的 bundle，以及如何命名这些文件

> 假设已经初始化了一个项目，且安装好了 webpack

在项目中创建一个`src/index.js`文件，随便写点代码，终端中直接执行`npx webpack`，不用理会终端中的信息，此时 webpack 会在根目录创建一个`dist`文件夹，里面是一个打包好的`main.js`文件，这个文件和`src/index.js`中的代码是一样的

然而还没完，webpack 可是一个模块打包器，才打包一个文件根本看不出来什么，继续在`src`中创建一个`foo.js`文件，随便写点代码，在`src/index.js`中使用模块语法引入，在进行一次打包，此时发现还是生成了一个`dist/main.js`文件，然后创建一个`src/index.html`，写好 HTML 基本结构，并引入`main.js`就可以看到代码效果了

::: tip
Webpack 支持 ES module, CommonJS, AMD 等模块化规范，随便使用
:::

上面是默认的配置，如果不按照默认的配置进行创建文件，就无法打包成功。而 webpack 提供了一个配置文件用来控制打包行为，执行`npx webpack`首先会看根目录是否有`webpack.config.js`文件，如果有就按照配置打包，没有就按照默认的方式进行打包

`webpack.config.js`掌控着 webpack 的一切行为，这里可以配置入口，输出，loader，插件，模式：

```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {},
  plugins: [],
};
```

对于`mode`来说用来控制开发环境和生产环境的打包策略，具有两种取值`development/production`

`entry`则告知入口文件的位置，相对于配置文件。`output`控制输出目录以及打包后的文件，这里使用的 Node.js 的`path`模块来进行路径拼接

loader 让 webpack 处理非 JS 文件的模块，有各种各样的 loader，有官方开发的，社区开发的等等，所以每个 loader 都是一个独立的模块需要被安装，webpack 会根据`module`中的规则来匹配对应的 loader，并应用它。假如想要在 webpack 中使用 babel，则可以使用 babel-loader

```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [],
};
```

`rules`通过`test`来匹配对应文件，并应用对应的 loader 程序，`exclude`是排除 loader 对一些文件的操作

插件比 loader 的范围更加广泛，有官方插件和社区插件等，都是独立的模块，一般插件都是提供的构造函数，插件的用法要看具体的插件文档。比如打包完成后通常需要手动引入 js 文件到 HTML 中，而一些插件，比如`html-webpack-plugin`会自动完成这些工作

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
};
```

webpack 允许多个入口，比如说有两个 HTML 文件，配合`html-webpack-plugin`应该这么用

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // 配置多个入口
  entry: {
    index: './src/index.js',
    page: './src/page.js'
  },
  output: {
    filename: '[name].js',  // 自动生成对应的文件名
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 第一个 HTML 文件所需要的选项
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html', // 输出的文件名
      chunks: ['index'] // 指定某个入口合并在 HTML 中
    }),
    // 第二个 HTML 文件所需要的选项
    new HtmlWebpackPlugin({
      template: 'page.html',
      filename: 'page.html',
      chunks: ['index'] 
    }),
  ],
};
```

每次手动输入`webpack`打包太繁琐，虽然可以直接配置`script`用来简化操作，但这仍然解决不了需要手动进行打包的过程。webpack 提供了一个`--watch`的额外参数用来监听文件的改变，一旦发生改变就会自动打包，这很是方便，已经实现打包自动化。但这仍然需要手动刷新网页查看效果，此时就需要用到`webpack-dev-server`，不仅具备自动打包功能，还能自动打开生成的`index.html`，同时能够实时重新加载，而不必按下 f5 刷新网页，需要进行额外的安装

```js
npm install --save-dev webpack-dev-server
```

执行`npx webpack-dev-server --open`即可，为了避免手动输入，在 package.json 的`script`项配置`"serve": "webpack-dev-server --open"`即可

### 很棒的 plugins

<!-- more -->

## swc

SWC 是一个基于 Rust 编写的高性能 JavaScript 转义器，它对标 Babel，比 Babel 要快很多

```sh
npm i -D @swc/cli @swc/core

npx swc ./file.js
```

## esbuild

esbuild 是新一代打包器，它对标于 Webpack，速度与之更快

```sh
npm install esbuild -D

npx esbuild app.js --bundle --outfile=out.js
```

## mock

常见的 Mock 方案：

+ 代码侵入 - 写死数据，切换真实的环境非常麻烦
+ 请求拦截 - 生成随机数据，但无法模拟增删改查的情况，只支持 XMLHttpRequest

Mock.js 是一种模拟 JSON 数据的前端技术，目的是为了解决后端 API 没有上线，而前端没有数据进行填充的问题，使用 Mock 可以生成大量的测试数据，让前端专注于自己

两种安装方式：

+ 浏览器环境：引入`mock.js`库
+ Node.js 环境：`npm i mockjs`

### 生成数据

`Mock`是 Mock.js 提供的全局对象，使用它来做一些工作，按照官方的示例来看一看会生成什么样的数据

```js
const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
});

console.log(data);

/* 
生成的数据如下：

{
  "list": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}

*/
```

这看起来很简单，`Mock.mock()`会根据传入的模板对象来生成数据对象，模板对象中的每一个属性都由 3 个部分组成：属性名、生成规则、属性值，`'name|rule': value`

`'list|1-10'`表示生成 1 ~ 10 条数据，而`'id|+1': 1`表示每条数据的属性名为`id`，且从`1`开始自增长

生成规则是可选的，如果没有则默认生成一条，且值不会具有变化

生成规则有 7 种格式可选：

1. `'name|min-max': value`
2. `'name|count': value`
3. `'name|min-max.dmin-dmax': value`
4. `'name|min-max.dcount': value`
5. `'name|count.dmin-dmax': value`
6. `'name|count.dcount': value`
7. `'name|+step': value`

虽然有这么多生成规则，但是具体的生成含义是根据属性值来确定的

当属性值为字符串时：

+ `'name|min-max': string`：重复拼接 min ~ max 次字符串
+ `'name|count': string`：重复拼接 count 次字符串

当属性值为数字时：

+ `'name|+1': number`：属性值自动加 1，初始值为 number。
+ `'name|min-max': number`：生成 min ~ max 之间的整数
+ `'name|min-max.dmin-dmax': number`：生成 min ~ max 之间的整数且小数部分保留 dmin ~ dmax 位

当属性值为布尔值时：

+ `'name|1': boolean`：随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2
+ `'name|min-max': value`：随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)

当属性值为对象时：

+ `'name|count': object`：从对象中随机选取 count 个属性
+ `'name|min-max': object`：从对象中随机选取 min ~ max 个属性

当属性值为数组时：

+ `'name|1': array`：从数组中随机选取 1 个元素
+ `'name|+1': array`：按照顺序选取 1 个元素
+ `'name|min-max': array`：重复数组元素拼接 min ~ max 次数组
+ `'name|count': array`：重复书元素拼接 count 次数组

当属性值为函数时：

+ `'name': function`：执行函数，返回值为最终值

当属性值为正则时：

+ `'name': regexp`：根据正则生成字符串

### 占位符

属性值中还可以使用占位符，使用`@`标记后面的字符串，占位符本质上引用的是`Mock.random`中的方法

### 扩展

### 拦截

<!-- more -->

## Multirepo 和 Monorepo

Monorepo 可以理解为：利用单一仓库来管理多个 packages 的一种策略或手段，与其相对的是我们接触最多的 Multirepo

可以看项目结构来区分：

```sh
# monorepo目录结构
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```

```sh
# multirepo-a 目录结构
|-- multirepo-a
|   |-- src 
|   |   |-- feature1              # feature1 目录
|   |   |-- feature2              # featrue2 目录
|   |-- package.json              # 整个项目依赖

# multirepo-b 目录结构
|-- multirepo-b
|   |-- src 
|   |   |-- feature3              # feature3 目录
|   |   |-- feature4              # featrue4 目录
|   |-- package.json              # 整个项目依赖
```

可以很清楚的看到它们之间的差异：

+ Monorepo 目录中除了会有公共的 package.json 依赖以外，在每个 sub-package 子包下面，也会有其特有的 package.json 依赖
+ Multirepo 更倾向与在项目制中，将一个个项目使用不同的仓库进行隔离，每一个项目下使用独有的 package.json 来管理依赖

目前，搭建 Monorepo 项目主要有两种方式：

+ Lerna + yarn workspace
+ pnpm

```sh
|-- monorepo-demo              
|   |-- packages                  # packages 目录
|   |   |-- compiler              # compiler 子包
|   |   |-- reactivity            # reactivity 子包
|   |   |-- shared                # shared 子包
```

随后，在根目录以及每一个子包目录下都执行一遍 npm init -y 命令，让其创建一个 package.json 文件到

```sh
|-- monorepo-demo              
|   |-- packages                  # packages 目录
|   |   |-- compiler              # compiler 子包
|   |   |   |-- package.json      # compiler 子包特有的依赖
|   |   |-- reactivity            # reactivity 子包
|   |   |   |-- package.json      # reactivity 子包特有的依赖
|   |   |-- shared                # shared 子包
|   |   |   |-- package.json      # shared 子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```

接着，修改根目录下的 package.json 文件：

```json
{
  "name": "MyVue", // 避免pnpm安装时重名
  "private": true,  // 标记私有，防止意外发布
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

进入到每一个子包中，依次修改 package.json

```json
{
  "name": "@MyVue/compiler", // 避免安装时跟@vue/* 重名
  "version": "1.0.0",
  "description": "@MyVue/compiler",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

最后回到根目录，创建pnpm-workspace.yaml文件，并撰写如下内容：

```yaml
packages:
  - 'packages/*'
```

至此，Monorepo 项目结构已经初步搭建完毕，此时的目录结构如下：

```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
|   |-- pnpm-workspace.yaml       # pnpm配置文件
```

依赖分为两部分，第一部分是公共依赖，第二部分是特有依赖

公共依赖是所有子包都使用的包，在根目录安装即可

```sh
pnpm install eslint typescript -w
```

特有依赖是子包只有自身依赖的包：

```sh
pnpm install lodash -r --filter @MyVue/shared
```

::: tip
`-r`表示在 workspace 区执行命令，`--filter` 表示在在哪个包下执行
:::

Monorepo 相比 Multirepo 就像把鸡蛋都装到一个篮子里
