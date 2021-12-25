const Router = require('koa-routes');
const route = new Router()
const { handelResponse } = require('../../common/index');

route.get('/', async(ctx, next) => {
    await ctx.cookies.set('id', '', {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0
    })
    ctx.body = handelResponse();

    next();
})

module.exports = route.routes();