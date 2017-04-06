
<template>
  <div class="app">
    <div class="banner" v-if="infos.banners &&infos.banners.length>0">
      <swipe class="my-swipe">
        <swipe-item v-for="banner in infos.banners">
          <img class="banner-img" :src="banner.img"  @click="openLink(banner)">
          <p class="info-unit g-tar" v-if="!banner.type">{{infos.unit}}</p>
        </swipe-item>
      </swipe>
      <p class="info-logo g-clearfix">
          <img class="g-fl" src="http://img.yunxingzh.com/3816d7d7-acb1-4357-ace0-b0e674537a32.png">
          <span>您已连上东莞无限免费WiFi</span>
      </p>
      <div class="info-weather g-clearfix">
        <img class="weacher-icon g-fl" :src="weatherImg">
        <span class="weather-temp g-fl">{{weather.temp}}&#176;C</span>
        <span class="weather-info g-fl">{{weather.info}}</span>
      </div>
    </div>
    <urban v-if="infos.urbanservices && infos.urbanservices.length>0" 
            :urbandata="infos.urbanservices">
    </urban>
    <urban v-if="infos.hospitalintros && infos.hospitalintros.length>0" 
            :urbandata="infos.hospitalintros">
    </urban>
    <sermenu v-if="infos.services && infos.services.length>0" 
            :serdata="infos.services"></sermenu> 
    <scrollnews></scrollnews>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
import tip from '../lib/tip.vue'
import scrollnews from './scrollNews.vue'
import urban from '../lib/urban.vue'
import sermenu from '../lib/sermenu.vue'
//require('./common/transform.js');
//var el;
import CGI from '../../lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
//var type = ~~(query.type) || 0;
var adtype = ~~(query.adtype) || 0;
var portaltype = ~~(query.portaltype) || 0;
var unid = ~~(query.unid) || 0;
export default {
  name: 'app',
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem,
    'tip': tip,
    'urban': urban,
    'scrollnews': scrollnews,
    'sermenu': sermenu
  },
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      infos: {},
      weatherIcon: ['http://img.yunxingzh.com/c7f30e46-f5aa-4a16-a611-1c7b99f5ec01.png',
                    'http://img.yunxingzh.com/2c8898ab-78c2-4002-b8a7-ae0579e8bb66.png',
                    'http://img.yunxingzh.com/881bfc97-7849-44a2-b585-c197a6917e96.png',
                    'http://img.yunxingzh.com/3a961ff5-2530-4c10-b17c-aff36013b5db.png'],
      weather: {},
      weatherImg: '',
    }
  }, 
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  } ,
  methods: {
    getData() {
      var param = {
        uid: uid,
        token: token,
        adtype: adtype,
        portaltype: portaltype,
        unid: unid,
      }
      CGI.post('get_portal_conf', param, (resp)=> {
        if (resp.errno === 0) {
          this.infos = resp.data;
        } else {
          this.tipBox(resp.desc);
        }
      })
      var p = {
        uid: uid,
        token: token,
      }
      CGI.post('get_weather_news', p, (resp)=> {
        if (resp.errno === 0) {
          this.weather = resp.data.weather;
          var weatherType = this.weather.type || 0;
          this.weatherImg = this.weatherIcon[weatherType];
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    openLink(ban) {
      if (ban.dst.length > 0) {
        location.href = ban.dst;
      }
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    i},
  }
}
</script>

<style lang="scss">
@import '../../assets/css/swipe.css','../../assets/css/common.scss';
.app {
  max-width: 750px;
  margin: 0 auto;
}
.banner {
  width: 100%;
  height: 3.1rem;
  overflow:hidden;
  position: relative;
}
.my-swipe {
  color: #fff;
  font-size: 30px;
  text-align: center;
}i
.my-swipe img {
  width: 100%;
  height: auto;
}
.test-touch {
  width: 300px;
  height: 300px;
  background-color: #f00;
}
.banner-img {
    width: 100%;
    height: auto;
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
.info-logo {
  width: 60%;
  max-width: 60%;
  position: absolute;
  top: 0.2rem;
  left: 0.24rem;
}
.info-logo img {
  @include containerSize(0.4rem, auto);
  display: block;
}
.info-logo span {
  display: block;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.4rem;
  padding-left: 0.5rem;
}
.info-unit {
  width: 100%;
  display: block;
  padding-right: 0.4rem;
  color: #fff;
  font-size: 0.32rem;
  line-height:0.76rem;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
}
</style>



