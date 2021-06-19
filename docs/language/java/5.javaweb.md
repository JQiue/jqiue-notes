---
title: JavaWeb
category: 编程语言
tag: Java
author: JQiue
article: false
next: false
---

## Tomcat

### 目录介绍

+ bin：存放一些可执行命令，比如启动服务器和关闭服务器
+ conf：存放服务器启动时相关的配置，核心配置文件`server.xml`
+ lib：运行时依赖的库
+ logs：存放执行日志信息的目录
+ temps：临时文件夹目录
+ webapps：发布应用的目录，默认自带五个项目
+ work：处理 JSP 的工作目录

### 创建 Web 应用目录

+ WEB-INF
  + classes：编译后的 java 字节码文件
  + lib：java 运行后依赖的 jar 包
  + web.xml：当前项目的配置文件
+ index.jsp

## 上下文配置

`server.xml`

```xml
<Context docBase="" path="" reloadable="" source=""/>
```

+ docBase：文件的目录
+ path：网页路径
+ reloadable：字节码改变时重新加载服务器

## Servlet

运行在服务端的 Java 程序，用来处理客户端的请求并响应

没有 main 方法，会被编译成字节码文件放入WEB-INF -> classes 目录下根据请求去执行对应的程序

Tomcat 启动时会将网页中的 url 映射成 webapps 中的应用目录，只要在对应的路径放置页面就可以访问，但是无法访问 WEB-INF 目录下的文件

如果想要将 url 映射成对应的 Servlet 程序，则应该在`web.xml`中进行配置，比如：

```xml
<web-app>
  <servlet>
    <servlet-name>hello</servlet-name>
    <servlet-class>HelloServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>hello</servlet-name>
    <url-pattern>/hello</url-pattern>
  </servlet-mapping>
</web-app>
```

一个 url 对应一个 servlet，当请求这个 url 时，会执行servlet标签中对应的 java 程序，这个程序是编译过的字节码文件，存放在`classes`目录

Servlet 程序必须实现 Servlet 接口，但是 JRE 核心库没有这个接口库，但是 tomcat 的 lib 中提供了`servlet-api.jar`，在将对应的 servlet 程序编译成字节码文件时，必须提供该 jar 依赖

因此一个标准的目录是这样的：

```
.
├── src（java 源码）
├── WEB-INF（提供 Tomcat 执行的信息）
│   ├── classes（编译后的字节码文件）
├── ├── lib（依赖的库）
├── ├── web.xml（应用配置项）
├── index.jsp（页面）
```

工作的流程：

1. 编写 Servlet 程序
2. 编译成字节码放入 classes
3. 导入依赖库
4. 配置 web.xml 中的映射关系
5. 发布到 tomcat 的 webapps 目录下
6. 启动 tomcat
7. 访问对应 Web 应用
