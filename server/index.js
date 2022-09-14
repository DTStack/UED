// 引入模块
const Koa = require('koa')
const cors = require('koa2-cors')
const schedule = require('node-schedule')
const router = require('./router')
const envJson = require('./.env.json')
const { initDB, updateArticleList } = require('./utils/mongodb')

// 实例化
const app = new Koa()
app.use(cors())

// 启动路由
router(app)

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

// updateArticleList()
app.listen(envJson.appPort, async () => {
    console.log(`app runs on port ${ envJson.appPort }.`)
    await initDB()
    schedule.scheduleJob(cron, updateArticleList)
})
