<style lang="scss" scoped>
@import './assets/css/reset.css', './assets/css/common.scss';

.pc-login-main {
  @include containerSize(400px, 300px);
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 20px 20px 0 rgba(80, 80, 80, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
}
.pc-login-dglogo {
  display: block;
  @include containerSize(100px, auto);
  margin: 0 auto;
}
.dgpc-text {
  font-size: 20px;
  color: #5a5a5a;
}
.pc-input-info {
  width: 360px;
  padding: 20px 0 0;
  position: relative;
}
.pc-input-img {
  display: block;
  @include containerSize(20px, 30px);
  padding: 5px 0;
}
.pc-input-img img{
  @include containerSize(100%, 100%);
  display: block;
}
.pc-input-info input {
  @include containerSize(340px, auto);
  padding: 5px 0;
  border-bottom: 1px solid #c8c8c8;
  font-size: 16px;
  color: #000;
}
.pc-input-info input::placeholder {
  color: #c8c8c8;
}
.pc-input-info input::-webkit-input-placeholder {
  color: #c8c8c8;
}
.pc-query-code {
  padding-left: 7px;
  position: absolute;
  top: 65%;
  right: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  font-size: 14px;
  color: #00a0fb;
  border-left: 1px solid #00a0fb;
}

</style>

<template>
  <div class="loginpc">
    <template>
      <div class="login-main">
        <img class="login-dglogo" src="../static/images/pc_img_dglogo.png">
        <p class="g-tac dgpc-text">欢迎使用东莞无限免费WiFi</p>
        <div class="input-main">
          <div class="input-info g-clearfix">
            <label class="input-img g-fl" for="name"><img src="../static/images/loading_icon_phone.png"></label>
            <input class="g-fr" id="name" type="text" placeholder="请输入手机号" v-model.trim="phone">
          </div>
          <div class="input-info g-clearfix">
            <label class="input-img g-fl" for="pwd"><img src="../static/images/loading_icon_key.png"></label>
            <input class="g-fr" id="pwd" type="text" placeholder="请输入验证码" v-model.trim="pwd">
            <i class="query-code" @click="getCode">{{timeTxt}}</i>
          </div>
          <button class="btn" @click="startTrip">开启智慧城市之旅</button>
        </div>
      </div>
      
    <!--template v-else>
      <div class="login-top">
        <img class="login-top-bg" src="../static/images/img_bg4.png">
        <!--img class="login-logo oneclick-logo" src="../static/images/ico_login_logo.png">
        <p class="g-tac top-text oneclick-text">欢迎使用东莞无限免费WiFi</p>
      </div>
      <div class="input-main">
        <button class="btn" @click="startTrip">一键登录</button>
      </div>
    <div class="login-bottom">
      <dl class="g-clearfix company-info">
        <dt class="g-fl comp-logo"><img src="../static/images/ico_login_logo_small.png"></dt>
        <dd class="g-fl comp-text">
          <span class="comp-text-name">东莞智慧城市投资建设运营有限公司</span>
          <span class="comp-text-english">Dongguan smart city investment construction and Operation Co.Ltd.</span>
          <span class="comp-text-slogan"><span>智慧东莞</span><span class="g-fr">活力东莞</span></span>
        </dd>
      </dl>
    </div-->
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './components/lib/tip.vue'
import CGI from './lib/cgi.js'

var query = CGI.query();
var wlanacname = query.wlanacname || '';  //'2043.0769.200.00';
var wlanuserip = query.wlanuserip || '';  //'10.96.72.28';
var wlanacip = query.wlanacip || ''; //'120.197.159.10';
var wlanusermac = query.wlanusermac || '';
var urlreplace = ~~(query.urlreplace);

export default {
  name: 'loginpc',
  data() {
    return {
      oneClick: false,
      phone: '',
      pwd: '',
      timeTxt: '获取验证码',
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=> {
      if (localStorage.portal_phone && localStorage.portal_code) {
        this.oneClick = true;
      } else {
        this.oneClick = false;
      }
    })
  },
  methods: {
    getCode() {
      if (!this.checkPhone()) return;

      var param = {};
      param.phone = this.phone;
      CGI.post('get_check_code', param, (resp)=> {
        if (resp.errno === 0) {
          var seconds = 60;
          this.timer = setInterval(()=> {
            seconds--;
            this.timeTxt = ((seconds < 10) ? "0" + seconds : seconds) + "s";
            if (seconds == 0) {
              this.timeTxt = '获取验证码';
              clearInterval(this.timer);
            };
          }, 1000)
        } else  {
          this.alertInfo(resp.desc);
        }
      });
    },
    checkPhone() {
      var ret = false;
      if (this.phone.length <= 0) {
        this.alertInfo('请先输入手机号');
      } else {
        ret = CGI.checkTel(this.phone);
        if (!ret) {
          this.alertInfo('请输入正确的手机号');
        }
      }
      return ret;
    },
    startTrip() {
      var param = {
        wlanacname: wlanacname,
        wlanuserip: wlanuserip,
        wlanacip: wlanacip,
        wlanusermac: wlanusermac,
      };
      if (this.oneClick) {
        param.phone = localStorage.portal_phone;
        param.code = localStorage.portal_code;
        this.portalLogin(param);
      } else {
        if (this.checkPhone()) {
          param.phone = this.phone;
          if (this.pwd.length <= 0) {
            this.alertInfo('请输入验证码');
          } else {
            param.code = this.pwd;
            this.portalLogin(param);
          }
        }
      } 
    },
    portalLogin(param) {
      CGI.post('portal_login', param, (resp)=> {
        if (resp.errno === 0) {
          localStorage.portal_phone = param.phone;
          localStorage.portal_code = param.code;
          var info = resp.data;
          var url = "http://yunxingzh.com/dist/wifilink.html#/?loginfrom=true&uid=" + info.uid + '&token=' +info.token;
          location.href = url;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    openUrl(url) {
      location.href = url;
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>




