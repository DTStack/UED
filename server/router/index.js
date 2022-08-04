const Router = require('koa-router')
const { getArticleList, getTagList } = require('../utils/mongdb')

const router = new Router()

module.exports = app => {
    router.get('/api/getArticleList', async (ctx) => {
        try {
            const { page = '1', pageSize = '10', sort_type = '2', tag_id } = ctx.query
            ctx.body = await getArticleList(+page, +pageSize, sort_type, tag_id)
        } catch (error) {
            ctx.body = {
                code: 1,
                error
            }
        }
    })

    router.get('/api/getTagList', async (ctx) => {
        try {
            ctx.body = await getTagList()
        } catch (error) {
            ctx.body = {
                code: 1,
                error
            }
        }
    })

    app.use(router.routes(), router.allowedMethods())
}
