set -e

# github
git push github --all
git push github --tags

# gitlab
git push gitlab --all
git push gitlab --tags

# gitee
git push gitee --all
git push gitee --tags

# coding
git push coding --all
git push coding --tags

cd -
