const { MongoClient } = require('mongodb')
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
const insertArticles = async (list) => {
    const db = client.db(dbName)
    const collection = db.collection('article')

    const deleteResult = await collection.deleteMany({ isDelete: 0 })
    console.log('deleteArticles documents =>', deleteResult)

    const insertResult = await collection.insertMany(list)
    console.log('insertArticles documents =>', insertResult)
}

// 新增查询到的标签列表
const insertTags = async (list) => {
    const db = client.db(dbName)
    const collection = db.collection('tag')

    const deleteResult = await collection.deleteMany({ isDelete: 0 })
    console.log('deleteTags documents =>', deleteResult)

    const insertResult = await collection.insertMany(list)
    console.log('insertTags documents =>', insertResult)
}

module.exports = {
    initDB,
    insertArticles,
    insertTags,
}
