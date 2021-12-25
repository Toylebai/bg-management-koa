const Koa = require('koa');
const app = new Koa();
const body = require('koa-body');
const static = require('koa-static');
const path = require('path');
const { port } = require('./hostConfig');
const routers = require('./routers');
app.use(static(path.join(__dirname, 'static')));

app.use(body({
    // 允许多文件上传
    multipart: true,
    formidable: {
        // 设置文件传输大小限制200mb
        maxFieldsSize: 200 * 1024 * 1024
    }
}))

app.use(async(ctx, next) => {
    if (ctx.url === 'favicon.ico') {
        ctx.body = ''
    }
    await next()
})
app.use(routers.routes());

app.listen(port, () => {
    console.log('8080服务启动成功！');
})