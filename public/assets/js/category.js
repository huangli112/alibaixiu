//添加表单提交事件 在事件处理函数中阻止表单默认提交行为
$('#addCategory').on('submit', function () {
    //获取表单输入的内容
    var formData = $(this).serialize();
    // 调用接口 实现密码修改功能
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    // 阻止表单默认提交的行为
    return false;
})
//分类表数据展示功能
// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response)
        //将模板字符串和html页面拼接
        var html = template('categoryListTpl', {data: response})
        //将拼接的页面显示在页面中
        $('#categoryBox').html(html)
    }
})
//分类数据点的修改功能
//通过事件委托为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    //获取修改分类的id
    var id = $(this).attr('data-id')
     //console.log(id)
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            //将模板字符串和html页面拼接
            var html = template('modifyCategoryTpl', response)
            //将拼接的页面显示在页面中
            //console.log(html)
            $('#formBox').html(html)
        }
    })
})

// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的分类id
	var id = $(this).attr('data-id');
	console.log(id)
	// 发送请求 修改分类数据
	$.ajax({
		type: 'put',
		url: '/categories/' + id,
		data: formData,
		success: function () {
			location.reload();
		}
	})
	// 阻止表单的默认提交行为
	return false;
});

//分类数据的删除功能
$('#categoryBox').on('click','.delete',function(){
    //确认用户是否需要删除用户
    var isConfirm=confirm('您确定要删除吗')
    if(!isConfirm){
        return false;
    }else{
        //获取用户id
        var id = $(this).attr('data-id')
        //调用分类接口 实现删除功能
        $.ajax({
            type:'delete',
            url:'/categories/' + id,
            success:function(){
               location.reload()
        }
        })
    }
})
