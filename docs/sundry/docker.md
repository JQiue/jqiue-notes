---
title: Docker
category: 知识分享
article: false
---

Docker 基本概念:

+ 引擎: 管理 Docker 镜像和容器的后台进程。
+ 镜像: 类似于虚拟机的模板,包含了应用程序及其依赖的文件系统。
+ 容器: 从 Docker 镜像创建的运行实例,可以理解为一个轻量级的虚拟机。

## 安装&&启动

::: tabs

@tab:active Arch

```sh
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl enable docker
sudo systemctl start docker
```

:::

## 设置镜像源

编辑`/etc/docker/daemon.json`

```json
{
 "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

## 基本操作

+ 拉取镜像: docker pull <镜像名称>
+ 创建容器: docker run <镜像名称>
+ 启动容器: docker start <容器ID或名称>
+ 停止容器: docker stop <容器ID或名称>
+ 进入容器: docker exec -it <容器ID或名称> /bin/bash
+ 查看容器列表: docker ps -a
+ 删除容器: docker rm <容器ID或名称>

## 容器声明周期

创建容器时，Docker 会从镜像启动一个新的进程。如果主进程退出，容器也会自动停止。可以使用 docker start 命令重新启动已经停止的容器
