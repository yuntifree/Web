import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';
import CGI from './libs/cgi.js'

Vue.use(iView);
Vue.use(VueResource);

Vue.filter('dateFormat', function(timestr, fmt) {
  return CGI.dateFormat(timestr, fmt);
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
/*http: {
      root: '/root',
      headers: {
          'Content-Type': 'application/json'
      }
    },*/
