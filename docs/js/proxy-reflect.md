---
title: 代理和反射
category: 编程语言
tag: [JavaScript]
article: false
---

## Proxy

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

ES6 提供原生的 Proxy 构造函数，用来生成实例

```js
let proxy = new Proxy(target, handler);
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为

这是一个拦截读取属性的例子：

```js
const foo = {};
const proxy = new Proxy(foo, {
  get: function(target, proKey) {
    console.log(target, proKey); // {} age, {} name
    return 1;
  }
});

proxy.age // 1
proxy.name // 1
```

由于 foo 被代理，且代理更改了读取属性的行为，这导致任何通过`.`访问的属性都是代理所改变的结果，对于代理处理对象来说，每一个被代理的操作，都需要提供一个对应的处理函数，该函数会拦截对应的操作，并且该函数的参数分别是目标对象和所要访问的属性，由于拦截函数总是返回 1，所以访问任何属性都会得到 1

如果没有配置拦截，就相当于直接访问目标对象

```js
const foo = {};
const proxy = new Proxy(foo, {});

proxy.age // undefined
proxy.name // undefined
```

这很简单，代理对象甚至可以当作其它对象的原型：

```js
const proxy = new Proxy(foo, {
  get: function(target, key) {
    return 1;
  }
});

const foo = Object.create(proxy);
foo.age // 1
```

本来访问一个没有的属性将会的带`undefined`，但由于代理对象是当前对象的原型，所以会拦截这次访问操作，以至于不是得到`undefined`

这是一些代理支持的拦截操作：

+ get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
+ set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
+ has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
+ deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
+ ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.+getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
+ getOwnPropertyDescriptor(target, propKey)：拦截Object. getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
+ defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
+ preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
+ getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
+ isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
+ setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
+ apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
+ construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

除此之外，代理有一个静态方法用于返回可以取消的代理实例：

```js
const foo = {};
const {proxy, revoke} = Proxy.revocable(foo, {
  get(){
    return 1;
  }
});
console.log(foo.age);
revoke();
console.log(proxy.age); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

Proxy.revocable方法返回代理对象和一个revoke函数，当执行了revoke函数时，再访问代理实例，就会抛出错误，因为此时的代理权已经被收回了

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理

## reflect

Reflect 是一个内建对象，可简化 Proxy 的创建，对于一些内部的方法，都是规范性的，不能推荐直接调用，然而反射可以做到这点，它是这些方法的最小包装

操作 | Reflect 调用 | 内部方法
---|---|---
obj[prop]|Reflect.get(obj, prop)|[[Get]]
obj[prop] = value|Reflect.set(obj, prop, value)|[[Set]]
delete obj[prop]|Reflect.deleteProperty(obj, prop)|[[Delete]]
new F(value)|Reflect.construct(F, value)|[[Construct]]

Reflect 允许将操作符（new，delete，……）作为函数（Reflect.construct，Reflect.deleteProperty，……）执行调用

对于每个可被 Proxy 捕获的内部方法，在 Reflect 中都有一个对应的方法，其名称和参数与 Proxy 捕捉器相同

## 总结
