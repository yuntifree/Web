import Vue from 'vue'
import wifilink from './wifilink.vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

import store from './store.js'

Vue.use(VueLazyload)
Vue.use(VueRouter)
Vue.use(infiniteScroll)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */

import wifiinfo from './components/wifiinfo'
import service from './components/service'


const router = new VueRouter({
  mode: 'hash',
  base: __public__,
  routes: [
    {
      path: '',
      name: 'home',
      component: wifiinfo,
    },{
      path: '/service',
      name: 'service',
      component: service,
    },{
      path: '*',
      redirect: 'wifiinfo',
    }
  ]
})

new Vue({
  store,
  router,
  el: '#wifilink',
  template: '<wifilink/>',
  components: { wifilink },
  mounted() {
    this.$nextTick(()=> {
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
