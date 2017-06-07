import Vue from 'vue';
import Vuex from 'vuex';

//浏览器不支持es6
require('babel-polyfill')

Vue.use(Vuex);

const state = {
  code: 0,
  ads: ''
}

export default new Vuex.Store({
  state,
})

