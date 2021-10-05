---
title: SQL 语法
category: 数据库
tags: [Alpha]
author: JQiue
article: false
prev: false
---

SQL 是一种结构化查询语言，SQL 是专门和数据库进行沟通的语言，它和其它语言（C，Java，JavaScript）不同的是，没有很多单词，因为 SQL 的目的仅仅是提供一种从数据库读写数据的方法

无论是什么数据库管理系统，实际上这些数据库管理系统都在遵循 SQL 语言，它类似于一个标准，在整个计算机世界中，最重要的就是数据，SQL 就是直接与数据打交道的语言，而且 SQL 从诞生至今并没有发送太大的变化，相对于其他语言来说，SQL 的半衰期非常长

SQL 有非常重要的两个标准，分别是 SQL92 和 SQL99，分别代表了 92 年和 99 年颁布的标准，如今使用的 SQL 仍然遵守着这些标准，SQL 是一种通用性强，变化相对少，上手容易的语言

SQL 并不像其他语言那样，学习需要大量的程序基础，它更像是一门英语，就好像用英语单词向数据库进行对话一样，所以 SQL 语言被分为四个部分：

1. DDL（Data Definition Language）数据定义语言，用来定义数据库对象，包括数据库、数据表和列，可以创建、删除和修改数据库和表的结构
2. DML（Data Manipulation Language）数据操作语言，用来操作和数据相关的记录，比如增加、删除、修改数据表中的记录
3. DCL（Data Control Language）数据控制语言，用来定义访问权限和安全级别
4. DQL（Data Query Language）数据查询语言，用来查询想要的记录，它是最重要的一部分，大多数情况下都是在和查询打交道

## DDL

### CREATE

`CREATE`关键字用来定义数据库和表的操作

```sql
-- 创建数据库
CREATE DATABASE database_name;
-- 创建数据库同时指定编码
CREATE DATABASE database_name CHARACTER SET 字符集
-- 创建表
CREATE TABLE table_name (
  column_name1 类型 约束,
  column_name2 类型 约束
)
```

示例：

```sql
CREATE TABLE student (
  id bigint,
  stu_name varchar(50),
  stu_age int
)
```

### ALTER

`ALTER`关键字用来修改数据库和表的操作

```sql
-- 修改数据库
ALTER DATABASE database_name CHARACTER SET 字符集
-- 添加一列
ALTER TABLE table_name ADD column_name 类型;
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

### DROP

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

### INSERT

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

### UPDATE

`UPDATE`用来更新表中的数据

```sql
UPDATE table_name SET column1 = value1, column2 = value2, ...
-- 根据条件语句修改指定列的值
UPDATE table_name SET column1 = value1, column2 = value2, ... where column = value
```

### DELETE

删除所有记录

```sql
DELETE FROM table_name;
```

删除某一条记录

```sql
DELETE FROM table_name where column = value;
```

删除所有记录并截断表的结构

```sql
TRUNCATE TABLE table_name;
```

::: tip DELETE 和 TRUNCATE
`DELETE`只会删除记录，但是表的结构还在
`TRUNCATE`不仅删除记录，也会删除表的结构，然后创建一个新表，速度比`DELETE`快
:::

## DQL

DQL 语句不会对数据进行改变，这个数据会从数据库中读到内存，以这种表的形式查询出来的数据称为虚拟结果集

### SELECT

```sql
SELECT column1, column2, ... FROM table_name; 
```

### 条件查询（WHERE）

条件查询就是根据`where`关键字指定的条件查询，符合条件的才会被查询出来

```sql
SELECT * FROM table_name where column = value;
```

运算符不止有`=`，还有下列可用的运算符：

运算符|描述|例子|解释
---|---|---|---
=|等于|SELECT \* FROM student WHERE stu_name = 'zs'|查询 stu_name 等于 'zs' 的数据
!=|不等于|SELECT \* FROM student WHERE stu_name != 'zs'|查询 stu_name 不等于 'zs' 的数据
<>|不等于|SELECT \* FROM student WHERE stu_name <> 'zs'|查询 stu_name 不等于 'zs' 的数据
<|小于|SELECT \* FROM student WHERE stu_age < 18|查询 stu_age 小于 18 的数据
\>|大于|SELECT \* FROM student WHERE stu_age > 18|查询 stu_age 大于 18 的数据
<=|小于等于|SELECT \* FROM student WHERE stu_age <= 18|查询 stu_age 小于等于 18 的数据
\>=|大于等于|SELECT \* FROM student WHERE stu_age > 18|查询 stu_age 大于等于 18 的数据
BETWEEN...AND...|值在什么范围|SELECT \* FROM student WHERE id BETWEEN 10001 AND 10003|查询 id 值 10001 到 10003 之间的数据
IN(set)|固定范围值|SELECT * FROM student WHERE id IN (10001, 10002, 10003)|查询 id 为`10001`,`10002`,`10003`的值
IS NULL|为空|SELECT \* FROM student WHERE stu_age IS NULL|查询 stu_age 为 NULL 的学生
AND|与|SELECT \* FROM student WHERE id = 10001 AND stu_name = 'zs'|查询 id 为 10001 且 stu_name 为 'zs' 的数据
OR|或|SELECT \* FROM student WHERE id = 10001 OR stu_name = 'zs'|查询 id 为 10001 或 stu_name 为 'zs' 的数据
NOT|非|SELECT 、* FROM student WHERE stu_gender IS NOT NULL|查询 stu_gender 不为 NULL 的数据

### 模糊查询

通过一种相对条件比较模糊的方式来查询数据，使用`LIKE`关键字来构成条件，其中又在条件中提供了几个通配符来配合：

+ _：任意一个字符
+ %：0 ~ n 个字符

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

### 字段控制

```sql
-- DISTINCT 能够对查询的列进行去重
SELECT DISTINCT stu_name FROM student;
-- 列的结果可以做运算得到形成新的列
SELECT stu_age, stu_score, stu_score + stu_age FROM student;
-- 通过 IFNULL() 函数处理为列为空的值，如果为空，则会被视为第二个参数
SELECT stu_age, stu_score, IFNULL(stu_score, 0) + IFNULL(stu_age, 0) FROM student;
```

### 排序

`ORDER BY`关键字可以对结果进行排序

```sql
-- 根据 stu_score 进行升序，默认关键字`ASC`可以省略不写
SELECT * FROM student ORDER BY stu_score;
-- 根据 stu_score 进行降序，添加关键字`DESC`
SELECT * FROM student ORDER BY stu_score DESC;
```

### 聚合函数

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

### 分组

`GROUP BY`可以将列相同的值分为一组，通常和其他查询语句结合使用，单独使用只会查询每组中的第一条数据，意义不大

```sql
SELECT * FROM student GROUP BY stu_gender;
-- GROUP_CONCAT() 用于将每个组的列值拼接成一个集合，MAX() 和 SUM() 会分别对每个组的值进行统计
SELECT GROUP_CONCAT(stu_name), MAX(stu_age), SUM(stu_score) FROM student GROUP BY stu_gender;
SELECT stu_gender, GROUP_CONCAT(stu_score) FROM student WHERE stu_score >= 60 GROUP BY stu_gender HAVING SUM(stu_score) > 190;
```

::: tip WHERE 和 HAVING
HAVING 作用和 WHERE 一样，但只能用于`GROUP BY`，WHERE 会在分组之前进行数据筛选，HAVING 会在分组之后进行数据筛选，同时可以使用聚合函数，WHERE 是不可以的
:::
