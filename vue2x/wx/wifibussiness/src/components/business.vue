<style lang="scss" scoped>
  @import '../assets/css/reset.css','../assets/css/common.scss';
  .top-img {
    @include containerSize(100%, auto);
  }
  .img100 {
    @extend %img100;
  }
  .busi-info {
    position: relative;
  }
  .top-text {
    @include containerSize(100%, auto);
    @extend %Absolute0;
    padding-top: 0.44rem;
    color:#171717;
    h2 {
      font-size: 0.36rem;
      text-align: center;
      margin-bottom: 0.24rem;
      &.wel {
        margin-top: 0.4rem;
      }
    }
    h3 {
      font-size: 0.64rem;
      text-align: center;
      margin: 0.12rem 0 0.1rem;
    }
  }
  .no-bus {
    padding-top: 1.24rem;
  }
  .login-lists {
    @include containerSize(100%, auto);
    li {
      @include containerSize(100%, 0.85rem);
      line-height: 0.85rem;
      text-align: center;
      border-bottom: 1px solid #d2d2d2;
      &.active {
        color: #679bfd;
        border: 2px solid #79aefe;
      }
    }
  }
  .busi-btn {
    @extend %btn;
    margin-top: 0.44rem;
  }
  .busi-tip {
    @extend %text-tip;
    margin-top: 0.24rem;
  }
  .col67 {
    color: #679bfd;
  }
  .busi-result {
    @extend  %result;
  }
</style>
<template>
  <div id="login">
    <logined :show="getLogined" :phone="getPhone"></logined>
    <div class="busi-info">
      <img class="img100" src="http://img.yunxingzh.com/6991b924-e1ac-4cd5-a278-862c6841056b.png">
      <div class="top-text" v-if="infos.payed">
        <h2>WIFI有效期至</h2>
        <h3>{{infos.expire | dateFormat('yyyy-MM-dd')}}</h3>
        <!--h2>{{infos.expire | dateFormat('hh:mm')}}</h2-->
        <h2 class="wel">{{welText}}</h2>
      </div>
      <div class="top-text no-bus" v-else>
        <h2>尚未开通WiFi服务</h2>
        <h2>欢迎开通</h2>
      </div>
    </div>
    <ul class="login-lists">
      <li class="col67">选择套餐</li>
      <li v-if="infos.items" v-for="(list,idx) in infos.items" v-text="list.title" @click.stop="setActive(idx)" :class="{active:selIdx==idx}"></li>
    </ul>
    <button class="g-tac busi-btn" @click="openWifi">{{btnText}}</button>
    <p class="busi-tip g-tac">只能同时登陆一台手机噢</p>
    <div class="busi-result" v-if="success">
      <img class="result-ico" src="http://img.yunxingzh.com/06f2ccc4-d076-424d-a7d2-a6d78cf308ee.png" alt="">
      <p class="result-text g-tac">支付成功</p>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import logined from './lib/logined.vue'
import CGI from '../lib/cgi'
import weixin from '../lib/wx.js'

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
      hasBus: true,
      selIdx: -1,
      dataReady: false,
      infos: {},
      success: false,
      btnText: '',
      welText: ''
    }
  },
  computed: {
    getLogined() {
      return this.$store.state.logined;
    },
    getPhone() {
      return this.$store.state.phone;
    }
  },
  components: {
    tip,
    logined
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      CGI.post('/business/info', {}, (resp)=> {
        if (resp.errno===0) {
          this.infos = resp;
          this.getBtntext();
        } else {
          this.tip(resp.desc);
        }
      })
    },
    setActive(idx) {
      this.selIdx = idx;
    },
    openWifi() {
      if (this.selIdx === -1) {
        this.tip('请先选择套餐')
      } else{
        var param = {
          id: this.infos.items[this.selIdx].id,
          price: this.infos.items[this.selIdx].price
        }
        CGI.post('/pay/wx_pay', param, (resp)=>{
          if (resp.errno === 0) {
            this.wxPay(resp);
          } else {
            this.tip(resp.desc);
          }
        })
        
      }
    },
    wxPay(param) {
      var _this = this;
      if (this.$store.state.wxReady) {
        wx && wx.chooseWXPay({
          timestamp: param.timeStamp, 
          nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
          package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: param.paySign, // 支付签名
          success: function (res) {
              _this.getData();
              _this.success = true;
              setTimeout(function() {
                _this.success = false;
              },3000)
          },
          fail: function(res) {
            _this.tip('pay fail')
          }
        })
      } else {
        this.tip('请在微信公众号页面打开')
      }
    },
    getBtntext() {
      var btnText  = '', 
          welText = '';
      if (this.infos.payed) {
        var nowTime = new Date().getTime();
        var expire = this.infos.expire;
        expire = new Date(expire.replace(/-/g, '/')).getTime();
        if (nowTime < expire) {
          btnText = '续费';
          welText = '欢迎续费'
        } else {
          btnText = '开通';
          welText = '欢迎开通WiFi服务'
        }
      } else {
        btnText = '开通'
      }
      this.btnText = btnText;
      this.welText = welText;
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    }
  }
}
</script>
