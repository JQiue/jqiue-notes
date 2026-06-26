---
title: React：从 Class 到 Hooks
category: 框架
tag: [React]
article: false
---

React 本质上不是一个“页面框架”，而是一个围绕组件、状态和渲染组织 UI 的库。它的长期价值，不在于某个 API 有多方便，而在于它重新定义了前端界面应该如何被描述和更新。

如果只用一句话概括：

+ UI 不是被手工一步步改出来的
+ UI 是状态的函数

这也是 React 几乎所有设计的出发点。

## React 到底在解决什么问题

在没有 React 的时代，前端开发经常直接操作 DOM：

+ 找到节点
+ 修改文本
+ 切换 class
+ 监听事件
+ 再继续改别的节点

这种方式在页面简单时没什么问题，但一旦界面开始复杂，真正困难的就不是“怎么改 DOM”，而是“现在页面到底应该是什么状态”。

React 的答案是：不要把重点放在“怎么改页面”，而要放在“当前状态下，页面应该长什么样”。

于是 React 把问题改写成了：

```txt
view = function(state)
```

只要状态变化，React 就重新计算 UI，然后负责把变化同步到页面上。

## React 是怎么一步步变成今天这样的

React 并不是一开始就长成今天这样。

早期 React 的组件主要依赖 class：

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>;
  }
}
```

它不是不能用，只是会夹杂很多和业务本身无关的样板代码：`constructor`、`this`、手动绑定、生命周期拆分。

后来 React 经历了两次特别关键的演进：

+ React 16 引入 Fiber，让渲染过程变得可中断、可调度
+ React 16.8 引入 Hooks，让函数组件拥有状态和副作用能力

这两个变化一起塑造了今天大家熟悉的 React。

## React 16：Fiber 改变了什么

React 16 真正的大变化，不是某个零碎 API，而是 Fiber 这个新的协调引擎。

你可以把它理解成：React 不再要求自己一次性把整棵组件树“硬算完”，而是可以把渲染工作拆成更小的单位，在合适的时候暂停、继续、调整优先级。

它带来的直接意义是：

+ React 更有机会优先响应用户交互
+ 长任务不必总是把界面卡死
+ 后续并发能力和调度能力有了基础

对应用开发者来说，Fiber 最重要的启发不是“我要去背它的内部结构”，而是：React 的 render 过程不是一个你可以随便塞副作用进去的地方，因为这段工作可能被重复执行、打断，甚至丢弃。

## 错误边界

也是从 React 16 开始，React 有了错误边界（Error Boundary）。

以前一个组件在渲染阶段报错，往往会影响整棵树；现在可以用错误边界把失败限制在局部区域：

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 上报错误
  }

  render() {
    return this.state.hasError ? <h1>出错了</h1> : this.props.children;
  }
}
```

需要注意的是，错误边界本身至今仍然依赖 class 组件语义。不过在实际项目里，通常不需要自己从零写一遍，像 `react-error-boundary` 这样的库已经把常见模式封装好了。

## 然后，Hooks 来了

Hooks 带来的改变，不只是“终于不用写 class 了”，而是 React 开始允许函数组件表达状态和副作用。

最常见的两个 Hooks 是：

+ `useState`：在组件之间的多次渲染中记住状态
+ `useEffect`：在渲染提交之后处理副作用

例如：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setHistory((h) => [...h, count]);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <ul>{history.map((v, i) => <li key={i}>{v}</li>)}</ul>
    </div>
  );
}
```

这段代码里已经能看到现代 React 的几个关键点：

+ 状态通过 Hook 保存，而不是挂在 `this.state` 上
+ 更新函数可以用函数式写法，避免闭包拿到旧值
+ 副作用和渲染逻辑被拆开
+ `useRef` 可以在渲染之间记住值，但不会触发重渲染

## 副作用，到底是什么

这是 React 里最关键、也最容易被误解的概念之一。

副作用，就是那些“走出渲染函数”的事情，例如：

+ 操作 DOM
+ 发网络请求
+ 开定时器
+ 订阅外部事件
+ 写日志

这些逻辑不能直接塞进 render 里，因为 render 只负责描述 UI。React 可能会多次调用 render，也可能根本不提交这次渲染结果。

所以 React 给了一个更安全的位置：等渲染真正提交到页面之后，再去执行副作用。这就是 `useEffect` 的意义。

例如聚焦输入框：

```jsx
function MyInput() {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return <input ref={ref} />;
}
```

这个例子里，`useEffect` 的价值不是“语法好看”，而是确保 DOM 已经真的存在。

## `useRef` 到底是什么

`useRef` 经常被误解成“只是拿 DOM 的工具”，其实它更准确的定位是：

+ 在多次渲染之间保存一个可变值
+ 修改这个值不会触发重新渲染

所以它有两类典型用途：

+ 保存 DOM 引用
+ 保存那些需要跨渲染记住、但又不应该触发 UI 更新的值

例如“第一次渲染了吗”“上一次的值是什么”“某个定时器句柄是什么”，都很适合用 `useRef`。

## 组件、props 和数据流

React 的基础组织单位是组件，而组件之间最基本的协作方式是 props。

父组件可以把数据传给子组件：

```jsx
function Father() {
  return <Child msg="Hello, I'm Father" />;
}

