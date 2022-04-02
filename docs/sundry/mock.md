---
title: 后端数据模拟：Mock.js
category: Web
article: false
---

常见的 Mock 方案：

+ 代码侵入 - 写死数据，切换真实的环境非常麻烦
+ 请求拦截 - 生成随机数据，但无法模拟增删改查的情况，只支持 XMLHttpRequest

Mock.js 是一种模拟 JSON 数据的前端技术，目的是为了解决后端 API 没有上线，而前端没有数据进行填充的问题，使用 Mock 可以生成大量的测试数据，让前端专注于自己

## 安装

两种安装方式：

+ 浏览器环境：引入`mock.js`库
+ Node.js 环境：`npm i mockjs`

## 生成数据

`Mock`是 Mock.js 提供的全局对象，使用它来做一些工作，按照官方的示例来看一看会生成什么样的数据

```js
const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
});

console.log(data);

/* 
生成的数据如下：

{
  "list": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}

*/
```

这看起来很简单，`Mock.mock()`会根据传入的模板对象来生成数据对象，模板对象中的每一个属性都由 3 个部分组成：属性名、生成规则、属性值，`'name|rule': value`

`'list|1-10'`表示生成 1 ~ 10 条数据，而`'id|+1': 1`表示每条数据的属性名为`id`，且从`1`开始自增长

生成规则是可选的，如果没有则默认生成一条，且值不会具有变化

生成规则有 7 种格式可选：

1. `'name|min-max': value`
2. `'name|count': value`
3. `'name|min-max.dmin-dmax': value`
4. `'name|min-max.dcount': value`
5. `'name|count.dmin-dmax': value`
6. `'name|count.dcount': value`
7. `'name|+step': value`

虽然有这么多生成规则，但是具体的生成含义是根据属性值来确定的

当属性值为字符串时：

+ `'name|min-max': string`：重复拼接 min ~ max 次字符串
+ `'name|count': string`：重复拼接 count 次字符串

当属性值为数字时：

+ `'name|+1': number`：属性值自动加 1，初始值为 number。
+ `'name|min-max': number`：生成 min ~ max 之间的整数
+ `'name|min-max.dmin-dmax': number`：生成 min ~ max 之间的整数且小数部分保留 dmin ~ dmax 位

当属性值为布尔值时：

+ `'name|1': boolean`：随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2
+ `'name|min-max': value`：随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)

当属性值为对象时：

+ `'name|count': object`：从对象中随机选取 count 个属性
+ `'name|min-max': object`：从对象中随机选取 min ~ max 个属性

当属性值为数组时：

+ `'name|1': array`：从数组中随机选取 1 个元素
+ `'name|+1': array`：按照顺序选取 1 个元素
+ `'name|min-max': array`：重复数组元素拼接 min ~ max 次数组
+ `'name|count': array`：重复书元素拼接 count 次数组

当属性值为函数时：

+ `'name': function`：执行函数，返回值为最终值

当属性值为正则时：

+ `'name': regexp`：根据正则生成字符串

## 占位符

属性值中还可以使用占位符，使用`@`标记后面的字符串，占位符本质上引用的是`Mock.random`中的方法

## 扩展

## 拦截

<!-- more -->