<style lang="scss" scoped>
  @import '../assets/css/reset.css','../assets/css/common.scss';
  .top-img {
    @include containerSize(100%, auto);
  }
  .img100 {
    @extend %img100;
  }
  .login-main {
    @include containerSize(92%, auto);
    margin: 0.24rem auto 0.44rem;
    border: 1px solid #b4b4b4;
    border-radius: 0.4rem;
  }
  .login-ipt {
    position: relative;
    padding: 0.28rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: 1px solid #d2d2d2;
    &:last-child {
      border-bottom: 0;
    }
    label {
      display: block;
      @include containerSize(0.44rem, auto);
    }
    input {
      width: 86%;
      margin-left: 0.1rem;
      font-size: 0.32rem;
      color: #171717;
      &::-webkit-input-placeholder {
        color: #a5a5a5;
      }
    }
    .ads-sel{
      width: 86%;
      color: #a5a5a5;
      font-size: 0.32rem;
      margin-left: 0.1rem;
    }
    .col17 {
      color : #171717;
    }
    .ipt-sel {
      @include containerSize(0.44rem, auto);
      @include pos(top,50%,right,0.3rem);
      transform: translateY(-50%);
    }
  }
  .get-code {
    display: block;
    @include containerSize(1.9rem, 0.76rem);
    line-height: 0.76rem;
    @include pos(top,50%,right,0.3rem);
    margin-top: -0.38rem;
    border-radius: 0.2rem;
    background-color: #deebff;
    color: #2063ff;
  }
  .login-btn {
    display: block;
    @include containerSize(92%, 0.96rem);
    margin: 0 auto;
    line-height: 0.96rem;
    font-size: 0.36rem;
    color: #fff;
    background-color: #79aefe;
    border: solid 1px #6e89fe;
    border-radius: 0.2rem;
  }
  .ads-lists {
    position: fixed;
    top: 0;
    left: 0;
    @include containerSize(100%, 100%);
    overflow: auto;
    background-color: #fff;
    li {
      @extend %text-desc;
      @include containerSize(100%, auto);
      padding: 0.32rem 0.4rem;
      border-bottom: 1px solid #d4d4d4;
      &.cur {
        background-color: rgba(0,0,0,0.1);
      }
    }
  }
  .top-desc {
    @extend %Absolute0;
    width: 100%;
    h2 {
      font-size: 0.36rem;
      font-weight: 500;
      text-align: center;
      margin-top: 0.34rem;
    }
    p {
      font-size: 0.3rem;
      text-align: center;
    }
  }
</style>
<template>
  <div id="login">
    <div class="top-img">
      <img class="img100" src="http://img.yunxingzh.com/9c8d16b2-7b6e-467f-a73a-feb70213f4b5.png">
      <div class="top-desc">
        <h2>请登录WiFi营业厅以继续</h2>
        <p>初次登录将自动注册</p>
      </div>
    </div>
    <ul class="login-main">
      <li class="login-ipt">
        <label for="phone"><img class="img100" src="http://img.yunxingzh.com/286aca0d-771f-48da-b8f4-cb9a3fb1c407.png"></label>
        <input type="text"  ref="phone" v-model.trim="phone" id="phone" placeholder="请输入正确的手机号">
      </li>
      <li class="login-ipt">
        <label><img class="img100" src="http://img.yunxingzh.com/2dc38193-0947-4b9e-9548-27c4423a9afb.png"></label>
        <p class="ads-sel g-ellipsis" @click="adsShow=true" :class="{col17:adsChecked}">{{selVal}}</p>
        <div class="ipt-sel"><img class="img100" src="http://img.yunxingzh.com/f9d4921e-b080-4c47-b03c-9d2856be7ae0.png"></div>
      </li>
      <li class="login-ipt">
        <label for="code"><img class="img100" src="http://img.yunxingzh.com/ee2f8065-d1bb-4b9e-ace7-7faaa720b7b0.png"></label>
        <input type="text" id="code" v-model.trim="code" name="" placeholder="请输入收到的验证码">
        <span class="get-code g-tac" @click.stop.prevent="getCode">{{codetext}}</span>
      </li>
    </ul>
    <button class="g-tac login-btn" @click="login">登录</button>
    <ul class="ads-lists" v-show="adsInfo.length>0 && adsShow">
      <li  class="list-info" v-for="(ad,idx) in adsInfo" @click="checkAds(idx,ad)" :class="selIdx==idx ? 'cur' : ''">
        <h2 class="list-tit"><img src="../../static/images/ico_wifi2.png"alt="">{{ad.name}}</h2>
        <p class="g-ellipsis">{{ad.address}}</p>
      </li>
    </ul>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

export default {
  name: 'login',
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
      selIdx: -1,
      phone: '',
      ads: '',
      code: '',
      codetext: '获取验证码',
      adsShow: false,
      adsChecked: false,
      adsInfo: [],
      selVal: '请选择所在区域'
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      CGI.post('/park/get', {}, (resp)=> {
        if (resp.errno === 0) {
          if (resp.infos.length>0) {
            this.adsInfo = resp.infos;
          }
        } else {
          this.tip(resp.desc);
        }
      })
    },
    checkAds(idx,row) {
      this.selIdx = idx;
      this.selVal = row.address;
      this.adsShow = false;
      this.adsChecked = true;
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    },
    getCode() {
      var _this = this;
      if (this.makePhone()) {
        CGI.post('/phone/getcode', {phone: this.phone}, (resp)=> {
          if (resp.errno === 0) {
            this.tip('获取成功');
            var count = 60;
            var timer = setInterval(function(){
              count--;
              _this.codetext = count + 's'
            },1000)
            if (count == 0) {
              clearInterval(timer);
              _this.codetext = '获取验证码'
            }
          }
        })
      }
    },
    login() {
      var ret = this.makePhone();
      if (this.code.length>0 && ~~this.code) {
        console.log(ret)
      } else {
        this.tip('请输入请输入验证码')
        ret = false;
      }

      if (ret && this.adsChecked) {
        var param = {
          phone: this.phone + '',
          code: ~~this.code,
          park: this.adsInfo[this.selIdx].id
        }
        CGI.post('/hall/login', param, (resp)=> {
          if (resp.errno === 0) {
            this.tip('登录成功');
            CGI.setCookie('phone', this.phone);
            this.$store.state.logined = true;
            this.$store.state.phone = this.phone;
            this.phone = '';
            this.code = '';
            this.selVal = '请选择所在区域';
            this.selIdx = -1;
            this.$router.replace('business');
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    makePhone() {
      var ret = true;
      if (this.phone.length> 0) {
        if (!CGI.checkTel(this.phone)) {
          this.tip('请输入正确的手机号');
          ret = false;
        }
      } else {
        this.$refs.phone.focus();
        this.tip('请输入手机号');
        ret = false;
      }
      return ret;
    }
  }
}
</script>
