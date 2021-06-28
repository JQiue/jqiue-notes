---
title: Ajax
category: Web
tab: 前端
author: JQiue
article: false
---

浏览器与服务器之间的通信基础是 HTTP 协议，用户通过网址或表单向服务器提交请求，服务器接收请求并响应给浏览器

在没有异步编程的情况下，浏览器发送请求时必须刷新网页才能重新渲染数据，这是用户无法容忍的阶段，于是产生了后端服务器渲染 HTML 页面的方式解决，这种方式叫做混编模式，比如 PHP 和 JSP。在 HTML 文档中编写对应的脚本程序，后端程序处理成能够被浏览器解析的 HTML 代码响应给浏览器，这样就实现了动态网页。这种方式导致了 HTML 代码难以维护，所以程序员必须熟悉所有的程序代码编写。

Ajax 是一个伟大的创造，它不是一个具体的技术，它是多项技术的结合，包括 HTML、CSS、JavaScript、DOM、XML、以及最重要的`XMLHttpRequest`，当使用了这些技术，就可以实现不用重载页面而刷新数据的功能。Ajax 中的“x”代表 XML，它是一种具有结构性的标记语言，通常用于 Web 之间的数据传输

简而言之，就是通过 JavaScript 向服务器发送 HTTP 请求，并处理服务器返回的 XML，通过 DOM 渲染到 HTML 文档中对应的位置，这个过程中不会刷新整个网页，这就是 Ajax 使用流程

## 请求对象

JavaScript 发起 HTTP 请求必须通过`XMLHttpRequest`创建一个请求对象，本身是一个内置的构造函数，是浏览器与服务器通信的接口，通过请求对象的`open(method, url, async)`方法来设置请求方式：

+ `method`：请求方法
+ `url`：请求地址
+ `async`：异步请求还是同步请求，`true`表示异步请求

其中对象的`send()`方法才是发送请求的具体步骤，`send()`方法的参数只有在 POST 请求下才有用，而 GET 请求则不用填写

## 请求状态和状态监听

`readyState`是请求对象发送 HTTP 的各阶段的状态，分别是：

+ `0`：请求未初始化，未调用`oepn()`方法
+ `1`：与服务器连接已建立，调用`open()`方法和`send()`方法
+ `2`：请求已经接收，接收响应数据
+ `3`：请求处理中，处理响应数据
+ `4`：请求完成，可以使用全部的数据

`onreadystatechange`是监听`readyState`变化触发的事件，且只能监听到`2，3，4`状态的改变

::: warning
`readyState`只是表示请求对象的生命周期：创建->初始化请求->发送请求->接收数据->处理数据->完成，而资源的请求状态由`status`保存
:::

## 响应数据

请求对象会将服务器的响应数据保存在`responseText`或`responseXML`中，这取决于响应头中的`Content-Type`，其中`responseXML`会直接看做成一个`document`对象

这是一个发送 GET 请求的例子，它将获得请求方的 IP

::: demo GET 请求

```html
<a id="ajax-example1">获取 IP 地址</a>
<p id="ajax-example2"></p>
```

```javascript
document.getElementById('ajax-example1').addEventListener('click', function () {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.httpbin.org/get', true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
      document.getElementById('ajax-example2').innerHTML = JSON.parse(xhr.responseText).origin;
    }
  }
}, false);
```

:::

## 请求的封装

大多数情况下，没有必要引入一些库来发送请求，而是自己手动封装，减少了项目的依赖

::: demo 封装请求

```html
<a id="ajax-example3">获取 IP 地址</a>
<p id="ajax-example4"></p>
```

```javascript
const http = (function () {

  const xhr = new XMLHttpRequest();

  if (!xhr) throw new Error('浏览器不支持发起异步请求');

  function formatData(obj) {
    const str = '';
    for (const key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  function _doAjax(opt) {
    const opt = opt || {},
      type = (opt.type || 'GET').toUpperCase(),
      async = opt.async || true,
      url = opt.url,
      data = opt.data || null,
      error = opt.error || function () { },
      success = opt.success || function () { },
      complete = opt.complete || function () { };
  
    if (!url) throw new Error('未传入 URL');

    xhr.open(type, url, async);
    xhr.send(type === 'GET' ? null : formatData(data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) success(JSON.parse(xhr.responseText));
      if (xhr.status === 404) error();
      complete();
    }
  }

  return {
    ajax: function (opt) {
      _doAjax(opt);
    },
    get: function (url, callback) {
      _doAjax({
        type: 'GET',
        url: url,
        success: callback
      });
    },
    post: function (url, data, callback) {
      _doAjax({
        type: 'POST',
        url: url,
        data: data,
        success: callback
      });
    }
  }
})();

document.getElementById('ajax-example3').addEventListener('click', function () {
  http.get('https://www.httpbin.org/get', function (res) {
    document.getElementById('ajax-example4').innerHTML = res.origin
  });
})
```

:::

```javascript
/* 
 * 支持 GET，POST 请求
 * 只有 3 个方法
 * 1. ajax(option)
 * 2. get(url, callback)
 * 3. post(url, data, callback)
 * 
*/
const http = (function () {

  const xhr = new XMLHttpRequest();
  if (!xhr) throw new Error('浏览器不支持发起异步请求');

  // 处理 Date
  function formatData(obj) {
    let str = '';
    for (const key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  // 封装请求过程
  function _doAjax(opt) {

    // 初始化请求参数
    const opt = opt || {},
      type = (opt.type || 'GET').toUpperCase(),
      async = opt.async || true,
      url = opt.url,
      data = opt.data || null,
      error = opt.error || function () { },
      success = opt.success || function () { },
      complete = opt.complete || function () { };
  
    if (!url) throw new Error('未传入 URL');

    // 设置请求
    xhr.open(type, url, async);
    // 根据 type 发送指定类型请求
    xhr.send(type === 'GET' ? null : formatData(data));
    // 监听请求状态
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) success(JSON.parse(xhr.responseText));
      if (xhr.status === 404) error();
      complete();
    }
  }

  return {
    ajax: function (opt) {
      _doAjax(opt);
    },
    get: function (url, callback) {
      _doAjax({ type: 'GET', url: url, success: callback });
    },
    post: function (url, data, callback) {
      _doAjax({ type: 'POST', url: url, data: data, success: callback });
    }
  }
})();
```
