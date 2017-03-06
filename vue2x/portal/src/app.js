import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import app from './app.vue'
import store from './store.js'
import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(AlloyFingerVue, {
  AlloyFinger
})
Vue.use(infiniteScroll)
Vue.use(VueLazyload)
var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */


window.onerror =  function handleErr(msg,url,l) {
    var txt;
    txt="本页中存在错误。\n\n"
    txt+="错误：" + msg + "\n"
    txt+="URL: " + url + "\n"
    txt+="行：" + l + "\n\n"
    txt+="点击“确定”继续。\n\n"
    //alert(txt);
    return true
}
new Vue({
  store,
  el: '#app',
  template: '<app/>',
  components: { app },
  mounted() {
    this.$nextTick(()=> {
      
    })
  }
})
