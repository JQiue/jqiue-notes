---
title: MongoDB
category: 数据库
tag: [MongoDB, NoSQL]
author: JQiue
prev: false
article: false
---

MongoDB 是面向文档的数据库，并不是关系数据库，基本的思路就是将“行”（row）的概念换成更加灵活的“文档”（document）模型。而面向文档的方式可以将文档或数组内嵌进来，所以一条记录可以表示非常复杂的关系

## 数据库（database）

`show databases`语句用于显示已创建的数据库

```sql
show databases;
```

MongoDB 有三个默认的数据库：

+ admin
+ config
+ local

`use`关键字切换当前使用的数据库，当`use`不存在的数据库时不会抱错，会隐式的创建一个数据库，但只有在创建集合的时候才会显示这个数据库

```sql
use database_name
```

`db.dropDatabase()`用于删除当前数据库

```sql
use database_name
db.dropDatabase()
```

## 集合（collection）

`createCollection()`方法会在当前数据库下创建一个集合

```sql
db.createCollection(集合名)
```

`show collections`语句会显示当前数据库中所有的集合

```sql
show collections;
```

`drop()`删除当前数据库下的某个集合

```sql
db.集合名.drop()
```

## 文档（document）

`db.集合名.insert()`可以插入一条数据，格式为键值对形式，为了方便，MongDB 允许插入时 key 不加引号，会自动加上,这条语句也会隐式的创建一个数据库

在插入的同时，MongoDB 会为每条数据添加一个唯一的`_id`键，可以在插入的同时增加`_id`键实现覆盖，但并不推荐

::: tip _id 的组成
`_id`的值由时间戳，机器码，PID，计数器组成，所以它是全球唯一的都不过分
:::

可以以传递数组的方式来插入多条数据

```sql
db.集合名.insert([
  {},
  {},
  ...
])
```

MongoDB 底层是用 JavaScript 引擎实现的，支持部分 JavaScript 语法，于是：

```javascript
for (var i = 1; i < 10; i++){
  db.集合名.insert(...)
}
```

`db.集合名.find()`可以查看该集合中的数据，如果不传入参数，将会查询所有的数据

第二个参数可以控制查询的列，如果`{列名:1}`，只查询该列数据，如果`{列名:0}`，则查询除了该列以外的所有列

当条件参数省略时，必须传入一个空对象，比如`db.集合名.find({}, {列名:0})`

运算符|作用
---|---
$gt|大于
$gte|大于等于
$lt|小于
$lte|小于等于
$ne|不等于
$in|值在一个范围内（数组）
$nin|值不在一个范围中（数组）
$inc|递增
$rename|重命名列
$set|修改列值
$unset|删除列
