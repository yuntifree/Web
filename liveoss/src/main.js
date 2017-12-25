import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    http: {
      root: '/root',
      headers: {
          'Content-Type': 'application/json'
      }
    },
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
