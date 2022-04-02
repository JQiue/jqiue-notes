---
title: Promise，Async/Await
category: 编程语言
tag: [JavaScript]
article: false
---

::: danger 涉及到的概念
异步编程、基于回调、error-first-callback、回调地狱
:::

## 异步编程

JavaScript 是一种单线程的执行机制，后一个任务会等待前一个任务之完毕后才会执行，这是一种同步执行

```js
function f1() {}
function f2() {}

f1();
f2();
```

很明显，等`f1`执行完毕后，才会执行`f2`，如果`f1`是一个非常耗时的任务，就会堵塞`f2`执行造成程序的卡顿，这种情况可以将`f2`作为`f1`的回调函数来解决

```js
function f1(callback) {
  setTimeout(() => {
    // f1 的费时代码
    // ...

    callback(); // 调用 f2
  }, 1000);
}

function f2() {}

f1(f2);
// 后面的代码不会等待 f1 执行完
// ...
```

注意这里还有一个关键就是利用环境提供的异步函数`setTimeout`来让`f1`本身代码处于异步执行，以免影响后面的代码执行

## 回调地狱

很显然，将一个函数作为前一个函数的回调执行是很不错的点子，但有时候的回调函数简直是一个灾难

```js
/* 这是一个封装好的 Ajax 请求函数 */
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

request('http://xxx.xxx/a.json', res => {
  console.log(res);
});
```

`request`是一个异步的请求函数，它将在请求完毕时执行回调函数。假如需要在第一次请求时还要请求第二次、第三次、...，一旦请求任务过多就变成了一个无限向右延伸的代码，这就叫做回调地狱（callback hell），也叫厄运金字塔

```js
request('http://xxx.com/a.json', res => {
  console.log(res);
  request('http://xxx.com/b.json', res => {
    console.log(res);
    request('http://xxx.com/c.json', res => {
      console.log(res);
      /* 可能还有更多请求 */
      // ...
    });
  });
});
```

这种代码耦合度非常强，带来了很多问题，难以阅读和维护，不要写这种代码，要优雅的解决掉

方案一：使用笨拙的 Promise，使代码纵向增长

```js
new Promise((resolve, reject) => {
  request('http://xxx.com/a.json', res => {
    resolve(res);
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/b.json', res => {
      resolve(res);
    })
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/c.json', res => {
      resolve(res);
    })
  })
}).then(res => {
  console.log(res);
})
```

方法二：改造后的 Promise 方式

```js
// 封装 Promise 并返回
function handlePromise(url) {
  return new Promise((resolve, reject) => {
    request(url, res => {
      resolve(res);
    })
  })
}

// 优雅的使用方式
handlePromise('http://xxx.com/a.json').then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/b.json');
}).then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/c.json');
}).then(res => {
  console.log(res);
})
```

目前为止，我们只处理了成功的情况，现在将请求函数改造成能够处理失败的情况

```js
function request(url, success, error) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      success(JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status === 404) {
      error(JSON.parse(xhr.statusText));
    }
  }
}

/* 调用示例 */
request('xxx.com/x.json', res=>{...}, error=>{...});
```

那么如果使用方案一，会变成什么样呢？

```js
new Promise((resolve, reject) => {
  request('http://xxx.com/a.json', res => {
    resolve(res);
  }, err => {
    reject(err);
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/b.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}, error => {
  console.log(error);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/b.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/c.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}, error => {
  console.log(error);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/c.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}).then(res => {
  console.log(res);
})
```

看来只要增加了错误处理，方案一直接爆炸了，因为它还要在 rejected 产生新的 Promise 对象传给下一个`then`，否则就会影响后面的请求，现在看看方案二是啥样的

```js
// 稍微改造一下，增加 Promise 处理失败的情况
function handlePromise(url) {
  return new Promise((resolve, reject) => {
    request(url, res => {
      resolve(res);
    }, error => {
      reject(error);
    })
  })
}

// 开始真正的请求
handlePromise('http://xxx.com/a.json').then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/b.json');
}, error => {
  console.log(error);
  return handlePromise('http://xxx.com/b.json');
}).then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/c.json');
}, error => {
  console.log(error);
  return handlePromise('http://xxx.com/c.json');
}).then(res => {
  console.log(res);
}, error => {
  console.log(error);
})
```

虽然方案二代码增加了一些，但是相比方案一还是更加美好了很多，方案二其实还能更加美好一点

```js
handlePromise('http://xxx.com/a.json').then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/b.json');
}).then(res => {
  console.log(res);
  return handlePromise('http://xxx.com/c.json');
}).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error)
})
```

