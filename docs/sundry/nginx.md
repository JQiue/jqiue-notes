---
title: Nginx
article: false
---

是一款开源免费，高性能的 Web 服务器，一般用于静态服务和负载均衡以及反向代理：

+ 作为 Web 服务器：相比 Apache，Nginx 占用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应
+ 作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails 和 PHP，也可以支持作为 HTTP 代理服务器对外进行服务。Nginx 用 C 编写, 不论是系统资源开销还是 CPU 使用效率都比 Perl 要好的多
+ 作为邮件代理服务器: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器），Last.fm 描述了成功并且美妙的使用经验

::: code-tabs

@tab Ubuntu

```sh
apt install nginx
```

@tab Arch

```sh
pacman -S nginx
```

:::

在 Ubuntu 中安装后的目录结构大致如下：

+ 程序执行在`/usr/sbin/nginx`
+ 所有的配置文件在`/etc/nginx`
+ 日志文件在`/var/log/nginx`
+ 默认的虚拟主机目录在`/var/www`或`/var/www/html`

在 Windows 中目录结构大致如下：

+ 程序文件在安装的根目录
+ 配置文件在`conf`
+ 日志文件在`logs`
+ 默认的虚拟主机目录在`html`

这是一些常用到的命令：

```sh
nginx # 启动
nginx -v # 查看版本号
nginx -t # 检查配置文件语法错误
nginx -s reload # 重新应用配置文件
nginx -s stop # 快速关闭
nginx -s quit # 等待工作进程处理完成后关闭
```

Nginx 采用的是简单文件格式的配置文件，下面是指令的一些特性

+ 注释 - 以`#`开头
+ 简单指令 - 以分号结尾
+ 块指令 - 以`{}`包围
+ 包含指令 - `include`

```text
events 
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
```

## 虚拟主机

虚拟主机是一种特殊的软硬件技术，它可以将网络上的每一台计算机分成多个虚拟主机，每个虚拟主机可以独立对外提供 Web 服务，这样就可以实现一台主机对外提供多个 Web 服务，每个虚拟主机之间是独立的，互不影响。Nginx 支持 3 种类型的虚拟主机配置：

+ 基于域名的虚拟主机，server_name 来区分虚拟主机——应用：web 网站
+ 基于 ip 的虚拟主机，一个主机绑定多个 ip 地址
+ 基于端口的虚拟主机，端口来区分虚拟主机——应用：公司内部网站，外部网站的管理后台

## 托管静态资源

很简单，这是是一个基于域名的虚拟主机

```text
server { 
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
```

基于 IP 的主机

```plain
server { 
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
```

基于端口的主机

```plain
server
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
```

## 内置变量

| 变量名             | 功能                                                            |
| ------------------ | --------------------------------------------------------------- |
| `$host`            | 请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名 |
| `$request_method`  | 客户端请求类型，如 GET、POST                                    |
| `$remote_addr`     | 客户端的 IP 地址                                                |
| `$args`            | 请求中的参数                                                    |
| `$content_length`  | 请求头中的 Content-length 字段                                  |
| `$http_user_agent` | 客户端 agent 信息                                               |
| `$http_cookie`     | 客户端 cookie 信息                                              |
| `$remote_addr`     | 客户端的 IP 地址                                                |
| `$remote_port`     | 客户端的端口                                                    |
| `$server_protocol` | 请求使用的协议，如 HTTP/1.0、HTTP/1.1                           |
| `$server_addr`     | 服务器地址                                                      |
| `$server_name`     | 服务器名称                                                      |
| `$server_port`     | 服务器的端口号                                                  |

## 反向代理

正向代理是为客户端服务的，客户端可以通过正向代理访问它本身无法访问到的服务器。对于服务端来说，服务端无法区分是否来自代理访问还是真实客户端访问

反向代理是为服务端服务的，反向代理可以帮助服务端接受请求，进行请求转发，负载均衡等。反向代理隐藏了真实的服务端，这对于客户端来说是没有感知的，就像拨打`10086`一样，每次接电话的客服并不是同一个人，而是由`10086`分配一个客服，`10086`就承担着反向代理的角色

nginx 反向代理靠`proxy_pass`项来完成，比如：

```text
server {
  listen 80;
  server_name jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
  }
}
```

这个配置就是说，将来自`jinqiu.wang:80`端口的请求，代理到`http://127.0.0.1:8888`上面，由`http://127.0.0.1:8888`处理真正的请求

在使用反向代理的时候，每次请求的 IP 都是本地 IP，这是因为 Nginx 所在的运行环境所致，导致处理方永远获得的都是 Nginx 的地址，如果有获取用户 IP 的需求，可以增加配置项

