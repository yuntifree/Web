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

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/tab',
      name: 'tab',
      component: tab,
      children: [{
        path: 'newslist',
        name: 'newslist',
        component: newslist
        },{
        path: 'videos',
        name: 'videos',
        component: videos
        },{
        path: 'service',
        name: 'service',
        component: service
        }]
    },{
      path: '*',
      redirect: '/tab/newslist',
    }]
})


new Vue({
  router,
  el: '#webview',
  template: '<Webview/>',
  components: { Webview },
  mounted() {
    this.$nextTick(()=> {
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
