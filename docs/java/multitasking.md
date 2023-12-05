---
title: 多任务处理
category: 编程语言
tag: [Java]
article: false
---

只需要继承`Thread`，重写`run`方法，把新线程要做的事写在`run`方法中,创建线程对象，开启新线程, 内部会自动执行`run`方法

或者定义类实现`Runnable`接口，创建自定义的`Runnable`的子类对象，创建`Thread`对象, 传入`Runnable`，调用`start()`开启新线程, 内部会自动调用`Runnable`的`run()`方法

`Thread`代码简单，但如果已经有了父类，就不能用这种方法

`Runnable`代码复杂，即使自己定义的线程类有了父类也没关系，因为有了父类也可以实现接口，而且接口是可以多实现的。坏处是不能直接使用`Thread`中的方法需要先获取到线程对象后,才能得到`Thread`的方法,代码复杂

## 同步

<!-- todo -->

## 安全

多线程并发操作同一数据时, 就有可能出现线程安全问题，使用同步技术可以解决这种问题, 把操作数据的代码进行同步, 不要多个线程一起操作

Vector 是线程安全的,ArrayList是线程不安全的，StringBuffer是线程安全的,StringBuilder是线程不安全的，Hashtable是线程安全的,HashMap是线程不安全的

<!-- todo -->