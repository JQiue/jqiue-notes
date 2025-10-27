---
title: DOM
category: Web
date: 2021-03-02
---

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
:::

## DOM 树

由于 HTML 最主要的部分是标签，根据 DOM 规范，每个标签都是一个对象，标签中的内容也是一个对象

```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>JQiue's notes</title>
  </head>
  <body>
    Hello，HTML
  </body>
</html>
```

DOM 会将 HTML 描述为标签的树结构，所以上面的文档看起来是这样的：

```
html
|__head
|  |__↵
|  |__title
|  |      |__JQiue's notes
|  |__↵
|__↵
|__body
      |__Hello, HTML
```

在 DOM 树中，每个节点都是一个对象：

+ 元素节点：标签被称为元素节点，并形成了树结构，`<html>`是根节点，`<head>`和`<body>`都是其子节点
+ 文本节点：标签中的文本形成文本节点，一个文本节点只包含一个字符串，没有子节点，它永远都是树的叶子节点

注意空格和换行符都是有效的字符，它们也会形成文本节点成为 DOM 树中的一部分，只有两个地方被排除：

+ `<head>`之前的空格和换行符会被忽略
+ 在`</body>`之后的一些东西，都会移动到`<body>`内的最下方，因为规范中要求所有的内容必须位于`<body>`内

所以将代码写成一行（当然它很难看）自然就不会产生它们：

```html
<!DOCTYPE HTML><html><head><title>JQiue's note</title></head><body>Hello，HTML</body></html>
```

## 自动修正行为

即使不在文档中提供`<html>`，浏览器也会创建它，`<body>`也是如此，甚至包括一些没有闭合的标签，浏览器都会帮助修正，让它成为正确的 DOM，所以最简单的“Hello World”程序是 HTML（笑~

```html
Hello World
```

## DOM API

DOM 允许使用 JavaScript 来操作它，所以提供了大量的操作 DOM 的 API 给 JavaScript。`window.document`对象描述了整个网页，它是页面的入口点，也是 DOM 树最顶层的节点

DOM 中的节点是有层次关系的，这个关系是构成 DOM 运算的关键：

+ 父节点：每一个节点都有一个父节点，除了**根节点**（document）
+ 子节点：一个节点的直接子节点，可以有 0 个或多个
+ 兄弟节点：拥有共同父节点的节点
+ 祖先节点：一个节点的父节点的父节点的父节点 ...
+ 后代节点：一个节点的子节点的子节点的子节点 ...

对于 DOM 来说，所有的操作都是从`document`对象开始，通过它可以访问任何节点，在最顶层的节点中可以直接作为`document`的属性来访问：

+ `document.documentElement`代表`<html>`对应的元素节点
+ `document.head`代表`<head>`对应的元素节点
+ `document.body`代表`<body>`对应的元素节点

## 访问节点

`<html>`是整个文档的根元素，使用`document.documentElement`获取根元素对象

节点对象的`childNodes`属性包含所有子节点的类数组，应该使用`for...of`遍历它

DOM 集合只是可读的，不能够通过赋值来更改一个子节点，需要使用其他方法

DOM 集合还是实时的，反映了 DOM 的当前状态，对 DOM 进行节点更改会实时的反映到集合中

获取一个节点后可以通过一些方法来获得它身边的节点：

+ `elem.firstNode`和`elem.lastNode`属性是访问第一个和最后一个子节点的最方便的形式
+ 下一兄弟节点在`elem.nextSibling`属性中，而上一个节点在`elem.previousSibling`属性中
+ `elem.parentNode`可以访问父节点

::: caution
由于子节点可能包含文本节点，做相关操作时要注意是否为元素节点
:::

对于绝大数情况下来说不需要文本节点或注释节点，而希望操作的是形成页面结构的元素节点，上面的节点访问方式都是不干净的，而下面的属性是干净的元素节点访问方式，只是加了一个词`Element`表示它访问的是元素类型的节点

