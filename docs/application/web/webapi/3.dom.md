---
title: DOM 操作
category: Web
tab: 前端
author: JQiue
article: false
---

`window.document`对象描述了整个网页，它是最顶层的节点

## 文档内容

`document.write()`可以为 HTML 文档添加一些内容，接受一个字符串，并能够解析字符串中的标签

```javascript
document.write('<h1>一级标题</h1>');
```

## 节点

处理 HTML 文档的第一步就是要先获得文档元素的引用，每一个元素在 DOM 树中都是一个节点

### 节点类型

每一个节点都属于一种类型，DOM 定义了 12 种节点类型，可以使用常量来表示，也可以使用数字

节点常量|值|描述
---|---|---
Node.ELEMENT_NODE|1|元素节点
Node.ATTRIBUTE_NODE|2|属性节点
Node.TEXT_NODE|3|文本节点

### 节点关系

DOM 中的节点是有层次关系的，这个关系是构成 DOM 运算的关键，每一个元素都有一个**父节点**，除了**根节点**（document），元素可以有 0 个、或多个节点，拥有共同父节点的节点是**兄弟节点**，一个节点的父节点的父节点的父节点这种关系叫做**祖先节点**，而一个节点后代所有的节点叫做**后代节点**，一个节点的直接子节点叫做**子节点**

### 访问节点

`<html>`是整个文档的根元素，使用`document.documentElement`获取根元素对象，节点对象的`childNodes`属性包含所有子元素对象的数组，这样就可以访问页面中的所有元素

::: danger
由于子节点可能包含文本节点（空格、回车等），做相关操作时要注意是否为元素节点
:::

### 节点操作

DOM 也定义了一些接口对节点进行增删查的处理，这里是一部分常用的属性和方法，更多详见[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)

属性|描述
---|---
nodeName|节点名（大写标签名）
nodeValue|节点值（元素节点是`undefined`或`null`，文本节点是文本自身，属性节点是属性值）
nodeType|节点类型
parentNode|父节点
childNodes|所有子节点
firstNode|第一个子节点
lastNode|最后一个子节点
previousSibling|上一个兄弟节点
nextSibling|下一个兄弟节点
attributes|节点中所有的属性

方法|描述
---|---
appendChlid()|插入一个子节点到末尾
cloneChlid()|克隆一个节点
hasAttributes()|检查节点是否有属性
hasChildNodes()|检查是否有子节点
insertBefore()|在节点前插入一个节点
removeChild()|移除子节点
replaceChild()|替换子节点

### 创建节点

`document`表示整个文档，提供了访问节点的基本入口，使用它可以获得根节点，也可以获得文档的声明，也可以创建各种类型的节点

方法|描述
---|---
createElement()|创建元素节点
createTextNode()|创建文本节点
createAttribute()|创建属性节点

### 属性节点

属性节点并不会被看作成文档树中的一部分，因此没有所谓的节点层次关系，属性节点只是和元素节点关联，并且所有的属性都会被保存在一个属性结合中，元素节点的`setAttribute(属性名, 属性值)`能够添加一个属性到该元素的属性集合中

```javascript
var p = document.createElement('p');
p.setAttribute('title', '这是一个段落');
```

属性也会被看作成一个节点类型，也可以使用`setAttributeNode()`方式添加

```javascript
var id_attr = document.createAttribute('id');
id_attr.value = 'para';
p.setAttributeNode(id_attr);
```

### 访问元素

+ `getElementById()`：根据`id`属性获取单个元素
+ `getElementByClass()`：根据`class`属性获取元素集合
+ `getElementByTagName()`：根据标签名获取元素集合
+ `querySelector`：根据 CSS 选择器获取单个元素
+ `querySelectorAll`：根据 CSS 选择器获取元素集合

## CSS 操作

HTML、CSS、JavaScript 是三个独立的技术，但每种技术都为对方提供了 API，实现了相互操作的能力，HTML 为 JavaScript 提供了 API，同样的，CSS 也为 JavaScript 提供了 API 操作 HTML 文档的样式表能力

在 DOM 中有两种操作样式表的方式，一种是使用元素的`style`属性来定义，也就是内嵌样式；另一种是使用元素来定义样式表，也就是使用`<link>`和`<style>`元素，针对不同的使用方式就产生了不同的处理方法

### 使用 style 属性

元素节点对象的`style`属性会返回一个 style 对象，这个对象包含了可以为该元素设置的所有样式的属性名和属性值，它们都是这种`{属性名1: 属性值, 属性名2: 属性值, ...}`键值对风格，根据属性名修改属性值就相当于定义了样式

```javascript
var div_ele = document.createElement('div');
div_ele.style.color = 'red';
div_ele.style.fontSize = '18px';
```

::: tip
HTML 文档可能会存在`<style>`元素来定义样式的情况，但是通过元素对象`style`属性是行内样式，优先级最高
:::

### 使用 style 和 link 元素定义的样式表

当使用 style 元素或 link 元素定义的样式表会被描述一个`styleSheet`对象，可以使用`document.styleSheets`获取文档中所有的样式表元素
