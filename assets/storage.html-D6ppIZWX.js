import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a,o as e}from"./app-DVDv7FET.js";const n={};function l(h,i){return e(),t("div",null,i[0]||(i[0]=[a(`<p>C 中的变量和函数都有两种属性：数据类型和数据存储类型</p><p>数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括<code>auto</code>、<code>static</code>、<code>extern</code>、<code>register</code>这四种类型</p><p>数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在</p><ul><li>作用域：作用域分为局部作用域和全局作用域</li><li>可见性：</li><li>生命周期</li><li>初始值</li></ul><h2 id="auto" tabindex="-1"><a class="header-anchor" href="#auto"><span>auto</span></a></h2><p>在函数或块中声明的所有变量的如果没有进行特殊类型声明，则默认类型都是<code>auto</code>，它会在函数调用的时候分配内存，在调用结束后被释放掉</p><h2 id="static" tabindex="-1"><a class="header-anchor" href="#static"><span>static</span></a></h2><p>使用<code>static</code>声明的变量会在程序开始的时候初始化，然后一直保留着程序结束，但是它的作用域取决于它定义的位置，所以又分为局部静态变量和全局静态变量</p><ul><li>定义在函数内，函数外不能访问</li><li>定义在函数外，对该文件内所见，但不能被其他文件访问</li></ul><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> count </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%d</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">count);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 2</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以静态变量在被函数调用完毕时并不会消失，会一直保留着状态在内存中</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>静态变量会自动初始化为<code>0</code></p></div><h2 id="register" tabindex="-1"><a class="header-anchor" href="#register"><span>register</span></a></h2><p>使用<code>register</code>定义的变量会保存在 CPU 的通用寄存器内，由于寄存器的读写速度比内存快很多，所以变量的数据读取也很快</p><p>但是寄存器是有限的，不可能定义太多寄存器变量，当寄存器用完时，定义寄存器类型的变量会自动变为<code>auto</code></p><h2 id="extern" tabindex="-1"><a class="header-anchor" href="#extern"><span>extern</span></a></h2><p>C 的变量遵循“先声明，后引用”的使用方式，那么外部变量可以打破这种做法</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 只是声明一下</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  extern</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> foo;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, foo);</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 123</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 真正的定义在这</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> foo </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 123</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，外部变量不能声明的同时初始化，否则无法编译通过。另外需要注意的一点是，它的作用域也取决于声明位置</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><table><thead><tr><th>存储说明符</th><th>存储位置</th><th>初始化值</th><th>作用域</th><th>生命周期</th></tr></thead><tbody><tr><td>auto</td><td>栈</td><td>垃圾值</td><td>块</td><td>块的结束</td></tr><tr><td>static</td><td>静态</td><td>0</td><td>块</td><td>程序的结束</td></tr><tr><td>register</td><td>寄存器</td><td>垃圾值</td><td>块</td><td>块的结束</td></tr><tr><td>extern</td><td>静态</td><td>0</td><td>所有的文件</td><td>程序的结束</td></tr></tbody></table>`,21)]))}const r=s(n,[["render",l],["__file","storage.html.vue"]]),k=JSON.parse(`{"path":"/c/storage.html","title":"存储类型","lang":"zh-CN","frontmatter":{"title":"存储类型","category":"编程语言","tag":["C"],"article":false,"order":8,"description":"C 中的变量和函数都有两种属性：数据类型和数据存储类型 数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括auto、static、extern、register这四种类型 数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在 作用域：作用域分为局部作用域和全局作用域 可见性： 生命周期 ...","head":[["meta",{"property":"og:url","content":"https://jinqiu.wang/c/storage.html"}],["meta",{"property":"og:site_name","content":"JQiue's notes"}],["meta",{"property":"og:title","content":"存储类型"}],["meta",{"property":"og:description","content":"C 中的变量和函数都有两种属性：数据类型和数据存储类型 数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括auto、static、extern、register这四种类型 数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在 作用域：作用域分为局部作用域和全局作用域 可见性： 生命周期 ..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-25T05:39:22.000Z"}],["meta",{"property":"article:tag","content":"C"}],["meta",{"property":"article:modified_time","content":"2024-12-25T05:39:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"存储类型\\",\\"description\\":\\"C 中的变量和函数都有两种属性：数据类型和数据存储类型 数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括auto、static、extern、register这四种类型 数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在 作用域：作用域分为局部作用域和全局作用域 可见性： 生命周期 ...\\"}"]]},"headers":[{"level":2,"title":"auto","slug":"auto","link":"#auto","children":[]},{"level":2,"title":"static","slug":"static","link":"#static","children":[]},{"level":2,"title":"register","slug":"register","link":"#register","children":[]},{"level":2,"title":"extern","slug":"extern","link":"#extern","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1735105162000,"updatedTime":1735105162000,"contributors":[{"name":"JQiue","username":"JQiue","email":"861947542@qq.com","commits":1,"url":"https://github.com/JQiue"}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"c/storage.md","localizedDate":"2024年12月25日","excerpt":"<p>C 中的变量和函数都有两种属性：数据类型和数据存储类型</p>\\n<p>数据的存储类型可以划分为两大类型：静态存储和动态存储，具体包括<code>auto</code>、<code>static</code>、<code>extern</code>、<code>register</code>这四种类型</p>\\n<p>数据存储类型主要用于描述变量存储的作用域、可见性、生命周期，它可以帮助我们在程序运行期间追踪特定变量的存在</p>\\n<ul>\\n<li>作用域：作用域分为局部作用域和全局作用域</li>\\n<li>可见性：</li>\\n<li>生命周期</li>\\n<li>初始值</li>\\n</ul>","autoDesc":true}`);export{r as comp,k as data};