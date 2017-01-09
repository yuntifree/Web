import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  uid: 0,
  token: '',
  newsname: 0,
  tabidx: 0,
}

export default new Vuex.Store({
  state,
})


//vue2.0
