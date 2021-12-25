const Router = require('koa-routes');
const route = new Router()
const { user } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const id = ctx.cookies.get('id');
    const { getUser } = user;
    let data = await getUser(id);
    if (data) {
        ctx.body = handelResponse({
            data,
        })
    } else {
        ctx.body = handelResponse({
            code: 0
        })

    }
    next();
})

module.exports = route.routes();