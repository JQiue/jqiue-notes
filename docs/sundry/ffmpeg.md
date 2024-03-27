---
title: FFmpeg
category: 知识分享
article: false
---

## 转换视频格式

### 无损转换

无损转换保留原始文件的质量，不会降低视频和音频的质量，一般使用 FFmpeg 的 copy 模式进行无损转换

```sh
ffmpeg -i input.avi -c copy output.avi
```

该命令会直接复制输入文件的编解码器和容器格式，生成一个完全相同的输出文件

### 有损转换

有损转换会降低视频和音频的质量，但可以减小输出文件的大小。FFmpeg 支持使用各种编解码器进行有损转换，例如 H.264、VP9 等。一般使用 FFmpeg 的`-c:v`和`-c:a`选项指定视频和音频的编解码器

```sh
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4
```

该命令会使用 H.264 编码视频，AAC 编码音频，转换成 MP4 容器格式，可以通过调整编解码器的参数来平衡质量和文件大小

码率 (bitrate):

+ 提高码率可以提高视频质量，但会增大文件大小
+ 降低码率可以减小文件大小，但会降低质量
+ 常用参数: -b:v 2000k 设置视频码率为 2Mbps

分辨率 (resolution):

+ 降低分辨率可以大幅减小文件大小，但会降低视觉质量
+ 常用参数: -vf scale=1280:720 设置分辨率为 1280x720

帧率 (framerate):

+ 降低帧率可以减小文件大小，但会使视频看起来更"卡顿"
+ 常用参数: -r 30 设置帧率为 30fps

CRF (Constant Rate Factor):

+ CRF 是一种基于质量的恒定码率模式，范围从 0 到 51，0 表示无损
+ 较低的 CRF 值会得到更高质量但更大文件的视频
+ 常用参数: -crf 28 设置 CRF 为 28

编码模式 (preset):

+ FFmpeg 提供了一系列预设编码模式，从"ultrafast"到"veryslow"不等
+ "ultrafast"模式编码速度快，但质量较低;"veryslow"模式质量高，但编码速度慢
+ 常用参数: -preset medium 设置编码模式为 medium
