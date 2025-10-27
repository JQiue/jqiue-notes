---
title: Vue
category: 框架
tag: [Vue]
article: false
---

::: caution
基于 Vue 2 编写，Vue 3 已经推出
:::

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

Vue，Angular，React 一起被称为前端三大框架，Vue 是国人尤雨溪编写的一套前端框架解决方案，所有的资料都有中文支持，并且整合了其他框架中的优点，大大降低了学习难度

Vue 是通过数据驱动来更新页面的，而无需手动操作 DOM 来更新，只要将数据交给 Vue，Vue 就会自动将数据渲染到页面上，这也说明 Vue 是响应式的

Vue 支持组件化开发，可以将网页上的内容拆分成一个独立的组件，通过拼装组件来构成一个完整的页面

![components](https://cn.vuejs.org/images/components.png)

Vue 是基于 MVVM 设计模式来设计的，MVVM 由三部分组成：

+ Model：数据模型和持久化抽象层，保存数据，处理数据业务逻辑
+ View：视图层，展示数据，与用户交互
+ ModelView：数据模型视图适配器，每一个 View 都会与 Model 中的属性一一对应

MVVM 模式最大的特点就是支持数据的双向传递，在 Vue 中 View 就是页面，Model 就是 Vue 实例对象中的 data，而 View Model 就是 Vue 实例对象

有两种使用方式：

+ 通过 script 标签导入，初学阶段使用
+ 基于 vue-cli 脚手架使用，这是最常用的方式

## 创建 Vue 实例

在引入后，Vue 被注册了一个全局变量，通过这个变量就能创造实例对象

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

虽然元素已经交给了 Vue，但 Vue 毕竟是一个渲染数据的框架，可以通过实例中的`data`属性来定义数据

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

你可能会好奇`{{}}`这到底是个啥？这个东西就是用来帮助将`data`中的数据渲染到页面中，请详见模板语法，这时候页面就会显示：

`你好，Vue`

至此，一个简单 Vue 应用就已经完成了！！！

## 模板语法和渲染函数

Vue 通过指定的模板语法来渲染 DOM，先了解一下前端渲染页面的的三种方式：

+ 原生 JavaScript 字符串拼接，将数据以字符串的方式拼接到 html 标签中，缺点是不同的开发人员风格差异较大，后期难以维护
+ 使用前端模板引擎，它拥有自己的一套模板语法规则，优点是开发人员都遵循同样的规则编写代码，方便了后期的维护，但是没有事件机制
+ 使用 Vue 特有的模板语法，包含插值表达式，指令，属性绑定，样式绑定，事件绑定，分支循环结构

在底层上，Vue 会将模板编译成虚拟 DOM 渲染函数，结合响应系统，Vue 能够计算出最少需要重新渲染多少组件，以减少 DOM 操作

```html
<div id="app"></div>
```

```js
const app = new Vue({
  el: '#app'
});

console.log(app.$options.render);
```

在 HTML 中编写的模板语法都会编译成`app.$options.render`，因此可以查看究竟。换句话来说，只要改变`render`函数，就能改变视图

## 插值表达式

插值表达式用于渲染数据，在 Vue 中使用“Mustache”语法，即`{{}}`。该语法会自动将 data 对象中对应的 property 值绑定到插值处，如果数据发生改变，页面数据也会发生改变

由于 Vue 对模板语法提供了 JavaScript 表达式支持，插值表达式中的 JavaScript 代码都会被解析，仅限于单个表达式，比如`{{1 + 1}}`会得到`2`

## 双向绑定

Vue 默认是单向绑定的，只要将数据交给实例对象，实例对象就能够在视图中渲染数据。而双向绑定由`v-model`指令来实现，只适用于`input`，`textarea`，`select`表单元素

```html
<input type="text" v-model="msg">
```

::: vue-demo 双向绑定

```vue
<template>
  <div>
    <p>{{msg}}</p>
    <input type="text" v-model="msg">
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "JQiue"
    }
  }
}
</script>
```

:::

双向绑定的原理十分简单，分为二个步骤：

1. 使用`v-bind`绑定元素的`value`，当 data 中的数据变化时，同步输入框的内容
2. 利用`v-on`监听元素的`input`或`change`事件，当输入框的内容变化时，同步 data 中的数据

::: vue-demo 双向绑定实现

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

一般使用`document`对象获取 DOM 时，无论是原生的元素，还是自定义的组件，拿到的都是原生元素。而 Vue 提供了特殊属性`ref`来标记元素，如果这个元素是原生的，那么就会返回原生元素，如果是一个组件，将会返回这个组件的实例对象，通过`this.$refs`访问

```vue
<template>
  <div>
    <p ref="p">{{msg}}</p>
    <foo ref="foo"></foo>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "p 的数据"
    }
  },
  components: {
    "foo": {
      template: "<div>foo 组件</div>"
    }
  },
  mounted() {
    console.log(this.$refs); // {p: p, foo: a}
    console.log(this.$refs.p); // 
    console.log(this.$refs.foo); // {}
  }
}
</script>
```

## nextTick

Vue 中的 DOM 更新是异步的，这导致数据更新后，获取的 DOM 不是最新的，那么实例`$nextTick(callback)`就是这个问题的解决方案

`$nextTick`会在下一次 DOM 更新后执行其中的回调，所以在修改数据后立即使用它

## 指令

Vue 指令本质就是自定义属性，由于 Mustache 语法不能作用在 HTML 特性（attribute） 上，无法控制 DOM 的行为，而指令封装了 Vue 实现的功能，以`v-`开头的属性都是 Vue 提供的指令，通过指令，就可以影响 DOM 的某些行为

+ v-once - 元素只会被渲染一次，即使数据发生改变也不会重新渲染
+ v-cloak - 如果网页性能较差，用户可能会看到模板内容，`v-cloak`暂时隐藏元素，等待数据渲染完毕显示元素，使用该指令之前，要通过 CSS 属性选择器选中并添加`display: none`来实现隐藏
+ v-text - 会覆盖原有的元素内容，但不会解析内容中的 HTML
+ v-html - 也会覆盖原有的内容，但是会解析内容中的 HTML
+ v-if，v-else，v-else-if - `v-if`会根据表达式的值来选择是否渲染该元素，可以从`data`中获取数据，也可以直接使用表达式，如果为`false`，该元素根本不会被创建。`v-else` 和`v-if`或`v-else-if`搭配使用，不需要表达式，如果`v-if`不满足条件，就会渲染`v-else`中的元素。和`v-if`或`v-else-if`一起使用，需要表达式
+ v-show - `v-show`跟`v-if`一样通过条件表达式选择渲染数据，但是`v-show`为`false`时，仍然会创建该元素，只不过被隐藏掉了
+ v-for：`v-for`会根据数据多次渲染元素，可以遍历、数字、数组、字符串、对象

```html
<p v-for="(value, index) in [1, 3, 4, 6]">{{value}}</p>
<p v-for="(value, index) in 8">{{value}}</p>
<p v-for="(value, index) in 'hello'">{{value}}</p>
<p v-for="(value, key) in obj">{{key}}{{value}}</p>
```

::: tip
遍历数字时会从 1 开始
:::

为了提高`v-for`的性能，在更新已渲染的元素列表时，会采用“就地更新“策略，正是因为这个策略，在某些时刻会导致数据产生一种混乱。下面是一个例子，请选中一项，然后点击添加，会发现选择的某一项在数据渲染后居然变了，比如选中了`ls`，渲染后居然变成选中了`zs`

::: vue-demo 未绑定 key

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

这是因为`v-for`渲染元素时，会先查看缓存中有没有需要渲染的元素，如果没有，就会创建一个新的放在缓存中，如果有，则不会创建新的，直接复用原来的元素，为了给 Vue 更好的追踪节点的身份，从而重用和重新排序现有元素，应该为每项提供一个唯一`key`属性，千万不要将类似于数组的索引为`key`的值

::: vue-demo 绑定 key

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
    add() {
      this.persons.unshift({id: this.persons.length, name: this.name});
    }
  }
}
</script>
```

:::

v-if 和 v-for 最好不要在同一个元素上使用，非常浪费性能。如果遇到必须使用的场景，可以在外层嵌套`<template>`使用，因为它不会生成 DOM 节点，是否渲染取决于里面的元素

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

+ `.once` - 只触发一次回调函数
+ `.prevent` - 调用`event.preventDefault()`，阻止元素的默认行为，比如 a 标签的跳转
+ `.stop` - 调用`event.stopProagation()`，阻止事件冒泡
+ `.self` - 只会让当前元素触发事件的时候才执行回调函数
+ `.capture` - 将冒泡冒泡变成事件捕获

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

Vue 也允许注册自定义指令，这个指令的逻辑可以自己实现。通过`Vue.directive()`方法注册一个全局指令，第一个参数为指令名，第二个参数接受一个对象，对象中定义了几个钩子函数用于不同的生命周期中调用，每个钩子函数都可以接收绑定的元素对象，用来操作 DOM

```js
Vue.directive('color', {
  bind: function(el){
    el.style.color = 'red'
  }
});
```

如果要想将指令作为一个局部的指令，可以在组件中接收一个`directives`对象，这个属性 key 就是指令后缀，逻辑也通过对应 key 的函数实现

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

::: tip computed 和 methods 的区别
methods 也可以直接使用在插值语法中，对于函数来说，每次都需要重新调用返回结果。而 computed 只要返回值不改变，就只会被执行一次，结果会被缓存并立即返回，computed 适用于结果不需要经常发生变化的场景
:::

## 侦听器

侦听器可以监听某一个数据发生变化时触发一个函数，给实例增加`watch`属性接受一个对象，其中方法名必须和要监听的数据名相同，每个方法还可以接收两个参数，分别是修改的新值和被修改的旧值

::: vue-demo 侦听器

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

::: vue-demo 侦听器

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

`Vue.filter`是全局的，在所有的实例对象中都可以使用，而组件也支持使用 `filters`属性来定义局部的过滤器，方法名即为过滤器的名称

## 生命周期

生命周期是一个 Vue 实例在被创建的时候经过一系列的初始化过程（组件在被创建时也是一个实例），在这个过程中每个阶段都会调用一个特定的方法，这给用户在不同阶段添加自己代码的机会。`new Vue()`本质上创建的是一个大组件，而其他自定义组件都具有生命周期

+ 创建期间

1. `beforeCreate`：实例未创建，不能访问实例数据，通常用于初始化插件开发中的一些初始化任务
2. `created`：实例已创建，能够访问数据，常用于异步数据的获取
3. `beforeMount`：编译好了页面模板，但还没有渲染到界面上，不能够获取渲染后的内容
4. `mounted`：已经完成模板的渲染，可以获取渲染后的内容

+ 运行期间

1. `beforeUpdate`：只有数据被修改时才会触发，但是界面上的数据还未更新
2. `updated`：界面已经完成重新渲染，此时可以访问更新后的内容

+ 销毁期间

1. `beforeDestroy`：组件销毁之前触发，是最后能够访问到数据和方法的周期
2. `destroyed`：组件销毁后触发，但是不要在这里操作组件的数据和方法

+ `<keep-alive>`

1. `activated`：被缓存的组件激活时调用
2. `deactivated`：被缓存的组件去活化后调用

```js
new Vue({
  el: '#app',
  beforeCreate() {
    console.log('beforeCreate called');
  },
  created() {
    console.log('created called');
  },
  beforeMount() {
    console.log('beforeMount called');
  },
  mounted() {
    console.log('mounted called');
  },
  beforeUpdate() {
    console.log('beforeUpdate called');
  },
  updated() {
    console.log('mounted called');
  },
  beforeDestroy() {
    console.log('beforeDestroy called');
  },
  destroyed() {
    console.log('destroyed called');
  },
})
```

## Vue.set 和 Vue.delete

Vue 无法探测响应式对象的新增属性，这导致这个属性不是响应式的，无法触发视图更新，而 Vue 提供了`Vue.set( target, propertyName/index, value )`来确保这个属性是响应式的

突然使用`delete`删除响应式对象的某个属性，也不会触发视图更新，`Vue.delete( target, propertyName/index )`便是解决方案

## 混入

混入提供了一个非常灵活的方式用来分发实例中可以复用的功能，一个混入对象可以包含任意实例选项，当实例使用混入对象时，混入对象的选项会被合并到实例本身的选项

```js
const mixin = {
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('hello from mixin!');
    }
  }
};
const app = new Vue({
  el: '#app',
  components: {
    "foo": {
      mixins: [mixin],
      template: `<div></div>`
    },
    "bar": {
      mixins: [mixin],
      template: `<div></div>`
    }
  }
});
```

当混入对象和实例有同名选项时，会以不同的策略进行合并

+ `data`：实例优先
+ `钩子函数`：都会被调用，混入对象的优先调用
+ 值为对象的选项：`methods`、`components`、`directives`会被合并为同一个对象，键名以实例优先

`Vue.mixin`提供了全局混入的方式，这将对每个实例生效，应该谨慎使用

## 组件

组件是 Vue 的重点之一，目的是将网页中拆分成一个个组件进行拼装，就得到了完整的网页。组件是可复用的 Vue 实例，可以增加复用性、可维护性和可测试性

组件本质上就是配置组件产生组件实例，通过渲染函数产生虚拟 DOM，最后替换为真实 DOM，最终目标是产生虚拟 DOM

`Vue.extend()`用于创建组件实例，这个方法接收一个对象，`template`属性决定组件的 HTML 内容。`Vue.component(name, component)`用于组件注册，通过`Vue.component()`注册的组件可以在任意 Vue 实例中使用

```js
const foo = Vue.extend({
  template: `<div>component</div>`
});
// 注册
Vue.component("foo", foo);
```

::: caution
组件只能有一个根元素，如果注册时使用的是驼峰命名，使用时必须是短横线命名
:::

经过上述步骤之后，就可以在模板中作为一个自定义 HTML 标签使用，Vue 会将组件替换为`template`属性中定义的内容

```html
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

