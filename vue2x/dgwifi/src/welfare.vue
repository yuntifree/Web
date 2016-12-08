<style lang="scss">
@import './assets/css/reset.css','./assets/css/common.scss';
.welfare-container {
  @include containerSize(100%, 100%);
  overflow: hidden;
  padding-top: 0.6rem;
}
.welfare-slogon {
  display: block;
  width: 40%;
  height: auto;
  margin: 0 auto 0.4rem;
}
.welfare-text {
  font-size: 0.28rem;
  color: #787878;
  line-height: 180%;
  position: relative;
}
.text-bg {
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: -0.6rem;
}
.welfare-main {
  margin: 1.01rem auto 0.3rem;
}
.main-img {
  display: block;
  margin: 0 auto;
  @include containerSize(0.88rem, 0.88rem);
}
.input-info {
  width: 65.6%;
  margin: 0 auto;
}
.input-img {
  display: block;
  padding: 0.28rem 0;
}
.input-img img {
  @include containerSize(0.52rem, 0.52rem);
}
.input-info input {
  display: block;
  width: 85%;
  padding: 0.28rem 0;
  border-bottom:  solid 1px #969696;
  font-size: 0.24rem;
  border-radius: 0;
}
.btn-join {
  display: block;
  @include containerSize(70%, 0.88rem);
  line-height: 0.88rem;
  text-align: center;
  background-color: #009cfb;
  border-radius: 0.16rem;
  margin: 0.72rem auto 0;
  color: #fff;
  font-size: 0.32rem;
}
</style>
<template>
  <div class="welfare-container">
    <img class="welfare-slogon" src="http://img.yunxingzh.com/2ba93aa0-ab3a-48b1-afd9-2923cfbcb966.png">
    <p class="g-tac welfare-text">
      东莞无线是由东莞市政府全力打造的公益项目<br/>
      旨在帮助东莞市民随时随地，一键免费上网<br/>
      目前已覆盖全市政府/医院/学校等公共区域<br/>
      我们希望您一起加入WiFi公益项目<br/>
      只需将富余的WiFi密码分享给大家<br/>
      便为构建东莞智慧城市出了一份力
      <img class="text-bg" src="http://img.yunxingzh.com/6b0c29f5-f230-475c-9297-89da57e0e131.png">
    </p>
    <div class="welfare-main">
      <!--img class="main-img" src="../static/ico_addwifi.png"-->
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="name"><img src="../static/ico_wificode.png"></label>
        <input class="g-fl g-tac" id="name" type="text" placeholder="请输入无线网络名称" v-model.trim="ssid">
      </div>
      <div class="input-info g-clearfix">
        <label class="input-img g-fl" for="pwd"><img src="../static/ico_wifiname.png"></label>
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
        },
        cancel: function (res) {
          alert('定位失败~');
        }
      });
    },
  }
}
  
</script>
