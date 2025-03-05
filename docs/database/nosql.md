---
title: NoSQL
category: 数据库
tag: ["MongoDB", "Redis", "NoSQL"]
article: false
---

## MongoDB

MongoDB 是面向文档的非关系型数据库管理系统，并不是传统的关系数据库，基本的思路就是将“行”（row）的概念换成更加灵活的“文档”（document）模型。MongoDB 是基于 JSON，而面向文档的方式可以将文档或数组内嵌进来，所以一条记录可以表示非常复杂的关系。学习 MongoDB 需要具备一定的 JavaScript 和 JSON 基础

在开始操作之前必须先了解几个概念：

+ 数据库（Database）
+ 集合（Collection）：相当于关系型数据库中的表
+ 文档（Document）：相当于关系型数据库中的记录

在 NoSQL 中，操作数据库都是通过指令或程序语言来完成的，在 MongoDB 中就是使用 JavaScript 来完成大部分操作

### 安装

::: tabs

@tab:active Windows

+ [MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.1.zip)
:::

### 基本操作

首先在终端上输入`mongo`命令进入 MongoDB 命令行程序，退出使用`eixt`命令

输入`show databases`用于显示已创建的数据库，也可以使用缩写形式`show dbs`，如果没有出现意外，将得到三个默认的数据库：

+ admin
+ config
+ local

使用`use`关键字切换当前使用的数据库，当`use`不存在的数据库时不会报错，会隐式的创建一个数据库，但只有在创建集合的时候才会显示这个数据库，所以这个时候使用`show databases`是不会显示的

```sql
use database_name
```

`db.stats()`方法会将该数据库的状态返回，这里`db`就代表之前`use`过的数据库，是的，这和程序语言中的对象一样。`db.dropDatabase()`用于删除当前数据库

`db.createCollection(name)`方法会在当前数据库下创建一个集合，现在这个数据库中已经具有了结构，可以使用`show dbs`查看了，相应的，`show collections`会显示当前数据库中所有的集合

如果对集合名字不满意，可以使用`db.集合名.renameCollection(新集合名)`进行修改。注意，之前创建的集合，相当于当前`db`的属性了，这超级简单，那么删除该集合也是类似的写法，`db.集合名.drop()`。对应的，想要查看当前集合的状态，也可以使用`db.集合名.stats()`

`db.集合名.insert()`可以插入一条数据，格式为键值对形式，为了方便，MongoDB 允许插入时 key 不加引号，会自动加上

```js
db.users.insert({name: 'zs', age: 23, gender: '男'});
```

::: tip
如果没有创建数据库以及集合，这条语句也会隐式的创建一个数据库和对应的集合，非常高效
:::

`db.集合名.find()`会查询该集合下的所有数据，不出意外的情况下，上述插入命令后的结果应该是这样的：

```js
{ "_id" : ObjectId("6121b78bd865c5bcee1308af"), "name" : "zs", "age" : 23, "gender" : "男" }
```

发现除了自己指定的数据以外还有一个自动生成的`_id`键，如果不指定这个键，MongoDB 会为每条数据添加一个唯一的`_id`键，但并不推荐手动指定它

::: tip _id 的组成
`_id`的值由时间戳，机器码，PID，计数器组成，所以它是全球唯一的都不过分
:::

也可以使用传递数组的方式来插入多条数据：

```js
db.集合名.insert([
  {},
  {},
  ...
])
```

现在`db.集合名`具有的方法：

+ count()：返回文档数量
+ stats()：返回集合的状态
+ remove()：删除数据
+ find()：查询数据

### JavaScript 支持

MongoDB 底层是用 JavaScript 引擎实现的，支持部分 JavaScript 语法，于是：

```js
for (let i = 1; i < 10; i++){
  db.集合名.insert(...);
}
```

### 带条件的操作

`db.集合名.find()`可以查看该集合中的数据，如果不传入参数，将会查询所有的数据，现在开始对下面的数据进行待条件的查询

```js
db.users.insert([
  { name: 'zs', age: 23, gender: '男', job: 'IT' },
  { name: 'ls', age: 24, gender: '男', job: '金融' },
  { name: 'ww', age: 25, gender: '女', job: 'IT' },
  { name: 'foo', age: 18, gender: '男', job: '学生' },
  { name: 'bar', age: 18, gender: '女', job: '学生' },
])
```

`find()`方法的第一个参数用来进行条件查询，传入一个对象，比如：

+ 查询指定的数据：`db.users.find({name: 'zs'})`
+ 查询某个范围的数据：`db.users.find({age: {$gt: 18}})`

这是一部分运算符：

| 运算符  | 作用                     |
| ------- | ------------------------ |
| $gt     | 大于                     |
| $gte    | 大于等于                 |
| $lt     | 小于                     |
| $lte    | 小于等于                 |
| $ne     | 不等于                   |
| $in     | 值在一个范围内（数组）   |
| $nin    | 值不在一个范围中（数组） |
| $inc    | 递增                     |
| $rename | 重命名列                 |
| $set    | 修改列值                 |
| $unset  | 删除列                   |
| /Reg/   | 正则表达式               |
| $or     | 或                       |

