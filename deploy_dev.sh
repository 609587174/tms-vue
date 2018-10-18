#!/bin/bash
echo "预发测试"
USER=app
HOST=39.104.71.159
DIR=/www/front/tms_front
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "开发环境发布成功"
