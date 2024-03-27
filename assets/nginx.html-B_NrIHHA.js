import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as i,c as n,e as d}from"./app-ATmYwE-8.js";const l={},s=d(`<p>是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理：</p><ul><li>作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应</li><li>作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails 和 PHP，也可以支持作为 HTTP代理服务器 对外进行服务。Nginx 用 C 编写, 不论是系统资源开销还是 CPU 使用效率都比 Perl 要好的多</li><li>作为邮件代理服务器: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器），Last.fm 描述了成功并且美妙的使用经验</li></ul><p>在 Linux 中安装：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Ubuntu 中安装后的目录结构大致如下：</p><ul><li>程序执行在<code>/usr/sbin/nginx</code></li><li>所有的配置文件在<code>/etc/nginx</code></li><li>日志文件在<code>/var/log/nginx</code></li><li>默认的虚拟主机目录在<code>/var/www</code>或<code>/var/www/html</code></li></ul><p>在 Windows 中目录结构大致如下：</p><ul><li>程序文件在安装的根目录</li><li>配置文件在<code>conf</code></li><li>日志文件在<code>logs</code></li><li>默认的虚拟主机目录在<code>html</code></li></ul><p>这是一些常用到的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>nginx <span class="token comment"># 启动</span>
nginx <span class="token parameter variable">-v</span> <span class="token comment"># 查看版本号</span>
nginx <span class="token parameter variable">-t</span> <span class="token comment"># 检查配置文件语法错误</span>
nginx <span class="token parameter variable">-s</span> reload <span class="token comment"># 重新应用配置文件</span>
nginx <span class="token parameter variable">-s</span> stop <span class="token comment"># 快速关闭</span>
nginx <span class="token parameter variable">-s</span> quit <span class="token comment"># 等待工作进程处理完成后关闭</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nginx 采用的是简单文件格式的配置文件，下面是指令的一些特性</p><ul><li>注释 - 以<code>#</code>开头</li><li>简单指令 - 以分号结尾</li><li>块指令 - 以<code>{}</code>包围</li><li>包含指令 - <code>include</code></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>events 
{
  # ... 
}
http  
{
  server
  { 
    location path
    {
      # ...
    }
    location path
    {
     # ...
    }
  }
  server
  {
    # ...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="虚拟主机" tabindex="-1"><a class="header-anchor" href="#虚拟主机"><span>虚拟主机</span></a></h3><p>虚拟主机是一种特殊的软硬件技术，它可以将网络上的每一台计算机分成多个虚拟主机，每个虚拟主机可以独立对外提供 Web 服务，这样就可以实现一台主机对外提供多个 Web 服务，每个虚拟主机之间是独立的，互不影响。Nginx 支持 3 种类型的虚拟主机配置：</p><ul><li>基于域名的虚拟主机，server_name 来区分虚拟主机——应用：web 网站</li><li>基于 ip 的虚拟主机，一个主机绑定多个 ip 地址</li><li>基于端口的虚拟主机，端口来区分虚拟主机——应用：公司内部网站，外部网站的管理后台</li></ul><h3 id="托管静态资源" tabindex="-1"><a class="header-anchor" href="#托管静态资源"><span>托管静态资源</span></a></h3><p>很简单，这是是一个基于域名的虚拟主机</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server { 
  listen 80;
  server_name one.com;
  location / {
    root /dist;
    index index.html;
  }
}

server { 
  listen 80;
  server_name two.com;
  location / {
    root /dist;
  index index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于 IP 的主机</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>server { 
  listen 80;
  server_name 192.168.2.0;
  location / {
    root /dist;
  index index.html;
  }
}

server { 
  listen 80;
  server_name 192.168.2.1;
  location / {
    root /dist;
  index index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于端口的主机</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>server
{ 
  listen 80;
  server_name one.com;
  location / {
    root /dist;
    index index.html;
  }
}
server
{ 
  listen 8000;
  server_name one.com;
  location / {
    root /dist;
    index index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内置变量" tabindex="-1"><a class="header-anchor" href="#内置变量"><span>内置变量</span></a></h3><table><thead><tr><th>变量名</th><th>功能</th></tr></thead><tbody><tr><td><code>$host</code></td><td>请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名</td></tr><tr><td><code>$request_method</code></td><td>客户端请求类型，如 GET、POST</td></tr><tr><td><code>$remote_addr</code></td><td>客户端的 IP 地址</td></tr><tr><td><code>$args</code></td><td>请求中的参数</td></tr><tr><td><code>$content_length</code></td><td>请求头中的 Content-length 字段</td></tr><tr><td><code>$http_user_agent</code></td><td>客户端 agent 信息</td></tr><tr><td><code>$http_cookie</code></td><td>客户端 cookie 信息</td></tr><tr><td><code>$remote_addr</code></td><td>客户端的 IP 地址</td></tr><tr><td><code>$remote_port</code></td><td>客户端的端口</td></tr><tr><td><code>$server_protocol</code></td><td>请求使用的协议，如 HTTP/1.0、HTTP/1.1</td></tr><tr><td><code>$server_addr</code></td><td>服务器地址</td></tr><tr><td><code>$server_name</code></td><td>服务器名称</td></tr><tr><td><code>$server_port</code></td><td>服务器的端口号</td></tr></tbody></table><h3 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h3><p>正向代理是为客户端服务的，客户端可以通过正向代理访问它本身无法访问到的服务器。对于服务端来说，服务端无法区分是否来自代理访问还是真实客户端访问</p><p>反向代理是为服务端服务的，反向代理可以帮助服务端接受请求，进行请求转发，负载均衡等。反向代理隐藏了真实的服务端，这对于客户端来说是没有感知的，就像拨打<code>10086</code>一样，每次接电话的客服并不是同一个人，而是由<code>10086</code>分配一个客服，<code>10086</code>就承担着反向代理的角色</p><p>nginx 反向代理靠<code>proxy_pass</code>项来完成，比如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置就是说，将来自<code>jinqiu.wang:80</code>端口的请求，代理到<code>http://127.0.0.1:8888</code>上面，由<code>http://127.0.0.1:8888</code>处理真正的请求</p><p>在使用反向代理的时候，每次请求的 IP 都是本地 IP，这是因为 Nginx 所在的运行环境所致，导致处理方永远获得的都是 Nginx 的地址，如果有获取用户 IP 的需求，可以增加配置项</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是说，Nginx 将请求方的地址添加到请求头中，因此真正处理请求的机器，可以通过这个请求头来获取请求方的真实 IP</p><div class="hint-container caution"><p class="hint-container-title">警告</p><p>Nginx 无法分辨请求方的 IP 是否真实，也可能是伪造的</p></div><h3 id="设置响应头" tabindex="-1"><a class="header-anchor" href="#设置响应头"><span>设置响应头</span></a></h3><p>比如跨域请求可使用<code>add_header</code>进行添加跨域头来允许</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name httptest.jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
    add_header Access-Control-Allow-Origin *;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="请求体大小" tabindex="-1"><a class="header-anchor" href="#请求体大小"><span>请求体大小</span></a></h3><p>如果上传的文件过大，会返回 413 错误，Nginx 默认是 1m 大小的限制，但是可以添加<code>client_max_body_size</code>进行修改</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="带宽速率限制" tabindex="-1"><a class="header-anchor" href="#带宽速率限制"><span>带宽速率限制</span></a></h3><p>默认情况下，有多少带宽，Nginx 就能消耗掉多少，Nginx 允许限制来自 HTTP 连接所使用的最大速率，比如使用<code>limit_rate</code>就可以限制下载速度：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    limit_rate 100k;
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>甚至可以优化一下，比如前 10m 不限速，超过后开始限速：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    limit_rate_after 10m;
    limit_rate 100k;
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-gzip-压缩传输" tabindex="-1"><a class="header-anchor" href="#配置-gzip-压缩传输"><span>配置 gzip 压缩传输</span></a></h3><p>gzip 压缩能够提高网站速度节约网站流量，开启 gzip 之后的网站加载速度几乎是未开启的两倍，所以非常推荐开启，将下面的内容添加到配置文件，重启 nginx</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>gzip on;
gzip_disable &quot;msie6&quot;;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types application/atom+xml application/geo+json application/javascript application/x-javascript application/json application/ld+json application/manifest+json application/rdf+xml application/rss+xml application/xhtml+xml application/xml font/eot font/otf font/ttf image/svg+xml text/css text/javascript text/plain text/xml;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gzip_comp_level</code>表示压缩等级，越小压缩比越低，取值为<code>0-9</code>，一般取<code>6</code></p><p>只需要检查响应头是否包含<code>content-encoding: gzip</code>即可</p><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h3><p>负载均衡是为了解决某一个服务挂掉不能访问，而影响用户的体验，一般来说 nginx 的配置会将请求分发到同一个服务，如果挂掉了话仍然会分发给这个服务，这时候就需要负载均衡</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>upstream youngfitapp { 
  server 192.168.1.0:8080;
  server 192.168.1.1:8080;
}
server {
  listen 80;
  server_name localhost;
  location / {         
    proxy_pass  http://youngfitapp;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>upstream</code>有四种负载均衡调度算法：</p><ol><li>轮询 - 每个请求按时间顺序逐一分配到不同的后端服务器，这是默认的</li><li>ip_hash - 每个请求按访问 IP 的 hash 结果分配，同一个 IP 客户端固定访问一个后端服务器。可以保证来自同一 IP 的请求被打到固定的机器上，可以解决 session 问题</li><li>url_hash - 按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器</li><li>fair - 依据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配</li></ol><p>默认情况下就是轮询，此时权重都为 1，分发顺序为：ABABABABAB...</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>upstream youngfitapp { 
  server 192.168.1.0:8080;
  server 192.168.1.1:8080;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以更改权重，比如下面的顺序为：ABBABBABBABB...</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>upstream youngfitapp { 
  server 192.168.1.0:8080 weight=1;
  server 192.168.1.1:8080 weight=2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ip_hash</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>upstream youngfitapp {
  ip_hash;
  server 192.168.62.157:8080; 
  server 192.168.62.158:8080;   
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url_hash</p><p>upstream youngfitapp { url_hash; server 192.168.62.157:8080; server 192.168.62.158:8080; }</p><p>可以为指定的服务器设置状态：</p><ul><li>down - 暂时不参与负载均衡</li><li>backup - 预留的备份机器，只有当所有的非 backup 挂掉或者忙的时候，才会请求</li></ul><p>可以指定某个服务器为热备，当其他服务器挂掉时才使用该服务器提供服务</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>upstream youngfitapp { 
  server 192.168.1.0:8080;
  server 192.168.1.1:8080;
  server 192.168.1.2:8080 down;
  server 192.168.1.3:8080 backup;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="location" tabindex="-1"><a class="header-anchor" href="#location"><span>location</span></a></h3><table><thead><tr><th>修饰符</th><th>含义</th></tr></thead><tbody><tr><td>=</td><td>表示精确匹配，优先级也是最高的</td></tr><tr><td>^~</td><td>表示 url 以某个常规字符串开头,理解为匹配 url 路径即可</td></tr><tr><td>~</td><td>表示区分大小写的正则匹配</td></tr><tr><td>~*</td><td>表示不区分大小写的正则匹配</td></tr><tr><td>!~</td><td>表示区分大小写不匹配的正则</td></tr><tr><td>!~*</td><td>表示不区分大小写不匹配的正则</td></tr><tr><td>/</td><td>通用匹配，任何请求都会匹配到</td></tr></tbody></table><p>示例</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>location / {
　　# 匹配任何以 / 开始的查询，但是正则表达式与一些较长的字符串将被首先匹配
}
location = / {
　　# 只匹配 / 的查询
}
location ^~ /images/ {
　　# 匹配任何以 /images/ 开始的查询并且停止搜索，不检查正则表达式
}
location ~* \\.(gif|jpg|jpeg)$ {
　　# 匹配任何以 gif, jpg, or jpeg 结尾的文件
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-https" tabindex="-1"><a class="header-anchor" href="#配置-https"><span>配置 HTTPS</span></a></h3><p>必须先有 SSL 证书，通常在第三方申请，下载私钥和证书在 nginx 中配置</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><pre class="language-plain"><code>server {
  listen 443 ssl;
  server_name jinqiu.wang;

  # ssl on;
  ssl_certificate   jinqiu.wang.pem;
  ssl_certificate_key  jinqiu.wang.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers on;

  location / {
    root  /dist;
    index index.html index.htm;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="地址重写" tabindex="-1"><a class="header-anchor" href="#地址重写"><span>地址重写</span></a></h3><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离"><span>动静分离</span></a></h3>`,77),a=[s];function t(r,v){return i(),n("div",null,a)}const m=e(l,[["render",t],["__file","nginx.html.vue"]]),u=JSON.parse(`{"path":"/sundry/nginx.html","title":"Nginx","lang":"zh-CN","frontmatter":{"title":"Nginx","article":false,"description":"是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理： 作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应 作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails ...","head":[["meta",{"property":"og:url","content":"https://jinqiu.wang/sundry/nginx.html"}],["meta",{"property":"og:site_name","content":"JQiue's notes"}],["meta",{"property":"og:title","content":"Nginx"}],["meta",{"property":"og:description","content":"是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理： 作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应 作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails ..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T09:58:11.000Z"}],["meta",{"property":"article:author","content":"JQiue"}],["meta",{"property":"article:modified_time","content":"2024-03-27T09:58:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"Nginx\\",\\"description\\":\\"是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理： 作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应 作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails ...\\"}"]]},"headers":[{"level":3,"title":"虚拟主机","slug":"虚拟主机","link":"#虚拟主机","children":[]},{"level":3,"title":"托管静态资源","slug":"托管静态资源","link":"#托管静态资源","children":[]},{"level":3,"title":"内置变量","slug":"内置变量","link":"#内置变量","children":[]},{"level":3,"title":"反向代理","slug":"反向代理","link":"#反向代理","children":[]},{"level":3,"title":"设置响应头","slug":"设置响应头","link":"#设置响应头","children":[]},{"level":3,"title":"请求体大小","slug":"请求体大小","link":"#请求体大小","children":[]},{"level":3,"title":"带宽速率限制","slug":"带宽速率限制","link":"#带宽速率限制","children":[]},{"level":3,"title":"配置 gzip 压缩传输","slug":"配置-gzip-压缩传输","link":"#配置-gzip-压缩传输","children":[]},{"level":3,"title":"负载均衡","slug":"负载均衡","link":"#负载均衡","children":[]},{"level":3,"title":"location","slug":"location","link":"#location","children":[]},{"level":3,"title":"配置 HTTPS","slug":"配置-https","link":"#配置-https","children":[]},{"level":3,"title":"地址重写","slug":"地址重写","link":"#地址重写","children":[]},{"level":3,"title":"动静分离","slug":"动静分离","link":"#动静分离","children":[]}],"git":{"createdTime":1711533491000,"updatedTime":1711533491000,"contributors":[{"name":"JQiue","email":"861947542@qq.com","commits":1}]},"readingTime":{"minutes":8.07,"words":2421},"filePathRelative":"sundry/nginx.md","localizedDate":"2024年3月27日","excerpt":"<p>是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理：</p>\\n<ul>\\n<li>作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应</li>\\n<li>作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails 和 PHP，也可以支持作为 HTTP代理服务器 对外进行服务。Nginx 用 C 编写, 不论是系统资源开销还是 CPU 使用效率都比 Perl 要好的多</li>\\n<li>作为邮件代理服务器: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器），Last.fm 描述了成功并且美妙的使用经验</li>\\n</ul>","autoDesc":true}`);export{m as comp,u as data};
