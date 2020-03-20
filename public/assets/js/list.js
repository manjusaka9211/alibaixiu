// 获取文章列表
$.ajax({
    url: '/posts/category/' + id,
    success: function (res) {
        $.ajax({
            url: '/categories/' + id,
            success: function (respons) {
                let html = template('listTpl', { data: res, gory: respons });
                $('.panel').html(html);
            }
        });
    }
});