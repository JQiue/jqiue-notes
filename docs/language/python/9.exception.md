---
title: 异常
category: 编程语言
tag: Python
author: JQiue
article: false
---

异常是在出现错误时采用正常控制流以外的动作，但是错误不等于异常

对于异常的处理流程是：检测错误，捕获异常

当不处理异常的时候，程序往往就崩溃了，处理异常的目的就是为了让程序遇到异常也会正常执行下去，以便在程序崩溃之前做一些必要的工作

## 语法错误

语法错误是编译器解析代码的时候抛出的错误，必须纠正才能运行程序，属于真正意义上的错误

## 运行错误

程序在语法上没有毛病，但是在运行的过程中发生了错误，比如`1/0`，当出现这类错误是，Python 会抛出该错误的类型，并指明错误发生的代码位置，这种运行过程中产生的错误就叫做**异常（Exceptions）**

```python
1 / 0 # 抛出 ZeroDivisionError
1 + "2" # 抛出 TypeError
print(a) # 抛出 NameError
```

以上是一些简单的错误类型示例，一般无需记住

当出现这种异常时，可以使用捕获异常的方式来处理，在让其他逻辑代码继续执行下去，这样程序的健壮性就大大的提升了

## try except

Python 通过`try except`处理异常，比如：

```python
try:
  1/0
except ZeroDivisionError:
  print("division by zero")
```

try 语句块中放入需要处理异常的语句，except 语句块用于捕获异常类型并处理，后面的变量代表捕获的异常类型，这个例子会输出`division by zero`

改一下出错类型：

```python
try:
  1 + "2"
except ZeroDivisionError:
  print("division by zero")
```

虽然明知`1 + "2"`会抛出 TypeError 错误，但是并没有执行 except 代码块中的内容，反而是编译器抛出了错误，这是因为 except 后面的变量类型只能捕获该类型的错误，要想捕获 TypeError 错误，可以在 except 后使用多个异常类型，当捕获到其中某一个异常时，便会执行代码块中的内容

```python
try:
  1 + "2"
except (ZeroDivisionError, TypeError):
  print("error")
```

except 也可以不带任何类型，只要发生了一场就会执行该代码块，但这不是一个好的方式

如果想要捕获所有的异常可以这么做：

```python
try:
  1 + "2"
except Exception as e:
  print(e)
```

Exception 可以捕获所有的异常，可以使用 as 关键字将所有进入到 Exception 异常起一个别名

## try except else

`try except`可以携带一个 else 子句，当没有发生异常的时候就会执行 else 中的代码块

```python
try:
  1 + 1
except Exception as e:
  print(e)
else:
  print("没有任何异常")
```

## try except else finally

和 else 不同的是，无论是否异常，都会执行 finally 中的代码块

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
