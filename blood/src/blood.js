import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import store from './store.js'
Vue.use(VueLazyload)
Vue.use(VueRouter)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */

import reserve from './components/reserve'
import rule from './components/rule'
import verify from './components/verify'
import success from './components/succ'
import write from './components/writeInfo'

window.onerror =  function handleErr(msg,url,l) {
    var txt;
    txt="本页中存在错误。\n\n"
    txt+="错误：" + msg + "\n"
    txt+="URL: " + url + "\n"
    txt+="行：" + l + "\n\n"
    txt+="点击“确定”继续。\n\n"
    //alert(txt);
    return true
}
const router = new VueRouter({
  mode: 'hash',
  base: __public__,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: reserve,
    },{
      path: '/rule',
      name: 'rule',
      component: rule,
    },{
      path: '/verify',
      name: 'verify',
      component: verify,
    },{
      path: '/success',
      name: 'success',
      component: success,
    },{
      path: '/write',
      name: 'write',
      component: write,
    },{
      path: '*',
      redirect: 'home',
    }
  ]
})

new Vue({
  store,
  router,
  el: '#app',
  template: '<app/>',
  components: { app },
  mounted() {
    this.$nextTick(()=> {
      //alert('wifilink'+3);
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
