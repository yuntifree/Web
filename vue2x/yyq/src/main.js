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
import records from './components/records.vue'
import history from './components/betHistoty.vue'
import goodshare from './components/goodShare.vue'
import intro from './components/intro.vue'

const router = new VueRouter({
  mode: 'hash',
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
      children: [{
        path: 'records',
        name: 'records',
        component: records
      },{
        path: 'intro',
        name: 'intro',
        component: intro
      },{
        path: 'history',
        name: 'history',
        component: history
      },{
        path: 'goodshare',
        name: 'goodshare',
        component: goodshare
      }]
    },{
      path: '/goodsDetail',
      name: 'goodsDetail',
      redirect: '/detail/records'
    },{
      path: '*',
      redirect: '/hello/newest',
    }]
})
router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象
  next(()=> {
    if (store.state.uid == 0) {
      console.log(0)
    }
  })
})
console.log();


new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted() {
    this.$nextTick(()=> {
    })
  }
})
