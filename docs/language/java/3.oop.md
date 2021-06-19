---
title: 面向对象编程
category: 编程语言
tag: Java
author: JQiue
article: false
---

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

::: danger
子类不会继承父类的构造方法
:::

### 向上转型

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

### 向下转型

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

### 继承和组合

### Object

任何类都会继承某一个类，如果没有明确的写出`extends`的类，那么会继承`Object`类，Java 只允许一个类继承一个类，除了`Object`，因为它是最顶层的类

## 多态

### 方法的覆盖

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

### 覆写 Object 的方法

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

## 静态字段和静态方法

静态字段和静态方法是用`static`修饰的，会被所有的的实例所共享，虽然可以通过`实例变量.静态字段/静态方法`访问，但它们并不属于实例，只是因为编译器可以根据实例类型自动转换为`类名.静态字段/静态方法`，所以推荐用类名来访问它们
