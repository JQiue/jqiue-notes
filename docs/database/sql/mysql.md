---
title: MySQL 
category: 数据库
tags: [Alpha]
author: JQiue
article: false
---

## 介绍

## 安装

Linux 下的安装方式，如果发行版是 ubuntu，则使用`apt install mysql-server`安装即可

通过`apt`安装的`mysql`是默认开启服务的，并且服务名叫`mysql`，而不是`mysqld`，所以不需要启动以及设置开机启动

`mysql`进入数据库中，`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';`重置默认密码，然后`FLUSH PRIVILEGES;`刷新权限。至此，密码已经修改完毕

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

当进入到 MySQL 数据库系统后，就可以使用下面的语句创建一个数据库了

```sql
CREATE DATABASE db_test;
```

如果没有例外，MySQL 会将`db_test`列出到数据库列表中，可以使用`show databases;`列出当前系统中所有的数据库，不要奇怪为什么还有除`db_test`以外的数据库，这些都是自带的，只需要关心`db_test`就好

其实这个数据库是有问题的，因为它没有指定编码，会影响到后续的使用，为了指定他的编码，就应该先删除掉，然后再创建

```sql
DROP DATABASE db_test;
```

这样就会从系统中删掉它，然后结合`CHARACTER SET`语句重新创建一个指定编码的数据库

```sql
CREATE DATABASE db_test CHARACTER SET utf8;
```

接下来的操作就是如何选择一个数据库使用，进行后续的操作，使用`use`语句，它将进入到指定的数据库中

```sql
use db_test;
```

## 数据类型

+ double：浮点型
+ char：定长字符串（空间固定）
+ varchar：可变字符串
+ text：长文本字符串
+ blob：二进制
+ date：日期
+ time：时间
+ datetime：日期时间

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

表中的每一个字段都要用`,`分隔，且每个字段必须指定一个数据类型，显然这张表做得很好，看起来没什么问题，对吗？但实际上这张表非常不完整，因为它缺少约束，非常不利于规范化，首先再次移除掉这张表，使用`drop`语句

```sql
DROP TABLE s_student;
```

然后重新设计一下表，最好有主键，以及其他的相关约束

```sql
CREATE TABLE db_test.t_student (
  id int(11) NOT NULL PRIMARY KEY,
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
+ 注释：`COMMENT`，
+ 插入时间戳：
+ 更新时间戳：

## 数据的插入、删除、修改、查找

## 函数

+ `count()`：求次数
+ `min()`：求最小值
+ `max()`：求最大值
+ `sum()`：求和
+ `sqrt()`：求平方根
+ `rand()`：生成随机数
+ `concat()`：拼接字符串

### 自定义函数

## 关系模型

1. 主键
2. 外键
3. 索引

## 事务
