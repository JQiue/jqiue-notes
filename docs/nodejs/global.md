---
title: 全局变量
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

在 NodeJS 中存在一个全局作用域，可以定义一些不需要使用任何模块加载即可使用的变量、函数或类，同时也预先定义了一些全局方法及全局类，它们都是`global`的属性，在交互模式下声明的变量和方法都是`global`的属性，但是在脚本模式下不是

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

+ `new URL()`：创建一个 URL 对象

## 模块

+ `require.resolve()`：查询某个模块文件带有绝对路径的文件名
+ `require.cache`：所有已加载模块的缓存区，通过键名来访问已缓存的模块

::: tip 卸载模块
`delete require.cache(require.resolve('module'))`
:::

## 进程

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
// 查看 Node 版本
console.log(process.version);
// 查看环境变量
console.log(process.env);
// 查看 node 程序的 pid
console.log(process.pid);
// 杀死某个进程
process.kill(pid);
// 查看当前运行 Node 的终端路径
console.log(process.cwd());
```

退出 NodeJS 程序：

```js
process.exit();
```

## 定时器

Node 可以在不依赖其它工具的情况下使用`console.time()`和`console.timeEnd()`完成基准测试，`console.time()`记录当前时间，`console.timeEnd()`打印执行到这里的持续时间

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
}()

/* 执行结果
foo
hello, world
timeout
*/
```
