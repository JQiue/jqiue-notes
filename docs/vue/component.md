---
title: 组件
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

组件是 Vue 的重点之一，目的是将网页中拆分成一个个组件进行拼装，就得到了完整的网页。组件是可复用的 Vue 实例，可以增加复用性、可维护性和可测试性

组件本质上就是配置组件产生组件实例，通过渲染函数产生虚拟 DOM，最后替换为真实 DOM，最终目标是产生虚拟 DOM

## 组件制作

`Vue.extend()`用于创建组件实例，这个方法接收一个对象，`template`属性用来决定组件的 HTML 内容。`Vue.component(name, component)`用于组件注册，通过`Vue.component()`注册的组件可以在任意 Vue 实例中使用

```js
const foo = Vue.extend({
  template: `<div>component</div>`
});
// 注册
Vue.component("foo", foo);
```

::: danger
组件只能有一个根元素，如果注册时使用的是驼峰命名，使用时必须是短横线命名
:::

经过上述步骤之后，就可以在模板中作为一个自定义 HTML 标签使用，Vue 会将组件替换为`template`属性中定义的内容

```
<div id="app">
  <foo></foo>
</div>
```

上面的方式未免太麻烦，可以用以下方式简化组件创建的过程

+ 方式一：不使用`Vue.extend()`，直接给`Vue.component()`传递组件实例

```js
Vue.component("foo", {
  template: `<div>global component</div>`
});
```

+ 方式二：抽出`template`的内容到`script`标签中定义，`template`接收一个选择器即可

```html
<script id="foo" type="text/html">
  <div>foo component</div>
</script>
```

+ 方式三：使用模板标签`<template>`，和方式二一样，`template`接收一个`id`选择器就行了

```html
<template id="foo">
  <div>global component</div>
</template>
```

## 局部组件

和指令、过滤器是一样的，都只能在那个唯一的实例中使用，在实例中使用`components`属性注册组件，`key`为组件名，`value`则是组件对象

```js
new Vue({
  el: "#app",
  components: {
    "bar": {
      template: "<div>bar component<div>"
    }
  }
});
```

组件是一种可复用的 Vue 实例，所以组件也拥有和`new Vue()`一样的选项，每个组件的选项都只能在当前组件中使用

组件中的`data`必须是一个函数，返回值为该组件维护的数据对象，创建新组件时就会调用`data` 函数，保证了组件中的数据是独立的

```js
new Vue({
  el: '#app',
  data: {},
  components: {
    "foo": {
      template: `<div><div/>`,
      data() {
        return {}
      }
    }
  }
});
```

## Prop

`props`可用于接受定义在组件上的属性

```html
<div id="app">
  <foo a="a"></foo>
</div>

<script>
const app = new Vue({
  el: '#app',
  components: {
    "foo": {
      props: ['a'],
      template: `<div>{{a}}<div/>`,
    }
  }
});
</script>
```

组件无法访问父级组件的数据，也可以通过`v-bind`为属性动态绑定数据，这样就实现了数据传递。这是一种单向的数据绑定，在父级中更改后，会立马更新对应的属性，但是不应该在子组件中更改

```html
<div id="app">
  <foo :value="value"></foo>
</div>

<script>
const app = new Vue({
  el: '#app',
  data: {
    value: 'hello'
  },
  components: {
    "foo": {
      props: ['value'],
      template: `<div>{{value}}<div/>`,
    }
  }
});
</script>
```

`props`不仅可以是数组形式，也可以是对象形式，并且对象形式的更加健壮，在[这里](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)可以查看更多用法

```js
Vue.component('my-component', {
  props: {
    a: {
      type: String,
      required: true
    },
  }
});
```

::: danger
如果在传递的时候使用了驼峰命名，在接收的时候要转换为小写，如果想要在使用的过程中使用驼峰命名，则应该在传递的时候使用短横线命名，接收的时候使用驼峰命名
:::

## 自定义事件

当子组件需要和父组件进行通信时，可以使用`$emit(fn, param1, ...)`触发父组件中自定义事件，并且传入参数，这意味着子组件可以通过这种方式传值给父组件

```html
<div id="app">
  <foo @custom-event="customEvent"></foo>
</div>

<script>
const app = new Vue({
  el: '#app',
  methods: {
    customEvent() {
      console.log('已收到子组件的事件派发');
    }
  }
  components: {
    "foo": {
      template: `
      <div>
        <button @click="fatherFn">触发事件</button>
      <div/>`,
      methods: {
        fatherFn() {
          this.$emit('custom-event');
        }
      }
    }
  }
});
</script>
```

::: danger
在使用自定义事件时最好使用短横线命名
:::

::: tip 多级传递
数据和方法不能够跨越层级，必须一层一层的传
:::

## 动态组件

通过`v-if`来实现组件的切换来达到动态组件的效果

```html
<button @click="toggle">切换</button>
<foo v-if="isShow"></foo>
<bar v-else></bar>
```

::: demo [vue] 组件切换

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
      template: `<div>foo component</div>`
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

Vue 专门提供了内置组件`component`用来实现切换，`is`属性用于接收当前需要显示的组件名，`component`会被替换为当前组件，`component`只是更好的替代`v-if`

```html
<component :is="name"></component>
```

