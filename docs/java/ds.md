---
title: 数据结构
category: 编程语言
tag: [Java]
article: false
---

## 数组

数组是同一类型的集合，一旦创建大小就不可变

```java
int[] array = new int[5];
```

数组所有的元素初始化为默认值，整形都是`0`，浮点型是`0.0`，布尔型是`false`

也可以在定义数组时指定初始化元素，这样就不必写出数组大小

```java
int[] array = new int[]{1, 2, 3, 4, 5};
```

还可以进一步简写成

```java
int[] array = {1, 2, 3};
```

## 集合

集合只能存储引用数据类型，存储基本类型会自动装箱，集合长度可以随着元素的增长而增长，这是它和数组的区别

所有类型的集合继承`Collection`接口

### List

List 集合是存储有序的，可以重复的元素，有多种实现，都继承 List 接口，List 有本身实现的方法：

+ `viod add(int index, E element)`
+ `E remove(int index)`
+ `E get(int index)`
+ `E set(int index, E element)`

ArrayList 是数组实现的，所以查询比较快，但是增删比较慢，具有以下自身方法：

+ `boolean add(E)` 一定是 true
+ `clear()` 清空集合中的元素
+ `contains()` 判断是否包含该元素
+ `boolean isEmpty()` 判断是否为空，空则为true
+ `int size()` 返回元素个数
+ `Object[] toArray()` 将集合转换成数组，打印时需要向下转型
+ `addAll(collection c)`将整个集合当成一个对象添加到集合中
+ `containsAll(collection c)`判断调用的集合是否包含传入的集合
+ `removeAll(collection c)`删除两个集合中的交集，没有交集则返回false
+ `retainsAll(collection c)`获取集合中的交集，调用的集合改变则返回true,否则返回false，具体看调用集合的值调用完后是否和调用前一样

LinkedList 是链表实现的，所以增删比较快，查询比较慢，具有以下自身方法：

+ `addFirst(E)` - 添加元素到头部
+ `addLast(E)` - 添加元素到尾部

### Set

Set 是存储无序的，不可以重复的元素，也有多种实现，都继承 Set 接口，本身有自己的的实现方法：

+ boolean add(E e);
+ boolean addAll(Collection<? extends E> c);
+ boolean remove(Object o);
+ boolean removeAll(Collection<?> c);
+ void clear();
+ size()
+ boolean isEmpty();
+ boolean contains(Object o);
+ boolean containsAll(Collection<?> c);
+ boolean retainAll(Collection<?> c);
+ boolean equals(Object o);
+ int hashCode();

HashSet 是用哈希表实现的，不能通过类似角标的方式获取元素

LinkedHashSet 是用链表实现的，是 Set 集合中唯一一个能够保证怎么存就怎么取出的集合

TreeSet 是用二叉树实现的，于 HashSet 不同的是，TreeSet 具有排序功能

## Vector

Vector 是由数组实现的一个类似动态数组的功能

## 迭代器

可以用来迭代集合中的元素，集合需要调用返回迭代器对象的方法。每个集合内部存储结构是不同的，因此在每个集合中实现`hasNext()`和`Next()`方法是臃肿的，迭代器是将这样的方法向上抽取接口，然后在每个集合内部实现自己定义的迭代方式，就能规定所有的集合遵守实现`hasNext()`和`Next()`方法

```java
HashSet a = new HashSet();
a.iterator();

while(a.hasNext()) {
  a.next()
}
```

<!-- to be update -->