### 局部组件

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

### Prop

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

::: caution
如果在传递的时候使用了驼峰命名，在接收的时候要转换为小写，如果想要在使用的过程中使用驼峰命名，则应该在传递的时候使用短横线命名，接收的时候使用驼峰命名
:::

### 自定义事件

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

::: caution
在使用自定义事件时最好使用短横线命名
:::

::: tip 多级传递
数据和方法不能够跨越层级，必须一层一层的传
:::

### 动态组件

通过`v-if`来实现组件的切换来达到动态组件的效果

```html
<button @click="toggle">切换</button>
<foo v-if="isShow"></foo>
<bar v-else></bar>
```

::: vue-demo 组件切换

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

::: vue-demo component 实现组件切换

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

### 缓存组件状态

组件进行切换的时候不能保存当前组建的状态，因为触发了重新渲染，下面的选择框就是个例子

::: vue-demo 组件切换

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

::: vue-demo keep-alive 组件保存状态

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

### 插槽

组件看起来也是一个自定义标签，难道就不能直接写入一些内容？插槽就能做到这一点，插槽指的是预留的接口，用于接收外面传递的信息

在这个例子中，组件填充了内容，并没有想象中那样被展示出来

```html
<foo>content</foo>
```

::: vue-demo vue

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

::: vue-demo 插槽

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

