---
title: 使用 openssl 生成证书
category: 知识分享
tag: ["SSL"]
date: 2021-03-12
---

## SSL 证书相关基础

一般来说，申请证书的步骤是：

1. 创建一个私钥（key）文件
2. 根据私钥生成一个证书签名请求（csr， Certificate Signing Request）文件
3. 把请求文件提交给权威的证书颁发机构，颁发机构审核通过之后，再根据这些申请信息生成相应的证书（crt， certificate 文件）

证书颁发机构用于给别人签署的证书属于 CA 证书，只要 CA 证书受信任，则 CA 证书签署过的证书也会受信任

而自己给自己签署的证书称为自签署证书，可以当作 CA 证书来使用。只是使用前需要手动加入浏览器等软件的证书信任列表中，否则浏览器会不信任

## 过程

创建私钥（key）

```sh
openssl genrsa -out my.key 2048
```

使用 [openssl](https://www.openssl.org/) 可以快速的生成用于本地测试的证书，最常见的情况是自签名证书，openssl 提供了快速的命令

```sh
openssl req -newkey rsa:2048 -keyout key.pem -nodes -out cert.pem -x509 -days 365
```

在提示通用名`common name`时，输入`localhost`，以上就生成了 2048 位 RSA 算法的自签名证书 cert.pem，有效期为 365 天，私钥为 key.pem，大部分 SSL 只需要这两个文件。然后可以启动 openssl 自带的服务器来测试

```sh
openssl s_server -WWW -key key.pem -cert cert.pem -accept 8888
```

此时浏览器访问`https://localhost:8888`即可进行访问，当然会看到浏览器不信任的证书，但只要证书可以用于本地测试就够了

如果想要解决浏览器该死的不信任，应该到[这里](https://gist.github.com/soarez/9688998)
