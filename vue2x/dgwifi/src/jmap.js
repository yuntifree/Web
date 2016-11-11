import Vue from 'vue'
import vmap from './vmap'
var initFont = require('./common/font.js')
initFont(true);

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#mapp',
  template: '<vmap/>',
  components: { vmap }
})
