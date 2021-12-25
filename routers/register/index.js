const Router = require('koa-routes');
const route = new Router()
const { user } = require('../../mysql/index');
let { register, testUser } = user;
const { handelResponse } = require('../../common/index');
route.post('/', async(ctx, next) => {
    let { username, password } = ctx.request.body;
    let result = await testUser(username);
    if (!result) {
        let registerMessage = await register(username, password);
        if (registerMessage) {
            ctx.body = handelResponse();

        } else {
            ctx.body = handelResponse({
                code: 0,
                errorMessage: '注册失败，请重试！'
            })
        }
    } else {
        ctx.body = handelResponse({
            code: 0,
            errorMessage: '用户名已注册'
        })
    }
    next()
})

module.exports = route.routes();