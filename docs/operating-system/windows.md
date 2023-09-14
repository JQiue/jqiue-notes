---
title: Windows
article: false
---

Windows 相比 Linux 提供了一个图形用户界面（GUI），并成为了使用最广泛的操作系统，有以下经典版本：

+ Windows XP - 最经典的版本，也是最受欢迎的版本，已停止支持
+ Windows 7 - 是 Windows Vista 的后续版本，已停止支持
+ Windows 10 - 最主流的版本
+ Windows 11 - 当前最新版本

## CMD 和 PowerShell

shell 是运行在终端上的文本互动程序，对于 Windows 来说，它有`cmd`和`powershell`两种终端程序

+ `tasklist`：显示所有进程
+ `tasklist | findstr "StudentMain"`：在所有进程中查询包含`StudentMain`的进程
+ `taskkill /im StudentMain.exe /f`：杀掉`StudentMain.exe`进程
+ `tasklist /pid 1488`：杀掉 PID 为`1488`的进程
+ `tree /f`：树形输出文件

## 环境变量

环境变量是操作系统的概念，用于解决编程中的硬编码情况，一般通过界面的方式来设置环境变量，但可以通过命令维护一套属于自己的环境变量配置

在 CMD 中使用`set`命令会显示所有的环境变量，如果要修改环境变量，`set [variable]=[value]`则是基本的操作，但是这种做法会将原有的值覆盖掉，可以通过`%variable%new_Value`的方式来实现追加，这种设置方式是临时的，在本次对话结束后就会消失，也不会共享给其他对话

`setx` 是一个永久性的环境变量设置工具

```sh
setx PATH "%PATH%;[new_path;]"
```

这是使用 PowerShell 的例子

```sh
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python27\;C:\Python27\Scripts\", "User")
```

## 封装系统

准备工作：

+ 虚拟机
+ 系统镜像
+ 常用软件

创建虚拟机步骤：

1. 创建新的虚拟机
2. 稍后安装操作系统
3. 选择客户机操作系统版本
4. 酌情分配虚拟机配置
5. 不使用网络连接
6. 创建磁盘容量为 40GB，存储为单个文件
7. 移除声卡，虚拟机硬件
8. 设置虚拟机的 CD/DVD 来源为系统镜像

安装系统：

1. 选择进入固件方式启动虚拟机
2. 将 BOOT 启动项设置为 CD-ROM，F10 保存并重启
3. 开始进入系统的安装

启动系统：

1. 在 OOBE 界面中按下`CTRL+SHIFT+F3`进入部署模式，详见[微软文档](https://docs.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/boot-windows-to-audit-mode-or-oobe?view=windows-10)
2. 启用超级管理员模式

封装系统：

1. 使用封装系统工具对系统进行封装
2. 使用微 PE 生成可启动的 ISO，进入 PE
3. 使用 Dism ++ 进行系统备份，一定要勾选可启动，并且不要存在系统所在的分区
