let userArr = [];
$.ajax({
    url: '/users',
    success: function (res) {
        userArr = res;
        rander();
    }
});
function rander() {
    var html = template('userList', { data: userArr });
    $('tbody').html(html);
}
// 头像上传表单发生改变时
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
});
function clear() {
    $('#hiddenAvatar').val('');
    $('#preview').prop('src', '../assets/img/default.png');
    $('input[name="email"]').prop('disabled', false).val('');
    $('input[name="nickName"]').val('');
    $('input[name="password"]').prop('disabled', false).val('');
    $('#status0').prop('checked', false);
    $('#status1').prop('checked', false);
    $('#admin').prop('checked', false);
    $('#normal').prop('checked', false);
}
// 当用户点击提交按钮时
$('#addBtn').on('click', function () {
    var formData = $('#form').serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            userArr.unshift(res);
            rander();
            clear();
        }
    });
});
// 给修改按钮添加点击事件  事件委托
var userId;
$('tbody').on('click', '.edit', function () {
    userId = $(this).attr('data-id');
    var tr = $(this).parents('tr');
    $('#preview').prop('src', tr.children().eq(1).find('img').prop('src'));
    $('#hiddenAvatar').val(tr.children().eq(1).find('img').prop('src'));
    $('input[name="email"]').prop('disabled', true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled', true);
    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true);
    } else {
        $('#status0').prop('checked', true);
    }
    if (tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }
    $('h2').text('修改用户信息');
    $('#addBtn').hide();
    $('#editBtn').show();
});
// 用户提交修改
$('#editBtn').on('click', function () {
    var formData = $('#form').serialize();
    $.ajax({
        type: 'put',
        url: '/users/' + userId,
        data: formData,
        success: function (res) {
            var index = userArr.findIndex(item => item._id == res._id);
            userArr[index] = res;
            rander();
            clear();
            $('h2').text('添加新用户');
            $('#addBtn').show();
            $('#editBtn').hide();
        }
    });
});
// 删除单个用户
$('tbody').on('click', '.delete', function () {
    // 获取当前点击的用户的id
    var id = $(this).siblings('.edit').attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        success: function (res) {
            var index = userArr.findIndex(item => item._id == res._id);
            userArr.splice(index, 1);
            rander();
        }
    });
});
// 批量删除
// 给批量删除按钮添加点击事件
$('#deleteMany').on('click', function () {
    var arr = [];
    $('.usercheck:checked').each((index, item) => {
        arr.push($(item).attr('data-id'));
    });
    if (confirm('你确定要删除这些用户吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + arr.join('-'),
            success: function (res) {
                res.forEach((index, ele) => {
                    var index = userArr.findIndex(item => item._id === ele._id);
                    userArr.splice(index, 1);
                });
                rander();
                $('#deleteMany').hide();
            }
        });
    }
});