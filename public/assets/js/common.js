$('#logout').on('click', function () {
    var isLogout = confirm('您确定要退出吗');
    if (isLogout) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html';
            }
        });
    }
});
// 当全选按钮发生改变时
$('#checkall').on('change', function () {
    // console.log($(this).prop('checked'));
    $('tbody').find('input').prop('checked', $(this).prop('checked'));
    // 根据选中状态显示与隐藏批量删除按钮
    if ($(this).prop('checked')) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
// 当下面的复选框发生改变时
$('tbody').on('change', '.usercheck', function () {
    // 获取复选框的总数
    var inputs = $('.usercheck').length;
    // 获取选中的复选框的数量
    var checklength = $('.usercheck:checked').length;
    // console.log(inputs,checklength);
    $('#checkall').prop('checked', inputs === checklength);
    // 根据选中状态显示与隐藏批量删除按钮
    if (checklength > 1) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});