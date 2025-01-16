---
title: Linux
article: false
---

Linux 是一种自由开源的类 Unix 操作系统，它具有以下核心特性:

- 多用户多任务支持
- 优秀的系统稳定性和可靠性
- 强大的网络功能和安全特性
- 丰富的开发工具和程序库
- 良好的硬件兼容性
- 活跃的社区支持

主要应用场景：

- 服务器系统
- 个人桌面系统
- 嵌入式设备
- 云计算平台
- 科学计算

Linux 系统主要由以下部分组成:

1. Linux 内核 - 系统核心
2. GNU 工具集 - 基础命令工具
3. 桌面环境 - 图形界面（如 GNOME、KDE）
4. 应用程序 - 各类应用软件

## 发行版

Linux 发行版是指基于 Linux 内核开发的完整操作系统，它们会额外打包一些应用软件并提供生态支持，主要的 Linux 发行版有：

- Debian：非常成熟稳定，用于各种服务器及工作站
- Ubuntu：基于 Debian 开发，桌面版用户体验好，很受个人用户欢迎
- CentOS：免费版本 RHEL，与企业 Linux 流通性好，也常用于服务器
- Fedora：源自 Red Hat，重视开放源代码，内置最新软件版本
- SUSE：来自德国，适用于企业 server 和工作站
- Arch Linux: Rolling 发行版，源代码最新但需自行配置
- Gentoo：源代码编译性能优化，但安装配置难度大
- Deepin：基于 Debian 开发的中文系統，注重视觉交互

### Ubuntu

Ubuntu 安装较为简单，前往<https://mirrors.tuna.tsinghua.edu.cn/>下载镜像，通过 bios 启动 U 盘，直接开始安装

Ubuntu 的软件包格式是`.deb`，只要是`.deb`包就意味着它可以被安装到 Ubuntu 上。`dpkg`是基于 Debian 的最低级包管理器，不会处理一些依赖关系

```sh
sudo dpkg -i <package.deb>
```

`apt`是 Ubuntu 自带的包管理器，会自动处理依赖关系

apt 命令：

+ `apt install` - 安装包，使用相对路径会安装当前目录的 deb 包，否则会尝试从软件源仓库中检索并安装软件包
+ `apt update` - 更新软件包索引
+ `apt upgrade` - 升级所有当前已安装的软件包
+ `apt remove` - 删除一个或多个软件包
+ `apt purge` - 全删除软件包并清除其配置文件
+ `apt search` - 搜索软件包仓库中的可用软件

软件源配置文件是`/etc/apt/sources.list`，首先`cp /etc/apt/sources.list /etc/apt/sources.list.old`备份原来的源，然后`vim /etc/apt/sources.list`将内容全部替换为 TUNA 的源

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

不过通常使用另一种包管理工具`aptitude`来替代：

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

### Arch

Arch 安装较为困难，首先前往<https://mirrors.tuna.tsinghua.edu.cn/>下载镜像

两种安装方式：

1. 直接挂载镜像，使用 UEFI 模式启动，进入 live-cd 系统，使用`archinstall`命令进行脚本安装，较为简单，适合快速部署系统
2. 手动安装

进入 live-cd 系统

+ 禁用 reflector

```sh
systemctl stop reflector.service
```

+ 测试网络连通性

```sh
ping baidu.com
```

+ 更新系统时钟

```sh
timedatectl set-ntp true # 将系统时间与网络时间进行同步
timedatectl status # 检查服务状态
```

+ 更换国内软件源

```sh
vim /etc/pacman.d/mirrorlist
```

推荐源：

```
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch # 中国科学技术大学开源镜像站
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch # 清华大学开源软件镜像站
Server = https://repo.huaweicloud.com/archlinux/$repo/os/$arch # 华为开源镜像站
Server = http://mirror.lzu.edu.cn/archlinux/$repo/os/$arch # 兰州大学开源镜像站
```

+ 通过 lsblk 命令观察磁盘分区情况

::: tip
如果是 NVME 协议的硬盘，则不是 sd(x)，而是 nvme(x)n1
:::

+ 使用 cfdisk 分区

```sh
cfdisk /dev/sdx
cfdisk /dev/nvmexn1
```

+ 创建 EFI 分区，类型为 EFI System
+ 创建 SWAP 分区，将类型改为 Linux swap
+ 创建根目录分区，类型默认
+ 选中 Write，回车确认分区操作
+ 使用 fdisk 或 lsblk 命令复查分区情况

