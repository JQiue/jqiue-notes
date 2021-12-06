---
title: 组件
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

组件是 Vue 的重点之一，目的是将网页中拆分成一个个组件进行拼装，就得到了完整的网页

## 组件制作

使用`Vue.extend()`即可创建组件，这个方法接收一个对象，`template`属性用来决定组件的 HTML 内容，这个方法会返回一个组件对象

```js
const foo = Vue.extend({
  template: `<div>component</div>`
});
```

::: danger
组件只能有一个根元素
:::

然后使用`Vue.component(name, component)`注册，第一个参数为组件名，第二个参数为构造的组件对象

```js
const foo = Vue.extend({
  template: `<div>component</div>`
});
// 注册
Vue.component("foo", foo);
```

::: tip 全局组件
通过`Vue.component()`注册的组件可以在任意 Vue 实例中使用
:::

::: danger
如果注册时使用的是驼峰命名，使用时必须是短横线命名
:::

经过上述步骤之后，就可以在任意 Vue 控制的 DOM 中将组件名作为一个自定义 HTML 标签使用，Vue 会将对应的组件替换为`template`属性中定义的内容

```js
<div id="app">
  <foo></foo>
</app>
```

上面的方式未免太麻烦，可以用以下方式简化组件创建的过程

+ 方式一：不使用`Vue.extend()`方法来构造组件，直接将组件对象传递给`Vue.component()`方法注册

```js
Vue.component("foo", {
  template: `
    <div>global component</div>
  `
});
```

+ 方式二：抽出`template`属性中的内容到`script`标签中定义，`template`属性接收一个`id`选择器即可

```html
<script id="foo" type="text/html">
  <div>foo component</div>
</script>
```

+ 方式三：使用 Vue 提供的模板标签`<template>`，和方式二一样，`template`接收一个`id`选择器就行了

```html
<template id="foo">
  <div>global component</div>
</template>
```

## 局部组件

和全局指令、全局过滤器是一样的，都只能在那个唯一的实例中使用，使用`components`属性注册组件，`key`为组件名，对应的`value`则是组件对象

```js
const app = new Vue({
  el: "#app",
  data: {}，
  components: {
    "bar": {
      template: "<div>bar component<div>"
    }
  }
});
```

组件是一种可复用的 Vue 实例，所以组件也会和`new Vue()`创建的实例一样接收相同的选项，每个组件的选项都只能在当前实例中使用

::: danger
组件中的 data 必须是一个函数，返回值为该组件维护的数据对象，创建新组件时就会调用 data 函数，保证了组件中的数据是独立的
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
```

:::

## 动态组件

动态组件用于解决一些界面中切换不同的组件但状态不能够保存的问题，下面的示例中，通过`v-if`来实现组件的切换，但是不能够保存单选框的勾选状态

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
  data() {
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
```

:::

`component`只是更好的替代`v-if`，但是仍然不能保存状态，这时候就需要另一个内置组件`keep-alive`来包裹动态组件实现状态保存

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
```

:::

## 组件动画

将需要被过渡组件放在内置`transition`中同样能够实现过渡效果

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

### Prop 数据传递

父子组件之间的数据是不能够直接访问的，但是可以通过传递的方式访问

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

```js
data(){
  return {
    name: "father"
  }
}
```

假设 father 和 son 为父子组件，如果 son 想要访问 father 的数据，应在 father 模板中为数据绑定一个自定义名称的属性，然后子组件实例通过`props`选项来接收属性，`props`必须是一个数组，每一个元素为自定义属性的名称

```html
<template id="father">
  <div>
    <p>父组件 {{name}}</p>
    <son v-bind:fathername="name"></son>
  </div>
</template>
```

```js
props: ["fathername"]
```

这样在子组件中就可以使用父组件中的数据了，实现了父传子

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

::: demo [vue] 父传子

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

### `$emit`

`$emit(fn, param1, ...)`可以触发父组件中的自定义的事件，并且传入参数，这意味着子组件可以通过这种方式传值给父组件

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
      alert(value);
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
          this.$emit("parent-fn", this.value);
        }
      }
    }
  }
}
</script>
```

:::

::: danger
在传递方法时不能使用驼峰命名，必须使用短横线命名
:::

::: tip 多级传递
数据和方法也是能够多级传递的，但是必须一层一层的往下传
:::

### EventBus

如果两个

## 插槽

虽然组件足够强大，但是插槽能够让组件更加强大，组件也是一个自定义标签，同样可以在使用组件的时候填充一些其他内容

在这个例子中，组件填充了内容，并没有想象中那样被展示出来，这就需要插槽的帮助，“插槽”指的是预留的接口，用于接收外面传递的信息，在组件中必须先定义插槽，才能往组件中填充内容

```html
<foo>content</foo>
```

::: demo [vue] vue

```vue
<template>
  <div>
    <foo>content</foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo</div>"
    }
  }
}
</script>
```

:::

### 匿名插槽

