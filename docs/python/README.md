---
title: Python
category: 编程语言
tag: [Python]
article: false
---

Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义”

Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的

基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大的库，利用这些 Python 库，程序员可以把使用其它语言制作的各种模块（尤其是 C 和 C++）很轻松地联结在一起，因此 Python 又常被称为“胶水”语言。这使 Python 几乎无所不能，不管是传统的 Web 开发，PC 软件开发，Linux 运维，还是当下最热门的机器学习，大数据分析，网络爬虫，它都能胜任

同时 Python 也是完全面向对象的语言，函数，模块，数字，字符串都是对象，在 Python 中一切皆对象

从整体上来看，Python 最大的特点就是简单：

1. 语法简洁明了，即使是非专业的初学者也非常容易上手
2. 和其他语言相比，要实现同一个功能，而 Python 的代码往往是最短的
3. 丰富的标准库和第三方库，大大减少了开发工作量

Python，作为一种解释型语言，运行速度相对较慢。这是所有解释型语言的共同特点，不仅仅是 Python 的问题。正是因为 Python 屏蔽了很多底层细节，这个代价是非常大的，这个过程中 Python 需要做出很多工作，消耗了较多资源。然而，这个问题并非无解。有些实现如 PyPy 通过即时编译（JIT）等技术显著提升了 Python 的执行速度。此外，对于大多数应用场景，Python 的性能已经足够，而且随着硬件性能的不断提升，这个问题变得越来越不明显。在需要极高性能的场景下，可以考虑使用 Cython 或其他优化技术，或者将关键部分用 C/C++ 实现然后集成到 Python 中

Python 3.x 是一次重大升级，为了避免引入历史包袱，Python 3.x 和 Python 2.x 并没有考虑兼容性，这导致大部分已经使用 Python 2.x 生产的应用项目无法升级 Python 3.x，虽然官方仍在维护 Python 2.x，但是大部分刚刚起步的项目却使用的 Python 3.x，学新不学旧才是最聪明的做法，因此 Python 3 才是学习的主力，但是对于学透的人来说，无非就是写法上的不同

## Python 的实现

Python 不仅在说语言本身，也包括具体的实现，Python 实际上是一个可以通过不同的方式来实现的语言规范

+ [CPython](http://www.python.org/) - 官方版本的 C 语言实现，大部分人的选择
+ [PyPy](https://www.pypy.org/) - 支持 JIT 即时编译，具有静态类型，特点是运行速度快
+ [Cython](https://cython.org/) - 将 Python 代码编译成 C 代码，可以显著提高性能
+ [Jython](http://www.jython.org/) - 可以运行在 Java 平台，如果想要和 Java 代码库进行对接，或为 JVM 编写，就应该考虑它
+ [IronPython](https://ironpython.net/) - 可以运行在 .NET 和 Mono 平台

## 安装 && 运行

::: tabs

@tab:active Windows

在 Windows 上安装 Python 就像安装普通软件一样简单，下载安装包一路猛击即可

安装包地址：[Download](https://www.python.org/downloads/)

前缀说明：

+ 以`windows x86-64`开头的是 64 位的 Python 安装程序
+ 以`windows x86`开头的是 32 位的 Python 安装程序

后缀说明：

+ `embeddable zip file`表示`.zip`格式的绿色免安装版本，可以直接嵌入（集成）到其它的应用程序中
+ `executable installer`表示`.exe`格式的可执行程序，这是完整的离线安装包，一般选择这个即可
+ `web-based installer`表示通过网络安装的，也就是说下载到的是一个 Python 安装器，而不是本身，安装过程中还需要联网下载真正的 Python 安装包

安装时候请尽量勾选`Add Python 3.8 to PATH`，这样就可以在系统任何位置使用 Python 提供的命令工具

安装完成后会获得四个可运行程序：

![exe](https://gitee.com/jqiue/img_upload/raw/master/images/Snipaste_2020-09-12_23-21-00.png)

+ Module Docs：类库文档
+ IDLE：简易开发环境
+ Manuals：使用手册
+ Python：进入交互式命令界面

@tab Linux

大多数 Linux 发行版已预装 Python，如果需要安装或升级，可以使用发行版的包管理器。例如，在 Ubuntu 上：

```sh
sudo apt update
sudo apt install python3
```

:::

Python 支持两种代码的运行方式：

1. 交互式 - 直接在命令行中输入 python 或 python3 启动交互式环境，优点是适合学习语法和部分代码，缺点是代码不能保存，不能用来做太大的项目
2. 文件式 - 创建`<filename>.py`文件，然后使用 python filename.py 运行，此模式适合编写完整的项目

## 包管理器

pip 是官方的包管理器

```sh
pip install <packagename>         # 安装包
pip uninstall <packagename>       # 卸载包
pip list                          # 列出已安装的包
pip freeze > requirements.txt     # 生成依赖列表
pip install -r requirements.txt   # 从依赖列表安装包
```

### requirements.txt

`requirements.txt`文件列出了当前项目所有依赖的包及其版本，方便在其他环境重新部署项目。手动编写`requirements.txt`较为繁琐，通常使用`pip freeze`命令自动生成

```
annotated-types==0.6.0
anyio==4.3.0
click==8.1.7
colorama==0.4.6
fastapi==0.110.0
h11==0.14.0
idna==3.6
pydantic==2.6.3
pydantic_core==2.16.3
sniffio==1.3.1
starlette==0.36.3
typing_extensions==4.10.0
uvicorn==0.27.1
```

### 虚拟环境

Python 应用通常会使用许多第三方包，不同的应用所需的包也不尽相同。为了避免不同的项目之间产生依赖包的版本冲突，Python 提供了虚拟环境(virtual environment)的功能。虚拟环境是 Python 解释器的一个独立副本，每个虚拟环境都有自己的 Python 二进制文件、库和脚本目录，与系统全局环境和其他虚拟环境隔离

Python 3.3 及以上版本通过 venv 模块原生支持虚拟环境，无需额外安装。创建虚拟环境的命令:

```sh
python -m venv /path/to/new/virtual/environment
```

例如要在当前目录下创建一个名为 venv 的虚拟环境，可以运行:

```sh
python -m venv venv
```

创建好虚拟环境后，需要激活才能使用,Windows 下激活虚拟环境:

```sh
venv\Scripts\activate
```

Linux 或 macOS 下激活虚拟环境:

```sh
source venv/bin/activate
```

进入虚拟环境后，命令行提示符前面会出现虚拟环境的名称，表示当前正在虚拟环境中运行。在虚拟环境中安装的包不会影响系统全局环境

退出虚拟环境，只需运行:

```sh
deactivate
```

### uv

uv 是用 Rust 编写的非常快的 Python 包和项目管理器

```sh
uv python install           # 安装最新版 Python
uv python install 3.11 3.12 # 安装特定版本以及多个版本
uv python install pypy@3.12 # 安装其他实现
uv python list              # 查看可用和已安装的 Python 版本
uv run example.py           # 运行脚本
uv tool install ruff        # 安装工具
uv tool upgrade ruff        # 升级工具
uv init hello-world         # 初始化一个项目
uv build                    # 构建项目
uv add requests             # 添加依赖到 pyproject.toml
uv remove requests          # 添加依赖到 pyproject.toml
uvx ruff                    # 运行工具
```

## 参考资料

+ Python 编程：从入门到实践
