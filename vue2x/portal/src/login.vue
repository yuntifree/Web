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
.top-text {
  width: 100%;
  font-size: 0.36rem;
  color: #5a5a5a;
  position: absolute;
  left: 50%;
  bottom: 0.34rem;
  transform: translateX(-50%);
}
.input-main {
  width: 70%;
  margin: 1.4rem auto 0;
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
  position: absolute;
  left: 0;
  bottom: 0;
}
.wrap {
  @include containerSize(94%, 2rem);
  margin: 0 auto;
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
  @include containerSize(100%, auto);
  display: block;
}
</style>

<template>
  <div id="login">
    <div class="login-top">
      <img class="login-top-bg" src="http://img.yunxingzh.com/9a4e139c-dbdc-4793-9a83-84e59b8d0d0b.png">
      <img class="login-logo" src="http://img.yunxingzh.com/26248937-3d7f-4baf-976e-f699db55fb13.png">
      <p class="g-tac top-text">欢迎使用东莞无限免费WiFi</p>
    </div>
    <div class="input-main">
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="name"><img src="../static/loading_icon_phone.png"></label>
        <input class="g-fr" id="name" type="text" placeholder="请输入手机号" v-model.trim="phone">
      </div>
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="pwd"><img src="../static/loading_icon_key.png"></label>
        <input class="g-fr" id="pwd" type="text" placeholder="请输入验证码" v-model.trim="pwd">
        <i class="query-code" @click="getCode">{{timeTxt}}</i>
      </div>
      <button class="btn" @click="startTrip">开启智慧城市之旅</button>
    </div> 
    <div class="login-bottom">
      <div class="wrap">
        <swipe class="my-swipe">
          <swipe-item class="slide1" v-for="list in adsData.ads">
            <img class="swipe-img" :src="list.img" @click="openUrl(list.url)">
          </swipe-item>
        </swipe>
      </div>
      <p class="bottom-text g-tac">东莞智慧城市投资建设运营有限公司</p>
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
var wlanacname = query.wlanacname || '2043.0769.200.00';
var wlanuserip = query.wlanuserip || '10.96.72.28';
var wlanacip = query.wlanacip || '120.197.159.10';
var wlanusermac = query.wlanusermac || '';

export default {
  name: 'login',
  data() {
    return {
      phone: '',
      pwd: '',
      timeTxt: '获取验证码',
      warpList:['text1text1text1text1text1'],
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
  mounted() {
    this.$nextTick(()=> {
    })
  },
  methods: {
    getCode() {
      var param = {};
      if (this.checkPhone()) {
        param.phone = this.checkPhone();
      } else {
        return;
      }
      CGI.post('get_check_code', param, (resp)=> {
        if (resp.errno === 0) {
          console.log(resp.data);
        } else  {
          this.alertInfo(resp.desc);
        }
      });
      var seconds = 60;
      var _this = this; 
      var timer = setInterval(function(){
        seconds--;
        _this.timeTxt = ((seconds < 10) ? "0" + seconds : seconds) + "s";
        if(seconds == 0){
        _this.timeTxt = '获取验证码';
        clearInterval(timer);
      };
      },1000)
    },
    checkPhone() {
      var ret = false;
      if (this.phone.length <= 0) {
        this.alertInfo('请先输入手机号');
        return;
      } else {
        if (CGI.checkTel(this.phone)) {
          return ret =  this.phone;
        } else {
          this.alertInfo('请输入正确的手机号');
          return;
        }
      }
    },
    startTrip() {
      var param = {
        wlanacname: wlanacname,
        wlanuserip: wlanuserip,
        wlanacip: wlanacip,
        wlanusermac: wlanusermac, 
      };
      if (this.checkPhone()) {
        param.phone = this.checkPhone();
        if (this.pwd.length <= 0) {
          this.alertInfo('请输入验证码');
          return;
        } else {
          param.code = this.pwd;
        }
      } else {
        return;
      }
      CGI.post('portal_login', param, (resp)=> {
        if (resp.errno === 0) {
          this.$store.state.info = resp.data;
          localStorage.info = resp.data;
          console.log(localStorage.info);
        } else {
          this.alertInfo(respdesc);
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




