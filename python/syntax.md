---
title: 基本语法
category: 编程语言
tag: [Python]
article: false
---

这里是 Python 的基本语法规则

## 注释

```python
# 注释内容

'''
使用 3 个单引号作为注释的开头和结尾
这里的内容都是注释
'''

"""
使用 3 个双引号作为注释的开头和结尾
这里的内容都是注释
"""
```

## 代码块和语句

Python 并没有采用`{}`来区分代码块的层次，而是使用缩进和冒号来区分

```python
age = int(input("输入年龄："))
if age < 18:
    print("未成年")
else age >= 18:
    print("已成年")
```

Python 是一个对缩进非常敏感的语言，同一个级别的代码块缩进量必须一样，否则会报`SyntaxError`错误，所以要确定好缩进的数量，一般为 4 个空格

## 标识符

+ 由**英文字母**，**数字**和**下划线**组成，但第一个字符不能是数字
+ 不能是 Python 中的**关键字**和**保留字**
+ 区分大小写

## 变量

Python 不需要声明变量的数据类型，这也意味着变量可以被不同类型的值修改

可以通过 `=` 来给变量赋值

```python
foo = 3
foo = "jqiue"
```

链式赋值可以为多个变量同时赋予相同的值

```python
foo = bar = quz = 33
```

解包赋值可以为按照一定的序列为变量赋值，可以是不同的数据类型

```python
foo, bar = 33, "jqiue"
```

::: tip 为什么没有只读变量
没有语法规则限制一个变量无法被修改
:::

## 数据类型

Python 只会在运行的时候确定数据的类型

+ 整型（int）
+ 浮点（float）
+ 布尔（bool）
+ 字符串
+ 列表
+ 元组
+ 字典
+ 集合

::: tip 数字分隔符
Python 为了提高数字的可读性，允许使用下划线`_`来分割数字（整数或小数），通常每三个数字添加一个下划线，下划线并不会影响数字本身的值

```python
foo = 8_848_838
```

:::

::: tip 数字的进制表示
Python 同样支持多种进制来表示整数

+ 十进制：由 0 ~ 9 共十个数字排列组合而成（Python 中的数字默认是十进制）
+ 二进制：由 0 和 1 组成，以`0b`或`0B`开头
+ 八进制：由 0 ~ 7 八位数字组成，以`0o`或`0O`开头
+ 十六进制：由 0 ~ 9 和 A ~ F（a ~ f）组成，以`0x`或`0X`开头
:::

::: tip 非 0 都是真
在逻辑运算中，任何非 0 的值都会被当成 True，反之都是 False
:::

::: tip 不同类型数据之间的计算
数值类型之间可以直接计算，如果是`bool`，会被转换成`1`或`0`来计算
:::

### 类型检测

Python 提供了内置函数`type()`来检测数据类型

```python
print(type(1))    # <class 'int'>
print(type(1.1))  # <class 'float'>
print(type("1"))  # <class 'str'>
print(type(True)) # <class 'bool'>
print(type([]))   # <class 'list'>
print(type(()))   # <class 'tuple'>
print(type({}))   # <class 'dict'>
print(type({1,})) # <class 'set'>
```

`isinstance()`函数用于判断一个对象是否为另一个已知的类型，可以是 Python 定义的，也可是通过 class 定义的类

```python
print(isinstance(1, int))     # true
print(isinstance(1.1, float)) # true
print(isinstance("1", str))   # true
print(isinstance(True, bool)) # true
print(isinstance([], list))   # true
```

`type()`不会考虑该类型的继承关系，而`isinstance()`则会将子类认为父类的类型，会考虑继承关系

```python
class Person:
  def say(self):
    print("I am a human")

class Student(Person):
  pass

print(type(Student()) == Student)     # true
print(type(Student()) == Person)      # false
print(isinstance(Student(), Student)) # true
print(isinstance(Student(), Person))  # true
```

### 类型转换

Python 提供了很多函数用于转换数据类型

| 函数     | 说明              |
| -------- | ----------------- |
| int(x)   | 将 x 转换成整数   |
| float(x) | 将 x 转换成浮点数 |
| str(x)   | 将 x 转换成字符串 |

