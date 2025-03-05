---
title: React
category: 框架
tag: [React]
article: false
---

React 是 FaceBook 开源的一套构建用户界面的 JavaScript 框架，React 的流行不仅局限于普通开发工程师对它的认可，其他大量的流行框架都借鉴 React。其中 Vue 设计之初很多灵感来源于此，包括 Vue3 很多新特性都借鉴了 React。React Hook 是一个非常开创性的功能，Vue3 中的 Compostion API 都借鉴了 React Hook 的思想

## JSX

JSX（JavaScript XML）是 js 内定义的一套 XML 语法，可以解析出目标 js 代码，颠覆传统 js 写法。实质上 HTML 也是 xml 协议，由浏览器解析，而 JSX 是由 js 解析。当然也可以通过构建工具解析，如 Babel

不用觉得很奇怪，`div`就等于`<div></div>`

```jsx
let div = <div></div>
```

JSX 必须严格闭合

```jsx
<div>       // 错误
<div></div> // 正确
<div/>      // 正确（也行，看需求）
```

同级组件时必须拥有一个根元素，这会多出一个标签，React 中允许使用内置组件`Fragment`来解决这个问题，它不会额外生成什么

```jsx
// 错误
<div></div>
<div></div>

// 正确
<div>
  <div></div>
  <div></div>
</div>

// 正确
<Fragment>
  <div></div>
  <div></div>
</Fragment>

// 正确
<>
  <div></div>
  <div></div>
</>
```

在一个组件中可以引用其他组件，当引用一个自定义组件时要大写首字母，否则会看做成普通标签

```jsx
<Foo>
  <Bar></Bar>
</Foo>
```

可以在 JSX 中使用`{expression}`嵌入 js 支持的表达式

```js
const content = 'Hello, World'
<div>{content}</div>
```

在 JSX 内中写 js 注释必须在外面要套一个`{}`，很简单，会看做成表达式

```js
<div>{/* 这是一个 div */}</div>
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

```jsx
class Foo extends React.Component {
  render() {
    return <div>Hello, World</div>
  }
}
```

## 函数式组件

函数式组件即将一个 JSX 封装到一个函数中返回

```jsx
function Foo() {
  return <div>Hello</div>
}
```

但是，函数式组件它：

+ 没有自己的 State
+ 没有 this
+ 没有生命周期

## 数据驱动

每个类组件都可以在构造函数中维护一份属于自己的数据，一旦`state`中的数据改变后，React 就会更新页面

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'hello, world',
    };
  }
  render() {
    return <div>{this.state.value}</div>
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

当组件被创建的时候，Render 会调用一次，一个组件被`ReactDOM.render()`渲染的时候调用，由此依次调用其它的组件 Render

State 和 Props 变化都会导致渲染

## 生命周期

生命周期是类组件在某一个时机自动执行的函数，比如 Render 就是其中的一个生命周期函数，在数据改变时触发。除此之外，还有很多其它的生命周期函数：

+ componentWillMount - 即将挂载到页面
+ componentDidMount - 已经挂载到页面
+ shouldComponetUpdate - 数据更新前时执行
+ render - 数据发生变化时执行
+ componetWillUpdate - 数据更新前时执行
+ componetDidUpdate - 数据更新后时执行
+ componetWillUnmount - 组件将被移除时执行

如果在`shouldComponetUpdate`中返回了`false`，后续的生命周期不会执行，性能将得到提高

## Hook

Hook 让函数组件更加强大，Hook 本质是一个函数

Hook 中的`useState`会返回一对值：当前状态和一个让你更新它的函数

```js
const [num, setNume] = useState(1);
```

Hook 中的`useEffect`用于模拟生命周期

```js
const [num, setNume] = useState(1);

useEffect(() => {
  console.log('组件被挂载时执行，或 useState 状态发生变化时更新');
});

