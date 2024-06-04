#!/bin/sh
cp -rf static/* dist/static/
tar cvf dist-shuhua.tar.gz dist/
scp dist-shuhua.tar.gz root@39.105.198.102:~

rm -rf dist

# tar jcvf heyui-admin-shuhua.tar.bz2  --exclude="node_modules/*" heyui-admin-shuhua
