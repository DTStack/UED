const schedule = require('node-schedule')
const envJson = require('./.env.json')
const { getJueJinArticleList } = require('./juejin')

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

// schedule.scheduleJob(cron, async () => {
//     console.log('请求掘金数据', cron);
//     const result = await getJueJinArticleList()
//     console.log(111, result)
// });

// 获取标签列表
const getTagList = (result) => {
    let list = result.map(item => item.tags).flat(Infinity)
    list = list.map(item => {
        const { tag_id, tag_name } = item
        return {
            tag_id,
            tag_name,
            count: list.filter(tag => tag.tag_id === tag_id).length
        }
    })
    const obj = {}
    const tagList = list.reduce((prev, item) => {
        if (!obj[item.tag_id]) {
            obj[item.tag_id] = true
            prev.push(item)
        }
        return prev
    }, [])
    return tagList
}

const func = async () => {
    const result = await getJueJinArticleList()
    console.log(111, result)
    const tagList = getTagList(result)
    console.log(222, tagList)
}
func()
