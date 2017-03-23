import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll';

var initFont = require('./common/font.js')
initFont(true);


Vue.use(infiniteScroll)
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
