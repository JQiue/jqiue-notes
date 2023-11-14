---
title: 数据结构
category: 编程语言
tag: [Rust]
article: false
---

## 数组

数组中的每个元素的类型必须相同，数组长度是固定的，数组类型的表示方式：`[T; n]`，T 表示元素类型，n 表示元素数量

```rust
// 初始化定长数组
let a = [1, 2, 3, 4, 5];
// 指定类型和数量（类型和长度都是多余的）
let a: [i32; 5] = [1, 2, 3, 4, 5];
// 指定初始值和数量，用于创建相同的元素，以及指定数量
let a = [3; 5];
```

使用索引访问数组元素

```rust
let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
```

使用`len()`返回数组长度

```rust
let a = [1, 2, 3, 4, 5];
a.len();
```

可以使用切片语法

```rust
let a = [1, 2, 3, 4, 5];
// 完整的部分
let a_slice1 = &a;
// 从索引 1 开始切，但不包含 4
let a_slice2 = &a[1..4];
```

元素类型和个数相同的是同类型的，同类型数组可以互相赋值

```rust
fn main() {
  let mut xs: [i32; 5] = [1, 2, 3, 4, 5];
  let ys: [i32; 5] = [6, 7, 8, 9, 10];
  xs = ys;
  println!("new array {:?}", xs);
}
```

### Range

可以使用`..`快速的创建一个 Range 类型，它拥有迭代器的全部功能

```rust
let v1 = 1..3;
for item in v1 {
  println!("{item}")
}
```

两个小数点只是一个语法糖，它相当于

```rust
use std::ops::Range;
fn main() {
  let r = Range {start: 1, end: 10}; // r 是一个Range<i32>
  for i in r {
    print!("{:?}\t", i);
  }
}
```

### 遍历

```rust
let v = [1, 2, 3];
for item in v {
  println!("{item}");
}
```

### 边界检查

如果索引超过数组长度，那么就会触发 panic!，如果不确定使用的索引是否合法，应使用`get(index)`来获取数组元素，它的返回类型是`Option<T>`

```rust
let v = [10i32, 20, 30, 40, 50];
let first = v.get(0);
let tenth = v.get(10);
println!("{:?} {:?}", first, tenth);
```

### 方法

只要包含的元素可比较，就可以直接实现数组的比较操作

```rust
let v1 = [1, 2, 3];
let v2 = [1, 2, 4];
println!("{:?}", v1 < v2);
```

## 元组

元组是一个将多个其他类型的值组合进一个复合类型的主要方式，元组长度是固定的

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
```

通过`.`访问

```rust
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;
```

可以被解构

```rust
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
```

没有任何值的元组有个特殊的名称，叫做 **单元（unit）** 元组。这种值以及对应的类型都写作`()`，表示空值或空的返回类型。如果表达式不返回任何其他值，则会隐式返回单元值

## String

字符串本身是基于字符的集合，并通过方法将字节解析为文本。Rust 中有两种类型：`String`和`&str`，它们都是标准库的部分

```rust
// 使用 new 构建一个空串
let s1 = String::new();
// 调用 `to_string`
let s2 = "".to_string();
// 使用 from 基于字面量创建
let s3 = String::from/*  */();
```

`String`的内容可以变化，因为它在堆上申请了一块内存空间，有权对这块空间扩容

```rust
let s = String::new();
// 使用 push_str
s.push_str("hello");
// 使用 push 
s.push_str(',');
// 使用 + 运算符，此时发生移动
s + "world";
```

这里的`+`会调用`add(self, s: &str)->String`方法，所以只能将`&str`和`String`相加，而不能`String`+`String`。为什么`&String`能够调用`add`是因为这里发生了解引用强制类型转换，将`&String`转换为了`&[..]`

使用`format!`也可以创建，它和`println!`原理相同，常用于复杂的字符串合并

```rust
let s = format!("{}-{}-{}", "a", "b", "c")
```

字符串不支持索引获取字符,但可以使用`chars`或`bytes`方法来遍历字符串

```rust
let mut s1 = String::from("hello, ");
// 返回 char 
for c in s1.chars() {
  println!("{}", c);
}
// 返回对应字节数
for c in s1.bytes() {
  println!("{}", c);
}
```

## Vec

`Vec<T>`也就是所谓的动态数组，动态数组允许在单个数据结构中存储多个相同类型的值

```rust
let v1: Vec<i32> = Vec::new();

// 或者简化代码的宏
let v2 = vec![1, 2, 3];
```

具有以下方法：

+ `push(value)` - 添加元素，会返回一个`Option<&T>`
+ `get(index)` - 获取元素，获取不到就返回`None`，而不会报错
+ `pop()` - 移除末尾元素，并返回，获取不到就返回`None`，而不会报错

如果持有了不可变引用，则尝试修改动态数组是不会成功的

```rust
let mut v = vec![1, 2, 3];
let first = &v[0];
v.push(4); // error
```

可以使用`for`来遍历每个元素

```rust
for item in v {
  println!("{}", item)
}
```

如果想要存储不同类型的元素，可以使用枚举来实现

```rust
enum SpreadsheetCell {
  Int(i32),
  Float(f32),
  Text(String),
}

let row = vec![
  SpreadsheetCell::Int(3),
  SpreadsheetCell::Float(3.13),
  SpreadsheetCell::Text("hello".to_string()),
];
```

## VecDeque

Vec 只支持在两端高效添加和移除元素。如果程序需要把值保存在队列中间，Vec 就慢了。VecDeque 是一个双端队列，支持高效的两端添加和移除操作

```rust
let deque = VecDeque::from([1, 2, 3]);
```

+ push_front(value) 在队列前面添加值
+ push_back(value) 在队列后面添加值
+ pop_front() 移除并返回队列前面的值，返回`Option<T>`，队列为空时返回 None
+ pop_back() 移除并返回队列后面的值，同样返回`Option<T>`
+ front() 和 deque.back() 返回队列前端和后端元素的引用。返回`Option<T>`，队列为空时返回 None
+ front_mut() 和 back_mut() 返回`Option<&mut T>`

## LinkedList

`LinkedList<T>`是 Rust 提供的双向链表

## HashMap

```rust
use std::collections::HashMap;

let mut colors = HashMap::new();
colors.insert("red", "红色");
colors.get("red");
```

## HashSet

`HashSet<T>`是 Rust 提供的集合，元素永远不会包含同一个值的副本
