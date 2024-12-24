---
title: 逃离羊圈
category: 知识分享
article: false
---

hy2 是一个比较好用的工具，在 Ubuntu 下：

```sh
curl -fsSL https://get.hy2.sh | bash
```

编辑配置文件，注意建议改掉端口号

```sh
vim /etc/hysteria/config.yaml
```

开始启动前一定要关掉 nginx，配置的域名 dns 一定要指向本机 ip，否则无法申请证书成功，启动如果没有问题，那么，便可以启动 nginx 反代并添加如下内容

```plain
stream {
  log_format stream_logging '$remote_addr [$time_local] '
                          'Protocol: $protocol '
                          'Status: $status '
                          'Bytes sent: $bytes_sent '
                          'Bytes received: $bytes_received '
                          'Session time: $session_time';
  server {
    access_log /etc/nginx/log/stream_access.log stream_logging;
    error_log /etc/nginx/log/stream_error.log;
    proxy_next_upstream_tries 3;
    proxy_connect_timeout 10s;     # 连接超时时间
    proxy_timeout 1h;               # 空闲连接保持时间
    proxy_buffer_size 16k;          # 代理缓冲区大小
    proxy_responses 1;              # 响应次数
    listen 4433;
    listen [::]:4433;
    listen 4433 udp;
    listen [::]:4433 udp;
    proxy_pass 127.0.0.1:1443;
  }
}
```

客户端填上域名和服务器配置的密码开始逃离吧
