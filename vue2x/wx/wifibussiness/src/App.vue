<style lang="scss">
  @import './assets/css/reset.css','./assets/css/common.scss';
  html, body {
    color: $baseColor;
  }
</style>
<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import CGI from './lib/cgi.js'
import weixin from './lib/wx.js'
export default {
  name: 'app',
  created() {
    var _this = this;
    weixin.init(function(res)  {
        _this.$store.state.wxReady = true;
    });
  },
  mounted() {
    this.setCookie();
  },
  methods: {
    setCookie() {
      try {
       var phone = CGI.getCookie('phone');
       if (phone && phone.length >0) {
         this.$store.state.logined = true;
         this.$store.state.phone = phone;
       } 
      } catch (e){console.log(e.message);}
      
    }
  }
}
</script>
