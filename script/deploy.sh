git add server/.env.json
git checkout .
git pull

pnpm i
pnpm build

# node server
pm2 restart server/pm2/config.json --env production

# static page
pm2 delete 'UED landing'
pm2 start npm --name 'UED landing' -- start