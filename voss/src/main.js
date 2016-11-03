import App from './App.vue'
import store from './store'
import CGI from './lib/cgi.js'
import lazyload from 'vue-lazyload'

CGI.checkLogin(store.state);

Vue.validator('number', function(val) {
  if (val == 0) {
    return true;
  }
  return !isNaN(val);
});

Vue.use(lazyload, {
  loading: './static/images/loading.png',
})

// v-focus="true", 将自动获得焦点
Vue.directive('focus', {
  update(value) {
    if (value) {
      this.vm.$nextTick(() => {
        this.el.focus()
        this.el.select()
      })
    }
  }
})

// 1：男，0：女
Vue.filter('sex', function(value) {
  return value ? '男' : '女'
})

Vue.filter('dateFormat', function(timestr, fmt) {
  return CGI.dateFormat(timestr, fmt);
})

Vue.filter('duration', function(start, end) {
  var expire;
  if (end) {
    expire = new Date(end).getTime();
  } else {
    expire = new Date().getTime();
  }
  var stime = new Date(start).getTime();
  var dura = ~~(expire - stime) / 1000;
  var hh = ~~(dura / 3600);
  var mm = ~~(dura % 3600 / 60);
  var ss = ~~(dura % 60);
  if (hh < 10) {
    hh = '0' + hh;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }
  return hh + ':' + mm + ':' +ss;
})

new Vue({
  store, // store global context
  el: 'body',
  components: {
    App,
  },
  created() {
    // used by datapicker.vue
    window.winClick = (targetDom, callback) => {
      window.addEventListener('click', function(e) {
        var dom = e.target
        while (dom) {
          if (dom == targetDom)
            return
          dom = dom.parentElement
          if (dom == document.body)
            break
        }
        callback();
        window.removeEventListener('click', this, false);
      }, false)
    };
  },
})