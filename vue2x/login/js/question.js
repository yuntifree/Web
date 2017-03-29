var val = [];

(function() {
  font(true);
  reportQues();
})()

function reportQues() {
  console.log()
  $('.ipt-chk').bind('change', function(e) {
    if ($(this).get(0).checked) {
      var value = ~~($(this).get(0).value);
      val.push(value);
      console.log(val);
    } else {
      if (val.length > 0) {
        val.each(function() {
          console.log(this);
          if (this === val) {
            val.splice(value);
          } 
        })
      }
      console.log(val);
    }
  })
}

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

      $(docEl).data('dpr', dpr);
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


