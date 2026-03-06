---
title: 错误处理
category: 编程语言
tag: [Python]
article: false
---

Python 的错误处理以异常（exception）为中心。它的优势在于表达简洁、传播自然，但代价是如果捕获边界过于宽泛，很容易把真正的问题一起吞掉。

如果想先看错误处理的通用模型，可以先读 [编程语言中的错误处理模型](/sundry/error.html)。本篇只关注 Python 自己的机制：`try / except / else / finally`、异常类型匹配，以及编写 Python 异常处理代码时最容易踩的坑。

## Python 中的异常

Python 在运行时出错时会抛出异常对象。常见例子：

```python
1 / 0          # ZeroDivisionError
1 + "2"        # TypeError
print(a)       # NameError
```

这些异常并不需要死记硬背，但需要意识到：不同异常类型代表不同失败原因，而 Python 的异常处理语句可以按类型精确匹配。

## `try / except`

最基本的异常处理结构是：

```python
try:
  1 / 0
except ZeroDivisionError:
  print("division by zero")
```

这里的逻辑很直接：

+ `try` 中放可能出错的代码
+ 一旦抛出匹配的异常，就跳到对应的 `except`

如果异常类型不匹配，`except` 不会执行：

```python
try:
  1 + "2"
except ZeroDivisionError:
  print("division by zero")
```

上面抛出的是 `TypeError`，所以 `except ZeroDivisionError` 根本接不住。

## 捕获多个异常

如果一个逻辑块可能抛出多种已知异常，可以同时捕获多个类型：

```python
try:
  1 + "2"
except (ZeroDivisionError, TypeError):
  print("error")
```

这种写法适合“处理策略相同，但失败原因不止一种”的场景。

## `except Exception as e`

如果想拿到错误对象本身，可以用 `as` 绑定：

```python
try:
  1 + "2"
except Exception as e:
  print(e)
```

`Exception` 可以捕获绝大多数常见业务异常，因此它很常见；但也正因为它太宽泛，所以不能滥用。

更稳妥的原则通常是：

+ 优先捕获你明确知道怎么处理的异常类型
+ 只有在边界层，才考虑用 `Exception` 做统一兜底

否则很容易把真正的 bug 也伪装成“已经处理过的异常”。

## `else`：只在没有异常时执行

Python 的 `else` 子句很适合把“成功路径”从 `try` 中拆出来：

```python
try:
  1 + 1
except Exception as e:
  print(e)
else:
  print("没有任何异常")
```

`else` 只会在 `try` 中没有异常时执行。它的意义不是多一种语法，而是让成功逻辑和异常逻辑分开，结构更清晰。

## `finally`：保证清理逻辑执行

`finally` 无论是否发生异常都会执行：

```python
try:
  1 + 1
except Exception as e:
  print(e)
else:
  print("无异常则执行")
finally:
  print("有无异常都执行 finally 代码块")
```

它通常用于：

+ 关闭文件
+ 释放锁
+ 回滚状态
+ 清理临时资源

也就是说，Python 的异常处理不只是“抓错误”，还承担着资源善后的责任。

## Python 错误处理的常见问题

+ `except:` 裸捕获过于宽泛，容易把不该吞掉的错误一起吞掉
+ 把所有逻辑都堆进 `try` 块，会让真正可能出错的位置变得模糊
+ 捕获异常后什么都不做，只会让错误从“可见失败”变成“静默失败”
+ 只关心报错，不关心资源释放，最后容易留下半完成状态

Python 的异常处理写得好不好，关键不在于有没有捕获，而在于是否按职责边界捕获了正确的异常。

## 常见实践

+ 优先捕获具体异常，而不是上来就 `except Exception`
+ 用 `as e` 保留异常上下文
+ 用 `else` 把成功路径和异常路径分开
+ 用 `finally` 保证清理逻辑执行
+ 不要在捕获后静默忽略错误，至少保留足够上下文

## 总结

Python 的错误处理优势在于自然、简洁、表达力强。`try / except / else / finally` 让成功路径、失败路径和清理逻辑都可以有明确位置。但这套机制的前提是异常边界要收得住。Python 真正容易出问题的地方，不是不会捕获，而是捕获得太宽、太早、太随意。
