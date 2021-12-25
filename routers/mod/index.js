const Router = require('koa-routes');
const route = new Router();
const fs = require('fs');
const path = require('path');
const { list } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const id = ctx.cookies.get('id');
    if (id) {
        const { modList } = list;
        //获取到前端传过来的文件流；
        const { filesImg } = ctx.request.files;
        let data = null;
        //获取到前端传过来的标题、作者、内容
        const { title, author, content, mid } = ctx.request.body;
        console.log(ctx.request.body + 'body')
        if (filesImg && filesImg.size > 0) {
            const { name, size, type } = filesImg;
            // console.log(filesImg.path)
            let pre = path.parse(name);
            // console.log(pre); //打印结果{ root: '',dir: '',base: '1ece6d533376b93f806c0d12a15b0040.jpg',ext: '.jpg',name: '1ece6d533376b93f806c0d12a15b0040' }
            //生成一个新的文件名
            let newfilename = pre.name + Date.now() + pre.ext;
            let readFile = fs.createReadStream(filesImg.path);
            let writeFile = fs.createWriteStream('./static/src/images/' + newfilename)
            readFile.pipe(writeFile);
            //生成一个新的图片路径，直接网址就能显示图片
            const imgUrl = ctx.origin + '/src/images/' + newfilename;
            data = {
                author,
                title,
                content,
                files: {
                    newfilename,
                    size,
                    type,
                    url: imgUrl
                },
                mid,
            }
            if (await modList(data)) {
                ctx.body = handelResponse({
                    code: 2
                })
            } else {
                ctx.body = handelResponse({
                    code: 3,
                    errorMessage: '修改失败！请重试！'
                })
            }
        } else {
            data = {
                author,
                title,
                content,
                mid,
            }
            if (await modList(data)) {
                ctx.body = handelResponse({
                    code: 2
                })
            } else {
                ctx.body = handelResponse({
                    code: 3,
                    errorMessage: '上传失败！请重试！'
                })
            }
        }
    } else {
        ctx.body = handelResponse({
            code: 3,
            errorMessage: '修改失败'
        })
    }
    next();
})

module.exports = route.routes();