::: vue-demo 多个插槽

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

::: vue-demo v-slot

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

::: vue-demo 预留内容的插槽

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

### 作用域插槽

作用域插槽就是带数据的插槽，让父组件能够填充插槽内容的时候也能使用子组件的数据，首先要在插槽中通过`v-bind`暴露子组件的数据，然后父组件`template`的`slot-scope`属性来接收

::: vue-demo 作用域插槽

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

::: vue-demo 应用场景

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

::: vue-demo v-slot 的用法

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

### 组件渲染

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

### 事件总线

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

## 插件

插件通常用来给 Vue 添加全局功能，插件对象必须具有`install`方法，第一个参数为构造器，第二个参数为可选项

```js
const myPlugin = {
  install(Vue, options) {
    Vue.myPluginMethod = function () {
      console.log('myPluginMethod from myPlugin');
    }
  }
}
Vue.use(myPlugin);
Vue.myPluginMethod();
```

## 动画和过渡

Vue 提供了内置组件`transition`用于给任何元素或组件提供过渡效果，Vue 提供了在插入、更新或移除 DOM 时，提供不同方式的过渡效果，将需要过渡的组件放在`transition`标签中，然后实现几个过渡的 CSS 属性即可

以下是在进入/离开的过渡时切换的 class，都需要在 style 中手动实现

