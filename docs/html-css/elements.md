---
title: 一些元素
category: Web
tag: [HTML]
article: false
---

## 标题

标题是通过`<h1>` ~ `<h6>` 定义的，`<h1>` 是最大的标题，`<h6>`是最小的标题

H1 标签特别重要，它会帮助搜索引擎理解页面结构，有利于 SEO 优化，所以在每一个页面上都应该有它

应用场景：

+ 文章标题
+ 强调网站的 LOGO
+ 利于 SEO

## 段落

段落通过`<p>`定义，被`<p>`包裹的内容会单独占一行

如果希望在不产生一个段落的情况下换行，可以使用`<br/>`标签，它是自闭和标签

::: caution
并不是代码换行浏览器就会解析换行，浏览器会将换行符看作一个空格
:::

## 文本格式化

HTML 提供了一些简单的文本格式化标签，无需写样式调整

::: normal-demo 格式化

```html
<strong>加粗</strong>
<em>斜体</em>
<ins>插入</ins>
<del>删除</del>
<sub>下标</sub> 和 <sup>上标</sup>
<code>代码</code>
<mark>标记</mark>
```

:::

应用场景：

+ 替代旧的标签使之语义化

## 预格式化文本

通常内容之间的额外的空格回车等都会被压缩，而预格式化文本可以保留这些东西，预格式化文本的内容通常以等宽字体显示

::: normal-demo 预格式化文本

```html
<pre>
function foo() {
  console.log("Hello, World!");
}
</pre>
```

:::

## 列表

如果想表示数据的集合就应该使用列表元素，`<li>`是列表中的每一项，有 3 种列表：

+ 有序列表
+ 无序列表
+ 自定义列表

通过`<ol>`定义有序列表，会有标明顺序的标识，可以改变`type`属性值来改变标识

::: normal-demo 有序列表

```html
<ol>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ol>
<ol type="a">
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ol>
<ol type="i">
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ol>
```

:::

无序列表通过`ul`创建，列表项不具有顺序一样的标识，可以改变`type`属性值来改变样式

::: normal-demo 无序列表

```html
<ul>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ul>
<ul type="circle">
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ul>
<ul type="square">
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ul>
```

:::

自定义列表和其他列表不同的是，它是一个键值对形式的列表，通过`<dl>`（定义整个列表）、`<dt>`（定义标题）、`dd`（定义描述）这一套标签来定义

::: normal-demo 自定义列表

```html
<dl>
  <dt>标题一</dt>
  <dd>描述一</dd>
  <dd>描述二</dd>
  <dt>标题二</dt>
  <dd>描述一</dd>
  <dd>描述二</dd>
</dl>
```

:::

`<dt>`和`<dd>`不能相互嵌套，`<dt>`不一定位于`<dl>`子元素的第一位，`<dt>`不一定只有一个

::: caution 对于所有的列表
任何列表元素都必须遵循合理的嵌套关系，即父元素只能容纳具体的列表项标签，不能容纳其他元素或内容，列表项不能单独存在
:::

主要的应用场景有：

+ 导航栏
+ 商品列表
+ 新闻列表
+ 网站底部信息
+ 图文混排
+ 排行榜

## 表格

表格是一套标签组成的，`<table>`定义表格容器，`<caption>`定义表格的标题，`<thead>`,`<tbody>`,`<tfoot>`这三个标签实现了对表格的语义化布局，`<tr>`定义行，`<tb>`定义单元格，`<thead>`中没有使用`<td>`，而是使用`<th>`，这也是语义化的一部分，`<th>` 是一个特殊的`<td>`单元格，唯一的区别就是`<th>`中的字体会默认加粗

::: normal-demo 表格

```html
<table> 
  <caption>标题</caption>
  <thead>
    <tr>
      <th>列一</th>
      <th>列二</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>第一行第一个单元格</td>
      <td>第一行第二个单元格</td>
    </tr>
    <tr>
      <td>第二行第一个单元格</td>
      <td>第二行第二个单元格</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>汇总一</td>
      <td>汇总二</td>
    </tr>
  </tfoot>
</table>
```

