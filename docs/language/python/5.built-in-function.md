---
title: 内置函数
category: 编程语言
tag: Python
author: JQiue
article: false
---

Python 有很多内置函数供调用

## input

通过 input() 函数来输入数据，这样就可以手动来输入数据了，而不是写死数据，当运行到该函数时，会等待用户输入数据完毕才会执行其他的语句，同时也可提供字符串来作为输入的提示信息，该函数的返回值即用户输入的数据

```python
input()
input("请输入密码：")
```

::: danger
input() 函数只能得到字符串
:::

## print

通过 print() 函数来输出数据

### 输出函数的格式化

有时候我们可能需要输出文字信息的同时，也将数据一起输出，这就需要**格式化控制符**，包含`%`的字符串，被称为格式化字符串，不同的类型要使用不同的格式化控制符

格式化字符|含义
---|---
%s|字符串
%d|整型，%06d 表示输出的整数位数，不足则用 0 补充
%f|浮点型，%.2f 表示小数点只留两位
%%|输出%

```python
name = "wjq"
age = 22
height = 17.3
print("%s" % name)
print("%d" % age)
print("%f" % height)
print("%s%d%f" % (name, age, height)) # 可以同时输出多个变量
```

::: tip
这里的(name, age, height)本质上是元组类型
:::

## 类型检测

### type

type 函数用于返回对象的类型

```python
print(type(1))    # <class 'int'>
print(type(1.1))  # <class 'float'>
print(type("1"))  # <class 'str'>
print(type(True)) # <class 'bool'>
print(type([]))  # <class 'list'>
print(type(()))  # <class 'tuple'>
print(type({}))  # <class 'dict'>
print(type({1,})) # <class 'set'>
```

### isinstance

isinstance 函数用于判断一个对象是否为另一个已知的类型，可以是 Python 定义的，也可是通过 class 定义的类

```python
print(isinstance(1, int)) # true
print(isinstance(1.1, float)) # true
print(isinstance("1", str)) # true
print(isinstance(True, bool)) # true
print(isinstance([], list)) # true
```

### type 和 isinstance 的不同

```python
class Person:
  def say(slef):
    print("I am a human")

class Student(Person):
  pass

print(type(Student()) == Student) # true
print(type(Student()) == Person) # false
print(isinstance(Student(), Student)) # true
print(isinstance(Student(), Person)) # true
```

结论可知，type 不会考虑该类型的继承关系，而 isinstance 则会将子类认为父类的类型，会考虑继承关系

## 类型转换

1. int：转换为整型
2. float：转换为浮点型
3. str：转换为字符串类型
4. list：将元组转换为列表
5. turple：将列表转换为元组
6. dict：创建一个字典，可以将可迭代对象转换为字典
7. set：将一个序列转换为集合
8. eval：接受一个字符串表达式，并返回表达式的值

## 算术类

1. max：返回参数的最大值，可以是序列
2. min：返回参数的最小值，可以是序列
3. sum：对序列进行求和
4. divmod：返回一个包含商（整除）和余数的元组
5. pow：返回 x 的 y 次方

## 其他

1. sorted：对可迭代对象进行排序，并返回一个列表
2. id：返回对象的地址
3. range：生成一个整数列表
4. len：返回对象的长度

## filter

filter 用于过滤不符合条件的元素，并返回符合条件的元素组成的列表，filter 第一个参数为函数，第二个参数为迭代类型，每一个元素都会传入函数中进行判断，返回 True 或 False，将返回 True 的元素放入新列表中

```python
f = filter(lambda x: x > 10, [6, 5, 23, 43, 15])
print([i for i in f]) # [23, 43, 15]
```

::: warning
在 Python 2 中 filter 返回的是列表，而 Python 3 中返回的是 filter 类，可以被迭代
:::
