---
title: 特殊属性
category: 框架
tag: Vue
author: JQiue
article: false
---

特殊属性指的是 Vue 会对元素上的一些属性进行特殊的解析，比如`key`会和`v-for`搭配使用，`is`和`component`控制组件的切换，`slot`和`slot-scope`用于插槽中，这里着重讲`ref`属性

Vue 是一个数据驱动界面更新框架，无需使用原生语法操作 DOM 来更新界面，但有时候却需要获取 DOM，而 Vue 实际上不推荐直接操作 DOM，一般使用`document`对象获取 DOM 时，无论是原生的元素，还是自定义的组件，拿到的都是原生元素

而 Vue 提供了特殊属性`ref`来标记元素，如果这个元素是原生的，那么就会返回原生元素，如果是一个组件，将会返回这个组件的实例对象，都会被保存在`this.$refs`上

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
