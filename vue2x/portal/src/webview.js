import Vue from 'vue'
import Webview from './webview.vue'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'

Vue.use(VueRouter)
Vue.use(infiniteScroll)
Vue.use(VueLazyload)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */
import tab from './components/tab'
import newslist from './components/newslist.vue'
import videos from './components/video.vue'
import service from './components/service.vue'
import store from './store.js'


const router = new VueRouter({
  mode: 'hash',
  base: __public__,
  routes: [
    {
      path: '',
      name: 'home',
      redirect: 'newslist',
      component: tab,
      children: [{
        path: 'newslist',
        name: 'newslist',
        component: newslist,
      },{
        path: 'videos',
        name: 'videos',
        component: videos,
      },{
        path: 'service',
        name: 'service',
        component: service
      }]
    },{
      path: '*',
      redirect: 'newslist',
    }]
})
// router.beforeEach((to, from, next) => {
// })

new Vue({
  router,
  store,
  el: '#webview',
  template: '<Webview/>',
  components: { Webview },
  mounted() {
    //console.log(__routerName__);
    this.$nextTick(()=> {
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
