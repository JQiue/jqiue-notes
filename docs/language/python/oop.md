---
title: 面向对象编程
category: 编程语言
tag: Python
author: JQiue
article: false
---

面向对象最重要的概念就是类和实例，Python 是一个完全面向对象的语言，自然支持类的定义，定义类的关键字是`class`，`class`后面紧跟着就是类名，类名符合标识符规范即可，但是通常是大写开头，每个类都有自己的属性和方法（[函数和方法的区别](/language/general/#函数和方法的区别)）

类本身是一个创建实例的模板，而实例才是真正能够操作的对象

```python
class Person:
  pass

p1 = Person()
```

上述例子中定义了 Person 类，并创建了 Person 的实例，p1 指向的是一个 Person 的实例，保存的是该实例的内存地址，一个实例通过`类名+()`创建，并且可以创建多个实例，每个实例的内存地址都不一样

属性可以通过`实例.属性名`来创建，本质上是一个属于实例的变量，必须在创建的时候初始化，否则会报 AttributeError

```python
p1.name = "张三"
p1.age = 23
print(p1.name) # "张三"
print(p1.age) # 23
```

既然类起一个模板作用，那么在创建实例的时候就可以将一些属性绑定上去

```python
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("张三", 21)
print(p1.name) # "张三"
print(p1.age) # 23
```

`__init__`是一个特殊方法，第一个参数`self`代表实例本身，因此在该方法中就可以绑定各种属性，当定义了这个函数时，在创建实例必须传入该方法匹配的函数

::: tip
在类中定义的方法，第一个参数永远都是实例变量`self`
:::

## 封装

面向对象特性之一就是不能通过外部方位实例的属性，上述例子中，仍然可以通过`实例.属性`的方式来从外界访问实例变量，但是只要将类中定义的变量名前加上`__`就可以让该变量变成私有变量，只能在内部访问

```python
class Person:
  def __init__(self, name, age):
    self.__name = name
    self.__age = age
st1 = Person("张三", 21)

print(st1.__name) # AttributeError
```

如果想要外界访问这些变量，应该提供一些方法暴露这些变量，因为这些方法是可以访问的

```python
class Person:
  ...
  def get_name(self):
    return self.__name

st1 = Person("张三", 21)
print(st1.get_name()) # 张三
```

同样的可以使用方法暴露一些修改变量的操作

```python
class Person:
  ...
  def set_name(self, name):
    self.__name = name

st1 = Person("张三", 21)
st1.set_name("张三丰")
print(st1.get_name()) # 张三丰
```

但是这样和直接暴露有什么区别？大可不必，我的方法我做主，在这个方法中写一些逻辑就可以保证数据的合法性

::: tip
封装即隐藏细节，仅对外公开相关的操作接口，控制在程序中属性的修改和读取
:::

## 继承和多态

继承和多态都是面向对象编程的特性之一

继承即可以从某个现有的类中继承，新的类叫做**子类**，被继承的类叫做**父类、超类、基类**

```python
class Person:
  def say(slef):
    print("I am a human")
```

假设有上述的`Person`类，需要`Student`和`Teacher`类，可以直接从`Person`中继承

```python
class Student(Person):
  pass

class Teacher(Person):
  pass
```

在定义的类的类名后面写上要继承的类名，此时`Student`和`Teacher`都是`Person`的子类，好处是都继承了`Person`的方法，当创建实例就可以调用父类的方法

但它们都打印`I am a human`，更符合逻辑的应该是分别显示`I am a student`和`I am a teacher`

```python
class Student(Person):
  def say(slef):
    print("I am a student")

class Teacher(Person):
  def say(slef):
    print("I am a teacher")
```

子类重新写了一遍 say 方法，叫做方法的重写，再次运行 say 方法的时候就会打印如下：

`I am a student`  
`I am a teacher`

当父类和子类存在相同的方法时，子类总会调用自己的方法，这就是**多态**

在继承关系中，一个子类的实例类型也可以是父类，可以通过内置函数`isinstance`来判断一个变量是否为某个类型

```python
s1 = Student()
t1 = Teacher()
print(isinstance(s1, Student)) # true
print(isinstance(t1, Person)) # true
print(isinstance(s1, Person)) # true
print(isinstance(t1, Person)) # true
```

在这个例子中 s1 和 t1 不但可以是自身的类型，也可以是父类的类型，但是反过来不行

```python
p = Person()
print(isinstance(p, Student)) # false
```

老师和学生都可以看作成人类，但是人类却不一定都是是老师和学生
