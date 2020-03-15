let userArr = [];
$.ajax({
    url: '/users',
    success: function (res) {
        console.log(res);
        
        userArr = res;
        rander();
    }
});
function rander() {
    var html = template('userList',{data: userArr});
    $('tbody').html(html);
}