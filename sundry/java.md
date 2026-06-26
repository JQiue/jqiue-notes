---
title: Java
category: 编程语言
tag: [Java]
article: false
---

由詹姆斯高斯林在 90 年代初开发的一种编程语言，Java 介于编译型和解释性语言之间，因为 Java 是将代码编译成一种“字节码”，然后针对不同的平台编写虚拟机，不同的虚拟机负责解释字节码并执行，这样就实现了“一次编写，到处运行”，这意味着 Java 是跨平台的，不过如今非常鸡肋，因为别的语言也能跨平台了

随着 Java 的发展，Java 又分出了三个不同的平台版本：

+ Java SE - Standard Edition
+ Java EE - Enterprise Edition
+ Java ME - Micro Edition

简单来说 Java SE 就是标准版，而 Java EE 是企业版，只是在 SE 的基础上增加了大量的 API 和库，以便于开发 Web 应用，数据库，消息服务等。而 ME 相当于 SE 的瘦身版，一些 SE 的标准库无法在 ME 上使用，它是一个针对于嵌入式设备的版本，因此没有特别需求，不建议学习 Java ME

无论怎么选择，Java SE 的核心技术就是基础

## 版本

从 1995 年发布 1.0 开始，到目前为止，最新的 Java 版本是 Java 15：

| 时间   | 版本      |
| ------ | --------- |
| 1995   | 1.0       |
| 2011   | 1.7 / 7.0 |
| 2014   | 1.8 / 8.0 |
| 2017/9 | 1.9 / 9.0 |
| 2018/3 | 10        |
| 2018/9 | 11        |
| 2019/3 | 12        |
| 2019/9 | 13        |
| 2020/3 | 14        |
| 2020/9 | 15        |

Java 有不同的发行商版本

| 发行版   | 厂商          |
| -------- | ------------- |
| Zulu     | Azul          |
| Liberica | Bell Software |

## 配置环境

