---
title: SQL
category: 数据库
tag: ["MySQL", "MariaDB"]
article: false
---

SQL 是一种结构化查询语言，SQL 是专门和数据库进行沟通的语言，它和其它语言（C，Java，JavaScript）不同的是，没有很多单词，因为 SQL 的目的仅仅是提供一种从数据库读写数据的方法

无论是什么数据库管理系统，实际上这些数据库管理系统都在遵循 SQL 语言，它类似于一个标准，在整个计算机世界中，最重要的就是数据，SQL 就是直接与数据打交道的语言，而且 SQL 从诞生至今并没有发送太大的变化，相对于其他语言来说，SQL 的半衰期非常长

SQL 有非常重要的两个标准，分别是 SQL92 和 SQL99，分别代表了 92 年和 99 年颁布的标准，如今使用的 SQL 仍然遵守着这些标准，SQL 是一种通用性强，变化相对少，上手容易的语言

SQL 并不像其他语言那样，学习需要大量的程序基础，它更像是一门英语，就好像用英语单词向数据库进行对话一样，所以 SQL 语言被分为四个部分：

+ DDL（Data Definition Language）数据定义语言，用来定义数据库对象，包括数据库、数据表和列，可以创建、删除和修改数据库和表的结构
+ DML（Data Manipulation Language）数据操作语言，用来操作和数据相关的记录，比如增加、删除、修改数据表中的记录
+ DCL（Data Control Language）数据控制语言，用来定义访问权限和安全级别
+ DQL（Data Query Language）数据查询语言，用来查询想要的记录，它是最重要的一部分，大多数情况下都是在和查询打交道

## DDL

`CREATE`关键字用来创建数据库和表

```sql
-- 创建数据库
CREATE DATABASE database_name;
-- 创建数据库同时指定编码
CREATE DATABASE database_name CHARACTER SET 字符集;
-- 如果不存在就创建
CREATE DATABASE IF NOT EXISTS database_name
-- 创建表
CREATE TABLE table_name (
  column_name1 类型 约束,
  column_name2 类型 约束
);
-- 示例
CREATE TABLE student (
  id int,
  stu_name varchar(50),
  stu_age int,
  stu_score int
);
```

`ALTER`关键字用来修改数据库和表的操作

```sql
-- 修改数据库
ALTER DATABASE database_name CHARACTER SET 字符集
-- 添加一列
ALTER TABLE table_name ADD column_name 类型;
-- 删除一列
ALTER TABLE table_name DROP column_name 类型;
-- 修改字段类型
ALTER TABLE table_name MODIFY column_name 类型;
-- 修改表名
RENAME TABLE curent_table_name to new_table_name;
-- 修改列名
ALTER TABLE table_name CHANGE current_column_name new_column_name 类型;
-- 修改字符集
ALTER TABLE table_name CHARACTER SET 字符集;
```

显示创建表的信息

```sql
SHOW CREATE TABLE table_name;
```

::: tip
表的字符集无需特意设置，因为它跟创建数据库时的编码相同
:::

`DROP`关键字用来删除数据库和表的操作

```sql
-- 删除数据库
DROP DATABASE database_name;
-- 删除表
DROP TABLE table_name;
-- 删除一个字段
ALTER TABLE table_name DROP column_name;
```

## DML

`INSERT`用来向表中插入数据

```sql
-- 插入一条数据
INSERT INTO table_name (column1, column2, ...) 
VALUE (value1, value2, ...);
-- 插入多条数据
INSERT INTO table_name (column1, column2, ...) 
VALUES (value1, value2, ...), 
(value1, value2, ...);
-- 可以省略字段名（必须插入所有的字段的值）
INSERT INTO table_name
VALUES (value1, value2, ...), 
```

::: tip
插入数据时，列名与列值的类型、个数、顺序要一一对应，值不能超过列定义的长度，插入字符串和日期时，必须使用单引号
:::

`UPDATE`用来更新表中的数据

```sql
UPDATE table_name SET column1 = value1, column2 = value2, ...
-- 根据条件语句修改指定列的值
UPDATE table_name SET column1 = value1, column2 = value2, ... where column = value
```

