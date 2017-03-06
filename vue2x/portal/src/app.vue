
<template>
  <div class="app">
    <div class="banner" v-if="infos.banners &&infos.banners.length>0">
      <swipe class="my-swipe">
        <swipe-item class="slide1" v-for="banner in infos.banners">
          <img :src="banner.img">
        </swipe-item>
      </swipe>
    </div>
    <urban v-if="infos.urbanservices && infos.urbanservices.length>0" 
            :urbandata="infos.urbanservices">
    </urban>
    <urban v-if="infos.hospitalintros && infos.hospitalintros.length>0" 
            :urbandata="infos.hospitalintros">
    </urban>
    <sermenu v-if="services && services.length>0" 
            :serdata="services"></sermenu> 
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
var type = ~~(query.type) || 0;
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
      lists: ['新闻','热点','娱乐','查询','直播','招聘','二手','租房','家政','更多'],
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      infos: {},
      services: [{
        name: '患者服务',
        items:[{
          img: "http://img.yunxingzh.com/5acbd849-93c2-4a2b-b461-2270fc80bfdc.png",
          dst: "https://jumpluna.58.com/i/LsnNUMya1luDwQM",
          title: "招聘",
          id: 1
        },{
          img: "http://img.yunxingzh.com/98baedd0-fdad-4f08-92eb-4b99907e3168.png",
          dst: "https://jumpluna.58.com/i/LsnO3bh2J9tMeMj",
          title: "二手",
          id: 2
        }, {
          img: "http://img.yunxingzh.com/b119f07f-3666-4b4f-9218-a3bb1a9f7251.png",
          dst: "https://jumpluna.58.com/i/LsoLp0La1luDubj",
          title: "租房",
          id: 3
        }, {
          img: "http://img.yunxingzh.com/43dcf196-fdca-4817-82c5-1b209bb22ec1.png",
          dst: "https://jumpluna.58.com/i/LsnOzrKa1luDubj",
          title: "家政",
          id: 4
        }, {
          img: "http://img.yunxingzh.com/4774e039-c120-4eee-8c4f-e3bc55a60205.png",
          dst: "https://jumpluna.58.com/i/LsnPDcUa1luDwQM",
          title: "更多",
          id: 5
        },{
          img: "http://img.yunxingzh.com/5acbd849-93c2-4a2b-b461-2270fc80bfdc.png",
          dst: "https://jumpluna.58.com/i/LsnNUMya1luDwQM",
          title: "招聘",
          id: 6
        }, {
          img: "http://img.yunxingzh.com/98baedd0-fdad-4f08-92eb-4b99907e3168.png",
          dst: "https://jumpluna.58.com/i/LsnO3bh2J9tMeMj",
          title: "二手",
          id: 7
        }, {
          img: "http://img.yunxingzh.com/b119f07f-3666-4b4f-9218-a3bb1a9f7251.png",
          dst: "https://jumpluna.58.com/i/LsoLp0La1luDubj",
          title: "租房",
          id: 8
        }, {
          img: "http://img.yunxingzh.com/43dcf196-fdca-4817-82c5-1b209bb22ec1.png",
          dst: "https://jumpluna.58.com/i/LsnOzrKa1luDubj",
          title: "家政",
          id: 9
        }, {
          img: "http://img.yunxingzh.com/4774e039-c120-4eee-8c4f-e3bc55a60205.png",
          dst: "https://jumpluna.58.com/i/LsnPDcUa1luDwQM",
          title: "更多",
          id: 10
        }]
      },{
        name: '城市服务',
        items:[{
          img: "http://img.yunxingzh.com/5acbd849-93c2-4a2b-b461-2270fc80bfdc.png",
          dst: "https://jumpluna.58.com/i/LsnNUMya1luDwQM",
          title: "招聘",
          id: 11
        },{
          img: "http://img.yunxingzh.com/98baedd0-fdad-4f08-92eb-4b99907e3168.png",
          dst: "https://jumpluna.58.com/i/LsnO3bh2J9tMeMj",
          title: "二手",
          id: 12
        }, {
          img: "http://img.yunxingzh.com/b119f07f-3666-4b4f-9218-a3bb1a9f7251.png",
          dst: "https://jumpluna.58.com/i/LsoLp0La1luDubj",
          title: "租房",
          id: 13
        }, {
          img: "http://img.yunxingzh.com/43dcf196-fdca-4817-82c5-1b209bb22ec1.png",
          dst: "https://jumpluna.58.com/i/LsnOzrKa1luDubj",
          title: "家政",
          id: 14
        }, {
          img: "http://img.yunxingzh.com/4774e039-c120-4eee-8c4f-e3bc55a60205.png",
          dst: "https://jumpluna.58.com/i/LsnPDcUa1luDwQM",
          title: "更多",
          id: 15
        },{
          img: "http://img.yunxingzh.com/5acbd849-93c2-4a2b-b461-2270fc80bfdc.png",
          dst: "https://jumpluna.58.com/i/LsnNUMya1luDwQM",
          title: "招聘",
          id: 16
        }, {
          img: "http://img.yunxingzh.com/98baedd0-fdad-4f08-92eb-4b99907e3168.png",
          dst: "https://jumpluna.58.com/i/LsnO3bh2J9tMeMj",
          title: "二手",
          id: 17
        }, {
          img: "http://img.yunxingzh.com/b119f07f-3666-4b4f-9218-a3bb1a9f7251.png",
          dst: "https://jumpluna.58.com/i/LsoLp0La1luDubj",
          title: "租房",
          id: 18
        }, {
          img: "http://img.yunxingzh.com/43dcf196-fdca-4817-82c5-1b209bb22ec1.png",
          dst: "https://jumpluna.58.com/i/LsnOzrKa1luDubj",
          title: "家政",
          id: 19
        }, {
          img: "http://img.yunxingzh.com/4774e039-c120-4eee-8c4f-e3bc55a60205.png",
          dst: "https://jumpluna.58.com/i/LsnPDcUa1luDwQM",
          title: "更多",
          id: 20
        }]
      }]
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
        type: type,
      }
      CGI.post('get_portal_conf', param, (resp)=> {
        if (resp.errno === 0) {
          this.infos = resp.data;
        } else {
          this.tipBox(resp.desc);
        }
      })
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
  height: 200px;
}
.my-swipe {
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.slide1 {
  background-color: #0089dc;
  color: #fff;
}
.slide2 {
  background-color: #ffd705;
  color: #000;
}
.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
.test-touch {
  width: 300px;
  height: 300px;
  background-color: #f00;
}

</style>



