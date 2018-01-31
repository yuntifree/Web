import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/views/Chat.vue'
import Intro from '@/components/views/Intro.vue'
import Award from '@/components/views/Award.vue'
import Vote from '@/components/views/Vote.vue'

/**/
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'chat',
      component: Chat
    },{
      path: '/intro',
      name: 'intro',
      component: Intro
    },{
      path: '/award',
      name: 'award',
      component: Award
    },{
      path: '/vote',
      name: 'vote',
      component: Vote
    }
  ]
})