`DELETE`删除记录

```sql
-- 默认删除所有的记录
DELETE FROM table_name;
-- 删除某一条记录
DELETE FROM table_name where column = value;
```

`TRUNCATE`删除所有记录并截断表的结构

```sql
TRUNCATE TABLE table_name;
```

::: tip DELETE 和 TRUNCATE
`DELETE`只会删除记录，但是表的结构还在
`TRUNCATE`不仅删除记录，也会删除表的结构，然后创建一个新表，速度比`DELETE`快
:::

## DQL

DQL 语句不会对数据进行改变，这个数据会从数据库中读到内存，以这种表的形式查询出来的数据称为虚拟结果集，`SELECT`是 SQL 中最重要的关键字

这个表为下列查询提供支持：

```sql
CREATE TABLE student (
  id int,
  stu_name varchar(50),
  stu_age int,
  stu_gender varchar(1),
  stu_score int
);
```

`*`查出所有列

```sql
SELECT * FROM student; 
```

查询指定列

```sql
SELECT stu_name, stu_age, ... FROM student; 
```

使用`as`将查询出来的字段指定别名，可以省略不写

```sql
SELECT stu_name AS name, stu_age AS age, ... FROM student; 
SELECT stu_name name, stu_age age, ... FROM student; 
```

### 字段控制

使用`DISTINCT`能够对查询的列进行去重

```sql
SELECT DISTINCT stu_name FROM student;
```

如果查询的列是数字类型可以返回计算后的结果

```sql
-- 列的结果可以做运算得到形成新的列
SELECT age + 10 from student
-- 和其他列进行计算
SELECT math + english from table_name
SELECT stu_age, stu_score, stu_score + stu_age FROM student;
```

通过`IFNULL()`函数处理为列为空的值，如果为空，则会被视为第二个参数

```sql
SELECT stu_age, stu_score, IFNULL(stu_score, 0) + IFNULL(stu_age, 0) FROM student;
```

### 条件查询

条件查询就是根据`where`关键字指定的条件进行查询，符合条件的才会被查询出来

```sql
SELECT * FROM table_name where column = value;
```

运算符不止有`=`，还有下列可用的运算符：

| 运算符           | 描述         | 例子                                                        | 解释                                        |
| ---------------- | ------------ | ----------------------------------------------------------- | ------------------------------------------- |
| =                | 等于         | SELECT \* FROM student WHERE stu_name = 'zs'                | 查询 stu_name 等于 'zs' 的数据              |
| !=               | 不等于       | SELECT \* FROM student WHERE stu_name != 'zs'               | 查询 stu_name 不等于 'zs' 的数据            |
| <>               | 不等于       | SELECT \* FROM student WHERE stu_name <> 'zs'               | 查询 stu_name 不等于 'zs' 的数据            |
| <                | 小于         | SELECT \* FROM student WHERE stu_age < 18                   | 查询 stu_age 小于 18 的数据                 |
| \>               | 大于         | SELECT \* FROM student WHERE stu_age > 18                   | 查询 stu_age 大于 18 的数据                 |
| <=               | 小于等于     | SELECT \* FROM student WHERE stu_age <= 18                  | 查询 stu_age 小于等于 18 的数据             |
| \>=              | 大于等于     | SELECT \* FROM student WHERE stu_age > 18                   | 查询 stu_age 大于等于 18 的数据             |
| BETWEEN...AND... | 值在什么范围 | SELECT \* FROM student WHERE id BETWEEN 10001 AND 10003     | 查询 id 值 10001 到 10003 之间的数据        |
| IN(set)          | 固定范围值   | SELECT * FROM student WHERE id IN (10001, 10002, 10003)     | 查询 id 为`10001`,`10002`,`10003`的值       |
| IS NULL          | 为空         | SELECT \* FROM student WHERE stu_age IS NULL                | 查询 stu_age 为 NULL 的学生                 |
| AND              | 与           | SELECT \* FROM student WHERE id = 10001 AND stu_name = 'zs' | 查询 id 为 10001 且 stu_name 为 'zs' 的数据 |
| OR               | 或           | SELECT \* FROM student WHERE id = 10001 OR stu_name = 'zs'  | 查询 id 为 10001 或 stu_name 为 'zs' 的数据 |
| NOT              | 非           | SELECT \* FROM student WHERE stu_gender IS NOT NULL         | 查询 stu_gender 不为 NULL 的数据            |

