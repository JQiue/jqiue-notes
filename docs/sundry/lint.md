---
title: lint 如何教你做事
category: 知识分享
author: JQiue
article: false
---

在计算机科学中，lint 是一种工具的名称，用来标记代码中，某些可疑的，不具有结构性的语句，是一种静态程序分析工具

Lint 工具的优势：

+ 避免低级bug，找出可能发生的语法错误
+ 提示删除多余的代码
+ 确保代码遵循最佳实践
+ 统一团队的代码风格

## JavaScriptLint

在 JavaScript 发展的过程中出现过很多很多 lint 工具，比如：

+ JSLint
+ JSHint
+ ESLint

JSLint 可以说是最早出现的 JavaScript 的 lint 工具，但是它及其具有个人风格，这让自由的人很难接受，虽然它仍然还在更新。由于 JSLint 的规则让人无法接受，所以基于 JSLint 的 JSHint 出现了，在 JSLint 的基础上增加了很多配置项，给了开发者很大的自由

ESLint 是下一代 JS Linter 工具，但是速度远远不如 JSLint。随着 ES6 的出现，由于 JSLint 短期内无法提供支持，而 ESLint 只需要有合适的解析器就能进行语法检查，这时 Babel 为 ESLint 提供了支持，让 ESLint 最快的成为了支持 ES6 语法的 lint 工具

ESlint 基于 Node.js 的 package.json 文件

```sh
npm install -g eslint
```

在项目中生成配置文件：

```sh
eslint --init
```

在使用`eslint --init`后，会出现很多用户配置项，一问一答后就会在根目录中生成`.eslintrc.js`文件

此时使用`ESlint file/folder`即可对文件中的代码进行检查

## CSSLint
