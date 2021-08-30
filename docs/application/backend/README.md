---
title: 后端
author: JQiue
tags: [Alpha]
article: false
---

后端即“服务器端”开发

## cookie

cookie 一般用来做账户验证，因为它可以保留在浏览器中，在每一次请求中携带，这样服务端就可以分析 cookie 作出响应

## session

session 是一种保存在服务端的信息，是用来解决 cookie 不安全的问题，因为 cookie 可能会保存用户的信息，从而让有意者察觉，所以 cookie 一般只存储转换后的用户信息，对应着 session 中的用户信息

由于 session 访问频率极高，对性能要求比较高，而且不会考虑丢失数据问题，并且数据量不会太大，对于一些持久性数据库就不太适用了，适合 Redis 这种缓存型数据库
