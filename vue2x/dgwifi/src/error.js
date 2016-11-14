import Vue from 'vue'
import error from './error.vue'
var initFont = require('./common/font.js')
initFont(true);

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#error',
  template: '<error/>',
  components: { error }
})
