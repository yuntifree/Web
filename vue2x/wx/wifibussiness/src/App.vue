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
    weixin.init();
  },
  mounted() {
    this.setCookie();
  },
  methods: {
    setCookie() {
      /*CGI.setCookie('uid','137');
      CGI.setCookie('token','dfdsfdsfsd');
      CGI.setCookie('wid','9');*/
      try {
      //CGI.delCookie('phone');
       var phone = CGI.getCookie('phone');
       console.log(phone);
       if (phone && phone.length >0) {
         this.$store.state.logined = true;
         this.$store.state.phone = phone;
       } 
      } catch (e){console.log(e.message);}
      
    }
  }
}
</script>
