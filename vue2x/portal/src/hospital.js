import Vue from 'vue'
import hospital from './wifilink.vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import store from './store.js'
Vue.use(VueLazyload)
Vue.use(VueRouter)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */

import hospitalIntro from './components/hospital/hospitalIntro'
import category from './components/hospital/category'
import doctor from './components/hospital/doctor'
import categoryItem from './components/hospital/categoryItem.vue'
import doctorItem from './components/hospital/doctorItem.vue'
import hospitalnews from './components/hospital/hospitalNews.vue'


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
      path: '/hospitalIntro',
      name: 'hospitalIntro',
      component: hospitalIntro,
    },{
      path: '/category',
      name: 'category',
      component: category,
    },{
      path: '/doctor',
      name: 'doctor',
      component: doctor,
    },{
      path: '/categoryItem',
      name: 'categoryItem',
      component: categoryItem,
    },{
      path: '/doctorItem',
      name: 'doctorItem',
      component: doctorItem,
    },{
      path: '/hospitalnews',
      name: 'hospitalnews',
      component: hospitalnews,
    },{
      path: '*',
      redirect: 'hospitalIntro',
    }
  ]
})

new Vue({
  store,
  router,
  el: '#hospital',
  template: '<hospital/>',
  components: { hospital },
  mounted() {
    this.$nextTick(()=> {
      //alert('wifilink'+3);
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
