// 声明一个数组用于存储数据
var goryArr = [];
// 发送请求获取数据
$.ajax({
    url: '/categories',
    success: function (res) {
        goryArr = res;
        // 渲染页面
        rander();
    }
});
function rander() {
    let html = template('tpl', { data: goryArr });
    $('tbody').html(html);
}
// 当用户点击添加按钮时
$('#addbtn').on('click', function () {
    var formData = $('#gory').serialize();
    // 发送请求添加数据
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (res) {
            goryArr.push(res);
            rander();
            // 清空输入框的内容
            $('input[name="title"]').val('');
            $('input[name="className"]').val('');
        }
    });
});
// 当用户点击编辑按钮时
let id;
$('tbody').on('click', '.edit', function () {
    var tr = $(this).parents('tr');
    // 获取当前点击的数据的id
    id = tr.attr('data-id');
    // 将数据显示到输入框中
    $('input[name="title"]').val(tr.children().eq(1).text());
    $('input[name="className"]').val(tr.children().eq(2).text());
    $('h2').text('修改分类');
    $('#addbtn').hide();
    $('#editbtn').show();
});
// 用户提交修改时
$('#editbtn').on('click', function () {
    var formData = $('#gory').serialize();
    // 发送请求修改
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (res) {
            // 获取当前修改的分类在数组中的索引
            var index = goryArr.findIndex(item => item._id == res._id);
            // 替换之前的数据
            goryArr[index] = res;
            // 重新渲染页面
            rander();
            // 清空输入框的内容
            $('input[name="title"]').val('');
            $('input[name="className"]').val('');
            $('h2').text('添加分类');
            $('#addbtn').show();
            $('#editbtn').hide();
        }
    });
});
// 删除单个分类
$('tbody').on('click', '.delete', function () {
    var tr = $(this).parents('tr');
    var id = tr.attr('data-id');
    if (confirm('您确定要删除该分类吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                // 获取当前修改的分类在数组中的索引
                var index = goryArr.findIndex(item => item._id == res._id);
                // 删除数组中对应的分类
                goryArr.splice(index,1);
                // 重新渲染页面
                rander();
            }
        });
    }
});
// 给批量删除按钮添加点击事件
$('#deleteMany').on('click', function () {
    var arr = [];
    $('.usercheck:checked').each((index, item) => {
        arr.push($(item).parents('tr').attr('data-id'));
    });
    if (confirm('你确定要删除这些分类吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + arr.join('-'),
            success: function (res) {
                res.forEach((index, ele) => {
                    var index = goryArr.findIndex(item => item._id === ele._id);
                    goryArr.splice(index, 1);
                });
                rander();
                $('#deleteMany').hide();
            }
        });
    }
});