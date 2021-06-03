---
title: 指令
category: 框架
tag: Vue
author: JQiue
article: false
---

Vue 的指令本质就是自定义属性，由于 Mustache 语法不能作用在 HTML 属性（attribute） 上，无法控制 DOM 的行为，而指令封装了 Vue 实现的功能，以 v- 开头的属性都是 Vue 提供的指令，通过指令，就可以影响 DOM 的某些行为

## v-once

使用 v-once 的元素只会被渲染一次

## v-cloak

由于 Vue 会将未绑定的界面渲染给用户，然后创建实例将数据渲染到页面上，如果网页性能较差，用户可能会看到模板内容，所以 v-cloak 会将该元素暂时隐藏，等待数据渲染完毕才会显示元素，但是使用这个指令之前，要通过 CSS 属性选择器来选中这个属性，添加`display: none`来实现

## v-text 和 v-html

v-text 会覆盖原有的元素内容，但不会解析 HTML，v-html 也会覆盖原有的内容，但是会解析 HTML

## v-if

v-if 会根据表达式的值来选择是否渲染该元素，可以从 data 中获取数据，也可以直接使用表达式，如果为 false，该元素根本不会被创建

## v-else

v-else 和 v-if 或 v-else-if 搭配使用，不需要表达式，如果 v-if 不满足条件，就会渲染 v-else 中的元素

## v-else-if

和 v-if 或 v-else-if 一起使用，需要表达式判断

## v-show

v-show 跟 v-if 一样通过条件表达式选择渲染数据，但是 v-show 为 false 时，仍然会创建该元素，只不过被隐藏掉了

## v-for

v-for 会根据数据多次渲染元素，可以遍历、数字、数组、字符串、对象

```html
<p v-for="(value, index) in [1, 3, 4, 6]">{{value}}</p>
<p v-for="(value, index) in 8">{{value}}</p>
<p v-for="(value, index) in 'hello'">{{value}}</p>
<p v-for="(value, key) in obj">{{key}}{{value}}</p>
```

::: tip
遍历数字时会从 1 开始
:::

### “就地更新”策略

为了提高 v-for 的性能，在更新已渲染的元素列表时，会采用“就地复用”策略，正是因为这个策略，在某些时刻会导致数据产生一种混乱，下面是一个例子，请选中一项，然后点击添加，会发现选择的某一项在数据渲染后居然变了，比如选中了 ls，渲染后居然变成选中了 zs

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

这是因为 v-for 渲染元素时，会先查看缓存中有没有需要渲染的元素，如果没有，就会创建一个新的放在缓存中，如果缓存中有，则不会创建新的，直接复用原来的元素，为了给 Vue 更好的追踪节点的身份，从而重用和重新排序现有元素，应该为每项提供一个唯一 key 属性

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
千万不要将 index 作为 key 的值
:::

## v-bind

如果要给元素的属性绑定数据，不能使用插值语法，必须使用 v-bind 指令，v-bind 可以简写，赋值的数据也可以是任意合法的表达式语句

```html
<input v-bind:value="value"></input>
```

如果绑定 class 属性，v-bind 有一点特殊的写法，直接赋值默认会从 data 中查找，如果赋值一个数组，则会在 style 标签中查找定义的样式

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

使用数组未免太麻烦，利用 v-bind 的绑定特点，可以在 data 中定义属性来更好的操作类名，对象的 key 就是类名

```html
<p :class="obj">呦呦鹿鸣</p>

data: {
  obj:{
    size: true
  }
}
```

绑定 style 属性时，v-bind 的写法也有点特殊，默认情况也是从 data 中查找，因此取值需要是一个对象，key 为属性名，value 为属性值

```html
<p :style="{color:'red'}">呦呦鹿鸣</p>
```

如果 data 中保存了多个样式对象，可以将多个对象放在数组中赋值给 style，这样会一同生效

## v-on

v-on 用于给元素绑定监听事件，指定事件时不需要写 on，回调函数在 methods 对象中定义，v-on 指令可以简写成 `@`

```html
<button v-on:click="回调函数"></button>
```

### 事件修饰符

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

### 按键修饰符

监听特定按键的触发事件，只有在按下该按键的时候才会触发回调函数，Vue 预定了一些按键修饰符，也可以使用按键码（Keycode）

```html
<button @keyup.enter>点我</button>
```

## 自定义指令

Vue 也允许注册自定义指令，这个指令的逻辑可以自己实现

```js
Vue.directive('color', {
  bind: function(el){
    el.style.color = 'red'
  }
})
```

通过 Vue.directive() 方法注册一个全局的指令，第一个参数为指令名，第二个参数接受一个对象，对象中定义了几个钩子函数用于不同的生命周期中调用，每个钩子函数都可以接收绑定的元素对象，用来操作 DOM

::: tip
通过 Vue.directive() 注册的指令能够在所有的实例对象中使用，如果要想将指令作为一个局部的指令，可以在组件中接收一个 directives，这个属性 key 就是指令后缀，逻辑也通过对应 key 的函数实现
:::

### 自定义指令参数

官方提供的指令可以传参，而自定义的指令也是可以的，钩子函数不仅可以接收绑定的元素对象，也会接受一个包含指令参数的对象

```js
Vue.directive('color', {
  bind: function(el, binding){
    el.style.color = binding.value;
  }
})
```