:::

表格中的元素自带一些属性，用于设置表格的样式

+ rowspan：设置`<td>`跨越的行数
+ colspan：设置`<td>`跨越的列数
+ cellspacing：设置`<td>`之间的间隙
+ cellpadding：设置`<td>`和内容之间的边距
+ border：设置表格的边框，默认值为 0，`border="1"`表示边框宽度是 1px
+ align：设置内容的对齐方式
+ bgcolor：设置表格的背景颜色

应用场景：

+ 展示大量表格化数据，一般用于后台管理

## 表单

表单用来收集用户的数据，向服务端发送数据，提供了浏览者和网页交互的功能，在网页中的登录和注册框都是它来完成的，所有的 HTML 表单都以`<form>`开始，其中有几个属性非常重要：

```html
<form action="" method="" name="" target=""></form>
```

+ `action`：用于处理表单的 URI 地址
+ `method`：HTTP 请求方法，默认发送 GET 请求
+ `name`：标记表单，提供 JavaScript 获取`<form>`元素的手段
+ `target`：规定在何处打开`action`属性规定的 URI 地址
+ `multiple`：允许上传多个文件

`<input>`是最重要的表单元素，用于给表单创建交互控件从用户中接收数据，改变`type`的值就可以转换为不同的表单元素，无论以何种形式展现，它的功能是输入数据

::: normal-demo 表单元素

```html
<form action="" method="" name="">
文本框：<input type="text"><br> 
密码框：<input type="password"><br> 
单选框：<input type="radio" name="sex"><input type="radio" name="sex"><br> 
多选框：<input type="checkbox"><input type="checkbox"><br>
普通按钮：<input type="button" value="点击"><br>
提交按钮：<input type="submit" value="提交"><br>
范围：<input type="range"><br>
重置：<input type="reset" name="reset"><br>
邮件：<input type="email"><br>
链接：<input type="url"><br>
数字：<input type="number"><br>
颜色：<input type="color"><br>
时间：<input type="time"><br>
日期：<input type="month"><br>
日期：<input type="date"><br>
文件：<input type="file"><br>
搜索：<input type="search">
</form>
```

:::

对于`<input>`来说，不同的`type`对应的属性也不同

+ 当`type="text"`时，接收文本内容
  + value：规定文本域的属性值，也就是用户可见的内容
  + maxlength：规定文本域可以输入的最大字符数
  + placeholder：提供一些提示，描述所期待的值
  + pattern：规定用于验证文本域内容的正则表达式
  + autocomplete：规定文本域具有自动完成功能
  + list：指定一个数据列表

+ 当`type="radio"`时，将所有的单选框 name 属性值设置成一样的就成为了一组，这样同一组单选框之间是互斥的，只能有一个单选框处于被选中状态
  + value：规定单选框的 value 属性值，它会被发送到服务器
  + checked：规定单选单选框处于选中状态
  + required：规定对应单选框是必选

+ 当`type="checkbox"`时，复选框则可以选中任意多项
  + value：规定复选框的 value 属性值，它会被发送到服务器
  + checked：规定复选框处于选中状态
  + required：规定指定的复选框必须被选中

+ `<textarea>`提供了输入多行文本的能力
+ `<select>`和`<option>`提供了下拉列表
+ `<datalist>`定义一个数据列表，描述`<input>`可能输入的值，将`id`值赋值给`<input>`的`list`属性即可实现绑定
+ `<label>`提供了内容绑定表单的能力，默认情况下点击内容是不会聚焦到元素的，只要将`for`属性和表单元素的`id`值关联起来就可以实现绑定，也可以将表单元素放入`<label>`中实现，这样无需编写属性

::: normal-demo 其他表单元素

```html
<textarea></textarea><br/>

<select>
  <option>选项一</option>
  <option>选项二</option>
  <option>选项三</option>
</select><br/>

<label for="account">账号：</label>
<input type="text" id="account"><br/>

<label>密码：<input type="password">
</label><br/>

<input type="text" list="fruits"><br/>
<datalist id="fruits">
  <option value="车厘子">
  <option value="牛油果">
  <option value="红毛丹">
</datalist>
```

