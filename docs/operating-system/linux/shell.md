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
+ `shutdown -r now`：立即重启，`now`表示时间
+ `shutdown -h now`：立即关机，`now`表示时间
+ `shutdown -c`：取消已经执行的`shutdonw`命令
+ `reboot`：立即重启，不需要额外的选项
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
+ `rm <folder>`：删除空目录，没有任何提示，最好添加`-v`获得提示，不能删除非空目录
+ `rm -rf <folder>`：删除目录，最好添加`-v`获得提示
+ `touch <file>`：更新目标文件的时间戳

::: tip
对应`rm`来说，一定要加上 verbose 选项，通常是`-v`，不要让自己陷入危险的命令当中
:::

## 环境变量

环境变量是操作系统提供给程序的一些参数，这意味着 shell 中有很多变量设置

有些变量只为当前 shell 设置，这些被称为本地 shell 变量。有一些变量被传递到从当前 shell 启动的每个程序，它们被称为环境变量，可以使用`env`列出

+ `foo="I'm foo"`：创建一个变量`foo`，赋值为`I'm foo`
+ `echo $foo`：打印出变量`foo`，使用`$`来引用变量
+ `set | grep foo`：列出所有环境变量，传递给`grep`，打印出只包含`foo`的行
+ `env | grep foo`：列出所有环境变量，传递给`grep`，打印出只包含`foo`的行
+ `export foo`：导出变量，使`foo`可用于从当前 shell 执行的所有程序
+ `foo=’ls -al‘`：重新对变量赋值
+ `$foo`：单独引用变量会被当作命令看待

不管是`set`还是`env`设置的变量，都只对当前 shell 有效，不会对新的 shell 可见，所以必须修改一些文件来达到永久设置变量的目的

## 语言设置

在 Linux 中，进行语言选择像导出变量一样简单，通过查看这个变量，程序会决定如何跟你交流

+ `echo $LANG`：打印变量`LANG`
+ `locale`：显示当前区域语言
+ `man man`：显示 unix 系统手册
+ `sudo dpkg-reconfigure locales`：重新配置区域设置，因为变化是系统层次，所以要用到`sudo`，使用方向键选择一个语言，按空格选中
+ `export LANG=zh_CN.UTF-8`，修改`Lang`切换区域语言

不出意外，这是`dpkg-reconfigure locales`执行后的结果：

```sh
Package configuration

  ┌─────────────────────────────────────────────┤ Configuring locales ├─────────────────────────────────────────────┐
  │ Locales are a framework to switch between multiple languages and allow users to use their language, country,    │
  │ characters, collation order, etc.                                                                               │
  │                                                                                                                 │
  │ Please choose which locales to generate. UTF-8 locales should be chosen by default, particularly for new        │
  │ installations. Other character sets may be useful for backwards compatibility with older systems and software.  │
  │                                                                                                                 │
  │ Locales to be generated:                                                                                        │
  │                                                                                                                 │
  │    [ ] All locales                                                                                          ↑   │
  │    [ ] aa_DJ ISO-8859-1                                                                                     ▮   │
  │    [ ] aa_DJ.UTF-8 UTF-8                                                                                    ▒   │
  │    [ ] aa_ER UTF-8                                                                                          ▒   │
  │    [ ] aa_ER@saaho UTF-8                                                                                    ▒   │
  │    [ ] aa_ET UTF-8                                                                                          ▒   │
  │    [ ] af_ZA ISO-8859-1                                                                                     ▒   │
  │    [ ] af_ZA.UTF-8 UTF-8                                                                                    ▒   │
  │    [ ] agr_PE UTF-8                                                                                         ▒   │
  │    [ ] ak_GH UTF-8                                                                                          ▒   │
  │    [ ] am_ET UTF-8                                                                                          ▒   │
  │    [ ] an_ES ISO-8859-15                                                                                    ▒   │
  │    [ ] an_ES.UTF-8 UTF-8                                                                                    ▒   │
  │    [ ] anp_IN UTF-8                                                                                         ↓   │
  │                                                                                                                 │
  │                                                                                                                 │
  │                                <Ok>                                    <Cancel>                                 │
  │                                                                                                                 │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```

## 任务控制

## 程序退出代码

## 安装软件包

在 Linux 中，不同发行版的软件包有不同的格式，比如 Ubuntu 的软件包格式是`.deb`，只要在网上看到`.deb`包就意味着它可以被安装到 Ubuntu 上

通常需要先使用`wget`或`curl`工具下载软件包到本地，然后就可以使用`dpkg`程序进行安装：

```sh
sudo dpkg -i <package.deb>
```

但是`dpkg`是基于 Debian 的最低级包管理器，可能无法处理一些依赖关系，通常可以使用`sudo apt install -f`来处理依赖问题

`apt`是 Ubuntu 自带的包管理器，比`dpkg`要更加强大，使用`sudo apt install ./<package.deb>`可以安装本地 deb 软件包，使用相对路径会安装当前目录的 deb 包，否则会尝试从软件源仓库中检索并安装软件包

## 包管理

`apt` 是 Ubuntu 自带的包管理工具，不过通常使用另一种包管理工具`aptitude`来替代：

```
aptitude update             更新可用的包列表
aptitude safe-upgrade       执行一次安全的升级
aptitude full-upgrade       将系统升级到新的发行版
aptitude install <pkgname>  安装包
aptitude remove <pkgname>   删除包
aptitude purge <pkgname>    删除包及其配置文件
aptitude search <string>    搜索包
aptitude show <pkgname>     显示包的详细信息
aptitude clean              删除下载的包文件
aptitude autoclean          仅删除过期的包文件
aptitude versions <pkgname> 显示指定包的版本
```

## 进程处理

## 系统启动

## 任务调度

## 网络

## 性能信息