---
title: 数据结构
category: 编程语言
tag: [Java]
article: false
order: 2
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

## 字符串

字符串本质上是 Unicode 字符序列，比如`"Hello"`是由五个字符组成。在标准类库中提供了一个预定义的类`String`，每一个通过`""`括起来的字符串都是 String 类的一个实例

允许 + 号连接两个字符串，当一个字符串与一个非字符串的值进行拼接时将会被转换为字符串进行拼接

也可以修改字符串变量的引用，但字符串本身是不可修改的，应该提取需要的字符在拼接上替换的字符串来修改

`equlas()`方法可以检测两个字符串是否相等，`equlasIgnoreCase()`方法是不区分大小写的

不应该使用`==`检测字符串是否相等，因为这个运算符只能比较两个字符串之间的引用是否相等

空串表示长度为`0`的字符串，通过字符串对象的`length()`方法返回

字符串变量也可以存放特殊值`null`，表示这个变量没有和任何对象进行关联

### StringBuilder 和 StringBuffer

有时候需要由较短的字符串构建，比如来自按键或者文件中的单词，采用字符串连接的方式效率比较低，每次连接字符串都会构建一个新的字符串对象，即耗时，又浪费空间，而使用 StringBuilder 类就可以避免这个问题

```java
StringBuilder builder = new StringBuilder();
builder.append(str);
builder.append(ch);
builder.toSring();
```

通过 StringBuilder 类构建一个空的字符串构造器，当需要添加内容时就调用`append()`方法，在需要构建字符串时就调用`toString()`方法

在 5.0 版本中引入了 StringBuilder 类，前身是 StringBuffer，它的效率有点低，但允许多线程的方式进行字符串的编辑，如果字符串都在单线程中编辑，则应该使用 StringBuilder 替代，他们的 API 都是相同的

+ int length()
+ append(str)
+ insert(offset, str)
+ delete(offset, str)
+ toString()

### String API

+ char charAt(int index)：返回指定位置的字符
+ int codePointAt(int index)：返回指定位置字符的 ASCII 码
+ boolean equals(Object obj)：比较字符串是否相等
+ boolean startsWith(String str)/endWith(String str)：以 suffix 开头或结尾，则返回 true
+ int indexOf(String str)：返回匹配到的第一个子串的开始位置，不存在则返回 -1
+ lastIndexOf(String str)：返回匹配到的最后一个子串的开始位置，不存在则返回 -1
+ int length()：返回字符串长度
+ String replace(String oldString, String newString)：替换原始字符串中的 oldString，并返回新的字符串
+ String substring(int beginIndex, int endIndex)：从指定位置开始截取字符串返回
+ String toLowerCase()：将大写字母改为小写并返回
+ String toUpperCase()：将小写字符改为大写并返回
+ String trim()：返回删除了头部和尾部空格的字符串
+ String String.join(CharSequence delimiter, elements)：通过分隔符连接数组或集合返回

::: tip
CharSequence 是一种接口类型，所有的字符串接口都属于这个接口
:::

## 集合

集合只能存储引用数据类型，存储基本类型会自动装箱，集合长度可以随着元素的增长而增长，这是它和数组的区别

所有类型的集合继承`Collection`接口

### List

List 是存储有序的，可以重复的元素，List 在 Collection 基础上的方法：

+ `void add(int index, E element)`
+ `E remove(int index)`
+ `E get(int index)`
+ `E set(int index, E element)`

### ArrayList

ArrayList 是数组实现的，查询快，增删慢，具有以下自身方法：

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

### LinkedList

LinkedList 可以被用作栈，队列，增删快，查询慢，：

+ `addFirst(E)` - 添加元素到头部
+ `addLast(E)` - 添加元素到尾部
+ `removeFirst()` - 移除头部元素并返回
+ `removeLast()` - 移除尾部元素并返回

### Queue

<!-- todo -->

### Map

<!-- todo -->

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

<!-- todo -->

## 迭代器

可以用来迭代集合中的元素，集合需要调用返回迭代器对象的方法。每个集合内部存储结构是不同的，因此在每个集合中实现`hasNext()`和`Next()`方法是臃肿的，迭代器是将这样的方法向上抽取接口，然后在每个集合内部实现自己定义的迭代方式，就能规定所有的集合遵守实现`hasNext()`和`Next()`方法

```java
HashSet a = new HashSet();
a.iterator();

while(a.hasNext()) {
  a.next()
}
```

<!-- todo -->