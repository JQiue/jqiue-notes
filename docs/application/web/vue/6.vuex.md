---
title: 状态管理
category: 框架
tag: Vue
author: JQiue
article: false
---

如果组件之间想要共享数据，则需要一些非常麻烦的技巧，比如父传子，或者兄弟组件之间的传递，都需要写很麻烦的编码来解决，而 Vuex 就是 Vue 提供的解决方案，可以将需要的共享数据放到 Vuex 中，这样能够方便任何组件中都能获取或修改

## 使用 Vuex

Vuex 是作为另一个库来使用的，但是 Vuex 依赖于 Vue，所以先导入 Vue，再导入 Vuex，详见[官方](https://vuex.vuejs.org/zh/installation.html)

```js
const store = new Vuex.Store({
  state: {
    msg: "wjqis.me"
  }
})
```

在组件中使用 Vuex 中的数据之前，必须通过`new Vuex.Store()`来创建一个共享的数据对象，该构造函数也接收一些键值对来配置实例，`state`是其中一个配置项，用于保存共享的数据。在组件中通过`store`属性接收这个实例对象，这样所有的组件后代都可以通过`this.$store.state`访问共享数据

::: demo [vue] Vuex

```vue
<template>
  <div>
    {{this.$store.state.msg}}
    <foo></foo>
  </div>
</template>

<script>
const store = new Vuex.Store({
  state: {
    msg: "wjqis.me"
  }
})

export default {
  store: store,
  components: {
    "foo": {
      template: "<div>foo：{{this.$store.state.msg}}</div>"
    }
  }
}
</script>
```

:::

## 修改共享数据

数据也是可以直接修改的，但是 Vue 并不推荐直接修改，因为每个组件都可以修改数据，一旦出现错误就很难追踪到具体的组件，不利于维护

::: demo [vue] 修改数据

```vue
<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
const store = new Vuex.Store({
  state: {
    count: 0
  }
})

export default {
  store: store,
  components: {
    "foo": {
      template: "<div><button @click='add'>增加</button><button @click='sub'>减少</button><input type='text' :value='this.$store.state.count'></div>",
      methods: {
        add(){
          this.$store.state.count++
        },
        sub(){
          this.$store.state.count--
        }
      }
    },
    "bar": {
      template: "<div>bar：{{this.$store.state.count}}</div>",
    },
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

Vuex 提供了额外的配置项`mutations`来解决这个问题，这个选项用于保存修改共享数据的方法

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1
    },
    sub(state) {
      state.count -= 1
    }
  }
})
```

可以在组件中通过`this.$store.commit("方法名")`间接调用保存的方法，如果出现了错误只需要排查`mutations`中的方法即可，大大提高维护性

::: demo [vue] mutations 方法调用

```vue
<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1
    },
    sub(state) {
      state.count -= 1
    }
  }
})

export default {
  store: store,
  components: {
    "foo": {
      template: "<div><button @click='add'>增加</button><button @click='sub'>减少</button><input type='text' :value='this.$store.state.count'></div>",
      methods: {
        add(){
          this.$store.commit("add")
        },
        sub(){
          this.$store.commit("sub")
        }
      }
    },
    "bar": {
      template: "<div><button @click='add'>增加</button><button @click='sub'>减少</button><input type='text' :value='this.$store.state.count'></div>",
      methods: {
        add(){
          this.$store.commit("add")
        },
        sub(){
          this.$store.commit("sub")
        }
      }
    },
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

## Getters

`getters`是除了`state`和`mutations`另外一个配置项，它的作用和计算属性一样，数据会被缓存起来，当数据改变时才重新计算，组件通过`this.$store.getters.属性名`使用

::: demo [vue] Getters

```vue
<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1
    },
    sub(state) {
      state.count -= 1
    }
  },
  getters: {
    getCount(state){
      return state.count
    }
  }
})

export default {
  store: store,
  components: {
    "foo": {
      template: "<div><button @click='add'>增加</button><button @click='sub'>减少</button><input type='text' :value='this.$store.getters.getCount'></div>",
      methods: {
        add(){
          this.$store.commit("add")
        },
        sub(){
          this.$store.commit("sub")
        }
      }
    },
    "bar": {
      template: "<div><button @click='add'>增加</button><button @click='sub'>减少</button><input type='text' :value='this.$store.getters.getCount'></div>",
      methods: {
        add(){
          this.$store.commit("add")
        },
        sub(){
          this.$store.commit("sub")
        }
      }
    },
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
