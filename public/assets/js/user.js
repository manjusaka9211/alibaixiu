let userArr = [];
$.ajax({
    url: '/users',
    success: function (res) {
        userArr = res;
        rander();
    }
});
function rander() {
    var html = template('userList',{data: userArr});
    $('tbody').html(html);
}
// 头像上传表单发生改变时
$('#modifyBox').on('change','#avatar',function() {
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
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
// 当用户点击提交按钮时
$('#btn').on('click',function () {
    var formData = $('#form').serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            userArr.push(res);
            rander();
            $('#hiddenAvatar').val('');
            $('#preview').prop('src','../assets/img/default.png')
            $('input[name="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked',false);
            $('#status1').prop('checked',false);
            $('#admin').prop('checked',false);
            $('#normal').prop('checked',false);
        }
    })
})