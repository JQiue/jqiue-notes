---
title: Linux 就随便学学啦
category: 操作系统
tags: [Linux]
author: JQiue
---

巴拉巴拉，阿巴阿巴，省略一大堆，Linux 是一种多用户操作系统

## 不同的发行版

## 目录

Windows 存在盘符的概念，而 Linux 没有盘符概念，只有一个根目录，所有的文件都在`/`下面，每个用户都在`/home`建立自己的文件夹

+ 蓝色表示目录
+ 青色表示链接
+ 黑色表示文件

根目录详解：

+ etc - 存放几乎所有的系统配置文件
+ home - 这是预设的用户主目录
+ bin - 存放最常用的命令程序
+ opt - 存放额外的第三方软件
+ root - 超级用户的主目录
+ usr - 应用程序和文件存放的目录
+ var - 存放经常被修改的文件
+ lib - 存放基本的运行库
+ boot - 存放启动系统的核心文件
+ dev - 存放着外部设备
+ media - 媒介都挂载在这里
+ mnt - 暂时挂载某些东西
+ tmp - 存放临时文件

## 远程登陆

如果买了远程服务器，且系统镜像是 Linux，那么便可以使用 SSH 工具来远程连接，一般输入`用户名@机器地址`，然后输入密码就可以连接成功了，但是有时候远程不允许 SSH 连接，这个时候就要在控制台中进入机器，然后更改系统配置即可

每次连接输入密码太麻烦，可以使用密钥的方式来登录，首先本机使用`ssh-keygen -t ed25519`生成密钥对，然后使用`ssh-copy-id 用户名@机器地址`上传密钥到远程机器，随后输入密码验证一下，以后就可以免密登录了

::: tip
windows 的`cmd`和`powershell`是没有`ssh-copy-id`命令的，最好使用比如 git bash 这样的终端来操作
:::

如果被禁止 SSH 登录 ROOT 账户，则进入远程机采用下面操作：

```sh
sudo vim /etc/ssh/sshd_config
```

找到`PermitRootLogin prohibit-password`行并用`#`注释掉，新添加`PermitRootLogin yes`行，保存编辑退出，使用`sudo service ssh restart`就行了

## shell

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

## vim

vim 是 Linux 自带的一款处理文本的工具，输入`vim`命令，会进入这样的界面

![还没有图片](/)

vim 总是令新手头疼，它不像 Windows 记事本那样是可视化的，vim 是一种模态的编辑器，具有两种模式：

+ 普通模式 - 移动光标执行复制、粘贴和删除等操作
+ 插入模式 - 输入文本

只要记住在大部分时候呆在普通模式即可，只允许短时间进入插入模式，然后立即退出

当使用 vim 打开一个文件后即为普通模式，只需要按下`i`键进入插入模式，以及按下`ESC`回到普通模式

这是普通模式下的按键命令：

+ `h`：光标向左
+ `l`：光标向右
+ `j`：光标向下
+ `k`：光标向上
+ `i`：进入插入模式
+ `o`：在光标下插入一行并进入插入模式
+ `x`：删除光标后面的字符
+ `dd`：删除光标一行
+ `w`：保存文件
+ `:wq`：保存并退出
+ `:q!`：不对文件进行修改并退出

如果想要查看某个文件而不是想修改它，使用 Vim 是有点过度的，这时候就使用另一个文本浏览器 less，输入`less <file>`即可查看，使用熟悉的`j`、`k`命令来浏览文件，退出浏览使用`q`，使用`--ch<enter><enter>`水平滚动（对于放不下的行来说）

## 换源

一般情况下，默认的软件源就足够使用了，但有的软件源比较慢，甚至会连接失败，所以需要换一些国内的源，比如阿里云

首先`cp /etc/apt/sources.list /etc/apt/sources.list.old`备份一下原来的源，然后`vim /etc/apt/sources.list`打开配置源文件，将内容全部替换为阿里云的源：