+ `children`：返回只包含元素类型的子节点类数组
+ `firstElementChild`，`lastElementChild`：返回元素类型的第一个子节点，最后一个子节点
+ `previousElementSibling`，`nextElementSibling`：返回一个元素类型的上一个兄弟节点，下一个兄弟节点
+ `parentElement`：返回元素类型的父节点

::: tip
`parentElement`返回的是元素类型的父节点，而`parentNode`返回的是任何类型的父节点，唯一的例外就是`document.documentElement`的父节点不是一个元素节点，而是文档节点，那么使用`parentElement`就会返回`null`，而`parentNode`返回`document`
:::

不仅如此，某些类型的 DOM 元素还有着特殊的属性，比如表格元素，除了支持上面的属性，还支持下面的特有属性：

+ `rows`：返回`<th>`元素的集合
+ `caption/tHead/tFoot`
+ `tBodies`：返回`<tbody>`元素的集合

## 节点类型

DOM 中的每个节点都属于某种类型，甚至连 HTML 中的注释都会成为 DOM 中的一部分，当然包括`<!DOCTYPE HTML>`，DOM 定义了 12 种节点类型，一般用到的只有 4 种：

+ 文档节点
+ 元素节点
+ 文本节点
+ 注释节点
+ ...

`elem.nodeType`会返回该节点类型对应的数值

+ 对于元素节点`elem.nodeType == 1`
+ 对于文本节点`elem.nodeType == 3`
+ 对于文档节点`elem.nodeType == 9`
+ 对于注释节点`elem.nodeType == 8`

## 搜索元素

如果一个节点的层次太深，使用关系访问时会显得非常繁琐，下面的方法可以精确地搜索对应的元素节点，注意只是元素节点

+ `getElementById()`：根据`id`属性获取一个元素
+ `getElementsByClass()`：根据`class`属性获取元素集合
+ `getElementsByTagName()`：根据标签名获取元素集合
+ `querySelector()`：根据 CSS 选择器获取单个元素
+ `querySelectorAll()`：根据 CSS 选择器获取元素集合
+ `matches()`：检查元素是否与给的 CSS 选择器匹配，返回`true`或`false`，不会查找任何内容
+ `closest()`：根据 CSS 选择器匹配最近的祖先元素，并返回它，然后停止搜索

一个具有`id`属性的元素，会被作为一个全局变量，除非声明一个具有相同名称的变量。这种办法可行的，但是不要使用它来访问元素，因为阅读代码的时候看不到变量的来源

```html
<div id="elem">Element</div>
<script>
  elem.style.background = 'pink';
</script>
```

`getElementsBy*`会返回一个动态的集合，在文档发生状态的时候会自动更新

```html
<div>1</div>
<script>
  let div = document.getElementsByTagName('div');
  console.log(div.length); // 1
</script>
<div>2</div>
<script>
  console.log(div.length); // 2
</script>
```

然而`querySelectorAll`却是静态的，不会随着文档的更新而改变

```html
<div>1</div>
<script>
  let divs = document.querySelectorAll('div');
  console.log(div.length); // 1
</script>
<div>2</div>
<script>
  console.log(div.length); // 1
</script>
```

## 节点属性

不同的 DOM 节点可能有不同的属性，`<a>`具有对应的连接相关的属性，`<input>`也对应具有输入相关的属性。文本节点和元素节点虽然不同，但是它们之间有着共同的属性和方法

DOM 节点就是常规的 JavaScript 对象，通过原型继承

```js
console.log( document.body.constructor.name );           // HTMLBodyElement
console.log( document.body instanceof HTMLBodyElement ); // true
console.log( document.body instanceof HTMLElement );     // true
console.log( document.body instanceof Element );         // true
console.log( document.body instanceof Node );            // true
console.log( document.body instanceof EventTarget );     // true
```

如果知道一个节点，就可以通过`nodeName`或`tagName`属性读取它的标签名，但是`tagName`仅适用于元素节点，在一个文本节点上使用会返回`undefined`。而`nodeName`适用于任何节点类型，比如文本类型或注释，会返回一个对应节点类型的字符串