```text
server {
  listen 80;
  server_name jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

意思是说，Nginx 将请求方的地址添加到请求头中，因此真正处理请求的机器，可以通过这个请求头来获取请求方的真实 IP

::: caution
Nginx 无法分辨请求方的 IP 是否真实，也可能是伪造的
:::

## 设置响应头

比如跨域请求可使用`add_header`进行添加跨域头来允许

```text
server {
  listen 80;
  server_name httptest.jinqiu.wang;
  location / {
    proxy_pass http://127.0.0.1:8888;
    add_header Access-Control-Allow-Origin *;
  }
}
```

## 请求体大小

如果上传的文件过大，会返回 413 错误，Nginx 默认是 1m 大小的限制，但是可以添加`client_max_body_size`进行修改

```text
server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
```

## 带宽速率限制

默认情况下，有多少带宽，Nginx 就能消耗掉多少，Nginx 允许限制来自 HTTP 连接所使用的最大速率，比如使用`limit_rate`就可以限制下载速度：

```text
server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    limit_rate 100k;
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
```

甚至可以优化一下，比如前 10m 不限速，超过后开始限速：

```text
server {
  listen 80;
  server_name space.jinqiu.wang;
  location / {
    limit_rate_after 10m;
    limit_rate 100k;
    client_max_body_size 50m;
    proxy_pass http://127.0.0.1:8889;
  }
}
```

## gzip 压缩传输

gzip 压缩能够提高网站速度节约网站流量，开启 gzip 之后的网站加载速度几乎是未开启的两倍，所以非常推荐开启，将下面的内容添加到配置文件，重启 nginx

```plain
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types application/atom+xml application/geo+json application/javascript application/x-javascript application/json application/ld+json application/manifest+json application/rdf+xml application/rss+xml application/xhtml+xml application/xml font/eot font/otf font/ttf image/svg+xml text/css text/javascript text/plain text/xml;
```

`gzip_comp_level`表示压缩等级，越小压缩比越低，取值为`0-9`，一般取`6`

只需要检查响应头是否包含`content-encoding: gzip`即可

## 负载均衡

负载均衡是为了解决某一个服务挂掉不能访问，而影响用户的体验，一般来说 nginx 的配置会将请求分发到同一个服务，如果挂掉了话仍然会分发给这个服务，这时候就需要负载均衡

```
upstream youngfitapp { 
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
```

`upstream`有四种负载均衡调度算法：

1. 轮询 - 每个请求按时间顺序逐一分配到不同的后端服务器，这是默认的
2. ip_hash - 每个请求按访问 IP 的 hash 结果分配，同一个 IP 客户端固定访问一个后端服务器。可以保证来自同一 IP 的请求被打到固定的机器上，可以解决 session 问题
3. url_hash - 按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器
4. fair - 依据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配

默认情况下就是轮询，此时权重都为 1，分发顺序为：ABABABABAB...

```plain
upstream youngfitapp { 
  server 192.168.1.0:8080;
  server 192.168.1.1:8080;
}
```

也可以更改权重，比如下面的顺序为：ABBABBABBABB...

```plain
upstream youngfitapp { 
  server 192.168.1.0:8080 weight=1;
  server 192.168.1.1:8080 weight=2;
}
```

ip_hash

```plain
upstream youngfitapp {
  ip_hash;
  server 192.168.62.157:8080; 
  server 192.168.62.158:8080;   
}
```

url_hash

upstream youngfitapp {
  url_hash;
  server 192.168.62.157:8080;
  server 192.168.62.158:8080;
}

可以为指定的服务器设置状态：

+ down - 暂时不参与负载均衡
+ backup - 预留的备份机器，只有当所有的非 backup 挂掉或者忙的时候，才会请求

可以指定某个服务器为热备，当其他服务器挂掉时才使用该服务器提供服务

```plain
upstream youngfitapp { 
  server 192.168.1.0:8080;
  server 192.168.1.1:8080;
  server 192.168.1.2:8080 down;
  server 192.168.1.3:8080 backup;
}
```

## location

| 修饰符 | 含义                                                   |
| ------ | ------------------------------------------------------ |
| =      | 表示精确匹配，优先级也是最高的                         |
| ^~     | 表示 url 以某个常规字符串开头，理解为匹配 url 路径即可 |
| ~      | 表示区分大小写的正则匹配                               |
| ~*     | 表示不区分大小写的正则匹配                             |
| !~     | 表示区分大小写不匹配的正则                             |
| !~*    | 表示不区分大小写不匹配的正则                           |
| /      | 通用匹配，任何请求都会匹配到                           |

示例

```plain
location / {
　　# 匹配任何以 / 开始的查询，但是正则表达式与一些较长的字符串将被首先匹配
}
location = / {
　　# 只匹配 / 的查询
}
location ^~ /images/ {
　　# 匹配任何以 /images/ 开始的查询并且停止搜索，不检查正则表达式
}
location ~* \.(gif|jpg|jpeg)$ {
　　# 匹配任何以 gif, jpg, or jpeg 结尾的文件
}
```

## 配置 HTTPS

必须先有 SSL 证书，通常在第三方申请，下载私钥和证书在 nginx 中配置

```plain
server {
  listen 443 ssl;
  server_name jinqiu.wang;

  ssl on;
  ssl_certificate      jinqiu.wang.pem;
  ssl_certificate_key  jinqiu.wang.key;
  ssl_session_timeout  5m;
  ssl_protocols        TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers          ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers on;

  location / {
    root  /dist;
    index index.html index.htm;
  }
}
```

## 地址重写

<!-- todo -->

## 动静分离

<!-- todo -->

## 自动 HTTPS

Nginx 可以通过 Let's Encrypt 来自动申请证书

安装 cerbot 以及 certbot-nginx

```sh
pacman -S certbot certbot-nginx
```

配置 Nginx，比如`your.conf`

```plain
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl;
  server_name yourdomain.com www.yourdomain.com;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  ssl_ciphers EECDH+AESGCM:EDH+AESGCM;
  ssl_ecdh_curve secp384r1;
  ssl_session_timeout  10m;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;
  ssl_stapling on;
  ssl_stapling_verify on;

  location / {
      proxy_pass http://localhost:YOUR_APP_PORT;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

获取证书，这一步需要验证域名所有权，否则无法申请成功，如果申请成功，将会修改对应的 Nginx 配置文件添加对应证书文件

```sh
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Let's Encrypt 的证书有效期为 90 天，certbot 已经提供自动续期服务，开启自动续期

```sh
systemctl enable certbot-renew.timer
systemctl start certbot-renew.timer
```
