const Router = require('koa-routes');
const route = new Router()
const { user } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');
const { login } = user;
route.post('/', async(ctx, next) => {
    const { username, password } = ctx.request.body;
    const result = await login(username, password);
    // console.log(result)
    if (result) {
        ctx.cookies.set('id', result[0].id, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 6000000
        })
        ctx.body = handelResponse();
    } else {
        ctx.body = handelResponse({
            code: 0,
            errorMessage: '用户名或密码错误!'
        })
    }
    next()
})

module.exports = route.routes();