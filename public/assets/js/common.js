$("#logout").on('click', function () {
    var isConfirm = confirm('您是否要继续退出?')
    if (isConfirm) {
        //实现登出功能
        $.ajax({
            type: 'post',
            url: '/logout',
            data: {
                message: "退出成功"
            },
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert("退出失败")
            }
        })
    }
})
//向服务器发送请求 索要用户登录信息

$.ajax({
    type: 'get',
    url: '/users/' + userId,//userId是通过/login/status/的返回值拿到的
    success: function (response) {
        console.log(response)
        //在页面中显示用户的头像
        $('.avatar').attr('src',response.avatar)
        //在页面中显示用户的昵称
        $('.profile .name').html(response.nickName)
    }
})
