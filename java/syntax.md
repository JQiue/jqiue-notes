---
title: 基本语法
category: 编程语言
tag: [Java]
article: false
order: 1
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

## 变量

变量必须有明确的数据类型，且必须先定义后使用，通过`=`赋值运算符赋值

```java
int i = 1;
```

`var`关键字可以省略变量类型，编译器会根据赋值语句自动推断出变量的数据类型

```java
var i = 1;
```

在变量的基础上加上`final`修饰符，变量就只能被读取而不能改写，习惯大写

```java
final double PI = 3.14;
```

如果加上了`static`关键字就会变成类变量，可以在一个类中的多个方法中使用，但必须声明在方法外部

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

Java 有 8 种基本数据类型

+ 整形：byte（1），short（2），int（4byte），long（8byte）
+ 浮点型：float（4），double（8）
+ 字符型：char
+ 布尔型：boolean

Java 的数据类型表示范围与运行 Java 的机器无关，不存在移植的过程中会产生溢出，所以移植性很好。比如 C 语言的 int 等类型的大小与目标平台有关，有可能是 4 字节，有可能是 8 字节

### 类型转换

+ 如果操作数中有一个是 double ，结果就是 double
+ 如果操作数中有一个是 float，结果就是 float
+ 如果操作数中有一个是 long，结果就是 long
+ 否则都会被转换为 int 类型

也可以通过`(type)`将一个操作数进行强制类型转换

```java
int i = 123;
short s = (short) i;
int p = (int) 3.14; // 3，失去精度
```

布尔值不会转换成整型，比如 C 语言中，1 代表 true，0 代表 false

## 运算符

### 常见运算符

\+ | 加法
\- | 减法
\* | 乘法
/ | 除法
% | 取余

### 其他操作符

Java 也提供了三元运算符`b ? x : y`，根据表达式`b`的结果，返回`x`或`y`表达式计算后的结果

## 流程控制

### 条件分支

通过`if`关键字来定义，条件满足则执行代码块中的语句

```java
int age = 18;
if (age >= 18) {
  System.out.println("你已经成年啦！");
}
```

::: tip
当省略`{}`时，`if`只会决定紧跟后面的一条语句是否执行
:::

`if`也可以包含一个可选的`case`块，如果条件不成立，就会执行`case`代码块中的语句

```java
int age = 16;
if (age >= 18){
  System.out.println("你已经成年啦！");
} else {
  System.out.println("你还没成年呢！");
}
```

在这个基础上还能使用`else if`产生更多的条件分支

```java
int score = 80;
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

### 循环

`while`常用于已知的循环次数

```java
int i = 0;
while (i < 100) {
  System.out.println("hello,world!");
  i++;
}
```

`do while`会先执行一次才会判断条件是否继续执行

```java
int i = 0;
do {
  System.out.println("hello,world!");
  i++;
} while (i < 10);
```

`for`常用于循环次数不确定的情况

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

有时候不需要循环到一定次数才终止，需要手动终止循环，Java 提供了两种打断方式：

+ 用于循环和`switch`，当遇到`break`语句时，立即退出离`break`语句最近的一层循环，不继续下一次循环
+ 只能用于循环，当遇到`continue`语句时，立即退出当前次循环，继续下一次循环

带标签的`break`

### switch

相对于`if`语句来说，`switch`可以更方便的控制多个分支的流程控制，不过和`if`不同的是，`switch`语句必须精确的匹配一个正确的值才能执行相应的`case`，而且会从当前`case`一直执行下去，所以需要给每个`case`添加`break`语句来打断后续的执行

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

## 函数

函数的定义如下：

```java
type name(args) {
  // 代码
}
```

也可以声明可变参数来适应不知道参数数量的情况，这样传入的参数都会保存在一个数组中，可变参数无法传入`null`，因为它实际上是一个空数组

```java
void setName(String... names){}
```

::: tip
当返回类型设置为`void`时，`return`可以省略
:::

### Lambda

Lambda 表达式使用最小可能语法编写的函数定义

```java
(parameters) -> expression
(parameters) -> { statements; }
```

函数式接口

```java
interface MyInterface {
  void doSomething();
}

MyInterface myInterface = () -> {
  System.out.println("Do something");
};

myInterface.doSomething();
```

在集合中使用，使用`::`运算符可以传递一个方法的引用

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
// 使用 Lambda 表达式对集合中的每个元素进行平方操作
numbers.stream().map(n -> n * n).forEach(System.out::println);
// 使用 Lambda 表达式过滤出集合中的偶数
numbers.stream().filter(n -> n % 2 == 0).forEach(System.out::println);
```

<!-- todo -->
