const renderList = {
    getList() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://localhost:8080/list',
                method: 'post',
                success: function(res) {
                    if (res.code) {
                        resolve(res.data);

                    } else {
                        if (+res.code === 0) {
                            window.location.href = '/'
                        } else {
                            alert(errorMessage)
                        }
                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })
        })
    },

    renderData: function(data) {
        // console.log(data.user)
        // $('.user').text(data.user)
        // let list_data = data.list;
        if (data) {
            let html = '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                console.log(JSON.parse(item.files).url)
                html += `
                    <ul>
                        <li>${i + 1}</li>
                        <li>${item.title}</li>
                        <li>${item.author}</li>
                        <li>${item.content}</li>
                        <li>
                        <img src="${JSON.parse(item.files).url }"/>
                       
                        </li>
                        <li>${item.create_time}</li>
                        <li>${item.mod_time}</li>
                        <li>
                            <button data-id=${item.id} class="revamp">修改</button>
                            <button data-id=${item.id} class="del">删除</button>
                        </li>
                    </ul>
                    `
            }

            $('.list-data').html(html);
        } else {
            $('.list-data').html('');

        }

    },
    del() {
        const _this = this;
        $('.list-data>ul>li>.del').on('click', function() {
            let id = this.dataset.id;
            console.log(id)
            $.ajax({
                url: 'http://localhost:8080/del',
                method: 'post',
                data: {
                    id
                },
                success: res => {
                    if (res.code) {
                        _this.renderFn()
                    }
                },
                error: err => {
                    console.log(err)
                }
            })
        })
    },
    mod() {
        const _this = this;
        $('.list-data>ul>li>.revamp').on('click', function() {
            let id = this.dataset.id;
            window.location.href = '/upload.html?op=edit&id=' + id;
        })
    },


    async renderFn() {
        let result = await this.getList();
        $('.user').text(result.user);
        this.renderData(result.list);
        this.del();
        this.mod();
    }

}
renderList.renderFn()
    //退出

$('.upload').on('click', function() {
    window.location.href = '/upload.html?up=0'
})
$('.list').on('click', function() {
    window.location.href = '/list.html'
})
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