```html
<body><!-- comment -->
  <script>
    console.log(document.body.firstChild.tagName)  // undefined
    console.log(document.body.firstChild.nodeName) // #comment
    console.log(document.tagName);                 // undefined
    console.log(document.nodeName);                // #document
    console.log(document.body.tagName)             // BODY
    console.log(document.body.nodeName)            // BODY
  </script>
</body>
```

::: tip
对于元素节点来说，返回的标签名始终是大写的
:::

`elem.innerHTML`属性是一个能够读写元素内容的属性

```html
<body>
  <script>
    console.log(document.body.innerHTML);
    document.body.innerHTML = 'new body content'
    console.log(document.body.innerHTML); // new body content
  </script>
</body>
```

修改`innerHTML`的值相当于完全替换了元素中的内容，它会解析字符串中的标签生成对应的 DOM，当然也会尝试修复其中的 DOM

::: tip
如果写入的是`<script>`，它也会成为 DOM 中的一部分，但是不会执行其中的 JavaScript
:::

另外，可以使用类似于这样的语法`elem.innerHTML +=`来追加更多内容，但它却是一种完全重写的方式，即使看起来像追加内容一样，它会先移除旧的内容，然后写入新旧结合的内容。这会导致一些问题，元素的状态会被重新加载了

`elem.outerHTML`是另一个读写元素的属性，但是它还包括了元素自身，只不过它的修改与`innerHTML`有所不同，它会将自身也替换掉，这导致变量还是原来的元素引用，所以写入内容的时候要注意获取新的元素引用，可以通过一个例子来证明：

```html
<body>
  <div>hello, world</div>
  <script>
    let div = document.querySelector('div');
    console.log(div);  // <div>hello, world</div>
    div.outerHTML = '<div>new div</div>';
    console.log(div);  // <div>hello, world</div>
  </script>
</body>
```

`innerHTML`和`outerHTML`只对元素节点有效，对于文本节点可以使用`nodeValue`和`data`属性，它们几乎是相同的

```html
<body>firstText
  <div>hello, world</div>
  <script>
    console.log(document.body.firstChild.nodeValue); // firstText
    console.log(document.body.firstChild.data);      // firstText
  </script>
</body>
```

还有一个`elem.textContent`属性用来获得元素中的纯文本，它会裁掉其中的所有标签，只留下文本内容。相对于`innerHTML`来说，通过`textContent`写入文本要更加安全，因为它只会按照字面意思处理

```html
<body>firstText
  <div>hello, world</div>
  <script>
    console.log(document.body.textContent);
  </script>
</body>

<!-- 
得到这样的文本内容：

firstText
  hello, world
  
    console.log(document.body.textContent);
  
-->
```

另外还有一个特殊的`hidden`属性用来隐藏元素，它和 CSS 中的`display: none;`是等效的，为`true`时就隐藏掉该元素，写法上会更加简洁

## 修改文档

修改文档即修改 DOM 节点，要创建一个 DOM 节点有两种方法，且只能通过`document`创建：

+ `document.createElement(tag)` — 创建元素节点
+ `document.createTextNode(text)` — 创建文本节点

```js
/* 创建一个 <div> 元素节点，保留在 div 变量中 */
let div = document.createElement('div');
```

虽然创建了一个节点，但它并不在 DOM 上，所以需要使用插入方法来将它插入到文档的某一个地方，比如`elem.append()`

```html
<body>
  <script>
    let div = document.createElement('div');
    document.body.append(div);
  </script>
</body>
```

现在这个文档会变成这样：

```html
<body>
  <script>
    let div = document.createElement('div');
    document.body.append(div);
  </script>
  <div></div>
</body>
```

它被插入到了`<body>`末尾，像这样的插入方法有很多：

+ `node.append(node)` — 在`node`末尾插入节点
+ `node.prepend(node)` — 在`node`开头插入节点
+ `node.before(node)` — 在`node`前面插入节点
+ `node.after(node)` — 在`node`后面插入节点
+ `node.replaceWith(node)` — 将`node`替换为给定的节点

