---
title: 类与对象
category: 编程语言
tags: [Java]
author: JQiue
article: false
---

Java 是一种强制性对象风格编程的语言，几乎任何东西都定义在类中

## 创建对象

`String s;`只是创建了一个 String 对象的引用，而非对象，直接使用时会报错，因为该引用没有指向任何对象，所以最好在创建对象的同时初始化变量

```java
String s = "Hello, World";
```

## 实例化

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

## 自定义类型

`class`关键字允许自定义类型，该类中只能存放两种元素：字段和方法

字段类型可以是基本类型，也可以是引用类型

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

## 静态字段和静态方法

静态字段和静态方法是用`static`修饰的，会被所有的的实例所共享。虽然可以通过`实例变量.静态字段/静态方法`访问，但它们并不属于实例，只是因为编译器可以根据实例类型自动转换为`类名.静态字段/静态方法`，所以推荐用类名来访问它们。静态字段和静态方法都是与此类对象无关的

```java
class Demo {
  static int a = 1;
}

Demo.a;
```

## 构造器

构造器是一种特殊的方法，每创建一个对象，这个方法都会被自动调用一次，可用于进行对象的初始化操作

构造器的名字和类名必须相同，它没有返回类型：

```java
class Demo {
  Demo(int a){
    System.out.println(a);
  }
}

// 调用一次构造器方法
Demo d = new Demo(1);
```

如果没有显示创建构造器，编译器会自动创建一个无参的构造器方法，如果显示的定义了构造器则不会创建

## 访问权限

Java 有三个显式关键字来设置类中的访问权限，这些访问修饰符决定了谁能使用它们修饰的方法、变量或类：

+ public（公开）表示任何人都可以访问和使用该元素
+ private（私有）除了类本身和类内部的方法，外界无法直接访问该元素。private
是类和调用者之间的屏障。任何试图访问私有成员的行为都会报编译时错误
+ protected（受保护）类似于 private，区别是子类（下一节就会引入继承的概念）
可以访问 protected 的成员，但不能访问 private 成员
+ default（默认）如果你不使用前面的三者，默认就是 default 访问权限。default
被称为包访问，因为该权限下的资源可以被同一包（库组件）中其他类的成员访
问

## 继承

继承是一种非常强大的机制，它可以复用很多代码，当一个类继承了另一个类时，就会获得该类的所有功能，Java 通过`extends`关键字实现继承

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
  public void showMe(){}
}
```

Student 会获得 Person 的所有属性和方法，也拥有自己的属性和方法

继承是无法获得父类中包含`private`关键字的属性和方法的，这使继承的作用被削弱了，但 Java 提供了`protected`关键字来使字段或属性能够被子类所访问

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

## 重载和覆盖

Java 允许创建多个方法名相同，但参数不同的方法，这种方式叫做方法的重载

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
  public void show(){
    System.out.println("Person show");
  }
}

class Student extends Person {
  public void show(){
    System.out.println("Student show");
  }
}
```

## this

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

## super

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

::: danger
子类不会继承父类的构造方法
:::

## 转型

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

## 多态

## 组合和聚合

## 单继承结构

## 封装

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

## Object

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

## 多态

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

## final

final 可以作用于类、方法和变量

+ final 修饰的类无法被继承
+ final 修饰的方法无法重写
+ final 修饰的字段必须在实例化时初始化

## 抽象类

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

## 面向抽象

抽象类也可以引用子类实例

```java
Person s = new Student();
```

好处是并不需要关心父类变量的具体子类型，这种尽量引用高层类型，避免引用实际子类型的方式叫做面向抽象编程

面向抽象编程的本质：

+ 上层只定义规范
+ 不需要子类就可以实现业务逻辑
+ 具体的业务逻辑由不同的子类实现

## 内部类

## 生命周期

## 包装类
