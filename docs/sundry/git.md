---
title: Git 指南
category: 版本控制
tags: [Git, Alpha]
author: JQiue
---

从开发者的角度上来看，Git 有以下功能：

1. 从服务器上克隆代码到自己的机器上
2. 在自己的机器上创建分支，修改代码
3. 将自己机器上的代码提交到服务器上
4. 合并分支
5. .....

## 初入 Git

如果是第一次使用 Git，使用之前必须配置用户名和邮箱，对于整个版本管理的流程来讲，将版本的变更与用户绑定起来更容易追踪

```sh
git config --global user.name 'your_name'
git config --global user.email 'your_email@domian.com'
```

再次使用上述命令会变更`config`的信息

显示`config`的配置，根据参数显示不同作用域下的配置：

```sh
git config --global --list
```

`config`在分别使用不同的指令参数时，有不同的作用域：

+ `local`：对某个仓库有效，当缺省的时候默认为`local`，优先级最高
+ `global`：对当前用户所有仓库有效，优先级次之
+ `system`：对系统所有登陆的用户有效，优先级最低

将代码从服务器上 clone 到本地机器：

```sh
git clone 仓库地址
```

这样便可以修改本地的代码了，当完成了一定量的修改后，可以做个阶段的提交

向这个仓库添加所有的改动

```sh
git add .
```

或者添加某个文件

```sh
git add 文件路径
```

查看当前的状态

```sh
git status
```

## 认识 Github

Github 是用于存放使用 Git 版本控制的软件代码和内容项目的网站，不仅如此，它还是：

1. 网站
2. 免费博客
3. 管理配置文件
4. 收集资料
5. 简历
6. 托管编程环境
7. 写作
8. ...

Github 可以托管各种 Git 仓库，并提供可管理的 Web 界面

## 提交规范

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

大致分为三个部分(使用空行分割):

1. 标题行: 必填, 描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. 页脚注释: 放 Breaking Changes 或 Closed Issues

### type: commit 的类型

+ init: 初始化
+ feat: 新特性
+ fix: 修改问题
+ refactor: 代码重构
+ docs: 文档修改
+ style: 代码格式修改, 注意不是 css 修改
+ test: 测试用例修改
+ build: 构建项目
+ chore: 其他修改, 比如依赖管理
+ scope: commit 影响的范围, 比如: route, component, utils, build...
+ subject: commit 的概述

### body: commit 具体修改内容, 可以分为多行

footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

### 示例

+ fix（修复BUG）

如果修复的这个BUG只影响当前修改的文件，可不加范围。如果影响的范围比较大，要加上范围描述

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称

```
// 示例1
fix(global):修复checkbox不能复选的问题
// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px
// 示例3
fix: value.length -> values.length
```

+ feat（添加新功能或新页面）

```
feat: 添加网站主页静态页面

这是一个示例，假设对页面内容进行了一些描述

这里是备注，可以是放BUG链接或者一些重要性的东西
```

+ chore（其他修改）

chore 的中文翻译为日常事务、例行工作，顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示

```
chore: 将表格中的查看详情改为详情
```

其他类型的 commit 和上面三个示例差不多，在此不再叙述

## 让你的提交带上 emoji

在 git commit 说明中也可以通过特殊字符来转义一些小表情

```shell
git commit -m "fix：:bug: 修复一个缺陷"
```

这是别人看到的 commit 信息 => fix：:bug:修复一个缺陷

