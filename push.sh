set -e

# git add .

# git commit -m "feat: updates some notes and changes"

# git commit -m "chore(deps): updates deps"

# git commit -m "fix: fixed some errors"

# github
git push origin_ssh_github --all
git push origin_ssh_github --tags
git push https://github.com/JQiue/jqiue-notes.git --all
git push https://github.com/JQiue/jqiue-notes.git --tags

# gitlab
git push origin_ssh_gitlab --all
git push origin_ssh_gitlab --tags
git push https://gitlab.com/JQiue/jqiue-notes.git --all
git push https://gitlab.com/JQiue/jqiue-notes.git --tags

# gitee
git push origin_ssh_gitee --all
git push origin_ssh_gitee --tags
git push https://gitee.com/jqiue/jqiue-notes.git --all
git push https://gitee.com/jqiue/jqiue-notes.git --tags

# coding
git push origin_ssh_coding --all
git push origin_ssh_coding --tags
git push https://e.coding.net/jqiue/wjq/jqiue-notes.git --all
git push https://e.coding.net/jqiue/wjq/jqiue-notes.git --tags

cd -
