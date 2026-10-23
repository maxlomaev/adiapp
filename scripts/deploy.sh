#!/bin/sh
# Собирает сайт и публикует dist/ в ветку gh-pages (GitHub Pages).
set -e
npm run build
touch dist/.nojekyll
cd dist
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
