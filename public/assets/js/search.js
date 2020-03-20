$.ajax({
    url: '/posts/search/' + key,
    success: function (res) {
      let html = template('searchTpl',{data: res});
      $('.panel').html(html);
    }
  });