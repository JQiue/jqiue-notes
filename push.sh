set -e

# github
git push github_origin --all
git push github_origin --tags

# gitlab
git push gitlab_origin --all
git push gitlab_origin --tags

# gitee
git push gitee_origin --all
git push gitee_origin --tags

# coding
git push coding_origin --all
git push coding_origin --tags

cd -
