const Router = require('koa-routes');
const route = new Router()
const { user, list } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const id = ctx.cookies.get('id')


    if (id) {
        const { getList } = list;
        const { getUser } = user;
        //拿数据库存的数据给list 渲染
        let listData = await getList(id);
        //拿用户名信息所在的对象
        let userData = await getUser(id);
        //具体到用户名信息
        let username = userData[0].username;
        // console.log(userData[0].username, 'aaaaaaa')
        if (listData && userData) {
            ctx.body = handelResponse({
                data: {
                    user: username,
                    list: listData
                }
            });
        } else {
            ctx.body = handelResponse({
                code: 502,
                data: {
                    user: username,
                },
                errorMessage: '网络错误'
            })
        }
    } else {
        ctx.body = handelResponse({
            code: 0,
            errorMessage: '用户名或密码错误!'
        })
    }
    next();
})

module.exports = route.routes();