这些方法的参数类型不仅可以是插入任意 DOM 节点，还可以是字符串，它会被自动转为文本节点

```html
<body>
  <script>
    let div = document.createElement('div');
    document.body.append(div);
    div.append('hello, world');
  </script>
</body>
```

变成了这样：

```html
<body>
  <script>
    let div = document.createElement('div');
    document.body.append(div);
    div.append('hello, world');
  </script>
  <div>hello, world</div>
</body>
```

它不会解析含有 Tag 的字符串，会被自动转义，和`textContent`一样

```js
div.append('<p>hello, world</p>'); // &lt;p&gt;hello, world&lt;/p&gt;
```

此外，这些方法都可以同时插入多个节点

```html
<body>
  <script>
    let div = document.createElement('div');
    let p = document.createElement('p');
    document.body.append(div, p);
  </script>
</body>
```

现在是这样的

```html
<body>
  <script>
    let div = document.createElement('div');
    let p = document.createElement('p');
    document.body.append(div, p);
  </script>
  <div></div>
  <p></p>
</body>
```

DOM 还提供了一个通用的方法`elem.insertAdjacentHTML(where, htmlstring)`用来插入包含 HTML 标签的字符串

第一个参数是有讲究的，指定相对于`elem`的插入位置，必须是下面的一种：

+ `"beforebegin"` — 插入到`elem`前
+ `"afterbegin"` — 插入到`elem`开头
+ `"beforeend"` — 插入到`elem`末尾
+ `"afterend"` — 插入到`elem`后

```html
<body>
  <script>
    document.body.insertAdjacentHTML('beforeend', '<p>hello, world</p>');
  </script>
</body>
```

会变成这样

```html
<body>
  <script>
    document.body.insertAdjacentHTML('beforeend', '<p>hello, world</p>');
  </script>
  <p>hello, world</p>
</body>
```

如果想移除一个节点，可以使用`node.remove()`

```html
<body>
  <script>
    let div = document.createElement('div');
    document.body.prepend(div);           // 添加到 DOM
    setTimeout(() => div.remove(), 1000); // 一秒后移除
  </script>
</body>
```

如果想要移动一个节点，不需要先将其从原位置删除，只需要获取该节点，并调用插入方法即可

```html
<body>
  <div id="foo"></div>
  <div id="bar"></div>
  <script>
    let foo = document.querySelector('#foo');
    let bar = document.querySelector('#bar');
    bar.after(foo);
  </script>
</body>
```

被调用后变成这样，实现了位置交换：

```html
<body>
  <div id="bar"></div>
  <div id="foo"></div>
  <script>
    let foo = document.querySelector('#foo');
    let bar = document.querySelector('#bar');
    bar.after(foo);
  </script>
</body>
```

::: tip
所有的插入方法都会从旧位置删除该节点，因为一个节点不能同时位于 DOM 中的两个位置
:::

`elem.cloneNode(boolean)`会用来创建一个和自身相同的元素，包括特性。当为`true`时，就会进行深克隆，`false`只是克隆自身并不包括子元素

```html
<body>
  <div id="foo"><div>
  <script>
    let div = document.querySelector('div');
    let cloneDiv = div.cloneNode();
    div.after(cloneDiv);
  </script>
  <div id="foo"><div>
</body>
```

还有一个特殊的 DOM 节点`DocumentFragment`，用来创建一个文档片段，它就像一个轻量版的 document，存储由节点组成的文档结构，但是它不是真实 DOM 的一部分，它的变化不会触发 DOM 树的重新渲染，所以没有性能问题。当需要插入一个文档片段时就可以使用它，它必须通过构造方式调用，来创建一个空的文档片段对象，这个对象继承 Node 的所有方法

```html
<body>
  <ul id="ul"></ul>
  <script>
    let fragment = new DocumentFragment();
    for (let i = 1; i <= 3; i++) {
      let li = document.createElement('li');
      li.textContent = i;
      // 追加节点
      fragment.append(li);
    }
    // 将 li 片段插入到 ul
    ul.append(fragment);
  </script>
</body>
```

