import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,a as l,d as k,e as a,r as d,o,f as s,b as i}from"./app-DVDv7FET.js";const y={};function c(g,n){const h=d("Tabs");return o(),r("div",null,[n[4]||(n[4]=l('<p>Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义”</p><p>Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的</p><p>基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大的库，利用这些 Python 库，程序员可以把使用其它语言制作的各种模块（尤其是 C 和 C++）很轻松地联结在一起，因此 Python 又常被称为“胶水”语言。这使 Python 几乎无所不能，不管是传统的 Web 开发，PC 软件开发，Linux 运维，还是当下最热门的机器学习，大数据分析，网络爬虫，它都能胜任</p><p>同时 Python 也是完全面向对象的语言，函数，模块，数字，字符串都是对象，在 Python 中一切皆对象</p><p>从整体上来看，Python 最大的特点就是简单：</p><ol><li>语法简洁明了，即使是非专业的初学者也非常容易上手</li><li>和其他语言相比，要实现同一个功能，而 Python 的代码往往是最短的</li><li>丰富的标准库和第三方库，大大减少了开发工作量</li></ol><p>Python，作为一种解释型语言，运行速度相对较慢。这是所有解释型语言的共同特点，不仅仅是 Python 的问题。正是因为 Python 屏蔽了很多底层细节，这个代价是非常大的，这个过程中 Python 需要做出很多工作，消耗了较多资源。然而，这个问题并非无解。有些实现如 PyPy 通过即时编译（JIT）等技术显著提升了 Python 的执行速度。此外，对于大多数应用场景，Python 的性能已经足够，而且随着硬件性能的不断提升，这个问题变得越来越不明显。在需要极高性能的场景下，可以考虑使用 Cython 或其他优化技术，或者将关键部分用 C/C++ 实现然后集成到 Python 中</p><p>Python 3.x 是一次重大升级，为了避免引入历史包袱，Python 3.x 和 Python 2.x 并没有考虑兼容性，这导致大部分已经使用 Python 2.x 生产的应用项目无法升级 Python 3.x，虽然官方仍在维护 Python 2.x，但是大部分刚刚起步的项目却使用的 Python 3.x，学新不学旧才是最聪明的做法，因此 Python 3 才是学习的主力，但是对于学透的人来说，无非就是写法上的不同</p><h2 id="python-的实现" tabindex="-1"><a class="header-anchor" href="#python-的实现"><span>Python 的实现</span></a></h2><p>Python 不仅在说语言本身，也包括具体的实现，Python 实际上是一个可以通过不同的方式来实现的语言规范</p><ul><li><a href="http://www.python.org/" target="_blank" rel="noopener noreferrer">CPython</a> - 官方版本的 C 语言实现，大部分人的选择</li><li><a href="https://www.pypy.org/" target="_blank" rel="noopener noreferrer">PyPy</a> - 支持 JIT 即时编译，具有静态类型，特点是运行速度快</li><li><a href="https://cython.org/" target="_blank" rel="noopener noreferrer">Cython</a> - 将 Python 代码编译成 C 代码，可以显著提高性能</li><li><a href="http://www.jython.org/" target="_blank" rel="noopener noreferrer">Jython</a> - 可以运行在 Java 平台，如果想要和 Java 代码库进行对接，或为 JVM 编写，就应该考虑它</li><li><a href="https://ironpython.net/" target="_blank" rel="noopener noreferrer">IronPython</a> - 可以运行在 .NET 和 Mono 平台</li></ul><h2 id="安装-运行" tabindex="-1"><a class="header-anchor" href="#安装-运行"><span>安装 &amp;&amp; 运行</span></a></h2>',12)),k(h,{id:"74",data:[{id:"Windows"},{id:"Linux"}],active:0},{title0:a(({value:e,isActive:t})=>n[0]||(n[0]=[s("Windows")])),title1:a(({value:e,isActive:t})=>n[1]||(n[1]=[s("Linux")])),tab0:a(({value:e,isActive:t})=>n[2]||(n[2]=[i("p",null,"在 Windows 上安装 Python 就像安装普通软件一样简单，下载安装包一路猛击即可",-1),i("p",null,[s("安装包地址："),i("a",{href:"https://www.python.org/downloads/",target:"_blank",rel:"noopener noreferrer"},"Download")],-1),i("p",null,"前缀说明：",-1),i("ul",null,[i("li",null,[s("以"),i("code",null,"windows x86-64"),s("开头的是 64 位的 Python 安装程序")]),i("li",null,[s("以"),i("code",null,"windows x86"),s("开头的是 32 位的 Python 安装程序")])],-1),i("p",null,"后缀说明：",-1),i("ul",null,[i("li",null,[i("code",null,"embeddable zip file"),s("表示"),i("code",null,".zip"),s("格式的绿色免安装版本，可以直接嵌入（集成）到其它的应用程序中")]),i("li",null,[i("code",null,"executable installer"),s("表示"),i("code",null,".exe"),s("格式的可执行程序，这是完整的离线安装包，一般选择这个即可")]),i("li",null,[i("code",null,"web-based installer"),s("表示通过网络安装的，也就是说下载到的是一个 Python 安装器，而不是本身，安装过程中还需要联网下载真正的 Python 安装包")])],-1),i("p",null,[s("安装时候请尽量勾选"),i("code",null,"Add Python 3.8 to PATH"),s("，这样就可以在系统任何位置使用 Python 提供的命令工具")],-1),i("p",null,"安装完成后会获得四个可运行程序：",-1),i("p",null,[i("img",{src:"https://gitee.com/jqiue/img_upload/raw/master/images/Snipaste_2020-09-12_23-21-00.png",alt:"exe"})],-1),i("ul",null,[i("li",null,"Module Docs：类库文档"),i("li",null,"IDLE：简易开发环境"),i("li",null,"Manuals：使用手册"),i("li",null,"Python：进入交互式命令界面")],-1)])),tab1:a(({value:e,isActive:t})=>n[3]||(n[3]=[i("p",null,"大多数 Linux 发行版已预装 Python，如果需要安装或升级，可以使用发行版的包管理器。例如，在 Ubuntu 上：",-1),i("div",{class:"language-sh line-numbers-mode","data-highlighter":"shiki","data-ext":"sh","data-title":"sh",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"sudo"),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," apt"),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," update")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"sudo"),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," apt"),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," install"),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," python3")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1)])),_:1}),n[5]||(n[5]=l(`<p>Python 支持两种代码的运行方式：</p><ol><li>交互式 - 直接在命令行中输入 python 或 python3 启动交互式环境，优点是适合学习语法和部分代码，缺点是代码不能保存，不能用来做太大的项目</li><li>文件式 - 创建<code>&lt;filename&gt;.py</code>文件，然后使用 python filename.py 运行，此模式适合编写完整的项目</li></ol><h2 id="包管理器" tabindex="-1"><a class="header-anchor" href="#包管理器"><span>包管理器</span></a></h2><p>pip 是官方的包管理器</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">packagenam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">e&gt;         </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 安装包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> uninstall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">packagenam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">e&gt;       </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 卸载包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">                          # 列出已安装的包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> freeze</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">requirements.txt</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">     # 生成依赖列表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> requirements.txt</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   # 从依赖列表安装包</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requirements-txt" tabindex="-1"><a class="header-anchor" href="#requirements-txt"><span>requirements.txt</span></a></h3><p><code>requirements.txt</code>文件列出了当前项目所有依赖的包及其版本，方便在其他环境重新部署项目。手动编写<code>requirements.txt</code>较为繁琐，通常使用<code>pip freeze</code>命令自动生成</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>annotated-types==0.6.0</span></span>
<span class="line"><span>anyio==4.3.0</span></span>
<span class="line"><span>click==8.1.7</span></span>
<span class="line"><span>colorama==0.4.6</span></span>
<span class="line"><span>fastapi==0.110.0</span></span>
<span class="line"><span>h11==0.14.0</span></span>
<span class="line"><span>idna==3.6</span></span>
<span class="line"><span>pydantic==2.6.3</span></span>
<span class="line"><span>pydantic_core==2.16.3</span></span>
<span class="line"><span>sniffio==1.3.1</span></span>
<span class="line"><span>starlette==0.36.3</span></span>
<span class="line"><span>typing_extensions==4.10.0</span></span>
<span class="line"><span>uvicorn==0.27.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="虚拟环境" tabindex="-1"><a class="header-anchor" href="#虚拟环境"><span>虚拟环境</span></a></h3><p>Python 应用通常会使用许多第三方包，不同的应用所需的包也不尽相同。为了避免不同的项目之间产生依赖包的版本冲突，Python 提供了虚拟环境(virtual environment)的功能。虚拟环境是 Python 解释器的一个独立副本，每个虚拟环境都有自己的 Python 二进制文件、库和脚本目录，与系统全局环境和其他虚拟环境隔离</p><p>Python 3.3 及以上版本通过 venv 模块原生支持虚拟环境，无需额外安装。创建虚拟环境的命令:</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> venv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /path/to/new/virtual/environment</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>例如要在当前目录下创建一个名为 venv 的虚拟环境，可以运行:</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> venv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> venv</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建好虚拟环境后，需要激活才能使用,Windows 下激活虚拟环境:</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">venv\\Scripts\\activate</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Linux 或 macOS 下激活虚拟环境:</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> venv/bin/activate</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>进入虚拟环境后，命令行提示符前面会出现虚拟环境的名称，表示当前正在虚拟环境中运行。在虚拟环境中安装的包不会影响系统全局环境</p><p>退出虚拟环境，只需运行:</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">deactivate</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="uv" tabindex="-1"><a class="header-anchor" href="#uv"><span>uv</span></a></h3><p>uv 是用 Rust 编写的非常快的 Python 包和项目管理器</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">           # 安装最新版 Python</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3.11</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3.12</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 安装特定版本以及多个版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pypy@3.12</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 安装其他实现</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">              # 查看可用和已安装的 Python 版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> example.py</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">           # 运行脚本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ruff</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 安装工具</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> upgrade</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ruff</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 升级工具</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> hello-world</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         # 初始化一个项目</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> build</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">                    # 构建项目</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> requests</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">             # 添加依赖到 pyproject.toml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> remove</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> requests</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">          # 添加依赖到 pyproject.toml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uvx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ruff</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">                    # 运行工具</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><ul><li>Python 编程：从入门到实践</li></ul>`,26))])}const v=p(y,[["render",c],["__file","index.html.vue"]]),F=JSON.parse(`{"path":"/python/","title":"Python","lang":"zh-CN","frontmatter":{"title":"Python","category":"编程语言","tag":["Python"],"article":false,"description":"Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义” Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的 基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大...","head":[["meta",{"property":"og:url","content":"https://jinqiu.wang/python/"}],["meta",{"property":"og:site_name","content":"JQiue's notes"}],["meta",{"property":"og:title","content":"Python"}],["meta",{"property":"og:description","content":"Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义” Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的 基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://gitee.com/jqiue/img_upload/raw/master/images/Snipaste_2020-09-12_23-21-00.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-25T05:39:22.000Z"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:modified_time","content":"2024-12-25T05:39:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"Python\\",\\"description\\":\\"Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义” Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的 基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大...\\"}"]]},"headers":[{"level":2,"title":"Python 的实现","slug":"python-的实现","link":"#python-的实现","children":[]},{"level":2,"title":"安装 && 运行","slug":"安装-运行","link":"#安装-运行","children":[]},{"level":2,"title":"包管理器","slug":"包管理器","link":"#包管理器","children":[{"level":3,"title":"requirements.txt","slug":"requirements-txt","link":"#requirements-txt","children":[]},{"level":3,"title":"虚拟环境","slug":"虚拟环境","link":"#虚拟环境","children":[]},{"level":3,"title":"uv","slug":"uv","link":"#uv","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1735105162000,"updatedTime":1735105162000,"contributors":[{"name":"JQiue","username":"JQiue","email":"861947542@qq.com","commits":1,"url":"https://github.com/JQiue"}]},"readingTime":{"minutes":6.25,"words":1876},"filePathRelative":"python/README.md","localizedDate":"2024年12月25日","excerpt":"<p>Python 是一门开源的，免费的，通用型脚本语言，上手简单，功能强大，坚持“极简主义”</p>\\n<p>Python 语言是在 ABC 教学语言的基础上发展来的，遗憾的是，ABC 语言虽然非常强大，但却没有普及应用，Guido 认为是它不开放导致的</p>\\n<p>基于这个考虑，Guido 在开发 Python 时，不仅为其添加了很多 ABC 没有的功能，还为其设计了各种丰富而强大的库，利用这些 Python 库，程序员可以把使用其它语言制作的各种模块（尤其是 C 和 C++）很轻松地联结在一起，因此 Python 又常被称为“胶水”语言。这使 Python 几乎无所不能，不管是传统的 Web 开发，PC 软件开发，Linux 运维，还是当下最热门的机器学习，大数据分析，网络爬虫，它都能胜任</p>","autoDesc":true}`);export{v as comp,F as data};