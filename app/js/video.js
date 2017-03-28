var data = [];
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
      $('video').append(template('tplVideo',data));
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
