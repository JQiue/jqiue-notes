set -e

# github
git push github_origin --all
git push github_origin --tags
git push https://github.com/JQiue/jqiue-notes.git --all
git push https://github.com/JQiue/jqiue-notes.git --tags

# gitlab
git push gitlab_origin --all
git push gitlab_origin --tags
git push https://gitlab.com/JQiue/jqiue-notes.git --all
git push https://gitlab.com/JQiue/jqiue-notes.git --tags

# gitee
git push gitee_origin --all
git push gitee_origin --tags
git push https://gitee.com/jqiue/jqiue-notes.git --all
git push https://gitee.com/jqiue/jqiue-notes.git --tags

# coding
git push coding_origin --all
git push coding_origin --tags
git push https://e.coding.net/jqiue/wjq/jqiue-notes.git --all
git push https://e.coding.net/jqiue/wjq/jqiue-notes.git --tags

cd -