因为历史原因还存在一些老式的文档修改方法，它们非常不灵活，需要确定父节点

| 方法                      | 描述                 |
| ------------------------- | -------------------- |
| parent.appendChlid(node)  | 插入一个子节点到末尾 |
| parent.insertBefore(node) | 在节点前插入一个节点 |
| parent.cloneChlid()       | 克隆一个节点         |
| parent.removeChild()      | 移除子节点           |
| parent.replaceChild()     | 替换子节点           |
| parent.hasChildNodes()    | 检查是否有子节点     |

`document.write()`可以为 HTML 文档添加一些内容，接受一个字符串，并能够解析字符串中的标签，但它是一个非常古老的方法，一旦调用就会立即写入页面。它只会在页面加载时工作，所以如果进行延迟调用，它会擦除现有的所有文档内容，由于不涉及 DOM 修改，运行非常快

```html
<body>
  <script>
    // 5s 后将会擦除所有文档内容，并写入对应内容
    setTimeout(()=>document.write('<p>hello, world</p>'), 5000);
  </script>
</body>
```

## HTML 特性 和 DOM 属性

浏览器渲染时，会从 HTML 中生成 DOM 对象，当元素节点有标准的 HTML 特性时会变成 DOM 对象的属性。DOM 对象的属性就像 JavaScript 对象一样可以任意修改，但是一些内建属性和方法是遵循大小写敏感的。在 HTML 中一个标签有很多特性，标准的特性会生成对应的 DOM 属性，但是非标准的特性并不会

总结先写在前面：

| HTML attribute            | DOM property                                   |
| ------------------------- | ---------------------------------------------- |
| 大小写不敏感              | 大小写敏感                                     |
| 值是字符串或`null`        | 是任意合法的 JavaScript 类型                   |
| 不存在则返回`null`        | 不存在则返回`undefined`                        |
| 更新`value`，属性也会更新 | 更新`value`，特性也会更新（除了`input.value`） |

```html
<body id="standard" custom="no standard">
  <script>
    console.log(document.body.id);  // standard
    console.log(document.body.custom);  // undefined
  </script>
</body>
```

另外有的元素的标准特性可能对另一个元素是未知的，比如`type`是`<input>`特有的标准属性，但是对`<body>`来说不是。如果一个特性不是标准的，可以通过以下方法进行访问：

+ `elem.hasAttribute(name)` — 检查特性是否存在
+ `elem.getAttribute(name)` — 获取这个特性值
+ `elem.setAttribute(name, value)` — 设置这个特性值
+ `elem.removeAttribute(name)` — 移除这个特性
+ `elem.attributes` — 节点中所有的特性

现在它访问到了

```html
<body id="standard" custom="no standard">
  <script>
    console.log(document.body.id);  // standard
    console.log(document.body.custom);  // undefined
    console.log(document.body.getAttribute("custom")); // no standard
  </script>
</body>
```

HTML 特性是对大小写不敏感的，所以这种也是可行的。但是自动生成的 DOM 对象属性是大小写敏感的，比如`elem.id`不能写成`elem.ID`

```html
<body id="standard" custom="no standard">
  <script>
    console.log(document.body.getAttribute("CUSTOM")); // no standard
  </script>
</body>
```

当一个标准的特性被改变时，对应的 DOM 属性也会更新，反过来也是

```html
<body>
  <script>
    let body = document.body;

    // 特性反映到属性
    body.setAttribute('id', 'standard');
    console.log(body.id);  // 'standard'

    // 属性反映到特性
    body.id = 'newID';
    console.log(body.getAttribute("id")); // 'newID'
  </script>
</body>
```

::: caution
有一个例外，它是`input.value`，只能从特性同步到属性，反之不行
:::

大部分 DOM 属性都是字符串类型，但也有少部分不是，比如`input.checked`是布尔型。还有一个特别的情况，`a.href`在 DOM 中永远都是一个完整的 URL 字符串，即使在特性中只有一个相对路径或`#hash`