### 模糊查询

通过一种相对条件比较模糊的方式来查询数据，使用`LIKE`关键字来构成条件，又在其条件中提供了几个通配符来配合：

+ `_`：任意一个字符
+ `%`：0 ~ n 个字符

```sql
-- 查询任意 2 个字符
SELECT * FROM student WHERE stu_name LIKE '__';
-- 查询以 s 结尾的 2 个字符
SELECT * FROM student WHERE stu_name LIKE '_s';
-- 查询以 z 开头的 2 个字符
SELECT * FROM student WHERE stu_name LIKE 'z_';
-- 查询以 z 开头的 n 个字符
SELECT * FROM student WHERE stu_name LIKE 'z%';
-- 查询以任意字符开头且第二个字符为 u 的任意个字符
SELECT * FROM student WHERE stu_name LIKE '_u%';
-- 查询包含 s 的字符
SELECT * FROM student WHERE stu_name LIKE '%s%';
```

### 排序

默认情况下，数据的排序顺序是不确定的。这意味着查询结果的顺序可能会随着时间、数据插入或其他因素而变化，MySQL 的默认排序规则是基于数据存储的物理顺序。当数据插入到表中时，它们通常按照它们在磁盘上的存储顺序进行排序。然而，这种物理排序并不是可靠的，`ORDER BY`关键字可以对结果进行可靠排序

```sql
-- 根据 stu_score 进行升序，默认关键字`ASC`可以省略不写
SELECT * FROM student ORDER BY stu_score ASC;
-- 根据 stu_score 进行降序，添加关键字`DESC`
SELECT * FROM student ORDER BY stu_score DESC;
```

还可以进行组合排序

```sql
-- 查询 stu_score 按降序排列，如果 stu_score 相同就按升序排列
SELECT * FROM student ORDER BY stu_score DESC, stu_age ASC;
```

### 分组

`GROUP BY`可以将列相同的值分为一组，通常和其他查询语句结合使用，单独使用只会查询每组中的第一条数据，意义不大。分组的目的是为了统计，一般会和聚合函数一起使用

```sql
SELECT * FROM student GROUP BY stu_gender;
-- GROUP_CONCAT() 用于将每个组的列值拼接成一个集合，MAX() 和 SUM() 会分别对每个组的值进行统计
SELECT GROUP_CONCAT(stu_name), MAX(stu_age), SUM(stu_score) FROM student GROUP BY stu_gender;
SELECT stu_gender, GROUP_CONCAT(stu_score) FROM student WHERE stu_score >= 60 GROUP BY stu_gender HAVING SUM(stu_score) > 190;
```

::: tip WHERE 和 HAVING
`HAVING`作用和`WHERE`一样，但只能用于`GROUP BY`，`WHERE`会在分组之前进行数据筛选，`HAVING`会在分组之后进行数据筛选，同时可以使用聚合函数，`WHERE`是不可以的
:::

### limit

`limit`可以限制查询记录的条数，常用于分页

```sql
-- 只查询三条
SELECT * FROM student limit 3;
-- 从第 2 条开始，只显示 6 条
SELECT * FROM student limit 2, 6;
```

### SELECT 的书写和执行顺序

+ 书写：SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT
+ 执行：FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT

### 联合查询

联合查询可以将多个表的结果集结果合并在一起，但不会产生额外列，列数和列类型必须相同

```sql

-- 去重
`SELECT * FROM 表1 UNION SELECT * FROM 表2`
-- 选取所有值
`SELECT * FROM 表1 UNION ALL SELECT * FROM 表2`
```

### 连接查询

`SELECT`可以同时查询多个表，这时结果会是一个笛卡尔积，会产生额外列

