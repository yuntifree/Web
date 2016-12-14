<style scoped lang="scss">
@import '../assets/css/common.scss';
.flex-wrp {
  display: flex;
  justify-content: flex-start;
}
.flex-wrp-space {
  display: flex;
  justify-content: space-between;
}
.service {
  width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;
  overflow-x: hidden;
}
.item {
  width: 100%;
  padding: 0.32rem 0;
  background-color: #fff;
  margin-bottom: 0.24rem;
}
.item-list {
  flex: 1;
  text-align: center;
}
.item-list img {
  display: block;
  width: 0.88rem;
  height: 0.9rem;
  margin: 0 auto 0.12rem;
}
.item-list p {
  font-size: 0.28rem;
  color: #3c3c3c;
}
.serv-list {
  margin-bottom: 0.24rem;
  background-color: #fff;
  padding-bottom: 0.3rem;
}
.ser-title {
  padding: 0.16rem;
  border-bottom: 1px solid #e6e6e6;
}
.ser-tit-icon {
  width: 0.52rem;
  height: 0.52rem;
}
.ser-title p {
  font-size: 0.28rem;
  color: #3c3c3c;
  line-height: 0.55rem;
}
.ser-item {
  display: block;
  width: 33%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.28rem;
  color:  #5a5a5a;
  margin-top: 0.3rem;
}
</style>
<template>
  <div class="service">
    <div class="item flex-wrp-space">
      <div class="item-list"
            v-for="list in lists"
            @click="urlLink(list.dst)">
        <img :src="list.img">
        <p>{{list.text}}</p>
      </div>
    </div>
    <div class="serv-list"
          v-for="ser in services">
      <div class="ser-title flex-wrp">
        <img class="ser-tit-icon" :src="ser.icon">
        <p>{{ser.title}}</p>
      </div>
      <div class="g-clearfix">
        <div class="ser-item g-fl"
              v-for="item in ser.items"
              @click="urlLink(item.dst)">
              {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

export default {
  name: 'service',
  data () {
    return {
      services: [],
      loading: false,
      lists:[{
        img: __public__ + 'static/cooperation.png',
        text: '招聘',
        dst: 'http://jump.luna.58.com/i/29a5'
      },{
        img: __public__ + 'static/secong_hand.png',
        text: '二手',
        dst: 'http://jump.luna.58.com/i/29a7'
      },{
        img: __public__ + 'static/housing.png',
        text: '租房',
        dst: 'http://jump.luna.58.com/i/29a4'
      },{
        img: __public__ + 'static/housekeeping.png',
        text: '家政',
        dst: 'http://jump.luna.58.com/i/29a6'
      },{
        img: __public__ + 'static/more.png',
        text: '更多',
        dst: 'http://jump.luna.58.com/i/29a3'
      }],
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(seq) {
      var param = {
        uid: 137,
        token: '6ba9ac5a422d4473b337d57376dd3488',
      }
      CGI.post('services', param, (resp)=> {
        if (resp.errno == 0) {
          this.services = resp.data.services;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    urlLink(url) {
      location.href = url;
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

