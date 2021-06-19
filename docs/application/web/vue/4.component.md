---
title: 组件
category: 框架
tag: Vue
author: JQiue
article: false
---

组件是 Vue 的重点之一，目的是将网页中拆分成一个个组件进行拼装，就得到了完整的网页

## 组件构造器

通过 Vue.extend() 方法即可创建组件模板，这个方法接收一个对象，其中 template 属性用来决定组件的结构，这个方法最后会返回一个组件对象

```js
const foo = Vue.extend({
  template: `<div>component</div>`
})
```

::: danger
组件只能有一个根元素
:::

## 全局组件

全局注册的组件可以在任意 Vue 实例中使用，通过 Vue.component() 方法注册一个全局的组件，第一个参数为组件名，第二个参数为构造的组件对象

```js
Vue.component("foo", foo);
```

::: danger
如果注册时使用的是驼峰命名，使用时必须是短横线命名
:::

### 使用组件

经过上述步骤之后，就可以在任意 Vue 控制的 DOM 中将组件名作为一个自定义 HTML 标签使用，Vue 会将对应的组件替换为 template 属性中定义的元素

```js
<div id="app">
  <foo></foo>
</app>
```

### 简写方式

+ 方式一：不使用 extend 方法来构造组件，直接将组件对象传递给 component 方法注册

```js
Vue.component("foo", {
  template: `
    <div>global component</div>
  `
});
```

+ 方式二：抽离 template 属性中的内容到 script 标签中定义

```html
<script id="foo" type="text/html">
  <div>global component</div>
</script>
```

template 属性接收一个 id 选择器即可

+ 方式三：使用 Vue 提供的模板标签`<template>`

```html
<template id="foo">
  <div>global component</div>
</template>
```

和方式二一样，template 接收一个 id 选择器就行了

## 局部组件

和全局指令、全局过滤器是一样的，都只能在那个唯一的实例中使用，在实例对象中使用 components 属性注册组件，key 为组件名，对应的 value 则是组件对象

```js
const app = new Vue({
  el: "#app",
  data: {}，
  components: {
    "bar": {
      template: "<div>bar component<div>"
    }
  }
})
```

组件是一种可复用的 Vue 实例，所以组件也会和通过 new Vue() 创建的实例一样接收相同的选项，每个组件的选项都只能在当前实例中使用

::: danger
组件中的 data 必须是一个函数，返回值为该组件维护的数据对象，创建新组件时就会调用 data 函数，保证了组件都会有相互独立的数据对象
:::

::: demo [vue] 复用组件的 data 演示

```vue
<template>
<div>
  <foo></foo>
  <foo></foo>
  <foo></foo>
<div>
</template>

<script>
export default {
  data(){
    return {}
  },
  components:{
    "foo": {
      template: `<div>{{num}} <button @click='add'>增加</button></div>`,
      data() {
        return {
          num: 1
        }
      },
      methods: {
        add(){
          this.num++
        }
      },
    }
  }
}
</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

## 动态组件

动态组件用于解决一些界面中切换不同的组件但状态不能够保存的问题，下面的示例中，通过 v-if 来实现组件的切换，但是不能够保存单选框的勾选状态

```html
<button @click="toggle">切换</button>
<foo v-if="isShow"></foo>
<bar v-else></bar>
```

::: demo [vue] 不能保存状态的组件切换

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <foo v-if="isShow"></foo>
  <bar v-else></bar>
<div>
</template>

<script>
export default {
  data(){
    return {
      isShow: true
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">global component</div>`
    },
    "bar": {
      template: `<div>bar component</div>`
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    }
  }
}

</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

Vue 专门提供了内置组件`component`用来实现切换，这个组件的`is`属性用于接收当前需要显示的组件名，这样`component`会被替换为当前组件

```html
<component v-bind:is="name"></component>
```

::: demo [vue] component 组件实现切换

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <component v-bind:is="name"></component>
<div>
</template>

<script>
export default {
  data(){
    return {
      name: "foo"
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">global component</div>`
    },
    "bar": {
      template: `<div>bar component</div>`
    }
  },
  methods: {
    toggle() {
      this.name = this.name === "foo" ? "bar" : "foo";
    }
  }
}

</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

虽然`component`可以替代 v-if，但是仍然不能保存状态，这时候就需要另一个组件`keep-alive`来包裹动态组件实现状态保存

```html
<keep-alive>
  <component v-bind:is="name"></component>
</keep-alive>
```

::: demo [vue] keep-alive 组件保存状态

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <keep-alive>
    <component v-bind:is="name"></component>
  </keep-alive>
<div>
</template>

<script>
export default {
  data(){
    return {
      name: "foo"
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">global component</div>`
    },
    "bar": {
      template: `<div>bar component</div>`
    }
  },
  methods: {
    toggle() {
      this.name = this.name === "foo" ? "bar" : "foo";
    }
  }
}

</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

## 组件动画

将需要过渡组件放在`transition`中同样能够实现过渡效果

::: demo [vue] 组件切换的过渡

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <transition>
    <keep-alive>
      <component v-bind:is="name"></component>
    </keep-alive>
  <transition>
<div>
</template>

<script>
export default {
  data(){
    return {
      name: "foo"
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">global component</div>`
    },
    "bar": {
      template: `<div>bar component</div>`
    }
  },
  methods: {
    toggle() {
      this.name = this.name === "foo" ? "bar" : "foo";
    }
  }
}

