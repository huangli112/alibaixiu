//为表单绑定提交事件，载事件处理函数中阻止默认表单提交
$("#userForm").on('submit', function () {
    //获取表单输入的内容，并转换为参数字符串
    var formData = $(this).serialize()
    //想服务器发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            //刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    return false;
})
//为表单控件绑定on change 事件
$("#modifyBox ").on('change', '#avatar', function () {
    //利用FormData对象，实现二进制文件的上传并 获取用户选择的文件
    var formData = new FormData()
    //console.log(this.files[0])
    //向FormData中追加内容  第一个参数是自定义的属性名称
    formData.append('avatar', this.files[0])
    //向服务器端发送请求  实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax方法不要解析请求参数 将参数更改为参数字符串
        processData: false,
        //告诉ajax方法不要解析请求参数类型
        contentType: false,
        success: function (response) {
            //console.log(response)
            //实现头像的预览功能 给头像添加图片路径
            $('#preview').attr('src', response[0].avatar)
            //将图片路径显示给后台数据库
            $('#hiddenAvatar').val(response[0].avatar)
        },
    })
});
//向服务器端发送请求，索要用户数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        console.log(response)
        //将模板引擎与html页面进行拼接
        var html = template('userTpl', {data: response})
        //将拼接的页面显示在页面中
        $('#userBox').html(html)
    }
})
//通过事件委托的方式为修改按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    console.log(this)
    //获取用户的id
    var id = $(this).attr('data-id')
    //通过用户的id获取用户的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response)
            //将模板字符串和html页面拼接
            var html = template('modifyTpl', response)
            //将拼接的页面显示在页面中
            $('#modifyBox').html(html)
        }
    })
})
//为修改表单添加提交事件
$("#modifyBox").on('submit', '#modifyForm', function () {
    //获取表单输入的内容，并转换为参数字符串
    var formData = $(this).serialize()
    //获取表单要修改的id值
    var id = $(this).attr('data-id')
    //想服务器发送添加用户的请求
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function () {
            //刷新页面
            location.reload()
        }
    })
    return false;
})
//通过事件委托的方式为删除按钮添加点击事件
$('#userBox').on('click', '.delete', function () {
    //确认是否删除用户
    var isConfirm = confirm('您确定要删除用户吗');
    if (isConfirm) {
        //获取用户的id
        var id = $(this).attr('data-id')
        //通过用户的id获取用户的信息
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                //刷新页面
                location.reload()
            }
        })
    }
})


//批量删除
//获取全选按钮
var selectAll = $('#selectAll')
//获取批量删除按钮
var deleteMany=$('#deleteMany')
//给全选按钮绑定onchange 事件
selectAll.on('change', function () {
    //获取当前全选按钮的选中状态
    var status = $(this).prop('checked')
    if(status){
        //显示批量删除按钮
        deleteMany.show();
    }else{
        //隐藏批量删除按钮
        deleteMany.hide();
    }

    //获取到所有用户的选中状态并将用户的状态和全选框的状态保持一致
    //通过事件委托查找到所有的复选框 设置所有的复选框的checked属性为status的状态
    $('#userBox').find('input').prop('checked', status)
})
//通过事件委托给所有的复选框绑定onchange事件
    $('#userBox').on('change', '.userStatus', function () {
    //获取所有的复选框
    var inputs = $('#userBox').find('input')
    //判断用户选中的复选框的数量是否等于所有用户的复选框的数量
    if (inputs.length === inputs.filter(':checked').length) {
       //将全选框的状态设置为选中
        selectAll.prop('checked',true)
    }else{
        selectAll.prop('checked',false)
    }
    //判断选中复选框的数量
        if(inputs.filter(':checked').length>0){
            //显示批量删除按钮
            deleteMany.show();
        }else{
            //隐藏批量删除按钮
            deleteMany.hide();
        }
})

