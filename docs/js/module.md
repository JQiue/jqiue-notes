---
title: 模块化
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

早期的网站将所有代码全部写到一个文件，容易产生污染，JavaScript 最初的作用仅仅是验证表单，后来会添加一些动画，但是这些代码很多在一个文件中就可以完成了

随着前端复杂度提高，为了能够提高项目代码的可读性、可扩展性等。`.js`文件逐渐多了起来，不再是一个文件就可以解决的了，而是把每一个文件当做一个模块，于是出现了这样的引入方式：

```html
<script src="jquery.js"></script>
<script src="jquery_scroller.js"></script>
<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="main.js"></script>
```

即简单的将所有的文件放在一起，优点是相比于使用一个文件，这种多个文件实现最简单的模块化的思想是进步的

缺点是因为每个模块都是暴露在全局的，简单的使用，会导致全局变量命名冲突，当然，也可以使用命名空间的方式来解决。对于大型项目，各种`.js`文件很多，必须手动解决模块和代码库的依赖关系，比如 jQuery 需要先引入，才能引入 jQuery 有关的插件。后期维护成本较高。还会导致依赖关系不明显，难以维护

随着前端的发展，JavaScript 不在局限于表单验证和特效制作上了，经过漫长的过程，JavaScript 终于暴露了自己先天就缺乏的一个功能：模块

虽然前端的 JavaScript 有着更多标准 API，但是对于后端的 JavaScript 来说，规范已经远远落后，有着以下很严重的缺陷：

+ 没有模块系统
+ 标准库少，相对于前端来说
+ 没有标准接口，没有 Web 服务器以及数据库之类的统一接口
+ 缺乏包管理的能力，不能自动加载以及安装依赖

对比其他语言来说，Java 有 import，Python 也有 import，Ruby 有 require 用来解决引入代码的机制。而 JavaScript 通过`<script>`引入代码的方式自然就显得混乱无比，自身根本就没有组织和约束能力，因此必须用命名空间等人为方式来约束代码

模块化能降低代码耦合度，功能模块直接不相互影响，根据定义，每个模块都是独立的，良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护。维护一个独立的模块比起一团凌乱的代码来说要轻松很多

## 非语言级别的模块化解决方案

+ 全局函数模式
+ 命名空间（NameSpace）
+ IIFE 模式
+ 增强的 IIFE 模式

全局函数模式就是把功能封装成不同的全局函数，缺点是随着功能的增加，全局变量也多了起来

```js
function foo() {
  //...
}
function bar() {
  //...
}
```

Namespace 模式减少了全局变量，但本质是对象，外部可以直接修改，不安全

```js
const MODULE = {
  foo: function() {},
  bar: function() {},
};
```

IIFE 模式将数据进行了私有化，外部只能通过暴露的方法操作，提高了安全性，缺点是不能和其他模块产生依赖关系

```js
const MODULE = (function () {
  let value = '';
  // 封装私有化
  const setValue = function (value) {
    this.value = value;
  };
  // 封装私有化
  const getValue = function () {
    return this.value;
  };
  // 向外暴露
  return {
    setValue,
    getValue
  }
})();
```

增强的 IIFE 模式解决了依赖关系，但是引入模块时必须有一定的先后顺序

```js
// 模块一
const module1 = {
  show: function () {
    console.log('module1');
  }
};

// 模块二
(function (globalThis, module1) {
  function foo() {
    module1.show();
  }
  // 给全局对象添加属性来实现暴露
  globalThis.module2 = { foo };
})(globalThis, module1);
```

## 社区遵循的模块化规范

随着时间的发展，JavaScript 社区终于为其制定了相应的规范，其中 CommonJS 规范的提出是一个非常重要的里程碑，它为 JavaScript 提供了一个非常美好的前景，即在任何地方都能运行 JavaScript。JavaScript 不再停留在小脚本的阶段，而可以开发很多富客户端应用：

+ 服务端
+ 命令行
+ 桌面图形
+ 混合应用

当然不止 CommonJS，还有着其他的规范：

+ AMD - 即 Asynchronous Module Definition，随着`require.js`的推广而产出
+ CMD - 即 Common Module Definition，由阿里玉伯提出，随着`sea.js`的推广而产出

由于 Web 标准的推进直接导致 AMD 和 CMD 的过时，本篇并不会记录这两种规范的用法

### CommonJS

CommonJS 是用在服务器端的 Node.js 模块规范，Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，比较适用 Node.js

特点：

