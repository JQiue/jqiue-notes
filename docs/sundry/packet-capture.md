---
title: 网络抓包
category: 知识分享
article: false
---

抓包其中涉及三个角色：客户端，代理，目标服务器

原本正常访问网页或 App 路径是： 客户端->目标服务器。抓包，其实就加入了一个代理，客户端->代理->目标服务器，只有这三者产生一定的联系，才能进行拦截/抓取一些东西，客户端先访问代理，代理把客户端的信息记录下来，代理再去联系目标服务器，进而返回给客户端

Fiddler 是一个通过代理的方式来进行抓包工具，运行时会在本地建立一个代理服务，默认地址：127.0.0.1:8888，在使用 Fiddler 之前要先安装证书，如果允许远程计算机设备连接，则要去勾选相关配置

## 过滤

抓包的时候，会抓到其它网站的包，如果想要抓指定网站的包，可以设置过滤器，其他网站就会被屏蔽掉

在 Filters 中勾选 Use Filters，有两种过滤方式，根据 Hosts 过滤和进程过滤

选择 Show only following Hosts，并在下面写是要过滤的域名或 ip + 端口号，多个 HOST 之间用`;`号隔开

如果要根据进程过滤，则勾选 Show only traffic from，并选择一个应用进程，或者直接在工具栏中拖动进程过滤按钮到需要过滤的窗口程序上

最后点击 Actions 开始过滤

## 断点

在 Rules 中设置断点，断点可以拦截请求和响应：

+ 前置断点：拦截请求
+ 后置断点：拦截响应

添加前置断点之后，所有的请求前面都是红色的，表示被断点，请求有数据，响应没数据，因为还没有发送数据，所有的请求都被拦截中

后置断点会拦截服务器发送给客户端的数据，可以对数据进行任意的修改,然后再发送给客户端

## mock

可以在 AutoResponder 中设置规则，用来定义响应数据，它不同于修改，是完完全全的重写响应

## 弱网

甚至可以模拟网络不好的情况，在 FiddlerScript 中找到以下代码：

```java
if (m_SimulateModem) {
  // Delay sends by 300ms per KB uploaded.
  oSession["request-trickle-delay"] = "300"; 
  // Delay receives by 150ms per KB downloaded.
  oSession["response-trickle-delay"] = "150"; 
}
```

修改数字即可调整发送或者响应的速度了，最后在 Rulur>Performance 中开启

## 参考

+ HTTP 抓包实战
