---
title: Linux
category: 操作系统
tag: [Linux]
article: false
---

巴拉巴拉，阿巴阿巴，省略一大堆

## 目录和文件

Windows 存在盘符的概念，而 Linux 则不存在，只有一个根目录，所有的文件都在`/`下面，每个用户都在`/home`建立自己的文件夹

+ 蓝色表示目录
+ 黑色表示文件
+ 白色表示一般文件
+ 青色表示链接
+ 红色压缩文件或者包文件
+ 绿色文件表示可执行文件

根目录解释：

+ etc - 存放几乎所有的系统配置文件
+ home - 这是预设的用户主目录
+ root - 超级用户的主目录
+ bin - 命令程序
+ opt - 第三方软件
+ usr - 应用程序和文件存放的目录
+ var - 存放经常被修改的文件
+ lib - 基本的运行库
+ boot - 启动系统的核心文件
+ dev - 存放着外部设备
+ media - 媒介都挂载在这里
+ mnt - 暂时挂载某些东西
+ tmp - 临时文件

`.`和`..`是特殊的目录，表示当前目录和父目录

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
+ `touch <file>`：创建空白文件

::: tip
对应`rm`来说，一定要加上`verbose`选项，通常是`-v`，不要让自己陷入危险的命令当中
:::

## shell

shell 是运行在终端上的文本互动程序，bash 是最常用的一种 shell，是大多数 Linux 发行版的默认 shell。所有的输入都交给 shell，它会解释其中的内容，并执行对应的操作

+ `ls -al`：打印当前目录中的所有文件，包括隐藏的文件
+ `ls -altr`：打印当前目录中所有的文件，但是打印的顺序是最后修改的文件在最后面
+ `lsof`：列出所有已打开的文件
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

所有的任何命令都不会被直接执行，会先扩展，然后执行。shell 会对当前输入的命令字符串进行处理后才会执行，它会发生在命令执行前，和键入的命令无关。shell 会将命令分割成多个独立的单元，也叫 token，每个 token 都会作为一个独立的单元看待

比如`echo hello`，shell 首先会对该命令进行扩展处理，然后才具体的去执行。shell 提供了一些扩展规则，用于匹配命令字符串并快速的生成，用于提升效率

+ `{}` - 花括号扩展

花括号是首先被执行的扩展，有两种用法：字符串输出、序列输出

比如`echo {a, b}1`会被扩展成`echo a1 b1`，会将命令中的 token 进行扩展填充，这是字符串输出

而序列输出则是按照规则来生成一定范围内的值，比如`echo {1..3}`被扩展成`echo 1 2 3`。还可以按照英文字母顺序，`echo {a..b}`被扩展成`echo a b c`

花括号的扩展很简单，格式是固定的，但是有一些要注意的地方，比如不能够使用`${`，这和其他扩展方式产生了冲突，应该使用`\$`进行转义

## vim

在 Linux 中，一切数据皆文件，而文件必须是人类可读可编辑的，因此有必要学会如何编辑文件。vim 是 Linux 自带的一款处理文本的工具，输入`vim`命令，会进入这样的界面

