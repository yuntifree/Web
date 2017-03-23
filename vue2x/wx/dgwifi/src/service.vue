<style lang="scss">
@import './assets/css/reset.css','./assets/css/common.scss';
.service {
  @include containerSize(100%, auto);
  min-height: 100%;
  background-color: #f5f5f5;
  z-index: -1;
}
.service-menu {
  width: 100%;
  height: auto;
}
.service-menu-item {
  padding: 0.32rem 0;
  background-color: #fff;
  margin-bottom: 0.24rem;
  width: 20%;
  text-align: center;
}

.item-img {
  display: block;
  width: 0.88rem;
  height: 0.90rem;
  margin: 0 auto;
}
.item-text {
  font-size: 0.28rem;
  color: #3c3c3c;
}

.service-list {
 padding: 0.24rem 0 0.4rem;
 border-top: 1px solid #d2d2d2;
 border-bottom: 1px solid #d2d2d2;
 background-color: #fff;
 margin-bottom: 0.25rem;
}
.list-title {
  padding-left: 0.6rem;
  font-size: 0.32rem;
  color: #3c3c3c;
  position: relative;
}
.list-title:before{
  @include containerSize(0.06rem,0.32rem);
  content: "";  /*:before和:after必带技能，重要性为满5颗星*/
  display: block;
  background-color: #009cfb;
  position: absolute;  /*日常绝对定位*/
  top: 0.04rem;
  left: 0.32rem;
}
.menu-item {
  @include containerSize(1.72rem, auto);
  margin-left: 0.1rem;
  margin-top: 0.5rem;
}
.menu-item img {
  display: block;
  @include containerSize(0.64rem, auto);
  margin: 0 auto;
}
.item-text {
  margin-top: 0.2rem;
  font-size: 0.28rem;
  color: #323232;
}
</style>
<template>
  <div class="service top176">
    <ul class="service-menu g-clearfix">
      <li class="service-menu-item g-fl" v-for="list in lists" @click="urlLink(list)">
        <img class="item-img" :src="list.img">
        <p class="item-text" v-text="list.text"></p>
      </li>
    </ul>
    <div class="service-list" v-for="list in services">
      <h2 class="list-title" v-text="list.title"></h2>
      <ul class="service-menu g-clearfix">
        <li class="g-fl menu-item" v-for="item in list.items" @click="urlLink(item)">
          <img :src="item.icon">
          <p class="g-tac item-text" v-text="item.title"></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CGI from './lib/cgi.js'
import tip from './components/lib/tip.vue'
var uid = 137;
var token = '6ba9ac5a422d4473b337d57376dd3488';

export default {
  name: 'service',
  data () {
    return {
      services: [],
      lists:[{
        img: 'http://img.yunxingzh.com/2174238a-ba33-4b96-9268-89be3a2d242d.png',
        text: '招聘',
        dst: 'https://jumpluna.58.com/i/LsnwGLLa1luDubj'
      },{
        img: 'http://img.yunxingzh.com/6e8147bf-ba4b-4309-a7bf-eff391b5f260.png',
        text: '二手',
        dst: 'https://jumpluna.58.com/i/LsnvnSW2J9tMcKG'
      },{
        img: 'http://img.yunxingzh.com/829983c2-8f72-4671-865a-3dd829158d01.png',
        text: '租房',
        dst: 'https://jumpluna.58.com/i/LsnwinLa1luDwQM'
      },{
        img: 'http://img.yunxingzh.com/2733c7ff-f2f1-4343-943d-ea54cef3ca49.png',
        text: '家政',
        dst: 'https://jumpluna.58.com/i/Lsnw1pj2J9tMeMj'
      },{
        img: 'http://img.yunxingzh.com/3b9fc40e-e9c2-4103-9fd1-4dd2da64b979.png',
        text: '更多',
        dst: 'https://jumpluna.58.com/i/LsnwwxU2J9tMcKG'
      }],

      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  },
  methods: {
    getData(seq) {
      var param = {
        uid: uid,
        token: token,
      }
      CGI.post('services', param, (resp)=> {
        if (resp.errno == 0) {
          this.services = resp.data.services;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    urlLink(item) {
      location.href = item.dst;
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>