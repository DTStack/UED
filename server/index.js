const schedule = require('node-schedule')
const envJson = require('../.env.json')
const { getJueJinArticleList } = require('./juejin')

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

// schedule.scheduleJob(cron, async () => {
//     console.log('每天八点请求掘金数据', cron);
//     const result = await getJueJinArticleList()
//     console.log(111, result)
// });

const func = async () => {
    const result = await getJueJinArticleList()
    console.log(111, result)
}
func()
