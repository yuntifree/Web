import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  // 登录状态
  logined: false,
  phone: '',
  wxReady: false
}

export default new Vuex.Store({
  state,
})


//vue2.0
