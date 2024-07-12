#!/bin/bash

npm config set registry https://registry.npmmirror.com/

pnpm i
pnpm build

# node server
#pm2 start server/pm2/config.json --env production
pm2 reload server/pm2/config.json --env production

# static page
pm2 delete 'ued-landing'
pm2 start npm --name 'ued-landing' -- start
