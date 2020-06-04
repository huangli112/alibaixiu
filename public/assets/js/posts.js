//向服务器发送请求获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response)
        //将数据与模板字符串进行拼接
        var html = template('postsTpl', response)
        //将拼接好的模板渲染到页面
        $('#postsBox').html(html)
        //将分页数据与字符串进行拼接
        var page = template('pageTpl', response)
        //渲染到页面
        $('#page').html(page)
    }
})

//更改日期格式
function dateFormat(date) {
    var date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response)
            //将数据与模板字符串进行拼接
            var html = template('postsTpl', response)
            //将拼接好的模板渲染到页面
            $('#postsBox').html(html)
            //将分页数据与字符串进行拼接
            var page = template('pageTpl', response)
            //渲染到页面
            $('#page').html(page)
        }
    })
}

//文章筛选功能

//向服务器发送请求索要文章数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl', {data: response})
        $('#categoryBox').html(html)
    }
})

//为筛选按钮绑定提交事件
$('#filterForm').on('submit', function () {
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    console.log(formData)
    //向服务器发送请求获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            //将数据与模板字符串进行拼接
            var html = template('postsTpl', response)
            //将拼接好的模板渲染到页面
            $('#postsBox').html(html)
            //将分页数据与字符串进行拼接
            var page = template('pageTpl', response)
            //渲染到页面
            $('#page').html(page)
        }
    })
    //阻止默认提交行为
    return false;
})
