---
title: 实战：Python 爬虫
author: JQiue
article: false
---

模拟浏览器获取网页数据，需要具备基本的 HTML，CSS，JavaScript，HTTP，正则等知识

具体流程：

1. 发起请求（HTTP）-> 得到响应（HTML源码）
   + requests
2. 解析 HTML，得到想要的数据
   + 正则
   + BS4
   + lxml
3. 静态请求，动态请求

## 发起请求

确定网页的 url 地址，使用`requests`库的`get`方法对百度发送请求，该方法会将响应内容封装成对象返回

```python
url = 'https://www.baidu.com'
response = requests.get(url)
```

## 响应内容

对象的`text`属性可以获取网页内容，根据 unicode 字符集进行解码

```python
print(response.text)
```

很不幸，打印网页内容后发现有乱码现象，Requests 会根据 HTTP 头部信息对响应的编码作出推测，它是`encoding`属性

```python
response.encoding # ISO-8859-1
```

但百度的网页源代码的编码是`utf-8`，所以要对`encoding`进行修改，使访问`text`时的编码内容得到正确的解析

```python
response.encoding = 'utf-8'
response.text
```

响应对象也提供了以字节的方式访问响应体，对于非文本请求来说十分有用

```python
response.content
```

字节码也可以使用`decode`方法转换成字符串，但要注意编码

```python
response.content.decode('utf-8')
```

## 伪造请求头

如果对知乎`https://www.zhihu.com`发送请求，你应该得到`403`响应码

```python
url = 'https://www.zhihu.com'
response = requests.get(url)
print(response.status_code) # 403
```

为什么浏览器请求可以，而使用 Python 请求就不可以呢？因为知乎有反爬机制，浏览器请求会被视为正常的请求，所以能够得到正确的响应，而浏览器的请求头中是携带一些信息的，知乎会根据这些信息判断来源是否为正常的请求来源，因此只要在请求程序中添加一些请求头模拟成浏览器就可以了

```python
url = 'https://www.zhihu.com'
headers = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
}
response = requests.get(url, headers=headers)
print(response.status_code) # 200
```

::: tip
Requests 中没有设定`user-agent`时，默认为`python-requests`，这等于告诉服务器我是爬虫，自然访问不了大部分网页，所以要修改参数模拟浏览器进行请求，达到欺骗的目的
:::

## 带参数的 GET 请求

GET 请求的参数都是在 URL 上，所以将 URL 和查询参数进行拼接即可，这里以哔哩哔哩为例，搜索`python`关键字的视频

```python
url = 'https://search.bilibili.com/all?keyword=python'
response = requests.get(url)
print(response.status_code) # 200
```

虽然能正常请求，但不太好，后续如果要修改参数就很麻烦，Requests 使用字典来解决这种方式，它会将字典中的内容和 URL 进行拼接，这样灵活性就大大提高了

```python
url = 'https://search.bilibili.com/all'
params = {
  "keyword": "python"
}
response = requests.get(url, params=params)
print(response.status_code) # 200
```

## 下载图片

图片地址比较好爬取，图片地址在`img`标签中的`src`属性中，图片是字节码的形式，写入本地就行了

```python
url = 'http://ossweb-img.qq.com/images/lol/wallpapers/Tristana_1680x1050.jpg'
response = requests.get(url)
print(response.status_code) # 200
with open('./image.jpg', 'wb') as file:
  file.write(response.content)
```

## 下载视频

只要我们获得视频的地址，就可以请求下载，但是有些视频网站做的比较好，不允许下载视频，所以这里以”好看视频“为例，这家网站的视频是可以爬取的

首先要获得视频的播放地址，一般在`video`标签的`src`属性中，然后正常的发送 GET 请求

```python
url = 'https://vd2.bdstatic.com/mda-mb2rqf9ixa4q4kiz/sc/cae_h264_clips/1612567054/mda-mb2rqf9ixa4q4kiz.mp4?auth_key=1620119921-0-0-b6d4f3f9e2959c0d2e4de86959fa2cd9&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=3000165_1'
response = requests.get(url)
print(response.status_code) # 200
```

视频是以流的方式进行传输的，且一般视频的资源较大，如果将全部资源请求过来会大量的占用内存空间，所以要一点一点的传输并写入到本地文件

```python
with open('./1.mp4', 'wb') as file:
  for chunk in response.iter_content():
    file.write(chunk)
```

`response.iter_content()`会将视频流看成一个可迭代类型，一段一段的访问，也可以接受一个参数用于指定数据块的大小，比如`iter_content(1024*10)`代表每一个数据块的大小是 10k，每次都以 10k 大小数据块进行遍历

当然，有的视频比较小，就没必要用这种方式写入本地，直接将整个`content`字节数据写入就行了

```python
with open('./2.mp4', 'wb') as file:
  file.write(response.content)
```

## 保存 HTML 页面

如果频繁的请求某个网站，会对该网站的服务器造成一定的压力，所以我们应该将爬取的网页保存到本地，然后进行分析

```python

```

## 解析 HTML

如果想要下载一个图片，可以打开浏览器调试工具拿到链接并发送请求，这样就可以完成下载，但是如果想要全部的图片链接，这种方式就不可取了，没有人会傻到一个一个的复制黏贴图片地址去下载，我们可以通过分析保存的 HTML 页面，然后通过一些方式来分析出页面中的图片链接，这样效率就会大大提高

### 正则

HTML 可以看做成一个字符串，那么正则表达式就派上用场了

### BS4

### lxml
