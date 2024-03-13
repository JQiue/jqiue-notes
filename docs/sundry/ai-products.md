---
title: AI 产品
category: 知识分享
article: true
---

## 聊天 AI

GPT-4 算是地表最强了，而 Claude-2 算是 GPT-4 强有力的竞争对手

| 模型                | 发布者    | 是否收费 | Token | 数据时效性 |
| ------------------- | --------- | -------- | ----- | ---------- |
| GPT-3.5             | OpenAI    | 免费     | 32K   | 2021年9月  |
| GPT-4               | OpenAI    | 收费     |       |            |
| PaLM-2              | Google    | 免费     | 8k    |            |
| LLaMA2              | Meta      | 免费     |       |            |
| Claude-Instant      | Anthropic | 免费     | 9K    |            |
| Claude-Instant-100K | Anthropic | 收费     | 100K  |            |
| Claude-2            | Anthropic | 收费     | 100K  |            |
| Claude-2.1          | Anthropic | 收费     | 200K  |            |
| 讯飞星火            | 讯飞      | 免费     |       |            |
| 文心一言            | 百度      | 免费     |       |            |
| 通义千问            | 阿里云    | 免费     | 32K   |            |

## 绘画 AI

Midjourney 算是地表最强的绘画 AI 了

当然，Stable Diffusion 也算是最强开源 AI 绘画工具

## 其他

一般来说，这些 AI 都无法在国内正常使用，有的甚至注册繁琐，如果想省事，就使用 Poe 一步到位，Poe 集成了大部分可以使用的 AI 模型，并具有一定免费额度的使用次数

## 实战

### 帮你编写 git commit

主要原理是利用`git diff`生成差异交给 AI 进行分析，同时编写好 Prompt

生成`diff`到文件：

```sh
git diff --cached --diff-algorithm=minimal > diff.txt
```

准备以下 Prombt：

```
生成一个简洁的 git 提交信息，语言是英语，用现在时编写，提交消息最多 50 个字符，排除任何不必要的东西，比如翻译，你的整个响应将直接传递到 git commit，代码差异如下：
```

开始进行对话，将 diff.txt 发给它就行了
