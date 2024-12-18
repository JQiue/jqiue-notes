---
title: 问题汇总
author: JQiue
article: false
---

::: info
这里收集的是我遇到过的问题
:::

## 数据库

+ Navicat 查看表中的中文是乱码的

原因：没有什么太多原因，就是编码出了问题  
解决：从源头开始排查编码问题，应该编辑一下连接属性，设置编码为自动

## 服务器/容器

+ Tomcat 输出信息时出现中文乱码

原因：没什么原因，就是编码出了问题，常常出现在 Windows  
解决：打开 tomcat 安装目录下的 conf/logging-properties 文件，修改如下参数项

```
java.util.logging.ConsoleHandler.encoding = gbk
```

+ Tomcat 启动时 CMD 窗口异常退出

原因：Tomcat 启动时需要找到正确配置的`JAVA_HOME`  
解决：环境变量中配置`JAVA_HOME`

+ Nginx 不支持中文域名

原因：中文域名不被标准的解析服务器支持  
解决：需要转换为 punycode 码

## Node.js

+ NPM 发布包时提示远程仓库中有相似名的包

原因：远程仓库中有相似包名的发布包  
解决：修改 package.json 中的包名重新发布

+ 在 powershell 中执行 NPM 脚本被禁止

原因：powershell 默认策略是防止运行所有脚本文件  
解决：切换执行策略

管理员权限运行 powershell，并键入：

```sh
set-ExecutionPolicy RemoteSigned
```

此时计算机会提示如下信息：选择 Y 或者 A，回车即可

```
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”):
```

## 版本控制

+ .gitignore 忽略规则对某些文件失效了

原因：.gitignore 只能忽略那些原来没有被追踪 (track) 的文件，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的  
解决：本地 git 是有缓存的，清除缓存即可将文件变为未追踪状态

```sh
git rm -r --cached .
```

+ Github 推送时提示：ssh: connect to host github.com port 22: Connection timed out

原因：可能是防火墙阻塞端口  
解决：需要一些操作来确认一下是否为这种原因

```sh
ssh -VT git@github.com
```

如果以上命令得到了 timeout，这种情况应使用 http 协议进行推送，而不是 ssh，只需要将配置文件中的 url 更改为 http 即可

打开配置文件：

```sh
git config --local -e
```

将配置中的：

```
url = git@github.com:username/repo.git
```

改为：

```
url = https://github.com/username/repo.git
```

如果看到了 Github 的地址被解析成了 127.0.0.1，则说明被 DNS 污染了，需要获得真正的 IP 并修改 Hosts

+ push 到 Github 时产生：`fatal: unable to access 'https://github.com/xxx/xxx': OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443`

原因：这是因为某些东西挡住了 Git 与 Github 之间的连接  
解决1：给 Git 配置代理  
解决2：尝试 HTTPS 协议推送，而不是 SSH  
解决3：尝试改变网络环境，比如使用移动热点尝试，或切换网络运营商

## 计算机硬件/操作系统

+ 主机前面板没有声音

原因：板载声卡没有驱动  
解决：去主板官网下载驱动

+ Windows 10 无法登陆商店或账户

原因：可能当前运营商网络访问的 DNS 有问题（对此原因暂时存疑）  
解决：设置 DNS 为 4.2.2.2，并`cmd ipconfig /flushdns`刷新一下，登陆后最好还原 DNS，否则会影响其他的网络访问

+ Windows 10 20H1 后续版本使用`Alt + Tab`切换窗口时会将 Edge 中的标签看做成独立的窗口进行切换

原因：没有任何原因，很 SB 的设计  
解决：进入系统设置中的多任务处理选项，将`Alt + Tab`项切换成`仅打开的窗口`

+ 使用 SSH 连接 Linux 时出现：Permission denied, please try again

原因：Linux 远程不允许使用 SSH 连接 ROOT 用户  
解决：修改配置文件允许即可

首先通过别的方式进入 Linux，然后`su`提权，使用`vi /etc/ssh/sshd_config`打开配置文件，查看是否有`PermitRootLogin no`项，如果有就改成`PermitRootLogin yes`，按`ESC`退出编辑模式，输入`:w!`保存，输入`:q!`退出到命令行，并输入`service sshd restart`，然后就可以尝试使用 SSH 进行连接了

+ 某些程序在终端中输出的中文是乱码

原因：输出程序和终端编码不一致  
解决1：改变输出程序的编码方式  
解决2：改变终端编码方式

比如国内 Windows 的终端编码都是 GBK，只要在终端中输入`chcp`，就会显示：

```sh
活动代码页: 936
```

这个`936`就代表着中文编码，输出其它编码形式的中文时自然会出现乱码，比如要输出的中文是`utf-8`，在终端中使用`chcp 65001`命令就会改变成`utf-8`：

```sh
Active code page: 65001
```

注意这只是临时的，只对本次终端程序有效，启动新的终端还是`936`

> 更多受支持的[代码页](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/chcp)

+ Hyper-V 开启和关闭的自动化

检查 Hyper-V 的当前状态是 ON 还是 OFF，以管理员身份运行 CMD 并执行以下命令

```sh
bcdedit /enum | find "hypervisorlaunchtype"
```

当 Hyper-V 打开时，输出如下

```sh
hypervisorlaunchtype    Auto
```

当 Hyper-V 关闭时，输出如下

```sh
hypervisorlaunchtype    Off
```

打开和关闭 Hyper-V

```sh
bcdedit /set hypervisorlaunchtype auto
bcdedit /set hypervisorlaunchtype off
```

## 编程语言

+ 执行 javac 命令可以编译通过，但执行 java 命令时找不到或无法加载主类

原因：java 命令执行带有`./`或`.\`之类的路径符号，会被错误的认作成一个 package  
解决：执行字节码文件时，去掉相关路径符号，也不要跨路径执行，这对于任何终端都是一样

+ Python 读取某文件时，最前面有特殊转义字符

原因：这是因为文件本身是用带签名的`utf-8 with BOM`保存的  
解决1：open 文件时使用`utf-8-sig`编码  
解决2：转换文件格式

+ pkg 打包的 node.js 程序不想在 Console 下运行

解决：详见[https://github.com/vercel/pkg/issues/135#issuecomment-1009036281](https://github.com/vercel/pkg/issues/135#issuecomment-1009036281)
