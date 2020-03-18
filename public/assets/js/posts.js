// 声明变量保存筛选数据
var cid = $('#gory').val();
var state = $('#state').val();
// 将发送请求封装成函数
function rander(cid, state, page = 1) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            var html = template('post', { data: res.records });
            $('tbody').html(html);
            var pageHtml = template('pageTpl', res);
            $('#page').html(pageHtml);
        }
    });
}
// 文章显示
// 页面加载发送请求获取数据
rander(cid,state);
// 分页功能
var num = 1;
function changePage(index) {
    num = index;
    rander(cid,state,index);
}
// 获取分类列表显示到页面上
$.ajax({
    url: '/categories',
    success: function (res) {
        var html = template('goryTpl', { data: res });
        $('#gory').append(html);
    }
});
$('#search').on('click', function () {
    // 获取用户选择的筛选的内容
    cid = $('#gory').val();
    state = $('#state').val();
    // 获取数据渲染页面
    rander(cid,state);
});
// 文章删除功能
$('tbody').on('click','.del',function () {
    // 获取当前点击的文章的id
    let id = $(this).attr('data-id');
    if (confirm('您确定要删除这篇文章吗？')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function (res) {
                // 判断当前tbody下的tr数，如果只有一个，跳转到上一页
                if (num != 1) {
                    if ($('tbody tr').length == 1) {
                        rander(cid, state, --num);
                    } else {
                        rander(cid, state, num);
                    }
                } else {
                    rander(cid, state, num);
                }
            }
        });
    }
});