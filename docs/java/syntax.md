---
title: 基本语法
category: 编程语言
tags: [Java]
author: JQiue
article: false
---

这里是 Java 的基本语法规则

## 注释

```java
// 单行注释

/*
多行注释
多行注释
多行注释
*/

/**
 * 文档注释
 * 每一行以 * 开头
 * 需要写在类和方法的定义处
 * 用于自动创建文档
 * /
```

## 代码块和语句

Java 采用`{}`区分代码之间的层次，每条语句必须以分号`;`结束

## 标识符

+ 由英文字母，数字和下划线组成，但第一个字符不能是数字
+ 不能是 Java 中的关键字和保留字
+ 区分大小写

## 变量和常量

变量必须有明确的数据类型，且必须先定义后使用，通过`=`赋值运算符赋值

```java
int i = 1;
```

`var`关键字可以省略变量类型，编译器会根据赋值语句自动推断出变量的数据类型

```java
var i = 1;
```

在变量的基础上加上`final`修饰符，就变成了常量，常量名习惯大写

```java
final double PI = 3.14;
```

如果加上了`static`关键字就会变成类常量，可以在一个类中的多个方法中使用，但必须声明在方法外部

```java
public class ClassName{
  static final double PI = 3.14;
  public static void prinPI(){
    System.out.println(PI);
  }
  public static void main(String[] args){
    System.out.println(PI);
  }
}
```

如果在这个基础上增加`public`关键字，其他类也能够访问该常量

## 数据类型

Java 


+ 整形：byte（1），short（2），int（4byte），long（8byte）
+ 浮点型：float（4），double（8）
+ 字符型：char
+ 布尔型：boolean
+ 字符串
+ 数组
+ 自定义类型

Java 的数据类型表示范围与运行 Java 的机器无关，不存在移植的过程中会产生溢出，所以移植性很好，比如 C 语言的 int 等类型的大小与目标平台有关，有可能是 4 字节，有可能是 8 字节

布尔值不会转换成整型，比如 C 语言中，1 代表 true，0 代表 false

### 类型检测

### 类型转换

+ 如果操作数中有一个是 double 类型，结果就是 double 类型
+ 如果操作数中有一个是 float 类型，结果就是 float 类型
+ 如果操作数中有一个是 long 类型，结果就是 long 类型
+ 否则都会被转换为 int 类型

也可以通过`(type)`将一个操作数进行强制类型转换

```java
int i = 123;
short s = (short) i;
int p = (int) 3.14; // 3，失去精度
```

## 运算符

### 常见运算符

### 其他操作符

### 三元运算符

Java 也提供了三元运算符`b?x:y`，根据表达式`b`的结果，返回`x`或`y`表达式计算后的结果

## 流程控制

Java 默认的执行结构是从上到下逐行逐句执行

### 条件分支

+ 单分支：通过`if`关键字来定义，条件满足则执行代码块中的语句

```java
if (age >= 18){
  System.out.println("你已经成年啦！");
}
```

+ 双分支：通过`else`关键字与`if`匹配，如果`if`条件不满足，则执行`else`代码中的语句，`else`不需要判断条件

```java
if (age >= 18){
  System.out.println("你已经成年啦！");
} else {
  System.out.println("你还没成年呢！");
}
```

+ 多分支：如果需要更复杂的逻辑判断，可以使用多重`if else`实现

```java
if (score >= 90){
  System.out.println("优秀");
} else if (score >= 80){
  System.out.println("良好");
} else if (score >= 60){
  System.out.println("及格");
} else {
  System.out.println("不及格");
}
```

+ `switch`：相对于`if`语句来说，`switch`可以更方便的控制多个分支的流程控制，不过和`if`不同的是，`switch`语句必须精确的匹配一个正确的值才能执行相应的`case`，而且会从当前`case`一直执行下去，所以需要给每个`case`添加`break`语句来打断后续的执行

```java
switch (week){
  case 1:
    System.out.println("星期一");
    break;
  case 2:
    System.out.println("星期二");
    break;
  case 3:
    System.out.println("星期三");
    break;
  case 4:
    System.out.println("星期四");
    break;
  case 5:
    System.out.println("星期五");
    break;
  case 6:
    System.out.println("星期六");
    break;
  case 7:
    System.out.println("星期天");
    break;
  default:
    System.out.println("error");
}
```

### 循环

+ while：常用于已知的循环次数

```java
int i = 0;
while (i < 100) {
  System.out.println("hello,world!");
  i++;
}
```

+ do while：会先执行一次才会判断条件是否继续执行

```java
int i = 0;
do {
  System.out.println("hello,world!");
  i++;
} while (i < 10);
```

+ for：常用于循环次数不确定的情况

```java
for (表达式 1;判断条件;表达式 2){
  // code
}
```

执行流程：

1. 执行表达式 1，并且只会被执行一次
2. 判断条件是否为真
3. 为真则执行代码块中的代码，然后执行表达式 2，重复 2 - 3 步的操作
4. 为假则立即结束整个循环

表达式 1 通常用于初始化变量，可以省略，判断条件用于决定循环体是否执行，表达式 2 通常用于控制循环的终止条件，也可以省略。只保留两个`;`时，产生死循环

+ for in
+ for each

有时候不需要循环到一定次数才终止，需要手动终止循环，C 语言提供了两种打断方式：

+ 用于循环和`switch`，当遇到`break`语句时，立即退出离`break`语句最近的一层循环，不继续下一次循环
+ 只能用于循环，当遇到`continue`语句时，立即退出当前次循环，继续下一次循环

带标签的`break`

## 类

### 类的定义

Java 通过关键字`class`来定义类，而`{}`是对类的定义

```java
class ClassName {}
```

这是对该类的变量和方法的定义，这种定义在方法外的变量叫做全局变量，能被该类所有的方法访问

```java
class ClassName {
  int foo;
  void sayHello (){}
}
```

### 类的实例化

类必须手动通过`new`关键字例化后才能使用，这样会产生一个该类型的对象引用

```java
ClassName cn = new ClassName();
```

::: tip
只有主方法所在的类是例外，因为它被虚拟机实例化
:::

## 数组

java 数组是同一类型的集合，一旦创建大小就不可变

```java
int[] array = new int[5];
```

数组所有的元素初始化为默认值，整形都是`0`，浮点型是`0.0`，布尔型是`false`

也可以在定义数组时指定初始化元素，这样就不必写出数组大小

```java
int[] array = new int[]{1, 2, 3, 4, 5};
```

还可以进一步简写成

```java
int[] array = {1, 2, 3};
```

## 输入和输出

`System.out.println()`会将信息打印在控制台上并换行，而`System.out.printf()`则不会缓缓

如果想要通过控制台输入，就必须构造`Scanner`对象，同时与标准输入流`System.in`关联

```java
Scanner sc = new Scanner(System.in);
```

现在就可以通过`Scanner`类的各种方法来实现输入操作

+ next()
+ nextLine()
+ nextInt()
+ nextFloat()
+ nextBoolean()

`Scanner`类定义在`java.util`包中，当使用的类不是定义在基本的`java.lang`包中时，必须使用`import`关键字将包导入

### 格式化输出

Java 沿用了 C 语言库函数中的`printf()`，因此可以通过格式占位符来控制输出的格式

### 文件的输入与输出

Scanner 也可以读取文件，需要用 File 类将一个文件构造成 Scanner 对象，这样就可以将文本中所有的内容加载到

```java
Scanner sc = new Scanner(Paths.get("text.txt"), "UTF-8");
```

值得一提的是，这个操作必须处理异常，否则无法通过编译
