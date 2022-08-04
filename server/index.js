const schedule = require('node-schedule')
const envJson = require('./.env.json')
const { getJueJinArticleList, getTagList } = require('./juejin')
const { initDB, insertArticles, insertTags } = require('./utils/mongdb')

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

// schedule.scheduleJob(cron, async () => {
//     console.log('请求掘金数据', cron);
//     const result = await getJueJinArticleList()
//     console.log(111, result)
// });

const main = async () => {
    await initDB()

    // 保存文章列表
    const articleList = await getJueJinArticleList()
    await insertArticles(articleList)

    // 保存标签列表
    const tagList = getTagList(articleList)
    await insertTags(tagList)
}
main()
