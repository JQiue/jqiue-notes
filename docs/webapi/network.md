---
title: 网络请求
category: Web
article: false
---

浏览器与服务器之间的通信基础是 HTTP 协议，用户通过网址或表单向服务器提交请求，服务器接收请求并响应给浏览器

在没有异步编程的情况下，浏览器发送请求时必须刷新网页才能重新渲染数据，这是用户无法容忍的阶段，于是产生了后端服务器渲染 HTML 页面的方式解决，这种方式叫做混编模式，比如 PHP 和 JSP。在 HTML 文档中编写对应的脚本程序，后端程序处理成能够被浏览器解析的 HTML 代码响应给浏览器，这样就实现了动态网页。这种方式导致了 HTML 代码难以维护，所以程序员必须熟悉所有的程序代码编写

Ajax 是一个伟大的创造，它不是一个具体的技术，它是多项技术的结合，包括 HTML、CSS、JavaScript、DOM、XML、以及最重要的`XMLHttpRequest`构造函数。当使用了这些技术，就可以实现不用重载页面而刷新数据的功能。Ajax 中的“x”代表 XML，它是一种具有结构性的标记语言，通常用于 Web 之间的数据传输

简而言之，就是通过 JavaScript 向服务器发送 HTTP 请求，并处理服务器返回的数据，通过 DOM 渲染到 HTML 文档中对应的位置，这个过程中不会刷新整个网页，这就是 Ajax 使用流程

## XMLHttpRequest

JavaScript 发起 HTTP 请求必须通过`XMLHttpRequest`创建一个请求对象，本身是一个内置的构造函数，是浏览器与服务器通信的接口。通过请求对象的`open(method, url, async)`方法来设置请求方式：

+ `method`：请求方法
+ `url`：请求地址
+ `async`：异步请求还是同步请求，`true`表示异步请求

```js
/* 创建请求对象 */
const xhr = new XMLHttpRequest();
/* 设置请求方式 */
xhr.open('GET', 'https://www.httpbin.org/get', true);
```

`send`方法才是发送请求的具体步骤，`send`方法的参数只有在 POST 请求下才有用，而 GET 请求则不用填写

```js
/* 发送请求 */
http.send();
```

`readyState`是请求对象发送请求时各阶段的状态，分别是：

+ `0`：请求未初始化，未调用`open()`方法
+ `1`：与服务器连接已建立，调用`open()`方法和`send()`方法
+ `2`：请求已经接收，接收响应数据
+ `3`：请求处理中，处理响应数据
+ `4`：请求完成，可以使用全部的数据

```js
const xhr = new XMLHttpRequest();
console.log(xhr.readyState); // 0

xhr.open('GET', 'https://httptest.jinqiu.wang/get', true);
xhr.send();
console.log(xhr.readyState); // 1
```

`onreadystatechange`是监听`readyState`属性变化的事件，且只能监听到`2，3，4`状态的改变

```js
/* 如果是一个成功的请求，它将被调用三次，readyState 的值依次为 2, 3, 4 */
/* 如果是失败的请求，只会调用一次，readyState 直接变成 4 */
xhr.onreadystatechange = function (){
  console.log(xhr.readyState);
}
```

`readyState`只是表示请求对象的生命周期：创建->初始化请求->发送请求->接收数据->处理数据->完成，而资源的请求状态由`status`保存，它是 HTTP 状态码

请求对象会将服务器的响应数据保存在`responseText`或`responseXML`中，这取决于响应头中的`Content-Type`，其中`responseXML`会直接看做成一个`document`对象

`response`可以替代`responseText`，必须通过`responseType`设置响应体类型：

+ `text`：字符串形式
+ `json`：JSON 对象形式

`timeout`可以设置请求头的超时时间，如果超时了就会触发超时时间

默认在同域的情况下，发送一个请求会携带 Cookie，但在跨域时不会，此时可以设置请求对象的`withCredentials=true`来携带，这里涉及到安全问题，还得看服务端同不同意

`abort()`方法可以用于终止请求，同时会触发一个`abort`事件

`setRequestHeader()`方法用于设置请求头信息

这是一个发送 GET 请求的例子，它将获取一个 UUID

::: normal-demo GET 请求

```html
<button id="btn">获取 UUID</button>
```

```js
document.getElementById('btn').addEventListener('click', function () {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.httpbin.org/uuid', true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
      alert(JSON.parse(xhr.response).uuid);
    }
  }
}, false);
```

:::

大多数情况下，没有必要引入一些库来发送请求，而是自己手动封装，减少了项目的依赖

::: normal-demo 封装请求

```html
<button id="btn">获取 UUID</button>
```

```js
document.querySelector('#btn').addEventListener('click', function () {
  http.get('https://www.httpbin.org/uuid', function (res) {
    alert(res.uuid);
  });
});

const http = (function () {
  const xhr = new XMLHttpRequest();
  if (!xhr) throw new Error('浏览器不支持发起异步请求');
  function formatData(data) {
    let str = '';
    for (const key in data) {
      str += key + '=' + data[key] + '&';
    }
    return str.replace(/&$/, '');
  }
  function _doAjax(option) {
    const opt = option || {},
      method = (option.method || 'GET').toUpperCase(),
      async = option.async || true,
      url = option.url,
      data = option.data || null,
      error = option.error || function () { },
      success = option.success || function () { },
      complete = option.complete || function () { };
    if (!url) throw new Error('未传入 URL');
    xhr.open(method, url, async);
    xhr.send(method === 'GET' ? null : formatData(data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) success(JSON.parse(xhr.responseText));
      if (xhr.status === 404) error();
      complete();
    }
  }
  return {
    ajax: function (option) { _doAjax(option); },
    get: function (url, callback) {
      _doAjax({
        method: 'GET',
        url: url,
        success: callback
      });
    },
    post: function (url, data, callback) {
      _doAjax({
        method: 'POST',
        url: url,
        data: data,
        success: callback
      });
    }
  }
})();
```

