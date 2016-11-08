import App from './App.vue'
/*import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);*/

var initFont = require('./common/font.js')
initFont(true);

Vue.filter('price', function (value) {
    return Math.floor(value / 100)
})

new Vue({
    el: 'body',
    components: {
        App,
    },
    ready() {
      var f;
      var n = document.querySelector('body');
      n.addEventListener("touchstart", function(e) {         //n为h5页面的body
        f = e.touches[0].clientY
      },!1),
      n.addEventListener("touchmove", function(t) {
        var i = "11", n = this;
        if (0 === n.scrollTop)                                  //滚动条最顶部的情况。
          // 如果说没有滚动条的情况，i = "00"; 有滚动条的情况为“01”。
          i = n.offsetHeight === n.scrollHeight ? "00" : "01";
        else if (n.scrollTop + n.offsetHeight >= n.scrollHeight)//有滚动条，滚动到最底部的情况。
          i = "10";
        if ("11" !== i) {
        //01是向上滑动或者滑不动，10是向下滑动。
          var r = t.touches[0].clientY - f > 0 ? "10" : "01";
          if (!(parseInt(i, 2) & parseInt(r, 2)))
                        //e(t)
　　　　　　  t.stopPropagation();
　　　　　　t.preventDefault();
        }
      },!1);
    }
})