## data-*

虽然 HTML 允许自定义特性，但是如果处于目的是用了非标准的特性，但是后来被引入到了标准中有了自己的用途，这就问题很大了。HTML 是不断的在向前发展的，肯定会有很多特性引入后续的标准，为了解决这个问题，标准中提供了一个特殊的`data-*`特性，所有以这种开头的特性都会保留给开发者使用，被保留在 DOM 对象的`dataset`中

```html
<body data-id="dataID" data-title="dataTitle">
  <script>
    let body = document.body;
    console.log(body.dataset);  // { id: dataID, title: dataTitle}
  </script>
</body>
```

这非常好，所有以`data-*`开头的特性均会保留在`dataset`对象中，而且去掉了前缀，而如果特性有很多个`-`连接起来的单词，它会转换为小驼峰风格的`dataset`属性，比如`data-id-www`转为`dataset.idWww`

属性节点并不会被看作成文档树中的一部分，因此没有所谓的节点层次关系，属性节点只是和元素节点关联，并且所有的属性都会被保存在一个属性集合中，`createAttribute(name)`用于一个创建属性节点，可以使用`setAttributeNode(attr)`方式添加

```html
<body>
  <script>
    let div = document.createElement('div');
    let id = document.createAttribute('id');
    id.value = 'foo';
    div.setAttributeNode(id);
    document.body.prepend(div);
  </script>
</body>
```

现在它会变成这样：

```html
<body>
  <div id="foo"></div>
  <script>
    let div = document.createElement('div');
    let id = document.createAttribute('id');
    id.value = 'foo';
    div.setAttributeNode(id);
    document.body.appendChild(div);
  </script>
</body>
```

## CSS 操作

HTML、CSS、JavaScript 是三个独立的技术，但每种技术都为对方提供了 API，实现了相互操作的能力，HTML DOM 为 JavaScript 提供了 API。同样的，CSS 也为 JavaScript 提供了 API 操作 HTML 文档的样式表能力

在 DOM 中有两种操作样式表的方式，一种是使用元素的`style`属性来定义，也就是内嵌样式；另一种是使用元素来定义样式表，也就是使用`<link>`和`<style>`元素，针对不同的使用方式就产生了不同的处理方法

修改元素的样式有两种方式，通过`class`和`style`修改，那么 JavaScript 自然可以修改它们，因为它们也是特性。但是最好使用修改`class`的方式来添加样式，除非遇到`class`无法处理的情况才考虑使用`style`

对于`class`特性来说，可以使用`elem.className`来进行读写

```html
<body>
  <div id="foo">foo</div>
  <script>
    foo.className = 'red underscore';
    console.log(foo.className);
  </script>
</body>
```

`className`显得太粗暴了，它会替换整个类，有时候需要添加/删除单个类，因此需要用到另一个属性`elem.classList`，它会返回一个特殊的对象，具有`add/remove/toggle/contains`方法，它是可以被迭代的

+ `add(class)` — 添加类
+ `remove(class)` — 移除类
+ `toggle(class)` — 如果类不存在就添加，存在就删除
+ `contains(class)` — 检查指定的类，存在就返回`true`，否则`false`

```html
<body>
  <div id="foo">foo</div>
  <script>
    foo.classList.add('red');
    foo.classList.add('underscore');
  </script>
</body>
```

`elem.style`属性是一个对象，这个对象包含了可以为该元素设置的所有样式属性，它们都是这种`{属性名1: 属性值, 属性名2: 属性值, ...}`键值对形式，修改对应的属性就相当于定义了样式

```html
<body>
  <div id="foo">Hello, World</div>
  <script>
    foo.style.color = 'red';
  </script>
</body>
```

这种方式定义的样式就像在 HTML 特性中的`style`一样，`elem.style.color = 'red'`等价于`style="color: red;"`

