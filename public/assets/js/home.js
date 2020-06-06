//首页数据展示功能
//向服务器发送请求 获取轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response)
        //将模板引擎与字符串进行拼接
        var html = template('slidesTpl', {data: response})
        //将拼接好的字符串渲染到页面
        $('#slidesBox').html(html)
        //实现轮播图功能
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//向服务器发送请求 获取最新发布数据
$.ajax({
    type: 'get',
    url: 'posts/lasted',
    success: function (response) {
        console.log(response)
        var html = template('latestedTpl', {data: response})
       // console.log(html)
        $('#latestedBox').html(html)
    }
})
//
