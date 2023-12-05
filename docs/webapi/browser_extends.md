---
title: 浏览器扩展开发
category: Web
article: false
---

::: tip
基于 Chrome 内核浏览器扩展
:::

扩展是定制浏览体验的小软件程序，它们可以让用户以多种方式调整浏览器的功能和行为，扩展是建立在诸如 HTML、JavaScript 和 CSS 等 Web 技术之上的。它们运行在一个独立的沙箱执行环境中，并与浏览器交互。提供如下功能:

+ 生产力工具
+ 网页内容丰富
+ 信息聚合
+ 娱乐和游戏

## manifest.json

扩展必须拥有这个文件才可以被安装，必须包含以下字段：

```json
{
  "manifest_version": 3,
  "name": "",
  "description": "",
  "version": "",
  "icons": {},
}
```

虽然大多数扩展的`manifest_version`版本是 2，但为了支持现代浏览器，Google 推荐升级到 3。`name`定义了扩展的名称, `description`定义了扩展的描述，`version`定义了扩展的版本，`icons`定义了扩展相关图标文件的位置

> 更多字段前往<https://developer.chrome.com/docs/extensions/mv3/manifest/>

## 弹出页

如果没有在 Manifest 中声明`action`字段，左击只会显示默认的浏览器上下文菜单，这个字段的作用就是为鼠标左击扩展时弹出的页面

```json
{
  "action": {
    "default_popup": "./popup/popup.html",
    "default_icon": "./images/popup.png",
    "default_title": "my extends"
  },
}
```

`default_popup`定义了当用户单击扩展图标时所显示页面的文件位置，`default_icon`属性定义了相应图标文件的位置，`default_title`定义了当用户鼠标悬停于扩展图标上所显示的文字

这个地方的页面是可以省略掉很多东西的，比如`title`，这对于扩展没有任何意义，弹出也会在用户点击扩展图标时打开，关闭后就会销毁

::: caution

1. 不要在其中保留数据
2. 不要让弹出页太大
:::

## 内容脚本

扩展可以对用户的当前浏览的页面进行操作，实际上是对 DOM 的操作，通过 Manifest 的`content_scripts`字段可以指定将哪些脚本何时注入到页面中，当用户访问这些页面时，相应脚本便会自动执行

```json
{
  "content_scripts": [
    {
      "matches": [
        "https://www.bilibili.com/*"
      ],
      "js": [
        "./scripts/content.js"
      ],
      "css": [
        "mask.css"
      ]
    }
  ],
}
```

`content_scripts`的值是一个数组，其中每个元素可以包含`matches`，`js`，`css`等属性。其中`matches`定义了哪些页面会被注入脚本，`js`定义要注入的脚本，`css`定义了要注入的样式。当然还有其他属性：

+ `exclude_globs`：定义了哪些页面不会被注入脚本
+ `include_globs`：是全局 URL 匹配
+ `run_at`：定义了何时进行注入
+ `all_frames`：定义脚本是否会注入到嵌入式框架中

::: tip
如果 URL 匹配 mathces 值的同时也匹配 include_globs 的值，会被注入。如果 URL 匹配 exclude_matches 的值或者匹配 exclude_globs 的值，则不会被注入
:::

被注入的脚本只共享页面的 DOM，不会共享页面自带的命名空间，这意味着两个脚本是互相独立的，变量不会互相干扰，当然也无法互相访问

## 常驻后台服务

扩展一般在用户访问页面的时候运行，Chrome 允许扩展自动运行并常驻后台来实现一些特定的功能，这利于弹出页或者选项页进行状态的更新，在 Manifest 中使用`background`声明后台脚本

```json
{
  "background": {
    "service_worker": "background.js"
  }
}
```

`service_worker`用于定义后台脚本的位置，后台脚本是没有 UI 的

在后台服务中可以使用`onInstalled`事件来监听扩展安装完成

```js
chrome.runtime.onInstalled.addListener(() => {});
```

