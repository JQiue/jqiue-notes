---
title: 插槽
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

虽然组件足够强大，但是插槽能够让组件更加强大，组件也是一个自定义标签，同样可以在使用组件的时候填充一些其他内容

在这个例子中，组件填充了内容，并没有想象中那样被展示出来，这就需要插槽的帮助，“插槽”指的是预留的接口，用于接收外面传递的信息，在组件中就必须先定义插槽，然后才能往组件中填充内容

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

## 插槽的定义

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
