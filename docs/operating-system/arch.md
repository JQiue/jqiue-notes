---
title: Arch
article: false
---

## 安装

前往<https://mirrors.tuna.tsinghua.edu.cn/>下载镜像

### 脚本安装

直接挂载镜像，使用 UEFI 模式启动，进入 live-cd 系统，使用`archinstall`命令进行脚本安装

### 手动安装

进入 live-cd 系统

+ 禁用 reflector

```sh
systemctl stop reflector.service
```

+ 测试网络连通性

```sh
ping baidu.com
```

+ 更新系统时钟

```sh
timedatectl set-ntp true # 将系统时间与网络时间进行同步
timedatectl status # 检查服务状态
```

+ 更换国内软件源

```sh
vim /etc/pacman.d/mirrorlist
```

推荐源：

```text
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch # 中国科学技术大学开源镜像站
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch # 清华大学开源软件镜像站
Server = https://repo.huaweicloud.com/archlinux/$repo/os/$arch # 华为开源镜像站
Server = http://mirror.lzu.edu.cn/archlinux/$repo/os/$arch # 兰州大学开源镜像站
```

+ 通过 lsblk 命令观察磁盘分区情况

::: tip
如果是 NVME 协议的硬盘，则不是 sd(x)，而是 nvme(x)n1
:::

+ 使用 cfdisk 分区

```sh
cfdisk /dev/sdx
cfdisk /dev/nvmexn1
```

+ 创建 EFI 分区，类型为 EFI System
+ 创建 SWAP 分区，将类型改为 Linux swap
+ 创建根目录分区，类型默认
+ 选中 Write，回车确认分区操作
+ 使用 fdisk 或 lsblk 命令复查分区情况

## Pacman

Pacman 是 Arch 的官方软件包管理器，以下是常见的命令：

```sh
# 更新软件包缓存，但不安装
pacman -Syy
# 安装软件包
pacman -S package_name
# 删除软件包
pacman -R package_name
# 搜索软件包
pacman -Ss keyword
# 更新系统
pacman -Syu
```

安装一些必要的包：

```sh
pacman -S openssh vim networkmanager git zsh
```

启动服务：

```sh
systemctl start NetworkManager sshd
```

配置 shell，使用更好的 Oh-my-zsh：

1. 使用 curl 下载脚本并安装：`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
2. 同意使用 Oh-my-zsh 的配置模板覆盖已有的`.zshrc`
3. 使用`powerlevel10k`主题,`git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k`
4. 在`.zshrc`设置`ZSH_THEME="powerlevel10k/powerlevel10k"`启用主题
5. 执行`source ~/.zshrc`配置生效
6. 启用`z`获取快速跳转目录的能力，不需要安装，直接在`.zshrc`中设置`plugins=(z)`启用
7. 安装`zsh-autosuggestions`获取命令提示，`git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`，在`.zshrc`中设置`plugins=(zsh-autosuggestions)`
8. 安装`zsh-syntax-highlighting`获取语法检查，`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git`，`echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc`

## AUR

AUR（Arch User Repository）是 Arch 社区维护的软件包存储库，其中包含大量的第三方软件包。允许 Arch 用户共享和安装不在官方仓库中的软件包。它为用户提供了更广泛的软件选择和灵活性
