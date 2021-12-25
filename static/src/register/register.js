let currentSel = {};
$('.sel').each((index, item) => {
    currentSel[index] = item.value;
    $(item).on('change', function() {
        currentSel[index] = this.value;
        checkDisabled(currentSel);
    })
})

function checkDisabled(currentObj) {
    $('.sel').each((index, item) => {
        $(item).find('option').each((oindex, oitem) => {
            oitem.disabled = false;
        })
        if (currentObj[index] !== -1) {
            for (let k in currentObj) {
                $(item).find('option').eq(+currentObj[k] + 1)[0].disabled = true;
            }
        }
    })
}

let errTest = {
    user: {
        size: [6, 16],
        errSize: '用户名长度必须是6-16位！',
        errTip: '用户名必须是中文！',
        errElement: $('#errUser'),
        reg: /^[\u4e00-\u9fa5]+$/

    },
    pwd: {
        size: [8, 16],
        errSize: '密码长度必须是8-16位！',
        errTip: '密码必须是字母、数字、下划线、至少一位大写字母！',
        errElement: $('#errPwd'),
        reg: /^[^\W](?!=[\u4e00-\u9fa5])(?=.*[A-Za-z\d])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*_)[A-Za-z\d_]{6,16}$/
    }
}

$('#submit').click(function() {
    if (testIpt(errTest)) {
        // let params = encodeURIComponent('a=哈哈哈&%?')
        $.ajax({
            url: 'http://localhost:8080/register',
            method: 'post',
            data: {
                username: $('#user').val(),
                password: $('#pwd').val()
            },
            success: function(res) {
                if (res.code) {
                    alert('注册成功')
                    window.location.href = '/';
                } else {
                    $('#errPwd').text(res.errorMessage);
                }
                console.log(res)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
})