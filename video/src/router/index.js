import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/views/Chat.vue'
import intro from '@/components/views/Introduction.vue'
import award from '@/components/views/Award.vue'

/**/
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'chat',
      component: chat
    },{
      path: '/intro',
      name: 'intro',
      component: intro
    },{
      path: '/award',
      name: 'award',
      component: award
    }
  ]
})