除此之外，对于多词属性，它在`elem.style`中是一种驼峰式，比如`font-size`等于`elem.style.fontSize`。对于一些浏览器专属前缀也是这种风格，`-moz-border-radius`等于`elem.style.MozBorderRadius`

::: tip
对于一些需要单位的属性值不能忘记添加，否则会设置失效
:::

通常情况下，使用`elem.style.*`对各个样式的设置，但要想进行完全的重写，就需要使用`elem.style.cssText`属性，它的写法就像 HTML 特性中的`style`一样

```html
<body>
  <div id="foo">Hello, World</div>
  <script>
    foo.style.cssText = 'color: red; font-size: 18px;';
  </script>
</body>
```

## getComputedStyle

还有一个非常重要的问题，`elem.style`只和 HTML 中的`style`特性关联，如果元素的属性并不是在这里设置的，那么`elem.style`是无法获取到样式值的

```html
<head>
  <style>
    body {
      color: green;
    }
  </style>
</head>

<body>
  green text
  <script>
    console.log(document.body.style.color); // 什么都没有
  </script>
</body>
```

为了解决这个问题可以使用一个全局方法`getComputedStyle(element)`来计算出该元素的样式，它返回了和`elem.style`类似的对象用于读取样式属性

```html
<head>
  <style>
    body {
      color: green;
    }
  </style>
</head>

<body>
  green text
  <script>
    console.log(document.body.style.color); // 什么都没有
    let bodyStyle = getComputedStyle(document.body);
    // 现在它有了
    console.log(bodyStyle.color); // rgb(0, 128, 0)
  </script>
</body>
```

使用`<style>`或`<link>`元素定义的样式表会被描述一个`styleSheet`对象，可以使用`document.styleSheets`获取文档中所有的样式表元素

```html
<head>
  <style>
    body {
      background-color: red;
    }
  </style>
</head>

<body>
  <script>
    console.log(document.styleSheets);
  </script>
</body>
```

## 元素的大小和滚动

DOM 提供了很多属性可以获得元素的宽高，和其他几何特征的信息，在进行移动或定位元素时，需要用到它们

`elem.offsetParent`用于获取最接近的祖先元素包含该元素的定位元素或最近的`body`、`table`、`th`、`td`

```html
<body>
  <div id="foo"></div>
  <script>
    console.log(foo.offsetParent); // 得到 body
  </script>
</body>
```

那么`offsetLeft/offsetTop`就是相对于`offsetParent`左上角的坐标

`offsetWidth/offsetHeight`用来获取元素的外部宽高属性，包括边框、内边距、滚动条以及定义的`width/height`属性之和

`clientTop/clientLeft`用于获取元素的边框宽度

`clientWidth/clientHeight`用于获取元素边框内的区域大小，包括内容区域和内边距，但不会包括溢出的滚动条部分

`scrollWidth/scrollHeight`用于获取元素边框内的区域大小，包括溢出的滚动条部分

`scrollLeft/scrollTop`是用来获取元素的滚动部分的 width/height，它们是可修改的，`scrollTop`就是从上往下滚动了多少距离，如果将它设置为`0`或一个超级大的值，会使元素滚动到顶部/底部

千万不要从 CSS 中获取元素的`width/height`，因为 CSS 的宽高还取决于`box-sizing`，它重新定义了宽度和高度，这样会破坏 JavaScript 中的计算，除此之外，在没有滚动条的时候可能是正常的，而出现滚动条时就可能出现问题，因为滚动条会占用内容的空间，可用的内容空间实际小于 CSS 定义的宽高，而`clientWidth/clientHeight`会考虑这一点

So，当需要获取元素的几何属性时，不要从 CSS 中获取

## 窗口的大小和滚动

如果想要获取整个窗口的宽高，首先要获取对应的根元素`document.documentElement`

`clientWidth/clientHeight`可以用来获得窗口的宽高，一般情况下，`clientHeight`的值肯定是小于显示器高度的，这是因为浏览器的工具栏，标签栏，以及操作系统的任务栏占用了一部分高度，如果将一个网页全屏再获取它的高度，肯定是等于显示器高度的

