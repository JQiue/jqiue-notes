---
title: React
category: 框架
tag: [React]
article: false
---

React 是 FaceBook 开源的一套构建用户界面的 JavaScript 框架，React 的流行不仅局限于普通开发工程师对它的认可，其他大量的流行框架都借鉴 React。其中包括 Vue 设计之初很多灵感来源于此，包括 Vue3 很多新特性都借鉴了 React。React Hook 是一个非常开创性的功能，Vue3 中的 Compostion API 都借鉴了 React Hook 的思想

<!-- to be updated -->

## JSX

JSX（JavaScript XML）是 js 内定义的一套 XML 语法，可以解析出目标 js 代码,颠覆传统 js 写法。实质上 HTML 也是 xml 协议，由浏览器解析，而 JSX 是由 js 解析。当然也可以通过构建工具先解析生成，如 webpack

```js
let div = <div></div>
```

不用觉得很奇怪，`div`就等于`<div></div>`

JSX 必须严格闭合

```js
<div> //错误
<div></div> //正确
<div/>//正确（也行，看需求）
```

当存在同级组件时，必须拥有一个根元素。这会多出一个标签，React 中允许使用内置组件`Fragment`来解决这个问题，它不会额外生成什么

```js
// 错误
<div></div>
<div></div>

// 正确
<div>
  <div></div>
  <div></div>
</div>
```

当引用一个自定义组件时要大写首字母，否则会看做成一个普通的 HTML 标签，在一个组件中可以引用其他组件

可以在 JSX 中嵌入一个任何 js 支持的表达式，使用`{expression}`引入

```js
const content = 'Hello, World'
<div>{content}</div>
```

当一个自定义组件作为一个元素时，会将其中的属性转换为一个对象传给组件

在 JSX 内中只能写 js 注释并且在外面要套一个`{}`，很简单，因为会被正确的转义

```js
class Foo extends Component {
  render() {
    return (
      {/* 这是一个 div */}
      <div></div>
    )
  }
}
```

不要使用危险的<code v-pre>dangerouslySetInnerHTML={{__html: value}}</code>禁止转义

## 示例程序

这是一个浏览器中的例子

```html
<head>
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
</head>

<body>
  <div id="root"></div>
  <script>
    const e = React.createElement;
    function Foo() {
      return e('div', null, 'bar');
    }
    ReactDOM.render(e(Foo), document.getElementById('root'));
  </script>
</body>

</html>
```

在没有使用 JSX 语法的情况下，必须借助`React.createElement()`，接受三个参数：

+ `type`：HTML 元素或组件类型
+ `props`：属性对象或事件处理函数
+ `children`：任意需要加入到元素中的东西，比如文本，组件类型等，可以将多个类型放到一个数组

最后通过`React.render(component, mount)`渲染

## 类组件

类组件即通过继承来实现一个组件

```js
class Foo extends React.Component {
  render() {
    return <div>Hello, {this.name}</div>
  }
}
```

### 数据驱动

每个类组件都可以在构造函数中维护一份属于自己的数据，在 JSX 中通过`{}`来引用，一旦`state`中的数据改变后，React 就会更新页面

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'hello, world',
    };
  }
  render() {
    return (
      <div>{this.state.value}</div>
    )
  }
}
```

不要直接修改`state`，而是使用`setState()`，它是异步的，这非常重要，如果想要更改数据后才开始做一些操作，不应该传入一个对象，而是两个回调函数

```js
this.setState(() => {
  return {
    // 更改数据项
  }
}, () => {
  // 更改完成后需要执行的代码
})
```

如果想干掉令人讨厌的`bind`，可以在构造函数中处理，但只适用于不需要传入参数的处理函数

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'hello',
    };
  }
  click(event) {
    this.setState({
      value: 'world'
    })
  }
  render() {
    return (
      <div onClick={this.click.bind(this)}>{this.state.value}</div>
    )
  }
}
```

如果要为元素增加`class`，请使用`className`

有些属性可能具有歧义，比如`<label>`的`for`属性，应该使用`htmlFor`，其它的都是类似

React 中的数据是一种单向的数据流

Props 是传入到组件中的数据，State 是组件自己的数据，Render 是组件的渲染函数

当组件被创建的时候，Render 会调用一次，一个组件被`ReactDOM.render()`渲染的时候调用，由此依次调用其它的组件 Render

