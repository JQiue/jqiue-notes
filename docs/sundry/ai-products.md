---
title: AI 产品
category: 知识分享
article: false
---

## 语言模型

GPT-4 算是地表最强了，而 Claude-3.5 算是 GPT-4 强有力的竞争对手

| 模型              | 发布者    | 是否收费 | Token | 数据时效性 |
| ----------------- | --------- | -------- | ----- | ---------- |
| GPT-4             | OpenAI    | 收费     | 8k    |            |
| GPT-4o            | OpenAI    | 免费     | 128k  |            |
| GPT-4o-Mini       | OpenAI    | 免费     | 128k  |            |
| o1                | OpenAI    | 免费     | 128k  |            |
| Gemini 1.5 Pro    | Google    | 收费     | 2m    |            |
| Llama 3.1 70B     | Meta      | 收费     | 128k  |            |
| Llama 3.1 405B    | Meta      | 收费     | 128k  |            |
| Claude 3.5 Haiku  | Anthropic | 免费     | 200k  |            |
| Claude 3.5 Sonnet | Anthropic | 免费     | 200k  |            |
| Claude 3.5 Opus   | Anthropic | 免费     | 200k  |            |
| Mistral Large 2   | Anthropic | 免费     | 128k  |            |
| Qwen2 72B         | 阿里云    | 免费     | 128k  |            |
| Qwen2.5 Max       | 阿里云    | 免费     | 128k  |            |
| DeepSeek R1       | 深度求索  | 免费     | 128k  |            |
| DeepSeek V3       | 深度求索  | 免费     | 128k  |            |

推荐 GPT-4o，Mistral Large 2，Claude-3.5-Sonnet

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
