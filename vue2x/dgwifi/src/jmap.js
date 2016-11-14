//import Vue from 'vue'
import vmap from './vmap'
import weixin from './lib/wx.js'

var initFont = require('./common/font.js')
initFont(true);

weixin.init(()=>{
  wx && wx.getLocation({
    success: function (res) {
      store.state.latitude = res.latitude;
      store.state.longitude = res.longitude;
    },
    cancel: function (res) {
    }
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#mapp',
  template: '<vmap/>',
  components: { vmap }
})
