---
title: 迭代器
category: 编程语言
tag: [Rust]
article: false
order: 7
---

迭代器是 Rust 中处理元素序列的强大抽象，它们提供了一种统一的方式来遍历集合，无论底层数据结构如何。在 Rust 中，迭代器是惰性的（lazy），这意味着在实际使用之前不会消耗任何计算资源

创建迭代器后，需要主动调用方法来消耗并使用它

```rust
let v = vec![1, 2, 3];
let v_iter = v.iter();
for item in v {
  println!("{}", item);
}
```

所有的迭代器都实现了标准库中的`Iterator trait`，像下面这样

```rust
trait Iterator {
  type Item;
  fn next(&mut self) -> Option<Self::Item>;
}
```

对于迭代器必须要定义一个具体的类型，而这个类型会作为`next`方法的返回值类型，每次调用`next`方法时，会返回一个包括元素的值`Some`，并在结束时返回`None`

## 自定义迭代器

```rust
struct Counter {
  count: u32,
}

impl Iterator for Counter {
  type Item = u32;
  fn next(&mut self) -> Option<Self::Item> {
    if self.count < 5 {
      self.count += 1;
      Some(self.count)
    } else {
      None
    }
  }
}

// 使用自定义迭代器
let sum: u32 = Counter { count: 0 }.sum();
assert_eq!(sum, 15);
```

## 方法

迭代器提供了很多有用的方法：

```rust
let numbers = vec![1, 2, 3, 4, 5];

// for_each 为每个元素执行一次闭包
numbers.iter().for_each(|&x| println!("{}", x));

// map 将结果映射到新的迭代器中并返回
let doubled: Vec<i32> = numbers.iter().map(|&x| x * 2).collect();

// filter 根据条件过滤符合条件的元素，然后返回
let even: Vec<i32> = numbers.iter().filter(|&&x| x % 2 == 0).cloned().collect();

// any 判断是否包含满足条件的元素，返回布尔值
let has_even = numbers.iter().any(|&x| x % 2 == 0);

// all 判断所有元素是否满足条件，返回布尔值
let all_positive = numbers.iter().all(|&x| x > 0);

// max and min 返回迭代器中最大和最小的元素
let max = numbers.iter().max();
let min = numbers.iter().min();

// sum 返回迭代器中所有元素的和
let sum: i32 = numbers.iter().sum();
```
