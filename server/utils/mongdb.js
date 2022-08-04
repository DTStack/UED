const { MongoClient } = require('mongodb')
const { getDateStr } = require('./index')
const envJson = require('../.env.json')

const env = process.env.NODE_ENV || 'development'
const { host, port, dbName, username, password } = envJson[env]
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`

const client = new MongoClient(url)

// 初始化数据库链接
const initDB = async () => {
    await client.connect()
    console.log('Connected successfully to mongodb')
}

// 新增查询到的文章列表
const insertArticles = async (articleList) => {
    const db = client.db(dbName)
    const collection = db.collection('article')

    const updateResult = await collection.updateMany({ isDelete: 0 }, { $set: { isDelete: 1, updateTime: getDateStr() } })
    console.log('updateArticles documents =>', updateResult)

    const insertResult = await collection.insertMany(articleList)
    console.log('insertArticles documents =>', insertResult)
}

// 新增查询到的标签列表
const insertTags = async (tagList) => {
    const db = client.db(dbName)
    const collection = db.collection('tag')

    const updateResult = await collection.updateMany({ isDelete: 0 }, { $set: { isDelete: 1, updateTime: getDateStr() } })
    console.log('updateTags documents =>', updateResult)

    const insertResult = await collection.insertMany(tagList)
    console.log('insertTags documents =>', insertResult)
}

// 查询文章列表
const getArticleList = async (page, pageSize) => {
    const db = client.db(dbName)
    const collection = db.collection('article')

    const allArticleList = await collection.find({ isDelete: 0 }).toArray()
    const start = (page - 1) * pageSize
    const articleList = allArticleList.slice(start, start + pageSize)
    const data = {
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
const getTagList = async (page, pageSize) => {
    const db = client.db(dbName)
    const collection = db.collection('tag')

    const data = await collection.find({ isDelete: 0 }).toArray()
    return {
        code: 200,
        data,
        message: '成功',
    }
}

module.exports = {
    initDB,
    insertArticles,
    insertTags,
    getArticleList,
    getTagList,
}
