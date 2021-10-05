---
title: Android 调试桥（adb）的用法
category: 知识分享
tags: [Alpha]
time: 2021-7-7
author: JQiue
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
