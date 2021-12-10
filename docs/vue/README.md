---
title: Vue.js
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

Vue，Angular，React 一起被称为前端三大框架，Vue 是尤雨溪编写的一套前端框架解决方案，所有的资料都有中文支持，并且 Vue 整合了其他框架中的优点，大大降低了学习难度

Vue 是通过数据驱动来更新页面的，而无需手动操作 DOM 来更新，意味着只要将数据交给 Vue，Vue 就会自动将数据渲染到页面上，这也说明 Vue 是响应式的

Vue 支持组件化开发，可以将网页上的内容拆分成一个独立的组件，通过拼装组件来构成一个完整的页面

![components](https://cn.vuejs.org/images/components.png)

Vue 是基于 MVVM 设计模式来设计的，MVVM 由三部分组成：

+ Model：数据模型和持久化抽象层，保存数据，处理数据业务逻辑
+ View：视图层，展示数据，与用户交互
+ ModelView：数据模型视图适配器，每一个 View 都会与 Model 中的属性一一对应

MVVM 模式最大的特点就是支持数据的双向传递，在 Vue 中 View 就是页面，Model 就是 Vue 实例对象中的 data，而 View Model 就是 Vue 实例对象。Vue 默认是单向绑定的，只要将数据交给实例对象，实例对象就能够在视图中渲染数据

有两种使用方式：

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

+ 原生 JavaScript 字符串拼接，将数据以字符串的方式拼接到 html 标签中，缺点是不同的开发人员风格差异较大，后期难以维护
+ 使用前端模板引擎，它拥有自己的一套模板语法规则，优点是开发人员都遵循同样的规则编写代码，方便了后期的维护，但是没有事件机制
+ 使用 Vue 特有的模板语法，包含插值表达式，指令，属性绑定，样式绑定，事件绑定，分支循环结构

## 插值表达式

插值表达式用于渲染数据，在 Vue 中使用“Mustache”语法，即`{{}}`。该语法会自动将 data 对象中对应的 property 值绑定到插值处，如果数据发生改变，页面数据也会发生改变

由于 Vue 对模板语法提供了 JavaScript 表达式支持，插值表达式中的 JavaScript 代码都会被解析，仅限于单个表达式，比如`{{1 + 1}}`会得到`2`

## 双向绑定

Vue 中通过 v-model 指令来实现双向绑定，但只适用于`input`，`textarea`，`select`表单元素

```html v-model
<input type="text" v-model="msg">
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

::: demo [vue] 双向绑定

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

双向绑定的原理十分简单，分为二个步骤：

1. 使用`v-bind`绑定元素的`value`，data 中的数据变化时，同步输入框的内容
2. 利用`v-on`监听元素的`input`或`change`事件，输入框的内容变化时，同步 data 中的数据

::: demo [vue] 双向绑定实现

```vue
<template>
  <div>
    <p>{{msg}}</p>
    <input type="text" v-bind:value="msg" v-on:input="updateData($event.target)">
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "JQiue"
    }
  },
  methods: {
    updateData(target){
      this.msg = target.value;
    }
  }
}
</script>
```

:::

## 特殊属性

特殊属性指的是 Vue 会对元素上的一些属性进行特殊的解析，比如`key`会和`v-for`搭配使用，`is`和`component`控制组件的切换，`slot`和`slot-scope`用于插槽中，这里着重讲`ref`属性

Vue 是一个数据驱动界面更新框架，无需使用原生语法操作 DOM 来更新界面，但有时候却需要获取 DOM，而 Vue 实际上不推荐直接操作 DOM，一般使用`document`对象获取 DOM 时，无论是原生的元素，还是自定义的组件，拿到的都是原生元素

而 Vue 提供了特殊属性`ref`来标记元素，如果这个元素是原生的，那么就会返回原生元素，如果是一个组件，将会返回这个组件的实例对象，通过`this.$refs`访问

::: demo [vue] 特殊属性 ref

```vue
<template>
  <div>
    <p ref="msg">{{msg}}</p>
    <foo ref="f"></foo>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "特殊属性 refs"
    }
  },
  components: {
    "foo": {
      template: "<div>foo 组件</div>"
    }
  },
  mounted(){
    console.log(this.$refs);
    console.log(this.$refs.msg);
    console.log(this.$refs.f);
  }
}
</script>
```

:::

在浏览器按下`F12`可查看打印信息

## 指令

Vue 的指令本质就是自定义属性，由于 Mustache 语法不能作用在 HTML 特性（attribute） 上，无法控制 DOM 的行为，而指令封装了 Vue 实现的功能，以`v-`开头的属性都是 Vue 提供的指令，通过指令，就可以影响 DOM 的某些行为

+ v-once

使用`v-once`的元素只会被渲染一次，即使数据发生改变也不会重新渲染

+ v-cloak

由于 Vue 会将未绑定的界面渲染给用户，然后创建实例将数据渲染到页面上。如果网页性能较差，用户可能会看到模板内容，所以`v-cloak`会将该元素暂时隐藏，等待数据渲染完毕才会显示元素，但是使用这个指令之前，要通过 CSS 属性选择器来选中，添加`display: none`来实现隐藏

+ v-text 和 v-html

`v-text`会覆盖原有的元素内容，但不会解析内容中的 HTML，`v-html`也会覆盖原有的内容，但是会解析内容中的 HTML

+ v-if，v-else，v-else-if

`v-if`会根据表达式的值来选择是否渲染该元素，可以从`data`中获取数据，也可以直接使用表达式，如果为`false`，该元素根本不会被创建

`v-else` 和`v-if`或`v-else-if`搭配使用，不需要表达式，如果`v-if`不满足条件，就会渲染`v-else`中的元素

和`v-if`或`v-else-if`一起使用，需要表达式

+ v-show

`v-show`跟`v-if`一样通过条件表达式选择渲染数据，但是`v-show`为`false`时，仍然会创建该元素，只不过被隐藏掉了

+ v-for

`v-for`会根据数据多次渲染元素，可以遍历、数字、数组、字符串、对象

```html
<p v-for="(value, index) in [1, 3, 4, 6]">{{value}}</p>
<p v-for="(value, index) in 8">{{value}}</p>
<p v-for="(value, index) in 'hello'">{{value}}</p>
<p v-for="(value, key) in obj">{{key}}{{value}}</p>
```

::: tip
遍历数字时会从 1 开始
:::

为了提高`v-for`的性能，在更新已渲染的元素列表时，会采用“就地更新“策略，正是因为这个策略，在某些时刻会导致数据产生一种混乱，下面是一个例子，请选中一项，然后点击添加，会发现选择的某一项在数据渲染后居然变了，比如选中了`ls`，渲染后居然变成选中了`zs`

::: demo [vue] 未绑定 key

```vue
<template>
  <div>
    <form>
      <input type="text" v-model:value="name">
      <input type="submit" value="添加" @click.prevent="add">
    </form>
    <ul>
      <li v-for="(p, index) in persons">
        <input type="checkbox">
        <span>{{index}}--{{p.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        {name: "zs"},
        {name: "ls"},
        {name: "ww"}
      ],
      name: "zl"
    }
  },
  methods: {
    add(){
      this.persons.unshift({name: this.name});
    }
  }
}
</script>
```

:::

这是因为`v-for`渲染元素时，会先查看缓存中有没有需要渲染的元素，如果没有，就会创建一个新的放在缓存中，如果缓存中有，则不会创建新的，直接复用原来的元素，为了给 Vue 更好的追踪节点的身份，从而重用和重新排序现有元素，应该为每项提供一个唯一`key`属性

::: demo [vue] 绑定 key

```vue
<template>
  <div>
    <form>
      <input type="text" v-model:value="name">
      <input type="submit" value="添加" @click.prevent="add">
    </form>
    <ul>
      <li v-for="(p, index) in persons" :key="p.id">
        <input type="checkbox">
        <span>{{index}}--{{p.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        {name: "zs"},
        {name: "ls"},
        {name: "ww"}
      ],
      name: "zl"
    }
  },
  methods: {
    add(){
      this.persons.unshift({id: this.persons.length, name: this.name});
    }
  }
}
</script>
```

:::

::: danger
千万不要将类似于数组的索引为`key`的值
:::

v-if 和 v-for 最好不要在同一个元素上使用，非常浪费性能，如果遇到必须使用的场景，可以在外层嵌套`<template>`使用，因为它不会生成 DOM 节点，是否渲染取决于里面的元素

```html
<template v-for="item in items" :key="item.id">
  <div v-if="item == 'isShow'">{{item.content}}</div>