在组件模板中定义一个插槽组件

```html
<template>
  <div>foo<slot></slot></div>
</template>
```

::: demo [vue] 插槽

```vue
<template>
  <div>
    <foo>content</foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot></slot></div>"
    }
  }
}
</script>
```

:::

芜湖，内容正确替换了插槽，`slot`是 Vue 提供定义插槽的内置组件，它会被替换为在组件标签中添加的内容，可以是 HTML，任意支持的内容，包括其他的组件

::: demo [vue] 渲染 HTML

```vue
<template>
  <div>
    <foo><a href="/web/vue/9/">a 标签<a></foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot></slot></div>"
    }
  }
}
</script>
```

:::

如果定义了多个`slot`，每一个插槽都会把内容渲染一遍

::: demo [vue] 定义多个插槽

```vue
<template>
  <div>
    <foo>content</foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot></slot><slot></slot><slot></slot></div>"
    }
  }
}
</script>
```

:::

### 具名插槽

插槽定义多个的情况下，可以通过`name`属性在模板中定义插槽的名字，然后在组件填充内容中通过`slot`属性填充指定的插槽

::: demo [vue] 具名插槽

```vue
<template>
  <div>
    <foo>
      <div slot="one">bar</div>
      <div slot="two">quz</div>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot name='one'></slot><slot name='two'></slot></div>"
    }
  }
}
</script>
```

:::

如果定义了具名插槽，在填充内容的时候必须通过`slot`属性来指定填充到哪一个具名插槽

### v-slot

从 Vue 2.6 开始，Vue 已经不推荐使用`slot`属性来指定具名插槽，而是使用`v-slot`指令来替代这一方式，`v-slot`必须和`template`组件搭配使用

```html
<template v-slot:one>
  <div>bar</div>
</template>
```

::: demo [vue] v-slot

```vue
<template>
  <div>
    <foo>
      <template v-slot:one>
        <div>bar</div>
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot name='one'></slot><slot name='two'></slot></div>"
    }
  }
}
</script>
```

:::

`v-slot`可被简写为`#`

```html
<template #one>
  <div>bar</div>
</template>
```

::: demo [vue] v-slot 简写形式

```vue
<template>
  <div>
    <foo>
      <template #one>
        <div>bar</div>
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot name='one'></slot><slot name='two'></slot></div>"
    }
  }
}
</script>
```

:::

## 预留内容的插槽

也可以在定义插槽的时候预定义一些默认的内容，如果没有从外部填充，那么就会显示默认的内容

::: demo [vue] 预留内容的插槽

```vue
<template>
  <div>
    <foo></foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo<slot>默认内容</slot</div>"
    }
  }
}
</script>
```

:::

## 作用域插槽

作用域插槽就是带数据的插槽，就是让父组件能够填充插槽内容的时候也能使用子组件的数据，首先要在插槽中通过`v-bind`指令暴露子组件的数据，然后父组件通过`template`的`slot-scope`属性来接收

::: demo [vue] 作用域插槽

```vue
<template>
  <div>
    <foo>
      <template slot-scope="scope">
        {{scope}}
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div>foo：<slot v-bind:names=names></slot</div>",
      data(){
        return {
          names: ["zs", "ls", "ww"]
        }
      }
    }
  }
}
</script>
```

:::

绑定的属性会被一个对象接收，也间接说明可以传递多个属性，只要遍历接收对象就可以了

作用域插槽应用场景是：**子组件提供数据，父组件决定渲染**

::: demo [vue] 应用场景

```vue
<template>
  <div>
    <foo>
      <template slot-scope="scope">
        <li v-for="(name, index) in scope.names">{{name}}</li>
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div><slot v-bind:names=names></slot</div>",
      data(){
        return {
          names: ["zs", "ls", "ww"]
        }
      }
    }
  }
}
</script>
```

:::

### 使用 v-slot

`v-slot`不仅仅可以指定具名插槽，也可以接收暴露的数据

::: demo [vue] v-slot 的用法

```vue
<template>
  <div>
    <foo>
      <template v-slot:default="scope">
      <li v-for="(item, index) in scope.names">{{item}}</li>
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div><slot v-bind:names=names></slot</div>",
      data(){
        return {
          names: ["zs", "ls", "ww"]
        }
      }
    }
  }
}
</script>
```

:::

::: tip
如果是一个匿名插槽，那么`v-slot`可以绑定`default`指定作用域，匿名插槽默认的名字都是`default`，实际上不需要这么做，`v-slot="scope"` = `v-slot:default="scope"` = `#default="scope"`，使用`#`时，`default`不能省略
:::

## 过渡动画

Vue 提供了在插入、更新或移除 DOM 时，提供不同方式的过渡效果，将需要过渡的组件放在`transition`标签中，然后实现几个过渡的 CSS 属性即可

### 进入、离开

::: demo [vue] 过渡动画演示

