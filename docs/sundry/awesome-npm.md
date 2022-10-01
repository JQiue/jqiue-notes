---
title: 很棒的 NPM 第三方包
article: false
---

## 推荐全局安装的包

```sh
npm i npm-check-updates nrm rimraf nodemon pm2 -g
```

## [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

检查 package.json 依赖项升级最新版本，只是修改 package.json 文件，需要执行`npm install`更新已安装的包

## [nrm](https://github.com/Pana/nrm)

是一个注册表管理器，用于快速切换下载源

## [nodemon](https://github.com/remy/nodemon)

监听 Node.js 应用程序的更改，并自动重启服务器

## [concurrently](https://github.com/open-cli-tools/concurrently)

同时执行多个 NPM 命令

## [live-server](https://github.com/tapio/live-server)

是一个具有实时重新加载功能的小型开发服务器

## [rimraf](https://github.com/isaacs/rimraf)

是一个类似于 UNIX command`rm rf`命令的包，能大大加快移除文件的速度，可以快速的移除`node_modules`了

## [anywhere](https://github.com/JacksonTian/anywhere)

快速启动一个静态的文件服务器

## [lodash](https://github.com/lodash/lodash)

现代 JavaScript 实用工具库

## [Progress](https://github.com/visionmedia/node-progress)

终端进度条

## [chalk](https://github.com/chalk/chalk)

为终端进行着色

## [nodemailer](https://github.com/nodemailer/nodemailer)

发送邮件

## [glob](https://github.com/isaacs/node-glob)

模式匹配目录文件

## [commitlint](https://github.com/conventional-changelog/commitlint)

规范 Git 提交信息

## [json-server](https://github.com/typicode/json-server)

快速启动一个 REST APi Server

## [pm2](https://github.com/Unitech/pm2)

Node.js 进程管理

```sh
pm2 start app.js --watch # 以实时监控 app.js 启动，文件发生改动后会自动 reload
pm2 start --name <AppName> app.js  #  app.js 启动，以 AppName 命名该进程
pm2 start --name <AppName> npm -- start  # 启动 npm start 项目
pm2 start --name <AppName>  npm -- run <scripts> -n  # 启动 npm run 项目
pm2 start pm2confg.json # 以配置文件形式启动
```

pm2 状态

```sh
pm2 list                # 显示所有应用状态
PM2 show <id|appname>   # 显示某个应用的详细信息
pm2 monit               # 监视所有应用
pm2 log                 # 显示所有进程日志
pm2 log <id|appname>    # 显示某个进程日志
pm2 stop <id|appname>   # 停止某个应用
pm2 stop all            # 停止所有应用
pm2 restart all         # 重启所有应用
pm2 stop <id|appname>   # 重启某个应用
pm2 stop all            # 停止所有应用
PM2 delete all          # 杀死并删除所有应用
PM2 delete <id|appname> # 杀死并删除某个应用
pm2 startup             # 设置开机自启动
pm2 unstartup           # 禁用开机自启动
```