function Child(props) {
  return <div>{props.msg}</div>;
}
```

如果子组件需要间接影响父组件，通常做法不是“反向修改父组件”，而是父组件把一个回调函数作为 props 传下去：

```jsx
function Father() {
  const [num, setNum] = useState(123);
  const changeNum = () => setNum(456);

  return <Child num={num} changeNum={changeNum} />;
}

function Child(props) {
  return (
    <div>
      {props.num}
      <button onClick={props.changeNum}>click change</button>
    </div>
  );
}
```

这体现了 React 的一个重要原则：数据通常是单向流动的。

## 上下文（Context）

当组件层级变深时，一级级传 props 会变得很烦。这时可以用 Context 在多层组件之间共享数据。

```jsx
const NumContext = createContext();

function App() {
  const [msg, setMsg] = useState('你好世界');

  return (
    <NumContext.Provider value={{ msg, setMsg }}>
      <A />
    </NumContext.Provider>
  );
}

function B() {
  const { msg } = useContext(NumContext);
  return <div>{msg}</div>;
}
```

Context 很适合共享主题、用户信息、权限、全局配置等数据，但它不是所有状态管理问题的默认答案。只要共享范围开始扩大、更新逻辑开始复杂，就要重新考虑状态管理策略。

## React Router

React 本身只负责组件和渲染，不负责路由。单页应用中的页面切换通常依赖额外的路由库。

最常见的仍然是 React Router：

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foo" element={<Foo />} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
      <nav>
        <Link to="/">home</Link>
        <Link to="/foo">foo</Link>
        <Link to="/bar">bar</Link>
      </nav>
    </BrowserRouter>
  );
}
```

如果应用开始有布局嵌套、子页面嵌套、数据加载边界，就会进一步进入嵌套路由和更完整的路由体系。

## 状态管理

React 的状态管理不是一个单选题，而是分层问题。

最常见的几层大概是：

+ 组件内部状态：`useState`、`useReducer`
+ 跨层共享状态：`Context`
+ 应用级复杂状态：Redux、Zustand 等
+ 服务端数据状态：TanStack Query 这类工具

早期 React 社区里 Redux 一度非常中心，但今天更重要的判断已经不是“要不要上 Redux”，而是：

+ 这是 UI 局部状态，还是应用共享状态？
+ 这是客户端状态，还是服务端数据缓存？
+ 这部分复杂度值不值得引入额外库？

所以状态管理更适合单独展开成专题，而不是在总览页里把所有生态都塞满。

## 现代 React 组件实践

React 真正难的地方，往往不在 API，而在组件边界怎么划、状态怎么放、逻辑怎么复用。

很多“写着写着越来越乱”的 React 代码，问题并不是不会用 Hook，而是组件设计没有收住。现代 React 组件实践，重点通常不在“更炫的技巧”，而在一些很朴素但很有效的原则。

### 组件职责单一：UI 和逻辑适度分离

一个组件最理想的状态，是别人看到它时，能很快回答两个问题：

+ 这个组件负责展示什么
+ 这个组件负责处理什么交互

如果一个组件同时承担：

+ 页面布局
+ 表单校验
+ 请求发送
+ 状态拼装
+ 权限判断
+ 各种副作用

那它往往很快就会变成“什么都能改一点，但没人敢动”的组件。

这并不意味着一定要把 UI 和逻辑绝对拆开，而是要控制复杂度：展示型组件尽量专注展示，复杂逻辑可以抽到自定义 Hook、上层容器组件或独立模块中。

例如，不太理想的写法往往是把请求、副作用和展示全塞进一个组件里：

