const mongoose = require('mongoose')
const { Schema } = mongoose
const { getDateStr } = require('./index')
const { getJueJinArticleList, getTagListByArticleList } = require('../juejin')
const envJson = require('../.env.json')

const env = process.env.NODE_ENV || 'development'
const { host, port, dbName, username, password } = envJson[env]
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`

const articleSchema = new Schema({
    isDelete: Number,
    createTime: String,
    updateTime: String,
    article_id: String,
    view_count: Number,
    digg_count: Number,
    comment_count: Number,
    title: String,
    brief_content: String,
    create_date: String,
    create_time: String,
    user_name: String,
    tags: [
        {
            tag_id: String,
            tag_name: String,
        }
    ],
    url: String,
});
const tagSchema = new Schema({
    isDelete: Number,
    count: Number,
    createTime: String,
    updateTime: String,
    tag_id: String,
    tag_name: String,
});

const Article = mongoose.model('Article', articleSchema, 'article')
const Tag = mongoose.model('Tag', tagSchema, 'tag')

// 初始化数据库链接
const initDB = async () => {
    try {
        await mongoose.connect(url)
        console.log('Connected successfully to mongodb by mongoose!')
    } catch (error) {
        console.log('Connect error: ', error)
    }
}

// 新增查询到的文章列表
const insertArticles = async (articleList) => {
    try {
        await Article.updateMany({ isDelete: 0 }, { $set: { isDelete: 1, updateTime: getDateStr() } })
        await Article.insertMany(articleList)
        await Article.deleteMany({ isDelete: 1 })
    } catch (error) {
        console.log('insertArticles error: ', error)
        throw error
    }
}

// 新增查询到的标签列表
const insertTags = async (tagList) => {
    try {
        await Tag.updateMany({ isDelete: 0 }, { $set: { isDelete: 1, updateTime: getDateStr() } })
        await Tag.insertMany(tagList)
        await Tag.deleteMany({ isDelete: 1 })
    } catch (error) {
        console.log('insertTags error: ', error)
        throw error
    }
}

// 主动更新文章数据
const updateArticleList = async () => {
    try {
        // 保存文章列表
        const articleList = await getJueJinArticleList()
        await insertArticles(articleList)

        // 保存标签列表
        const tagList = getTagListByArticleList(articleList)
        await insertTags(tagList)
    } catch (error) {
        console.log('updateArticleList error: ', updateArticleList)
        throw error
    }
}

// 查询文章列表
const getArticleList = async (page, pageSize, sort_type, tag_id) => {
    let allArticleList = await Article.find({ isDelete: 0 })
    const totalCount = allArticleList.length

    // 带标签查询
    if (tag_id) {
        allArticleList = allArticleList.filter(item => {
            return item.tags.map(tag => tag.tag_id).includes(tag_id)
        })
    }

    const start = (page - 1) * pageSize
    let articleList = allArticleList.slice(start, start + pageSize)

    // 1 按热门排序，2 按时间排序
    if (sort_type === '1') {
        articleList = articleList.sort((a, b) => b?.view_count - a?.view_count)
    }

    const data = {
        totalCount,
        total: allArticleList.length,
        page,
        pageSize,
        articleList,
    }
    return {
        code: 200,
        data,
        message: '成功',
    }
}

// 查询标签列表
const getTagList = async () => {
    const data = await Tag.find({ isDelete: 0 })

    return {
        code: 200,
        data,
        message: '成功',
    }
}

module.exports = {
    initDB,
    updateArticleList,
    getArticleList,
    getTagList,
}
