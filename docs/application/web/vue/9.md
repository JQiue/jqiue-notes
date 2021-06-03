---
title: 过渡动画
category: 框架
tag: Vue
author: JQiue
article: false
---

Vue 提供了在插入、更新或移除 DOM 时，提供不同方式的过渡效果，将需要过渡的组件放在`transition`标签中，然后实现几个过渡的 CSS 属性即可

## 进入、离开

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
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
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

## 钩子函数

Vue 也提供了过渡的钩子函数，用于实现不同时期的动画效果，以下事件可以被 v-on 监听

+ before-enter：进入前
+ enter：进入中
+ after-enter：进入后
+ before-leave：离开前
+ leave：离开中
+ after-leave：离开后

每个钩子函数都会接收到过渡元素的 DOM 对象，如果只在钩子函数中实现过渡效果，应该给 enter 和 leave 传入 done 并回调，否则后续的 after 事件不会执行。当然如果不传入 done，过渡会从定义的类名中查找，但 Vue 建议在过渡的元素上添加`v-bind:css="false"`属性，这样 Vue 会跳过对 CSS 的检测，避免定义的属性带来影响

## 自定义过渡的类名

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
  button {
    background: #EFEFEF;
    border-width: 1px;
  }
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

## 列表组过渡

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

## 过渡模式

默认情况下进入动画和离开动画都是同时执行的，如果想要有先后顺序，则可以通过`mode`属性指定动画模式

+ `in-out`：先执行新元素的过渡
+ `out-in`：先执行当前元素的过渡
