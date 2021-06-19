---
title: 特殊的函数用法
category: 编程语言
tag: Python
author: JQiue       
article: false
---

## lambda 表达式

lambda 表达式又叫匿名函数，通常表示内部只有一行语句的函数，对于 lambda 来说和普通的函数区别就在于更加简洁

```python
def add(a, b):
  return a + b

res = add(1, 2)
```

使用 lambda 表达式

```python
res = lambda a, b: a + b
```

::: tip
lambda 表达式就是一个简单函数的简写版本，并且由于匿名的特点，调用后即销毁，提高了性能
:::

## 局部函数

函数中内部也可以定义一个函数

```python
def foo():
  def bar():
    print("bar")
  bar()
foo()
```

和局部变量一样，只能在所在的作用中调用

但是，函数也可以作为参数返回，变相的扩大了作用域

```python
def foo():
  def bar():
    print("bar")
  return bar
bar = foo()
bar()
```

如果全局函数和局部函数都定义了相同的变量会如何？

```python
def foo():
  a = "foo 中的变量"
  def bar():
    a = "bar 中的变量"
    print(a)
  bar()
foo()
```

局部函数会优先寻找属于自己作用域中的变量，但是本质上 a 在全局变量中已经创建了，所以局部中的 a 相当于一个赋值操作

将打印语句变换一下

```python
def foo():
  a = "foo 中的变量"
  def bar():
    print(a)
    a = "bar 中的变量"
  bar()
foo()
```

会发现程序抛出了 UnboundLocalError 错误，这是因为在局部函数中 a 还未定义的时候就被引用了，但是又检测到了后面定义的 a，如果删除了 a 语句，那么会向外部作用域查找 a 的定义

## 闭包函数

闭包并不是只有在 Python 中的概念，即在局部函数中引用了自身环境外的变量

```python
def foo():
  fns = []
  for i in range(3):
    def bar():
      return i
    fns.append(bar)
  return fns

f1, f2, f3 = foo()

print(f1()) # 2
print(f2()) # 2
print(f3()) # 2
```

这个例子为什么打印的都是 2，因为 for 循环只是声明了函数并没有调用，当在外部调用的时候，i 已经变成了 2 了

## 装饰器

装饰器本身也是一个函数，它可以让其他函数在不改变自身原有的功能下增加额外的功能，将一个函数传入装饰器中，通过闭包来修饰，然后返回修饰后的名字，这就是装饰器的运行过程

```python
def foo():
  print("I am foo")
```

上面是一个需要被装饰的函数，要求是在打印后输出函数的名字

```python
def decorators(fn):
  fn()
  print("function name：" + fn.__name__)

decorators(foo)
```

输出如下：

`I am foo`  
`function name：foo`

只要将被修饰的函数传入 decorators 中就 OK，但是这破坏了原有的代码结构，因为装饰器的特点就是不改变原有的语法结构下添加额外功能，于是改造

```python
def decorators(fn):
  def wrapper():
    fn()
    print("function name：" + fn.__name__)
  return wrapper

def foo():
  print("I am foo")

foo = decorators(foo)
foo()
```

通过闭包函数修饰，然后将闭包作为返回值即可，让 foo 的指针指向 decorators，即可实现不破坏原有的结构

### @ 语法糖

@ 是装饰器的语法糖，可以省略最后一步的赋值操作，用在需要被修饰的函数上

```python
def decorators(fn):
  def wrapper():
    fn()
    print("function name：" + fn.__name__)
  return wrapper

@decorators
def foo():
  print("I am foo")

foo()
```

这样就可以省略了`foo = decorators(foo)`操作了，更加 python，从表面上看没有对 foo 进行任何修改就新增了功能，而且这个装饰器是可以复用的