+ 方法，变量，属性，函数都是私有的，每个文件就是一个模块，有自己的作用域  
+ 同步加载，模块加载的顺序，按照其在代码中出现的顺序，浏览器端需要先对模块进行编译
+ 只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载时就直接读取缓存结果
+ 模块输出的是值的拷贝

CommonJS 规范规定，每个模块内部都有两个 API：`module`和`require`

`module`变量代表当前模块，这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`

```js
let a, b;

// 写法一
module.exports = {
  a,
  b
}

// 写法二
module.exports.a = b;
module.exports.b = b;

// 写法三
exports.a = b;
exports.b = b;

// 错误的写法：exports 是对 module.exports 的引用，不能直接给 exports 赋值
exports = {
  a,
  b
}
```

`require`是一个方法，用于加载模块，本质是读取并执行一个 JavaScript 文件，返回该模块的 `exports`对象，如果模块输出的是一个函数，则要将函数定义在`module.exports`变量上，后缀名默认为`.js`

+ 如果参数以"/"开头，则代表加载的是一个绝对路径的模块文件
+ 如果参数以"./"开头，则代表加载的是一个相对路径的模块文件
+ 如果参数字符串不带以"./"和"/"开头，则代表加载的是个默认提供的核心模块，比如位于各级的 node_modules 目录的已安装模块

需要注意的是模块总是先从本地开始寻找的

### ES6

暴露模块：分别暴露

```js
export function foo() {
  // ...
}

export function bar() {
  // ...
}
```

暴露模块：默认暴露

```js
export default function() {
  // ...
}
```

引入模块：

```js
import {foo,bar} from 'xxx.js'

import xxx from 'xxx.js'
```

**暴露模块：** exports

+ 分别暴露：只能以对象的形式暴露出去，可以暴露多个，引入模块也需要以对象的形式引入
+ 默认暴露：能够暴露任意数据类型，但是只能暴露一个，暴露什么收据，引入的就是什么数据类型  

**引入模块：** import

**使用：** 因为大部分浏览器目前不认识 ES6 语法，所以需要 babel 和 browserify 来帮助编译

```sh
npm install browserify -g
npm install babel-cli -g
npm install babel-preset-es2015 --save-dev
```

使用 babel 时要在项目根目录创建一个`.babelrc`文件，用于 babel 运行时的控制

```JSON
{
  "presets": ["es2015"]
}
```

编译命令：

```sh
babel 被转换的文件/文件路径 -d 转换后的文件/文件路径
babel src -d build
```

虽然 babel 可以将 ES6 语法转换成 ES5 语法，但是 ES5 语法还包括 CommonJS 语法，所以需要 browserify 继续转换

```sh
browserify build/main.js -o dist/index.js
```

## 语言级别的模块化规范

ES6 的到来，在语法层面上实现了模块功能，成了浏览器和服务器端的通用模块解决方案，这直接导致 CommonJS、AMD、CMD 逐渐成为历史

特点：

+ 自动使用严格模式
+ 静态加载
+ 输出的是值的引用

模块功能主要由两个命令构成：

+ `export` - 用于规定模块的对外接口
+ `import` - 用于导入其他模块

```js
export let foo;
export let bar;
```

此外还有这种写法，和上面是等价的：

```js
let foo;
let bar;

export { foo, bar };
```

不能是这样的：

```js
let foo;
let bar;

// 报错
export foo;
exprot bar;
```

`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系，上面的写法只是将一个值导出，而不是对外的接口

使用`export`命令定义了模块的接口后，就可以使用`import`加载这个模块了

```js
import { foo, bar } from './xxx.js';
```

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面改写接口，但是如果是个对象，改写属性是允许的

另外，`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值

```js
export let foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

变量`foo`的值在 500ms 后会变成`baz`，这和 CommonJS 不一样，CommonJS 会有缓存，不存在动态的值

如果想要导出的模块可以定义名字，可以使用`exports default`，这样不在需要`import`中使用花括号来映射对应的接口

```js
// a.js
export default function () {}
```

```js
// b.js
import foo from 'b.js'
foo();
```

一个模块中只允许有一个`export default`，但是它可以和`export`混用

```js
// a.js
export let x = 1;
export let y = 1;

export default function () {
  console.log(x, y);
}
```

```js
// b.js
import foo, {x, y} from 'a.js'
```

导出时也可以同时接受默认的接口以及映射的接口

## 循环引用

模块之间互相导入就会产生循环引用问题

<!-- to be updated -->