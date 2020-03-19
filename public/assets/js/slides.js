// 轮播图片显示功能
var slidesArr = [];
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        slidesArr = res;
        rander();
    }
});
function rander() {
    var html = template('slidesTpl', { data: slidesArr });
    $('tbody').html(html);
}
// 轮播图片添加功能
$('#image').on('change', function () {
    var formData = new FormData();
    formData.append('image', this.files[0]);
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
            $('.thumbnail').show().attr('src', response[0].image);
            $('#hidden').val(response[0].image)
        }
    });
});
$('#slidesadd').on('click', function () {
    var formData = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function (res) {
            slidesArr.push(res);
            rander();
            $('.thumbnail').hide();
            $('#image').val('');
            $('#hidden').val('');
            $('#text').val('');
            $('#link').val('');
        }
    });
});
// 轮播图片删除功能
$('tbody').on('click','.del',function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function (res) {
            let index = slidesArr.findIndex(item => item._id == res._id);
            slidesArr.splice(index,1);
            rander();
        }
    });
});