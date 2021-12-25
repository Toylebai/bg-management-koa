const Router = require('koa-routes');
const route = new Router();
const fs = require('fs');
const path = require('path');
const { list } = require('../../mysql/index');
const { handelResponse } = require('../../common/index');

route.post('/', async(ctx, next) => {
    const id = ctx.cookies.get('id');
    if (id) {
        const { upload } = list;
        //获取到前端传过来的文件流；
        const { filesImg } = ctx.request.files;
        //获取到前端传过来的标题、作者、内容
        const { title, author, content } = ctx.request.body;
        if (title && author && content && filesImg) {
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
            const data = {
                author,
                title,
                content,
                files: {
                    newfilename,
                    size,
                    type,
                    url: imgUrl
                },
                uid: id
            }
            if (await upload(data)) {
                ctx.body = handelResponse()
            } else {
                ctx.body = handelResponse({
                    code: 0,
                    errorMessage: '上传失败！请重试！'
                })
            }


        } else {
            ctx.body = handelResponse({
                code: 300,
                errorMessage: '上传失败，有内容未填写！'
            })
        }


    } else {
        ctx.body = handelResponse({
            code: 304,
        })
    }

    next();
})

module.exports = route.routes();