不仅如此，组件的 State 发生变化，Render 也会重新执行一次

当然，Props 变化也会导致 Render 执行一次

### 生命周期

生命周期是类组件在某一个时机自动执行的函数，比如 Render 就是其中的一个生命周期函数，在数据改变时触发。除此之外，还有很多其它的生命周期函数：

+ componentWillMount - 即将挂载到页面
+ componentDidMount - 已经挂载到页面
+ shouldComponetUpdate - 数据更新前时执行
+ render - 数据发生变化时执行
+ componetWillUpdate - 数据更新前时执行
+ componetDidUpdate - 数据更新后时执行
+ componetWillUnmount - 组件将被移除时执行

如果在`shouldComponetUpdate`中返回了`false`，后续的生命周期不会执行，性能得到提高

## 函数式组件

函数式组件即将一个 JSX 封装到一个函数中返回

```js
function Foo() {
  return <div>Hello</div>
}
```

但是，函数式组件它：

+ 没有自己的 State 状态
+ 没有 this
+ 没有生命周期

## Hook

Hook 让函数组件更加强大

Hook 中的`useState`会返回一对值：当前状态和一个让你更新它的函数

```js
const [num, setNume] = useState(1);
```

Hook 中的`useEffect`用于模拟生命周期

```js
const [num, setNume] = useState(1);

useEffect(()=>{
  console.log('组件被挂载时执行，或 useState 状态发生变化时更新');
});

/* 只监听某个 state 的变化 */
useEffect(()=>{
  console.log('num 发生变化时更新');
}, [num]);

/* 谁也不监听 */
useEffect(()=>{
  console.log('不监听任何数据');
}, []);

/* 销毁阶段 */
useEffect(()=>{
  return () => {
    console.log('销毁阶段');
  }
});
```

可以自定义 Hook，比如下面自定义的 Hook 只会被执行一次，因此可以抽象出来

```js
const useMount = (callback) => {
  useEffect(()=>{
    callback();
  }, []);
}
```

自定义 Hook 必须使用`use`开头，Hook 只能在其他 Hook 中、组件中运行

`useEffect`允许返回一个函数，当组件被卸载时执行这个函数，这会创建一个闭包

所以一个自定义的节流 Hook，就可以这样定义了

```js
const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, debounceValue]);
  return debounceValue;
};
```

## props

组件之间是可以传递数据的，在组件上自定义属性即可实现传值

在类组件中，子组件通过`this.props`访问

```js
class A extends Component {
  render() {
    return (
    <div><B content="123"/></div>
  }
}

class B extends Component {
  render() {
    return (
    <span>{this.props.content}</span>
  }
}
```

父组件还可以给子组件传递方法，用于子组件间接修改父组件的数据

::: danger
如果传递的方法有访问到父级组件，必须使用`bind`转发，否则无法访问父级组件的数据
:::

```js
class A extends Component {
  click() {}
  render() {
    return (
    <div><B clickFn={click}/></div>
  }
}

class B extends Component {
  click() {
    this.props.clickFn();
  }
  render() {
    return (
    <span></span>
  }
}
```

这是函数式组件，会将数据传入到`props`参数

```js
function Father(props) {
  return <Child msg="Hello, I'm Father"/>
}

function Child(props) {
  return <div>{props.msg}<div>
}
```

子组件间接修改父组件

```js
function Father() {
  const [num, setNum] = useState(123);
  const changeNum = () => setNum(456);
  return <Child num={num} changeNum={changeNum}/>
}

function Child() {
  return <div>
    {props.num}
    <button onClick={props.changeNum}>click change</button>
  <div>
}
```

## 上下文

如果有多层级组件，一级一级地传递就不适用了，而需要使用上下文空间`createContext`

```js
import { useState, useEffect, createContext } from 'react';

const NumContext = createContext();

function A() {
  return <B></B>
}

function B() {
  return <div>
    <NumContext.Consumer>
      {({msg, setMsg}) => <div>{msg}</div>}
    </NumContext.Consumer>
  </div>
}

function App() {
  const [msg, setMsg] = useState('你好世界');

  return <div>
    <NumContext.Provider value={{msg, setMsg}}>
      <A></A>
    </NumContext.Provider>
  </div> 
}
```

这可能让代码太复杂了，没关系，`useContext`能简化这一点：

