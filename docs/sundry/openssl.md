---
title: 使用 openssl 生成证书
category: 知识分享
tags: [Alpha]
author: JQiue
article: false
---

使用 openssl 可以快速的生成用于本地测试的证书，最常见的情况是自签名证书，openssl 提供了快速的命令

```sh
openssl req -newkey rsa:2048 -keyout key.pem -nodes -out cert.pem -x509 -days 365
```

在提示通用名 common name 时，输入 localhost

以上就生成了 2048 位 RSA 算法的自签名证书 cert.pem，有效期为 365 天，密钥为 key.pem，大部分 SSL 只需要这两个文件。然后可以启动 openssl 自带的服务器来测试

```sh
openssl s_server -WWW -key key.pem -cert cert.pem -accept 8888
```

此时浏览器访问`https://localhost:8888`即可进行访问，当然会看到不信任的证书，但只要能够说明证书可以用于本地测试就够了

如果想要解决浏览器该死的不信任，应该到[这里](https://gist.github.com/soarez/9688998)
