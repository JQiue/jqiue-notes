---
title: 错误处理
category: 编程语言
tag: [Java]
article: false
---

Throwable 是所有错误或异常的超类，分为 Error 和 Exception，Exception 又分为编译时异常和运行时异常

+ 运行时异常 - 所有 RuntimeException 类及子类成为运行时异常，在编译时不会报错，在运行过程终止运行
+ 编译时异常 - 程序员必须处理，否则程序就会发生错误无法通过编译

如果没有手动处理异常，JVM 就会抛出异常信息，同时停止运行

## try...catch

通常如果程序发生了错误，就会立即停止运行，并在控制台打印错误信息，但是使用`try...catch`结构，可以捕获程序错误，而不是导致程序立即死掉

这里是有两个代码块，首先执行`try`中的语句，如果没有出现错误，则会忽略`catch`代码块中的语句，运行到`try`末尾并跳过`catch`执行。如果`try`中出现了错误，则会立即转到`catch`中，并将错误信息传给`err`对
象，这个对象包含了发生错误的详细信息

```java
try {
  // 执行代码
} catch (Exception e) {
  // 错误处理
}
```

这是一个没有错误的例子：

```java
try {
} catch (Exception e) {
}

try {
} catch (Exception e) {
}
```

## Error 对象

发生错误时，会生成一个包含有关错误的详细信息的对象，并作为参数传给`catch`

一般来说，所有的内建错误对象，都会有两个属性：

+ `getMessage()`：获取异常信息
+ `pirntStackTrace()`：获取异常类名和异常信息，及异常出现的位置

```java
try {
} catch (Exception e) {
}
```

## 自定义 error

除了内建的错误以外，还允许使用一些错误构造器来创建 error 对象，用于处理自定义的错误，通常可以继承 RuntimeException 来定义运行时异常，继承 Exception 定义编译时异常

```java
let error = new Error(message);
let syntaxError = new SyntaxError(message);
let referenceError = new ReferenceError(message);
// ...
```

这些内建的错误的`name`就是构造器的名字

### Throw 和 Throws

`throw`是一个语句抛出异常，`throws`是一个方法抛出异常

```java
let foo = { name: 'foo' };
try {
  if(!foo.age) {
    throw new SyntaxError('没有定义 age 属性');
  }
} catch (error) {
}
```

`throw`主要处理一些“不正确的数据”，如果出现了预料之外的错误，就可能比较麻烦，因为`catch`会捕获所有的错误，处理的错误可能不是这个类型的，这就很糟糕

`catch`应该只处理它知道的 error，然后抛出其他 error

```java
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

抛出运行时异常不需要处理，抛出编译时异常必须处理，如果不处理，就必须往上面抛，抛给方法的调用者

## finally

`try...catch`还有一个可选的子句`finally`，无论何种情况下，这个子句中的代码最后都会执行

```java
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

```java
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

```java
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


<!-- to be update -->