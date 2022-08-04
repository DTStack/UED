const Router = require('koa-router')
const { getArticleList, getTagList } = require('../utils/mongdb')

const router = new Router()

module.exports = app => {
    router.get('/api/getArticleList', async (ctx) => {
        const { page = 1, pageSize = 10 } = ctx.query
        ctx.body = await getArticleList(+page, +pageSize)
    })

    router.get('/api/getTagList', async (ctx) => {
        ctx.body = await getTagList()
    })

    app.use(router.routes(), router.allowedMethods())
}
