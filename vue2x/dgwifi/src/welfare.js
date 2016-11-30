//import Vue from 'vue'
import welfare from './welfare.vue'

var initFont = require('./common/font.js')
initFont(true);

/* eslint-disable no-new */
new Vue({
  el: '#welfare',
  template: '<welfare/>',
  components: { welfare },
})
