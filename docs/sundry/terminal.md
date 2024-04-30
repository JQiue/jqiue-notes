---
title: 终端大一统
article: false
---

由于个人喜欢 fish 这种开箱即用的 shell，所以难免要在 windows 上使用 fish，用来统一多个操作系统的终端使用习惯，通常 Linux 不需要进行额外的配置

## Windows

在 Windows 上使用 shell 可能需要多折腾一些，但没有那么麻烦

首先安装[MSYS@](https://msys2.github.io/)，随后进入 msys2 执行`pacman -S fish`，msys2 使用的是 Arch Linux 的包管理器

一般来说，在 Windows 会使用 Windows Terminal 作为终端工具，将配置文件中的命令行改为`C:\msys64\msys2_shell.cmd -defterm -no-start -use-full-path -here -ucrt64`即可启动

可能有人使用 VSCode 作为开发工具，那么 VSCode 会自动识别 msys2 shell，但是进入后不会立即切换到 fish，在`/etc/bash.bashrc`增加`exec fish`即可