```jsx
function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

更稳一点的方式，是把数据逻辑抽出去，让组件本身更专注于展示：

```jsx
function useUser() {
  const [state, setState] = useState({
    loading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    let active = true;

    fetch('/api/user')
      .then(res => res.json())
      .then(user => {
        if (active) setState({ loading: false, user, error: null });
      })
      .catch(error => {
        if (active) setState({ loading: false, user: null, error });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

function UserProfile() {
  const { loading, user, error } = useUser();

  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  return <div>{user.name}</div>;
}
```

### 用“状态建模”替代“堆 useState”

React 初学者最常见的问题之一，就是一个组件里连续写很多个 `useState`，结果状态之间互相影响、难以维护。

问题通常不在 `useState` 本身，而在于状态没有先被建模。

比起一开始就写：

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
const [isEmpty, setIsEmpty] = useState(false);
```

更重要的是先想清楚：

+ 哪些状态是同一个领域问题的不同面
+ 哪些状态其实可以从别的值推导出来
+ 哪些状态根本不该放在这个组件里

这些状态之间其实是有关联的，但被拆散了，容易出现矛盾状态，更好的方式是把状态当成有限几种明确场景：

```jsx
const initialState = { status: 'idle', data: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload };
    default:
      return state;
  }
}
```

使用时：

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

if (state.status === 'loading') return <Spinner />;
if (state.status === 'error') return <ErrorView error={state.error} />;
if (state.status === 'success') return <List data={state.data} />;
```

React 写得好不好，很多时候取决于“状态怎么抽象”，而不是“Hook 写得熟不熟”。

例如，下面这种写法虽然常见，但状态是散的：

```jsx
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [usernameError, setUsernameError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [submitting, setSubmitting] = useState(false);
```

如果这些状态本质上都属于“登录表单”这个领域问题，那更好的思路往往是先建模：

```jsx
const [form, setForm] = useState({
  username: '',
  password: '',
});

const [errors, setErrors] = useState({
  username: '',
  password: '',
});

const [status, setStatus] = useState('idle');
```

这样组件里讨论的就不再是五六个零散变量，而是“表单数据”“校验错误”“提交状态”这几个明确概念。

### 自定义 Hook 是提升复用性的关键

自定义 Hook 的价值，不只是“把几行代码提取出去”，而是把一类可复用的交互逻辑、状态逻辑或副作用逻辑封装起来。

例如：

+ 表单输入与校验
+ 请求加载与错误处理
+ 防抖与节流
+ 监听窗口尺寸
+ 管理本地存储同步

当这些逻辑被封装进 Hook 后，组件本身就能更像“描述 UI 的函数”，而不是“混合了业务、状态和副作用的大杂烩”。

所以 Hook 的真正意义不是炫技，而是复用逻辑、压缩复杂度。

例如，没抽 Hook 之前，搜索框里的防抖逻辑可能直接写在组件内部：

```jsx
function SearchBox({ value }) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return <div>{debouncedValue}</div>;
}
```

如果这个逻辑别处也要用，就更适合抽成 Hook：

```jsx
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function SearchBox({ value }) {
  const debouncedValue = useDebouncedValue(value, 300);
  return <div>{debouncedValue}</div>;
}
```

抽一个开关的逻辑

```jsx
function useToggle(initial = false) {
  const [value, setValue] = React.useState(initial);

  const open = React.useCallback(() => setValue(true), []);
  const close = React.useCallback(() => setValue(false), []);
  const toggle = React.useCallback(() => setValue(v => !v), []);

  return { value, open, close, toggle };
}
```

组件里会干净很多：

```jsx
function DialogDemo() {
  const dialog = useToggle();

  return (
    <>
      <button onClick={dialog.open}>打开</button>
      {dialog.value && (
        <div>
          弹窗内容
          <button onClick={dialog.close}>关闭</button>
        </div>
      )}
    </>
  );
}
```

### 用组合优先，少写“万能组件”

React 天生适合组合。很多时候，一个小而清晰的组件树，比一个配置项极多的“万能组件”更容易维护。

所谓“万能组件”常见的问题是：

+ prop 越来越多
+ 分支越来越多
+ 内部判断越来越重
+ 最后变成任何场景都“勉强能用”，但没有一个场景真正优雅

相比之下，更稳的方式通常是：

+ 用小组件组合成大组件
+ 用 children、slots 风格接口表达可变结构
+ 把变化点交给组合，而不是塞进一个超大组件内部判断

React 的强项本来就是组合，如果总想靠一个组件把所有场景吃掉，反而是在和它的模型对着来。

例如，一个“万能弹窗”很容易写成这样：

```jsx
<Modal
  title="删除用户"
  showFooter
  showCancel
  showConfirm
  danger
  loading={loading}
  size="large"
  customBody={<UserInfo />}
  customFooter={<Actions />}
/>
```

这样的组件往往会越来越重。更自然的方式通常是组合：

```jsx
<Modal>
  <Modal.Header>删除用户</Modal.Header>
  <Modal.Body>
    <UserInfo />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost">取消</Button>
    <Button variant="danger" loading={loading}>确认删除</Button>
  </Modal.Footer>
</Modal>
```

前者依赖配置项堆叠，后者依赖组件组合。一般来说，后者更符合 React 的表达方式。

### 状态分层：本地状态、共享状态、服务端状态分开处理

现代 React 项目里，一个非常重要的判断是：不要把所有状态当成一种东西来处理。

至少要区分三类：

+ 本地状态：只影响当前组件或局部交互，例如弹窗开关、输入框内容
+ 共享状态：多个组件共同依赖的数据，例如当前用户、主题、权限
+ 服务端状态：来自后端的数据，例如列表、详情、分页结果、缓存数据

一旦这三类状态混在一起，组件就会越来越难维护。

例如本地交互状态用 `useState` 很自然，但服务端状态如果还全靠手写 `loading + error + data`，项目一大就会开始重复；共享状态如果到处 props drilling，也会越来越重。

所以现代 React 更强调“状态分层”，而不是“用一个工具解决所有状态问题”。

一个常见的反例是，把所有东西都硬塞进全局状态：

```jsx
{
  modalOpen: false,
  keyword: '',
  theme: 'dark',
  users: [],
  loading: false,
  error: null
}
```

这会让“局部交互”“全局配置”“服务端数据”混在一起。更合理的拆法通常是：

+ `modalOpen`、`keyword` 这类局部交互状态放组件内部
+ `theme`、`currentUser` 这类共享信息放 Context 或全局状态
+ `users`、`loading`、`error` 这类服务端状态交给查询库或单独的数据层管理

### 让 JSX 更可读，而不是更聪明

JSX 很灵活，但灵活不等于应该把所有逻辑都塞进去。

下面这种写法虽然能跑，但通常不够友好：

```jsx
return (
  <div>
    {list.length
      ? list.map((item) =>
          item.visible ? <Card key={item.id} item={item} /> : null
        )
      : loading
        ? <Spinner />
        : error
          ? <ErrorPanel />
          : <Empty />}
  </div>
);
```

JSX 更适合表达结构，而不是承担过多推理工作。更稳的写法通常是先把判断逻辑整理出来，再让 JSX 回到“描述界面”的职责上。

可读的 JSX 往往意味着：

+ 分支少一点
+ 嵌套浅一点
+ 命名明确一点
+ 结构优先于技巧

React 组件长期维护时，能被快速读懂，通常比一时写得“很聪明”更重要。

例如，把判断提前整理出来，通常会比把所有逻辑都塞进 JSX 更清晰：

```jsx
if (loading) return <Spinner />;
if (error) return <ErrorPanel />;
if (!list.length) return <Empty />;

return (
  <div>
    {list
      .filter((item) => item.visible)
      .map((item) => (
        <Card key={item.id} item={item} />
      ))}
  </div>
);
```

这种写法未必更短，但往往更容易维护。

## React 渲染原理：快照与批处理

React 里另一个特别重要的理解点是：组件每次渲染，拿到的都是那一刻的状态快照。

例如：

```jsx
export default function VibeCheck() {
  const [status, setStatus] = React.useState("clean");

  const handleClick = () => {
    setStatus("dirty");
    alert(status);
  };

  return <button onClick={handleClick}>{status}</button>;
}
```

很多人第一次看到这里会疑惑：为什么 `alert(status)` 还是旧值？原因不是 React 慢，而是事件处理函数拿到的是当前这次渲染时的快照。

同样地，状态更新通常会被批处理。

```jsx
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

这里如果 `count` 是 `0`，很多时候并不会变成 `3`，因为三次更新都基于同一个旧快照计算。

如果想基于“最新状态”连续更新，就要用函数式更新：

```jsx
const handleClick = () => {
  setCount((c) => c + 1);
  setCount((c) => c + 1);
  setCount((c) => c + 1);
};
```

这类机制非常能体现 React 的核心思想：React 不是直接一步步改变量，而是在一轮更新中统一计算新的 UI。

## React 的优点和代价

优点：

+ 组件化模型非常成熟
+ UI 与状态的关系清晰
+ 生态丰富
+ Hooks 让逻辑复用方式更灵活

代价：

+ 概念层次多，初学者容易被“会用 API”误以为“理解了 React”
+ 状态、渲染、副作用这些概念需要认真建立心智模型
+ 生态选择太多，反而会增加架构判断成本

## React 适合怎么学

React 最容易学歪的方式，是一上来就背很多库和写法。

更稳的顺序通常是：

1. 先理解组件、props、state
2. 再理解 Hooks，尤其是 `useState`、`useEffect`、`useRef`
3. 再理解渲染、快照、批处理、副作用
4. 最后再进入路由、状态管理和更具体的生态工具

因为 React 真正难的不是代码量，而是“渲染到底什么时候发生”“状态到底是谁的”“副作用应该放在哪里”。

## 总结

React 从 class 组件一路走到 Hooks，不只是语法风格变化，而是把组件、状态、副作用和渲染的关系重新组织得更清晰了。理解 React 的关键，不在于记住多少 Hook，而在于真正建立几个核心判断：UI 是状态的函数，render 不是副作用区，状态更新基于快照，复杂度应该分层管理。只要这几个点抓住了，React 的大部分内容都会开始变得顺理成章。
