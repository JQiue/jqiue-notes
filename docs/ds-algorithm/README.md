---
title: 数据结构与算法
author: JQiue
tags: [Alpha]
article: false
---

## 应用

+ 数据库（B树、哈希表）
+ 游戏（图、最短路径）
+ 区块链（链表，二叉树，哈希函数）
+ 人工智能

## 作用

+ 写出性能更高的程序
+ 快速学习新技术
+ 打开新世界的大门
+ 伴随程序员一生

## 编程语言的选择

+ C：非面向对象，写法复杂，大量内存管理代码，性能极高
+ C++：写法复杂，大量的内存管理代码，性能极高
+ JavaScript、Python：依赖解析器，同一个逻辑使用不同的写法会影响性能
+ Java：语法丰富严谨，完全面向对象，写法难度低，中规中矩

学好数据结构与算法是和编程语言无关的，使用自己最熟悉的语言实现一遍，本系列会分别使用多种语言去实现

## 算法是什么？

算法是用于解决特定问题的一系列步骤

不同的算法解决同一个问题，相差非常大，所以就有了算法的评估

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

事后统计法用来比较两种算法的执行时间，缺点是依赖硬件以及运行时各种不确定的环境因素，必须编写测试代码，测试数据的选择比较难以保证公正性

一般以正确性、可读性、健壮性来评估算法的优劣

+ 时间复杂度：估算程序指令的执行次数
+ 空间复杂度：估算所需占用的存储空间

好的算法就是在三个基础上，时间复杂度低，空间复杂度低，因此可以大概率上估计一个算法的好坏

## 时间复杂度的估算

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
