<style lang="scss" scoped>
@import '../assets/css/common.scss';
.info {
  @include containerSize(100%, auto);
  background-color: #fff;
}
.info-top {
  @include containerSize(100%, 3.36rem);
  background-color: $baseColor;
  position: relative;
  padding-top: 0.3rem;
}
.info-logo {
  @include containerSize(0.98rem, auto);
  display: block;
  position: absolute;
  top: 0.2rem;
  left: 0.24rem;
}
.info-weather {
  position: absolute;
  top: 0.2rem;
  right: 0.24rem;
  color: #fff;
}
.weacher-icon {
  @include containerSize(0.36rem, 0.36rem);
  display: block;
}
.weather-temp {
  line-height: 0.36rem;
  margin: 0 0.1rem;
}
.weather-info,
.weather-temp{
  line-height: 0.36rem;
}
.circle-link {
  @include containerSize(2.4rem, 2.4rem);
  margin: 0 auto;
  position: relative;
  padding-top: 0.2rem;
}
.circle-link span,
.circle-link .oval-copy-3 {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  -moz-border-radius: 50%;
}
.oval {
  @include containerSize(100%, 100%);
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-1,
.oval-around {
  @include containerSize(2rem, 2rem);
}
.oval-around {
  display: block;
  margin: 0 auto;
}
.oval-copy-1 {
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-2 {
  @include containerSize(1.44rem, 1.44rem);
  background-color: rgba(255,255,255,0.8);
  color: $baseColor;
  font-size: 0.4rem;
  line-height: 1.44rem;
}
.oval-copy-2 i {
  font-size: 0.24rem;
}
.oval-copy-3 {
  @include containerSize(0.58rem, 0.58rem);
}
.oval-animate {
  animation:mymove linear 3s infinite;
  -webkit-animation:mymove linear 3s infinite;
  -ms-animation:mymove linear 3s infinite;
  -o-animation:mymove linear 3s infinite;
  -moz-animation:mymove linear 3s infinite;
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
}

@keyframes mymove{
  0% {
    transform: rotate(0deg); transform-origin: 50% 50%;}
  100% {transform: rotate(360deg);transform-origin: 50% 50%;}
}

@-webkit-keyframes mymove {
  0% {-webkit-transform: rotate(0deg);-webkit-transform-origin: 50% 50%;}
  100% {-webkit-transform: rotate(360deg);-webkit-transform-origin: 50% 50%;}
}
@-moz-keyframes mymove{
  0% {
    -moz-transform: rotate(0deg); -moz-transform-origin: 50% 50%;}
  100% {-moztransform: rotate(360deg);-moz-transform-origin: 50% 50%;}
}
@-ms-keyframes mymove{
  0% {
    -ms-transform: rotate(0deg); -ms-transform-origin: 50% 50%;}
  100% {-ms-transform: rotate(360deg);-ms-transform-origin: 50% 50%;}
}
@-o-keyframes mymove{
  0% {
    -o-transform: rotate(0deg); -o-transform-origin: 50% 50%;}
  100% {-o-transform: rotate(360deg);-o-transform-origin: 50% 50%;}
}

.link-text {
  font-size: 0.24rem;
  color: #fff;
  margin-top: 0.18rem;
}
.menu-title {
  position: relative;
  padding: 0.42rem 0 0;
}
.menu-line {
  display: block;
  @include containerSize(100%, 1px);
  background-color: #dcdcdc;
}
.menu-text {
  padding: 0 0.22rem;
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
.toutiao-text {
  top: 50%;
}
.menu-text img{
  display: block;
  @include containerSize(1.24rem, 0.24rem);
}
.menu-list {
  @include containerSize(100%, auto);
  padding: 0.42rem 0.42rem 0;
}
.title-toutiao {
  padding: 0.12rem 0 0.18rem 0;
}
.list-item {
  @include containerSize(0.84rem, auto);
  margin-bottom: 0.3rem;
}
@media only screen and (max-width: 768px) {
    .list-item {
        margin-left: 9%;
    }
}
@media only screen and (min-width: 769px){
    .list-item {
        margin-left: 12%;
    }
}
.list-item:nth-child(5n+1) {
  margin-left: 0;
}
.list-item img {
  display: block;
  @include containerSize(0.84rem, 0.84rem);
}
.title-name {
  display: block;
  width: 100%;
  margin-top: 0.06rem;
  font-size: 0.28rem;
  color: #3c3c3c;
}
</style>
<template>
  <div class="info">
    <div class="info-top">
      <img class="info-logo"　src="http://img.yunxingzh.com/91dc8c9f-1658-46a5-a9fd-52c2e66df151.png">
      <div class="info-weather g-clearfix">
        <img class="weacher-icon g-fl" :src="weatherImg">
        <span class="weather-temp g-fl">{{weather.temp}}&#176;C</span>
        <span class="weather-info g-fl">{{weather.info}}</span>
      </div>
      <div class="circle-link">
        <span class="oval"></span>
        <span class="oval-copy-1"></span>
        <img class="oval-around" v-show="showCfg" :class="{'oval-animate':showCfg}" src="http://img.yunxingzh.com/180afd13-7e6b-4006-9d00-d80e227c46fe.png">
        <span class="oval-copy-2 g-tac">
          <b v-if="showCfg">{{timeTxt}}<i>秒</i></b>
          <img v-else class="oval-copy-3"　src="http://img.yunxingzh.com/e04e6e9d-d24b-4e00-be57-1224efd426df.png">
        </span>
      </div>
      <p class="g-tac link-text">{{showCfg ? '正在连接免费WiFi...' : '已连接东莞无限免费WiFi'}}</p>
    </div>
    <!--p>{{queryParam}}</p-->
    <div>
      <div class="menu-title">
        <i class="menu-line"></i>
        <div class="menu-text">
          <img src="http://img.yunxingzh.com/0854372e-aff2-46da-b894-a4b82ff50520.png">
        </div>
      </div>
      <ul class="menu-list g-clearfix">
        <li class="g-fl list-item" v-for="(list,index) in menuList" @click="openLink(list.url,index)">
          <img :src="list.icon">
          <span class="g-tac title-name" v-text="list.text"></span>
        </li>
      </ul>
      <div class="menu-title title-toutiao">
        <i class="menu-line"></i>
        <div class="menu-text toutiao-text">
          <img src="http://img.yunxingzh.com/5bd91184-f4cb-40f1-9013-07fb636e288b.png">
        </div>
      </div>
      <newslist></newslist>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import news from './news.vue'
import tip from './lib/tip.vue'
import newslist from './lib/newslist.vue'
import CGI from '../lib/cgi.js'

var query = CGI.query();
var loginfrom = query.loginfrom || 0;
var uid = ~~(query.uid) || 0;
var token = query.token || '';
export default {
  name: 'info',
  data() {
    return {
      showCfg: false,
      timeTxt: 5,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      first: true,
      dataReady: false,
      weatherIcon: ['http://img.yunxingzh.com/c7f30e46-f5aa-4a16-a611-1c7b99f5ec01.png',
                    'http://img.yunxingzh.com/2c8898ab-78c2-4002-b8a7-ae0579e8bb66.png',
                    'http://img.yunxingzh.com/881bfc97-7849-44a2-b585-c197a6917e96.png',
                    'http://img.yunxingzh.com/3a961ff5-2530-4c10-b17c-aff36013b5db.png'],
      weather: {},
      weatherImg: '',
      queryParam: '',
      menuList: [{
        icon: 'http://img.yunxingzh.com/c5f0475a-3f1f-4c80-9f33-90bd33af7d75.png',
        text: '东莞',
      },{
        icon: 'http://img.yunxingzh.com/126167e8-917a-4d5d-91e7-537e28c0ad03.png',
        text: '热点',
      },{
        icon: 'http://img.yunxingzh.com/548d971b-dac4-4bf7-bbac-5b69e4f325c0.png',
        text: '查询',
      },{
        icon: 'http://img.yunxingzh.com/efd20edd-7a3d-4c62-a523-90110da4ba74.png',
        text: '招聘',
        url: 'http://jump.luna.58.com/i/29a5',
      },{
        icon: 'http://img.yunxingzh.com/0dd7ec0a-37f5-4448-a253-acd3320279eb.png',
        text: '二手',
        url: 'http://jump.luna.58.com/i/29a7',
      },{
        icon: 'http://img.yunxingzh.com/a3524233-2acc-47c5-92a3-c87c764bb114.png',
        text: '租房',
        url: 'http://jump.luna.58.com/i/29a4',
      },{
        icon: 'http://img.yunxingzh.com/73403b79-8eb4-4ccf-b169-25bee5cdbc30.png',
        text: '更多',
        url: 'http://jump.luna.58.com/i/29a3',
      }]
    }
  },
  components: {
    tip,
    newslist,
  },
  created() {
    this.$store.state.uid = uid;
    this.$store.state.token = token;
    if (loginfrom) {
      localStorage.setItem('portal_uid', uid);
      localStorage.setItem('portal_token', token); 
      this.$router.replace({name:'home'});
    }
  },
  mounted() {
    this.$nextTick(()=> {
      if (loginfrom) {
        this.showCfg = true;
        this.countdown();
      }
      this.getData();
      this.dataReady = true;
    })
  },
  methods: {
    getData() {
      var param = {
        uid: this.$store.state.uid || ~~(localStorage.getItem('portal_uid')),
        token: this.$store.state.token || localStorage.getItem('portal_token')
      }
      this.queryParam = JSON.stringify(param);
      CGI.post('get_weather_news', param, (resp)=> {
        if (resp.errno === 0) {
          this.weather = resp.data.weather;
          var weatherType = this.weather.type || 0; 
          this.weatherImg = this.weatherIcon[weatherType];
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    openLink(url,idx) {

      switch (idx){
        case 0:
          this.$store.state.newsname = 'newslist';
          this.$store.state.tabidx = idx;
          this.$router.push({name: 'news'});
          break;
        case 1:
          this.$store.state.newsname = 'hotspot';
          this.$store.state.tabidx = idx;
          this.$router.push({name: 'hotspot'});
          break;
        case 2:
          this.$store.state.tabidx = 2;
          this.$router.push({name: 'service'});
          break;
        default: 
          this.$store.state.tabidx = 3;
          location.href = url;
      } 
    },
    countdown() {
      this.timer = setInterval(()=> {
        this.timeTxt--;
        if (this.timeTxt == 0) {
          this.showCfg = false;
          clearInterval(this.timer);
        };
      }, 1000)
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