## 运算符

### 常见运算符

| 运算符 | 描述                                                            | 例子         |
| ------ | --------------------------------------------------------------- | ------------ |
| +      | 加                                                              | 1 + 2 = 3    |
| -      | 减                                                              | 3 -2 = 1     |
| /      | 不整除                                                          | 3 / 2 = 1.5  |
| //     | 整除                                                            | 3 / 2 = 1    |
| %      | 取余                                                            | 3 / 2 = 1    |
| \*\*   | 幂（乘方）                                                      | 2 \*\* 3 = 8 |
| ==     | 判断两个操作数是否相等，如果相等返回 True，否则 False           |              |
| !=     | 判断两个操作数是否不相等，如果不相等返回 True，否则 False       |              |
| >      | 判断左操作数是否大于右操作数，如果大于返回 True，否则 False     |              |
| <      | 判断左操作数是否小于右操作数，如果小于返回 True，否则 False     |              |
| >=     | 判断左操作数是否大于等于右操作数，如果大于返回 True，否则 False |              |
| <=     | 判断左操作数是否小于等于右操作数，如果大于返回 True，否则 False |              |
| and    | 逻辑与，只有条件都满足才返回 True                               |              |
| or     | 逻辑或，只要有一个条件满足就会返回 True                         |              |
| not    | 将结果进行取反                                                  |              |
| +=     | 将左操作数和右操作数相加再赋值给左边                            |              |
| -=     | 将左操作数和右操作数相减再赋值给左边                            |              |
| *=     | 将左操作数和右操作数相乘再赋值给左边                            |              |
| /=     | 将左操作数和右操作数相除再赋值给左边                            |              |
| //=    | 将左操作数和右操作数整除再赋值给左边                            |              |
| %=     | 将左操作数和右操作数取余再赋值给左边                            |              |
| **=    | 将左操作数和右操作数进行乘方再赋值给左边                        |              |

### 其他运算符

+ in：in会判断左操作数是否存在迭代元素中，存在则返回 True，否则 False
+ not in：判断左操作数是否在迭代元素中不存在，不存在则返回 True，否则 False
+ +：连接两个有序序列，`"hello" + "world"` = `"helloworld"`
+ *：将有序序列按照一定次数重复拼接，`"hello" * 3` = `"hellohellohello"`
+ []：切片操作符

## 流程控制

Python 中只有**顺序结构**，**分支结构**，**循环结构**这三种语句执行流程

### 条件分支

通过`if`关键字来定义，条件满足则执行缩进代码块中的语句

```python
age = int(input("请输入你的年龄："))
if age >= 18:
    print("你已经成年啦！")
```

通过 else 关键字与 if 匹配，如果 if 条件不满足，则执行 else 代码块中的语句，且 else 不需要判断条件

```python
age = int(input("请输入你的年龄："))
if age >= 18:
    print("你已经成年啦！")
else:
    print("你还没成年呢！")
```

如果想要每一个分支都判断条件，则使用 elif 关键字

```python
score = int(input("请输入你的分数："))
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

### 循环

while 常用于已知的循环次数

如果想要打印 5 遍：`hello,world!`，如果不用循环：

```python
print("hello,world!")
print("hello,world!")
print("hello,world!")
print("hello,world!")
print("hello,world!")
```

如果要打印 100 遍，还需要这个写法吗，而用 while 就可以这么写：

```python
i = 0
while i < 100:
   print("hello,world!")
   i = i + 1
```

循环一定要有终止条件，否则会导致死循环产生

::: tip 死循环
即开发人员忘记修改循环体内的判断条件，导致循环一直执行，程序无法终止
:::

for 常用于一些可迭代类型的循环遍历，比如字符串、列表、元组、字典等，常和 in 关键字搭配使用，并指明一个变量接受数据

```python
for 迭代变量 in 迭代对象:
    代码块
```

有时候不需要循环到一定次数才终止，所以需要手动终止循环，Python 提供了两种打断方式：

+ 当遇到`break`语句时，立即退出当前层循环，不继续下一次循环
+ 当遇到`continue`语句时，立即退出当前次循环，继续下一次循环
