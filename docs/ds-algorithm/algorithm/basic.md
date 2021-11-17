---
title: 介绍
author: JQiue
article: false
---

算法是对解决特定问题的求解步骤的描述，在计算机中表现为指令的有限序列，每一条指令表示一个或多个操作，没有通用的算法，只有专用的算法

算法有五个特性：

+ 输入：算法执行前，必须具备的先决条件，可以没有输入
+ 输出：算法执行后，得出的结果，必须要有输出，不一定是打印，可以是一个返回值
+ 有穷性：算法在执行有限的步骤后能够自动停止，且每一个步骤都能在可接受的时间内完成
+ 确定性：算法的每一步都有确定的含义，没有二义性，不能够模棱两可
+ 可执行性：算法的每一步必须是可执行的，每一步通过执行有限的次数完成，能偶被转换成计算机程序执行

算法在设计上也有要求：

+ 正确性：没有语法错误，对合法的数据能够产生满足需求的结果，对于不合法的数据有信息反馈
+ 可读性：便于人们理解的算法，否则难以调试和修改
+ 健壮性：对于不合法的数据，也能够做出相关处理不会产生一些莫名其妙的结果
+ 高效性：执行时间短，占用存储空间低，时间和空间是衡量算法性能的重要指标

解决问题的效率，不仅仅跟数据的组织方式有关，也和运行空间有关

数据结构与算法本身解决的是“快”与“省”的问题，因此执行效率是算法的一个非常重要的考量指标，这就是算法的时间和空间复杂度分析

+ 空间复杂度S（n）：根据算法写成的程序在执行时占用的存储单元，占用的大小往往和问题的规模有关，空间复杂度过高的算法可能导致内存爆满，从而导致程序终止
+ 时间复杂度T（n）：根据算法写成的程序在执行时耗费的时间，占用的大小也和问题的规模有关，时间复杂度过高的算法会导致在有生之年也看不到结果

## 为什么需要复杂度分析

不同的算法解决同一个问题，相差非常大，所以就有了算法的复杂度的分析

```java
public static int sum1(int n){
    int result = 0;
    for (int i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}

public static int sum2(int n){
    return (1 + n) * n / 2;
}
```

把代码跑一遍，通过统计、监控就能得到算法的执行时间和占用空间，这是一种非常局限性的算法效率评估，因为测试结果非常依赖测试环境，硬件的不同导致测试结果会有很大的影响，同时也受到问题的规模影响，这个评估算法执行的效率的方法在很多书里面叫做**事后统计法**（事后诸葛亮），所以需要一个不用具体的测试数据来测试，就可以粗略的估计算法的执行效率的方法，事后统计法用来比较两种算法的执行时间，缺点是依赖硬件以及运行时各种不确定的环境因素，必须编写测试代码，测试数据的选择比较难以保证公正性

一般以正确性、可读性、健壮性来评估算法的优劣，好的算法就是在三个基础上，时间复杂度低，空间复杂度低，因此可以大概率上估计一个算法的好坏

+ 时间复杂度：估算程序指令的执行次数
+ 空间复杂度：估算所需占用的存储空间

## 大 O 表示法

大 O 表示法是一种粗略的度量，在数据项个数发生变化时，算法的效率会发生改变

一般分析算法的效率时，经常关注两种复杂度：

+ 最坏情况复杂度
+ 平均复杂度

```java
class ds01 {
    /*
      斐波那契数列：后面的项是前面的两个数相加
      0, 1, 1, 2, 3, 5, 8, ... 
     */
    public static void main(String[] args) {
        System.out.println(fb(new Scanner(System.in).nextInt()));
        System.out.println(fb1(new Scanner(System.in).nextInt()));
    }

    // O(2^n)
    // 递归形式
    public static int fb(int n){
        if (n <= 1) return n;
        return fb(n - 1) + fb(n - 2);
    }

    // O(n)
    // 第二种形式
    public static int fb1(int n) {
        if (n <= 1) return n;
        int first = 0;
        int second = 1;
        for (int i = 0; i < n - 1; i++) {
            int sum = first + second;
            first = second;
            second = sum;
        }
        return second;
    }

    // O(1)
    // 11
    public static void test1(int n) {
        // 1
        if (n > 10) {
            System.out.println("n > 10");
        } else if (n > 5) {
            System.out.println("n > 5");
        } else {
            System.out.println("n <= 5");
        }

        // 1 + 3 + 3 + 3
        for (int i = 0; i < 3; i++){
            System.out.println("test2");
        }
    }

    // O(n)
    // 1 + 3n 
    public static void test2(int n) {
        for (int i = 0; i < n; i++){
            System.out.println("test2");
        }
    }

    // O(n^2)
    // 1 + 3n + 3n^2
    public static void test3(int n) {
        // 1 + 2n + n * (1 + 3n) 
        // 1 + 2n + n + 3n^2
        // 1 + 3n + 3n^2
        for (int i = 0; i < n; i++){
            // 1 + 3n
            for (int j = 0; j < n; j++){
                System.out.println("test3");
            }
        }
    }

    // O(logn)
    // log2(n)
    public static void test4(int n) {
        while ((n = n / 2) > 0) {
            System.out.println("test4");
        }
    }

    // log5(n)
    public static void test5(int n) {
        while((n = n / 5) > 0){
            System.out.println("test5");
        }
    }

    // O(logn + nlogn)
    // 1 + 3*log2(n) + 2 * nlog2(n) 
    public static void test6(int n) {
        // 1+ 2 * log2(n) + log2(n) * (1 + 3n)
        for (int i = 1; i < n; i = i + i) {
            // 1 + 3n
            for (int j = 0; j < n; j++){
                System.out.println("test6");
            }
        }
    }
}
```

一般采用大 O 表示法来描述复杂度，它表示的是数据规模 n 对应的复杂度，仅仅是粗略的估算，帮助短时间内了解一个算法的复杂度

+ 常数项：9 >> O(1)
+ 2n + 3 >> O(n)
+ n^2^ + >> O(n^2^)
+ 4n^3^ + 3n^2^ + 22n + 100 >> O(n^3^)

::: tip 对数阶的细节
对数阶一般省略底数
:::

## 算法的优化方向

+ 用尽量少的存储空间
+ 用尽量少的执行步骤
+ 根据情况空间换时间或时间换空间