在后台服务中，必须同步注册监听事件，不能异步注册

## 选项页

有一些扩展允许用户进行个性化设置，这样就需要向用户提供一个选项页面，通过`options_page`定义选项页的位置。一旦声明了选项页，用户右击扩展图标时会显示“扩展选项”字眼，点击它就可以跳转到选项页

```json
{
  "options_page": "./option/option.html"
}
```

## 扩展 API

浏览器为扩展程序提供了特有的 API，大多数 API 都不支持在注入脚本中访问的

> 从 <https://developer.chrome.com/docs/extensions/reference/> 查看更多

## 扩展页面之间的通信

有时需要让扩展中的多个页面之间，或者不同扩展的多个页面之间相互传输数据，以获得彼此的状态。比如在弹出页中修改状态，弹出页将这个状态传给后台服务脚本

Chrome 提供了 4 个有关扩展页面间相互通信的接口，分别是`runtime.sendMessage`、`runtime.onMessage`、`runtime.connect`和`runtime.onConnect`

其中`runtime.sendMessage`、`runtime.onMessage`支持在注入脚本中访问

如果想要弹出页和后台服务进行通信，可以使用以下方式发送消息

```js
chrome.runtime.sendMessage("Hello", function (response) {
  console.log(response);
});
```

对应的，后台服务要监听这个消息

```js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message == "Hello") {
    sendResponse("Hello from background.");
  }
});
```

## 扩展权限

通常情况下，为了安全性，扩展的权限是受限的，扩展支持三种类型的权限声明：

+ `permissions`：直接授予权限
+ `optional_permissions`：跟`permissions`是类似，但用户在运行时授权
+ `host_permissions`：包含一个或多个提供对一个或多个主机的访问权的匹配模式

```json
{
  "permissions": [
    "tabs",
    "bookmarks",
    "unlimitedStorage"
  ]
}
```

> 从 <https://developer.chrome.com/docs/extensions/mv3/declare_permissions/> 看更多权限

## 网络请求

扩展不受跨域限制，但是必须在 Manifest 中声明需要跨域的权限

```json
{
  "permissions": [ "*://*.jinqiu.wang/*" ]
}
```

此时扩展可以使用网络请求技术了

## 存储

扩展可以使用以下方式来持久化数据：

+ localStorage
+ 扩展 API
+ Web SQL

对于一般的设置可以使用第一种，对于稍微复杂的使用第二种，Chrome 为扩展提供了对应的 API 用于将数据保存在硬盘，它可以看作`localStorage`的改进版，内容脚本可以直接访问这个 API 读取数据，不必通过后台服务

使用存储  API 必须先声明`storage`权限，存储 API 提供了两种储存区域，分别是 sync 和 local，前者会根据用户的 Google 账户自动同步数据，当无网络时，sync 和 local 对数据的读写一致

每种区域又提供了五种方法用于操作数据：

+ `get(key, callback(result))`：如果 key 是字符串则和 localStorage 一致，如果是数组相当于一次性获取多个数据
+ `set(items, callback())`：items 为对象类型，如果属性值是字符串，数字，数组则存储的格式不会变，如果是对象或  函数，则会被存储为`{}`，如果是日期和正则，会被存储为他们都在字符串形式
+ `remove(keys, callback())`：删除某个或多个数据
+ `clear(callback())`：清除所有的数据
+ `getBytesInUse(key, callback(bytes))`：获取一个数据或多个数据占用的总空间，单位是字节

```js
chrome.storage.sync.get(keys, function(result){});
chrome.storage.sync.set(items, function(){});
chrome.storage.sync.remove(keys, function(){});
chrome.storage.sync.clear(function(){});
chrome.storage.sync.getBytesInUse(keys, function(){});
```

同时还提供了`onChanged`事件，当数据发送改变时就会触发

```js
chrome.storage.onChanged.addListener(function(changes, namespace){
  console.log('Value in '+ namespace +' has been changed:');
  console.log(changes);
});
···