这发生了什么？其实是对所有的失败情况进行了统一的管理，因为我们请求的目的就是，任务 a 成功了，再执行任务 b，以此类推下去，但是任务 a 如果没有成功呢？很显然后面的任务就没必要执行下去了，因为不存在任务 a 失败了，而继续执行任务 b 却成功的情况，否则这是两个不相干的任务，不符合逻辑，因此直接跳到`catch`中进行处理

基于这个思路，方案一也能稍微优化一下，，，，，即使看起来还是那么的.....

```js
new Promise((resolve, reject) => {
  request('http://xxx.com/a.json', res => {
    resolve(res);
  }, err => {
    reject(err);
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/b.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    request('http://xxx.com/c.json', res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
})
```

## Promise

Promise 是用来控制异步操作的对象，它能够把异步操作的最终结果和相应的处理程序关联起来，然后使异步方法像同步方法那样具有返回值。 Promise 会让一个异步方法不会立即返回最终的值，而是返回一个`promise`对象，方便在未来的某个时候交给使用者。本意翻译过来就是“承诺”，代表目前是一个空口承诺，但是会在未来的某个时间点进行兑现，当然它不一定是成功的，也可能是失败的，所以 Promise 必然处于以下状态之一：

1. 待定（pending）：既没有完成，也没有拒绝
2. 已完成（fulfilled）：意味着成功
3. 已拒绝（rejected）：意味着失败

::: danger
状态只能由 pending 转到 fulfilled 或 rejected，不能逆向转换，同时 fulfilled 和 rejected 不能相互转换
:::

Promise 对象由`Promise`函数创建，接收一个回调函数作为参数，有固定的两个参数：`resolve`和`reject`

```js
const p = new Promise((resolve, reject) => {
 
})
```

接下来将异步程序放到回调函数中执行，比如扔一个定时器

```js
const p = new Promise((resolve, reject) => {
   setTimeout(()=>{
    console.log('jinqiu.wang');
  }, 1000)
})
```

### then

现在的 Promise 还是 pending 状态，这个时候可以调用`then`方法来改变状态，`then`也接受两个回调函数，当 Promise 从 pending 转为 fulfilled 会调用第一个，而转为 rejected 时，会调用第二个。在创建 Promise 对象的时候就回调函数就有两个参数，是的，这就是用来控制 Promise 状态的

```js
const p = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // resolve();  fulfilled
    // reject();   rejected
  }, 1000)
}).then(()=>{
  // 调用 resolve() 时执行这个函数
  console.log('fulfilled');
}, ()=>{
  // 调用 reject() 时执行这个函数
  console.log('rejected');
})
```

`resolve()`传入的参数会传给`then`中的回调函数

```js
const p = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // 转为 fulfilled 态，并传入结果
    resolve('fulfilled');
    // 或者转为 rejected，并传入结果
    // reject('rejected');
  }, 1000)
}).then(res =>{
  // 接收 resolve() 传来的结果并处理
  console.log(res); // fulfilled
}, res =>{
  // 接收 reject() 传来的结果并处理
  console.log(res); // rejected
})
```

尽管 Promise 通常是用来做异步操作，然后在某个时间点调用`resolve/reject`，这不是必须的，也可以立即调用，所以`new Promise`中的代码是同步的，但`then`却是异步的，`then`相当于一个微任务

```js
const p = new Promise((resolve, reject) => {
  console.log('1');
  resolve('3');
})

p.then( res => {
  console.log(res);
})

console.log('2');

/* 执行结果并不是 1, 3, 2 而是 1， 2， 3 */
```

如果不想处理 rejected 态，`then`的第二个参数可以省略，`resolve`和`reject`无法同时调用，即使同时调用，也会按照先后顺序只执行其中的一个而忽略另一个

### catch

如果只对错误感兴趣，那么可以使用`null`作为`then`的第一个参数，或者使用`catch`方法，它们是等价的

```js
new Promise((resolve, reject) => {
  reject(new Error('error'));
}).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
})
```

应该将`catch`准确地放到想要处理，并知道如何处理这些`error`的地方。处理程序应该分析`error`（可以自定义 `error`类来帮助分析）并再次抛出未知的`error`（可能它们是编程错误）

### finally

`finally`方法不管`resolve/reject`哪个方法调用都会被执行（必须调用其中一个才会执行），它也没有参数，经常做一些清理的工作

```js
new Promise((resolve, reject) => {
  resolve('fulfilled');
  // reject(new Error('error'));
}).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
}).finally(()=>{
  console.log('finally!');
});
```

而且它还不会阻拦 Promise 的状态传递，因为它并不需要处理 Promise 的结果，所以将结果传递了下去

```js
new Promise((resolve, reject) => {
  resolve('fulfilled');
  // reject(new Error('error'));
}).finally(()=>{
  console.log('finally!');
}).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
});
```

