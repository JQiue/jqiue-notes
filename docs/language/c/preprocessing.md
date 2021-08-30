---
title: 编译预处理
category: 编程语言
tags: [C, Alpha]
author: JQiue
article: false
---

在 C 中，所有以`#`开头的行都由预处理器处理，它是编译器调用的程序，简单来说就是预处理器接收一个 C 代码并生成另一个 C，然后再交给编译器处理，包括：**文件包含，宏定义，条件编译**

## 文件包含

`#include`用来引入对应的头文件，非常简单就是将头文件的内容插入到命令的位置

有两种用法：

```c
#include <stdio.h>
#include "my.h"
```

+ 通过`<>`引入的头文件，会到系统路径下查找
+ 通过`""`引入的头文件，会到当前目录下寻找，如果没有找到就会到系统路径下寻找

## 宏定义

当对常量使用`#define`时，预处理器会搜索 C 中所有的匹配标记并替换为给定的表达式

```c
#define foo 100

int main(void) {
  printf("%d", foo); // 100
  return 0;
}
```

也可以使用类似参数的函数，他不会检查类型

```c
#define increment(x) ++x

int main(void) {
  int x = 10;
  printf("%d", increment(x)); // 11
  return 0;
}
```

在宏进行扩展之前，它是不会评估参数的

```c
#define foo(a, b) a*b

int main(void)
{
  // 实际上，它会被替换为 1 + 2 * 3 + 4，并不是 3 * 7
  printf("%d", foo(1 + 2, 3 + 4)); // 11
  return 0;
}
```

但是可以这么做

```c
#define foo(a, b) (a)*(b)

int main(void)
{
  // 现在它才是 (1 + 2) * (3 + 4)
  printf("%d", foo(1 + 2, 3 + 4)); 21
  return 0;
}
```

也可以使用`##`进行连接

```c
#define foo(a, b) a##b

int main(void)
{
  printf("%d", foo(1,2)); 12
  return 0;
}
```

如果一个宏当中有其他宏的名字，也是会被替换的

如果一个宏的值超过了一行，需要在末尾加`\`

一个宏定义可以没有值

C 还提供了一些预定义的宏

宏|描述
---|---
`__DATE__`|当前源文件的编泽口期，用 “Mmm dd yyy”形式的字符串常量表示
`__FILE__`|当前源文件的名称，用字符串常量表示
`__LINE__`|当前源义件中的行号，用十进制整数常量表示，它可以随#line指令改变
`__TIME__`|当前源文件的最新编译吋间，用“hh:mm:ss”形式的宁符串常量表示

### 带参数的宏

+ 格式：#define 标识符(参数1,参数2) ((参数1)*(参数2))

可以像函数一样携带参数，但原则是一切都要括号，整个值也要括号，参数出现的每一个地方都要括号，也可以嵌套其他宏

## 条件编译

## 标准库函数

### stdlib.h

+ srand

+ rand

+ exit

+ system

### string.h

+ strcpy
+ strcmp
+ strlen

### math.h

+ ceil
+ floor
+ sqrt
+ pow
+ abs
