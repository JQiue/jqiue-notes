---
title: 路由
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

VueRouter 和 Vuex 一样是 Vue 提供的核心插件，用于解决组件的切换显示，和 v-if 不同的是，VueRouter 是通过 URL 的哈希值来切换的，而且比 v-if 更加强大，能够在切换的时候传递参数

## 前端路由

在过去，通常是服务端处理来自浏览器的请求时，根据不同的 URL 路由解析对应的页面，并通过 HTTP 传给浏览器解析，这种方式的缺点整个页面都要重新加载，导致体验不好。随着 Web 应用的发展，已经可以通过 URL 变更的时候只刷新局部信息，从而获得更好的体验，前端路由的实现都是基于 History 和 Location 这两个 WebAPI，路由是现在前端框架的基本能力，虽然实现起来没什么太多难度，但却是单页面应用不可缺少的一部分

## 使用方法

VueRouter 需要额外的安装，详见[官网](https://router.vuejs.org/zh/installation.html)

```js
// 定义组件
const one = {
  template: "<div>one</div>"
}

const two = {
  template: "<div>one</div>"
}

// 定义路由规则
const routes = [
  // 每一个对象就是一条规则
  { path: '/one', component: one },
  { path: '/two', component: two }
]

// 根据路由规则创建路由对象
const router = new VueRouter({
  routes: routes
})

// 将路由对象传入 Vue 实例对象的 router 属性中
const app = new Vue({
  router: router
})
```

这样就可以在页面中通过内置组件`router-view`渲染对应的组件，前面说过是根据修改页面的哈希值来渲染的，学过 HTML 的都知道`a`标签可以修改

```html
<a href="#/one">one</a>
<a href="#/two">two</a>
<router-view></router-view>
```

但是 Vue 提供了更加专业的方式来设置哈希值，就是`router-link`组件，详见[官网 API 参考](https://router.vuejs.org/zh/api/#router-link)会解释为什么使用`router-link`更好，通过`to`属性指定哈希值

```html
<router-link to="/one">切换第一个界面</router-link>
<router-link to="/two">切换第二个界面</router-link>
<router-view></router-view>
```

::: tip
如果使用`router-link`，不需要写`#`
:::

默认情况下`router-link`会被渲染成`a`标签，但是可以通过`tag`属性渲染成任意支持的标签，且在激活的标签中会应用`router-link-active`类名，可以通过重写类名的方式改变元素的样式。VueRouter 也提供了`linkActiveClass`项来自定义类名，只需要给路由对象传递该属性的键值对即可修改

```js
const router = new VueRouter({
  routes: routes,
  linkActiveClass: "custome-class"
})
```

## 重定向

默认情况下，一个网页打开是没有哈希值的，所以导致无法显示对应组件，如果想要显示默认的组件则应该使用重定向

```js
const routes = [
  { path: '/', redirect: "/one" },
  { path: '/one', component: one },
  { path: '/two', component: two }
]
```

重定向也是一套路由规则，当匹配到对应的`path`时，会重定向到另一个`path`，这样就实现了组件的默认显示

## 参数传递

### URL 传递

可以在 url 上传递参数，上面的参数都会被`this.$route`的`query`属性所接收，会发现像`get`请求传参一样

```html
<router-link to="/one?name=one&path=one">切换第一个界面</router-link>
```

### 动态路由参数匹配

可以在路由规则中预设`/:key`这种规则的方式来接收参数

```js
const routes = [
  { path: '/', redirect: "/one" },
  { path: '/one/:name/:age', component: one },
  { path: '/two', component: two }
]
```

这样在传参的时候只需要使用`/value`的形式，但是和传统的 URL 传参不同的是，这些参数会被挂载到`this.$route`的`params`属性上

```html
<router-link to="/one/zs">切换第一个界面</router-link>
```

::: tip
`/one/zs`本质上也是一个路径，这正是动态对匹配的妙用，他会被映射到`/one`的路由上
:::

## 嵌套路由

嵌套路由指的是在一个路由的基础上再嵌套一个子路由，在不切换一级路由的情况下切换子路由，只需要在路由规则中增加`children`属性即可，其他的和一级路由相同，但是必须在一级路由中使用`router-view`显示子路由组件

```js
const routes = [
  { path: '/', redirect: "/one" },
  {
    path: '/one',
    component: one,
    children: [
      { path: "/one", redirect: "foo" },
      { path: "foo", component: foo },
      { path: "bar", component: bar }
    ]
  },
  { path: '/two', component: two }
]
```

::: tip
在子路由中不需要写上级路由的地址也不需要写`/`（会自动拼接路径），也可以在子路由中使用重定向，但是必须写`/`，这样渲染一级路由时也会渲染子路由
:::

## 命名视图

和插槽一样，如果使用了多个`router-view`，那么对应的路由组件会显示多次，如果想要在同一个路径下，显示多个组件，就可以使用命名视图，其中`component`被替换为`components`，接收一个键值对对象，key 代表这个路由的 name，value 为对应的组件

```js
const routes = [
  { path: '/', redirect: "/one" },
  {
    path: '/one',
    components: {
      view1: foo,
      view2: bar 
    },
  },
]
```

在`router-view`使用`name`属性指定对应的`key`就会显示对应的组件内容

```html
<router-view name="view1"></router-view>
<router-view name="view2"></router-view>
```

## 监听路由

watch 属性同样可以监听路由对象的变化

```js
watch: {
  $route (new, old){

  }
}
```

也可以直接监听`path`

```js
watch: {
  "$route.path" (newValue, oldValue){
    console.log(newValue + oldValue);
  }
}
```

## 导航方式

Vue Router 中有两种导航方式：

1. 声明式导航
2. 编程式导航

声明式即通过`<router-link>`导航，而编程式则是由路由实例提供的`push`方法进行导航
