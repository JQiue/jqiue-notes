---
title: 思想
category: 数据结构与算法
article: false
order: 13
---

## 穷举

计算机没有归纳总结，逻辑推理的能力，完成一些重复的工作是计算机最擅长的，穷举法就是利用这一特点产生的思想，顾名思义，根据条件确定答案的大致范围，然后对此范围内的所有情况逐一验证，直到全部情况验证完毕，最后可得出该题目是否有解

比如求出某些范围内能被 3 整除也能被 5 整除的数字，即可用穷举法

```js
function resolve(num) {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    if(i % 3 == 0 && i % 5 == 0) {
      arr.push(i);
    }
  }
  return arr;
}
```

## 分而治之

## 动态规划

## 贪心

## 回溯

<!-- to be updated -->