```js
import { useState, useEffect, createContext, useContext } from 'react';

const NumContext = createContext();

function A() {
  return <B></B>
}

function B() {
  const {msg, setNum} = useContext(NumContext);
  return <div>  {msg}<div/>
}

function App() {
  const [msg, setMsg] = useState('你好世界');

  return <div>
    <NumContext.Provider value={{msg, setMsg}}>
      <A></A>
    </NumContext.Provider>
  </div> 
}
```

受控组件和不受控组件只存在于表单元素，受控组件即表单元素的`value`需要通过`useState`设置，反之就是不受控

```js
function App() {
  const [msg, setMsg] = useState('你好世界');
  const inputChange = (e) => setMsg(e.target.value);
  return <div>
    <input type="text" value={msg} onChange={inputChange}/>
  </div> 
}
```

不可控组件主要是通过`ref`引用，通过`useRef`创建可变对象，其中可变对象的`current`会返回该元素对象

```js
function App() {
  const element = useRef(null);
  console.log(element.current); // <input type="text"/>
  return <div>
    <input type="text" ref={element}/>
  </div> 
}
```

如果在一个父组件中使用了子组件，此时父组件的每次数据更新都会重新渲染子组件，这非常耗性能，没事，`memo`帮忙处理这一点

```js
import { useState, memo } from 'react';

function A() {
  const [num, setNum] = useState(1);
  return 
  <div>
    <button onClick={()=>setNum(num+1)}>add</button>
    <B></B>
  </div>
}

const B = memo(function () {
  console.log('子组件渲染了');
  return <div><div/>
});
```

## 绑定事件

事件是驼峰式的，

为元素绑定事件处理程序，如果没有参数，默认传入事件对象。元素中的事件始终是驼峰式，在类组件中要转发`this`，否则会丢失`state`，修改`state`只能通过`setState`方法

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'hello',
    };
  }
  click(event) {
    this.setState({
      value: 'world'
    })
  }
  render() {
    return (
      <div onClick={this.click.bind(this)}>{this.state.value}</div>
    )
  }
}
```

## ref

有时候需要获取真实 DOM 元素，`ref`可以帮助做到这一点

```js
import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.btnClick = this.btnClick.bind(this);
  }
  btnClick() {
    console.log(this.buttonElem);
  }
  render() {
    return (
      <button onClick={this.btnClick} ref={(button) => {this.buttonElem = button}}>获取button</button>
    )
  }
}
```

注意当作用于普通 HTML 标签时返回 DOM 对象，当作用于一个组件时返回组件对象

## 列表渲染

这是一个渲染列表的例子

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3],
    };
  }
  render() {
    return (
      <div>
        <ul>
        {this.state.list.map((value, index) => {
          return <li key="index">{value}</li>
        })}
        </ul>
      </div>
    )
  }
}
```

一定要传输`key`值，会提高渲染性能

## 条件渲染

## 路由

路由会根据地址变化来展示不同的组件，以实现页面的变化，需要额外的安装：

```sh
npm i react-router-dom
```

引入，并使用

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './Home';
import Foo from './Foo';
import Bar from './Bar';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/foo" element={<Foo/>}></Route>
        <Route path="/bar" element={<Bar/> }></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Ant Design

[Ant](https://ant.design/index-cn) 是一款非常优秀的 React UI 组件库，只需要在项目中安装，即可使用大量封装好的组件

```sh
npm install antd
```

在文件中引入：

```js
import 'antd/dist/antd.css';

import {
  Button,
  DatePicker,
  // 更多组件
  // ....
} from 'antd';
```

## Redux

React 的状态管理方案百花齐放：state（useState、useReducer）、Context（useContext）、第三方库（Redux、Mobx）

不是 React 提供的，是第三方提供的全局状态组件库

```js
npm i redux
```

Redux 需要三个东西：

+ action - 是一个函数，返回包含`type`和`value`的对象
+ reducer - 是一个函数，返回最新的 State
+ store - 状态中心，发送 action，监听状态改变

```js
import { createStore } from 'redux';

const action_1 = () => {
  return {
    type: 'action_1',
    value: '我是 action_1'
  }
};

const reducer = (state = { value = '默认值' }, action) => {
  switch (action.type) {
    case 'action_1':
      return {...state, ...action }
    default:
      return state;
  }
};

const store = createStore(reducer);
```