+ v-enter：进入过渡时的开始状态
+ v-enter-to：进入过渡时的结束状态
+ v-enter-active：定义进入过渡的过渡时间、延迟和曲线函数
+ v-leave：离开过渡时的开始状态
+ v-leave-to：离开过渡时的结束状态
+ v-leave-active：定义离开过渡的过渡时间、延迟和曲线函数

如果使用了没有名字的`transition`组件，`v-`是这些类名的默认前缀，如果为这个组件提供了`name`属性指定前缀，那么`v-`将会被替换为`name`的属性值，这样可以为不同的元素设置不同的过渡效果

::: vue-demo 过渡演示

```vue
<template>
  <div>
    <button v-on:click="toggle">切换</button>
    <transition appear>
      <component :is="name"></component>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'foo',
    }
  },
  methods: {
    toggle() {
      this.name = this.name === "foo" ? "bar" : "foo";
    }
  },
  components: {
    "foo": {
      template: `<div class="box foo"></div>`
    },
    "bar": {
      template: `<div class="box bar"></div>`
    }
  },
}
</script>

<style>
  .box {
    width: 100px;
    height: 100px;
  }
  .foo {
    background: green;  
  }
  .bar {
    background: red;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: all 1s;
  }
</style>
```

:::

### 钩子函数

