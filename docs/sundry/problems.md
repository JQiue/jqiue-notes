---
title: 问题汇总
author: JQiue
article: false
---

::: tip
这里收集的是我遇到过的所有问题
:::

## Tomcat 输出信息时出现中文乱码

原因：Tomcat 默认编码为 UTF-8，和当前操作系统（windows）编码不一致  
解决：打开 tomcat 安装目录下的 conf/logging-properties 文件，修改如下参数项

```text
java.util.logging.ConsoleHandler.encoding = gbk
```

## Tomcat 启动时 CMD 窗口异常退出

原因：Tomcat 启动时需要找到正确配置的 JAVA_HOME  
解决：环境变量中配置 JAVA_HOME

## NPM 发布包时提示远程仓库中有相似名的包

原因：远程仓库中有相似包名的发布包  
解决：修改 package.json 中的包名

## .gitignore 忽略规则对某些文件失效了

原因：.gitignore 只能忽略那些原来没有被追踪 (track) 的文件，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的  
解决：本地 git 是有缓存的，清除缓存即可将文件变为未追踪状态

```bash
git rm -r --cached .
```

## 在 powershell 中执行 NPM 脚本被禁止

原因：powershell 默认策略是防止运行所有脚本文件  
解决：切换执行策略

管理员权限运行 powershell，并键入：

```bash
set-ExecutionPolicy RemoteSigned
```

此时计算机会提示如下信息：选择 Y 或者 A，回车即可

```text
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”):
```

## 主机前面板没有声音

原因：板载声卡没有驱动  
解决：去主板官网下载驱动

## Github 推送时提示：ssh: connect to host github.com port 22: Connection timed out

原因：可能是防火墙阻塞端口  
解决：需要一些操作来确认一下是否为这种原因

```sh
ssh -T git@github.com
```

如果以上命令得到了 timeout，这种情况应使用 http 协议进行推送，而不是 ssh，只需要将配置文件中的 url 更改为 http 即可

打开配置文件：

```sh
git config --local -e
```

将配置中的：

```text
url = git@github.com:username/repo.git
```

改为：

```text
url = https://github.com/username/repo.git
```

## 执行 javac 命令可以编译通过，但执行 java 命令时找不到或无法加载主类

原因：java 命令执行带有`./`或`.\`之类的路径符号，会被错误的认作成一个 package  
解决：执行字节码文件时，去掉相关路径符号，也不要跨路径执行，这对于任何终端都是一样

## Python 读取某文件时，最前面有特殊转义字符

原因：这是因为文件本身是用带签名的`utf-8 with BOM`保存的  
解决1：open 文件时使用`utf-8-sig`编码  
解决2：转换文件格式

## windows 10 无法登陆商店或账户

原因：可能当前运营商网络访问的 DNS 有问题（对此原因暂时存疑）  
解决：设置 DNS 为 4.2.2.2，并`cmd ipconfig /flushdns`刷新一下，登陆后最好还原 DNS，否则影响会影响其他的网络访问

## windows 10 20H1 后续版本使用`Alt + Tab`切换窗口时会将 Edge 中的标签看做成独立的窗口进行切换

原因：没有任何原因，很 SB 的设计  
解决：进入系统设置中的多任务处理选项，将`Alt + Tab`项切换成`仅打开的窗口`

## push 到 Github 时产生：fatal: unable to access 'https://github.com/xxx/xxx': OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

原因：这是因为某些东西挡住了 Git 与 Github 之间的连接  
解决1：给 Git 配置代理  
解决2：尝试 HTTPS 协议推送，而不是 SSH
