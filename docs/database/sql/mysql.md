---
title: MySQL 
category: 数据库
author: JQiue
article: false
---

::: info 前置知识

+ SQL
:::

## 介绍

## 安装和启动

Linux 下的安装方式，如果发行版是 ubuntu，则使用`apt install mysql-server`安装即可

通过`apt`安装的`mysql`是默认开启服务的，并且服务名叫`mysql`，而不是`mysqld`，所以不需要启动以及设置开机启动

使用`mysql`进入数据库中，`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';`重置默认密码，然后`FLUSH PRIVILEGES;`刷新权限。至此，密码已经修改完毕

如果要远程登录就必须创建一个允许远程访问的账户，`create user 'root'@'%' identified by '账户密码';`，为什么有两个`root`账户？这是因为其中的一个`root`账户的`host`为`localhost`，只允许从本地登录，而增加一个`%`表示可以从任意计算机上登录。接下来使用`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;`进行授权，然后`FLUSH PRIVILEGES;`刷新一下权限

可以下面命令通过查看一下用户情况：

```sh
mysql> use mysql
mysql> select host,user,authentication_string from user;
mysql> select host,user,authentication_string from user;
+-----------+------------------+------------------------------------------------------------------------+
| host      | user             | authentication_string                                                  |
+-----------+------------------+------------------------------------------------------------------------+
| %         | root             | $A$005$m]QeCR{dSh|AZelCiG5j0JCQRPLB8kEnL/L3c8XbgfCUqOzrwvUnXT6ZWdw8 |
| localhost | debian-sys-maint | $A$005$9A:JcO~LH{ 0j{oq.wFLCUBRmM9FUuOzSmqQHa1Pqw0JGw9l7HzqpaBNo3 |
| localhost | mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
| localhost | mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
| localhost | mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
| localhost | root             | *1501FA4196482BD9AD6ACD6CC58E5C070C4D1DD5                              |
+-----------+------------------+------------------------------------------------------------------------+
6 rows in set (0.00 sec)
```

一般情况下，MySQL 的配置文件是禁止了远程登录，所以需要去修改一下配置文件，编辑`sudo /etc/mysql/mysql.conf.d/mysqld.cnf`文件，将`bind-address = 127.0.0.1`使用`#`注释掉，然后`sudo service mysql restart`即可

## 创建第一个数据库

当进入数据库系统后，就可以使用 SQL 语句来操作数据库了

```sql
CREATE DATABASE db_test;
```

如果没有例外，MySQL 会将`db_test`列出到数据库列表中，可以使用`show databases;`列出当前系统中所有的数据库，不要奇怪为什么还有除`db_test`以外的数据库，这些都是自带的，只需要关心自己创建的`db_test`就好

其实这个数据库是有问题的，因为它没有指定编码，可能会影响到后续的使用，为了指定编码，就应该先删除掉，然后再重新创建，结合`CHARACTER SET`语句重新创建一个指定编码的数据库

```sql
DROP DATABASE db_test;
CREATE DATABASE db_test CHARACTER SET utf8;
```

接下来的操作就是如何选择一个数据库使用，进行后续的操作，使用`use`语句，它将进入到指定的数据库中，然后就可以进行表相关的操作

```sql
use db_test;
```

## 数据类型

+ double - 浮点型
+ char - 定长字符串（空间固定）
+ varchar - 可变字符串
+ text - 长文本字符串
+ blob - 二进制
+ date - 日期
+ time - 时间
+ datetime - 日期时间

::: tip
在 MySQL 中，字符和日期都需要用单引号表示
:::

## 创建一个表

在使用`use`选择了一个数据库后，就可以在这个数据库下创建一个表了，我们创建一个`t_student`表

```sql
CREATE TABLE t_student( 
  id INT, 
  name VARCHAR(40), 
  birthdate DATE, 
  gender CHAR(1), 
  class_id INT
);
```

如果不使用`use`指定数据库，也可以通过`database.table`这种语法来操作一个表，这对于忘记指定使用的数据库非常有用，它可以在任何需要引用表的地方使用

```sql
CREATE TABLE db_test.t_student( 
  id INT, 
  name VARCHAR(40), 
  birthdate DATE, 
  gender CHAR(1), 
  class_id INT
);
```

表中的每一个字段都要用`,`分隔，且每个字段必须指定一个数据类型，显然这张表做得很好，看起来没什么问题，但实际上这张表非常不完整，因为它缺少约束，非常不利于规范化，首先再次移除掉这张表，使用`drop`

```sql
DROP TABLE s_student;
```

然后重新设计一下表，最好有主键，以及其他的相关约束

```sql
CREATE TABLE db_test.t_student (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(40) NOT NULL,
  birthdate date NOT NULL,
  gender char(1) NOT NULL,
  class_id int(11) NOT NULL
);
```

## 字段约束

+ 主键约束：`PRIMARY KEY`
+ 外键约束：`FOREIGN KEY`
+ 非空约束：`NOT NULL`，数据不能为空
+ 唯一约束：`UNIQUE`，数据不能重复
+ 默认值：`DEFAULT`，指定默认数据
+ 自动增长：`AUTO_INCREMENT`，只能用于主键
+ 注释：`COMMENT`
+ 插入时间戳：
+ 更新时间戳：

