var goryArr = [];
$.ajax({
    url: '/categories',
    success: function (res) {
        goryArr = res;
        rander();
    }
});
function rander() {
    let html = template('tpl',{data:goryArr});
    $('tbody').html(html);
}
$('#addbtn').on('click',function() {
    var formData = $('#gory').serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (res) {
            goryArr.push(res);
            rander();
            $('input[name="title"]').val('');
            $('input[name="className"]').val('');
        }
    });
});