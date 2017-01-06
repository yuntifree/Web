<style lang="scss">
@import './assets/css/reset.css', './assets/css/common.scss';
.login-top,
.login-top-bg {
  width: 100%;
  height: auto;
  position: relative;
}
.login-logo {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  top: 0.32rem;
  left: 50%;
  margin-left: -0.6rem;
}
.oneclick-logo {
  top:1.24rem;
}
.top-text {
  width: 100%;
  font-size: 0.36rem;
  color: #5a5a5a;
  text-align: center;
  margin-top: 0.48rem;
}
.oneclick-text {
  position: absolute;
  left: 50%;
  bottom: 1.42rem;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
.input-main {
  width: 70%;
  margin: 1.2rem auto 0;
}
.input-info {
  width: 100%;
  padding: 0.42rem 0 0;
  position: relative;
}
.input-img {
  display: block;
  @include containerSize(0.4rem, 0.6rem);
  padding: 0.1rem 0;
}
.input-img img{
  @include containerSize(100%, 100%);
  display: block;
}
.input-info input {
  @include containerSize(91%, auto);
  padding: 0.1rem 0;
  border-bottom: 1px solid #c8c8c8;
  font-size: 0.32rem;
  color: #000;
}
.input-info input::placeholder {
  color: #c8c8c8;
}
.input-info input::-webkit-input-placeholder {
  color: #c8c8c8;
}
.query-code {
  padding-left: 0.14rem;
  position: absolute;
  top: 65%;
  right: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  font-size: 0.28rem;
  color: #00a0fb;
  border-left: 1px solid #00a0fb;
}
.btn {
  width: 100%;
  line-height: 0.8rem;
  border-radius: 0.14rem;
  margin-top: 0.36rem;
  background-color: #00a0fb;
  font-size: 0.36rem;
  font-weight: 500;
  color: #fff;
}
.login-bottom {
  @include containerSize(100%, auto);
  margin-top: 2.4rem;
}
.wrap {
  @include containerSize(100%, 2rem);
  margin: 0.4rem auto 0;
}
.my-swipe {
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.mint-swipe-item {
  float: left;
}
.bottom-text {
  font-size: 0.22rem;
  color: #b4b4b4;
  line-height:0.5rem;
}
.swipe-img {
  display: block;
  @include containerSize(100%, auto);
}
.company-info {
  @include containerSize(70%, auto);
  margin: 0 auto;
}
.comp-logo {
  @include containerSize(0.48rem, 0.48rem);
}
.comp-logo img{
  display: block;
  @include containerSize(0.48rem, auto);
}
.comp-text{
  @include containerSize(88%, auto);
  margin-left: 2%;
}
.comp-text-name {
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.28rem;
  color: #4a4a4a;
  text-align: justify;
}
.comp-text-english {
  display: block;
  line-height: 0.18rem;
  font-size: 0.24rem;
  color: #4a4a4a;
  transform: scale(0.6);
  -webkit-transform: scale(0.6) translateX(-1.5rem);
  white-space:nowrap;
}
.comp-text-slogan {
  line-height: 0.32rem;
  font-size: 0.24rem;
  letter-spacing: 0.2rem;
  color: #4a4a4a;
  transform: scale(0.83);
  -webkit-transform:scale(0.83);
}
.search {
  word-break:break-all; 
  width:200px;
}
</style>

<template>
  <div id="login">
    <template v-if="!oneClick">
      <div class="login-top">
        <img class="login-top-bg" src="../static/images/img_bg3.png">
        <p class="g-tac top-text">欢迎使用东莞无限免费WiFi</p>
      </div>
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
        <!--p class="search">{{search}}</p-->
      </div>
    </template>
    <template v-else>
      <div class="login-top">
        <img class="login-top-bg" src="../static/images/img_bg4.png">
        <p class="g-tac top-text oneclick-text">欢迎使用东莞无限免费WiFi</p>
      </div>
      <div class="input-main">
        <button class="btn" @click="startTrip">一键登录</button>
      </div>
    </template>
    <div class="login-bottom">
      <dl class="g-clearfix company-info">
        <dt class="g-fl comp-logo"><img src="../static/images/ico_login_logo_small.png"></dt>
        <dd class="g-fl comp-text">
          <span class="comp-text-name">东莞智慧城市投资建设运营有限公司</span>
          <span class="comp-text-english">Dongguan smart city investment construction and Operation Co.Ltd.</span>
          <span class="comp-text-slogan"><span>智慧东莞</span><span class="g-fr">活力东莞</span></span>
        </dd>
      </dl>
      <div class="wrap">
        <swipe class="my-swipe">
          <swipe-item class="slide1" v-for="list in adsData.ads">
            <img class="swipe-img" :src="list.img" @click="openUrl(list.url)">
          </swipe-item>
        </swipe>
      </div>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'
import tip from './components/lib/tip.vue'

import CGI from './lib/cgi.js'
import adsData from '../test/adsdata.js'

var query = CGI.query();
var wlanacname = query.wlanacname || '';  //'2043.0769.200.00';
var wlanuserip = query.wlanuserip || '';  //'10.96.72.28';
var wlanacip = query.wlanacip || ''; //'120.197.159.10';
var wlanusermac = query.wlanusermac || '';
var urlreplace = ~~(query.urlreplace);

export default {
  name: 'login',
  data() {
    return {
      oneClick: false,
      phone: '',
      pwd: '',
      timeTxt: '获取验证码',
      search:'',
      adsData: adsData,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
    }
  },
  components: {
    Swipe,
    SwipeItem,
    tip,
  },
  /*created() {
    var macList =['14f65a9f590c'];
    var url = '';
    for (var i=0; i<macList.length; i++) {
      if (wlanusermac !== macList[i]) {
        url = 'http://192.168.100.4:880/wsmp/customize/dgwifi2/login.html' + document.location.search;
        location.href = url;
      }
    }
  },*/
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
          //  var url = "http://yunxingzh.com/dist/wifilink.html#/?loginfrom=true&uid=137&token=6ba9ac5a422d4473b337d57376dd3488";
          // location.href = url;
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