</template>  
```

+ v-bind

插值表达式是不能作用于元素的属性的，必须使用`v-bind`指令，可以简写成`:`，赋值的数据也可以是任意合法的表达式语句

```html
<input type="text" v-bind:value="value"></input>
```

如果绑定 class 特性，`v-bind`有一点特殊的写法，直接赋值默认会从`data`中查找，如果赋值一个数组，则会在`style`标签中查找定义的样式

```html
<p :class="['size']">呦呦鹿鸣</p>
```

也可以使用三目运算符来决定

```html
<p :class="[, 'color', flag ? 'size':'']">呦呦鹿鸣</p>
```

也可以使用对象来决定

```html
<p :class="['color', {'size' : true}]">呦呦鹿鸣</p>
```

::: tip
对象的取值会被转换为布尔类型计算
:::

使用数组未免太麻烦，利用`v-bind`的绑定特点，可以在`data`中定义属性来更好的操作类名，属性名就是 class 名

```html
<p :class="obj">呦呦鹿鸣</p>

<script>
new Vue({
  data: {
    obj:{
      size: true
    }
  }
})
</script>
```

绑定`style`特性时，`v-bind`的写法也有点特殊，默认情况也是从`data`中查找，因此取值需要是一个对象，key 为属性名，value 为属性值

```html
<p :style="{color:'red'}">呦呦鹿鸣</p>
```

如果`data`中保存了多个样式对象，可以将多个对象放在数组中赋值给 style，这样会一同生效

+ v-on

`v-on`用于给元素绑定监听事件，指定事件时不需要写`on`，回调函数在`methods`对象中定义，可以简写成 `@`

```html
<button v-on:click="callback"></button>