![还没有图片](https://jinqiu.wang/)

vim 总是令新手头疼，它不像 Windows 记事本那样是可视化的，vim 是一种模态的编辑器，具有两种模式：

+ 普通模式 - 移动光标执行复制、粘贴和删除等操作
+ 插入模式 - 输入文本

只要记住在大部分时候呆在普通模式即可，只允许短时间进入插入模式，然后立即退出。当使用 vim 打开一个文件后即为普通模式，只需要按下`i`键进入插入模式，以及按下`ESC`回到普通模式

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

如果想要查看某个文件而不是想修改它，使用 vim 是有点过度的，这时候就使用另一个文本浏览器 less，输入`less <file>`即可查看，使用熟悉的`j`、`k`命令来浏览文件，退出浏览使用`q`，使用`--ch<enter><enter>`水平滚动（对于放不下的行来说）

## 文件上传

一般终端都会提供`scp`命令用于机器之间的复制，但这个工具是基于 ssh 的，所以较为安全

```sh
scp 本地文件路径 目标机器:目标机器的文件路径
```

## 环境变量

环境变量是操作系统提供给程序的一些参数，这意味着 shell 中有很多变量设置，有些变量只为当前 shell 设置，这些被称为本地 shell 变量。有一些变量被传递到从当前 shell 启动的每个程序，它们被称为环境变量，可以使用`env`列出

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
+ `Ctrl + c`：可以停止当前正在执行的程序
+ `jobs`：列出所有的后台程序
+ `fg <num>`：指定程序带到前台运行，需要一个数字参数，可以从`jobs`中获取，如果没有则将最后一个挂起的程序带到前台
+ `bg <num>`：指定后台程序在后台恢复运行，需要一个数字参数，从`jobs`获取，如果没有则将最后一个挂起的程序恢复
+ `&`：在执行命令后面增加`&`会让这个程序直接在后台挂起运行
+ `nohup`：在执行命令前面加上使用`nohup`命令，挂起一个程序，在终端断开后不会被杀死

::: tip
在使用`nohup`时，一定要使用`exit`命令正常断开对话，否则是无效的，如果挂起的程序不是一种非终止运行的状态也会被终止
:::

## 进程处理

+ `ps`：显示当前会话启动的进程
+ `ps a`：仅打印于终端（TTY）相关以及通过终端启动的进程
+ `ps x`：显示所有进程
+ `ps ax`：打印所有正在运行的进程
+ `ps axue --forest`：以树的形式打印所有正在运行的进程
+ `kill 45569`：终结 PID 为`45569`的程序运行

```sh
root@VM-4-14-ubuntu:~# ps x
    PID TTY      STAT   TIME COMMAND
      1 ?        Ss     0:01 /sbin/init
      2 ?        S      0:00 [kthreadd]
      3 ?        I<     0:00 [rcu_gp]
      4 ?        I<     0:00 [rcu_par_gp]
      6 ?        I<     0:00 [kworker/0:0H-kblockd]
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

| 状态 | 描述                                                                                                                             |
| ---- | -------------------------------------------------------------------------------------------------------------------------------- |
| D    | 不中断睡眠（通常为 IO）。进程繁忙或挂起，不响应信号，例如硬盘已经崩溃，读操作无法完成                                            |
| R    | 运行或可运行（在运行队列中）。进程正在执行中。                                                                                   |
| S    | 中断睡眠（等待事件完成）。例如，终端进程和 Bash 通常处于此状态，等待你键入某些内容                                               |
| T    | 停止，由任务控制信号或由于被追踪。                                                                                               |
| W    | 分页（从 2.6.xx 内核起无效，所以不用担心）                                                                                       |
| X    | 死亡（不应该看到）                                                                                                               |
| Z    | 已停止（“僵尸”）进程，已终止，但未被父项收回。这种情况发生在错误终止的进程上                                                     |
| <    | 高优先级（对其他用户不好）                                                                                                       |
| N    | 低优先级（对其他用户很好）                                                                                                       |
| L    | 将页面锁定到内存中（用于实时和自定义 IO）                                                                                        |
| s    | 是会话领导。Linux 中的相关进程被视为一个单元，并具有共享会话 ID（SID）。如果进程 ID（PID）= 会话 ID（SID），则此进程将是会话领导 |
| L    | 是多线程的（使用 CLONE_THREAD，例如 NPTL pthreads）                                                                              |
| \+   | 位于前台进程组。这样的处理器允许输入和输出到电传模拟器，tty                                                                      |

## 网络

+ `netstat`：
+ `netstat -a`：列出所有端口
+ `netstat -at`：列出所有 TCP 端口
+ `netstat -au`：列出所有 UDP 端口
+ `netstat -ap`：列出所有端口并显示与程序相关的程序名和 PID
| `lsof -i`： 列出打开文件

## 系统启动

## 性能信息

+ `top`：实时查看进程变化，监控 Linux 系统状况
+ `uptime`：查看系统运行了多少时间
+ `free`：查看内存
+ `vmstat`：进程，内存，分页，块 IO，陷阱，磁盘和 cpu 活动的信息

## 系统信息

+ `lsb_release -a`：查看发行版本
+ `cat /proc/cpuinfo`：查看硬件配置
+ `df` - 查看文件系统的空间使用情况，只能查看一级文件夹的大小、使用比例、档案系统以及挂载点
+ `df -h` - 查看文件系统的空间使用情况，以`1024`为单位
+ `du` - 可以查看文件以及文件夹的大小，会统计文件大小相加

## 用户操作

`$`是普通用户，`#`是超级用户

+ `useradd <username>` - 新建用户
+ `userdel <username>` - 删除用户
+ `passwd <username>` - 修改用户名，root 用户可以修改自己和其他用户，其他用户只能修改自己
+ `su <username>` - 切换用户
+ `sudo <cmd>` - 提权这次执行的命令

## 文件权限

对于 Linux 中的每个文件，都有三个权限类。对于每个权限类，有三个权限

类|描述
---|---
用户 | 文件的拥有者。
分组 | 同组用户
其它人 | 任何其他用户或组

这是每个类可分配的权限：

权限 | 符号 | 描述
---|---|---
读 | r-- | 读取文件的能力
写 | -w- | 写入文件的能力
执行 | --x | 将文件作为程序执行的能力，例如 ShellScript 应该设置这个

以及管理权限的命令：

+ `chmod` — 修改文件权限
+ `chown` — 修改所有者
+ `umask` — 修改掩码，以便将权限赋予新创建的文件

## 重定向

`wc -l`会从当前`/dev/tty`读取行，每次按下回车都会回去一行，按下`Ctrl + D`后会告诉输入了多少行。如果想要计算`.bash_history`的行数，可以使用`wl -l < .bash_history`来实现，这会计算该文件的行数。它利用了重定向机制，即将来自键盘输入或到显示器的输出，重定向到另一个文件

+ `<` 用文件替换输入
+ `>` 用文件替换输出
+ `>>`不会覆盖文件，而是追加到末尾
+ `|`从一个程序中获取输出，并连接到另一个程序

我们可以结合各种过滤程序来达到想要的目的：

+ `ls -al | head -n 5`：只打印目录列表中的前 5 个条目
+ `ls -al | tail -n 5`：只打印目录列表中的后 5 个条目
+ `ls -al | awk '{print $8, $9}'`：打印第 8 列 和第 9 列 的条目
+ `ls -al | awk '{print $9, $8}'`：打印第 8 列 和第 9 列 的条目，调换顺序
+ `ls -al | grep bash`：仅打印目录列表中包含 bash 的行
+ `cat ls.out | sed  's/bash/hello/g'`：将所有的`bash`条目替换为`hello`

## 挂载共享目录

在系统上安装`cifs-utils`包

创建一个目录作为挂载点

```sh
mkdir /mnt/win_share
```

开始挂载共享目录

```sh
sudo mount -t cifs -o username=<win_share_user>,password=<password> //WIN_SHARE_IP/<share_name> /mnt/win_share
```

卸载

```sh
umount /mnt/win_share
```

使用凭证文件配置，创建一个文件，比如叫`win-credentials`

```sh
username=<win_share_user>
password=<password>
```

使用文件进行挂载

```sh
sudo mount -t cifs -o credentials=/root/win-credentials //WIN_SHARE_IP/<share_name> /mnt/win_share
```

使用`mount`挂载时，重启不会保留，可以编辑`/etc/fstab`文件，该文件定义了系统启动时挂载什么文件系统

```sh
# <file system>             <dir>          <type> <options>                                                   <dump>  <pass>
//WIN_SHARE_IP/share_name  /mnt/win_share  cifs  credentials=/root/win-credentials,file_mode=0755,dir_mode=0755 0       0
```

使用`mount /mnt/win_share`,该命令将读取`/etc/fstab`的内容并装载共享,下次重新启动系统时，将自动装载 Windows 共享

## 远程登陆

如果买了远程服务器，且系统是 Linux，便可以使用 SSH 工具来远程连接，一般输入`用户名@机器地址`，然后输入密码就可以连接成功了，但是有时候远程不允许 SSH 连接，这个时候就要在控制台中进入机器，然后更改系统配置即可

如果被禁止 SSH 登录 ROOT 账户，则进入远程机采用下面操作：

```sh
sudo vim /etc/ssh/sshd_config
```

找到`PermitRootLogin prohibit-password`行并用`#`注释掉，新添加`PermitRootLogin yes`行，保存编辑退出，使用`sudo service ssh restart`就行了

每次连接输入密码太麻烦，可以使用密钥的方式来登录，首先本机使用`ssh-keygen -t ed25519`生成密钥对，然后使用`ssh-copy-id 用户名@机器地址`上传密钥到远程机器，随后输入密码验证一下，以后就可以免密登录了

::: tip
windows 的`cmd`和`powershell`是没有`ssh-copy-id`命令的，最好使用比如 git bash 这样的终端来操作
:::

## 端口管理

不要在远程机中通过防火墙程序来控制端口，因为控制台会有专门预设好的防火墙设置，在这里指定规则即可

如果通过远程机防火墙程序控制了规则，可能会导致 SSH 连接工具无法连接的现象发生，这时的防火墙规以远程机

## 设置代理

```
# 修改shell配置文件 ~/.bashrc ~/.zshrc等
export http_proxy=socks5://127.0.0.1:1024
export https_proxy=$http_proxy

# 设置setproxy和unsetproxy 可以快捷的开关
# 需要时先输入命令 setproxy
# 不需要时输入命令 unsetproxy
alias setproxy="export http_proxy=socks5://127.0.0.1:1024; export https_proxy=$http_proxy; echo 'HTTP Proxy on';"
alias unsetproxy="unset http_proxy; unset https_proxy; echo 'HTTP Proxy off';
```

## Ubuntu

前往<https://mirrors.tuna.tsinghua.edu.cn/>下载镜像

Ubuntu 的软件源配置文件是`/etc/apt/sources.list`。首先`cp /etc/apt/sources.list /etc/apt/sources.list.old`备份一下原来的源，然后`vim /etc/apt/sources.list`将内容全部替换为 TUNA 的源,即可使用 TUNA 的软件源镜像

```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

## Arch

前往<https://mirrors.tuna.tsinghua.edu.cn/>下载镜像

直接挂载镜像，使用 UEFI 模式启动，然后进入 live-cd 系统，使用`archinstall`命令进行脚本安装

更新软件包缓存：

```sh
sudo pacman -Syy
```

安装一些必要的包：

```sh
pacman -S openssh vim networkmanager git zsh
```

启动服务：

```sh
systemctl start NetworkManager sshd
```

配置 shell，使用更好的 Oh-my-zsh：

1. 使用 curl 下载脚本并安装：`sh -c "$(curl -fsSL <https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh>)"`
2. 同意使用 Oh-my-zsh 的配置模板覆盖已有的`.zshrc`
3. 使用`powerlevel10k`主题,`git clone --depth=1 <https://gitee.com/romkatv/powerlevel10k.git> ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k`
4. 在`.zshrc`设置`ZSH_THEME="powerlevel10k/powerlevel10k"`启用主题
5. 执行`source ~/.zshrc`配置生效
6. 启用`z`获取快速跳转目录的能力，不需要安装，直接在`.zshrc`中设置`plugins=(z)`启用
7. 安装`zsh-autosuggestions`获取命令提示，`git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`，在`.zshrc`中设置`plugins=(zsh-autosuggestions)`
8. 安装`zsh-syntax-highlighting`获取语法检查，`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git`，`echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc`

## 软件包管理

在为软件安装程序之前，有必要了解下面的概念：

+ 源码包 - 不能编译，必须手动编译，并配置才能运行（大佬定制化时使用），一般后缀名为`.tar.gz`
+ 二进制包 - 已经编译过，可以立即执行
+ RPM - 是二进制包的子系列，用来处理二进制包依赖关系，基于软件包管理系统
+ 软件源 - 存放包的仓库，比如阿里云、清华等

一般情况下，默认的软件源就足够使用了，但有的软件源比较慢，甚至会连接失败，所以需要换一些国内的源，比如阿里云

在 Linux 中，不同发行版的软件包有不同的格式，比如 Ubuntu 的软件包格式是`.deb`，只要在网上看到`.deb`包就意味着它可以被安装到 Ubuntu 上

通常需要先使用`wget`或`curl`工具下载软件包到本地，然后就可以使用`dpkg`程序进行安装：

```sh
sudo dpkg -i <package.deb>
```

但是`dpkg`是基于 Debian 的最低级包管理器，可能无法处理一些依赖关系

通常可以使用`sudo apt install -f`来处理依赖问题，`apt`是 Ubuntu 自带的包管理器，比`dpkg`要更加强大，使用`sudo apt install ./<package.deb>`可以安装本地 deb 软件包，使用相对路径会安装当前目录的 deb 包，否则会尝试从软件源仓库中检索并安装软件包，不过通常使用另一种包管理工具`aptitude`来替代：

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