## 插入、删除、修改、查找

## 内置函数

+ `count()` - 求次数
+ `min()` - 求最小值
+ `max()` - 求最大值
+ `sum()` - 求和
+ `sqrt()` - 求平方根
+ `rand()` - 生成随机数
+ `concat()` - 拼接字符串

### 自定义函数

## 关系模型

+ 主键
+ 外键
+ 索引

## 事务

## 索引

索引好比一本书的目录，能够快速定位到一些特定的值，从而加快数据查询的效率，如果不使用所有，就必须从最开始的地方进行扫描，直到把所有的数据扫描完，才能找到想要的数据

但是索引不是万能的，有时候反而会让效率变低，索引的价值就是在海量的数据中找到想要的数据，如果数据量较少，那么是否使用索引反而对结果的影响不大

索引有很多种类，从功能上来说，主要有 4 种：

+ 普通索引
+ 唯一索引
+ 主键索引
+ 全文索引

普通索引是基础的索引，没有任何约束，主要⽤于提⾼查询效率。唯⼀索引就是在普通索引的基础上增加了数据唯⼀性的约束，在⼀张数据表⾥可以有多个唯⼀索引。主键索引在唯⼀索引的基础上增加了不为空的约束，也就是NOT NULL+UNIQUE，⼀张表⾥最多只有⼀个主键索引。全⽂索引⽤的不多，MySQL ⾃带的全⽂索引只⽀持英⽂。通常可以采⽤专⻔的全⽂搜索引擎，⽐如 ES(ElasticSearch) 和 Solr

从物理存储上来分，有 2 种：

+ 聚集索引
+ 非聚集索引

聚集索引可以按照主键来排序存储数据，这样在查找⾏的时候⾮常有效。举个例⼦，如果是⼀本汉语字典，我们想要查找“数”这个字，直接在书中找汉语拼⾳的位置即可，也就是拼⾳“shu”。这样找到了索引的位置，在它后⾯就是我们想要找的数据⾏

在数据库系统会有单独的存储空间存放⾮聚集索引，这些索引项是按照顺序存储的，但索引项指向的内容是随机存储的。也就是说系统会进⾏两次查找，第⼀次先找到索引，第⼆次找到索引对应的位置取出数据⾏。⾮聚集索引不会把索引指向的内容像聚集索引⼀样直接放到索引的后⾯，⽽是维护单独的索引表（只维护索引，不维护索引指向的数据），为数据检索提供⽅便。我们还以汉语字典为例，如果想要查找“数”字，那么按照部⾸查找的⽅式，先找到“数”字的偏旁部⾸，然后这个⽬录会告诉我们“数”字存放到第多少⻚，再去指定的⻚码找这个字

### 创建索引

创建普通索引：

```sql
create index key_name on table_name(column);
```

创建唯一索引：

```sql
create unique index key_name on table_name(column);
```

创建全文索引：

### 删除索引

```sql
DROP INDEX key_name ON table_name; 
```

### 查看索引

该语句会显示表中所有的索引

```sql
show index from table_name;
```

这是查询后的一些参数：

参数|解释
---|---
Table | 表示创建索引的数据表名，这里是 tb_stu_info2 数据表
Non_unique | 表示该索引是否是唯一索引。若不是唯一索引，则该列的值为 1；若是唯一索引，则该列的值为 0
Key_name | 表示索引的名称
Seq_in_index | 表示该列在索引中的位置，如果索引是单列的，则该列的值为 1；如果索引是组合索引，则该列的值为每列在索引定义中的顺序
Column_name | 表示定义索引的列字段
Collation | 表示列以何种顺序存储在索引中。在 MySQL 中，升序显示值“A”（升序），若显示为 NULL，则表示无分类
Cardinality | 索引中唯一值数目的估计值。基数根据被存储为整数的统计数据计数，所以即使对于小型表，该值也没有必要是精确的。基数越大，当进行联合时，MySQL 使用该索引的机会就越大
Sub_part | 表示列中被编入索引的字符的数量。若列只是部分被编入索引，则该列的值为被编入索引的字符的数目；若整列被编入索引，则该列的值为 NULL
Packed | 指示关键字如何被压缩。若没有被压缩，值为 NULL
Null | 用于显示索引列中是否包含 NULL。若列含有 NULL，该列的值为 YES。若没有，则该列的值为 NO
Index_type | 显示索引使用的类型和方法（BTREE、FULLTEXT、HASH、RTREE）
Comment | 显示评注

## 在各种语言平台上使用

+ Java
+ Node.js
+ Python

在 Node.js 中使用需要先安装 MySQL 模块

```sh
npm i mysql
```

```js
const mysql = require('mysql');

// 数据库配置
const options = {
  host: 'localhost',
  user: 'root', 
  password: '123456',
  database: 'mydb'
}

// 创建连接对象
const connection = mysql.createConnection(options);

// 发送 SQL 语句并在回调中处理结果
connection.query(`insert into foo (name) value ('zs')`, (error, result) => {
  console.log(result);
});
```