第二个参数可以控制查询的返回列，如果`{列名:1/true}`，则只查询该列数据，如果`{列名:0/false}`，则查询除了该列以外的所有列的数据。当条件参数省略时，必须传入一个空对象，比如`db.集合名.find({}, {列名:0})`，如果想要去除`_id`，则应该这样`db.集合名.find({}, {_id: 0})`

还有一个特殊的方法`distinct(列)`用来查询该列中所有不同的值，有相同的值会去除

```js
db.users.distinct("job")

/* Result */
[ "IT", "学生", "金融" ]
```

既然是用对象来控制查询方式，而对象是一种复杂结构，也就存在复杂的查询条件

```js
/* age 大于 18，并且 job 为 'IT' 的数据 */
db.users.find({
  age: {$gt: 18}, 
  job: 'IT'
})
```

```js
/* age 大于 18，或者 job 为 'IT' 的数据 */
db.users.find({
  $or: [ 
    {age: {$gt: 18}},
    {job: 'IT'}
  ]
})
```

### 文档方法

`sort()`会根据指定字段进行升序或降序排序

```js
/* 按照 age 升序 */
db.users.find().sort(age: 1)
{ "_id" : ObjectId("6121c02f7f81f8150f9c641b"), "name" : "foo", "age" : 18, "gender" : "男", "job" : "学生" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c641c"), "name" : "bar", "age" : 18, "gender" : "女", "job" : "学生" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c6418"), "name" : "zs", "age" : 23, "gender" : "男", "job" : "IT" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c6419"), "name" : "ls", "age" : 24, "gender" : "男", "job" : "金融" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c641a"), "name" : "ww", "age" : 25, "gender" : "女", "job" : "IT" }

/* 按照 age 降序 */
db.users.find().sort(age: -1)

{ "_id" : ObjectId("6121c02f7f81f8150f9c641a"), "name" : "ww", "age" : 25, "gender" : "女", "job" : "IT" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c6419"), "name" : "ls", "age" : 24, "gender" : "男", "job" : "金融" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c6418"), "name" : "zs", "age" : 23, "gender" : "男", "job" : "IT" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c641b"), "name" : "foo", "age" : 18, "gender" : "男", "job" : "学生" }
{ "_id" : ObjectId("6121c02f7f81f8150f9c641c"), "name" : "bar", "age" : 18, "gender" : "女", "job" : "学生" }
```

`limit()`用来截取指定的数据，当为正数时，正着取，为负时倒着取

`skip()`用来绕过一些数据，当为正数时，正着绕，为负时倒着绕

`findOne()`和`find()`相比它只查询一条数据，其他的没有什么区别

### 更新数据

`update(<filter>, <update>, <option>)`方法用于更新数据，`<filter>`用于过滤一些信息，如果传入空对象会对所有的数据进行更新，`<update>`用于设置需要更新的数据

```js
/* 更新 name 为 bar 的 age 为 19 */
db.users.update(
  { name: 'bar' }, 
  { $set: {age: 19}}
)
```

注意，不使用`$set`运算符直接更新字段的数据，会导致该数据的所有字段变成指定的样子，这非常危险，除`_id`以外的字段都会变成新的

```js
/* 更新 name 为 bar 的字段，该数据的所有字段都被清除，只剩下 age: 19 */
db.users.update(
  { name: 'bar' }, 
  { age: 19 }
)
```

`update`方法只会更新匹配到所有数据中的第一条，如果想要更新匹配到的所有数据，就要添加第三个参数`{ multi: true }`

```js
db.users.update(
  { job: 'IT' },
  { $set: { job: '程序员' }},
  { multi: true }
)
```

## 建立索引

<!-- more -->

```js
db.mobiles.insert({
  brand: '',
  model: '',
  market: '',
  body: {
    size: '',
    weight: '' 
  },
  screen: {
    size: '',
    resolution: '',
    dpi: '',
    material: '',
    refresh: ''
  },
  camera: {
    front: '',
    rear: ''
  },
  os: {
    version: ''
  },
  cpu: {
    model: '',
    gpu: ''
  },
  ram: {},
  rom: {},
  battery: {
    capacity:  '',
    charge:  ''
  },
  network: {
    type: '',
    card: '',
    frequency: ''
  },
  Highlights: ''
})
```

## Redis

最新的软件版本为 6，官方不推荐在 Windows 上使用 Redis，尽管微软维护了一份 3.2.100 版本的，但是好在 GitHub 社区无所不能，有人正在维护 5.0 版本的 Redis 可在 Windows 上安装，地址：[GitHub](https://github.com/tporadowski/redis)，这足够学习使用了
