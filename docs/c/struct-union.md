---
title: 结构体与联合体
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

在实际情况中，单纯的用一个变量来描述一个对象是不够的，因为一个对象可以有多个属性，不可能只用一个变量描述，C 提供了结构体和共用体来解决这些复杂的数据类型

## 结构体

结构体是不同类型变量的集合，它跟数组相反，数组是相同类型的集合，通过关键字`struct`来声明一个结构体

```c
struct {
  int x;
  int y;
};
```

然而这仅仅只是一个声明，实际上它的使用过程和声明变量一样，只不过是用自定义的类型来声明一个变量

```c
struct {
  int x;
  int y;
} foo; // 创建一个结构体变量 foo
```

甚至可以创建多个变量

```c
struct {
  int x;
  int y;
} foo, bar;
```

不仅如此，结构体也可以起一个别名，只需要通过这个别名就可以实现定义变量，不用每次都写结构体定义，减少了代码量

```c
// 为这个结构体起一个 p 的别名
struct p {
  int x;
  int y;
};

struct p foo; // 这里的 p 相当于 { int x; int y; }
```

### 初始化

结构体不能声明的同时初始化，这是无法编译通过的

```c
struct {
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
  printf("%d", foo.x); // 1
  printf("%d", foo.y); // 2
  printf("%d", foo.z); // 3
  return 0;
}
```

### 访问成员

使用`.`运算符访问成员变量

```c
struct {
  int x;
  int y;
} foo = {1， 2};

printf("%d", foo.x); // 1
printf("%d", foo.y); // 2
```

### 结构体数组

更妙的是，还可以通过结构体类型来定义一个数组，这个数组中每一个元素都是结构体类型

```c
struct { char name[10]; int age } persons[2] = {{"zs", 23}, {"ls", 24}};
person[0].name; // 通过下标访问每个结构体元素，再访问具体的成员
```

### 结构体指针

指针也能指向结构体变量

```c
struct s {
  int x, y;
};

struct s foo = { 1, 2};
struct s *p
p = &foo;
```

但是通过指针访问成员就要注意，如果写成`*p.x`那就指定无法编译通过，因为`.`的优先级比`*`高，所以要加上括号保证优先级`(*p.x)`，为了解决这种问题，C 也引进了箭头写法`->`来帮助指针访问成员

```c
(*p).x;     // 通过指针间接访问结构体成员，注意的是必须加上()，因为 . 运算符的优先级高于 * 运算符
p->x;       // 为了解决上面的写法问题，C 提供了 -> 运算符来帮助简写，这和上面是等价的
```

::: tip
结构体只是一个创建变量的模板，并不占用内存空间，而结构体中的变量才是真正存放数据的地方，需要空间来存储
:::

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

区别在于共用体的变量成员是共享相同的内存空间，相对于结构体更节省内存空间，占用字节取决于成员变量中最长的那个，但是也带了一个问题，修改了一个成员就会影响其他成员

```c
d.a = 3;
printf("%d", d.b); // 3
d.a = 4;
printf("%d", d.b); // 4
```

## typedef 定义它们

`typedef`同样能够定义结构体和联合体

```c
typedef struct {
  char name[10];
  int age;
} PERSON;

int main(void) 
{
  PERSON foo = {"foo", 23};
  printf("name = %s, age = %d", foo.name, foo.age); // name = foo, age = 23
  return 0; 
}
```