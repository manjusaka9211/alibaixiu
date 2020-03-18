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
function changePage(index) {
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