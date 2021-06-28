---
title: 客户端存储
category: Web
tab: 前端
author: JQiue
article: false
---

存储方式|存储类型|访问限制|存储时长|适用场景
---|---|---|---|---
Cookie|格式化字符串|同源，可自定义访问域|自定义时长|用户认证
sessionStorage|k-v，仅字符串|同标签下的同域名|当前会话|当前页音视频的播放进度
localStorage|k-v，仅字符串|同域名，可不同的标签|永久存储|本地缓存
WebSQL|关系型数据库|同域名|永久存储|大量的本地缓存
IndexedDB|文档型数据库|同域名|永久存储|大量的本地缓存

客户端存储提供了网页能够将数据存储在浏览器上的技术，这有益于在弱网环境下的浏览体验，浏览器提供了一些 API 来实现了这种技术，当网络正常时就请求服务器获得数据，否则就访问本地存储中的数据

## Cookie

Cookie 是服务器发送到用户浏览器并保存在本地的一种数据，它会在浏览器下次向同一服务器发送请求时被携带，这种操作使得无状态的 HTTP 拥有了一种记录稳定状态的可能

```javascript
document.cookie
```

`document.cookie`用于获取可从该位置访问的 Cookie，每条 Cookie 都以分号和空格分隔，每一条都是`key=value`这种键值对方式，当需要添加一条 cookie 时，就直接赋值即可

```javascript
document.cookie = "name=foo"
```

当没有该条 Cookie 时，会添加到所有的 Cookie 中，这种方法一次只能对一个 Cookie 进行设置或更新

`document.cookie`返回所有 cookie，得到指定 cookie 的值是非常麻烦的

```javascript
let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)keyName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
```

但是可以借助一些专门处理 cookie 的库来简化处理

::: details cookies.js

```javascript
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
```

:::

一条 cookie 的写入，不仅有必须写入的 name 和 value 还有一些其他的可选参数，比如：

+ expires：规定 cookie 有效期（GMT）
+ domain：规定 cookie 的域名
+ path：规定 cookie 的路径
+ secure：规定 cookie 是否通过 https 所访问（boolean/null）

这是一个限制有效期 cookie 的例子：

```javascript
document.cookie = "test=time; expires=" + new Date().toString();
```

::: tip
时间戳应该是一个 GMT 格式
:::

## 本地存储和会话存储

本地存储是一种将数据永久的存储在本地的技术，被浏览器当作 API 的方式提供，它是`window.localStorage`，只要为这个对象绑定一些自定义的属性就可以实现数据的存储，因为它是公共的，能被所有的网页程序进行读写，且关闭网页时数据也不会丢失

```javascript
localStorage.testData = '测试数据'
console.log(localStorage.testData) // '测试数据'
```

对话存储针对一个会话进行数据存储，当网页被关闭时数据就会删除，不应该用于长期存储的应用，同时只会对当前页面公开，通过`window.sessionStorage`进行数据操作

```javascript
sessionStorage.testData = '测试数据'
console.log(sessionStorage.testData) // '测试数据'
```

本地存储和会话存储的接口都会返回`Storage`类型，`Storage`的机制是通过键值对形式来存储的，它还有一些其他属性和方法来实现更强大的功能

+ `Storage.length`：返回键值对的数量
+ `Storage.key(index)`：根据索引返回 key
+ `Storage.getItem(key)`：根据 key 返回 value
+ `Storage.clear()`：删除所有的键值对
+ `Storage.removeItem(key)`：根据 key 删除指定的键值对
+ `Storage.setItem(key, value)`：添加新的键值对

::: tip 存储类型
无论如何，被存储的类型都会被转换为字符串，如果要存储对象类型，则应该将对象转换为字符串类型，在取出时进行解析
:::

## Web SQL

本地存储和会话存储虽然可以实现简单的对象存储，但是对于复杂的关系数据处理时，就力不从心了，在 HTML5 中新增了 Web SQL Database 关系型数据库，它是遵循 SQL 标准的，每一个遵循 Web SQL 的浏览器都会内嵌一个本地的 SQL 数据库

```javascript
/**
 * openDatabase(databaseName, version, desc, estimatedSize)
 * databaseName: 访问的数据库名称，如果没有就会创建
 * version: 版本信息
 * desc: 描述数据库的信息
 * estimatedSize: 数据的大小
 */
var db = window.openDatabase('mydb', '1.0', '测试的数据库', 1024 * 1024);
```

基本的增删改查：

