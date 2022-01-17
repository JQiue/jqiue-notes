---
title: Windows 一言以蔽之
category: 知识分享
author: JQiue
article: false
---

## CMD 和 PowerShell

shell 是运行在终端上的文本互动程序，对于 Windows 来说，它有`cmd`和`powershell`两种终端程序

+ `tasklist`：显示所有进程
+ `tasklist | findstr "StudentMain"`：在所有进程中查询包含`StudentMain`的进程
+ `taskkill /im StudentMain.exe /f`：杀掉`StudentMain.exe`进程
+ `tasklist /pid 1488`：杀掉 PID 为`1488`的进程

## 环境变量

环境变量是操作系统的概念，用具解决编程中的硬编码情况，一般通过界面的方式来设置环境变量，但可以通过命令维护一套属于自己的环境变量配置

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
