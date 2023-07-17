#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
# echo 'jinqiu.wang' > CNAME

git init
git add -A
git commit -m 'deploy'

git remote add origin git@github.com:JQiue/jqiue.github.io.git

# 如果发布到 https://<USERNAME>.github.io
git push -f origin main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -