---
title: 介绍
category: 操作系统
tags: [Alpha]
author: JQiue
article: false
---

::: 前置知识

+ 计算机组成原理
+ 计算机网络原理
+ 操作系统原理
:::

巴拉巴拉，阿巴阿巴，省略一大堆

Linux 是一种多用户操作系统

## 不同的发行版

## 目录

Windows 存在盘符的概念，而 Linux 没有盘符概念，只有一个根目录，所有的文件都在`/`下面，每个用户都在`/home`建立自己的文件夹

+ 蓝色表示目录
+ 青色表示链接
+ 黑色表示文件

### 根目录详解

+ etc：存放几乎所有的系统配置文件
+ home：这是预设的用户主目录
+ bin：存放最常用的命令程序
+ opt：存放额外的第三方软件
+ root：超级用户的主目录
+ usr：应用程序和文件存放的目录
+ var：存放经常被修改的文件
+ lib：存放基本的运行库
+ boot：存放启动系统的核心文件
+ dev：存放着外部设备
+ media：媒介都挂载在这里
+ mnt：暂时挂载某些东西
+ tmp：存放临时文件

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

## 换源

一般情况下，默认的软件源就足够使用了，但有时候的软件源比较慢，甚至会连接失败，所以需要换一些或内的源

首先`cp /etc/apt/sources.list /etc/apt/sources.list.old`备份一下原来的源

然后`vim /etc/apt/sources.list`打开配置源文件，将内容全部替换为阿里云的源：

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

请不要在远程机中通过防火墙程序来控制端口，因为控制台会有专门预设好的防火墙设置，在这里指定规则即可

如果通过远程机防火墙程序控制了规则，可能会导致 SSH 连接工具无法连接的现象发生，这时的防火墙规则以远程机优先，而不是控制台，控制台的规则只控制流量的进入
