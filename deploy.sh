set -e

npm run build

cd docs/.vuepress/dist

git init
git add .
git commit -m "deploy"
git push https://e.coding.net/jqiue/wjq/deploy-site.git master -f

cd -
