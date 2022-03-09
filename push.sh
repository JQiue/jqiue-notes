set -e

git add .

git commit -m "$(date "+%Y-%m-%d %H:%M:%S")"

# github
git push github --all

# gitee
git push gitee --all

cd -
