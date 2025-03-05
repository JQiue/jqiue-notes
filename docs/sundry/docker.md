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

## 构建镜像

先编写 Dockerfile 文件，比如：

```dockerfile
# 使用 alpine 作为基础镜像
FROM alpine:latest
# 为 Dockerfile 中的 ADD、COPY、CMD、ENTRYPOINT 或 RUN 指令设置工作目录
WORKDIR /app
# 设置环境变量
ENV database_url sqlite://.waline.sqlite?mode=rwc
# 将文件或文件夹从源文件复制到映像文件系统中的路径
COPY ./target/x86_64-unknown-linux-musl/release/waline-mini .
COPY ./assets/waline.sqlite .
# 定义此容器将在运行时监听的网络端口
EXPOSE 8360
#  指令在 Dockerfile 中用于指定容器启动时要运行的命令。它可以包含要执行的命令及其参数。CMD 指令在 Dockerfile 中只能有一个，如果定义了多个，只有最后一个会生效，可以被运行容器时提供的命令行参数覆盖
CMD "./waline-mini"
```

```sh
docker build -t <app>:latest .
```

## 推送镜像

```sh
docker login
docker push <appimage>:latest
```

一般来说推送两个镜像，比如：

```sh
docker build -t jqiue/app:0.1.0 .
docker tag jqiue/app:0.1.0 jqiue/app:latest
docker push jqiue/app:0.1.0
docker push jqiue/app:latest
```

## 连接网络

Docker 支持多种类型的网络，包括桥接网络（bridge）、主机网络（host）、无网络（none）以及用户定义的覆盖网络（overlay）。使用`--network`选项可以在启动容器时指定容器要连接到哪个网络

当不指定任何网络选项时，容器自动连接到桥接的网络

如果希望容器共享主机的网络栈，可以使用 host 网络模式。请注意，在 Linux 上，这会使得容器内的服务直接绑定在主机的 IP 和端口上，而在 Docker for Mac 和 Docker for Windows 上，host 模式的效果略有不同

如果创建一个不需要网络连接的容器，可以使用 none 网络模式。这种情况下，容器将不会有任何网络接口，除了回环接口

## 容器文件系统

当创建一个容器时，Docker 会为该容器分配一个读写层。这个层包含了所有在容器运行期间发生的文件系统更改。即使你停止了容器，只要你不删除容器（例如通过 docker rm 命令），这个读写层就会保留下来。因此，当你再次
启动同一个容器时，之前的所有更改仍然存在

如果在启动容器时使用了 -v 或 --mount 选项指定了卷（即使是匿名卷），这些卷中的数据也会被持久化，不会因为容器的停止而丢失。卷是独立于容器生命周期存在的，只有当你显式地删除卷时，其中的数据才会被移除
