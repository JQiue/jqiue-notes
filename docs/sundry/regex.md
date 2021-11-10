---
title: 正则表达式，我的神
category: Web
tags: [Alpha]
author: JQiue
article: false
---

## HTML

`<!DOCTYPE html>` 是 HTML5 的标准文档声明方式，浏览器会根据此内容按照最新标准去解析

<meta> 用来表示不能由其它 HTML 元素表示的任何元信息，会控制整个网页的行为，除了具有全局属性还有`charset`、`http-equiv`、`name`、`content`

+ charset 声明了文档的字符编码
+ http-equiv 提供的信息与类似命名的HTTP头部相同
+ name 提供的是文档级别（document-level）的元数据，应用于整个页面
+ content 属性包含http-equiv 或 name 属性的值，具体取决于所使用的值

全局属性作用于任何元素上

字符实体用来转义

HTML 解析会将连续的空格换行解析成一个空格

每个浏览器都有一个默认的 CSS 文件，决定了元素的默认样式

块级和内联有哪些元素，以及特点

HTML5 语义化，和被废弃的标签

语义化表格 `<caption>，<thead>，<tbody>，<tfoot>`

表单，action、method、name、target，multiple 分别有什么用处，

input 元素的类型，属性

新增的 HTML 表单元素和表单属性

超链接，锚点设置方式

多媒体元素

div 和 span

新增 HTML5 元素

## CSS

引入方式：行内，style，link，@import

三大特性：

+ 层叠性：相同的属性可以被后面的属性所覆盖
+ 继承性：一些属性可以被继承
+ 优先级：多个选择器选中同一个标签，应用哪个样式就由优先级来确定

不考虑写在哪个地方，则!important > ID > 类，伪类，属性 > 标签 > 通配符 > 继承 > 浏览器默认

!important用于提升某个直接选中标签的选择器中的某个属性的优先级，可以将被指定的属性提升为最高，只能用于直接选中，不能用于间接选中

当多个选择器混合在一起使用时，必须通过权重的计算来判断优先级，间接选中的不算

1. ID 选择器多的优先级高，如果 ID 选择器相同则看类选择器的个数
2. 类选择器多的优先级高，如果类名选择器相同则看标签选择器的个数
3. 以此类推...
4. 如果都一样，则谁写在后面就使用谁

媒体类型用于在不同的媒体上应用不同的样式，比如：screen（默认值）、print、all 有两种用法：

+ link 中使用 media 指定
+ 在样式规则中使用 @media type {}

选择器：标签，id，类，通配符，属性选择器

属性选择器是根据已存在的属性名或属性值匹配元素：

+ [attribute]：存在 attribute 的元素
+ [attribute="value"]：存在 attribute 为 value 的元素
+ [attribute*="value"]：存在 attribute，且值包含 value 的元素
+ [attribute$="value"]：存在
+ [attribute~="value"]：

盒模型

标准和怪异盒子

宽高，最小和最大宽高，百分比宽高

垂直方向产生外边距折叠，距离取决于最大的外边距

margin-top 问题会导致子元素的外边距失效，父元素被顶下来，给父元素设置border解决

display 取值为 none 或 inline-block 时，元素会怎么样

visibility 控制元素的可见性，不会移除元素

行高是每一行的高度，并不是盒子的高度，没有盒子的高度会被行高撑开，内容在行高中是垂直居中的，只需要高度和行高一样

行间距 = 行高 - 内容的高度，行高比内容的高度要大，就会产生行空隙，这就是行间距

具有约束性尺寸的盒子，会产生内容溢出，可以通过 overflow 控制

可替换元素：img，audio，video，script，iframe，无法使用 CSS 来控制其中的内容

BFC

浮动，清除浮动

flex

形变

动画

## JavaScript

八种数据类型，原始数据类型存放到栈中，引用数据类型存放到堆中，栈区由编译器自动释放，堆区由开发者分配释放，如果没有释放，则在程序结束后被垃圾机制回收

null == undefined 返回 true
null === undefined 返回 false

