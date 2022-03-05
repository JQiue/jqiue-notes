---
title: 标准功能
category: 编程语言
tag: [Java]
article: false
---

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

Java 沿用了 C 语言库函数中的`printf()`，因此可以通过格式占位符来控制输出的格式

Scanner 也可以读取文件，需要用 File 类将一个文件构造成 Scanner 对象，这样就可以将文本中所有的内容加载到

```java
Scanner sc = new Scanner(Paths.get("text.txt"), "UTF-8");
```

值得一提的是，这个操作必须处理异常，否则无法通过编译