:::

其中`<textarea>`具有以下重要的属性

+ rows：规定多行文本框的行数
+ cols：规定多行文本框的列数
+ maxlength：规定文本域可以输入的最大字符数
+ wrap：规定当在表单中提交时，文本区域中的文本如何换行

::: tip
不能使用`value`属性规定它的初始值
:::

其中`<select>`具有以下重要的的属性

+ `multiple`：规定下拉列表可以选择多项，默认只能选择其中一项
+ `size`：规定下拉列表展开之后可见列表项的数目
+ `selected`：设置一个`<option>`项为默认选中状态

通用的属性：

+ `name`：给后台提供数据标识
+ `form`：规定元素所属的一个或多个表单
+ `disabled`：禁用元素，该元素不会获得焦点，不会被提交
+ `readonly`：只读元素，该元素的值不能够改变，但是可以被提交
+ `autofocus`：页面加载时，域自动获得焦点
+ `required`：必须在这个元素中输入内容
+ `placeholder`：提供一种提示，描述所期待的值

## 图片

通过`<img>`标签就能在文档中插入一张图片，只需要告诉`src`属性的图片链接，支持 JPEG、PNG、GIF、WebP、SVG 格式。`alt`是一个特别重要的属性，用于在图片无法展示时显示，`title`则是对图片进行标题说明

::: normal-demo img

```html
<img src="https://jinqiu.wang/bgImage.jpg" alt="bgImage">
```

:::

## 超链接

在 HTML 中通过`<a>`标签来创建一个超链接，`href`属性指定要跳转的链接，链接类型不一定是网页链接，可以是 RSS 源、图像、文件等

::: normal-demo 文本链接

```html
<a href="/html-css/elements.html#标题">点击回到顶部</a>
```

:::

`<a>`标签的内容不一定是文本，也可以是图片，也可以是其他的一些内容

::: normal-demo 图片链接

```html
<a href="/html-css/elements.html#标题" target="_blank"><img src="https://jinqiu.wang/bgImage.jpg" alt="bgImage"></a>
```

:::

因为`<a>`标签有默认的 CSS 样式，导致当鼠标指针放在被`<a>`包裹内容上就会变成一个小手

主要的属性：

+ `href`：规定链接的跳转地址
+ `target`：规定跳转的页面在何处打开
+ `download`：规定下载文件的名称

::: tip target取值

+ _blank：在新窗口中打开
+ _self：默认值，在当前窗口打开
+ _parent：在包含当前子窗口的父窗口或者框架集中打开
+ _top：在整个窗口中打开
:::

### 锚点

使用`<a>`标签不仅能跳转指定页面，也可以跳转到页面中的指定位置，锚点也可以用于不同页面的位置

使用步骤：

1. 设置锚点链接
2. 设置锚点位置

+ 通过`id`来实现

```html
<a href="#标题">点击回到标题</a>
<div id="anchor">锚点位置</div>
```

::: normal-demo 锚点

```html
<a href="#标题">定位到标题位置</a>
```

:::

+ 通过`name`，只能用于`<a>`标签

```html
<a href="#anchor">锚点链接</a>
<a name="anchor">锚点位置</a>
```

+ 通过 JavaScript 实现

`<base>`标签中的`target`属性用于控制页面上所有的超链接跳转方式，必须写在`<head>`标签内，如果`<a>`标签有自己的`target`属性，则优先自己的`target`

假链接指的是点击后不会跳转的链接，通常用于开发中还未完成的页面中，当项目完成时则会替换为真链接，给`href`属性赋值`#`或者`javascrpt:`即可实现假链接

::: tip
点击`#`假链接会自动回到页面顶部，`javascript:`则不会
:::

## 内嵌框架

内嵌框架可以实现在一个页面中显示另一个页面上的内容，使用`<iframe>`创建

这是一些重要的属性：

+ `width`
+ `height`
+ `name` - 可以实现`<a>`和`<form>`的交互作用，在本页中打开外部的链接，前提是`target`必须指向`name`的值

