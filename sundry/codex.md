---
title: Codex 使用指南
category: 知识分享
article: false
---

## 按 `model_provider` 切换模型列表：用 `profiles` + `model_catalog_json`

### 背景：为什么要这样做

Codex 有 `model_catalog_json`：可让你加载一个**本地 JSON 的模型目录**。`model_catalog_json` 在代码里属于“启动时加载”，一旦设置就会成为**权威模型目录**，并且会禁用后续从 `/models` 刷新。因此：**如果你只用一个全局 `model_catalog_json`，模型列表就不会随 `model_provider` 自动变化。**解决方案：用不同的 `profiles.*`，让每个 profile 指向不同的 `model_catalog_json`，从而达到“按 provider 切换模型列表”。

### 可用前提

- `config.toml` 支持 `profiles`（配置切片）。
  - CLI 支持用 `--profile/-p` 指定要加载哪个 profile。
  - 每个 profile 里可以设置：
    - `model_provider`
    - `model_catalog_json`

### 推荐写法：每个 provider 一个 profile

准备多个 catalog 文件（示例）：

- `./models-openai.json`
- `./models-ollama.json`
- `./models-lmstudio.json`

然后在 `config.toml` 写：

```toml
# 顶层可以留空或作为默认值
model_provider = "openai"
model_catalog_json = "./models-openai.json"

[profiles.openai]
model_provider = "openai"
model_catalog_json = "./models-openai.json"

[profiles.ollama]
model_provider = "ollama"
model_catalog_json = "./models-ollama.json"

[profiles.lmstudio]
model_provider = "lmstudio"
model_catalog_json = "./models-lmstudio.json"
```

## 使用方法：启动时指定 profile（重启后生效）

- codex --profile ollama ...
- codex -p openai ...

或者如果你用的是某些启动方式支持顶层 profile 字段，也可以在 config.toml 顶层指定当前 profile（以你实际使用方式为准）。

## 关键注意点

- 重启必需：model_catalog_json 是启动时加载的；不重启不会切换目录。
- 模型列表不会运行时跟 provider 自动切换：换 provider 但不换 profile，catalog 仍是你启动时加载的那个。
- provider id 要匹配：profile 里的 model_provider 必须是 Codex 能识别的 provider key（内置常见为 openai、ollama、
    lmstudio；如果你自定义了 model_providers，profile 里也要用你定义的 key）。

## 如果不想写 catalog（替代方案）

- 不设置 model_catalog_json：让 Codex 直接从当前 model_provider 的 /models 拉取模型列表。
- 但这会依赖远端/权限/刷新策略，不如本地 catalog 可控。

## 参考定位（代码路径）

- model_catalog_json 读取与加载：codex-rs/core/src/config/mod.rs
- 模型目录管理器和“自定义 catalog 模式不刷新”：codex-rs/core/src/models_manager/manager.rs
- provider 列表与内置 provider id：codex-rs/core/src/model_provider_info.rs
- profile 解析与应用：codex-rs/core/src/config/mod.rs

## Codex `models.json` 参数速查（字段含义与作用）

来源：`codex-rs/core/models.json`，后端真正使用的模型元信息类型：`codex-rs/protocol/src/openai_models.rs` 的 `ModelInfo`

> 说明：以下“是否生效/影响行为”以仓库内代码实际读取为准。`models.json` 里有些字段在当前仓库 Rust 代码中没有被按字段名读取（多半用于 UI/SDK/其他层）。

### 单个模型条目的参数

- `models`: 数组，每个元素是一台“模型条目”（模型能力/展示/默认策略的集合）。

### 标识与展示

- `slug`：模型内部唯一标识（后端选模型主要靠它）。
- `display_name`：UI 展示名。
- `description`：UI 简短描述。

### 选择器可见性与 API 可用性

- `visibility`：模型选择器的展示策略；枚举为：
  - `list`
  - `hide`
  - `none`
- `supported_in_api`：是否允许在 API 模式下使用/暴露该模型。
- `priority`：优先级（常用于默认/排序等逻辑）。

### 升级与引导文案（可选）

- `availability_nux`：可选的引导文案对象（示例：`{ "message": "..." }`）。
- `upgrade`：可选升级提示对象：
  - `model`：建议升级到的模型 `slug`
  - `migration_markdown`：升级提示用 markdown

### Prompt/个性化指令相关

- `base_instructions`：基础指令文本（prompt 底座）。
- `model_messages`（可选）：个性化/指令模板能力（用于支持 personality）。
  - `instructions_template`：模板字符串（通常包含 `{{ personality }}`）
  - `instructions_variables`：
    - `personality_default`
    - `personality_friendly`
    - `personality_pragmatic`

### 输入能力（模态）

- `input_modalities`：支持的输入模态数组；元素为：
  - `text`
  - `image`
- `supports_image_detail_original`：是否允许请求“original”级别的图像细节（还会叠加功能开关/feature）。

### 上下文与截断策略

- `context_window`：模型上下文窗口大小（后端会进一步按比例预留 headroom 计算可用输入）。
- `truncation_policy`：截断策略对象：
  - `mode`：`tokens` 或 `bytes`
  - `limit`：截断上限值

### 工具/执行能力

- `shell_type`：该模型支持的执行/工具壳能力；枚举为：
  - `default`
  - `local`
  - `unified_exec`
  - `disabled`
  - `shell_command`
  - 运行环境能力不满足时会回退（例如 unified_exec 在某些环境不允许时会降级）。
- `supports_parallel_tool_calls`：是否允许并行 tool calls（会影响请求里的并行策略，以及工具执行能力选择）。
- `apply_patch_tool_type`（可选）：apply_patch 工具形式：
  - `freeform`
  - `function`
  - 为 `null` 时由“是否启用该工具”决定最终走哪种默认实现。
- `experimental_supported_tools`：实验性支持工具列表（如包含某些 tool 名称才会注册对应处理器）。

### 推理能力与推理摘要

- `supported_reasoning_levels`：支持的推理档位数组；每项：
  - `effort`：推理档位（如 `low`/`medium`/`high`/`xhigh`，以及仓库定义的其他枚举）
  - `description`：UI 展示描述
- `default_reasoning_level`：推理档位默认值
- `supports_reasoning_summaries`：是否支持 reasoning summaries
  - 若为 `false`：后端不会把 reasoning summary 相关参数放进模型请求里。
- `default_reasoning_summary`：推理摘要默认值（如 `auto`/`concise`/`detailed`/`none`）

### 输出详细度（verbosity）

- `support_verbosity`：模型是否支持 verbosity 控制
  - 为 `false` 时，默认/会话设置的 verbosity 会被忽略（并可能产生 warning）。
- `default_verbosity`：默认 verbosity（如 `low`/`medium`/`high`）

### 其他（可选）

- `context_window`：见上。
- `auto_compact_token_limit`（如果在某些条目出现）：用于自动 compaction 的 token 阈值（仓库内有从 `context_window` 派
  生/裁剪逻辑）。

### “看起来存在但当前仓库未按字段名读取”的字段

这些字段在本仓库的 Rust 代码里我没有找到对应的按字段名读取/使用逻辑（可能用于 UI/SDK 或未来扩展）：

- `reasoning_summary_format`
- `minimal_client_version`
- `available_in_plans`
