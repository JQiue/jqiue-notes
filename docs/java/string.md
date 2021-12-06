---
title: 字符串
category: 编程语言
tags: [Alpha]
author: JQiue
article: false
---

字符串本质上是 Unicode 字符序列，比如`"Hello"`是由五个字符组成。在标准类库中提供了一个预定义的类`String`，每一个通过`""`括起来的字符串都是 String 类的一个实例

允许 + 号连接两个字符串，当一个字符串与一个非字符串的值进行拼接时将会被转换为字符串进行拼接

也可以修改字符串变量的引用，但字符串本身是不可修改的，应该提取需要的字符在拼接上替换的字符串来修改

`equlas()`方法可以检测两个字符串是否相等，`equlasIgnoreCase()`方法是不区分大小写的

不应该使用`==`检测字符串是否相等，因为这个运算符只能比较两个字符串之间的引用是否相等

空串表示长度为`0`的字符串，通过字符串对象的`length()`方法返回

字符串变量也可以存放特殊值`null`，表示这个变量没有和任何对象进行关联

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

String 类包含了很多方法，但是在标准库中有几千个类，方法数量更是惊人，所以记住所有的类和方法是不可能的，学会查询 API 文档十分有用

## StringBuilder 和 StringBuffer

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
