// 文章显示
$.ajax({
    url: '/posts',
    success: function (res) {
        var html = template('post',{data:res.records});
        $('tbody').html(html);
    }
});