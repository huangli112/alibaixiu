//网站图标上传
//为图标绑定onchange事件实现文件上传
$('#logo').on('change', function () {
    //获取用户选择的图片
    var file = this.files[0];
    //通过FormData对象实现二进制图片上传
    var formData = new FormData()
    //将图片追加到formData对象中
    formData.append('logo', file)
    //向服务器发送请求 实现图片文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            //将图片地址添加到隐藏域中
            $('#hiddenLogo').val(response[0].logo)
            //将图片显示在页面中
            $('#preview').attr('src',response[0].logo)
        }
    })
})
//实现数据提交功能
//为表单添加提交事件
$('#settingForm').on('submit',function(){
    //获取用户输入的信息
    var formData=$(this).serialize()
    //向服务器发送请求 实现数据添加功能
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
          location.reload()
        }
    })
    //阻止表单默认提交的行为
    return false

})

//显示网站设置数据
//向服务器发送请求 获取数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response)
        //判断用户是否对网站数据进行设置
        if(response){
            //将图片隐藏域添加到页面中
            $('#hiddenLogo').val(response.logo)
            //将图片显示在页面中
            $('#preview').attr('src',response.logo)
            //将站点名称的值显示在页面中
            $('input[name=title]').val(response.title)
            //将开启评论功能的值显示在页面中
            $('input[name=comment]').val(response.comment)
            //将评论必须经人工批准的值显示在野蛮中
            $('input[name=review]').val(response.review)
        }
    }
})
