var data = {};
/*var data = {
        infos:[{"dst":"http://file.yunxingzh.com/060c0327-1700-43f5-b311-c969d4e07dce.mp4","title":"哎呀回家-机票改签篇","id":45,click:2},
            {"dst":"http://file.yunxingzh.com/93dfc881-8454-4c82-b1ee-7d625e79aa97.mp4","title":"哎呀回家—购物退款篇","id":44}]
        }*/
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token =  query.token || '';
(function() {
  font(true);
  getData();
})()


function font(bFont) {
  if (document && window) {
    // init font
    if (bFont) {
      var docEl = document.documentElement;
      var isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
      var dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1;
      dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
      var scale = 1 / dpr;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

      docEl.setAttribute('dpr', dpr);
      var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 640) {
          width = 640 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
      };
      recalc();
      if (!document.addEventListener) return;
      window.addEventListener(resizeEvt, recalc, false);
    }
  }
}

function getData() {
  var param = {
    uid: uid,
    token: token
  }
  CGI.post('get_education_video', param, function() {
    if (resp.errno === 0) {
      data = resp.data.infos;
      $('.video').append(template('tplVideo',data));
      videoPlay();
      $('video').bind('pause', function(e) {
        console.log('video pause');
      })
      $('video').bind('play', function(e) {
        var idx = ($(this).get(0).getAttribute('data-idx'));
        clickReport(idx);
      })
    } else {
      tipShow(resp.desc);
    }
  })
}

function tipShow(val) {
  $('.tip-info').text(val);
  $('.tip-info').show();
  setTimeout(function() {
    $('.tip-info').hide();
  }, 2000);
}

function videoPlay(){
  $('.video-list').click(function() {
      $('video').trigger('pause');
      $(this).find('video').trigger('play');
      var idx = $(this).index();
      //播放次数
      clickReport(idx);
  })
}

function clickReport(idx) {
  var num = 0;
  if (data.infos[idx].click) {
    num = data.infos[idx].click +1;
  } else {
    num = 1
  }
  $($('.video-list')[idx]).find(('.click-num')).text(num + '次播放');
  var param = {
    uid: uid,
    token: token,
    id: data.infos[idx].id,
    type: 16
  }
  CGI.post('report_click', param, function(resp) {
    if (resp.errno === 0) {
    } else {
      console.log(resp.desc);
    }
  })
}

