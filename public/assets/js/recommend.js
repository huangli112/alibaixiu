//向服务器发送请求 获取热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend/',
    success: function (response) {
        console.log(response)
        //为了将热门推荐的内容处理成一个公共模板  所以将模板写在了JS文件中
        var recommendTpl = `
        {{each data}}
            <li>
                <a href="/detail.html?id={{$value._id}}">
                  <img src="{{$value.thumbnail}}" alt="">
                  <span>{{$value.title}}</span>
                </a>
              </li>
              {{/each}}
        `
        //使用render方法对模板进行渲染 返回值是拼接好的字符串
        var html = template.render(recommendTpl, {data: response})
        //将拼接好的字符串渲染到页面中
        $('#recommendBox').html(html)
    }
})
//
