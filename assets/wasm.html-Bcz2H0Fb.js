import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as n}from"./app-DVDv7FET.js";const l={};function t(h,s){return n(),a("div",null,s[0]||(s[0]=[e(`<p>能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑</p><p>当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适：</p><ol><li>计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的计算性能。这包括科学计算、图像处理、物理模拟等领域</li><li>游戏开发： 在游戏开发中，性能要求较高。使用 WebAssembly 可以将底层游戏引擎或关键算法部分编写为高效的原生代码，以获得更好的游戏性能</li><li>虚拟化和模拟： 在虚拟化、模拟和仿真领域，WebAssembly 可以用于实现更快速和高性能的虚拟机、模拟器或仿真器，以实现更高的效率和更真实的体验</li><li>多平台应用： WebAssembly 是一种平台无关的技术，可以在不同的平台和设备上运行，包括浏览器、移动设备和服务器。使用 WebAssembly 可以实现跨平台的应用程序和库，以提供一致的性能和功能</li><li>重构现有代码库： 如果你有一个现有的代码库，使用 JavaScript 运行时可能会导致性能瓶颈。将关键部分的代码重写为 WebAssembly，可以在不重写整个应用程序的情况下提高性能</li></ol><p>需要注意的是，WebAssembly 不适用于所有情况。对于简单的计算任务、DOM 操作、事件处理等，直接使用 JavaScript 可能更加方便和高效</p><p>在实际应用中，可以通过使用 WebAssembly 和 JavaScript 的混合编程，根据具体需求和任务的特点，选择合适的工具和技术来实现最佳性能和开发效率的平衡</p><h2 id="使用-rust" tabindex="-1"><a class="header-anchor" href="#使用-rust"><span>使用 Rust</span></a></h2><p>首先需要基本的 Rust 环境，创建 Rust 项目：<code>cargo new wasm-example</code></p><p>编辑 Cargo.toml</p><div class="language-toml line-numbers-mode" data-highlighter="shiki" data-ext="toml" data-title="toml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lib</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">crate-type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;cdylib&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">wasm-bindgen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;*&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写 Rust 代码</p><div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">use</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> wasm_bindgen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">prelude</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::*;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">#[wasm_bindgen]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">pub</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> fibonacci_recursive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">n</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">u32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) -&gt; </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">u32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> n</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> &lt;=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> n</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    fibonacci_recursive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">n</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> - </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) + </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fibonacci_recursive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">n</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> - </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装构建 Wasm 的工具：<code>cargo install wasm-pack</code></p><p>开始构建：<code>wasm-pack build</code>，此时会生成一个标准的 NPM 模块</p><h3 id="在前端项目中引用" tabindex="-1"><a class="header-anchor" href="#在前端项目中引用"><span>在前端项目中引用</span></a></h3><p>加载 Wasm 文件必须将该文件放在服务器中，前端项目通过请求获取：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fetch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;http://localhost:8080/wasm_example.wasm&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">then</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">res</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> res</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">arrayBuffer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">then</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">bytes</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> WebAssembly</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">instantiate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">bytes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">then</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">res</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;">fibonacci_recursive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> res</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">instance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">exports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    fibonacci_recursive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  })</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const r=i(l,[["render",t],["__file","wasm.html.vue"]]),d=JSON.parse(`{"path":"/webapi/wasm.html","title":"WebAssembly","lang":"zh-CN","frontmatter":{"title":"WebAssembly","article":false,"description":"能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑 当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适： 计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的...","head":[["meta",{"property":"og:url","content":"https://jinqiu.wang/webapi/wasm.html"}],["meta",{"property":"og:site_name","content":"JQiue's notes"}],["meta",{"property":"og:title","content":"WebAssembly"}],["meta",{"property":"og:description","content":"能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑 当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适： 计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-25T05:39:22.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-25T05:39:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"WebAssembly\\",\\"description\\":\\"能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑 当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适： 计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的...\\"}"]]},"headers":[{"level":2,"title":"使用 Rust","slug":"使用-rust","link":"#使用-rust","children":[{"level":3,"title":"在前端项目中引用","slug":"在前端项目中引用","link":"#在前端项目中引用","children":[]}]}],"git":{"createdTime":1735105162000,"updatedTime":1735105162000,"contributors":[{"name":"JQiue","username":"JQiue","email":"861947542@qq.com","commits":1,"url":"https://github.com/JQiue"}]},"readingTime":{"minutes":2.17,"words":650},"filePathRelative":"webapi/wasm.md","localizedDate":"2024年12月25日","excerpt":"<p>能够以任何语言编写代码，并编译成可在浏览器中运行的代码，并且可以运行在浏览器之外，似乎...是另一个 Node.js 呢，未来的潜力不可小觑</p>\\n<p>当涉及到以下情况时，使用 WebAssembly 比 JavaScript 更合适：</p>\\n<ol>\\n<li>计算密集型任务： 对于需要进行大量数值计算或复杂算法的任务，WebAssembly 可以利用底层的二进制指令集执行，提供更高的计算性能。这包括科学计算、图像处理、物理模拟等领域</li>\\n<li>游戏开发： 在游戏开发中，性能要求较高。使用 WebAssembly 可以将底层游戏引擎或关键算法部分编写为高效的原生代码，以获得更好的游戏性能</li>\\n<li>虚拟化和模拟： 在虚拟化、模拟和仿真领域，WebAssembly 可以用于实现更快速和高性能的虚拟机、模拟器或仿真器，以实现更高的效率和更真实的体验</li>\\n<li>多平台应用： WebAssembly 是一种平台无关的技术，可以在不同的平台和设备上运行，包括浏览器、移动设备和服务器。使用 WebAssembly 可以实现跨平台的应用程序和库，以提供一致的性能和功能</li>\\n<li>重构现有代码库： 如果你有一个现有的代码库，使用 JavaScript 运行时可能会导致性能瓶颈。将关键部分的代码重写为 WebAssembly，可以在不重写整个应用程序的情况下提高性能</li>\\n</ol>","autoDesc":true}`);export{r as comp,d as data};