/* 只监听某个 state 的变化 */
useEffect(() => {
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

`useEffect`允许返回一个函数，当组件被卸载时执行这个函数，这会创建一个闭包。所以一个自定义的节流 Hook，就可以这样定义：

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

当在组件上定义属性时，会将属性转换为一个对象传给组件

在类组件中，子组件通过`this.props`访问

```js
class A extends Component {
  render() {
    return (<B content="123"/>)
  }
}

class B extends Component {
  render() {
    return (<span>{this.props.content}</span>)
  }
}
```

父组件还可以给子组件传递方法，用于子组件间接修改父组件的数据

::: caution
如果传递的方法有访问到父级组件，必须使用`bind`转发，否则无法访问父级组件的数据
:::

```js
class A extends React.Component {
  click() {}
  render() {
    return <div><B clickFn={click}/></div>
  }
}

class B extends Component {
  click() {
    this.props.clickFn();
  }
  render() {
    return <span></span>
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


function App() {
  const [msg, setMsg] = useState('你好世界');

  return <div>
    <NumContext.Provider value={{msg, setMsg}}>
      <A></A>
    </NumContext.Provider>
  </div> 
}

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
```

这代码太复杂了，没关系，`useContext`能简化这一点：

```js
import { useState, useEffect, createContext, useContext } from 'react';

const NumContext = createContext();

function App() {
  const [msg, setMsg] = useState('你好世界');

  return <div>
    <NumContext.Provider value={{msg, setMsg}}>
      <A></A>
    </NumContext.Provider>
  </div> 
}

function A() {
  return <B></B>
}

function B() {
  const {msg, setNum} = useContext(NumContext);
  return <div>{msg}<div/>
}
```

父组件的每次数据更新都会重新渲染子组件，这非常耗性能，`memo`帮忙处理这一点

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

如果为元素绑定事件处理程序，如果没有参数，默认传入事件对象。元素中的事件始终是驼峰式，在类组件中要转发`this`，否则会丢失`state`，修改`state`只能通过`setState`方法

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
      <button onClick={this.btnClick} ref={(button) => {this.buttonElem = button}}>获取 button</button>
    )
  }
}
```

当作用于普通 HTML 标签时返回 DOM 对象，当作用于一个组件时返回组件对象

## 受控组件和不受控组件

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

一定要传输`key`值，会提高性能

## 条件渲染

## 路由

路由会根据地址变化来展示不同的组件，以实现页面的变化，需要额外的安装：

```sh
npm i react-router
```

引入，并使用

```js
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router'

import Home from './Home';
import Foo from './Foo';
import Bar from './Bar';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/foo" element={<Foo/>}></Route>
          <Route path="/bar" element={<Bar/> }></Route>
        </Routes>
        <nav>
          <Link to="/">home</Link>
          <Link to="/foo">foo</Link>
          <Link to="/bar">bar</Link>
        </nav>
      </BrowserRouter>
    </React.StrictMode>
  );
}
```

## Ant Design

[Ant](https://ant.design/index-cn) 是一款非常优秀的 React UI 组件库

```sh
npm install antd
```

引入：

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

React 的状态管理方案百花齐放：state（useState、useReducer）、Context（useContext）、第三方库（Redux、Mobx），Redux 是第三方全局状态管理库

```js
npm i redux
```

Redux 需要三个东西：

+ action - 是一个具有`type`和`payload`属性的对象
+ reducer - 是一个纯函数，根据 Action 的`type`计算后返回最新的 State
+ store - 状态中心，发送 Action 给 Reducer，监听状态改变

```js
import { createStore } from 'redux';

const ADD_Action = () => {
  return {
    type: 'ADD'
  }
};

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(reducer);

