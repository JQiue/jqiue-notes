---
title: 基本语法
category: 编程语言
tag: Java
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

## 变量

变量必须有明确的数据类型，且必须先定义后使用，通过`=`赋值运算符赋值

```java
int i = 1;
```

`var`关键字可以省略变量类型，编译器会根据赋值语句自动推断出变量的数据类型

```java
var i = 1;
```

## 常量

在变量的基础上加上`final`修饰符，就变成了常量，常量名习惯大写

```java
final double PI = 3.14;
```

如果加上了`static`关键字就会变成类常量，可以在一个类中的多个方法中使用，但必须声明在方法外部

```java
public class ...{
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

### 基本类型

1. 整形：byte（1），short（2），int（4byte），long（8byte）
2. 浮点型：float（4），double（8）
3. 字符型：char
4. 布尔型：boolean

Java 的数据类型表示范围与运行 Java 的机器无关，不存在移植的过程中会产生溢出，所以移植性很好，比如 C 语言的 int 等类型的大小与目标平台有关，有可能是 4 字节，有可能是 8 字节

布尔值不会转换成整型，比如 C 语言中，1 代表 true，0 代表 false

### 引用类型

1. 字符串
2. 数组
3. 自定义类型
4. ...

### 类型检测

### 类型转换

如果操作数中有一个是 double 类型，结果就是 double 类型
如果操作数中有一个是 float 类型，结果就是 float 类型
如果操作数中有一个是 long 类型，结果就是 long 类型
否则都会被转换为 int 类型

也可以通过`(类型)`将一个操作数进行强制类型转换

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

### 顺序结构

Java 默认的执行结构，从上到下逐行逐句执行

### 分支结构

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

### 循环结构

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

表达式 1 通常用于初始化变量，可以省略，判断条件用于决定循环体是否执行，表达式 2 通常用于控制循环的终止条件，也可以省略。只保留两个;时，产生死循环

+ for in
+ for each

### 循环打断

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

## 方法

### 方法的定义

```text
修饰符 返回类型 方法名(参数列表){
  语句序列
  return 返回值
}
```

一般方法被声明成`public`，这样便于外部代码调用，如果设置为`private`则只能在内部调用

### 方法的返回值

`return`可以返回结果并立即结束方法的执行，这使得方法可以参与表达式运算

### 方法的参数

方法可以包含任意个参数，在调用方法时必须按照参数的定义传值

### 可变参数

也可以声明可变参数来适应不知道参数数量的情况，这样传入的参数都会保存在一个数组中

```java
void setName(String... names){}
```

可变参数无法传入`null`，因为它实际上是一个空数组

::: tip
当返回类型设置为`void`时，`return`可以省略
:::

### 构造方法

构造方法是一个特殊的方法，它只能通过`new`来调用，它没有返回类型，且方法名必须和类名相同，构造方法常用来在创建实例时同时初始化

```java
class Foo {
  Foo(){}
}
pubic class Main {
  public static void main(String[] args){
    Foo foo = new Foo();
  }
}
```

如果一个类没有声明构造方法，编译器会自动生成一个默认的构造方法

### 方法的重载

在一个类中，可以定义多个方法名相同的方法，但只有参数不同，编译器根据参数判断调用哪个方法，这种方式叫做方法的重载，方法重载的目的是为了解决功能类似的问题，便于记住方法名

```java
class Foo {
  String name;
  int age;
  Foo(){}
  Foo(String name, int age){
    this.name = name;
    this.age = age;
  }
}

public class Main {
  public static void main(String[] args){
    Foo one = new Foo();
    Foo two = new Foo("two", 2);
  }
}
```

### this 变量

在方法的内部有一个隐含的内部变量`this`，它始终指向当前实例

```java
class Foo(){
  String name = "one";
  public sayName(){
    String name = "two";
    System.out.prinltn(this.name); // one
  }
}
```

如果局部变量和类的字段重名，那么局部变量的优先级会更高，想要使用实例的字段必须加上`this`

## 数组

### 定义数组

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

### 访问元素

## 字符串

本质上是 Unicode 字符序列，比如`"Hello"`是由五个字符组成。在标准类库中提供了一个预定义的类`String`，每一个通过`""`括起来的字符串都是 String 类的一个实例

允许 + 号连接两个字符串，当一个字符串与一个非字符串的值进行拼接时将会被转换为字符串进行拼接

也可以修改字符串变量的引用，但字符串本身是不可修改的，应该提取需要的字符在拼接上替换的字符串来修改

`equlas()`方法可以检测两个字符串是否相等，`equlasIgnoreCase()`方法是不区分大小写的

不应该使用`==`检测字符串是否相等，因为这个运算符只能比较两个字符串之间的引用是否相等

空串表示长度为`0`的字符串，通过字符串对象的`length()`方法返回

字符串变量也可以存放特殊值`null`，表示这个变量没有和任何对象进行关联

### String API

+ char charAt(int index)：返回指定位置的字符
+ int codePointAt(int index)：返回指定位置字符的 ASCII 码
+ boolean equals(Object obj)：比较字符串是否相等
+ boolean startsWith(String str)/endWith(String str)：以 suffix 开头或结尾，则返回 true
+ int indexOf(String str)：返回匹配到的第一个子串的开始位置，不存在则返回 -1
+ lastIndexOf(String str)：返回匹配到的最后一个子串的开始位置，不存在则返回 -1
+ int length()：返回字符串长度
+ String replace(String oldString, String newString)：替换原始字符串中的 oldString，并返回新的字符串
+ String substring(int beginIndex, int endIndex)：从指定位置开始截取字符串返回
+ String toLowerCase()：将大写字母改为小写并返回
+ String toUpperCase()：将小写字符改为大写并返回
+ String trim()：返回删除了头部和尾部空格的字符串
+ String String.join(CharSequence delimiter, elements)：通过分隔符连接数组或集合返回

::: tip
CharSequence 是一种接口类型，所有的字符串接口都属于这个接口
:::

String 类包含了很多方法，但是在标准库中有几千个类，方法数量更是惊人，所以记住所有的类和方法是不可能的，学会查询 API 文档十分有用

### StringBuilder 和 StringBuffer

有时候需要由较短的字符串构建，比如来自按键或者文件中的单词，采用字符串连接的方式效率比较低，每次连接字符串都会构建一个新的字符串对象，即耗时，又浪费空间，而使用 StringBuilder 类就可以避免这个问题

```java
StringBuilder builder = new StringBuilder();
builder.append(str);
builder.append(ch);
builder.toSring();
```

通过 StringBuilder 类构建一个空的字符串构造器，当需要添加内容时就调用`append()`方法，在需要构建字符串时就调用`toString()`方法

在 5.0 版本中引入了 StringBuilder 类，前身是 StringBuffer，它的效率有点低，但允许多线程的方式进行字符串的编辑，如果字符串都在单线程中编辑，则应该使用 StringBuilder 替代，他们的 API 都是相同的

+ int length()
+ append(str)
+ insert(offset, str)
+ delete(offset, str)
+ toString()

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
