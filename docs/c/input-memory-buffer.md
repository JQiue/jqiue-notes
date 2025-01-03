---
title: 输入缓冲区
category: 编程语言
tag: [C]
date: 2019-03-19
article: false
order: 10
---

## 缓冲区

如果在用户输入一个字符后立即打印该字符就是属于无缓冲输入，但是对于一些需要按下特定按键（Enter）后才打印刚刚输入的字符属于缓冲输入，因为用户输入的字符被收集到了一个被称为缓冲区的临时储存区

缓冲区最重要的作用就是比逐个发送字符的无缓冲输入要更加节省时间，而且还可以修正打错的字符，保证最后是正确的输入

但是这并不能说无缓冲输入是没有用的，因为某些场景下期待按下某个键就立即作出反应的操作

缓冲分为：完全缓冲和行缓冲

完全缓冲指当缓冲区被填满时就刷新缓冲区，比如文件输入。而行缓冲则指在出现换行符时刷新缓冲区，比如键盘按下 Enter

先看一个例子

```c
int foo, bar;
scanf("%d", &foo);
printf("%d\n", foo);
scanf("%d", &bar);
printf("%d\n", bar);
```

在这个程序中系统会接收两次数据，一般情况下，大部分人都是输入一次并回车然后继续输入

```sh
33 // 输入并回车
33 // 打印
55 // 输入并回车
55 // 打印
```

但实际上，可以这么输入

```sh
33 55 // 用空格隔开两个数据并回车
33 // 打印
55 // 打印
```

我们会发现，第二种输入方式等效于第一种方式，这和 scanf 函数的实现原理有关

scanf 函数会先从输入缓冲区中获取用户输入的数据，如果缓存区中没有数据，则会产生阻塞等待用户输入数据，如果用户输入了数据，scanf 函数则会将数据放入缓存区中，然后从缓存区中获取数据，如果缓存区中有了数据，则不会等待用户输入，会直接从缓存区中获取数据

这说明缓存区是会识别符号的，当识别到回车则代表这一次的输入结束，如果在两个数据之间识别了空格，则会将两个数据进行缓存，scanf 函数匹配缓存区中的数据类型，如果匹配则就获取出来赋值给相应变量

## 清空缓存区

如果要求每次只输入一次数据，则需要清空缓存区，可以使用函数`fflush(stdin)`，这么做会让下一个 scanf 函数无法获得缓存区中的数据，也就可以等待用户输入了，但是这个函数只能在 Windows 操作系统上使用，不适用于其他操作系统

而`setbuf(stdin, NULL)`是可以跨平台使用的，效果和`fflush(stdin)`一样

实际上，如果频繁使用 scanf 函数，则应该立即清空缓存区，避免影响后面的代码