</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
  .v-enter {
    opacity: 0;
  }
  .v-enter-to {
    opacity: 1;
  }
  .v-enter-active {
    transition: all 5s;
  }
  .v-leave {
    opacity: 1;
  }
  .v-leave-to {
    opacity: 0;
  }
  .v-leave-active {
    transition: all 2s;
  }
</style>
```

:::

## 组件通信

组件系统由树状结构构成的，所以就有了父子组件等关系

### Prop 数据传递

父子组件之间的 data 是不能够直接访问的，但是可以通过传递的方式访问

```html
<template id="father">
  <div>
    <p>父组件</p>
    <son></son>
  </div>
</template>

<template id="son">
  <div>
    <p>子组件</p>
  </div>
</template>
```

```javascript
data(){
  return {
    name: "father"
  }
}
```

假设 father 和 son 为父子组件，上面是 father 的数据，如果 son 想要访问 father 的 name 属性，应在 father 模板中为 name 绑定一个自定义名称的属性，子组件实例通过 props 来接收该属性，props 必须是一个数组，每一个元素为自定义属性的名称

```html
<template id="father">
  <div>
    <p>父组件 {{name}}</p>
    <son v-bind:fathername="name"></son>
  </div>
</template>
```

```javascript
props: ["fathername"]
```

这样在子组件中就可以使用父组件中的 name 了，实现了父传子

```html
<template id="son">
  <div>
    <p>子组件：{{fathername}}</p>
  </div>
</template>
```

::: danger
如果在传递的时候使用了驼峰命名，在接收的时候要转换为小写，如果想要在使用的过程中使用驼峰命名，则应该在传递的时候使用短横线命名，接收的时候使用驼峰命名
:::

::: demo [vue] 数据父传子

```vue
<template>
  <div>
    <p>父组件：{{name}}</p>
    <son v-bind:fathername="name"></son>
    <input type="text" v-model="name">
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "father"
    }
  },
  methods: {},
  components: {
    "son": {
      template: "<div><p>子组件：{{fathername}}</p></div>",
      props: ["fathername"]
    }
  }
}
</script>
```

:::

### 方法传递

和传递 data 不同的是，父组件的方法并不需要子组件定义 props 接收，而是在子组件实例中通过`this.$emit()`方法来间接触发

::: demo [vue] 方法父传子

```vue
<template>
  <div>
    父组件：<button @click="fatherFn">click</button>
    <son @parent-fn="fatherFn"></son>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    fatherFn(){
      alert("father function!!!")
    }
  },
  components: {
    "son": {
      template: "<div>子组件：<button @click='sonFn'>click</button></div>",
      methods: {
        sonFn(){
          this.$emit("parent-fn")
        }
      }
    }
  }
}
</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

也可以在调用父组件方法的同时给父组件传递参数，`this.$emit(父组件方法, 参数1, 参数2, ...)`的第一个参数是被调用的父组件方法，后面的参数都是传入方法中的参数列表，当然也要在父组件方法中定义参数接收

::: demo [vue] 子传父

```vue
<template>
  <div>
    父组件
    <son @parent-fn="fatherFn"></son>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    fatherFn(value){
      alert(value)
    }
  },
  components: {
    "son": {
      template: "<div>子组件：<button @click='sonFn'>click</button><input type='text' v-model='value'></div>",
      data(){
        return {
          value: "sonvalue"
        }
      },
      methods: {
        sonFn(){
          this.$emit("parent-fn", this.value)
        }
      }
    }
  }
}
</script>

<style>
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
</style>
```

:::

::: danger
在传递方法时不能使用驼峰命名，必须使用短横线命名
:::

::: tip 多级传递
数据和方法也是能够多级传递的，但是必须一层一层的往下传
:::

## 组件的生命周期

生命周期是一个 Vue 实例在被创建的时候经过一系列的初始化过程（组件在被创建时也是一个实例），在这个过程中每个阶段都会调用一个特定的方法，`new Vue()`本质上创建的是一个大组件，而其他自定义组件都具有生命周期

### 生命周期方法分类

+ 创建期间

1. beforeCreate：组件实例刚被创建，但还没有初始化数据和方法，此时不能访问实例中的数据和方法
2. created：实例已经初始化数据和方法，是最早能够访问实例中数据和方法的地方
3. beforeMount：编译好了页面模板，但还没有渲染到界面上，不能够获取渲染后的内容
4. mounted：已经完成模板的渲染，可以获取渲染后的内容

::: demo [vue]

```vue
<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  data(){
    return {
      msg: "life!!!"
    }
  },
  beforeCreate(){
    console.log(this.msg);
  },
  created(){
    console.log(this.msg);
  }
}
</script>
```

:::

+ 运行期间

1. beforeUpdate：只有数据被修改时才会触发，但是界面上的数据还未更新
2. updated：界面已经完成重新渲染，此时可以访问更新后的内容

+ 销毁期间

1. beforeDestroy：组件销毁之前触发，是最后能够访问到数据和方法的周期
2. destroyed：组件销毁后触发，但是不要在这里操作组件的数据和方法

```javascript
const app = new Vue({
  el: "#app",
  data: {
    msg: "life!!!"
  },
  methods: {
    foo() {
      console.log("foo");
    }
  },
  beforeCreate() {
    console.log(this.msg); // undefined
  },
  created() {
    console.log(this.msg); // msg
  },
  beforeMount() {
    console.log(document.querySelector("#life").innerText); // {{msg}}
  },
  mounted() {
    console.log(document.querySelector("#life").innerText); // life!!!
  }
});
```
