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

$('#showPassword').click(function() {
    if ($('#pwd')[0].type === 'password') {
        $('#pwd')[0].type = 'text';
        $('#showPassword')[0].innerHTML = '👓';
    } else {
        $('#pwd')[0].type = 'password';
        $('#showPassword')[0].innerHTML = '🕶';
    }
})

function login() {
    if (testIpt(errTest)) {
        $.ajax({
            url: 'http://localhost:8080/login',
            method: 'post',
            data: {
                username: $('#user').val(),
                password: $('#pwd').val()
            },
            success: function(res) {
                console.log(res)
                if (res.code) {
                    alert('登录成功！')
                    window.location.href = '/list.html'
                } else {
                    $('#errPwd').text(res.errorMessage);
                }
            },
            error: function(err) {
                console.log(err)
            }

        })
    }
}
$('#login').click(login)

document.onkeyup = function(event) {
    let e = event || window.event;
    if (e.keyCode === 13) {
        login()
    }
}

$('#register').click(function() {
    window.open('register.html')
})