🎨 - `:art:` - 改进代码的结构/格式.  
⚡️ - `:zap:` - 提高性能.  
🔥 - `:fire:` - 删除代码或文件.  
🐛 - `:bug:` - 修复一个缺陷.  
🚑 - `:ambulance:` - 关键的热修复补丁.  
✨ - `:sparkles:` - 引入新特性.  
📝 - `:pencil:` - 编写文档.  
🚀 - `:rocket:` - 部署内容.  
💄 - `:lipstick:` - 更新UI和样式文件.  
🎉 - `:tada:` - 初始提交.  
➕ - `:heavy_plus_sign:` - 添加依赖项.  
➖ - `:heavy_minus_sign:` - 删除依赖项.  
🔧 - `:wrench:` - 更改配置文件.  
✏️ - `:pencil2:` - 修复拼写错误.  
🔀 - `:twisted_rightwards_arrows:` - 合并分支.  
📦 - `:package:` - 更新已编译的文件或包.  
🚚 - `:truck:` - 移动或重命名文件.  
💬 - `:speech_balloon:` - 更新文本和文本.  
🙈 - `:see_no_evil:` - 添加或更新 .gitignore 文件.  
✅ - `:white_check_mark:` - 更新测试.  
🔒 - `:lock:` - 修复安全问题.  
🍎 - `:apple:` - 在 macOS 上修复某些内容.  
🐧 - `:penguin:` - 在 Linux 上修复某些内容.  
🏁 - `:checkered_flag:` - 在 Windows 上修复某些内容.  
🤖 - `:robot:` - 在 Android 上修复某些内容.  
🍏 - `:green_apple:` - 在 ios 上修复某些内容.  
🔖 - `:bookmark:` - 释放/版本标记.  
🚨 - `:rotating_light:` - 删除 liter 警告.  
🚧 - `:construction:` - 工作正在进行中.  
💚 - `:green_heart:` - 修复 CI 生成.  
⬇️ `- :arrow_down:` - 降级依赖项.  
⬆️ `- :arrow_up:` - 升级依赖项.  
📌 - `:pushpin:` - 将依赖项固定到特定版本.  
👷 - `:construction_worker:` - 添加 CI 生成系统.  
📈 - `:chart_with_upwards_trend:` - 添加分析或跟踪代码.  
♻️ - `:recycle:` - 重构代码.  
🐳 - `:whale:` - 有关 Docker 的工作.  
🌐 - `:globe_with_meridians:` - 国际化和本地化.  
💩 - `:poop:` - 编写需要改进的坏代码.  
⏪ - `:rewind:` - 还原更改.  
👽 - `:alien:` - 由于外部 API 更改而更新代码.  
📄 - `:page_facing_up:` - 添加或更新许可证.  
💥 - `:boom:` - 引入重大变革.  
🍱 - `:bento:` - 添加或更新资产.  
👌 - `:ok_hand:` - 由于代码审阅更改而更新代码.  
♿️ - `:wheelchair:` - 提高可访问性.  
💡 - `:bulb:` - 记录源代码.  
🍻 - `:beers:` - 醉酒地写代码.  
🗃 - `:card_file_box:` - 执行与数据库相关的更改.  
🔊 - `:loud_sound:` - 添加日志.  
🔇 - `:mute:` - 删除日志.  
👥 - `:busts_in_silhouette:` - 添加参与者.  
🚸 - `:children_crossing:` - 改善用户体验/可用性.  
🏗 - `:building_construction:` - 进行体系结构更改.  
📱 - `:iphone:` - 致力于响应式设计.  
🤡 - `:clown_face:` - 模仿事物.  
🥚 - `:egg:` - 加入复活节彩蛋.  
📸 - `:camera_flash:` - 添加或更新快照.  
⚗ - `:alembic:` - 尝试新事物.  
🔍 - `:mag:` - 改进 SEO.  
☸️ - `:wheel_of_dharma:` - 关于库伯内斯的工作.  
🏷️ - `:label:` - 添加或更新类型（流、类型脚本）.  
🌱 - `:seedling:` - 添加或更新种子文件.  
🚩 - `:triangular_flag_on_post:` - 添加、更新或删除功能标志.  
🥅 - `:goal_net:` - 捕获错误.  
💫 - `:dizzy:` - 添加或更新动画和过渡.  
🗑 - `:wastebasket:` - 需要清理的弃用代码.

## SSH 免登录推送

基于 HTTPS 的推送方式，需要登录远程仓库的账号来获得推送权限，这可能带来一个问题，每当推送的时候就可能需要登录一次，这带来了不必要的麻烦，尽管有些操作系统会帮我们记住账号免于输入

SSH 通过密钥来实现身份验证，而密钥是成对出现的，分为公钥和私钥，通过验证公钥和私钥的配对情况来决定验证是否成功，公钥和私钥需要使用命令生成，公钥提供给代码托管服务商，而私钥则保留在本地，当开发者通过 SSH 方式推送时，远程公钥和本地私钥就会进行配对，如果配对成功，则会将本地仓库推送到远程仓库，免去了输入账号的麻烦

打开终端输入一下命令生成密钥对：

```sh
ssh-keygen
```

此命令会出现一个问题选择，用来询问密钥的创建方式，一路回车即可

```sh
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/wjq/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/wjq/.ssh/id_rsa
Your public key has been saved in /c/Users/wjq/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:N7TuumKgj2rYSwur1oIDfoH4UWFzGs61kAxMVNKnI6U wjq@DESKTOP-4PAKPB7
The key's randomart image is:
+---[RSA 3072]----+
| +==..           |
|  ..@ +          |
|   * @ .  .      |
|  E B .  . .     |
|. .o .  S +      |
|o....    o .     |
|*ooo..    .      |
|+O+=  o  .       |
|Bo*o.. .oo.      |
+----[SHA256]-----+
```

当问题选择完毕时，会在用户目录`(C:\Users\***\.ssh)`下生成公钥和私钥

![1](http://qs0jixwj6.hn-bkt.clouddn.com/git-4-1.png)

### 配置远程仓库的公钥

以 Github 为例，进入`Settings`，找到`SSH and GPG keys`选项

![2](http://qs0jixwj6.hn-bkt.clouddn.com/git-4-2.png)

点击`New SSH key`，打开公钥文件将字符串粘贴到到对应的输入框中，点击`Add SSH key`

![3](http://qs0jixwj6.hn-bkt.clouddn.com/git-4-3.png)

这时 Github 会要求输入密码确认一次，验证完成后即可看到公钥添加成功

![4](http://qs0jixwj6.hn-bkt.clouddn.com/git-4-4.png)

接下来只要使用 SSH 地址进行推送就行了，SSH 链接也是可以起别名的

```sh
git remote add origin_ssh SSH地址
```

::: tip
对于其他代码托管服务商都是类似的操作
:::