::: tip 笛卡尔积
两个集合 X 和 Y 的笛卡尔积，表示为 X × Y ，第一个对象是 X 的成员而第二个对象是 Y 的所有可能有序对的其中一个成员
:::

查询多个表时，最好主键保持一致，即`WHERE 表1.id = 表2.id`

```sql
-- 直接连接：产生笛卡尔积
SELECT * FROM student, class
-- 内连接唯一字段：产生两表的交集
SELECT * FROM student JOIN class ON student.class_id = class.id
-- 左连接唯一字段：返回包括左表的所有记录和右表字段相等的记录
SELECT * FROM student LEFT JOIN class ON student.class_id = class.id
-- 右连接唯一字段：返回包括右表的所有记录和左表字段相等的记录
SELECT * FROM student RIGHT JOIN class ON student.class_id = class.id
-- 左连接非唯一字段：产生笛卡尔积
SELECT * FROM student JOIN class ON student.class_id = class.id
```

得出结论，当连接查询时，当连接 on 条件是非唯一字段时，会出现笛卡尔积(局部笛卡尔积)。当连接 on 条件是唯一字段时，则不会出现笛卡尔积

### 子查询

一个`SELECT`语句中包含另一个完整的`SELECT`语句，或更多。即把一个表的结果当作新表查询

```sql
SELECT * FROM (SELECT * FROM 表1)
```

## 事务

事务是一组操作的集合，要么全部成功，要么全部执行失败

设置/查看事务提交方式：

```sql
--  为 1 时自动提交，为 0 时手动提交，为全局设置
SELECT @@autocommit;
SET @@autocommit=0;
```

指定部分语句事务：

```sql
start transaction;

-- 提交事务
COMMIT;

-- 回滚全部事务操作
ROLLBACK;

-- 开始自动提交
BEGIN;
```

## MySQL

| 存储引擎                      | 特点                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| MyISAM（5.5.5之前默认的引擎） | 插入数据快，空间利用率高，功能少，不支持事务               |
| InnoDB（5.5.5之后默认的引擎） | 支持事务，外键，崩溃修复和并发控制                         |
| Memory                        | 数据都在内存中，速度快，安全性差                           |
| Archive                       | 数据压缩，空间利用率高，插入数据快，不支持索引，查询性能差 |

关系模型：

+ 主键
+ 外键
+ 索引

### 安装，启动以及卸载

::: tabs

@tab:active Ubuntu

```sh
apt install mysql-server
```

通过`apt`安装的`mysql`是默认开启服务以及开机启动的，并且服务名叫`mysql`，而不是`mysqld`

@tab Arch

```sh
pacman -S mysql
```

:::

修改 root 密码

```sh
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
flush privileges;
```

如果要远程设备登录就必须创建一个允许远程访问的账户，为什么有两个`root`账户？这是因为其中的一个`root`账户的`host`为`localhost`，这只允许从本地登录，而增加一个`%`表示可以从任意计算机上登录

```sql
create user 'root'@'%' identified by '账户密码';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

可以通过下面的命令查看一下用户情况：

```sh
mysql> use mysql
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

一般情况下，MySQL 的配置文件禁止了远程登录，所以需要去修改一下配置文件，编辑`sudo /etc/mysql/mysql.conf.d/mysqld.cnf`文件，将`bind-address = 127.0.0.1`使用`#`注释掉，可能是在`[mysqld]`字段下，然后`sudo service mysql restart`即可

可以使用`show databases;`列出当前系统中所有的数据库，使用`use`语句，它将进入到指定的数据库中，然后就可以进行表相关的操作

Ubuntu 可以使用以下命令干净的卸载掉：

```sh
apt autoremove --purge mysql
```

```sql
use db_test;
```

### 数据类型

字段类型对于数据库优化特别重要

+ char - 定长字符串（空间固定），空的地方使用空格填充
+ varchar - 可变字符串
+ text - 长文本字符串
+ int - 整型
+ double - 浮点型，如`double(5, 2)`表示最多5位，其中必须有两位小数
+ date - 日期
+ time - 时间
+ datetime - 日期时间
+ blob - 二进制

::: tip
字符和日期都需要用单引号表示
:::

