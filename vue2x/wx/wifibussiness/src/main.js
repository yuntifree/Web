import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import VueRouter from 'vue-router'
import store from './store.js'
import CGI from './lib/cgi.js'


Vue.use(VueLazyload)
Vue.use(VueRouter)

var initFont = require('./common/font.js')
initFont(true);

import main from './index.vue'
import login from './components/login.vue'
import business from './components/business.vue'
import question from './components/question.vue'
import freeticket from './components/freeTicket.vue'

const router = new VueRouter({
  mode: 'hash',
  base: __public__,
  routes: [{
    path: '/home',
    name: 'home',
    component: main
  },{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/business',
    name: 'business',
    component: business
  },{
    path: '/question',
    name: 'question',
    component: question
  },{
    path: '/freeticket',
    name: 'freeticket',
    component: freeticket
  },{
      path: '*',
      redirect: 'home',
    }]
})

Vue.filter('dateFormat', function(timestr, fmt) {
  return CGI.dateFormat(timestr, fmt);
})

new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
