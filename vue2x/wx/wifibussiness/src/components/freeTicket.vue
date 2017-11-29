<style lang="scss" scoped>
  @import '../assets/css/reset.css','../assets/css/common.scss';
  .top-img {
    @include containerSize(100%, auto);
  }
  .img100 {
    @extend %img100;
  }
  .busi-user {
    @extend %user;
  }
  .busi-btn {
    @extend %btn;
    margin-top: 0.44rem;
  }
  .tick-info {
    position: relative;
    @include containerSize(92%, auto);
    margin: 0.4rem auto 0.7rem;
    p {
      width: 100%;
      @include pos(top,50%, left,0);
      transform: translateY(-50%);
      text-align: center;
      font-size: 0.36rem;
      font-weight: 500;
      line-height: 1.5;
    }
  }
  .img100 {
    @extend %img100;
  }
</style>
<template>
  <div id="freeTicket">
    <logined :show="getLogined" :phone="getPhone"></logined>
    <div v-if="used">
      <div class="tick-info">
        <img class="img100" src="http://img.yunxingzh.com/69af00d2-d80b-44ca-97ab-3a88be219c4f.png">
        <p>您已领取过免费试用机会<br/>请开通WiFi服务</p>
      </div>
      <button class="g-tac busi-btn" @click="openWifi">开通WiFi</button>
    </div> 
    <div v-else>
      <div class="tick-info">
        <img class="img100" src="http://img.yunxingzh.com/11e0a10e-f2d7-43d4-8bea-37d789835761.png">
        <p>您有一次免费试用X天的机会</p>
      </div>
      <button class="g-tac busi-btn" @click="getFree">领取试用</button>
    </div> 
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'
import logined from './lib/logined.vue'

export default {
  name: 'freeTicket',
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
      hasFree: false,
      used: false,
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
      CGI.post('/trial/info', {}, (resp)=> {
        if (resp.errno === 0) {
          this.used = resp.used;
        } else {
          this.tip(resp.desc)
        }
      })
    },
    getFree() {
      CGI.post('/trial/apply',{}, (resp)=> {
        if (resp.errno === 0) {
          this.tip('领取成功')
          this.used = true
        } else {
          this.tip(resp.desc);
        }
      })
    },
    openWifi() {
      this.$router.push({name: 'business'})
    },
    goLink() {
      this.$router.push({name: 'login'})
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    }
  }
}
</script>
