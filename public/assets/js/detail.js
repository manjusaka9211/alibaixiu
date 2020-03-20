// 获取文章详情
rander();
function rander() {
    $.ajax({
        url: '/posts/' + id,
        success: function (res) {
            console.log(res);
            let html = template('articleTpl', { res });
            $('.content').html(html);
        }
    });
}
// 点赞功能
$('.content').on('click', '#like', function () {
    let id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function () {
            rander();
        }
    });
});