---
title: 结构体与联合体
category: 编程语言
tag: [C]
article: false
order: 4
---

在实际情况中，单纯用一个变量来描述一个对象是不够的，因为一个对象可以有多个不同类型的属性，使用数组也无法满足需求，C 提供了结构体和共用体来解决这些复杂的数据类型

## 结构体

结构体跟数组相反是不同类型变量的集合，通过关键字`struct`来声明一个结构体

```c
struct Point {
  int x;
  int y;
};
```

使用过程和声明变量一样，只不过是用自定义的类型来声明一个变量

```c
struct Point foo; // 创建一个结构体变量 foo
```

甚至可以创建多个变量

```c
struct Point foo, bar;
```

### 初始化

结构体不能声明的同时初始化，这是无法编译通过的

```c
struct Point {
  int x = 1;
  int y = 2;
};
```

这很简单，因为它只是个声明，没有为变量分配内存，赋值自然会报错

但是可以使用`{}`初始化结构体成员，但仍需要一个变量

```c
struct {
  int x;
  int y;
} foo;

foo = {1, 2}; // 自动按顺序分配成员
```

另外，结构体也允许指定初始化，按照自己想要的顺序初始化成员

```c
struct p {
  int x, y, z;
};

int main(void)
{
  struct p foo = { .z = 3, .x = 1, .y = 2 };
  return 0;
}
```

### 访问成员

使用`.`运算符访问成员变量

```c
struct Point {
  int x;
  int y;
}

struct Point foo = {1， 2};

printf("%d", foo.x); // 1
printf("%d", foo.y); // 2
```

### 匿名结构体

声明结构体的同时创建变量，不具有名字的结构体

```c
struct {
  int x;
  int y;
} p;
```

但仍然允许有名字的同时创建变量

```c
struct Point {
  int x;
  int y;
} p;
```

### 结构体数组

可以通过结构体类型来定义一个数组，这个数组中每一个元素都是结构体类型

```c
struct Person { 
  char name[10]; 
  int age;
}

struct Person persons[2] = { {"zs", 23}, {"ls", 24} };

person[0].name; // 通过下标访问每个结构体元素，再访问具体的成员
```

### 限制

1. 不允许使用`struct`类型视为内置的数据类型
2. 不允许使用`+`、`-`等运算符操作结构体变量
3. 不允许隐藏数据
4. 不允许结构体中声明函数
5. 不能有静态数据

## 联合体

它和结构体是类似的，通过关键字`union`来创建

```c
union data {
  int a;
  int b;
};

union data d = { 1, 2 };
```

区别在于共用体的变量成员共享相同的内存空间，更节省内存空间，占用字节取决于成员变量中最长的那个，但是也带来了一个问题，修改了一个成员就会影响其他成员

```c
d.a = 3;
printf("%d", d.b); // 3
d.a = 4;
printf("%d", d.b); // 4
```

## 和 typedef 一起使用

`typedef`同样能够定义结构体和联合体，这样减少了代码量

```c
typedef struct {
  char name[10];
  int age;
} PERSON;

int main(void) 
{
  PERSON foo = {"foo", 23};
  return 0; 
}
```
