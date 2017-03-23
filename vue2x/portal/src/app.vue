
<template>
  <div class="app">
    <div class="banner" v-if="infos.banners &&infos.banners.length>0">
      <swipe class="my-swipe">
        <swipe-item v-for="banner in infos.banners">
          <img class="banner-img" :src="banner.img"  @click="openLink(banner)">
        </swipe-item>
      </swipe>
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
import Hello from './components/wifiinfo'
import { Swipe, SwipeItem } from 'vue-swipe';
import tip from './components/lib/tip.vue'
import scrollnews from './components/scrollNews.vue'
import urban from './components/lib/urban.vue'
import sermenu from './components/lib/sermenu.vue'
//require('./common/transform.js');
//var el;
import CGI from './lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
//var type = ~~(query.type) || 0;
var adtype = ~~(query.adtype) || 0;
var portaltype = ~~(query.portaltype) || 0;
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
      }
      CGI.post('get_portal_conf', param, (resp)=> {
        if (resp.errno === 0) {
          this.infos = resp.data;
        } else {
          console.log(resp);
          //this.tipBox(resp.desc);
        }
      })
    },
    openLink(ban) {
      location.href = ban.dst;
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    i},
  }
}
</script>

<style lang="scss">
@import './assets/css/swipe.css','./assets/css/common.scss';
.app {
  max-width: 750px;
  margin: 0 auto;
}
.banner {
  width: 100%;
  height: 3.2rem;
  overflow:hidden;
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
</style>



