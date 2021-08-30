---
title: 推导式
category: 编程语言
tags: [Python, Alpha]
author: JQiue
article: false
---

Python 提供了推导式将一个数据序列构建成一个新的数据序列

下面是一个不用推导式的例子：

```python
# 1 到 10 所有偶数的平方
list = []
for i in range(1, 11):
    if i % 2 == 0:
        list.append(i * i)
print(list) # [4, 16, 36, 64, 100]
```

使用推导式：

```python
list = [i * i for i in range(1, 11) if i % 2 == 0]
print(list) # [4, 16, 36, 64, 100]
```

推导式即在列表内部使用 for 循环迭代，并将每一次的结果返回第一个表达式，if 是可选的

::: center
[表达式 for 迭代变量 in 迭代器 if 判断条件]
:::

这个推导式只能对可变类型使用，因此字典，可变集合也适用

::: tip
for 是可以无限使用的
:::

```python
a = "111"
b = "222"
c = "333"

print([m + n + j for m in a for n in b for j in c])
['123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123'] 
```
