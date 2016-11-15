//import Vue from 'vue'
import vmap from './vmap'

var initFont = require('./common/font.js')
initFont(true);

/* eslint-disable no-new */
new Vue({
  el: '#mapp',
  template: '<vmap/>',
  components: { vmap },
})
