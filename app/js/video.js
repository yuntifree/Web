//var data = [];
var data = [{"dst":"http://file.yunxingzh.com/060c0327-1700-43f5-b311-c969d4e07dce.mp4","title":"哎呀回家-机票改签篇","id":45},
            {"dst":"http://file.yunxingzh.com/93dfc881-8454-4c82-b1ee-7d625e79aa97.mp4","title":"哎呀回家—购物退款篇","id":44}]
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token =  query.token || '';
(function() {
  font(true);
  //getData();
  $('.video').append(template('tplVideo',data));
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
