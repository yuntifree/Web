import App from './App.vue'
/*import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);*/

var initFont = require('./common/font.js')
initFont(true);

Vue.filter('price', function (value) {
    return Math.floor(value / 100)
})

new Vue({
    el: 'body',
    components: {
        App,
    },
})
