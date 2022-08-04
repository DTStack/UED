const axios = require('axios')
const { getDate } = require('../utils')

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
            result = result.concat(data)
            has_more && await loop(res.data.cursor)
        }
        await loop('0')

        return result.map(item => {
            const { date: create_date, time: create_time } = getDate(item?.article_info?.ctime)
            return {
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
        console.error(`juejin error: ${error}`)
    }
}

module.exports = {
    getJueJinArticleList,
}
