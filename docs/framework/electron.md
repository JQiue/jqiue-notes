---
title: Electron
article: false
---

::: tip 前置知识

+ HTML，CSS，JavaScript
+ Node.js
:::

Electron 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架，基于Chromium 和 Node.js 实现的，这就使得前端程序员可以使用 JavaScript、HTML 和 CSS 轻松构建跨平台的桌面应用。为了弥补 Node.js 和前端技术访问系统 API 方面的不足，Electron 对系统 API 做了封装，比如系统对话框、系统托盘、系统菜单、剪切板等。开发者基于 Electron 开发应用时，可以直接使用 JavaScript 访问这些 API

## Hello, World

`yarn init`初始化项目，pacakge.json 配置如下

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "description": "Hello World!",
  "main": "main.js",
  "author": "JQiue",
  "license": "MIT",
  "scripts": {
    "start": "electron ."
  }
}
```

安装 Electron 依赖

::: danger
一定要先给`.npmrc`添加`electron_mirror="https://npm.taobao.org/mirrors/electron/"`
:::

```sh
yarn add --dev electron
```

创建`main.js`主进程文件，内容如下：

```js
const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

创建`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```

创建预加载文件`preload.js`

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

然后运行`yarn run start`即可运行

## 主进程和渲染进程

## 发布

安装 Electron Forge

```sh
yarn add --dev @electron-forge/cli
```

并执行`npx electron-forge import`

然后使用`make`命令发布程序

## 参考资料

+ Electron 实战
