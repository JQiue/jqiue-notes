---
title: 存储类型
category: 编程语言
tag: [C]
article: false
---

C 中的变量和函数都有两种属性：数据类型和数据存储类型

数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括`auto`、`static`、`extern`、`register`这四种类型

数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在

+ 作用域：作用域分为局部作用域和全局作用域
+ 可见性：
+ 生命周期
+ 初始值

## auto

在函数或块中声明的所有变量的如果没有进行特殊类型声明，则默认类型都是`auto`，它会在函数调用的时候分配内存，在调用结束后被释放掉

## static

使用`static`声明的变量会在程序开始的时候初始化，然后一直保留着程序结束，但是它的作用域取决于它定义的位置，所以又分为局部静态变量和全局静态变量

+ 定义在函数内，函数外不能访问
+ 定义在函数外，对该文件内所见，但不能被其他文件访问

```c
void test() {
  static int count = 0;
  printf("%d\n", ++count);
}

int main(void){
  test(); // 1
  test(); // 2
  return 0;
}
```

所以静态变量在被函数调用完毕时并不会消失，会一直保留着状态在内存中

::: tip
静态变量会自动初始化为`0`
:::

## register

使用`register`定义的变量会保存在 CPU 的通用寄存器内，由于寄存器的读写速度比内存快很多，所以变量的数据读取也很快

但是寄存器是有限的，不可能定义太多寄存器变量，当寄存器用完时，定义寄存器类型的变量会自动变为自动变量

## extern

我们知道，C 的变量遵循“先声明，后引用”的使用方式，那么外部变量可以帮助打破这种做法

```c
int main(void)
{
  // 只是声明一下
  extern int foo;
  printf("%d", foo); // 123
  return 0;
}

// 真正的定义在这
int foo = 123;
```

需要注意的是，外部变量不能声明的同时初始化，否则无法编译通过。另外需要注意的一点是，它的作用域也取决于声明位置

## 总结

存储说明符|存储位置|初始化值|作用域|生命周期
auto|栈|垃圾值|块|块的结束
extern|静态|0|所有的文件|程序的结束
static|静态|0|块|程序的结束
register|寄存器|垃圾值|块|块的结束