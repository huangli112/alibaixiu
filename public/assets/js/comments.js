//向服务器发送请求 获取数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response)
        var html = template('commentsTpl', response)
        //将模板渲染到页面
        console.log(html)
        $('#commentsBox').html(html)
    }
})

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response)
            var html = template('commentsTpl', response)
            //将模板渲染到页面
            console.log(html)
            $('#commentsBox').html(html)
            var pageHtml = template('pageTpl', response)
            $('#pageBox').html(pageHtml)
        }
    })
}

//更改日期格式
function dateFormat(date) {
    var date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//评论审核功能
//通过事件委托为按钮绑定单击事件
$('#commentsBox').on('click', '.status', function () {
    //获取当前的审核状态
    var status = $(this).attr('data-status')
    alert(status)
    //获取当前点击被点击评论的id值
    var id = $(this).attr('data-id')
    //向服务器发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == '0' ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})

//评论删除功能

//通过事件委托给删除按钮绑定单击事件
$('#commentsBox').on('click', '.delete', function () {
    if (confirm("确认要删除评论吗")) {
        //获取管理员要删除的id
        var id = $(this).attr('data-id')
        //向服务器发送请求 删除评论
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload()

            }
        })
    }
})



