set -e

git add .

git commit -m "$(date "+%Y-%m-%d %H:%M:%S")"

git push git@github.com:JQiue/jqiue-notes.git --all
git push git@gitee.com:JQiue/jqiue-notes.git --all

cd -
