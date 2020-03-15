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