### Promise 链

先看一个例子：

```js
new Promise((resolve, reject) => {
  resolve(1);
}).then(res => {
  return res * 2;
}).then(res => {
  return res * 2;
}).then(res => {
  console.log(res); // 4
})
```

发生了什么？其实就是通过`then`处理程序进行传递，`then`的返回值会被传给下一个`then`处理程序，以此类推，所以才会看到最后的结果是`4`

`then`的调用其实会返回一个 Promise 对象，所以才能这个基础上继续`then`下去，那么当处理程序返回了一个值后，它将成为该 Promise 的结果，所以下一个`then`才能够接收到

`then`的返回值有以下规则：

1. 返回了一个值，那么`then`返回的 Promise 会成为 fulfilled 态，并将返回的值作为该状态的回调函数的参数值
2. 没有返回值，那么`then`返回的 Promise 会成为 fulfilled 态，该状态的回调函数的参数值为`undefined`
3. 抛出错误，那么`then`返回的 Promise 会成为 rejected 态，并将返回值作为该状态的回调函数的参数值
4. 返回一个 Promise，如果该 Promise 是 fulfilled，那么返回的 Promise 也是 fulfilled 态，并且那个 Promise 的回调函数参数值会作为返回的 Promise 的接收状态返回值。如果返回了一个 rejected 态的 Promise，就同理
5. 如果返回的是一个 pending 态的 Promise，那么`then`返回的也是 pending 态的

这种链式调用非常适合一系列异步任务要一个接着一个运行的情况，但是有种情况要注意，它并不是链式调用，而是单独的调用方式，并不会传递，因为它们彼此之间是相互独立的

```js
let promise = new Promise((resolve, reject) =>{
  resolve(1);
});

promise.then(res => {
  console.log(res); // 1
  return res * 2
});

promise.then(res => {
  console.log(res); // 1
  return res * 2
});

promise.then(res => {
  console.log(res); // 1
  return res * 2
});
```

### 静态方法

Promise 提供了 5 个静态方法：

+ `resolve`：返回一个 fulfilled 态的 Promise
+ `reject`：返回一个 rejected 态的 Promise
+ `all`：接收一个 Promise 数组作为参数，并返回新的 Promise
+ `race`：接收一个 Promise 数组作为参数，并返回新的 Promise
+ `allSettled`：接收一个 Promise 数组作为参数，并返回新的 Promise

有时并不需要`new Promise`这样的实例，但仍然需要调用者使用`then/catch`的时候就使用静态方法`resolve/reject`来返回一个 Promise

```js
function foo(flag) {
  if (flag) {
    return new Promise((resolve, reject) => {
      /* 异步操作 */
      resolve('success');
    })
  } else {
    // return 'error' 不能直接返回，外界需要一个 Promise
    // or return Promise.resolve('error');
    // return Promise.reject('error');
  }
}

foo(false).then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
})
```

`Promise.all`会等待其中所有的 Promise 都`resolve`时，返回包含所有 Promise 结果的数组。如果任意一个 Promise 为`reject`，那么它会直接变成`reject`的结果并忽略其的 Promise 并返回 error

`Promise.race`会看哪个 Promise 完成的最快，最快的那个 Promise 的`resolve/reject`成为最后的结果，就如其名像比赛一样

`Promise.allSettled`会等待所有的 Promise 完成，返回一个包含所有 Promise 结果的对象数组，这个对象有两个属性：`status`：`fulfilled/rejected`，如果为`fulfilled`第二个属性是`value`，如果为`rejected`则第二个属性为`reason`

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve('1 success');
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(2);
    // resolve('2 success');
    reject('error');
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(3);
    resolve('3 success');
  }, 3000)
})

Promise.all([p1, p2, p3]).then(res => {
  console.log(res); // 当都为 resolve 时 [1, 2, 3]
}).catch(error=>{
  console.log(error); // 当其中一个为 reject 时，转到这里
})

Promise.race([p1, p2, p3]).then(res => {
  console.log(res); // '1 success'，p1 完成的最快
}).catch(error=>{
  console.log(error);
})

Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res);
/* [
     { status: 'fulfilled', value: '1 success' },
     { status: 'rejected', reason: 'error' },
     { status: 'fulfilled', value: '3 success' }
   ] */
}).catch(error=>{
  console.log(error);
})
```

### 函数的 Promise 化

将一个接收回调的函数转换为一个返回 Promise 的函数，因为很多库和函数都是基于回调的，所以进行这种转换很常见，被 Promise 化的函数使用起来非常方便

```js
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      resolve(JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status === 404) {
      reject(JSON.parse(xhr.statusText));
    }
  }
}

