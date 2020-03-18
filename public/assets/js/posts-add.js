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
// 解析地址栏中的参数
function getPramas(name) {
    // 将参数解析为键值对的数组
    var arr = location.search.substr(1).split('&')
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split('=')[0] == name) {
            // 如果找到该参数，返回值
            return arr[i].split('=')[1];
        }
        // 找不到就返回-1
        return -1;
    }
}
// 获取地址栏中的id
var id = getPramas('id');
// 如果id不为-1，就是编辑功能
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            // 将获取到的数据填写到表单中
            $('h1').text('修改文章');
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('.thumbnail').show().attr('src',res.thumbnail);
            $('#hidden').val(res.thumbnail);
            $('#created').val(res.createAt && res.createAt.substr(0,16));
            $('#status option').each((index,item) => {
                if ($(item).val() == res.state) {
                    $(item).prop('selected',true);
                }
            });
            $('#category option').each((index,item) => {
                if ($(item).val() == res.category._id) {
                    $(item).prop('selected',true);
                }
            });
            $('#add').hide();
            $('#editBtn').show();
        }
    });
}
// 点击提交，发送请求修改文章内容
$('#editBtn').on('click',function() {
    var formData = $('.row').serialize();
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function (res) {
            // 修改完成，返回文章显示页面
            location.href = 'posts.html';
        }
    });
});