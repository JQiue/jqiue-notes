---
title: 计算属性、侦听器、过滤器
category: 框架
tags: [Vue, Alpha]
author: JQiue
article: false
---

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

在插值语法中，应该当作一个属性使用，而不是一个函数，直接写上名称即可

::: tip 计算属性和函数的区别
函数也可以直接使用在插值语法中，只不过需要调用的方式，对于函数来说，每次都需要重新调用返回结果，而计算属性只要返回值不改变，就只会被执行一次，结果会被缓存并立即返回，计算属性适用于结果不需要经常发生变化的场景
:::

## 侦听器

侦听器可以监听某一个数据发生变化时触发一个函数，给实例增加`watch`属性接受一个对象，其中方法名必须和要监听的数据名相同

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

每个方法还可以接收两个参数，分别是修改的新值和被修改的旧值

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

过滤器用于格式化插值语法中的文本

```js
Vue.filter("formatStr", function(value){
  return value.replace("filter");
})
```

filter 函数接收两个参数：过滤器名称和处理数据的回调函数，回调函数中的数据来自于使用过滤器的文本值，如果回调函数不返回，那么不会显示数据，因此处理数据后必须返回

将插值语法中的数据和过滤器使用管道符号`|`分隔即可

使用 Vue 对象中的 filter 函数是全局的，在所有的 Vue 实例对象中都可以使用，而组件也支持使用 filters 属性来定义局部的过滤器，key 为过滤器名称
