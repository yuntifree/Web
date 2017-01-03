<style scoped lang="scss">
@import '../assets/css/common.scss';
.service {
  @include containerSize(100%, auto);
  min-height: 100%;
  background-color: #f5f5f5;
}
.service-list {
 padding: 0.24rem 0 0.4rem;
 border-bottom: 1px solid #d2d2d2;
 background-color: #fff;
 margin-bottom: 0.25rem;
}
.list-title {
  padding-left: 0.64rem;
  font-size: 0.32rem;
  color: #3c3c3c;
}
.menu-item {
  @include containerSize(1.72rem, auto);
  margin-left: 0.58rem;
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
  <div class="service">
    <div class="service-list" v-for="list in lists">
      <h2 class="list-title" v-text="list.title"></h2>
      <ul class="service-menu g-clearfix">
        <li class="g-fl menu-item" v-for="item in list.items">
          <img :src="item.icon">
          <p class="g-tac item-text" v-text="item.text"></p>
        </li>
      </ul>
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
      lists: [{
        title: '智慧政务',
        items: [{
          icon: 'http://img.yunxingzh.com/8946a9de-69f9-47b5-b93f-27ba5e87c8f1.png',
          text: '社保查询',
          url: 'http://61.145.199.189/sbwx/web2/dgsbxxcx/loginPage'
        },{
          icon: 'http://img.yunxingzh.com/99a408f9-3856-415a-863b-63bc530f8867.png',
          text: '公积金查询',
          url: ''
        },{
          icon: 'http://img.yunxingzh.com/2522812d-7d1b-475d-b511-cc8c42a953b8.png',
          text: '工商查询',
          url: ''
        },{
          icon: 'http://img.yunxingzh.com/5f11f5ce-99f6-466a-8a80-858ced1b61d5.png',
          text: '违章查询',
          url: 'http://112.74.64.177:8080/Traffic/ViolationByVehicleLicense'
        },{
          icon: 'http://img.yunxingzh.com/9102b006-b048-4d41-ba8e-697477d7cae8.png',
          text: '发票真伪查询',
          url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/fpcy.html?cityid=441900'
        }]
      },{
        title: '交通出行',
        items: [{
          icon: 'http://img.yunxingzh.com/eb769553-6cdf-412a-8344-9a8bfb0b26e3.png',
          text: '公交查询',
          url: 'https://web.chelaile.net.cn/ch5/?cityName=%E4%B8%9C%E8%8E%9E\u0026cityId=008\u0026supportSubway=0\u0026showFav=0\u0026hideFooter=1\u0026cityVersion=0#!/linearound'
        },{
          icon: 'http://img.yunxingzh.com/311fbded-df03-4d21-be2d-5b0a82e96ac3.png',
          text: '火车票',
          url: 'http://touch.train.qunar.com/'
        },{
          icon: 'http://img.yunxingzh.com/93995ef4-0879-4dbd-99bb-f08a9ddb590c.png',
          text: '汽车票',
          url: 'http://183.6.161.195:8089/select.html'
        },{
          icon: 'http://img.yunxingzh.com/9171fb52-1112-4850-a15d-385892dd0041.png',
          text: '飞机票',
          url: 'https://touch.qunar.com/h5/flight/'
        }]
      },{
        title: '医疗服务',
        items: [{
          icon: 'http://img.yunxingzh.com/61d99040-acf3-41ae-b443-22b4baf8bb4f.png',
          text: '预约挂号',
          url: 'https://wap.91160.com/unit/index.html\u0026city_id=2920'
        },{
          icon: 'http://img.yunxingzh.com/4fa213f9-d976-4a54-9ff6-040546501b5d.png',
          text: '医院查询',
          url: 'https://wap.91160.com/?city_id=2920'
        }] 
      }],
      tips: {
        show: false,
        msg: '',
        duration: 1500,
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

