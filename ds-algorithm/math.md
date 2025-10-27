---
title: 数学算法
category: 数据结构与算法
article: false
---

## 判断素数

```rust
/* 判断方法：质数无法被比它小的数整除 (n>3) */
pub fn is_prime(number: i128) {
  if number <= 1 {
    return false;
  }
  if number <= 3 && number > 1 {
    return true;
  }
  for n in 2..number {
    if number % n == 0 {
      return false;
    }
  }
  return true;
}
```

## 最大公约数

```rust
/* 欧几里得算法（辗转相除法）：gcb(a, b)==(b, a mod b) */
pub fn gcb(a: i32, b: i32) -> i32 {
  if a % b == 0 {
    b
  } else {
    gcb(b, a % b)
  }
}
```
