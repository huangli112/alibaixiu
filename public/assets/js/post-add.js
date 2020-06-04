//向服务器端发送请求 获取文章数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response)
        //将模板和数据进行拼接
        var html = template('categoryTpl', {data: response})
        //将拼接后的结果渲染到页面
        $('#category').html(html)

    }
})
//实现文章封面的上传
//当选择文件内容时 触发事件
$('#feature').on('change', function () {
    //获取文件路径
    var file = this.files[0]
    //实现二进制文件上传
    var formData = new FormData()
    //将选择的文件追加到formData中
    formData.append('cover', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉服务器不要处理data属性对应的参数
        processData: false,
        //告诉服务器不要设置参数类型
        contentType: false,
        success: function (response) {
            console.log(response)
            //将上传的地址添加到隐藏域的value中
            $('#thumbnail').val(response[0].cover)

        }
    })
})

//为添加表单添加提交事件
$('#addForm').on('submit', function () {
    //获取管理员输入的内容
    var formData = $(this).serialize()
    //向服务器发送请求 将数据存储到服务器
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })
    //阻止表单默认提交
    return false;
})


//获取地址栏中的id参数
var id = getUrlParams('id')
//对id进行判断 是修改还是添加
if (id != -1) {//修改操作
    // 向服务器发送请求 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            //向服务器发送请求 获取文章分类列表
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    //为response对象添加一个属性  为文章详细信息添加了文章分类列表信息 方便在模板中拿到文章分类列表信息
                    response.categories = categories;
                    console.log(response)
                    var html = template('modifyTpl', response)
                    console.log(html)
                    $('#parentBox').html(html)
                }
            })

        }
    })

}


// 由于查询url的使用频率过高 就封装一个查询url的函数
function getUrlParams(name) {//name表示用户想要从地址栏获取的参数
    //获取查询参数  多个参数用&分隔
    var paramsArry = location.search.slice(1).split('&')
    console.log(paramsArry)
    //利用循环将数组中的键值对拆分
    for (var i = 0; i < paramsArry.length; i++) {
        //将每个键值对拆分成一个新数组 存放在tem中 tem[0]表示键（参数名），tem[1]表示键值（参数值），
        var tem = paramsArry[i].split('=');
        //判断用户输入的参数名是否与想要从地址栏获取的参数名相同
        if (tem[0] == name) {
            //返回参数值
            return tem[1];
        }
        //用户输入的参数名在地址栏中不存在  返回一个错误参数
        return -1;

    }
}

//为修改表单添加提交事件
$('#parentBox').on('submit', '#modifyForm', function () {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize()
    //获取用户当前修改表单的id值
    var id = $(this).attr('data-id')
    //向服务器发送请求
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })
    //阻止表单默认提交的行为
    return false;

})
//删除文章

//通过事件委托为删除按钮添加点击事件
$('#postsBox').on('click', '.delete', function () {
    //创建一个confrim框 确认是否删除
    if (confirm('确认删除文章吗？')) {
        //获取用户要删除的文章id
        var id = $(this).attr('data-id')
       alert(id)
        //向服务器发送请求 删除文章信息
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})
