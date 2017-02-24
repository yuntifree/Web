//import Vue from 'vue'
import service from './service.vue'

var initFont = require('./common/font.js')
initFont(true);

/* eslint-disable no-new */
new Vue({
  el: '#service',
  template: '<service/>',
  components: { service },
})