### 字段约束

+ 主键约束：`PRIMARY KEY`
+ 外键约束：`FOREIGN KEY`
+ 非空约束：`NOT NULL`，数据不能为空
+ 唯一约束：`UNIQUE`，数据不能重复
+ 默认值：`DEFAULT`，指定默认数据
+ 自动增长：`AUTO_INCREMENT`，只能用于主键
+ 注释：`COMMENT`
+ 插入时间戳：
+ 更新时间戳：

### 表的操作

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

### 函数

MySQL 有一些内置函数共给使用

```sql
-- COUNT() 统计列不为空的记录数
SELECT COUNT(*) FROM student;
-- 统计该列不为空的记录数
SELECT COUNT(stu_age) FROM student;
-- SUM() 对列进行求和
SELECT SUM(stu_score) FROM student;
-- AVG() 求出列的平均值
SELECT AVG(stu_score) FROM student;
-- MAX() 返回列的最大值
SELECT MAX(stu_score) FROM student;
-- MAX() 返回列的最小值
SELECT MIN(stu_score) FROM student;
```

聚合函数会产生单个值，这些值可以为更复杂的查询创造条件，比如子查询

+ `sqrt()` - 求平方根
+ `rand()` - 生成随机数
+ `concat()` - 拼接字符串
+ `IFNULL(v1,v2)` - 如果 v1 为 NULL，则返回 v2

更多函数：<https://www.hxstrive.com/tools/command_manual_mysql.htm>
  
MYSQL 中可以自定义函数

### 日期操作

```sql
select now()        -- 获取当前具体的日期和时间 2019-11-13 16:38:20
select curdate()    -- 获取当前日期 2019-11-13
select curtime()    -- 获取当前时间 6:38:20
select date_add(now(), interval 1 year);    -- 加1年
select date_add(now(), interval 1 month);   -- 加1月
select date_sub(now(), interval 1 year);    -- 减1年
select datediff('20230220', now());         -- 返回两个日期相差的天数
```

### 索引

索引是数据库中对某一列或多个列的值进行预排序的数据结构。索引好比一本书的目录，能够快速定位到一些特定的值，从而加快数据查询的效率，如果不使用所有，就必须从最开始的地方进行扫描，直到把所有的数据扫描完，才能找到想要的数据

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

创建普通索引：

```sql
create index key_name on table_name(column);
```

创建唯一索引：

```sql
create unique index key_name on table_name(column);
```

创建全文索引：

删除索引

```sql
DROP INDEX key_name ON table_name; 
```

该语句会显示表中所有的索引

```sql
show index from table_name;
```

这是查询后的一些参数：

| 参数         | 解释                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Table        | 表示创建索引的数据表名，这里是 tb_stu_info2 数据表                                                                                                             |
| Non_unique   | 表示该索引是否是唯一索引。若不是唯一索引，则该列的值为 1；若是唯一索引，则该列的值为 0                                                                         |
| Key_name     | 表示索引的名称                                                                                                                                                 |
| Seq_in_index | 表示该列在索引中的位置，如果索引是单列的，则该列的值为 1；如果索引是组合索引，则该列的值为每列在索引定义中的顺序                                               |
| Column_name  | 表示定义索引的列字段                                                                                                                                           |
| Collation    | 表示列以何种顺序存储在索引中。在 MySQL 中，升序显示值“A”（升序），若显示为 NULL，则表示无分类                                                                  |
| Cardinality  | 索引中唯一值数目的估计值。基数根据被存储为整数的统计数据计数，所以即使对于小型表，该值也没有必要是精确的。基数越大，当进行联合时，MySQL 使用该索引的机会就越大 |
| Sub_part     | 表示列中被编入索引的字符的数量。若列只是部分被编入索引，则该列的值为被编入索引的字符的数目；若整列被编入索引，则该列的值为 NULL                                |
| Packed       | 指示关键字如何被压缩。若没有被压缩，值为 NULL                                                                                                                  |
| Null         | 用于显示索引列中是否包含 NULL。若列含有 NULL，该列的值为 YES。若没有，则该列的值为 NO                                                                          |
| Index_type   | 显示索引使用的类型和方法（BTREE、FULLTEXT、HASH、RTREE）                                                                                                       |
| Comment      | 显示评注                                                                                                                                                       |