```javascript
// CREATE
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE test_table(id, name, age)');
})
// INSERT
db.transaction(function (tx) {
  tx.executeSql('INSERT INTO test_table VALUES ("10001", "JQiue", 18)');
})
// UPDATE
db.transaction(function (tx) {
  tx.executeSql('UPDATE test_table SET name="wjq",age=22 WHERE id = 10001');
})
// SELECT
db.transaction(function (tx) {
  tx.executeSql('select * from test_table', [], function (tx, result) {
    console.log(result); // 返回结果集对象
  })
})
```

所有的操作都在`transaction(callback(tx))`事务方法中进行，`executeSql(SQL, [], callback(tx, result))`用来执行具体的 SQL 语句，`executeSql`也支持 SQL 的预处理，用`?`在语句中占位，并在第二个参数中传入一个预处理参数的数组：

```javascript
db.transaction(function (tx) {
  tx.executeSql('INSERT INTO test_table VALUES (?, ?, ?)', [10002, 'foo', '23']);
})
```

## IndexedDB

IndexedDB 是浏览器中提供的另一种本地数据库，它和 WebSQL 不同，更接近于 NoSQL，内部采用对象存储存放数据，所有的类型数据都可以存入，在对象中，所有的数据都是以键值对的形式保存，每个数据记录都有一个唯一主键，且 IndexedDB 是异步的，不会产生浏览器阻塞的情况，用户可以进行其他操作，防止拖慢网页，同时使用了同源策略机制保证安全，存储空间非常大，且支持二进制存储

对于 IndexedDB 来说，数据库是对象存储的容器，每一个数据库都有若干个对象存储，类似于关系型数据库的表格，对象存储中保存的是每一条数据记录，类似于关系型数据库的行

```javascript
const request = indexedDB.open('mydb', 1);
let db;

// 每一次打开数据库失败时触发
request.onerror = function (event) {
  console.log('打开失败');
};

// 每一次打开数据库成功时触发
request.onsuccess = function (event) {
  db = event.target.result;
  console.log('打开成功');
};

// 只有第一次打开数据库时触发
request.onupgradeneeded = function (event) {
  db = event.target.result;
};
```

浏览器提供了`indexedDB`来打开一个数据库，同时会返回一个请求对象，这个对象监听三种事件用于处理数据库打开时的回调函数，其中，`onupgradeneeded`事件特别重要，数据存储对象只能在这里定义

```javascript
request.onupgradeneeded = function (event) {
  db = event.target.result;
  db.createObjectStore("persons", {keyPath: "id"});
};
```

`createObjectStore`用于定义存储对象，以及主键相关的约束，`autoIncrement: true`可以设置字段为默认整数自增

::: danger
最好在第一次创建数据库时就定义好对象存储，否则之后将无法定义了
:::

一旦创建了对象存储，就可以对数据进行增删改查了

```javascript
request.onsuccess = function (event) {
  db = event.target.result;
  const tx = db.transaction(['persons'], 'readwrite');
  const persons = tx.objectStore('persons');
  // 添加一条数据
  persons.add({id: 1, name: 'foo', age: 23});
  // 修改一条数据
  persons.put({id: 1, name: 'bar', age: 23});
  // 删除一条数据
  persons.delete(1); // 传入 key
  // 获取一条数据
  persons.get(1).onsuccess = function (event){
    console.log(event.target.result);
  }
};
```

操作数据的一切都在事务中进行，`transaction([], 'mode')`用于决定操作哪些对象存储，第一个参数传入对象存储的名字，可以传入多个，第二个参数决定事务的模式，至此就会返回一个包含对象存储的事务对象，通过事务对象的`objectStore('objectStorename')`方法取出对应的存储对象进行数据操作，由此可见 IndexedDB 的 api 特别复杂

IndexedDB 也支持建立索引，默认情况下只能搜索主键，一旦对字段建立索引就可以搜索被索引字段了

```javascript
const request = indexedDB.open('mydb', 1);
let db;

request.onupgradeneeded = function (event) {
  db = event.target.result;
  db.createObjectStore("persons", {keyPath: "id"});
  // 对 name 字段建立索引
  db.createIndex('name', 'name', {unique: false});
};

request.onsucess = function (event) {
  db = event.target.result;
  const tx = db.transaction(['persons'], 'readwrite');
  const persons = tx.objectStore('persons');
  persons.add({id: 1, name: 'foo', age: 23});
  // 通过索引字段搜索
  persons.index('name').get('foo').onsucess = function (event) {
    console.log(event.target.result) // {id: 1, name: 'foo', age: 23}
  }
};
```

## 缓存存储

它最初是为 service workers 建立的，可以缓存任何 HTTP 网络请求
