<style lang="scss">
  @import './assets/css/reset.css','assets/css/common.scss';
  html,body,#index {
    @include containerSize(100%,auto);
    min-height: 100%;
    background-color: #fff;
  }
  .top-img {
    width: 100%;
    height: auto;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .index-list{
    @extend %text-desc;
    @include containerSize(100%, auto);
    position: relative;
    border-bottom: 1px solid #d2d2d2;
    padding: 0.54rem 0.3rem;
  }
  .try-free {
    position: relative;
    i {
      display: block;
      @include containerSize(0.14rem, 0.14rem);
      @include pos(top,-0.04rem,right,-0.2rem);
      background-color: #ff6666;
      border-radius: 50%;
    }
  }
  .right{
    @include containerSize(0.4rem,0.4rem);
    @include pos(top,50%,right,0.3rem);
    @include marGin(top,-0.2rem);
  }
  .right-arrow1,.right-arrow2{
    width:0;
    height:0;
    display:block;
    position:absolute;
    left:0;
    top:0;
    border-top:0.2rem transparent dashed;
    border-right:0.2rem transparent dashed;
    border-bottom:0.2rem transparent dashed;
    border-left:0.2rem white solid;
    overflow:hidden;
  }
  .right-arrow1{
    left:2px;/*重要*/
    border-left:0.2rem #b9b9b9 solid;
  }
  .right-arrow2{
    border-left:0.2rem white solid;
  }
  .main-tip {
    @extend %text-tip;
    margin-top: 0.88rem;
  }
  .img100 {
    @extend %img100;
  }
</style>
<template>
  <div id="index">
    <logined :show="getLogined" :phone="getPhone"></logined>
    <template v-if="infos.length>0">
      <carousel :auto="3000">
          <div v-for="info in infos" @click="goBanner(info)"><img class="img100" :src="info.img" alt=""></div>
      </carousel>
    </template>
    <ul class="main-list">
      <li class="index-list" v-for="(list,idx) in lists" @click="goLink(idx)">
        <h2 class="list-title" ><img class="list-img" :src="list.img"><span class="try-free">{{list.title}}<i v-if="idx===1"></i></span></h2>
        <p class="list-txt" v-text="list.txt"></p>
        <div class="arrow-right arrow-box">
            <b class="right"><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
        </div>
      </li>
    </ul>
    <p class="main-tip g-tac">单一WiFi账户仅支持单一绑定设备连接</p>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import carousel from 'vue-m-carousel'

import tip from './components/lib/tip.vue'
import logined from './components/lib/logined.vue'
import CGI from './lib/cgi'

export default {
  name: 'index',
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
      getlogin: false,
      infos: [],
      lists: [{
        img: './static/images/ico_wifi.png',
        title: 'WIFI业务',
        txt: 'WiFi开通、缴费、有效期查询',
        router: 'login'
      },{
        img: './static/images/ico_free.png',
        title: '免费试用',
        txt: '每个手机号可免费体验WiFi2天',
        router: 'login'
      },{
        img: 'http://img.yunxingzh.com/9a9d4cdd-eb77-45f6-a166-583a80ced1c3.png',
        title: '遇到问题？',
        txt: '问题反馈与建议等',
        router: 'question'
      }]
    }
  },
  computed: {
    getLogined() {
      return this.$store.state.logined;
    },
    getPhone() {
      return this.$store.state.phone;
    },
  },
  components: {
    tip,
    carousel,
    logined
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      CGI.post('/banner/get', {}, (resp)=> {
        if (resp.errno === 0) {
          if (resp.infos.length > 0) {
            this.infos = resp.infos;
          }
        } else {
          this.tip(resp.desc)
        }
      })
    },
    goLink(idx) {
      var logined = this.$store.state.logined;
      if (logined) {
        if (idx === 0) {
          this.lists[0].router = 'business';
        } else if (idx === 1){
          this.lists[1].router = 'freeticket';
        }
      } else {
        if (idx === 0) {
          this.$store.state.routerName = 'business';
        } else if (idx === 1){
          this.$store.state.routerName = 'freeticket';
        }
      }
      var url = this.lists[idx].router;
      this.$router.push({name: url});
    },
    goBanner(info) {
      location.href = info.dst;
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    }
  }
}
</script>
