---
title: 路由
category: 框架
tag: [Vue]
article: false
---

在过去，服务端处理来自浏览器的请求时，会根据不同的 URL 解析对应的页面，并通过 HTTP 传给浏览器解析，这种方式的缺点整个页面都要重新加载，导致体验不好。随着 Web 应用的发展，已经可以实现 URL 变更的时候只改变局部内容，从而获得更好的体验。前端路由的实现都是基于`History`和`Location`这两个 WebAPI，路由是现在前端框架的基本能力，虽然实现起来没什么太多难度，但却是单页面应用不可缺少的一部分

VueRouter 和 Vuex 一样是 Vue 官方提供的核心插件，用于解决组件的切换显示，和`v-if`不同的是，VueRouter 是通过 URL 的变化来切换的，而且比`v-if` 更加强大，能够在切换的时候传递参数

## 使用方法

VueRouter 需要额外的安装，详见[官网](https://router.vuejs.org/zh/installation.html)

```js
// 定义组件
const one = {
  template: "<div>one</div>"
};

const two = {
  template: "<div>one</div>"
};

// 定义路由规则
const routes = [
  // 每一个对象就是一条规则
  { path: '/one', component: one },
  { path: '/two', component: two }
]

// 根据路由规则创建路由对象
const router = new VueRouter({
  routes: routes
});

// 将路由对象传入实例对象的 router 属性中
const app = new Vue({
  router: router
});
```

然后就可以在页面中使用内置组件`<router-view>`渲染对应的组件，前面说过是根据修改页面的哈希值来渲染的，那么`<a>`就是修改的一种方式

```html
<a href="#/one">one</a>
<a href="#/two">two</a>
<router-view></router-view>
```

但是 Vue 提供了更加专业的方式来设置哈希值，就是`<router-link>`组件，详见[官网 API 参考](https://router.vuejs.org/zh/api/#router-link)会解释为什么使用该组件更好，通过`to`属性指定哈希值，不需要写`#`

```html
<router-link to="/one">切换第一个界面</router-link>
<router-link to="/two">切换第二个界面</router-link>
<router-view></router-view>
```

默认情况下`<router-link>`会被渲染成`<a>`标签，但是可以通过`tag`属性指定渲染成任意支持的标签，且在激活的标签中会应用`router-link-active`类名，可以通过重写类名的方式改变元素的样式。VueRouter 也提供了`linkActiveClass`项来自定义类名

```js
const router = new VueRouter({
  routes,
  linkActiveClass: "custome-class"
});
```

## 重定向

一个网页刚打开是没有哈希值的，导致无法显示对应组件，使用重定向可以解决。重定向也是一套路由规则，当匹配到对应的`path`时，会重定向到另一个`path`

```js
const routes = [
  { path: '/', redirect: "/one" },
  { path: '/one', component: one },
  { path: '/two', component: two }
]
```

## 参数传递

### URL 传递

可以在 url 上传递参数，上面的参数都会被`this.$route`的`query`属性所接收，会发现像`get`请求传参一样

```html
<router-link to="/one?name=one&path=one">切换第一个界面</router-link>
```

### 动态路由参数匹配

动态路由参数匹配可用来解决某种模式匹配的路径规则，应用到同一个组件，也许路径只是稍微有些不同，可以在路由规则中预设`/:key`这种规则的方式来接收参数

```js
const routes = [
  { path: '/', redirect: "/one" },
  { path: '/one/:name/:age', component: one },
  { path: '/two', component: two }
]
```

传参的时候只需要使用`/{value}`的形式，这些参数会被挂载到`this.$route`的`params`属性

```html
<router-link to="/one/zs">切换第一个界面</router-link>
```

::: tip
`/one/zs`本质上也是一个路径，这正是动态对匹配的妙用，它会被映射到`/one`的路由规则上
:::

### Props

在 URL 中传递参数无疑会使组件产生高度耦合，从而只能在特定的 URL 上使用，路由中同样可以定义`props`，如果`props`为布尔形式，则`params`会被设置为组件的`props`，如果为对象形式，则会按照原样设置为组件属性

## 嵌套路由

嵌套路由指的是在一个路由基础上再嵌套一个子路由，可以实现不切换一级路由的情况下切换子路由，只需要在路由规则中增加`children`属性即可，但必须在一级路由中使用`router-view`显示子路由组件

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

子路由中不需要写上级路由的地址也不需要写`/`（会自动拼接路径），也可以在子路由中使用重定向，但是必须写`/`，这样渲染一级路由时也会渲染子路由

## 命名路由

一个路由规则可以被`name`所标记，可以在视图中很方便的实现指定路由的跳转

```js
const routes = [
  { path: '/', redirect: "/one" },
  {
    path: '/one',
    name: 'one',
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

```html
<router-link :to="{ name: 'one' }"></router-link>
```

## 命名视图

和插槽一样，如果使用了多个`<router-view>`，那么对应的路由组件会渲染多次，如果想要在同一个路径下，显示不同组件，就可以使用命名视图。其中`component`被替换为`components`，接收一个键值对对象，key 代表这个路由的`name`，`value`为对应的组件

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

在渲染组件中使用`name`属性指定对应的`key`就会显示对应的组件内容

```html
<router-view name="view1"></router-view>
<router-view name="view2"></router-view>
```

## 监听路由

`watch`属性同样可以监听路由对象的变化

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

VueRouter 有两种导航方式：

+ 声明式导航
+ 编程式导航

声明式即通过`<router-link>`导航，而编程式则是由路由实例提供的`push`方法进行导航，路由实例在 Vue 实例中以`this.$router`方式访问

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

## History 模式

VueRouter 默认是 hash 模式，通过哈希来模拟一个完整的 URL，如果不想要很丑的哈希，可以切换为`history`模式

```js
const router = new VueRouter({
  mode: 'history',
});
```

不过这种模式需要后端的支持，因为它会发送一个真正 HTTP 请求，不然就会得到 404

## 导航守卫

导航守卫是对路由的过程中起到权限控制的功能，比如跳转或者取消跳转等功能

从作用范围来划分主要有：全局守卫、独享守卫、组件守卫

对于全局守卫来说：

+ 可以使用`router.beforeEach`注册一个全局前置守卫：初始化时执行、每次路由切换前执行
+ 可以使用`router.afterEach`注册一个全局后置守卫：初始化时执行、每次路由切换后执行

守卫中的参数：

+ `to`：即将要进入的目标（路由对象）
+ `from`：当前导航正要离开的路由
+ `next`：调用该方法来控制接下来的行为（后置守卫中没有这个参数）

独享守卫与全局守卫用法一致，只对一个路由规则生效

组件守卫与全局守卫用法一致：

+ 进入组件时调用`beforeRouteEnter`
+ 路由改变且当前组件被复用时调用`beforeRouteUpdate`
+ 离开组件时调用`beforeRouteLeave`

## 路由元数据

## 总结

+ 更好的控制单页面改变的内容
+ 如果是`history`模式，必须要后端支持，否则会 404
+ 如果在 URL 上使用 query，那么会被路由的`query`接收，如果是动态路由参数，会被挂载到`params`
+ 可以嵌套路由
+ 导航守卫是对路由的过程中起到权限控制的功能，比如跳转或者取消跳转等功能，有全局、路由独享、组件独享
+ 全局路由对所有的路由触发，独享守卫只对一条路由规则触发，组件守卫只对当前组件的路由触发