```
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

保存并退出就可以了

## 端口管理

不要在远程机中通过防火墙程序来控制端口，因为控制台会有专门预设好的防火墙设置，在这里指定规则即可

如果通过远程机防火墙程序控制了规则，可能会导致 SSH 连接工具无法连接的现象发生，这时的防火墙规以远程机优先，而不是控制台，控制台的规则只控制流量的进入

## 文件上传

一般终端都会提供`scp`命令用于机器之间的复制，但这个工具是基于 ssh 的，所以较为安全

```sh
scp 本地文件路径 目标机器:目标机器的文件路径
```

在 Linux 中，一切数据皆文件，而文件必须是人类可读可编辑的，所有在大多数情况下，它们都是纯文本文件，因此有必要学会如何编辑文件

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

Linux 是一个多任务操作系统，意味着可以有很多程序同时运行，对于 bash 来说肯定有很多工具来控制多个任务的执行

+ `Ctrl + z`：将当前非终止程序放到后台并暂停运行，允许继续执行其他命令
+ `jobs`：列出所有的后台程序
+ `fg`：指定程序带到前台运行，需要一个数字参数，可以从`jobs`中获取，如果没有则将最后一个挂起的程序带到前台
+ `bg`：指定后台程序在后台恢复运行，需要一个数字参数，从`jobs`获取，没有则将最后一个挂起的程序恢复
+ `Ctrl + c`：可以停止当前执行的运行的程序
+ `&`：在执行命令后面增加`&`会让这个程序直接在后台挂起并运行
+ `nohup`：在执行命令前面加上使用`nohup`命令，挂起一个程序，在终端断开后不会被杀死

::: tip
在使用`nohup`时，一定要使用`exit`命令正常断开对话，否则是无效的，如果挂起的程序不是一种后台运行的状态也会被终止
:::

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

+ `ps`：显示当前会话启动的进程
+ `ps a`：仅打印于终端（TTY）相关以及通过终端启动的进程
+ `ps x`：显示所有进程
+ `ps ax`：打印所有正在运行的进程
+ `ps axue --forest`：以树的形式打印所有正在运行的进程
+ `kill 45569`：终结 PID 为`45569`的程序运行
+ `top`：实时查看进程变化，监控 Linux 系统状况

```sh
root@VM-4-14-ubuntu:~# ps x
    PID TTY      STAT   TIME COMMAND
      1 ?        Ss     0:01 /sbin/init
      2 ?        S      0:00 [kthreadd]
      3 ?        I<     0:00 [rcu_gp]
      4 ?        I<     0:00 [rcu_par_gp]
      6 ?        I<     0:00 [kworker/0:0H-kblockd]
      9 ?        I<     0:00 [mm_percpu_wq]
     10 ?        S      0:00 [ksoftirqd/0]
     11 ?        I      0:00 [rcu_sched]
     12 ?        S      0:00 [migration/0]
     13 ?        S      0:00 [idle_inject/0]
     14 ?        S      0:00 [cpuhp/0]
     15 ?        S      0:00 [cpuhp/1]
     16 ?        S      0:00 [idle_inject/1]
     17 ?        S      0:00 [migration/1]
     18 ?        S      0:00 [ksoftirqd/1]
     20 ?        I<     0:00 [kworker/1:0H-kblockd]
     21 ?        S      0:00 [kdevtmpfs]
     22 ?        I<     0:00 [netns]
     23 ?        S      0:00 [rcu_tasks_kthre]
     24 ?        S      0:00 [kauditd]
     25 ?        S      0:00 [khungtaskd]
     26 ?        S      0:00 [oom_reaper]
     27 ?        I<     0:00 [writeback]
     28 ?        S      0:00 [kcompactd0]
     29 ?        SN     0:00 [ksmd]
     30 ?        SN     0:00 [khugepaged]
     76 ?        I<     0:00 [kintegrityd]
     77 ?        I<     0:00 [kblockd]
```

每一个进程都有一个唯一的 PID 跟它关联，TTY 是与进程相关联的电传模拟器，允许进程交换信息，STAT 表示当前进程的状态，TIME 表示在 CPU 上执行此进程的时间，COMMAND 是带有参数的程序名称

这是 STAT 可能的进程状态：

状态 | 描述
---|---
D | 不中断睡眠（通常为 IO）。进程繁忙或挂起，不响应信号，例如硬盘已经崩溃，读操作无法完成
R | 运行或可运行（在运行队列中）。进程正在执行中。
S | 中断睡眠（等待事件完成）。例如，终端进程和 Bash 通常处于此状态，等待你键入某些内容
T | 停止，由任务控制信号或由于被追踪。
W | 分页（从 2.6.xx 内核起无效，所以不用担心）
X | 死亡（不应该看到）
Z | 已停止（“僵尸”）进程，已终止，但未被父项收回。这种情况发生在错误终止的进程上
< | 高优先级（对其他用户不好）
N | 低优先级（对其他用户很好）
L | 将页面锁定到内存中（用于实时和自定义 IO）
s | 是会话领导。Linux 中的相关进程被视为一个单元，并具有共享会话 ID（SID）。如果进程 ID（PID）= 会话 ID（SID），则此进程将是会话领导
L | 是多线程的（使用 CLONE_THREAD，例如 NPTL pthreads）
\+ |位于前台进程组。这样的处理器允许输入和输出到电传模拟器，tty

## 系统启动

## 任务调度

## 网络

+ `netstat`：
+ `netstat -a`：列出所有端口
+ `netstat -at`：列出所有 TCP 端口
+ `netstat -au`：列出所有 UDP 端口
+ `netstat -ap`：列出所有端口并显示与程序相关的程序名和 PID

## 性能信息

## 系统信息

+ `df` - 查看文件系统的空间使用情况，只能查看一级文件夹的大小、使用比例、档案系统以及挂载点
+ `df -h` - 查看文件系统的空间使用情况，以`1024`为单位
+ `du` - 可以查看文件以及文件夹的大小，会统计文件大小相加
+ `cat /proc/cpuinfo`：查看硬件配置
+ `lsb_release -a`：查看发行版本