Vue 也提供了过渡的钩子函数，用于实现不同时期的动画效果，以下事件可以被`v-on`监听

+ before-enter：进入前
+ enter：进入中
+ after-enter：进入后
+ before-leave：离开前
+ leave：离开中
+ after-leave：离开后

每个钩子函数都会接收到过渡元素的 DOM 对象，如果只在钩子函数中实现过渡效果，应该给 enter 和 leave 传入 done 并回调，否则后续的 after 事件不会执行。当然如果不传入 done，过渡会从定义的类名中查找，但 Vue 建议在过渡的元素上添加`v-bind:css="false"`属性，这样 Vue 会跳过对 CSS 的检测，避免定义的属性带来影响

### 自定义过渡的类名

除了使用默认的类名 v-xxx 、自定义类名前缀 name="xxx"、钩子函数这些定义过渡动画以外，还可以在`<transition>`中使用以下属性的自定义类名，这对于一些基于类名的动画库非常有用

+ enter-class
+ enter-active-class
+ enter-to-class
+ leave-class
+ leave-active-class
+ leave-to-class

```html
<transition enter-class="" enter-active-class="" enter-to-class="">
  // 过渡的元素
</transition>
```

::: vue-demo 自定义过渡类名示例

```vue
<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <button v-on:click="toggle">切换</button>
    <transition 
      appear
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__lightSpeedInRight"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
      >
      <div class="box" v-show="isShow"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
  }
}
</script>

<style>
  .box {
    width: 100px;
    height: 100px;
    background: green;  
  }
</style>
```

:::

### 列表组过渡

对于`v-for`渲染的元素来说，需要使用`<transition-group>`组件包裹，且必须为每一个列表项绑定`key`，这样每次更新列表项都会获得过渡效果

::: vue-demo 列表组过渡示例

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
    add() {
      this.persons.unshift({id: this.persons.length, name: this.name});
    }
  }
}
</script>

<style>
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: all 1s;
  }
