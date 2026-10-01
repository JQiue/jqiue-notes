---
title: Tauri
category: 框架
article: false
---

::: tip
基于 Tauri v1.2
:::

Tauri 是一个基于 Webview 的跨平台 UI 框架，采用 Rust 编写，相比 Electron 它有以下优点：

+ 应用分发体积非常小

## 配置环境

+ 必须拥有 Rust 环境
+ 创建项目`pnpm create tauri-app`

## 构建应用

## 注意事项

## 构建优化

## 插件

<https://github.com/tauri-apps/plugins-workspace>

安装插件时要选择 Gitee 克隆源，否则会出现网络问题导致无法下载：

```toml
[dependencies.tauri-plugin-sql]
git = "https://gitee.com/dassio/plugins-workspace"
branch = "v1"
features = ["sqlite"]                              # or "postgres", or "mysql"
```

## 参考资料

+ [Tauri 官网](https://tauri.app/)
+ [Awesome](https://github.com/tauri-apps/awesome-tauri)
