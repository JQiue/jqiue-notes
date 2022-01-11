---
title: CI/CD
category: 知识分享
author: JQiue
article: false
---

持续集成 Continuous Integration （CI）和持续交付 Continuous Delivery（CD）是用来让开发人员更加关注于业务开发，自动化研发流程，提高研发效率

## Github actions

Github actions 是 Github 2019 年发布的一个 CI/CD 工具，持续集成有很多操作组成，Github 将这些操作称之为 actions，这是一些基本概念

+ workflow - 持续集成运行一次的流程
+ job - 一个 workflow 由一个或多个 job 组成
+ step - 每个 job 运行的具体步骤
+ action - 每个 step 可以依次执行的一个或多个命令

要想配置工作流，必须将一个 workflow 文件放到项目的`.github/workflow`中，采用 YAML 格式，后缀名为`.yml`，可以有多个 YAML 文件，Github 一旦发现就会自动执行该文件中的内容