</style>
```

:::

### 过渡模式

默认情况下进入动画和离开动画都是同时执行的，如果想要有先后顺序，则可以通过`mode`属性指定动画模式

+ `in-out`：先执行新元素的过渡
+ `out-in`：先执行当前元素的过渡

### 状态过渡

<!-- to be updated -->

## 路由

在过去，服务端处理来自浏览器的请求时，会根据不同的 URL 解析对应的页面，并通过 HTTP 传给浏览器解析，这种方式的缺点整个页面都要重新加载，导致体验不好。随着 Web 应用的发展，已经可以实现 URL 变更的时候只改变局部内容，从而获得更好的体验。前端路由的实现都是基于`History`和`Location`这两个 WebAPI，路由是现在前端框架的基本能力，虽然实现起来没什么太多难度，但却是单页面应用不可缺少的一部分

VueRouter 和 Vuex 一样是 Vue 官方提供的核心插件，用于解决组件的切换显示，和`v-if`不同的是，VueRouter 是通过 URL 的变化来切换的，而且比`v-if` 更加强大，能够在切换的时候传递参数

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

可以在 url 上传递参数，上面的参数都会被`this.$route`的`query`属性所接收，会发现像`get`请求传参一样

```html
<router-link to="/one?name=one&path=one">切换第一个界面</router-link>
```

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

在 URL 中传递参数无疑会使组件产生高度耦合，从而只能在特定的 URL 上使用，路由中同样可以定义`props`，如果`props`为布尔形式，则`params`会被设置为组件的`props`，如果为对象形式，则会按照原样设置为组件属性

### 嵌套路由

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

### 命名路由

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

### 命名视图

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

### 监听路由

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

### 导航方式

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

### History 模式

VueRouter 默认是 hash 模式，通过哈希来模拟一个完整的 URL，如果不想要很丑的哈希，可以切换为`history`模式

```js
const router = new VueRouter({
  mode: 'history',
});
```

不过这种模式需要后端的支持，因为它会发送一个真正 HTTP 请求，不然就会得到 404

### 导航守卫

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

### 路由元数据

<!-- to be updated -->

## 全局状态

如果组件之间想要共享数据，则需要一些非常麻烦的技巧，比如父传子，或者兄弟组件之间的传递，都需要写很麻烦的编码来解决，而 Vuex 就是 Vue 提供的解决方案，可以将需要的共享数据放到 Vuex 中，这样能够方便任何组件中都能获取或修改

Vuex 是作为另一个库来使用的，但是 Vuex 依赖于 Vue，详见[官方](https://vuex.vuejs.org/zh/installation.html)

```js
const store = new Vuex.Store({
  state: {
    msg: "jinqiu.wang"
  }
})
```

在组件中使用 Vuex 中的数据之前，必须通过`new Vuex.Store()`创建一个共享的数据对象，该构造函数也接收一些键值对来配置实例，`state`是其中一个配置项，用于保存共享的数据。在组件中通过`this.$store`访问这个实例对象，所有的组件都可以通过`this.$store.state`访问共享数据

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
    msg: "好的，这里是 Vuex 中的数据"
  }
});

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

### 修改共享数据

`state`也是响应式的，但是 Vue 并不推荐直接修改，如果每个组件中都修改数据，一旦出现错误就很难追踪到具体的组件，不利于维护。Vuex 提供了额外的配置项`mutations`来解决这个问题，这个选项用于保存修改共享数据的方法，每个方法的第一个参数必然是`state`，后面的参数才是访问外界传入的数据

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1;
    },
    sub(state) {
      state.count -= 1;
    }
  }
});
```

```js
this.$store.commit("add");
```

因此在组件中通过`this.$store.commit("方法名", args)`间接调用方法，如果出现了错误只需要排查`mutations`中的方法即可，大大提高维护性

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
      state.count += 1;
    },
    sub(state) {
      state.count -= 1;
    }
  }
})

export default {
  store,
  components: {
    "foo": {
      template: `<div>
        <button @click='add'>增加</button>
        <button @click='sub'>减少</button>
        <input type='text' :value='this.$store.state.count'>
      </div>`,
      methods: {
        add() {
          this.$store.commit("add");
        },
        sub() {
          this.$store.commit("sub");
        }
      }
    },
    "bar": {
      template: `<div>
        <button @click='add'>增加</button>
        <button @click='sub'>减少</button>
        <input type='text' :value='this.$store.state.count'>
      </div>`,
      methods: {
        add() {
          this.$store.commit("add");
        },
        sub() {
          this.$store.commit("sub");
        }
      }
    },
  }
}
</script>
```

Vue 更推荐使用对象风格的`commit`，这样可以包含多个字段且更容易阅读

```js
this.$store.commit({
  type: 'add'
});
```

另外不要在`mutations`中定义异步的函数

## Action

`actions`和`mutations`都是用来定义方法的，只不过它是用来提交`mutations`，而不是直接去变更`state`，但是它允许定义异步操作

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1;
    },
    sub(state) {
      state.count -= 1;
    }
  },
  actions: {
    add (context) {
      context.commit('add');
    }
  }
});
```

### Getters

`getters`是除了`state`和`mutations`另外一个配置项，它的作用和计算属性一样，数据会被缓存起来，当数据改变时才重新计算，组件通过`this.$store.getters.属性名`使用

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1;
    },
    sub(state) {
      state.count -= 1;
    }
  },
  getters: {
    getCount(state){
      return state.count;
    }
  }
});
```

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
      state.count += 1;
    },
    sub(state) {
      state.count -= 1;
    }
  },
  getters: {
    getCount(state){
      return state.count;
    }
  }
});

export default {
  store,
  components: {
    "foo": {
      template: `<div>
        <button @click='add'>增加</button>
        <button @click='sub'>减少</button>
        <input type='text' :value='this.$store.getters.getCount'>
      </div>`,
      methods: {
        add() {
          this.$store.commit("add");
        },
        sub() {
          this.$store.commit("sub");
        }
      }
    },
    "bar": {
      template: `<div>
        <button @click='add'>增加</button>
        <button @click='sub'>减少</button>
        <input type='text' :value='this.$store.getters.getCount'>
      </div>`,
      methods: {
        add() {
          this.$store.commit("add");
        },
        sub() {
          this.$store.commit("sub");
        }
      }
    },
  }
}
</script>
```

