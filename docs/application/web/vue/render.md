---
title: 组件渲染
category: 框架
tags: [Alpha]
author: JQiue
article: false
---

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
