---
title: 错误处理
category: 编程语言
tag: [Java]
article: false
order: 6
---

Throwable 是所有错误或异常的超类，分为 Error 和 Exception，Exception 又分为编译时异常和运行时异常

+ 运行时异常 - 所有 RuntimeException 类及子类成为运行时异常，在编译时不会报错，在运行过程终止运行
+ 编译时异常 - 程序员必须处理，否则程序就会发生错误无法通过编译

如果没有手动处理异常，JVM 就会抛出异常信息，同时停止运行

## try catch

<!-- todo -->