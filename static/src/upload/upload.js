$.ajax({
    url: 'http://localhost:8080/getuser',
    method: 'post',
    success: function(res) {
        console.log(res)
        if (res.code) {
            $('.user').text(res.data[0].username);
        } else if (+res.code === 0) {
            window.location.href = '/'
        }
    },
    error: function(err) {
        console.log(err)
    }
})

//获取修改的id
function getId() {
    let search = location.search.slice(1);
    let parmas = {};
    if (search.length) {
        let searchList = search.split('&');
        for (let i = 0; i < searchList.length; i++) {
            let item = searchList[i].split('=');
            parmas[item[0]] = item[1];
        }
    }
    return parmas

}
console.log()
if (!(getId().up)) {
    //修改数据的请求及渲染
    (function() {
        $.ajax({
            url: 'http://localhost:8080/getmodlist',
            method: 'post',
            data: getId(),
            success: res => {
                console.log(res)
                let { title, author, content, files } = res.data[0];
                $('#title').val(title);
                $('#author').val(author);
                $('#content').val(content);
                let filesData = JSON.parse(files);
                $('#imgs')[0].src = filesData.url;
                $('#fileLabel').css({
                    'font-size': 0
                })

            },
            error: err => {
                console.log(err)
            }
        })
    })()
}




//tap切换
$('.upload').on('click', function() {
    window.location.href = '/upload.html'
})
$('.list').on('click', function() {
        window.location.href = '/list.html'
    })
    //退出
$('.exit').on('click', () => {
    $.ajax({
        url: 'http://localhost:8080/exit',
        method: 'get',
        success: res => {
            console.log(res)
            if (res.code) {
                window.location.href = '/';
            }
        },
        error: err => {
            console.log(err)
        }
    })
})



//上传提交
$('#files').on('change', function() {
    //通过window.URL.createObjectURL()来获取图片的路径；
    let imgPath = window.URL.createObjectURL($('#files')[0].files[0]);
    $('#fileLabel').css({
        'font-size': 0
    })
    console.log(imgPath)
    $('#imgs')[0].src = imgPath;
})


function uploadFn(titleVal, authorVal, contentVal, filesVal, url, op, mid) {
    //new一个form实例；    
    const form = new FormData();
    form.append('title', titleVal);
    form.append('author', authorVal);
    form.append('content', contentVal);
    form.append('filesImg', filesVal);
    form.append('op', op);
    mid && form.append('mid', mid);
    $.ajax({
        url: url,
        method: 'post',
        data: form,
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头

        success: function(res) {
            console.log(res)
            switch (+res.code) {
                case 1:
                    (alert('上传成功！'), window.location.href = '/list.html')
                    break;
                case 2:
                    (alert('修改成功！'), window.location.href = '/list.html')
                    break;
                case 3:
                    (alert(res.errorMessage))
                    break;
                case 0:
                    (alert(res.errorMessage));
                    break;
                case 300:
                    (alert(res.errorMessage))
                    break;
                case 304:
                    (alert(res.errorMessage), window.location.href = '/')
            }
        },
        error: function(err) {
            throw new Error(err)
                // console.log(err)
        }
    })
}
let flag = false;
$('#files').on('change', function() {
        flag = true;
    })
    // console.log(getId())
$('#submit').on('click', function() {
    let { op = 'upload', id } = getId();
    const titleVal = $('#title').val();
    const authorVal = $('#author').val();
    const contentVal = $('#content').val();
    const filesVal = $('#files')[0].files[0];
    let url = 'http://localhost:8080/upload';
    if (op === 'edit') {
        url = 'http://localhost:8080/mod'
    }
    uploadFn(titleVal, authorVal, contentVal, (flag ? filesVal : null), url, op, id)

})