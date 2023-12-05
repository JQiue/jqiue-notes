---
title: 错误处理
category: 编程语言
tag: [JavaScript]
article: false
---

通常如果程序发生了错误，就会立即停止运行，并在控制台打印错误信息，但是使用`try...catch`结构，可以捕获程序错误，而不是导致程序立即死掉

## try...catch

这里是有两个代码块，首先执行`try`中的语句，如果没有出现错误，则会忽略`catch`代码块中的语句，运行到`try`末尾并跳过`catch`执行。如果`try`中出现了错误，则会立即转到`catch`中，并将错误信息传给`err`对
象，这个对象包含了发生错误的详细信息

```js
try {
  // 执行代码
} catch (err) {
  // 错误处理
}
```

这是一个没有错误的例子：

```js
try {
  console.log('');
} catch (error) {
  console.log('发生了某些错误');
}

// 引用未定义的变量发生错误
try {
  foo;
} catch (error) {
  console.log('发生了某些错误');
}
```

另外，错误处理只能对有效的代码进行处理，如果包含语法错误，是不会工作的，简而言之就是只能处理运行时的错误，而不是编译时的错误

::: caution 处理同步任务
`try...catch`只能处理同步任务，如果包裹了异步任务，则会无法捕获错误
:::

`catch`的参数是可选的，也可以忽略它

## Error 对象

发生错误时，会生成一个包含有关错误的详细信息的对象，并作为参数传给`catch`

一般来说，所有的内建错误对象，都会有两个属性：

+ `name`：错误名称
+ `message`：错误的详细信息描述

```js
try {
  foo;
} catch (error) {
  console.log(error); // ReferenceError: foo is not defined at ...
  console.log(error.name); // ReferenceError
  console.log(error.message); // foo is not defined
}
```

## 自定义 error

除了内建的错误以外，还允许使用一些错误构造器来创建 error 对象，用于处理自定义的错误

```js
let error = new Error(message);
let syntaxError = new SyntaxError(message);
let referenceError = new ReferenceError(message);
// ...
```

这些内建的错误的`name`就是构造器的名字

### Throw

`throw`可以手动抛出自定义的错误，主要的使用方式就是扔一个 error 对象给它

```js
let foo = { name: 'foo' };
try {
  if(!foo.age) {
    throw new SyntaxError('没有定义 age 属性');
  }
} catch (error) {
  console.log(error); // SyntaxError: 没有定义 age 属性
}
```

`throw`主要处理一些“不正确的数据”，如果出现了预料之外的错误，就可能比较麻烦，因为`catch`会捕获所有的错误，处理的错误可能不是这个类型的，这就很糟糕

`catch`应该只处理它知道的 error，然后抛出其他 error

```js
let foo = { name: 'foo' };
try {
  aaa; // ReferenceError
  if(!foo.age) throw new SyntaxError('没有定义的 age 属性');
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("SyntaxError: " + error.message); // SyntaxError: ReferenceError: aaa is not defined
  } else {
    throw error;
  }
}
```

使用`instranceof`判断错误类型，然后处理这个错误，如果不符合就继续抛出，就达到了只在`catch`中处理`SyntaxError`的目的

再次抛出的错误可以用另外一级的`try...catch`来处理

```js
try {
  let foo = { name: 'foo' };
  try {
    aaa; // ReferenceError
    if (!foo.age) throw new SyntaxError('没有定义的 age 属性');
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("SyntaxError: " + error.message); // SyntaxError: ReferenceError: aaa is not defined
    } else {
      throw error;
    }
  }
} catch (error) {
  console.log('捕获到了 ReferenceError');
}
```

## finally

`try...catch`还有一个可选的子句`finally`，无论何种情况下，这个子句中的代码最后都会执行

```js
try {
  // 尝试执行的代码
} catch(error) {
  // 发生 error 就执行的代码
} finally {
  // 总会执行的代码
}
```

`finally`通常用在做某些事情的时候，无论出现什么情况都要完成的某个任务的时候使用

另外，`finally`使用于`try...catch`中的任何出口，包括`return`

```js
function fc() {
  try {
    return 1;
  } catch (error) {
    
  } finally {
    console.log('finally');
  }
}

console.log(fc());
```

虽然函数在遇到`return`时会立即结束执行，但是`finally`会在结束前先执行

除此外，也可以使用不需要处理错误的`try...finally`

```js
try {
  // 被尝试运行的代码
} finally {
  // 总是被执行的代码
}
```

## 全局 catch

## 扩展 Error

## 无法捕获的错误

异步调用的错误是无法被捕获的，这和调用栈有关系

```js
try {
  setTimeout(() => {
    throw new Error('fail');
  }, 1000);
} catch (error) {
  console.log(error);
}
```

## 总结

+ `try catch`用于处理运行时造成的错误

<!-- to be updated -->