function Foo() {
  const handleClick = () => {
    store.dispatch(ADD_Action());
  };
  useEffect(() => {
    store.subscribe(() => {
      console.log("subscribe:", store.getState());
    });
  });
  return <div>{store.getState().value}</div>
}
```

基本流程是：

1. 使用`createStore`根据 Reducer 创建一个状态，会自动调用一次 Reducer
2. Store.getState() 获取 Reducer 返回的状态
3. Store.subscribe(callback) 订阅状态改变监听
4. UI 可以通过 Store.dispatch(Action) 发送一个 Action 给 Reducer 主动更新状态
5. 触发 Store.subscribe(callback) 中的回调，得到最新状态

`subscribe()` 会返回一个函数，调用这个函数就会注销监听器

Redux 的设计是为了确定数据的流向，预测数据改变的行为。特定的 action 通过 reducer 去改变 state 中特定的值，state 是只读的，只能用 action 改变，action 记录了为什么变化，理由是什么，关联 action 和 state 就需要 reducer，所以 reducer 只能是一个纯函数

## React-redux

是 React 官方出的状态管理库，React-redux 依然会依赖 Redux，所以会结合使用

有两个非常重要的部分：

+ Provider - 是一个组件，能够使任何组件访问 Store 中的数据
+ connect - 是一个方法，能够使组件跟 Store 进行关联

首先将所有的组件套在`Provider`中，并提供`store`

```js
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

然后使用`connect`加强组件，`connect`本身不会修改组件的什么，只是加强一下而已

```js
import { connect } from "react-redux";

const A = function A(props) {
  return (
    <div>
      {props.num}
      <button onClick={props.add}>+</button>
      <button onClick={props.minus}>-</button>
    </div>
  );
};

// 将状态映射到组件的 props
const mapStateToprops = (state, props) => {
  return {
    ...state,
  };
};

// 将对应的 dispath 函数映射到组件的 props
const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch({ type: "ADD" });
    },
    minus: () => {
      dispatch({ type: "MINUS" });
    },
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(A);
```

不过，`connect`太麻烦了，react-redux 提供了对应的 hook 简化操作：

+ `useSelector(callback(state))` - 接受一个回调函数，并传入状态
+ `useDispath()`：获取 dispatch 方法用于提交 Action

```js
import { useSelector, useDispatch } from "react-redux";

function Foo(props) {
  const result = useSelector((state) => {
    return {
      ...state,
    };
  });
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "ADD" })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>-</button>
    </div>
  );
}
```

## Redux-Saga

由于 Reducer 是个纯函数，当遇到异步操作时，就不可避免副作用，为了解决这个问题，必须在发送 Action 之前就整理好数据

```js
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

function Foo(props) {
  const result = useSelector((state) => {...state});
  const dispatch = useDispatch();
  const onClick = async () => {
    const { data } = await axios.get('http://httptest.jinqiu.wang');
    dispatch({type: '', payload: data});
  }
  return (
    <div>
      <p></p>
      <button onClick={onClick}>click</button>
    </div>
  );
}
```

Redux 借鉴了 Express 和 Koa 的中间件的概念，将 Action -> Reducer 变成了 Action -> Middlewares -> Reducer。这种机制可以改变数据流，实现异步 Action，过滤，日志输入，异常报告等

Redux-Saga 就是 Redux 的一个中间件，用来处理副作用（异步），采用的是 ES6 的 Generator

```js

```

## React 渲染原理

React 本质上是一个用于构建用户界面的库，而不是框架，整个模型可以概括为“view = function(state)”。渲染只不过是 React 调用函数组件以最终更新视图的一种说法，当 React 渲染一个组件时，会发生两件事。

首先，React 会创建一个组件的快照，该快照捕捉了 React 更新视图所需的所有内容。props、state、事件处理程序以及基于这些 props 和 state 的 UI 描述都会被包含在该快照中。然后，React 使用该 UI 描述来更新视图

为了获取应用程序的初始 UI，React 将进行一次初始渲染，从应用程序的 root 开始

::: tip
要创建一个 root ，首先获取要挂载 React 应用的 HTML 元素，将其传递给 React DOM 的 createRoot 函数，然后调用 root.render ，并将其传递一个 React 元素，React 将使用该元素作为起点来获取应用的初始 UI
:::

