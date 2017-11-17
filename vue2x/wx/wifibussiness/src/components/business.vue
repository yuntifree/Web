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
</style>
<template>
  <div id="login">
    <logined :show="getLogined" :phone="getPhone"></logined>
    <div class="busi-info">
      <img class="img100" src="http://img.yunxingzh.com/6991b924-e1ac-4cd5-a278-862c6841056b.png">
      <div class="top-text" v-if="infos.payed">
        <h2>我的WIFI有效期至</h2>
        <h3>{{infos.expire | dateFormat('yyyy-MM-dd')}}</h3>
        <h2>{{infos.expire | dateFormat('hh:mm')}}</h2>
        <h2 class="wel">欢迎开通WIFI服务</h2>
      </div>
      <div class="top-text no-bus" v-else>
        <h2>尚未开通WiFi服务</h2>
        <h2>欢迎开通</h2>
      </div>
    </div>
    <ul class="login-lists">
      <li class="col67">选择套餐</li>
      <li v-for="(list,idx) in infos.items" v-text="list.title" @click.stop="setActive(idx)" :class="{active:selIdx==idx}"></li>
    </ul>
    <button class="g-tac busi-btn" @click="openWifi">开通</button>
    <p class="busi-tip g-tac">单一WiFi账户仅支持单一绑定设备连接</p>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import logined from './lib/logined.vue'
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
      hasBus: true,
      selIdx: -1,
      dataReady: false,
      infos: {},
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
          this.dataReady = true;
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
        console.log(123);
      }
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    }
  }
}
</script>
