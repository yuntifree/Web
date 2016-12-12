import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'

Vue.use(VueRouter)
Vue.use(infiniteScroll)


var initFont = require('./lib/font.js')
initFont(true);
/* eslint-disable no-new */
import hello from './components/hello'
import newest from './components/latest.vue'
import hot from './components/hot.vue'
import evaluate from './components/evaluate.vue'
import detail from './components/detail.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: hello,
      children: [{ 
        path: 'newest',
        name: 'newest',
        component: newest 
        },{ 
        path: 'hot',
        name: 'hot',
        component: hot 
        },{ 
        path: 'evaluate',
        name: 'evaluate', 
        component: evaluate 
      }]
    },{
      path: '/detail',
      name: 'detail',
      component: detail,
    },{
      path: '*',
      redirect: '/hello/newest',
    }]
})


new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted() {
    this.$nextTick(()=> {
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