Pacman 是 Arch 的官方软件包管理器，以下是常见的命令：

```sh
# 更新软件包缓存，但不安装
pacman -Syy
# 安装软件包
pacman -S package_name
# 删除软件包
pacman -R package_name
# 搜索软件包
pacman -Ss keyword
# 更新系统（使用 Arch 最好定期更新系统，否则不如用 Ubuntu）
pacman -Syu
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

1. 使用 curl 下载脚本并安装：`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
2. 同意使用 Oh-my-zsh 的配置模板覆盖已有的`.zshrc`
3. 使用`powerlevel10k`主题,`git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k`
4. 在`.zshrc`设置`ZSH_THEME="powerlevel10k/powerlevel10k"`启用主题
5. 执行`source ~/.zshrc`配置生效
6. 启用`z`获取快速跳转目录的能力，不需要安装，直接在`.zshrc`中设置`plugins=(z)`启用
7. 安装`zsh-autosuggestions`获取命令提示，`git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`，在`.zshrc`中设置`plugins=(zsh-autosuggestions)`
8. 安装`zsh-syntax-highlighting`获取语法检查，`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git`，`echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc`

AUR（Arch User Repository）是 Arch 社区维护的软件包存储库，其中包含大量的第三方软件包。允许 Arch 用户共享和安装不在官方仓库中的软件包。它为用户提供了更广泛的软件选择和灵活性

## 根目录

Windows 存在盘符的概念，而 Linux 则不存在，只有一个根目录，所有的文件都在`/`下面，每个用户都在`/home`建立自己的文件夹

+ 蓝色表示目录
+ 黑色表示文件
+ 白色表示一般文件
+ 青色表示链接
+ 红色表示压缩文件或者包文件
+ 绿色表示表示可执行文件

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
+ `rm -rf <folder>`：递归删除目录，最好添加`-v`获得提示，此命令非常危险，不要轻易使用
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
+ `tail -n 5 <file>`：从文件中打印最后 5 行
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
+ `/`：搜索

如果想要查看某个文件而不是想修改它，使用 vim 是有点过度的，这时候就使用另一个文本浏览器 less，输入`less <file>`即可查看，使用熟悉的`j`、`k`命令来浏览文件，退出浏览使用`q`，使用`--ch<enter><enter>`水平滚动（对于放不下的行来说）

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
+ `cat ls.out | sed 's/bash/hello/g'`：将所有的`bash`条目替换为`hello`
+ `git branch -a | grep 'feature' | sed 's/remotes\///g' | xargs git branch -dr`：`xargs`用于将输出作为命令行参数

## 文件上传

一般终端都会提供`scp`命令用于机器之间的复制，这个工具是基于 ssh 的，所以较为安全

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

在 Linux 中，环境变量的加载顺序是非常重要的，不同的加载顺序会导致环境变量的优先级和作用范围发生变化。以下是 Linux 中常见的环境变量加载顺序：

