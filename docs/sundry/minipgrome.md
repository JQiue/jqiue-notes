---
title: 微信小程序
article: false
---

## 环境搭建

## 项目结构

```

├─pages  // 存放所有页面
│  ├─index
│  │      index.json       // 页面配置
│  │      index.ts         // 页面逻辑
│  │      index.wxml       // 页面结构
│  │      index.wxss       // 页面样式
│  └─logs
│          logs.json
│          logs.ts
│          logs.wxml
│          logs.wxss
|─utils  // 存放工具
│  app.json  // 全局配置
│  app.ts    // 入口文件
│  app.wxss   // 全局样式
│  sitemap.json // 配置小程序被微信索引的配置
```

## 概念

页面由四个文件组成，使用页面时，必须在 局样式和app.json 中进行配置，小程序会将第一个页面作为首页

WXML 和 HTML 类似是标签语言，但是和 HTML 不同，封装了自己的标签，属性节点也不同，提供了类似于 Vue 的模板语法

WXSS 和 CSS 类似，最主要的区别有提供了全局部样式，新增了 rpx 尺寸单位，仅支持部分选择器

js 文件是页面的首要语言，当然也可以选择 typescript

## 组件

小程序提供了以下组件：

`view`创建视图

```html
<view class="container">
  <view>a</view>
  <view>b</view>
  <view>c</view>
</view>
```

`scroll-view`创建滚动视图

```html
<scoll-view class="scroll-container" scroll-y="y">
  <view>a</view>
  <view>b</view>
  <view>c</view>
</scoll-view>
```

swiper

```html
<swiper class="swiper-container">
  <swiper-item>
    <view>
      1
    </view>
  </swiper-item>
  <swiper-item>
    <view>
      2
    </view>
  </swiper-item>
  <swiper-item>
    <view>
      3
    </view>
  </swiper-item>
< iper>
```

text

```html
<text user-select="true">JQiue's notes</text>
```

rich-text

```html
<rich-text nodes="<h1>123</h1>"/>
```

button

```html
<button type="primary" plain="true">123</button>
```

image

```html
<image src="../../asserts/pic1.png" mode=""/>
```

## 条件渲染和列表渲染

wx 通过`wx:if={{condition}}`来判断是否渲染，可以追加`wx:elif`或`wx:else`来判断

wx 通过`wx:for={{array}}`来进行重复渲染，默认情况下，当前`index`表示索引，当前`item`表示项

## 页面实例

```js
// pages/test/test.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: 'hello, world',
    imgSrc: '../../asserts/pic1.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
```

通过模板语法来渲染数据和绑定内容

```html
<text>{{msg}}</text>
<image src="{{imgSrc}}"></image>
```

模板语法是支持表达式的

```html
<text>{{1+1}}</text>
```

事件绑定：

```ts
Page({
  data: {
    count: 0
  }
  onTap() {}  
}}
```

```html
<text>{{count}}</text>
<button bindtap="onClick">点击</button>
```

## 全局配置

前往<https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html>查阅

## 网络通信

使用`wx.request`方法发送请求

```js
wx.request({
  url: this.data.url
  method: 'GET',
  success: (res) => {
    console.log(res.data);
  }
})
```

如果没有在微信小程序后台配置合法域名是不允许访问的非 https 域名的，但是可以在开发者工具中设置不校验合法域名

## 微信 API

事件监听 API，以 on 开头

同步 API，以 Sync 结尾的 API

异步 API，比如通过`wx.request()`发送网络请求

## 最佳实践

重要的 api：

```js
// 获取设备基础信息
wx.getSystemInfoSync()

// 获取右上角胶囊的布局位置信息
wx.getMenuButtonBoundingClientRect()
```
