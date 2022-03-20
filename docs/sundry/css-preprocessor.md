---
title: CSS 预处理器
article: false
---

众所周知，CSS 具有大量重复的代码，这看起来很不优雅，CSS 预处理器帮忙做到了简化，常见的预处理有：

+ Sass
+ Less

## Sass

Sass 是最成熟的预处理器，它的后缀文件一般为`scss`或`sass`，`sass`以严格的缩进语法来书写，省略了大括号和分号，而`scss`和平常的`css`类似

嵌套规则：

```css
/* css */
.header span {
  color: red;
}

/* scss */
.header {
  span {
    color: red;
  }
}

/* sass */
.header
  span
    color: red
```

在嵌套规则中引用父选择器

```css
/* css */
.header span {}
.header span:active {}
.header span:hover {}

/* scss */
.header {
  span {
    &:active {}
    &:hover {}
  }
}

/* sass */
.header
  span
    &:active
    &:hover
```

变量 - 任何符合 CSS 取值都可以定义，甚至能参与表达式计算

```css
/* css */
.title {
  color: #666;
}
.subtitle {
  color: #666;
}
.titletitle {
  color: #666;
}

/* scss */
$text-color: #666;
.title {
  color: $text-color;
}
.subtitle {
  color: $text-color;
}
.titletitle {
  color: $text-color;
}
```

当一个代码很大的时候，可以被拆分一个单独的 Sass 文件引入，文件最好以`_`开头，否则会单独编译出一个 CSS 文件，通过`@import`语法导入

```scss
/* foo.scss */
span {
  color: red;
}
```

引入时不需要加`_`

```scss
@import 'foo'
```

混入 - 抽取公共的代码样式

```css
/* scss */
@mixin singleline-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text {
  width: 600px;
  @include singleline-ellipsis;
}

.content-text {
  width: 1000px;
  @include singleline-ellipsis;
}

/* css */
.text {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content-text {
  width: 1000px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

且支持传参，使用`$`定义

```css
/* scss */
@mixin singleline-ellipsis($width) {
  width: $width;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text {
  @include singleline-ellipsis(600px);
}

.content-text {
  @include singleline-ellipsis(1000px);
}

/* css */
.text {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content-text {
  width: 1000px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

还可以搭配`@content`语法，它在被导入的时候被内容所填充

```css
/* scss */
@mixin ipad {
  @media screen and(min-width: 768px) {
    @content;
  }
}

.text {
  color: red;
  @include ipad {
    color: pink;
  }
}

/* css */
.text {
  color: red;
}

@media screen and (min-width: 768px) {
  .text {
    color: pink;
  }
}
```
