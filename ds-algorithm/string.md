---
title: 串
category: 数据结构与算法
article: false
order: 5
---

在计算机上处理非数值的工作越来越多，于是引入了对字符的处理，就有了字符串的概念，那么串就是由零个或多个字符组成的线性表，是的，它是一种内容受限的线性表

串中的字符个数被称为串的长度，零个字符的串称为空串。串中任意个连续的字符组成的子序列被称为该串的子串，包含子串的串被称为主串。子串的位置以字串的第一个字符在主串中的位置来表示

对于串的基本操作与线性表是有很大区别的，因为线性表更关注的是单个元素的操作，但串更多的是查找一个字串的位置，或替换子串等操作

## 反转

## 压缩

## 替换

## 乱序字符串

乱序字符串是指一个字符串只是另一个字符串的重新排列，比如`heart`和`earth`

```rust
// 检查法 O(n2)
pub fn anagram(s1: &str, s2: &str) -> bool {
  // 字符串长度不同，一定不是乱序字符串
  if s1.len() != s2.len() {
    return false;
  }
  // s1 和 s2 中的字符分别加入 alist，blist
  let mut alist = vec![];
  let mut blist = vec![];
  for c in s1.chars() {
    alist.push(c)
  }
  for c in s2.chars() {
    blist.push(c)
  }

  let mut pos1 = 0;
  let mut ok = true;
  while pos1 < s1.len() && ok {
    let mut pos2 = 0;
    let mut found = false;
    while pos2 < blist.len() && !found {
      if alist[pos1] == blist[pos2] {
        found = true;
      } else {
        pos2 += 1;
      }
    }
    if found {
      blist[pos2] = ' ';
    } else {
      ok = false;
    }
    pos1 += 1;
  }
  ok
}

```