1. /etc/profile - 这是系统级别的配置文件，在系统启动时加载。在这个文件中设置的环境变量对所有用户都生效
2. /etc/environment - 这也是系统级别的配置文件，在系统启动时加载。在这个文件中设置的环境变量对所有用户都生效
3. /etc/profile.d/*.sh - 这个目录下的所有 .sh 脚本文件会在系统启动时被加载。可以在这些脚本文件中设置针对特定服务或应用的环境变量
4. ~/.bash_profile 或 ~/.bash_login 或 ~/.profile - 这些是用户级别的配置文件，在用户登录时加载。在这些文件中设置的环境变量只对当前用户生效
5. ~/.bashrc - 这也是用户级别的配置文件，在每次打开 shell 时加载。在这个文件中设置的环境变量只对当前用户生效。需要注意的是，上述加载顺序是针对使用 Bourne shell 及其衍生 shell (如 bash) 的情况。如果使用其他 shell,如 zsh 或 fish,加载顺序可能会略有不同

另外，对于 systemd 服务，环境变量的加载顺序也会略有不同。通常建议直接在 systemd 服务文件的 [Service] 部分设置环境变量，以确保它们能被正确加载

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

+ `netstat -atup`：列出所有 TCP 和 UDP 端口并显示与程序相关的程序名和 PID
+ `lsof -i`：列出打开文件
+ `fuser -n tcp 80`：查看 80 端口被哪个程序占用

## 系统启动

Systemd 是 Linux 操作系统中用于初始化、管理和监控系统和服务的系统和服务管理器

主要功能：

+ 系统启动和关闭管理
+ 服务和守护进程的启动、停止和重启管理
+ 系统日志和事件管理
+ 网络连接和挂载管理
+ 电源管理和休眠处理
+ 资源限制和依赖关系管理

```sh
# 列出系统中所有正在运行的 Systemd 服务
systemctl list-units --type=service
# 查看服务的详细信息
systemctl status your-service.service
# 停止、重启和删除服务
systemctl stop/restart/disable your-service.service
# 设置开机自启动
systemctl enable/disable your-service.service 
# 查看系统日志
journalctl
# 查看某个服务的日志
journalctl -u your-service.service
```

如果 Linux 发行版支持 systemd，那么从启动时开始，它每秒钟都会从系统的所有进程和应用程序中收集日志。所有这些日志事件都由 systemd 的 journald 守护程序管理。journald 收集所有的日志（信息、警告、错误等），并将其作为二进制数据存储在磁盘文件中，日志以二进制形式存储在路径 /var/log/journal

由于日志保留在磁盘中，而且每秒钟都在收集，所以它占用了巨大的磁盘空间，`journalctl --disk-usage`查看占用空间

可以手动删除日志

```sh
sudo journalctl --flush --rotate
# 超过最近 1秒/周/月/年的日志会被删除
sudo journalctl --vacuum-time=1s/w/m/y

# 这将清除所有存档的日志文件，并保留最后 400MB 的文件。记住这个开关只适用于存档的日志文件，不适用于活动的日志文件
sudo journalctl --vacuum-size=400M

# 清除所有低于指定数量的日志文件，只有最后两个日志文件被保留
sudo journalctl --vacuum-files=2
```

虽然上述方法很好，也很容易使用，但建议使用 journald 配置文件来控制日志文件的清理过程，该文件存在于 /etc/systemd/journald.conf

| journald.conf   参数 | 描述                                                                           | 实例                    |
| -------------------- | ------------------------------------------------------------------------------ | ----------------------- |
| SystemMaxUse         | 指定日志在持久性存储中可使用的最大磁盘空间                                     | SystemMaxUse=500M       |
| SystemKeepFree       | 指定在将日志条目添加到持久性存储时，日志应留出的空间量                         | SystemKeepFree=100M     |
| SystemMaxFileSize    | 控制单个日志文件在被轮换之前在持久性存储中可以增长到多大。                     | SystemMaxFileSize=100M  |
| RuntimeMaxUse        | 指定在易失性存储中可以使用的最大磁盘空间（在 /run 文件系统内）                 | RuntimeMaxUse=100M      |
| RuntimeKeepFree      | 指定将数据写入易失性存储（在 /run 文件系统内）时为其他用途预留的空间数量       | RuntimeMaxUse=100M      |
| RuntimeMaxFileSize   | 指定单个日志文件在被轮换之前在易失性存储（在 /run 文件系统内）所能占用的空间量 | RuntimeMaxFileSize=200M |

最后重启 journald

```sh
sudo systemctl restart systemd-journald
```

## 系统监控与性能分析

### 系统基本信息

+ `lsb_release -a`：查看发行版本
+ `cat /proc/cpuinfo`：查看硬件配置

### 性能监控

+ `top`：实时查看进程变化，监控 Linux 系统状况
+ `uptime`：查看系统运行了多少时间
+ `free`：查看内存
+ `vmstat`：进程，内存，分页，块 IO，陷阱，磁盘和 cpu 活动的信息

### 存储空间

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

在 Linux，通过文件权限，属性和所有权来管理对文件的访问

对于 Linux 中的每个文件，都有三个权限类

| 类     | 描述             |
| ------ | ---------------- |
| 用户   | 文件的拥有者     |
| 分组   | 同组用户         |
| 其它人 | 任何其他用户或组 |

对于每个权限类，有三个可分配的权限：

| 权限 | 符号 | 描述                                                    |
| ---- | ---- | ------------------------------------------------------- |
| 读   | r--  | 读取文件的能力                                          |
| 写   | -w-  | 写入文件的能力                                          |
| 执行 | --x  | 将文件作为程序执行的能力，例如 ShellScript 应该设置这个 |

可以通过`ls -l filename.txt`查看文件权限

以及管理权限的命令，只有 root，文件所有者的用户才能修改：

+ `chmod` — 修改文件权限
+ `chown` — 修改所有者
+ `umask` — 修改掩码，以便将权限赋予新创建的文件

第一组参数是用户类型：

+ `u`- 文件所有者
+ `g`- 组
+ `o`- 其它人
+ `a`- 所有用户，与同时指定 ugo 一样

第二组参数，操作权限的参数，定义是否要删除、添加或设置权限：

+ `-` 删除指定的权限
+ `+` 添加指定的权限
+ `=` 将当前权限改为指定权限。如果在符号后没有指定权限`=`，则删除指定用户类的所有权限

```sh
# 授予组成员读取文件的权限，但不能写入和执行
chmod g=r filename
# 删除所有用户的执行权限
chmod a-x filename
# 递归删除其他用户的写权限
chmod -R o-w dirname
```

## 挂载共享目录

在系统上安装`cifs-utils`包

```sh
# 创建一个目录作为挂载点
mkdir /mnt/win_share
# 开始挂载共享目录
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

## 软件包管理

在为软件安装程序之前，有必要了解下面的概念：

+ 源码包 - 不能编译，必须手动编译，并配置才能运行（大佬定制化时使用），一般后缀名为`.tar.gz`
+ 二进制包 - 已经编译过，可以立即执行
+ RPM - 是二进制包的子系列，用来处理二进制包依赖关系，基于软件包管理系统
+ 软件源 - 存放包的仓库，比如阿里云、清华等

一般情况下，默认的软件源就足够使用了，但有的软件源比较慢，甚至会连接失败，所以需要换一些国内的源，比如阿里云

在 Linux 中，不同发行版的软件包有不同的格式

## 远程登陆

如果买了远程服务器，且系统是 Linux，便可以使用 SSH 工具来远程连接，一般输入`用户名@机器地址`，然后输入密码就可以连接成功了，但是有时候远程不允许 SSH 连接，这个时候就要在控制台中进入机器，然后更改系统配置即可

如果被禁止 SSH 登录 ROOT 账户，则进入远程机采用下面操作：

```sh
sudo vim /etc/ssh/sshd_config
```

找到`PermitRootLogin`行并改为`PermitRootLogin yes`，以及开启`PubkeyAuthentication yes`，保存编辑退出，使用`sudo service ssh restart`就行了

每次连接输入密码太麻烦，可以使用密钥的方式来登录，首先本机使用`ssh-keygen -t ed25519`生成密钥对，然后使用`ssh-copy-id 用户名@机器地址`上传密钥到远程机器，随后输入密码验证一下，以后就可以免密登录了

::: tip
Windows 的`cmd`和`powershell`是没有`ssh-copy-id`命令的，最好使用比如 git bash 这样的终端来操作
:::

## 端口管理

不要在远程机中通过防火墙程序来控制端口，因为控制台会有专门预设好的防火墙设置，在这里指定规则即可

如果通过远程机防火墙程序控制了规则，可能会导致 SSH 连接工具无法连接的现象发生，这时的防火墙规以远程机

## 设置代理

```
# 修改 shell 配置文件 ~/.bashrc ~/.zshrc 等
export http_proxy=socks5://127.0.0.1:1024
export https_proxy=$http_proxy

# 设置 setproxy 和 unsetproxy 可以快捷的开关
# 需要时先输入命令 setproxy
# 不需要时输入命令 unsetproxy
alias setproxy="export http_proxy=socks5://127.0.0.1:1024; export https_proxy=$http_proxy; echo 'HTTP Proxy on';"
alias unsetproxy="unset http_proxy; unset https_proxy; echo 'HTTP Proxy off';
```

## 定时任务

使用 cronie

```sh
# 编辑
crontab -e
```

文本中添加定时任务

```text
0 23 * * * rtcwake -v -s 32400 -m mem
```

## 解压缩

```sh
# 解打包
tar -xf file.tar
# 打包
tar -cf archive.tar files/file
# 使用 gzip 算法压缩
tar -zcf archive.tar.gz files/file
# 解 gzip 包
tar -zxf archive.tar.gz
# 使用 bzip2 算法压缩
tar -zcf archive.tar.bz2 files/file
# 解 bzip2 包
tar -zxf archive.tar.bz2

# 解 zip
unzip file.zip
# 打包
zip archive.zip files/directories
# 递归打包
zip -r archive.zip directory
```

## Benchmark

购买了一台 Linux 服务器怎么不跑一下各种测试呢？

```sh
wget -qO- bench.sh | bash
```