推荐 [Liberica](https://bell-sw.com/pages/downloads/#/java-11-lts) 实现，无脑下一步就完事了，这个实现是自动配置环境变量的，无需再找一些七七八八的教程配置

初学者学习 Java，经常听到 JDK、JRE 这些名词

+ JDK - Java Development
+ JRE - Java Runtime Environment

JRE 是运行 Java 字节码的虚拟机，但是需要 JDK 将 Java 源码编译成 Java 字节码，因此 JDK 除了包含 JRE、还提供了编译器，调试器等工具

## 第一个 Java 程序

无论如何，在一个 Java 源代码文件中中总是能找到一个类似这样的定义：

```java
public class ClassName {}
```

这个定义被称为 class（类），类名是`ClassName`，按照习惯，类名和文件名相同，且首字母大写

在类的定义中，有个类似这样的定义：

```java
public class ClassName {
  public static void main(String[] args){}
}
```

这是类中的方法，`main`是方法名，`{}`用来编写语句，Java 规定，某个类定义的`public static void main(String[], args)`是 Java 程序的固定入口

::: tip
从 1.4 及以后的版本中强制了`main`方法必须声明为`public`
:::

Java 中所有的函数都属于某个类的方法，在标准术语中称为成员方法，而不是成员函数

Java 强制每个文件都必须有一个类，且其他东西都定义在类中，所以这就是 Java 看起来非常啰嗦的原因：

```java
public class HelloWorld {
  public static void main(String args[]) {
    System.out.println("hello, world");
  }
}
```

Java 源码本质上是一个文本文件，需要先用`javac`将保存好的 Java 文件编译成字节码文件，会自动生成后缀名为`.class`字节码文件，然后使用`java`命令执行这个字节码文件

::: tip
在 Java 11 版本以后可以直接使用`java`命令执行源码文件，但在实际中的项目中不建议使用
:::

## 基本语法

这里是 Java 的基本语法规则

### 注释

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

### 代码块和语句

Java 采用`{}`区分代码之间的层次，每条语句必须以分号`;`结束

### 标识符

+ 由英文字母，数字和下划线组成，但第一个字符不能是数字
+ 不能是 Java 中的关键字和保留字
+ 区分大小写

### 变量

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

### 数据类型

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

### 运算符

### 常见运算符

\+ | 加法
\- | 减法
\* | 乘法
/ | 除法
% | 取余

### 其他操作符

Java 也提供了三元运算符`b ? x : y`，根据表达式`b`的结果，返回`x`或`y`表达式计算后的结果

### 流程控制

#### 条件分支

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

#### 循环

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

#### switch

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

### 函数

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

#### Lambda

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

## 数据结构

### 数组

数组是同一类型的集合，一旦创建大小就不可变

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

### 字符串

字符串本质上是 Unicode 字符序列，比如`"Hello"`是由五个字符组成。在标准类库中提供了一个预定义的类`String`，每一个通过`""`括起来的字符串都是 String 类的一个实例

允许 + 号连接两个字符串，当一个字符串与一个非字符串的值进行拼接时将会被转换为字符串进行拼接

也可以修改字符串变量的引用，但字符串本身是不可修改的，应该提取需要的字符在拼接上替换的字符串来修改

`equlas()`方法可以检测两个字符串是否相等，`equlasIgnoreCase()`方法是不区分大小写的

不应该使用`==`检测字符串是否相等，因为这个运算符只能比较两个字符串之间的引用是否相等

空串表示长度为`0`的字符串，通过字符串对象的`length()`方法返回

字符串变量也可以存放特殊值`null`，表示这个变量没有和任何对象进行关联

#### StringBuilder 和 StringBuffer

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

#### String API

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

### 集合

集合只能存储引用数据类型，存储基本类型会自动装箱，集合长度可以随着元素的增长而增长，这是它和数组的区别

所有类型的集合继承`Collection`接口

#### List

List 是存储有序的，可以重复的元素，List 在 Collection 基础上的方法：

+ `void add(int index, E element)`
+ `E remove(int index)`
+ `E get(int index)`
+ `E set(int index, E element)`

#### ArrayList

ArrayList 是数组实现的，查询快，增删慢，具有以下自身方法：

+ `boolean add(E)` 一定是 true
+ `clear()` 清空集合中的元素
+ `contains()` 判断是否包含该元素
+ `boolean isEmpty()` 判断是否为空，空则为 true
+ `int size()` 返回元素个数
+ `Object[] toArray()` 将集合转换成数组，打印时需要向下转型
+ `addAll(collection c)`将整个集合当成一个对象添加到集合中
+ `containsAll(collection c)`判断调用的集合是否包含传入的集合
+ `removeAll(collection c)`删除两个集合中的交集，没有交集则返回 false
+ `retainsAll(collection c)`获取集合中的交集，调用的集合改变则返回 true,否则返回 false，具体看调用集合的值调用完后是否和调用前一样

#### LinkedList

LinkedList 可以被用作栈，队列，增删快，查询慢，：

+ `addFirst(E)` - 添加元素到头部
+ `addLast(E)` - 添加元素到尾部
+ `removeFirst()` - 移除头部元素并返回
+ `removeLast()` - 移除尾部元素并返回

#### Queue

<!-- todo -->

#### Map

<!-- todo -->

#### Set

Set 是存储无序的，不可以重复的元素，也有多种实现，都继承 Set 接口，本身有自己的的实现方法：

+ boolean add(E e);
+ boolean addAll(Collection<? extends E> c);
+ boolean remove(Object o);
+ boolean removeAll(Collection<?> c);
+ void clear();
+ size()
+ boolean isEmpty();
+ boolean contains(Object o);
+ boolean containsAll(Collection<?> c);
+ boolean retainAll(Collection<?> c);
+ boolean equals(Object o);
+ int hashCode();

HashSet 是用哈希表实现的，不能通过类似角标的方式获取元素

LinkedHashSet 是用链表实现的，是 Set 集合中唯一一个能够保证怎么存就怎么取出的集合

TreeSet 是用二叉树实现的，于 HashSet 不同的是，TreeSet 具有排序功能

### Vector

Vector 是由数组实现的一个类似动态数组的功能

<!-- todo -->

### 迭代器

可以用来迭代集合中的元素，集合需要调用返回迭代器对象的方法。每个集合内部存储结构是不同的，因此在每个集合中实现`hasNext()`和`Next()`方法是臃肿的，迭代器是将这样的方法向上抽取接口，然后在每个集合内部实现自己定义的迭代方式，就能规定所有的集合遵守实现`hasNext()`和`Next()`方法

```java
HashSet a = new HashSet();
a.iterator();

while(a.hasNext()) {
  a.next()
}
```

## 类

Java 是一种强制性对象风格编程的语言，几乎任何东西都定义在类中

### 对象

`String s;`只是创建了一个 String 对象的引用，而非对象，直接使用时会报错，因为该引用没有指向任何对象，所以最好在创建对象的同时初始化变量

```java
String s = "Hello, World";
```

“引用”用来关联对象，Java 中通常使用`new`关键字来创建一个该类型的对象，必须手动通过`new`实例化后才能使用，这样会产生一个该类型的对象引用

```java
String s = new String("Hello, World");
```

::: tip
只有主方法所在的类是例外，因为它被虚拟机实例化
:::

除了 String 类型以外，Java 本身自带了很多数据类型

```java
Character c = new Character('c');
```

一个对象如果没有被引用时就会被当作垃圾回收掉，打印一个对象会得到`包名.类名@十六进制的 hashcode`

使用`==`比较对象时，比较的是地址

### class

`class`关键字定义类，该类中只能存放两种元素：字段和方法，字段类型可以是基本类型，也可以是引用类型

```java
class Demo {
  int a;
  String s;
}
```

必须实例化后才能访问字段

```java
Demo d = new Demo();
d.a = 1;
d.s = "Demo";
```

::: tip
如果字段没有被初始化，则在实例化时会赋予默认的初始值
:::

方法也是类的一种

```java
class Demo {
  public String name() {
    return "Demo";
  }
}
```

### 构造器

必须使用`new`关键字调用构造器，构造器的名字和类名必须相同，它没有返回类型：

```java
class Demo {
  Demo(int a){
    System.out.println(a);
  }
}

// 调用一次构造器方法
Demo d = new Demo(1);
```

如果没有显式创建构造器，编译器会自动创建一个无参的构造器方法，如果显示的定义了构造器则不会创建

### 静态字段和静态方法

静态字段和静态方法是用`static`修饰的，会被所有的的实例所共享。虽然可以通过`实例变量.静态字段/静态方法`访问，但它们并不属于实例，只是因为编译器可以根据实例类型自动转换为`类名.静态字段/静态方法`，所以推荐用类名来访问它们。静态字段和静态方法都是与此类对象无关的

```java
class Demo {
  static int a = 1;
}

Demo.a;
```

使用`static`修饰的字段和方法会的生命周期会持续到程序结束

### 访问权限

Java 有三个显式关键字来设置类中的访问权限，这些访问修饰符决定了谁能使用它们修饰的方法、变量或类：

+ public（公开）表示任何人都可以访问和使用该元素
+ private（私有）除了类本身和类内部的方法，外界无法直接访问该元素。private
是类和调用者之间的屏障。任何试图访问私有成员的行为都会报编译时错误
+ protected（受保护）类似于 private，区别是子类（下一节就会引入继承的概念）
可以访问 protected 的成员，但不能访问 private 成员
+ default（默认）如果你不使用前面的三者，默认就是 default 访问权限。default
被称为包访问，因为该权限下的资源可以被同一包（库组件）中其他类的成员访
问

### 继承

Java 通过`extends`关键字实现继承

```java
class Person {
  String name;
  int age;
  public void showMe(){
    System.out.println("I'm" + name + ", My age is " + age);
  }
}

class Student extends Person {
  int score;
  public void showMe() {}
}
```

Student 会获得 Person 的所有属性和方法，也拥有自己的属性和方法

继承不能获得父类中包含`private`关键字的属性和方法，这使继承的作用被削弱了，但 Java 提供了`protected`关键字来使字段或属性能够被子类所访问

```java
class Person {
  protected String name;
  protected int age;
}
class Student extends Person {
  int score;
  public void showMe(){
    System.out.println("I'm " + name + ", My age is " + age);
  }
}
```

`protected`关键字会把属性和方法的访问权限控制在一个继承树上，也就是子类的子类都可以访问

### 重载和覆盖

Java 允许多个方法名相同，但参数不同的方法，叫做方法的重载

```java
class Demo {
  Demo() {}
  Demo(int a) {}
  Demo(String s) {}
}
```

每一个被重载的方法都有一个独一无二的参数列表，因此 Java 可以根据参数的不同来区分调用哪个方法

在继承的关系中，子类的方法可以覆盖父类的方法实现功能覆盖，又被称为方法的覆盖（override）

```java
class Person {
  public void show() {
    System.out.println("Person show");
  }
}

class Student extends Person {
  public void show() {
    System.out.println("Student show");
  }
}
```

### this

每一个非静态方法中都有一个隐藏的参数`this`用来表示当前调用该方法的实例对象

```java
class Demo {
  int a;
  Demo(int a) {
    this.a = a;  
  }
}

Demo d = new Demo(1);
```

通过`this`也能在一个构造器中调用另一个构造器，但是必须在所有代码前先执行

```java
class Demo {
  int a = 1;
  Demo() {
    System.out.println("无参构造器被调用了");
  }
  Demo(int i) {
    this();
    System.out.println(i);
  }
}
```

`this`在静态方法中是不存在的，因为静态方法是为类创建的，而不是对象

### super

`super`关键字用来表示父类

```java
class Student extends Person {
  public void shoeMe(){
    System.out.println(super.name);
  }
}
```

在这种情况下，使用`super.name`，`this.name`，`name`效果都是一样的

但是在某些情况下必须使用`super`关键字，比如下面这个情况：

```java
class Person {
  protected String name;
  protected int age;
  public Person (String name, int age){
      this.name = name;
      this.age = age;
  }
}

class Student extends Person {
    int score;
    public void showMe() {
        System.out.println("I'm " + name + ", My age is " + age);
    }
}
```

编译器会报：`constructor Person in class Person cannot be applied to given types;`

这是因为在任何类的构造方法中，第一行语句必须先调用父类的构造方法，如果没有明确声明`super()`，编译器会自动加上，然而在这里代码中，父类的构造方法是有参的，所以会报错

在子类的构造方法中手动调用有参构造方法，或者在父类中声明无参构造的方法进行重载避免这种问题

```java
class Student extends Person {
    int score;
    public Student (String name, int age){
      super(name, age)
    }
    public void showMe() {
        System.out.println("I'm " + name + ", My age is " + age);
    }
}
```

或

```java
class Person {
  protected String name;
  protected int age;
  pubilc Person(){}
  public Person (String name, int age){
      this.name = name;
      this.age = age;
  }
}
```

::: caution
子类不会继承父类的构造方法
:::

### 转型

在继承的基础上，可以使用子类的实例初始化父类

```java
class Person {
    protected String name;
    protected int age;
    public void a() {
        System.out.println("I'm method of Person");
    }
}

class Student extends Person {
    int score;
}

public class Main {
    public static void main(String[] args){
        Person p = new Student();  // 向上转型
        p.a();
    }
}
```

当向上转型时，父类只能够调用父类的字段和父类的方法或者子类覆盖后的方法，无法调用子类中的方法

将父类类型转换为子类类型就是向下转型

```java
Person p1 = new Student();
Person p2 = new Person();
Student s1 = (Student)p1;
Student s2 = (Student)p2; // error
```

前提是已经是向上转型的状态才能向下转型，否则就会失败，因为子类的功能比父类多，所以不能够直接将父类实例转换为子类

为了避免向下转型出错，Java 提供了`instanceof`来判断一个实例是否为某个类型

```java
Person p = new Person();
p instanceof Person; // true
p instanceof Student; // false

Student s = new Student();
s instanceof Person; // true
s instanceof Student; // true
```

`instanceof`会判断一个变量所指的实例是否为指定类型，或者是该类型的子类，如果为 null，那么判断都为 false

### 组合和聚合

### 单继承结构

### 封装

如果字段被声明了`private`，它就不能被外界所访问，但是可以提供方法间接访问

```java
public class Foo {
  private String name;
  public String getName(){
    return name;
  }
  public void setName(String name){
    this.name = name;
  }
}
```

对于私有属性，不仅要提供访问的方法，也应该提供修改的方法

### Object

任何类都会继承某一个类，如果没有明确的写出`extends`的类，那么会继承`Object`类，Java 只允许一个类继承一个类，除了`Object`，因为它是最顶层的类

因为所有的类都是 Object 的子类，而`Object`自身定义了几个很重要的方法：

+ `toString()`：把实例输出成`String`
+ `equals()`：比较两个实例是否相等
+ `hashCode()`：返回实例的哈希值

```java
class Person {
  protected String name;
  public String toString(){
    return "Person：name = " + name;
  }

  public boolean equals(Object o){
    if(o instanceof Person){
      return this.getClass().getName().equals(o.getClass().getName());
    }
    return false
  }

  public int hashCode(){
    return this.name.hashCdoe();
  }
}
```

### 多态

Java 的实例方法是基于运行时的实际类型的动态调用，而并非是变量的声明类型

```java
public class Main {
  public static void main(String args[]){
    Person p = new Student();
    p.show(); // Student show
  }
}
```

即使向上转型，实际上并不会调用父类的方法，这种特征称为多态

多态的特征是只有在运行时才能决定调用的子类方法，它可能是子类的覆盖方法

多态最大的好处就是允许添加更多类型的子类实现功能的扩展，而不需要改变父类的代码

### final

final 可以作用于类、方法和变量

+ final 修饰的类无法被继承
+ final 修饰的方法无法重写
+ final 修饰的字段必须在实例化时初始化

### 抽象类

如果父类的方法本身不需要实现任何功能，仅仅是定义方法名，目的是让子类覆写，那么就可以将方法声明为抽象方法

```java
class Person {
  public abstract void show();
}
```

因为抽象方法无法执行，所在的类也无法被实例化，因此包含抽象方法的类也必须被声明抽象的类

```java
abstract class Person {
  public abstract void show();
}
````

抽象类本身被设计成只能用于继承，就必须强迫子类覆写其定义的抽象方法，否则无法编译通过

```java
abstract class Person {
  public abstract void show();
}

class Student {
  public void show(){}
}
```

### 面向抽象

抽象类也可以引用子类实例

```java
Person s = new Student();
```

好处是并不需要关心父类变量的具体子类型，这种尽量引用高层类型，避免引用实际子类型的方式叫做面向抽象编程

面向抽象编程的本质：

+ 上层只定义规范
+ 不需要子类就可以实现业务逻辑
+ 具体的业务逻辑由不同的子类实现

### 内部类

### 包装类

## 接口

抽象类中，抽象方法本质上是定义接口规范，如果一个类没有字段，所有的方法都是抽象方法，那么就可以将该抽象类改写为接口，用`interface`声明

```java
interface Person {
  void show();
}
```

接口比抽象类还要抽象，因为它连字段都不能有，且接口中定义的方法都默认为`public abstract`，因此这两个修饰符不必写出

当一个类具体实现一个接口时，必须使用`implements`关键字

```java
interface Person {
  void show();
}

class Student implements Person {
  pubilc void show();
}
```

类虽然只能继承一个，但是接口可以被实现多个

```java
interface Person {
  void show();
}

interface Ok {
  void say();
}

class Student implements Person, Ok {
  public void show(){}
  public void say(){}
}
```

### 接口继承

一个接口可以通过关键字`extends`继承另一个接口

```java
interface Foo {
  void run();
}
interface Bar extends Foo {
  void say();
}
```

Bar 会获得 Foo 中的抽象方法

### default 方法

接口中的抽象方法可以被声明为`default`，这样实现类就不必覆写`default`方法

```java
interface Foo {
    String getName();
    default void run(){
        System.out.println(getName() + "run");
    }
}
```

目的是为了当新增一个方法时，会涉及到修改所有的实现类，如果是`default`方法，就无需覆写

::: caution
接口中的`default`方法不能访问字段，而抽象类的方法是可以访问字段的
:::

### 静态字段

接口也是拥有静态字段的，但是必须为`final`

```java
interface Person {
  public static final int MALE = 1;
}
```

实际上`public static final`是默认的，因此可以简写为：

```java
interface Person {
  int MALE = 1;
}
```

## 泛型

由 Object 转型问题提出泛型，提高安全性（将运行期的错误转换到编译期），省去强转的麻烦

`<>`中必须放入的是引用数据类型

前后泛型必须一致，1.7 版本后面可以不写

泛型最好不要定义 Object，没有意义

类可以加上泛型，当创建该类的对象时，就会为该泛型赋值

方法必须和类的泛型一致，可以单独为方法添加一个特有的泛型

### 在类中的应用

<!-- todo -->

### 在方法中的应用

<!-- todo -->

## 错误处理

Java 的错误处理建立在异常体系之上，但它和 Python、JavaScript 最大的区别在于：Java 不只是“能抛异常”，还试图通过类型系统约束一部分异常必须被显式处理。

如果想先看错误处理的共性模型，可以先读 [编程语言中的错误处理模型](/sundry/error.html)。本篇只关注 Java 自己的机制：`Throwable` 层级、checked / unchecked exception、`try-catch-finally`，以及 Java 异常设计的取舍。

### Java 的异常层级

Java 中所有错误和异常的顶层父类都是 `Throwable`。

它下面主要分成两支：

+ `Error`
+ `Exception`

其中：

+ `Error` 通常表示 JVM 或运行环境层面的严重问题，一般不以业务代码恢复为目标
+ `Exception` 才是应用开发中最常接触的异常体系

而 `Exception` 又可以继续分成两类：

+ checked exception：编译器要求显式处理或显式声明抛出
+ unchecked exception：通常是 `RuntimeException` 及其子类，不强制在编译期处理

### checked 和 unchecked

这是 Java 错误处理里最有代表性的分界。

### checked exception

checked exception 的特点是：如果一个方法可能抛出这类异常，调用者必须处理，或者继续在方法签名中用 `throws` 声明。

它的目标是把错误处理责任提前暴露到接口层。

### unchecked exception

unchecked exception 通常指 `RuntimeException` 及其子类。这类异常不要求在编译期显式处理，常见于：

+ 空指针
+ 非法参数
+ 数组越界
+ 状态不合法

它们更接近“程序员写错了”或“调用约束被违反了”的情况。

### `try-catch-finally`

Java 使用 `try-catch-finally` 处理异常：

```java
try {
    // 可能抛出异常的代码
} catch (Exception e) {
    // 异常处理
} finally {
    // 总会执行的收尾逻辑
}
```

`catch` 用于按类型捕获异常，`finally` 用于保证清理逻辑执行。

例如：

```java
try {
    int result = 1 / 0;
} catch (ArithmeticException e) {
    System.out.println("division by zero");
} finally {
    System.out.println("finally");
}
```

这里的重点不是语法，而是职责：

+ `try` 负责正常路径
+ `catch` 负责失败路径
+ `finally` 负责善后

### `throws`：把处理权继续往上交

Java 并不要求每一层都立刻解决异常。很多时候，当前方法并没有足够上下文处理问题，这时可以把异常继续向上抛：

```java
void readFile() throws IOException {
    // ...
}
```

这也是 Java checked exception 设计的关键点：异常不仅是一种运行时行为，也是一种接口契约。

### Java 异常处理的常见问题

+ 机械地 `catch Exception`，导致异常类型语义被抹平
+ 捕获后只打印日志，不做传播、不做转换，也不真正处理
+ 在不该恢复的地方强行恢复，掩盖程序状态问题
+ 方法签名里堆满 `throws`，却没有清晰的异常边界设计

Java 的异常体系很强，但如果边界不清晰，最后也会退化成“哪里都能抛，哪里都随便抓”。

### Java 的取舍

Java 的异常设计一直有争议，核心原因就在于 checked exception。

它的优点是：

+ 强迫开发者正视一部分失败路径
+ 让接口层显式暴露错误可能性

它的代价是：

+ 样板代码较多
+ 传播链过长时容易显得繁琐
+ 部分团队最后会因为嫌麻烦而退化成宽泛捕获

所以 Java 异常处理写得好不好，关键不在于“有没有 `try-catch`”，而在于有没有把异常边界设计清楚。

### 常见实践

+ 能捕获具体异常类型时，不要直接 `catch Exception`
+ 当前层没有处理能力时，用 `throws` 继续向上交
+ 用 `finally` 或更现代的资源管理方式保证清理逻辑
+ 不要把日志打印当成错误处理的终点
+ 区分真正可恢复异常和程序状态类异常

### 总结

Java 的错误处理不是单纯的异常捕获机制，而是一套和类型系统绑定得很深的异常传播模型。`try-catch-finally` 负责组织控制流，checked / unchecked exception 负责区分哪些失败路径必须被显式面对。它的优势是边界清晰、约束较强，代价是写法容易变重。因此，Java 异常处理真正的重点不是“会不会写 `catch`”，而是“是否设计好了异常的责任边界”。

## 多任务处理

只需要继承`Thread`，重写`run`方法，把新线程要做的事写在`run`方法中，创建线程对象，开启新线程, 内部会自动执行`run`方法

或者定义类实现`Runnable`接口，创建自定义的`Runnable`的子类对象，创建`Thread`对象, 传入`Runnable`，调用`start()`开启新线程, 内部会自动调用`Runnable`的`run()`方法

`Thread`代码简单，但如果已经有了父类，就不能用这种方法

`Runnable`代码复杂，即使自己定义的线程类有了父类也没关系，因为有了父类也可以实现接口，而且接口是可以多实现的。坏处是不能直接使用`Thread`中的方法需要先获取到线程对象后，才能得到`Thread`的方法，代码复杂

### 同步

<!-- todo -->

### 安全

多线程并发操作同一数据时, 就有可能出现线程安全问题，使用同步技术可以解决这种问题, 把操作数据的代码进行同步, 不要多个线程一起操作

Vector 是线程安全的,ArrayList是线程不安全的，StringBuffer是线程安全的,StringBuilder是线程不安全的，Hashtable是线程安全的,HashMap是线程不安全的

<!-- todo -->

## 标准功能

### 输入和输出

`System.out.println()`会将信息打印在控制台上并换行，而`System.out.printf()`则不会换行

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

Java 沿用了 C 语言库函数中的`printf()`，因此可以通过格式占位符来控制输出的格式

Scanner 也可以读取文件，需要用 File 类将一个文件构造成 Scanner 对象，这样就可以将文本中所有的内容加载

```java
Scanner sc = new Scanner(Paths.get("text.txt"), "UTF-8");
```

值得一提的是，这个操作必须处理异常，否则无法通过编译

### 文件处理

使用`File(String path)`构造一个文件对象

### IO

Java 可以操作用流的方式操作数据，`InputStream()`和`OutputStream()`分别是输入流和输出流的构造方式

Java 还提供了字符流`Reader`和`Writer`，只能操作字符数据

## 参考资料

+ [JAVA JDK 的镜像分发](https://www.injdk.cn/)
+ Effective Java
+ Java 核心技术
+ On Java 8
