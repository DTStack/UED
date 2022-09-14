const Router = require('koa-router')
const { updateArticleList, getArticleList, getTagList } = require('../utils/mongodb')

const router = new Router()

module.exports = app => {
    // 主动更新文章数据
    router.get('/api/updateArticleList', async (ctx) => {
        try {
            await updateArticleList()
            ctx.body = ctx.body = {
                code: 200,
                message: '成功',
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error
            }
        }
    })

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
