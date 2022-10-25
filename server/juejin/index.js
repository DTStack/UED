const axios = require('axios')
const { getDate, getDateStr } = require('../utils')

// 从掘金查询 UED 的文章列表
const getJueJinArticleList = async () => {
    try {
        let result = []
        const loop = async (cursor) => {
            const params = {
                user_id: "2137106333053912",
                sort_type: 2,
                cursor
            }
            const res = await axios.post('https://api.juejin.cn/content_api/v1/article/query_list', params)
            const { data, has_more } = res.data
            data !== null && (result = result.concat(data))
            has_more && await loop(res.data.cursor)
        }
        console.log('掘金查询开始')
        await loop('0')
        console.log('掘金查询完成')

        return result.map(item => {
            const { date: create_date, time: create_time } = getDate(item?.article_info?.ctime)
            return {
                isDelete: 0,
                createTime: getDateStr(),
                updateTime: getDateStr(),
                article_id: item?.article_id,
                title: item?.article_info?.title,
                brief_content: item?.article_info?.brief_content,
                view_count: item?.article_info?.view_count,
                digg_count: item?.article_info?.digg_count,
                comment_count: item?.article_info?.comment_count,
                create_date,
                create_time,
                user_name: item?.author_user_info?.user_name,
                tags: item?.tags?.map(tag => {
                    const { tag_id, tag_name } = tag
                    return { tag_id, tag_name }
                }),
                url: `https://juejin.cn/post/${item?.article_id}`,
            }
        })
    } catch (error) {
        console.log(`掘金查询失败: ${error}`)
    }
}

// 整理标签列表
const getTagListByArticleList = (articleList) => {
    let list = articleList.map(item => item.tags).flat(Infinity)
    list = list.map(item => {
        const { tag_id, tag_name } = item
        return {
            tag_id,
            tag_name,
            count: list.filter(tag => tag.tag_id === tag_id).length,
            isDelete: 0,
            createTime: getDateStr(),
            updateTime: getDateStr(),
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

module.exports = {
    getJueJinArticleList,
    getTagListByArticleList,
}
