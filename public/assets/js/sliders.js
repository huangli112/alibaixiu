//为上传图片控件添加change事件
$('#file').on('change', function () {
    //用户选择文件
    var file = this.files[0]
    //创建formData对象实现二进制文件上传
    var formData = new FormData()
    //将用户选择的图片文件添加到formData中
    formData.append('image', file)
    //向服务器发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#image').val(response[0].image)
        }
    })
})

//为轮播图表单添加表单提交事件
$('#slidesForm').on('submit', function () {
    //获取用户输入的内容
    var formData = $(this).serialize()
    console.log(formData)
    //向服务器发送请求 添加轮播数据 实现图片的添加功能
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    //阻止默认表单提交行为
    return false;

})

//轮播图数据展示功能
//向服务器发送请求 获取轮播图列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response)
        //将数据与模板字符串进行拼接
        var html = template('slidesTpl', {data: response})
        //将拼接好的模板字符串显示在页面中
        $('#slidesBox').html(html)
    }
})
//轮播图片删除功能
//通过事件委托 为删除按钮绑定点击事件
$('#slidesBox').on('click', '.delete', function () {
    //弹出提示框 确认是否要删除图片
    if (confirm('确认要删除吗？')) {
        //获取删除轮播图片的id
        var id = $(this).attr('data-id');
        //向服务器发送请求 删除图片并刷新
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})
