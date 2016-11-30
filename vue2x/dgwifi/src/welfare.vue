<style lang="scss">
@import './assets/css/reset.css','./assets/css/common.scss';
.welfare-container {
  @include containerSize(100%, 100%);
  overflow: hidden;
  padding-top: 1.2rem;
}
.welfare-text {
  font-size: 0.28rem;
  color: #787878;
  line-height: 180%;
}
.welfare-main {
  width: 77%;
  height: auto;
  padding: 0.28rem 0.42rem 0.56rem;
  margin: 1.24rem auto 0.3rem;
  border-radius: 0.16rem;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #979797;
}
.main-img {
  display: block;
  margin: 0 auto;
  @include containerSize(0.88rem, 0.88rem);
}
.input-img {
  display: block;
  padding: 0.28rem 0;
}
.input-img img {
  @include containerSize(0.4rem, 0.4rem);
}
.input-info input {
  display: block;
  width: 85%;
  padding: 0.28rem 0;
  border-bottom:  solid 1px #969696;
  font-size: 0.24rem;
}
.btn-join {
  display: block;
  @include containerSize(90%, 0.88rem);
  line-height: 0.88rem;
  text-align: center;
  background-color: #009cfb;
  border-radius: 0.16rem;
  margin: 0.4rem auto 0;
  color: #fff;
  font-size: 0.32rem;
}
</style>
<template>
  <div class="welfare-container">
    <p class="g-tac welfare-text">
      3万个免费WiFi<br/>打造全民WiFi服务<br/>你的生活，将因为我的到来，而万分精彩
    </p>
    <div class="welfare-main">
      <img class="main-img" src="../static/ico_addwifi.png">
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="name"><img src="../static/ico_wifiname.png"></label>
        <input class="g-fl g-tac" id="name" type="text" placeholder="请输入无线网络名称" v-model.trim="ssid">
      </div>
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="pwd"><img src="../static/ico_wificode.png"></label>
        <input class="g-fl g-tac" id="pwd" type="text" placeholder="请输入无线网络密码" v-model.trim="pwd">
      </div>
      <button class="btn-join" @click="clickJoin">参与公益</button>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>
<script>
import tip from './components/lib/tip.vue'
import weixin from './lib/wx.js'
import gps from './common/gpstransform.js'
import CGI from './lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 137;
var token = query.token || '6ba9ac5a422d4473b337d57376dd3488';
export default {
  data() {
    return {
      ssid: '',
      pwd: '',
      latitude: 0.00,
      longitude: 0.00,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false
      }
    }
  },
  components: {
    tip,
  },
  created() {
    weixin.init(this.wxReady);
  },
  methods: {
    clickJoin() {
      if (this.ssid.length < 0) {
        this.tipBox('请输入无线网络名称');
        return;
      }
      if (this.pwd.length < 0) {
        this.tipBox('请输入无线网络密码');
        return;
      }
      var param = {
        uid: uid,
        token: token,
        ssid: this.ssid,
        password: this.pwd,
        latitude: this.latitude,
        longitude: this.longitude
      }
      CGI.post('report_wifi', param, (resp)=> {
        if (resp.errno === 0) {
          this.tipBox('参与成功');
        } else {
          this.tipBox(resp.desc);
        }
      })

    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
    wxReady() {
        var _this = this;
        wx && wx.getLocation({
        success: function (res) {
          _this.latitude = parseFloat(res.latitude);
          _this.longitude = parseFloat(res.longitude);
          var _location = gps.trans2BD(_this.latitude, _this.longitude);
          _this.latitude = _location[0];
          _this.longitude = _location[1];
          alert(_this.latitude+ ',' +_this.longitude)
        },
        cancel: function (res) {
          alert('定位失败~');
        }
      });
    },
  }
}
  
</script>