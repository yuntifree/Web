<style scoped lang="scss">
@import '../assets/css/common.scss';
.wxpage {
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f1f1f1;
}
.page-head {
  width: 100%;
  height: auto;
  background-color: #fff;
}
.page-head li {
  width: 50%;
  line-height: 0.9rem;
  background-color: #f1f1f1;
  font-size: 0.32rem;
}
.page-head .page-cur {
  background-color: #fff;
  color: #009cfb;
}
.wxpage-info {
  padding-top: 0.64rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
}
.info-logo {
  padding-left: 2.62rem;
}
.img-logo {
  width: 0.6rem;
  height: auto;
  display: block;
  margin-right: 0.2rem;
}
.logo-text {
  font-size: 0.36rem;
  font-weight: 500;
}
.wxpage-info-text {
  margin-top: 0.24rem;
  font-size: 0.29rem;
  text-align: justify;
  padding-left: 0.56rem;
  color: #838383;
}
.wxpage-info-btn {
  width: 5.06rem;
  height: 0.74rem;
  display: block;
  margin: 0.44rem auto 0.52rem;
  border-radius: 0.08rem;
  border: solid 2px #04be02;
}
.wxpage-message {
  padding: 0.37rem 0.3rem 0.4rem 0.3rem;
  border-top: 1px solid #e6e6e6;
}
</style>
<template>
  <div class="wxpage">
    <ul class="g-clearfix page-head">
      <li class="g-fl g-tac page-cur">本地精品公众号</li>
      <li class="g-fl g-tac">热门公众号推荐</li>
    </ul>
    <div class="wxpage-info">
       <div>
         <p class="g-clearfix info-logo"><img class="img-logo g-fl" src="../assets/images/ico_walk.png"><span class="g-fl logo-text">东莞无限</span></p>
         <p class="wxpage-info-text">东莞市政府公共免费WiFi服务。关注东莞无限，<br/>上网更快更安全，随时随地发现身边有趣的…</p>
         <button class="wxpage-info-btn g-tac">进入公众号</button>
       </div>
       <dl class="g-clearfix wxpage-message">
         <dt class="g-fr list-img1"><img src="../assets/images/marker.png"></dt>
         <dd class="list1-info g-fl">
           <p class="item-title list1-item-title lines-ellipsis">大健康产业站上风口 莞企加紧布局医疗器械领域</p>
           <p class="item-desc"><span>2017年4月1日</span></p>
         </dd>
      </dl>
    </div>
    <!--dl class="g-clearfix">
      <dt class="g-fr list-img1"><img v-lazy="item.images[0]"></dt>
      <dd class="list1-info g-fl">
        <p class="item-title list1-item-title lines-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
        <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
      </dd>
   </dl-->
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';

export default {
  name: 'service',
  data () {
    return {
      wxpage: [],
      loading: false,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      tabIdx: -1
    }
  },
  components: {
    tip
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  },
  activated() {
    this.tabIdx = 3;
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

