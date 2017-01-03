import Vue from 'vue'
import login from './login.vue'
import VueLazyload from 'vue-lazyload'
import store from './store.js'

Vue.use(VueLazyload)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */

new Vue({
  store,
  el: '#login',
  template: '<login/>',
  components: { login },
  mounted() {
    this.$nextTick(()=> {
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
