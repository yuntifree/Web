//import Vue from 'vue'
import App from './App'
var initFont = require('./common/font.js')
initFont(true);

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
