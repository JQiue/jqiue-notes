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

## 封装系统
