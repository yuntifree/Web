import Vue from 'vue';
import Vuex from 'vuex';

//浏览器不支持es6
require('babel-polyfill')

Vue.use(Vuex);

const state = {
  uid: 0,
  token: '',
  newsname: 0,
  tabidx: 0,
  doctorIdx: 0,
  keshi: ''
}

export default new Vuex.Store({
  state,
})

