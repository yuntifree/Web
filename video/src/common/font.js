module.exports = function(bFont) {
  if (document && window) {
    // init font
    if (bFont) {
      var docEl = document.documentElement;
      var isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
      var dpr = isIOS? Math.min(window.devicePixelRatio, 3) : 1;
        dpr = window.top === window.self? dpr : 1; //被iframe引用时，禁止缩放
      var scale = 1 / dpr;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

      docEl.dataset.dpr = dpr;
      var metaEl = document.createElement('meta');
      metaEl.name = 'viewport';
      metaEl.content = 'initial-scale=1,maximum-scale=1, minimum-scale=1';
      docEl.firstElementChild.appendChild(metaEl);
      var recalc = function () {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
          width = 750 * dpr;
        }
        //docEl.style.fontSize = 100 * (width / 750) + 'px';
        docEl.style.fontSize = (width / 10) + 'px';
      };
      recalc();
      if (!document.addEventListener) return;
      window.addEventListener(resizeEvt, recalc, false);
    }
  }
}