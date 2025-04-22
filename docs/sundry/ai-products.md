---
title: AI 产品
category: 知识分享
article: false
---

## 语言模型

| 模型              | 发布者    | 上下文 | 最大输出 | 平均延迟 | 发布日期            |
| ----------------- | --------- | ------ | -------- | -------- | ------------------- |
| GPT-4             | OpenAI    | 8K     | 4K       | 0.66s    | 2024 年 5 月 13 日  |
| GPT-4o            | OpenAI    | 128K   | 16K      | 0.51s    | 2024 年 8 月 14 日  |
| o1                | OpenAI    | 200K   | 100K     | 8.54s    | 2024 年 12 月 17 日 |
| GPT-4.1 Nano      | OpenAI    | 1.05M  | 33K      | 0.45s    | 2025 年 4 月 14 日  |
| GPT-4.1 Mini      | OpenAI    | 1.05M  | 33K      | 0.77s    | 2025 年 4 月 14 日  |
| GPT-4.1           | OpenAI    | 1.05M  | 33K      | 0.64s    | 2025 年 4 月 14 日  |
| Gemini Flash 2.5  | Google    | 1.05M  | 66K      | 0.55s    | 2025 年 4 月 17 日  |
| Gemini Pro 2.5    | Google    | 1.05M  | 66K      | 10..31s  | 2025 年 4 月 17 日  |
| Claude 3.5 Haiku  | Anthropic | 200K   | 8K       | 1.35s    | 2024 年 11 月 4 日  |
| Claude 3.5 Sonnet | Anthropic | 200K   | 8K       | 1.62s    | 2024 年 10 月 22 日 |
| Claude 3.7 Sonnet | Anthropic | 200K   | 128K     | 1.35s    | 2025 年 2 月 24 日  |
| Qwen2 72B         | 阿里云    | 128K   | 128K     | 0.64s    | 2024 年 9 月 19 日  |
| DeepSeek R1       | 深度求索  | 164K   | 164K     | 7.66s    | 2025 年 1 月 20 日  |
| DeepSeek V3       | 深度求索  | 128K   | 128K     | 1.85s    | 2024 年 12 月 26 日 |

推荐 GPT-4o，Claude-3.5-Sonnet，Claude 3.7 Sonnet，Gemini Flash 2.5

## 图像生成模型

Midjourney 算是地表最强的绘画 AI 了

当然，Stable Diffusion 也算是最强开源 AI

## 其他

一般来说，这些 AI 都无法在国内正常使用，有的甚至注册繁琐，如果想省事，就使用 Poe 一步到位，Poe 集成了大部分可以使用的 AI 模型，并具有一定免费额度的使用次数

## 实战

### 帮你编写 git commit

主要原理是利用`git diff`生成差异交给 AI 进行分析，同时编写好 Prompt

生成`diff`到文件：

```sh
git diff --cached --diff-algorithm=minimal > diff.txt
```

准备以下 Prompt：

```
生成一个简洁的 git 提交信息，语言是英语，用现在时编写，提交消息最多 50 个字符，排除任何不必要的东西，比如翻译，你的整个响应将直接传递到 git commit，代码差异如下：
```

开始进行对话，将 diff.txt 发给它就行了