::: demo [vue] component 实现组件切换

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <component :is="name"></component>
<div>
</template>

<script>
export default {
  data() {
    return {
      name: "foo"
    }
  },
  components: {
    "foo": {
      template: `<div>foo component</div>`
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

## 缓存组件状态

组件进行切换的时候不能保存当前组建的状态，因为触发了重新渲染，下面的选择框就是个例子

::: demo [vue] 组件切换

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <component :is="name"></component>
<div>
</template>

<script>
export default {
  data() {
    return {
      name: 'foo'
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">foo component</div>`
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

这时候就需要另一个内置组件`keep-alive`来包裹动态组件实现状态保存，以免花费更多的性能开销

```html
<keep-alive>
  <component :is="name"></component>
</keep-alive>
```

::: demo [vue] keep-alive 组件保存状态

```vue
<template>
<div>
  <button @click="toggle">切换</button>
  <keep-alive>
    <component :is="name"></component>
  </keep-alive>
<div>
</template>

<script>
export default {
  data() {
    return {
      name: "foo"
    }
  },
  components: {
    "foo": {
      template: `<div><input type="checkbox">foo component</div>`
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

## 插槽

组件看起来也是一个自定义标签，难道就不能直接写入一些内容？插槽就能做到这一点，插槽指的是预留的接口，用于接收外面传递的信息

在这个例子中，组件填充了内容，并没有想象中那样被展示出来

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

这就需要插槽的帮助，在组件中必须先定义插槽，才能往组件中填充内容，`slot`是 Vue 提供定义插槽的内置组件，它会被替换为在组件标签中添加的内容，可以是 HTML，任意支持的内容，包括其他的组件

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

芜湖，内容正确替换了插槽

如果定义了多个多个插槽，内容则会填充所有的插槽

::: demo [vue] 多个插槽

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
      template: `
      <div>
        foo
        <slot></slot>
        <slot></slot>
        <slot></slot>
      </div>`
    }
  }
}
</script>
```

:::

在定义多个插槽的情况下，可以使用`name`属性标记插槽，通过内置组件`template`的`slot`属性指定填充

```html
<div id="app">
  <foo>
    <template slot="one">one</template>
    <template slot="two">two</template>
    <template slot="three">three</template>
  </foo>
</div>

<script>
const app = new Vue({
  el: '#app',
  components: {
    "foo": {
      template: `
      <div>
        <slot name="one"></slot>
        <slot name="two"></slot>
        <slot name="three"></slot>
      <div/>`,
    }
  }
});
</script>
```

从 Vue 2.6 开始，已经不推荐使用`slot`属性来指定具名插槽，而是使用`v-slot`指令来替代这一方式，`v-slot`必须和`template`组件搭配使用，`v-slot`可被简写为`#`

```html
<template v-slot:one>
  one
</template>

<!-- or -->

<template #one>
  one
</template>
```

::: demo [vue] v-slot

```vue
<template>
  <div>
    <foo>
      <template #one>
        one
      </template>
      <template #two>
        two
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: `
      <div>
        foo
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>`
    }
  }
}
</script>
```

:::

不带名字的`<slot>`具有一个隐含的名字`default`，这意味着`<template #default>`是填充匿名插槽的

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
      template: "<div>foo<slot>默认内容</slot></div>"
    }
  }
}
</script>
```

:::

## 作用域插槽

作用域插槽就是带数据的插槽，让父组件能够填充插槽内容的时候也能使用子组件的数据，首先要在插槽中通过`v-bind`暴露子组件的数据，然后父组件`template`的`slot-scope`属性来接收

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
      data() {
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
        <ul>
          <li v-for="name in scope.names">{{name}}</li>
        </ul>
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

`v-slot`不仅可以指定填充具名插槽，也可以接收暴露的数据

::: demo [vue] v-slot 的用法

```vue
<template>
  <div>
    <foo>
      <template v-slot:default="scope">
        <ul>
          <li v-for="(item, index) in scope.names">{{item}}</li>
        </ul>
      </template>
    </foo>
  </div>
</template>

<script>
export default {
  components: {
    "foo" : {
      template: "<div><slot v-bind:names=names></slot</div>",
      data() {
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

## 事件总线

如果两个组件之间没有关系，互相通信就是一个难题，EventBus 就是解决方案，所有的组件共享一个事件中心，来达到上下平行的通知其他组件的办法

实际上 EventBus 只是一个不具备 DOM 的实例

```html
<div id="app">
  <foo></foo>
  <bar></bar>
</div>

<script>
  // 创建 EventBus
  Vue.prototype.$bus = new Vue();
  const app = new Vue({
    el: '#app',
    components: {
      "foo": {
        template: `
          <div>
            <button @click="sendMsg">通知 bar</button>
          </div>
        `,
        methods: {
          sendMsg() {
            // 派发 EventBus 中的事件
            this.$bus.$emit("barMsg", '来自 foo 组件的消息');
          }
        }
      },
      "bar": {
        template: `<div>{{msg}}</div>`,
        data() {
          return {
            msg: ''
          }
        },
        mounted () {
          // 监听 EventBus 中的事件
          this.$bus.$on('barMsg', msg => {
            this.msg = msg;
          })
        }
      }
    }
  });
</script>
```
