// 获取随机推荐
$.ajax({
    url: '/posts/random',
    success: function (res) {
        let randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
        </li>
        {{/each}}`
        let html = template.render(randomTpl,{data:res});
        $('.random').html(html);
    }
});
// 最新评论
$.ajax({
    url: '/comments/lasted',
    success: function(res) {
        let commentsTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,10)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
        </li>
        {{/each}}`
        let html = template.render(commentsTpl,{data:res});
        $('.discuz').html(html);
    }
});
// 分类导航栏
$.ajax({
    url: '/categories',
    success: function (res) {
        let tpl =  `
        {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}`
        let html = template.render(tpl,{data:res});
        $('.nav_data').html(html);
    }
});
// 完成搜索功能
$('#search').on('submit',function () {
  // 获取用户输入的关键字
  var key = $('.keys').val();
  location.href = `search.html?key=${key}`;
  // 阻止表单默认提交事件
  return false;
})