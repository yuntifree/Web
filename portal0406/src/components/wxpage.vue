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
.page-head .pagecur {
  background-color: #fff;
  color: #009cfb;
}
.wxpage-info {
  padding-top: 0.64rem;
  padding-bottom: 0.4rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
}

.info-logo {
  padding-left: 35%;
  position: relative;
}
.img-logo {
  width: 2.8rem;
  height: 2.8rem;
  display: block;
  margin-right: 0.2rem;
  position: absolute;
  top: -1.15rem;
  left: 18%;
  clip: rect(1.11rem 1.69rem 1.69rem 1.1rem);
}
@media screen and (width:1024px){
  .img-logo{left: 11%;}
}
.logo-text {
  font-size: 0.36rem;
  font-weight: 500;
  padding-left: 12%;
}
.wxpage-info-text {
  margin-top: 0.24rem;
  font-size: 0.29rem;
  padding: 0 0.56rem;
  color: #838383;
}
.wxpage-info-btn {
  width: 5.06rem;
  height: 0.74rem;
  display: block;
  margin: 0.44rem auto 0;
  border-radius: 0.08rem;
  border: solid 1px #04be02;
  font-size: 0.32rem;
  color: #04be02;
}
.wxpage-message {
  margin-top: 0.52rem;
  padding: 0.37rem 0.3rem 0 0.3rem;
  border-top: 1px solid #e6e6e6;
}
</style>
<template>
  <div class="wxpage">
    <ul class="g-clearfix page-head">
      <li class="g-fl g-tac" @click="localShow=true" :class="{pagecur: localShow}">本地精品公众号</li>
      <li class="g-fl g-tac" @click="localShow=false" :class="{pagecur: !localShow}">热门公众号推荐</li>
    </ul>
    <div  v-if="wxpage.local && wxpage.local.length>0" v-show="localShow" class="wxpage-inner">
      <div class="wxpage-info"  v-for="local in wxpage.local">
         <div>
           <p class="g-clearfix info-logo"><img class="img-logo g-fl" :src="local.icon"><span class="g-fl logo-text">{{local.name}}</span></p>
           <p class="wxpage-info-text g-tac">{{local.abstract}}</p>
           <button class="wxpage-info-btn g-tac" @click="linkWx(local.dst)">进入公众号</button>
         </div>
         <dl class="g-clearfix wxpage-message" v-if="local.article" @click="linkWx(local.article.dst)">
           <dt class="g-fr list-img1" ><img :src="local.article.img"></dt>
           <dd class="list1-info g-fl">
             <p class="item-title list1-item-title lines-ellipsis">{{local.article.title}}</p>
             <p class="item-desc"><span>{{local.article.ctime}}</span></p>
           </dd>
        </dl>
      </div>
    </div>
    <div v-if="wxpage.hot && wxpage.hot.length>0" v-show="!localShow">
      <div class="wxpage-info" v-if="wxpage.hot && wxpage.hot.length>0" v-for="hot in wxpage.hot">
         <div>
           <p class="g-clearfix info-logo"><img class="img-logo g-fl" :src="hot.icon"><span class="g-fl logo-text">{{hot.name}}</span></p>
           <p class="wxpage-info-text g-tac">{{hot.abstract}}</p>
           <button class="wxpage-info-btn g-tac" @click="linkWx(hot.dst)">进入公众号</button>
         </div>
         <dl class="g-clearfix wxpage-message" @click="linkWx(hot.article.dst)">
           <dt class="g-fr list-img1"><img :src="hot.article.img"></dt>
           <dd class="list1-info g-fl">
             <p class="item-title list1-item-title lines-ellipsis">{{hot.article.title}}</p>
             <p class="item-desc"><span>{{hot.article.ctime}}</span></p>
           </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';

export default {
  name: 'wxpage',
  data () {
    return {
      wxpage: {},
      loading: false,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      tabIdx: -1,
      localShow: true
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
      CGI.post('get_mpwx_info', param, (resp)=> {
        if (resp.errno == 0) {
          this.wxpage = resp.data;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    linkWx(url) {
      location.href =  url;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