::: normal-demo 嵌入网易云音乐

```html
<iframe width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1332153723&auto=1&height=66"></iframe>
```

:::

## 画布

详见[Canvas](/canvas/)

## 音视频

如今 Flash 已经被彻底淘汰，HTML5 新增了定义音频和视频的标签

`<audio>`是一个 HTML5 元素，通过`src`指定资源路径，支持 mp3 和 ogg 格式

::: normal-demo audio

```html
<audio controls src="https://s138.ananas.chaoxing.com/audio/a0/e8/52/f814b5355ffd42e059187d3ce16cba1e/audio.mp3?at_=1612934735878&ak_=a25ecb672f06e77a5036d511788ea77e&ad_=579c22a2cf3594c71a75b17fab204e15">浏览器不支持</audio>
```

:::

`<video>`是一个 HTML5 元素，通过`src`指定资源路径

::: normal-demo video

```html
<video controls src="https://s138.ananas.chaoxing.com/video/c9/51/17/4a626b15b5abfa147da4af8084054c26/sd.mp4?at_=1612352532045&ak_=b3da89ddae922efb89270e7300931769&ad_=e36a6b4b68892a4f3b361772b5d8925c" width="222px">浏览器不支持</video>
```

:::

属性：

+ width：设置播放器的宽度
+ height：设置播放器的高度
+ poster：设置视频在播放前显示图像

音视频通用属性：

+ src：指定资源地址
+ controls：会向用户显示播放控件（默认隐藏）
+ autoplay：会在资源就绪后马上播放
+ loop：会一直循环播放
+ muted：静音

::: tip 为什么 autoplay 不起作用？
常用的浏览器可能会不允许自动播放，这可能会破坏用户的体验，除非设置`muted`属性，或者让用户触发播放
:::

::: tip 设置 currentTime 属性无效？
这通常在和服务器端交换资源所出现，必须设置`Accept-Ranges`，`Content-Type`，`Content-Length`
:::

## 区段

在以前的 Web 开发中，页面逻辑并不复杂，用户的要求也不是很高，因此`<table>`标签被大量地运用到页面布局上，而`<table>`本质上就是一个展示数据的元素，用来做布局元素导致页面逻辑不够清晰。所以`<div>`标签是用来解耦这种行为的，这样页面更加清晰，代码组织更加合理，利于前端开发的分工合作。于是产生了“div + css”这种布局页面的方式，`<div>`是一种容器级的标签，可以容纳任何内容，本身没有任何功能和样式，没有语义

而`<span>`是一个文本级的容器标签，没有任何特殊功能以及样式，目的就是为包裹的文本来添加一些样式，也没有语义

`<div>`标签本身没有任何含义，但通过属性赋予有意义的值，搜索引擎可能辨识起来有点困难。根据以往布局的经验，HTML5 标准直接给出了对应的标签

+ `<header>`代表“网页”或“section”的页眉
+ `<nav>`标签用于定义页面的主要导航部分
+ `<section>` 标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分
+ `<article>` 标签规定独立的自包含内容
+ `<aside>`此标签通常用于对于其他主体内容的修饰，或者说提供一些附属信息
+ `<footer>`此标签用于定义文档或者章节的页脚内容，通常是地址、联系方式、版权等信息
+ `<main>`标签用于创建页面中主要内容，此标签中的内容在原则上不能是网站页面中重复出现的内容，比如不能是导航栏或站点版权信息等

语义化布局注意事项：

## 图片描述

和图片搭配的标题是十分常见的，图片和标题被定义在`<figure>`中

::: normal-demo figure

```html
<figure>
   <img src="https://jinqiu.wang/bgImage.jpg  " alt="bgImage" width="304" height="228">
   <figcaption>首页背景图片</figcaption>
</figure> 
```
  
:::

## 进度

`progress`用于显示进度，支持三个属性：`max`、`value` 和 `form`。`max`指定总进度，`value`指定当前进度

::: normal-demo 进度

```html
<progress max="100" value="30"></progress>
```

:::
