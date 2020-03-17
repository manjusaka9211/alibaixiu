$.ajax({
    url: '/categories',
    success: function (res) {
        let html = template('tpl',{data: res});
        $('#category').html(html);
    }
});
// 图片上传和即使预览功能
$('#feature').on('change',function () {
    var formData = new FormData();
    formData.append('feature', this.files[0]);
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
            $('.thumbnail').show().attr('src', response[0].feature);
            $('#hidden').val(response[0].feature)
        }
    });
});
// 用户点击添加时
$('#add').on('click',function () {
    var formData = $('.row').serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            location.href = 'posts.html';
        }
    });
});
