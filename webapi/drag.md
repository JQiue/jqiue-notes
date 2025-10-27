---
title: 拖拽
category: Web
article: false
---

::: info 前置知识

+ HTML
+ CSS
+ JavaScript
+ DOM
:::

拖拽是一个很常见的功能，在 HTML5 中，拖拽是标准的一部分，任何元素都可以拖动

在网页中，有几种特定的情况会使用默认的推拽行为，比如拖拽选中文本，推拽图像和推拽链接等，当一个图像或链接被拖拽时，图像或链接的 URL 会被设定为拖拽数据

除了图像、链接、选择的文本可以被拖拽之外，其它的元素在默认情况下是不可拖拽的，要使它们可拖拽必须完成三件事：

+ 设置元素的`draggable`属性为`true`
+ 为`dragstart`事件添加一个监听程序
+ 在监听程序中设置拖拽数据

::: tip
当一个元素被设置为可拖拽时，其中的文本和子元素无法选中
:::

## 拖拽事件

+ `dragstart`：拖拽开始时触发
+ `drag`：元素被拖动时反复触发
+ `dragend`：拖拽结束时触发
+ `dragenter`：被拖动元素进入放置目标时触发
+ `dragover`：在放置目标上拖动反复触发
+ `dragleave`:被拖动元素没有放下放置目标就离开时触发
+ `drop`：被拖拽元素放到放置目标时触发

::: tip
目标元素默认是不能够被拖放的，即不会触发`ondrop`事件，可以通过在目标元素的 `ondragover`事件中取消默认事件来解决此问题
:::

::: normal-demo

```html
<div class="container">
  <p class="draggable" draggable="true">1</p>
  <p class="draggable" draggable="true">2</p>
</div>
<div class="container">
  <p class="draggable" draggable="true">3</p>
  <p class="draggable" draggable="true">4</p>
</div>
```

```css
.dragable {
  width: 200px;
  height: 140px;
}

.container {
  background-color: #333;
  padding: 1rem;
  margin-top: 1rem;
}

.draggable {
  padding: 1rem;
  background-color: white;
  border: 1px solid #000;
  cursor: move;
}

.dragging {
  opacity: .5;
}
```

```js
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', e => {
    console.log('开始拖拽');
    e.dataTransfer.setData('text/plain', e.target.textContent);
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', e => {
    console.log('结束拖拽');
    draggable.classList.remove('dragging');
  });
  draggable.addEventListener('drag', e => {
    console.log('拖动中');
  });
});
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    console.log(afterElement);
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      };
    } else {
      return closest;
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element
}
```

:::

## dataTransfer

所有拖拽事件都有一个名为`dataTransfer`的对象，它持有拖拽数据，当拖拽文本时，数据就是文本本身，拖拽链接时，数据就是链接的 URL

+ `setData(MIMEType, data)` - 设置数据
+ `getData(MiMEType)` - 获取数据
+ `clearData()` - 清除所有类型的数据
+ `setDragImage(img, xOffset, yOffset)` - 拖拽会生成目标的半透明图像，可以使用方法这个自定义

只能在`drop`事件中使用`getData`获取到数据

[MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

<!-- to be updated -->