### 备份和还原

MySQL 本身提供了命令用于数据库的备份和还原

`mysqldump`备份所有的数据和结构`-A`参数

```sh
mysqldump -uroot -p -A > /data/mysqlDump/mydb.sql
```

备份多个数据库的数据和结构

```sh
mysqldump -u root -p --databases 数据库1 数据库2 > xxx.sql
```

仅备份结构`-d`参数

```sh
mysqldump -uroot -p mydb -d > /data/mysqlDump/mydb.sql
```

仅备份数据`-t`参数

```sh
mysqldump -uroot -p mydb -t > /data/mysqlDump/mydb.sql
```

还原有两种方式，一种是通过 SHELL：

```sh
mysql -uroot -p < mydb.sql
```

一种是进入 MySQL 命令行通过`source`

```sh
mysql> source mydb.sql
```

### 在各种语言平台上使用

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

在 Java 平台中，首先要导入一个驱动包，然后使用以下代码

```js
Class.forName("com.mysql.jdbc.Driver");
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/database_name", "root", "123456", );
Statement st = connection.createStatement();
int row = st.executeUpdate("insert into foo (name) value ('zs')");
```

## MariaDB

MariaDB 是 MySQL 更好的替代品，是另一种 MySQL 实现

::: tabs

@tab Arch

1. `pacman -S mariadb`
2. `mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql`
3. `chmod -R mysql /var/lib/mysql`
4. `systemctl enable mariadb.service`
5. `systemctl start mariadb.service`

@tab Windows

1. 前往 <https://mariadb.org/download> 下载 MariaDB 的 Windows x86_64 MSI 安装程序
2. 启动安装程序，设置数据库访问密码以及端口号

:::

::: tip 以 root 用户启动
不建议用 root 用户启动，这是没有必要的

这需要额外的工作，安装脚本应该为`mariadb-install-db --user=root --basedir=/usr --datadir=/var/lib/mysql`。执行`mysqld --check`
:::

不需要密码，直接`mariadb -u root -p`登录，修改密码以及远程登录同 MySQL

## SQLite

SQlite 是本次存储的解决方案，不像 MySQL 一样是一个 C/S 架构，它们不是竞争关系，而是一种嵌入式数据库

+ 一致性的文件格式
+ 在嵌入式和移动设备上使用
+ 内部数据库
+ 数据分析
+ 零配置
+ 没有独立的服务器
+ 单一的磁盘文件
+ 平台无关
+ 弱类型

SQLite 大部分操作与其他关系型数据库基本相同，只有部分不同

数据类型：NULL，INTEGER，REAL（浮点），TEXT，BLOB

## 最佳实践

1. 表名使用集合或者不那么理想的复数，用`staff`替代`employees`更好
2. 列名使用单数，避免和表名重复，总是小写
3. 不要使用驼峰命名法
4. 不要使用 DELETE 物理删除数据，而是使用逻辑删除
5. 表示有限状态的字段应该使用 tinyint，而不是 int
6. 不要添加任何外键，而是在应用层解决
7. 关键字总是大写
8. 尽可能使用标准函数，而不是数据库提供商扩展的函数
9. 尽量不选择提供商相关的数据类型，为了移植性
10. 只在真的需要浮点数运算的时候才使用 REAL 和 FLOAT 类型，否则使用 NUMERIC 和 DECIMAL 类型。浮点数舍入误差是个麻烦

## 技巧

+ 蠕虫复制 - 复制一个表的数据到另一个表

```sql
-- 复制 table_1 的结构
CREATE TABLE table_1 like table_2;
-- 插入 table_1 的数据到 table_2
INSERT INTO table_1 SELECT * FROM table_2;
```

## 参考

+ [SQLite 学习手册](https://wizardforcel.gitbooks.io/sqlite-learning-manual/content/index.html)
+ SQLite 权威指南
+ [SQL 样式指南](https://www.sqlstyle.guide/zh/)