<script>
new Vue({
  data: {},
  methods: {
    callback() {
      /* code */
    }
  }
})
</script>
```

`v-on`伴随事件修饰符选项，可以控制事件行为

+ .once：只触发一次回调函数
+ .prevent：调用 event.preventDefault()，阻止元素的默认行为，比如 a 标签的跳转
+ .stop：调用 event.stopProagation()，阻止事件冒泡
+ .self：只会让当前元素触发事件的时候才执行回调函数
+ .capture：将冒泡冒泡变成事件捕获

::: tip
绑定回调函数时`()`可以不写，代表没有参数传递
:::

::: tip 传入事件对象
回调函数可以接收原生的事件对象，通过`$event`传入
:::

按键修饰符可以触发特定按键的事件，只有在按下该按键的时候才会触发回调函数，Vue 预定了一些按键修饰符，也可以使用按键码（Keycode）

```html
<button @keyup.enter>点我</button>
```

### 自定义指令

Vue 也允许注册自定义指令，这个指令的逻辑可以自己实现

```js
Vue.directive('color', {
  bind: function(el){
    el.style.color = 'red'
  }
})
```

通过`Vue.directive()`方法注册一个全局的指令，第一个参数为指令名，第二个参数接受一个对象，对象中定义了几个钩子函数用于不同的生命周期中调用，每个钩子函数都可以接收绑定的元素对象，用来操作 DOM

::: tip
通过`Vue.directive()`注册的指令能够在所有的实例对象中使用，如果要想将指令作为一个局部的指令，可以在组件中接收一个`directives`对象，这个属性 key 就是指令后缀，逻辑也通过对应 key 的函数实现
:::

### 自定义指令参数

官方提供的指令可以传参，而自定义的指令也是可以的，钩子函数不仅可以接收绑定的元素对象，也会接受一个包含指令参数的对象

```js
Vue.directive('color', {
  bind: function(el, binding){
    el.style.color = binding.value;
  }
});
```

## 计算属性

虽然可以在插值表达式编写合法的 JavaScript 表达式，但不利于维护，也不会获得编辑器的语法提示，因此对于任何复杂的逻辑都应该使用计算属性，`computed`是实例中的一个属性，专门用于定义计算属性，每一个值都是函数

```js
const app = new Vue({
  el: '#app'
  computed: {
    sum: function(){
      return 1 + 2
    }
  }
})
```

在插值语法中，计算属性应该当作一个属性使用，而不是一个函数，直接写上名称即可

::: tip 计算属性和函数的区别
函数也可以直接使用在插值语法中，只不过需要调用的方式，对于函数来说，每次都需要重新调用返回结果，而计算属性只要返回值不改变，就只会被执行一次，结果会被缓存并立即返回，计算属性适用于结果不需要经常发生变化的场景
:::

## 侦听器

侦听器可以监听某一个数据发生变化时触发一个函数，给实例增加`watch`属性接受一个对象，其中方法名必须和要监听的数据名相同，每个方法还可以接收两个参数，分别是修改的新值和被修改的旧值

::: demo [vue] 侦听器

```vue
<template>
  <div>
    <input type="text" v-model="num1">
    +
    <input type="text" v-model="num2">
    =
    <input type="text" v-model="sum">
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
      sum: 0
    }
  },
  watch: {
    num1(newValue, oldValue) {
      this.sum = parseInt(this.num1) + parseInt(this.num2)
    },
    num2(newValue, oldValue) {
      this.sum = parseInt(this.num1) + parseInt(this.num2)
    }
  }
}
</script>
```

:::

::: demo [vue] 侦听器

```vue
<template>
  <div>
    <input type="text" v-model="value">
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    }
  },
  watch: {
    value(newValue, oldValue) {
      alert("newValue:" + newValue + "，oldValue:" + oldValue)
    }
  }
}
</script>
```

:::

## 过滤器

过滤器用于格式化插值语法和`v-bind`中的内容

```js
Vue.filter("formatStr", function(value){
  return value.replace("filter");
})
```

`filter(filterName, callbakc)` 函数接收两个参数：过滤器名称和处理数据的回调函数，回调函数中的数据来自于使用过滤器的文本值，如果回调函数不返回，就不会显示数据，因此处理数据后必须返回

在插值语法或`v-bind`中的数据和过滤器使用管道符号`|`分隔即可

使用 Vue 对象中的 filter 函数是全局的，在所有的实例对象中都可以使用，而组件也支持使用 `filters`属性来定义局部的过滤器，方法名即为过滤器的名称

## 总结

+ Vue 是一个基于 MVVM 设计模式的 JavaScript 渐进式框架
+ 插值表达式用于渲染数据，数据发生变化，就会触发页面变化
+ `v-model`可以实现部分表单元素的双向绑定，原理是`v-bind`绑定元素的值，`v-on`监听`input`事件，数据发生变化时，会使两者进行同步更新
+ 特殊属性是作用在元素上的属性，会被 Vue 特殊的进行解析，比如获取原生元素使用`ref`来标记，和`v-for`进行配合的`key`等
+ 指令是一种特殊的自定义属性，因为插值表达式不能作用于 HTML 特性上，通过封装的一些指令来控制 DOM
+ `v-if`和`v-for`同时使用时，在 Vue2 版本中`v-for`优先级是最高的，而 Vue3 中`v-if`优先级最高，但它们是不兼容的，并不推荐同时使用
+ 计算属性用于数据不经常发生变化的时候使用，因为它会缓存数据
+ 侦听器可以在数据发生变化的时候触发回调
+ 过滤器可以对插值语法或`v-bind`中的数据进行格式化处理
