---
title: 二进制处理
category: Web
article: false
---

在处理创建，上传，下载的时候会经常遇到二进制数据，这些都可以通过 JavaScript 处理，在 JavaScript 中有很多二进制数据格式，比如`ArrayBuffer`, `Unit8Array`, `DataView`, `Blob`,`File`等等

## ArrayBuffer

基本的二进制对象是`ArrayBuffer`—— 对固定长度的连续内存空间的引用

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
```

它会分配一个 16 字节的连续内存空间，并用 0 进行预填充

要知道的是，ArrayBuffer 不是某种东西的数组，它和数组没有共通的地方：

+ 长度固定
+ 占用正好长度空间
+ 访问某个字节，需要通过别的方式访问，而不是索引

访问 ArrayBuffer 中的数据需要一个“眼镜”来解释其中的字节，这个就是类型数组，比如：

+ Uint8Array —— 将 ArrayBuffer 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数
+ Uint16Array —— 将每 2 个字节视为一个 0 到 65535 之间的整数。这称为 “16 位无符号整数”
+ Uint32Array —— 将每 4 个字节视为一个 0 到 4294967295 之间的整数。这称为 “32 位无符号整数”
+ Float64Array —— 将每 8 个字节视为一个 5.0x10-324 到 1.8x10308 之间的浮点数

因此一个 16 字节的 ArrayBuffer 可以被解释 16 个单元，或 8 个单元（每个 2 字节）,或 4 个单元（每个 4 字节）等等

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列
console.log(Uint32Array.BYTES_PER_ELEMENT); // 每个单元 4 个字节
console.log(view.length); // 单元长度
console.log(view.byteLength); // 字节总大小
```

## 文本的编码和解码

如果二进制正好是一个字符串，可以通过`TextDecoder(utfLabel)`将给定的 Buffer 和编码格式将其读取为字符串。`utfLabel`默认是`utf-8`，也可以是任何有效的编码

```js
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);
let decoder = new TextDecoder();
let str = decoder.decode(Unit8Array);
console.log(str); // 你好
```

`TextEncoder`则是做相反的事，将字符串转换为字节，只支持 UTF-8 编码

```js
let encoder = new TextEncoder();
let uint8Array = encoder.encode("你好");
console.log(); // 228, 189, 160, 229, 165, 189
```

## Blob

`Blob(array, options)` 是由一个可选的字符串类型（MIME）和 parts 组成，而 parts 表示一系列其他的 Blob 对象，字符串和 Buffer 组成的数组

```js
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
```

Blob 是不可变的对象，这意味着无法原生修改，但可以通过`slice`获取 parts，创建新的 Blob

Blob 可以通过`URL.createObjectURL(blob)`转换为，`<a>`，`<img>`或其他标签的 URL。也可以下载/上传 Blob，在实际的网络请求中，`type`自然的变成了`Content-Type`

```html
<!-- 这将会下载它 -->
<a download="hello.txt" href='#' id="link">Download</a>
<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

`URL.createObjectURL`取一个 Blob，并为其创建一个唯一的 URL，每个通过这种方式创建的 URL，都会映射到 Blob 中，但是 Blob 是放在内存中的，浏览器不能释放它，在文档推出时才会清除，如果文档的寿命很长，释放不会很快发生

`URL.revokeObjectURL(url)`从内部映射中移除引用，因此允许 Blob 被删除（如果没有其他引用的话），并释放内存。在调用该方法后，该 URL 不会再起作用了

## File 和 FileReader
