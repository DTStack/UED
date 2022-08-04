// 引入模块
const Koa = require('koa')
const schedule = require('node-schedule')
const router = require('./router')
const envJson = require('./.env.json')
const { getJueJinArticleList, getTagList } = require('./juejin')
const { initDB, insertArticles, insertTags } = require('./utils/mongdb')

// 实例化
const app = new Koa()

// 启动路由
router(app)

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

const main = async () => {
    await initDB()

    // 保存文章列表
    const articleList = await getJueJinArticleList()
    await insertArticles(articleList)

    // 保存标签列表
    const tagList = getTagList(articleList)
    await insertTags(tagList)
}

// main()
app.listen(envJson.appPort, () => {
    console.log(`app runs on port ${ envJson.appPort }`)
    schedule.scheduleJob(cron, main)
})