根据`v=f(s)`，直觉是每次 s 变化时调用 f，不希望在 s 没有变化时重新计算 v，这很简单。React 只有在组件的状态发生变化时才会重新渲染，且唯一能触发 React 组件重新渲染的东西是状态变化

React 究竟如何知道组件的状态发生了变化？这和快照有关，当事件处理程序被调用时，该事件处理程序可以访问快照创建时刻的 props 和 state。从这里，如果事件处理程序调用了 useState 的更新函数，并且 React 发现新状态与快照中的状态不同，React 将会触发组件的重新渲染并创建一个新的快照并更新视图

在这个例子中，当事件处理程序运行时，它能够访问快照创建时刻的 props 和 state，此时`status`是`clean`，所以得到`clean`，由于改变状态触发重新渲染，之后无论如何点击都会得到`dirty`

```jsx
export default function VibeCheck () {
  const [status, setStatus] = React.useState("clean")

  const handleClick = () => {
    setStatus("dirty")
    alert(status)
  }

  return (
    <button onClick={handleClick}>
      {status}
    </button>
  )
}
```

在这个例子中，当事件处理程序运行时，它能够访问快照创建时刻的 props he state，此时`count`是`0`，一旦 React 计算出状态`1`和快照中的状态`0`不同，React 就会重新渲染组件，并创建一个新的快照并更新 View

```jsx
export default function Counter () {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
      <h1>{count}</h1>
      <button onClick={handleClick}>
        +
      </button>
  )
}*
```

在最后一个例子中，虽然处理函数更新了 3 次状态，但实际上只会重新渲染一次，因为每次使用的都是是快照当前的状态`0`，因此相当于三次`setCount(0 + 1)`

React 在内部使用了“批处理“算法计算新状态，在同一处理函数的多次状态修改时，只有最后一次状态修改生效

因此下面的例子理所应当的是`3`，且只会重新触发渲染一次

```js
const handleClick = () => {
  setCount(1)
  setCount(2)
  setCount(3)
}
```

如果希望总是使用最新的状态，则可以传递一个更新函数，由于`2`是最后一次生效的状态修改，在回调函数运行`2`就是最新状态，因此最终状态就是`2+3`

```js
const handleClick = () => {
  setCount(1)
  setCount(2)
  setCount((c) => c + 3)
}
```

状态依次是`1`，`1+3`，`7`，`7+10`

```js
const handleClick = () => {
  setCount(1)
  setCount((c) => c + 3)
  setCount(7)
  setCount((c) => c + 10)
}
```

状态依次是`1`，`1+3`，`7`，`7+10`

```js
const handleClick = () => {
  setCount((c) => 1)
  setCount((c) => c + 3)
  setCount((c) => 7)
  setCount((c) => c + 10)
}
```

虽然事件处理程序中包含多个状态更新，但它们都会被合并为同一次批处理内，最终只渲染一次

在默认情况下，React 重新渲染组件时，会重新渲染子组件。这看起来非常浪费性能，实际上遇到性能问题很少是因为渲染次数过多。如果确实想避免不必要的子组件重渲染，则可以使用`React.memo(child)`进行包装，这样子组件仅在 props 变化时才重新渲染

React 为什么在启用`StrictMode`时，会额外重新渲染一次组件？

这不奇怪，因为`StrictMode`会保证应用重新渲染时保证视图应该是状态的一个函数，从而保证组件是纯的，如果不是纯的，则在第二次渲染后变的明显用于检测潜在的问题，且只会在开发环境下生效，不会影响生产环境的运行和性能

## 组件库

+ [HeroUI](https://www.heroui.com)
+ [Shadcn](https://ui.shadcn.com)
+ [ArkUI](https://ark-ui.com)
+ [PrimeReact](https://primereact.org)

## 参考资料

+ [React <Scan></Scan>](https://react-scan.com/) - React Scan 自动检测 React 应用程序中的性能问题