### 在组件中监听数据的改变

<!-- to be updated -->

## Vue3

Vue3 已经推出很久，可以上线使用了，这里列出一些涉及到的问题以及解决方案

使用`watch`监听`props`变化：

```js
/**
 * 1. 千万不要解构 props
 */
const props = defineProps();

watch(() => props.data, () => {

}, {
  immediate: true,
  deep: true
})
```

## 组件库

有很多基于 Vue 打造的 UI 库：

+ [Element UI](https://element.eleme.cn)
+ [Element Plus](https://element-plus.org/zh-CN/)
+ [Ant Design of Vue](https://antdv.com/docs/vue/introduce-cn/)
+ [Vuestic UI](https://vuestic.dev/)
+ [Naive UI](https://www.naiveui.com/zh-CN/os-theme)
+ [Material Design 组件库](https://varletjs.org/#/zh-CN/index)
+ [基于 Bulma 的 Vue.js 轻量级 UI 组件](https://buefy.org/)
+ [Vue Material](https://www.creative-tim.com/vuematerial)
+ [Vuetify](https://vuetifyjs.com/zh-Hans/)
+ [PrimeVue](https://primevue.org/)
+ [Vant](https://vant-ui.github.io/vant/#/zh-CN)
+ [TDesign](https://tdesign.tencent.com/)

## 总结

+ Vue 是一个基于 MVVM 设计模式的 JavaScript 渐进式框架
+ 插值表达式用于渲染数据，数据发生变化，就会触发页面变化
+ `v-model`可以实现部分表单元素的双向绑定，原理是`v-bind`绑定元素的值，`v-on`监听`input`事件，数据发生变化时，会使两者进行同步更新
+ 特殊属性是作用在元素上的属性，会被 Vue 特殊的进行解析，比如获取原生元素使用`ref`来标记，和`v-for`进行配合的`key`等
+ Vue 中的 DOM 更新是异步的，如果想要再更新后获得最新 DOM，要使用`nextTick()`
+ 指令是一种特殊的自定义属性，因为插值表达式不能作用于 HTML 特性上，通过封装的一些指令来控制 DOM
+ `v-if`和`v-for`同时使用时，在 Vue2 版本中`v-for`优先级是最高的，而 Vue3 中`v-if`优先级最高，但它们是不兼容的，并不推荐同时使用
+ 计算属性用于数据不经常发生变化的时候使用，因为它会缓存数据
+ 侦听器可以在数据发生变化的时候触发回调
+ 过滤器可以对插值语法或`v-bind`中的数据进行格式化处理
+ `scoped`会让样式只在组件内生效，原理是给节点增加自定义属性，根据属性选择器添加样式
+ `props`用于接收自定义在组件上的属性，可以实现父组件给子组件传值
+ 子组件修改父祖家只能间接调用父组件的修改方法
+ `keep-alive`会缓存组件的状态，避免更多的性能开销，同时会触发一个对应的生命周期函数
+ 插槽用于给组件提供一个填充数据的接口
+ 作用域插槽用于子组件向父组件暴露的自己数据，交给父组件决定如何渲染
+ 如果两个组件没有关系，可以使用一个中转实现传值
+ `props`比`data`的优先级更高，props => methods => data => computed => watch
+ 路由更好的控制单页面改变的内容
+ 如果是`history`模式，必须要后端支持，否则会 404
+ 如果在 URL 上使用 query，那么会被路由的`query`接收，如果是动态路由参数，会被挂载到`params`
+ 可以嵌套路由
+ 导航守卫是对路由的过程中起到权限控制的功能，比如跳转或者取消跳转等功能，有全局、路由独享、组件独享
+ 全局路由对所有的路由触发，独享守卫只对一条路由规则触发，组件守卫只对当前组件的路由触发
+ Vuex 本身不是用来做持久化存储的
+ Vuex 中的数据是一种单向数据流
+ state = data，getters = computed，mutations = methods，actions 提交 mutations，modules 将前面更加细分
+ mutations 是同步的，Actions 可以做任何异步的操作
+ 可以在其他组件中映射这些属性

## 参考资料

+ Vue 官方文档
+ 深入理解 Vue.js 实战
+ 深入浅出 Vue.js
