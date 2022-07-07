---
title: Android 调试桥（adb）的用法
category: 知识分享
date: 2021-07-07
article: false
---

[google 教程](https://developer.android.google.cn/studio/command-line/adb)

[下载地址](https://adbshell.com/downloads)

```sh
adb shell am start -n 应用 Activity    --启动应用
adb shell screencap -p 截图路径及文件名 -- 截图
adb shell input keyevent 按键码        -- 模拟系统按键
adb shell input tap x y               -- 点击某个位置
adb shell input swipe x y x y         -- 滑动到某个位置
adb shell input text 文本             -- 输入文本（只能是英文）
adb pull 截图路径及文件名 ./            -- 把截图拖到电脑上
adb install -r apk 路径                -- 安装 apk 到手机
```

## 连接 WIFI 调试手机

要求：

+ Android 11 以上
+ 手机和电脑在同一局域网

先连接数据线，使用`adb tcpip [port]`让手机某个端口处于监听状态

在手机 wifi 设置中查看手机的 ip 地址，并使用`adb connect [ipdress]:[port]`进行连接

然后就可以拔掉数据线了

下一次连接时，要先手动`adb disconnect [ipdress]:[port]`，然后在尝试连接

<!-- more -->