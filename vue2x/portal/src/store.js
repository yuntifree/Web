import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  uid: 0,
  token: '',
  infiniteLoading: '',
}

export default new Vuex.Store({
  state,
})


//vue2.0
