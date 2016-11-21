import Vue from 'vue'
import VueValidator from 'vue-validator'
import ElementUI from 'element-ui'

import App from './App'

import CGI from './lib/cgi.js'
import store from './store'

Vue.use(VueValidator);
Vue.use(ElementUI);

CGI.checkLogin(store.state);

Vue.filter('dateFormat', function(timestr, fmt) {
  return CGI.dateFormat(timestr, fmt);
})

Vue.validator('number', function(val) {
  if (val == 0) {
    return true;
  }
  return !isNaN(val);
});

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