```vue
<template>
  <div>
    <button v-on:click="toggle">切换</button>
    <transition appear>
      <div class="box" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      custom_isShow: true
    }
  },
  methods: {
    toggle(){
      this.isShow = !this.isShow;
    },
    custom_toggle(){
      this.custom_isShow = !this.custom_isShow;
    }
  }
}
</script>

<style>
  .box {
    width: 200px;
    height: 200px;
    background: green;  
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

以下是在进入/离开的过渡时切换的 class，都需要在 style 中手动实现

+ v-enter：进入过渡时的开始状态
+ v-enter-to：进入过渡时的结束状态
+ v-enter-active：定义进入过渡的过渡时间、延迟和曲线函数
+ v-leave：离开过渡时的开始状态
+ v-leave-to：离开过渡时的结束状态
+ v-leave-active：定义离开过渡的过渡时间、延迟和曲线函数

如果使用了没有名字的`transition`组件，`v-`是这些类名的默认前缀，如果为这个组件提供了`name`属性指定前缀，那么`v-`将会被替换为`name`的属性值，这样可以为不同的元素设置不同的过渡效果

### 钩子函数

Vue 也提供了过渡的钩子函数，用于实现不同时期的动画效果，以下事件可以被 v-on 监听

+ before-enter：进入前
+ enter：进入中
+ after-enter：进入后
+ before-leave：离开前
+ leave：离开中
+ after-leave：离开后

每个钩子函数都会接收到过渡元素的 DOM 对象，如果只在钩子函数中实现过渡效果，应该给 enter 和 leave 传入 done 并回调，否则后续的 after 事件不会执行。当然如果不传入 done，过渡会从定义的类名中查找，但 Vue 建议在过渡的元素上添加`v-bind:css="false"`属性，这样 Vue 会跳过对 CSS 的检测，避免定义的属性带来影响

### 自定义过渡的类名

除了使用默认的类名 v-xxx 、自定义类名前缀 name="xxx"、钩子函数这些定义过渡动画以外，还可以在 transition 中使用以下属性的自定义类名，这对于一些基于类名的动画库非常有用

+ enter-class
+ enter-active-class
+ enter-to-class
+ leave-class
+ leave-active-class
+ leave-to-class

```vue
<transition enter-class="" enter-active-class="" enter-to-class="">
  // 过渡的元素
</transition>
```

::: demo [vue] 自定义过渡类名示例

```vue
<template>
  <div>
    <button v-on:click="custom_toggle">切换</button>
    <transition appear
    enter-active-class="animate__animated animate__backInRight"
    leave-active-class="animate__animated animate__backOutRight">
      <div class="box" v-show="custom_isShow"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      custom_isShow: true
    }
  },
  methods: {
    toggle(){
      this.isShow = !this.isShow;
    },
    custom_toggle(){
      this.custom_isShow = !this.custom_isShow;
    }
  }
}
</script>

<style>
  .box {
    width: 200px;
    height: 200px;
    background: green;  
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

### 列表组过渡

对于 v-for 渲染的元素来说，需要使用 transition-group 组件包裹，且必须为每一个列表项绑定 key，这样每次更新列表项都会获得过渡效果

::: demo [vue] 列表组过渡示例

```vue
<template>
  <div>
    <form>
      <input type="text" v-model:value="name">
      <input type="submit" value="添加" @click.prevent="add">
    </form>
    <ul>
      <transition-group appear>
        <li v-for="(p, index) in persons" :key="p.id">
          <span>{{index}}--{{p.name}}</span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        { id: 1, name: "zs" },
        { id: 2, name: "ls" },
        { id: 3, name: "ww" }
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

<style>
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

### 过渡模式

默认情况下进入动画和离开动画都是同时执行的，如果想要有先后顺序，则可以通过`mode`属性指定动画模式

+ `in-out`：先执行新元素的过渡
+ `out-in`：先执行当前元素的过渡

## 组件的生命周期

生命周期是一个 Vue 实例在被创建的时候经过一系列的初始化过程（组件在被创建时也是一个实例），在这个过程中每个阶段都会调用一个特定的方法，`new Vue()`本质上创建的是一个大组件，而其他自定义组件都具有生命周期

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

```js
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

## 组件渲染

在过去的渲染方式中，Vue 根据`el`渲染实例控制的区域，但是 Vue 提供了`render`函数来实现组件覆盖实例的控制区域，`render`函数接收一个方法，用于创建`Vnode`，然后将它返回，组件会完全覆盖 Vue 控制的实例

```html
<div id="app"></div>

<script>
const one = {
  template: "<div>one</div>"
};

const app = new Vue({
  el: "#app",
  render (createElement){
    return createElement(one);
  }
});
</script>
```

因为`render`选项的存在，Vue 不会根据`el`指定的元素来渲染视图

这种方式经常在使用 vue-cli 创建的项目中用到，它会被简化成下面这样：

```js
const app = new Vue({
  el: "#app",
  render: h => h(App)
});
```
