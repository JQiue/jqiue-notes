---
title: FFmpeg
category: 知识分享
article: false
---

## 多媒体领域基础

### 容器

容器（Container）用于封装视频、音频和其他数据的文件格式，常见格式：MP4, MKV, AVI, WebM。FFmpeg 通过文件扩展名指定，如 output.mp4

### 编解码器

编解码器（Codec）用于压缩和解压缩音视频数据的算法，常见视频编解码器：H.264, H.265 (HEVC), VP9，常见音频编解码器：AAC, MP3, Opus。FFmpeg 使用 -c:v（视频）和 -c:a（音频）参数，如 -c:v libx264

### 比特率

比特率（Bitrate）又称码率，指每秒传输或处理的比特数，提高码率可以提高视频质量，但会增大文件大小。降低码率可以减小文件大小，但会降低质量。FFmpeg 使用 -b:v（视频）和 -b:a（音频）参数，如 -b:v 1M

### 帧率

帧率（Frame Rate）指视频每秒显示的图像数，降低帧率可以减小文件大小，但会使视频看起来更"卡顿"。FFmpeg 使用 -r 参数，如 -r 30

### 分辨率

分辨率（Resolution）指定视频的宽度和高度，以像素为单位，降低分辨率可以大幅减小文件大小，但会降低视觉质量。FFmpeg 用法：使用 -s 参数，如 -s 1920x1080

常用参数: -vf scale=1280:720 设置分辨率为 1280x720

### 流

流（Stream）是容器中的单个音频、视频或字幕轨道。FFmpeg 使用 -map 参数选择特定流，如 -map 0:v:0 -map 0:a:0

### 滤镜

滤镜（Filter）用于修改音频或视频的效果。FFmpeg 使用 -filter:v（视频）和 -filter:a（音频）参数，如 -filter:v "scale=1280:720"

## 转换视频格式

### 无损转换

无损转换保留原始文件的质量，不会降低视频和音频的质量，一般使用 FFmpeg 的 copy 模式进行无损转换

```sh
ffmpeg -i input.avi -c copy output.avi
```

该命令会直接复制输入文件的编解码器和容器格式，生成一个完全相同的输出文件

### 有损转换

有损转换会降低视频和音频的质量，但可以减小输出文件的大小。FFmpeg 支持使用各种编解码器进行有损转换，例如 H.264、VP9 等，一般使用 FFmpeg 的`-c:v`和`-c:a`选项指定视频和音频的编解码器

```sh
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4
```

该命令会使用 H.264 编码视频，AAC 编码音频，转换成 MP4 容器格式，可以通过调整编解码器的参数来平衡质量和文件大小

CRF (Constant Rate Factor):

+ CRF 是一种基于质量的恒定码率模式，范围从 0 到 51，0 表示无损
+ 较低的 CRF 值会得到更高质量但更大文件的视频
+ 常用参数: -crf 28 设置 CRF 为 28

编码模式 (preset):

+ FFmpeg 提供了一系列预设编码模式，从"ultrafast"到"veryslow"不等
+ "ultrafast"模式编码速度快，但质量较低;"veryslow"模式质量高，但编码速度慢
+ 常用参数: -preset medium 设置编码模式为 medium

## 合并

```sh
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4
```

1. `-i video.mp4`: 指定输入视频文件
2. `-i audio.mp3`: 指定输入音频文件
3. `-c:v copy`: 复制视频编码，不进行重新编码（这样可以保持原视频质量并加快处理速度）
4. `-c:a aac`: 将音频编码为 AAC 格式（通常与 MP4 容器一起使用）
5. `-map 0:v:0`: 从第一个输入文件（视频）中选择第一个视频流
6. `-map 1:a:0`: 从第二个输入文件（音频）中选择第一个音频流
7. `output.mp4`: 指定输出文件名和格式
