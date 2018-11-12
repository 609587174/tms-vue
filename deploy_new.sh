#!/bin/bash
echo "测试"
USER=root
HOST=39.104.57.105
DIR=/www/test/tms_front
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz dist/* ${USER}@${HOST}:${DIR}/
echo "预发环境发布成功"