:::

```js
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

  // 处理 Data
  function formatData(data) {
    let str = '';
    for (const key in data) {
      str += key + '=' + data[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  // 封装请求过程
  function _doAjax(option) {

    // 初始化请求参数
    const opt = option || {},
      method = (option.method || 'GET').toUpperCase(),
      async = option.async || true,
      url = option.url,
      data = option.data || null,
      error = option.error || function () { },
      success = option.success || function () { },
      complete = option.complete || function () { };
  
    if (!url) throw new Error('未传入 URL');

    // 设置请求
    xhr.open(method, url, async);
    // 根据 type 发送指定类型请求
    xhr.send(method === 'GET' ? null : formatData(data));
    // 监听请求状态
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) success(JSON.parse(xhr.responseText));
      if (xhr.status === 404) error();
      complete();
    }
  }

  return {
    ajax: function (option) {
      _doAjax(option);
    },
    get: function (url, callback) {
      _doAjax({ method: 'GET', url: url, success: callback });
    },
    post: function (url, data, callback) {
      _doAjax({ method: 'POST', url: url, data: data, success: callback });
    }
  }
})();
```

## Fecth

Fetch 是一种现代请求技术，提供了一个全局的方法`fetch(url, [options])`，它会返回一个 Promise

```js
fetch(url, options);
```

`options`可以有以下选项：

+ `method`: 请求方法，如 GET（默认）、POST
+ `headers`: 请求头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量
+ `body`: 请求的 body 信息：可能是一个 Blob、BufferSource (en-US)、FormData、URLSearchParams 或者 USVString 对象

Fetch 会解析响应头，用来检查是否请求成功，这时还没有响应体，如果无法建立连接，或者因为一些其他的问题导致请求失败，Promise 就会 reject。成功发送请求后，会将信息封装到`response`对象中，包含可以读取状态的属性

+ `status` - 状态码
+ `statusText` - 状态信息
+ `ok` - 请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299
+ `headers` - 响应头信息，可以被迭代

```js
fetch(url, options).then(response => {});
```

`headers`有很多方法，但只有以下方法最有用

+ `get(key)` - 用于获取某个字段的值
+ `keys()/values()` - 返回键名或键值
+ `forEach(callback(key, value))` - 遍历所有的键和值

`response`会根据 Content-Type，提供不同的读取方法：

+ `response.text()`：得到文本字符串
+ `response.json()`：得到 JSON 对象
+ `response.blob()`：得到 Blob 对象
+ `response.formData()`：得到 FormData 表单对象
+ `response.arrayBuffer()`：得到 ArrayBuffer 对象

::: tip
只能使用一个读取方法，否则就会报错，都是异步的，返回的都是 Promise 对象
:::

## WebSocket

HTTP 协议有一个缺陷，通信只能由客户端发起，如果想要知道服务端的状态，必须隔一段时间轮询服务器获取最新的状态。当然轮询的效率非常低，因为它不停的发生连接并中断，这对于实时信息非常不利

WebSocket 是一种网络通信协议，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，解决了轮询的问题。WebSocket 建立在 TCP 协议之上，服务器端的实现比较容易

与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器

数据格式比较轻量，性能开销小，通信高效

可以发送文本，也可以发送二进制数据

没有同源限制，客户端可以与任意服务器通信

协议标识符是 ws（如果加密，则为wss），服务器网址就是 URL

`WebSocket('url')`对象作为一个构造函数，用于新建 WebSocket 实例，客户端就会与服务器进行连接

实例对象的`webSocket.readyState`返回当前状态：

+ CONNECTING：值为 0，表示正在连接
+ OPEN：值为 1，表示连接成功，可以通信了
+ CLOSING：值为 2，表示连接正在关闭
+ CLOSED：值为 3，表示连接已经关闭，或者打开连接失败

实例对象的事件有：

+ onopen - 连接成功后的回调函数
+ onclose - 连接关闭后的回调函数
+ onmessage - 收到服务器数据后的回调函数
+ onerror - 报错时的回调函数

实例对象的`send()`方法用于向服务器发送数据

::: normal-demo 示例

```html
<button id="connect">连接</button>
<button id="close">关闭</button>
```

```js
let ws = null;

document.getElementById('connect').addEventListener('click', function () {
  ws = new WebSocket("wss://echo.websocket.org");

  ws.onopen = function(e) { 
    console.log("Connection open ..."); 
    ws.send("Hello WebSockets!");
  };
  ws.onmessage = function(e) {
    console.log( "Received Message: " + e.data);
  };
  ws.onclose = function(e) {
    console.log("Connection closed.");
  };
}, false);

document.getElementById('close').addEventListener('click', function () {
  ws.close();
}, false);
```

:::

对于 WebSocket 来说，服务端也要有自己的实现

## 文件上传

<!-- todo -->

## 跨源策略

一般在浏览器发送一个 HTTP 请求时，可能就会遇到浏览器禁止请求的现象

当一个请求发出者和接收者不属于同一个域，那么这个请求就会被浏览器所拦截，所谓的同一个域即：**协议、地址、端口号**都要相同，否则就是跨域请求

解决方案：

+ CORS - 跨域资源共享，由后端解决，后端请求头配置了`Access-Control-Allow-Origin`则允许跨域，则浏览器不会拦截（推荐）
+ JSONP - 利用 script 请求时不会触发跨域的限制，需要前后端配合（不推荐）
