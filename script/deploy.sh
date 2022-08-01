pm2 restart src/server/pm2/config.json --env production

pm2 delete 'UED landing'
pm2 start npm --name 'UED landing' -- start