`scrollWidth/scrollHeight`用来获取整个文档的完整宽高

`scrollTop/ScrollLeft`自然也能获取文档的滚动位置，但是对于大部分浏览器来说可以使用`document.documentElement`获取，对于少数浏览器应该使用`document.body`，这里不得不提到令人讨厌的兼容性问题。但是根本没必要记住这些东西，因为滚动可以在`window.pageXOffset/pageYOffset`两个属性中获得

在记录到这里的时候，我发现了一个在 chrome 中的 bug，`document.documentElement.scrollTop`设置滚动会失效，这可能和文档的渲染有关，好在已经找到了解决方案，只要异步赋值就可以解决

```js
setTimeout(() => {
  document.documentElement.scrollTop = 40;
}, 0);
```

::: caution 重要
必须在 DOM 完全渲染好后，才能通过 JavaScript 滚动页面，否则无法工作
:::

不过还有一个通用的解决方案，就是使用`window.scrollBy(x, y)`和`window.scrollTo(x, y)`

`window.scrollBy(x, y)`用于将页面滚动到相对于当前位置的位置

::: normal-demo scrollBy

```html
<input type="button" value="向下滚动" id="clickScroll">
```

```js
document.querySelector('#clickScroll').addEventListener('click', ()=>{
  scrollBy(0, 10);
});
```

:::

而`window.scrollTo(x, y)`用于将页面滚动到绝对坐标，是基于左上角的坐标

还有一个`window.scrollIntoView()`用于将滚动页面且使这个元素可见，当取值为`true`时，页面会向下滚动，并且贴靠该元素的上边缘，那么为`false`，就是正好相反。如果滚动距离不够，它只会尝试滚动到最大值

::: normal-demo scrollIntoView

```html
<input type="button" value="向下滚动使元素可见" id="topTrue">
<br><br><br><br>
<input type="button" value="向上滚动使元素可见" id="topFalse">
```

```js
document.querySelector('#topTrue').addEventListener('click', target => {
  target.srcElement.scrollIntoView(true);
});

document.querySelector('#topFalse').addEventListener('click', target => {
  target.srcElement.scrollIntoView(false);
});
```

:::

有时候还需要文档禁止滚动，很简单，只要将`document.body.style.overflow = "hidden"`即可，如果要恢复，则将值设置为空字符串即可

不仅可以冻结文档，还能以同样的方式禁止元素。但是它会导致滚动条消失，然后内容去填充它。为了不受影响，应该对滚动条消失的地方使用`padding`来替代

## 元素的坐标

<!-- to be updated -->

## 总结

+ 标签和内容都会成为 DOM 对象，对于 DOM 来说所有的操作都是从`document`开始，从这里访问节点并操作
+ 访问节点时要注意是否为元素节点，用一些比较干净的 API，比如`children`、`parentElement`等
+ 也有一些方法允许搜索节点，比如`getElementById`、`getElementsByClass`、`querySelector`、`querySelectorAll`等。但是`getElementsBy*`是动态的，`querySelectorAll`并不是
+ DOM 中每个节点都属于某种类型，包括注释，DOM 有 12 中节点类型，但是用得到的只有 4 种
+ 节点就是常规的对象，通过原型继承，知道一个节点就可以使用`nodeName`读取类型
+ `innerHTML`和`outerHTML`允许读写元素内容，只对元素节点有效，都会解析字符串中的标签，但是`outerHTML`会将自身也给替换掉
+ 文本节点可以使用`nodeValue`或`data`访问内容，几乎是相同的。文本节点的`textContent`会裁掉其中所有的标签，只留下文本内容
+ 元素的`hidden`属性也可以用来隐藏元素
+ `document`提供了大量方法用来修改文档，包括元素的增删改查，`document.write()`是一个很老的写入内容的方法，只在加载时执行，当加载完成后调用就会重写页面上所有的内容
+ 标准的 HTML 特性会映射成 DOM 属性，修改特性会导致属性更新，反之亦然，除了`input.value`
