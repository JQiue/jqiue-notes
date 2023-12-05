---
title: 迭代器
category: 编程语言
tag: [Rust]
article: false
---

在 rust中 ，迭代器是惰性的（layzy）。这也就意味着创建迭代器后，除⾮主动调用⽅法来消耗并使用迭代器，否则它们不会产⽣任何的实际效果

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

  fn next(&mut self) -> Option<self::Item>;
}
```

对于迭代器必须要定义一个具体的类型，而这个类型会作为`next`方法的返回值类型，每次调用`next`方法时，会返回一个包括元素的值`Some`，并在结束时返回`None`

迭代器提供了很多方法：

+ `for_each` - 为每个元素执行一次闭包
+ `map` - 遍历每个元素，将结果映射到新的迭代器中并返回
+ `filter` - 根据条件过滤符合条件的元素，然后返回
+ `any` - 判断是否包含满足条件的元素，返回布尔值
+ `all` - 判断所有元素是否满足条件，返回布尔值
+ `max`和`min` - 返回迭代器中最大和最小的元素
+ `sum`和`min` - 返回迭代器中所有元素的和
