---
title: 终端大一统
article: false
---

由于个人喜欢 fish 这种开箱即用的 shell，所以难免要在 Windows 上使用 fish，用来统一多个操作系统的终端使用习惯，通常 Linux 不需要进行额外的配置

## Windows

在 Windows 上使用 shell 可能需要多折腾一些，但没有那么麻烦

首先安装[MSYS2](https://msys2.github.io/)，随后进入 msys2 执行`pacman -S fish`，msys2 使用的是 Arch Linux 的包管理器

一般来说，在 Windows 会使用 Windows Terminal 作为终端工具，将配置文件中添加如下内容：

```json
{
  "profiles": {
    "list": [
      // ...
      {
        "commandline": "C:/msys64/msys2_shell.cmd -defterm -use-full-path -here -no-start -ucrt64 -shell fish",
        "guid": "{17da3cac-b318-431e-8a3e-7fcdefe6d114}",
        "icon": "C:/msys64/ucrt64.ico",
        "name": "UCRT64 / MSYS2",
        "startingDirectory": "C:/msys64/home/%USERNAME%"
      },
      {
        "commandline": "C:/msys64/msys2_shell.cmd -defterm -use-full-path -here -no-start -msys -shell fish",
        "guid": "{71160544-14d8-4194-af25-d05feeac7233}",
        "icon": "C:/msys64/msys2.ico",
        "name": "MSYS / MSYS2",
        "startingDirectory": "C:/msys64/home/%USERNAME%"
      }
    ]
  },
}
```

可能有人使用 VSCode 作为开发工具，那么 VSCode 会自动识别 msys2 shell，但是进入后不会立即切换到 fish，添加以下内容到`settings.json`中：

```json
{
    "terminal.integrated.profiles.windows": {
        "MSYS2 UCRT": {
            "path": "cmd.exe",
            "args": [
                "/c",
                "C:\\msys64\\msys2_shell.cmd -defterm -use-full-path -here -no-start -ucrt64 -shell fish"
            ]
        }
    }
}
```
