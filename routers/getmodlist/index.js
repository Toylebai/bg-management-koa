const Router = require('koa-routes');
const route = new Router()
const { user, list } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const { id } = ctx.request.body;
    console.log(id)
    const { getoneList } = list;
    const modList = await getoneList(id)
    if (modList) {
        ctx.body = handelResponse({
            data: modList
        })
    } else {
        ctx.body = handelResponse({
            code: 0
        })
    }
    next();
})

module.exports = route.routes();