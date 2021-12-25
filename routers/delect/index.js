const Router = require('koa-routes');
const route = new Router()
const { list } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const id = ctx.request.body.id;
    const { delList } = list;
    if (await delList(id)) {
        ctx.body = handelResponse()
    } else {
        ctx.body = handelResponse({
            code: 0,
            errorMessage: '删除失败！'
        })

    }
    next();
})

module.exports = route.routes();