request('xxx.com', res => {}, error => {})
```

将上面基于回调的代码进行的 Promise 化

```js
function requestPromise(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else if (xhr.readyState === 4 && xhr.status === 404) {
        reject(JSON.parse(xhr.statusText));
      }
    }
  });
}

/* 调用写法是这样的 */
requestPromise('xxx.com').then(...)
```

`request`和`requestPromisify`的作用是相同的，新的函数对原始的函数进行了封装，非常适用基于 Promise 的代码

## Async/Await

`async/await`是 JavaScript 提供的新关键字，可以更加优雅的解决 Promise 异步问题，而无需链式调用，首先看一个例子

```js
function foo() {
  return 1;
}

async function bar() {
  return 1; // 等价于 Promise.resolve(1);
}

console.log(foo()); // 1
console.log(bar()); // Promise { 1 }
```

这很简单，使用`async`关键字标记的函数，函数的返回值是一个 Promise 对象，`async`只做了这样的一件事：这个函数总是返回一个 Promise 对象，并将返回值包装成一个“resolved”的 Promise 对象中

那么`await`能用来做什么呢？先看一个例子

```js
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('foo');
      resolve();
    }, 1000);
  })
}

async function bar() {
  foo();
  console.log('bar');
}

console.log(bar());

/* 
执行结果：
'bar'
'foo'
*/
```

由于`new Promise`中的回调代码是异步的，所以先打印`bar`，再`foo`，如果在调用`foo`前使用`await`关键字

```js
function foo(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('foo');
      resolve();
    }, 1000);
  })
}

async function bar() {
  await foo();      // 等到 foo 执行完成，才继续执行后面的代码
  console.log('bar');
}

console.log(bar());

/* 
执行结果：
'foo'
'bar'
*/
```

在函数执行到`await`时会让函数等待后面的代码执行完成，然后再继续执行下去，`await`只是让函数暂停一下而已，并不影响什么其他的东西，比如`foo`本身会返回一个 Promise，可以在`await`的左边用变量直接接收结果

```js
/* 稍微改造一下，使用 resolve 传值 */
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 1000);
  })
}

async function bar() {
  let res = await foo();  // 等待执行，并接收返回值
  console.log(res);
  console.log('bar');
}

bar()

/* 
执行结果：
'foo'
'bar'
*/
```

`await`直接将 Promise 的结果作为返回值了，几乎不需要使用`.then`，另外，只能在`async`修饰的函数中使用`await`

对于正常的 Promise 来说，`await`会直接返回它的结果，如果 Promise 是 rejected，它将抛出这个错误

```js
function foo() {
  return Promise.reject(new Error('fail'));
}

async function bar() {
  try {
    await foo();
  } catch (error) {
    console.log(error);  // Error: fail
  }
}
```

就像一个`throw`语句一样，使用`try...catch`处理它。如果没有使用`try...catch`处理，那么`bar`生成的 Promise 将会变成 rejected，所以在这之后可以使用`catch`处理它。如果都没有处理，将会得到一个未处理的 promise error，但是这样的话，程序就死掉了

## 顶层 await

之前必须在`async`中使用`await`，如果在最外层会抛出错误，因此一般包装成一个立即执行函数

```js
(async function () {
  await Promise.resolve({});
})();
```

而现在可以在最外层直接使用`await`，将整个模块看起来像一个巨大的`async`函数

```js
await Promise.resolve({});
```

这种情况只适用于 ESM 模块化中，并不支持 CommonJS 以及传统的`<script>`的

## 总结

+ JavaScript 是一种单线程执行机制
+ Promise 会让一个异步方法不会立即返回最终的值，而是返回一个 Promise 对象，在未来的某个时候交给使用者，有三种状态`pending/fulfilled/rejected`，调用`resolve`时转为`fulfilled`，而调用`reject`时转为`rejected`
+ Promise 对象的`then`方法有两个参数，分别是`resolve`和`reject`的回调
+ `new Promise`是同步的，而`then`则不是
+ `catch`也可以捕捉`reject`的回调
+ `finally`不管`resolve/reject`都会被执行，并且不会阻止结果传递
+ `then`本身也会返回 Promise，`return`结果将会作为该 Promise 对象的结果，所以可以链式调用，该 Promise 的状态，取决于返回值是审美样的
+ Promise 提供了 5 个静态方法，在不需要进行`new`操作的时候使用
+ 用`async`修饰的函数一定会返回一个 Promise 对象
+ 只能在`async`函数中使用`await`，会让函数等待后面代码完成，然后继续执行下去，如果是一个 Promise 会直接将结果作为返回值，假如结果是正常的，否则会抛出错误
+ 在 ESM 中可以是使用顶层`await`，不仅仅在`async`中