数据类型检测，typeof 数组、对象、null都会被判断为 object。instanceof 可以正确判断对象的类型，但不能判断基本类型

typeof NaN 返回 number，使用 isNaN 或 Number.isNaN 进行判断，前者会转换类型，后者不会

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

判断数组可以使用以下方式：

+ 原型链：[].__proto__ === Array.prototype;
+ Array.isArray([]);
+ obj instanceof Array
+ Object.prototype.toString.call([]).slice(8, -1) === 'Array'

0.1 + 0.2 != 0.3，原因，解决方案：使用toFixed()

Object.is() 判断两个值是否相等，一般情况下和 === 相同，但是处理了 -0 和 +0 不相等，以及 NaN 是相等的

包装类：在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象

`+`会产生隐式转换，两边都会被转换为字符串，其它情况会被转换为数字
`==`会让两边尽量转换成 number

object.assign和扩展运算符都是浅拷贝

var，let，const

箭头函数，没有 this，this 指向永远不会改变，也不能通过call()、apply()、bind()等方法改变，不能作为构造函数，迭代器函数

扩展运算符 spread 和 剩余参数 rest

结构赋值

代理和反射

模板字符串

new 操作符原理：

1. 创建空对象
2. 设置原型为函数的 prototype 对象
3. 让函数的 this 指向这个对象，执行构造函数的代码，为对象绑定属性
4. 返回创建的对象

map 本质上键值对形式的集合，但是它的键可以是任意数据类型，而对象的键只能是字符串

weakmap 也是键值对形式的，但是键是弱引用的，其键必须是个对象，一旦引用的对象不再需要，则会自动将对应的键值对销毁

set

weakset

JSON 是一种基于文本的轻量级的数据交换格式，被用来当作数据传输，JSON 和对象不是一回事，提供了 stringify 和 parse 来进行 JSON 的转换处理

类数组对象，通过 Array.from() 进行转换

数组方法

字符串方法

escape、encodeURI、encodeURIComponent

Ajax

Promise

ES module 和 CommonJS，AMD，CMD

严格模式

for in 和 for of

fetch

原型与原型链

闭包

作用域

执行上下文

this/call/apply/bind

async/awati

## Webapi

DOM 节点获取，创建，删除，插入，修改

事件机制

事件委托

浏览器中的事件循环

宏任务和微任务

cookie，LocalStorage SessionStorage，IndexedDB

文档生命周期

堵塞渲染，堵塞加载

## 正则表达式

## Vue

MVVM 是常见的软件架构设计模式

双向绑定原理：

Vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调

Object.defineProperty() 进行数据劫持带来，某些修改无法拦截，比如数组的大部分操作都拦截不到，在 Vue3 中使用代理解决了这个问题

Computed 和 Watch 的区别

Computed 和 Methods 的区别

slot又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的

filters 过滤器

保存页面的当前的状态，看组件是否会被销毁，如果被销毁则存在 LocalStorage 和 Session Storage，或者使用 keep-alive

常见的修饰符

v-model 的实现原理：v-bind 绑定 value，再使用 v-on 监听 input 事件并实时更新 value

data为什么是一个函数而不是对象

keep-alive

Vue 只会监听已经创建的属性，如果在中途中加入其他属性，则不会被 Vue 转换为响应式，解决方法是调用$set()

单页面和多页面

自定义指令

组件的生命周期

路由模式

动态路由

路由懒加载

路由钩子

虚拟 DOM

DIFF

key 的作用

## Webpack

## HTTP

方法

状态码

http 和 https

http1.0

http1.1

http2.0

http3.0

URL 组成部分

与缓存相关的请求头

## 浏览器

组成

内核

脚本延迟加载方式：

+ defer async
+ 动态创建
+ 让 JS 最后加载

输入一个地址发生什么

Websocket

XSS 攻击，如何防御

CSRF 攻击，如何防御

中间人攻击

网络劫持

跨站脚本

标签页通信

Service Worker

缓存

协商缓存和强缓存

同源策略

跨域

## 其它

DNS

网络模型

TCP 和 UDP

进程和线程

进程之间的通信方式

<!-- more -->