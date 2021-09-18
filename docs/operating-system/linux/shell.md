---
title: shell
category: 操作系统
tags: [Linux, Alpha]
author: JQiue
article: false
---

shell 是运行在终端上的文本互动程序，bash 是最常用的一种 shell，是大多数 Linux 发行版的默认 shell。所有的输入都交给 shell，它会解释其中的内容，并执行对应的操作

::: tip
所有的任何命令都不会被直接执行，会先扩展，然后执行
:::

+ `ls -al`：打印当前目录中的所有文件，包括隐藏的文件
+ `ls -altr`：打印当前目录中所有的文件，但是打印的顺序是最后修改的文件在最后面
+ `cat <file>`：打印出文件信息
+ `echo Hello, $LOGNAME!`：输出一个字符串，并用环境变量`$LOGNAME`替换`Hello, $LOGNAME`中的对应文本
+ `echo 'echo Hello, $LOGNAME!' >> <file>`：将`echo Hello, $LOGNAME!`添加到文件
+ `cp -v <file> <new_file>`：复制一个文件到另一个文件，`-v`参数会给这个命令显示更详细的输入
+ `tail -n 5 <file>`：从文件中精确打印最后 5 行
+ `history -w`：将所有输入过的命令历史写入到`.bash_history`文件
+ `exit`：关闭对话终端

`.`和`..`是特殊的目录，表示当前目录和父目录

## 文件处理

当然，在 Linux 中一切皆文件，自然产生了对文件的各种操作

+ `pwd`：获取当前路径，`~`表示在自己的`home`中，它是主目录的缩写
+ `ls`：显示所有当前目录的东西，除了隐藏文件，以`.`开头的都是隐藏文件
+ `ls -a`：显示所有文件，包括隐藏文件
+ `ls .*`：以短格式打印目录中的文件
+ `cp -v .bash_history{,1}`：将`.bash_history`复制到`.bash_history1`文件，这很简单，因为前面说过 Bash 有扩展功能，有一组规则定义如何处理`{1,2,3}`这样的结构。Bash 只会接收花括号前的参数，并向参数添加花括号中的所有东西，在本例中，第一个参数是空的，只是变成了`.bash_history`，然后 Bash 添加了`1`，扩展后就变成了`.bash_history1`，因此`cp`接受的参数实际上为`cp -v .bash_history .bash_history1`
+ `mv <file1> <file2>`：移动`file1`到`file2`，会将`file2`覆盖掉，因此不再有`file2`
+ `rm <file>`：删除文件，没有任何提示，最好添加`-v`参数获得提示
+ `touch <file>`：更新目标文件的时间戳

## 环境变量

## 任务控制

## 程序退出代码
