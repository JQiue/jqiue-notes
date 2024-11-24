---
title: Docker
category: 知识分享
article: false
---

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中。主要概念包括：

+ 引擎: 核心组件，负责管理 Docker 镜像、容器、网络和存储的后台进程
+ 镜像: 一个只读的模板，包含创建 Docker 容器的指令。它由多个层（Layer）组成，每层代表 Dockerfile 中的一条指令
+ 容器: 镜像的运行实例，可以被启动、停止、删除。容器间彼此隔离，互不影响

## 安装&&启动

::: tabs

@tab:active Arch

```sh
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl enable docker
sudo systemctl start docker
```

@tab Ubuntu

```sh
apt-get update
apt-get install ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
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
  
镜像管理：

```sh
# 搜索镜像
docker search <关键词>
# 拉取镜像
docker pull <镜像名称>:<标签>
# 列出本地镜像
docker images
# 删除镜像
docker rmi <镜像ID或名称>
```

容器管理：

```sh
# 创建并运行容器
docker run [选项] <镜像名称>

# 常用选项：
# -d: 后台运行
# -p: 端口映射
# -v: 挂载数据卷
# --name: 指定容器名称

# 容器生命周期管理
docker start <容器ID或名称>    # 启动容器
docker stop <容器ID或名称>     # 停止容器
docker restart <容器ID或名称>  # 重启容器
docker rm <容器ID或名称>       # 删除容器

# 容器状态查看
docker ps                    # 查看运行中的容器
docker ps -a                 # 查看所有容器
docker logs <容器ID或名称>    # 查看容器日志

# 容器交互
docker exec -it <容器ID或名称> /bin/bash  # 进入容器终端
```

## 容器声明周期


容器的生命周期主要包含以下状态：

1. 创建：使用 docker create 或 docker run 命令创建容器
2. 运行：容器正在运行，其中的应用程序处于活动状态
3. 暂停：容器可以被暂停，暂时停止所有进程
4. 停止：容器停止运行，但保留所有配置和数据
5. 删除：永久删除容器及其数据

注意：容器停止后可以重新启动，但删除后将无法恢复。建议对重要数据使用数据卷（Volume）进行持久化存储
