---
title: 介绍 && 起步
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

Vue，Angular，React 一起被称为前端三大框架，Vue 是国人尤雨溪编写的一套前端框架解决方案，因此所有的资料都有中文支持，并且 Vue 整合了其他框架中的众多优点，大大降低了学习难度

Vue 是通过数据驱动来更新页面的，而无需手动操作 DOM 来更新，因此意味着只要将数据交给 Vue，Vue 就会自动将数据渲染到页面上，这也说明 Vue 是响应式的

Vue 支持组件化开发，可以将网页上的内容拆分成一个独立的组件，通过拼装组件来构成一个完整的页面

![components](https://cn.vuejs.org/images/components.png)

Vue 是基于 MVVM 设计模式来设计的，MVVM 由三部分组成：

1. Model：数据模型和持久化抽象层，保存数据，处理数据业务逻辑
2. View：视图层，展示数据，与用户交互
3. ModelView：数据模型视图适配器，每一个 View 都会与 Model 中的属性一一对应

MVVM 模式最大的特点就是支持数据的双向传递，在 Vue 中 View 就是页面，Model 就是 Vue 实例对象中的 data，而 View Model 就是 Vue 实例对象，Vue 默认是单向绑定的，只要将数据交给实例对象，实例对象就能够在视图中显示数据

Vue 有两种引用方式：

+ 通过 script 标签导入，初学阶段使用，像 jQuery 那样使用[生产环境](https://cn.vuejs.org/js/vue.min.js)或[开发环境](https://cn.vuejs.org/js/vue.js)，也可以使用官方提供的 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

+ 基于 vue-cli 脚手架使用，这是最常用的方式

## 创建 Vue 实例

使用 script 标签引入时，Vue 被注册了一个全局变量，通过这个变量就能创造实例对象

```js
const app = new Vue();
```

仅仅创造一个 Vue 实例还不够，需要告诉 Vue 将页面中哪一部分元素作为 Vue 控制的视图，这个构造函数需要接受一个对象，这个对象包含着页面上的信息，对象的属性是有要求的

```html
<div id="app"></div>
```

假设以上元素需要交给 Vue 管理，将元素的`id`值传给`el`即可

```js
const app = new Vue({
  el: "#app"
});
```

虽然 DOM 已经交给了 Vue，但 Vue 毕竟是一个渲染数据的框架，可以通过对象中的`data`属性来定义数据

```js
const app = new Vue({
  el: "#app",
  data: {
    msg: "你好，Vue"
  }
});
```

然后通过插值表达式渲染`data`中的数据

```html
<div id="app">{{msg}}</div>
```

你可能会好奇`{{}}`这到底是个啥？这个东西就是用来帮助将`data`中的数据渲染到页面中，请详见[模板语法](/application/web/vue/1/#模板语法)，这时候页面就会显示：

`你好，Vue`

至此，一个简单 Vue 应用就已经完成了！！！

## 模板语法

Vue 通过指定的模板语法来渲染 DOM，先了解一下前端渲染页面的的三种方式：

1. 原生 JavaScript 字符串拼接，将数据以字符串的方式拼接到 html 标签中，缺点是不同的开发人员风格差异较大，后期难以维护
2. 使用前端模板引擎，它拥有自己的一套模板语法规则，优点是开发人员都遵循同样的规则编写代码，方便了后期的维护，但是没有事件机制
3. 使用 Vue 特有的模板语法，包含插值表达式，指令，属性绑定，样式绑定，事件绑定，分支循环结构

## 插值表达式

插值表达式用于填充数据，在 Vue 中使用“Mustache”语法，即`{{}}`，该语法会自动将 data 对象中对应的 property 值绑定到插值处，如果数据发生改变，页面数据也会发生改变，因为 Vue 是响应式的

由于 Vue 对模板语法提供了 JavaScript 表达式支持，插值表达式中的 JavaScript 代码都会被解析，仅限于单个表达式

## 双向绑定

Vue 中通过 v-model 指令来实现双向绑定，但只适用于`input`，`textarea`，`select`表单元素

```html v-model
<input type="text" v-model="">
```

假设将上述页面绑定到 msg 中

```js
const app = new Vue({
  el: "#app",
  data: {
    msg: "JQiue"
  }
})
```

::: demo [vue]

```vue
<template>
  <div>
    <p>{{msg}}</p>
    <input type="text" v-model="msg">
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: "JQiue"
    }
  }
}
</script>
```

:::
