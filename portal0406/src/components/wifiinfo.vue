<style lang="scss">
@import '../assets/css/swipe.css','../assets/css/common.scss';
html,body,.wifilink,.info {
  @include containerSize(100%, 100%);
  min-height: 100%;
  background-color: #fff;
}
.info {
  overflow: auto;
  overflow-scrolling : touch;
  -webkit-overflow-scrolling : touch;
}
.banner {
  width: 100%;
  height: 3.08rem;
  position: relative;
}
.my-swipe {
  color: #fff;
  font-size: 30px;
  text-align: center;
}
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
    display: block;
}
.search-context {
  @include containerSize(94%, auto);
  padding: 0.12rem 1.4rem 0.12rem 0.1rem;
  background-color: rgba(255,255,255,0.2);
  position: absolute;
  bottom: 0.26rem;
  left: 3%;
  border-radius: 0.08rem;
}
.search-ipt {
  @include containerSize(100%, auto);
  display: block;
  font-size: 0.28rem;
  color: #fff;
  padding-left: 0.54rem;
}
.search-ipt::-webkit-input-placeholder {
  color: #fff;
}
.search-ipt[type="search"]{-webkit-appearance:none;}
.search-ipt::-webkit-search-cancel-button {display: none;}
.search-label{
  @include containerSize(0.52rem, 0.52rem);
  display: block;
  position: absolute;
  top: 50%;
  left: 0.1rem;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
}
.search-label img {
  @include containerSize(100%, 100%);
}
.search-evt {
  padding: 0.12rem 0.12rem 0 0;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
}
.search-evt img {
  @include containerSize(0.52rem, 0.52rem);
  display: block;
  margin-top: -0.06rem;
}
.search-cancle {
  margin-left: 0.06rem;
  padding-left: 0.12rem;
  font-size: 0.28rem;
  color: #fff;
  border-left: 1px solid #fff;
  position: relative;
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
.menu-list {
  @include containerSize(100%, auto);
  padding: 0.36rem 0.2rem 0;
}

.list-item {
  @include containerSize(20%, auto);
  margin-bottom: 0.3rem;
}

.list-item img {
  display: block;
  @include containerSize(0.84rem, 0.84rem);
  margin:0 auto;
}
.title-name {
  display: block;
  width: 100%;
  margin-top: 0.06rem;
  font-size: 0.28rem;
  color: #3c3c3c;
}
.check-internet {
  @include containerSize(3.2rem, 3.4rem);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.6rem;
  margin-left: -1.7rem;
}
.check-internet img{
  @include containerSize(2.04rem, 2.04rem);
  display: block;
  margin: 0 auto;
}
.check-internet p {
  font-size: 0.32rem;
  color: #9b9b9b;
}

//news
.newslist-inner {
  overflow: auto;
  padding-bottom: 0.2rem;
}
.item-container {
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.24rem 0;
}
.item-title {
  line-height: 150%;
  font-size: 0.32rem;
  color: $color43;
  margin-bottom: 0.2rem;
}
.img-list {
  @include containerSize(100%, auto);
  min-height: 1.5rem;
  background-color: #f0f0f0;
}
.list1-info {
  width: 68%;
  max-width: 4.54rem;
  padding-right: 0.16rem;
  text-align: justify;
}
.list-img1 {
  @include containerSize(32%, 1.5rem);
  max-width: 2.28rem;
  overflow: hidden;
  background-color: #f1f1f1;
}
.list-img1 img{
  @include containerSize(100%, auto);
  min-height: 1.5rem;
  background-color: #f1f1f1;
}
.item-desc {
  font-size: 0.24rem;
  color: $color84;
}
.item-visited {
  color: $color84;
}
.item-desc span:first-child {
  margin-right: 0.4rem;
}
.list1-item-title {
  line-height: 0.46rem;
}
.adv-img {
  @include containerSize(100%, auto);
  max-height: 312rem;
  overflow: hidden;
}
.adv-img img {
  @include containerSize(100%, auto);
}
.adv-text {
  padding: 0.02rem 0.12rem;
  color: #f6c042;
  border: 1px solid #f6c042;
  border-radius: 0.08rem;
}
.more-desc {
  height: 0.8rem;
  line-height: 0.8rem;
}
.margin-line {
  @include containerSize(100%, 0.2rem);
  background-color: #f0f0f0;
}
.tab-lists {
  width: 100%;
  padding: 0 3%;
  height: 0.9rem;
  margin: 0 auto;
  border-bottom: 1px solid #e7e7e7;
  overflow: hidden;
}
.tab-inner {
  width: auto;
  height: 1.2rem;
  overflow-x: auto;
  overflow-scrolling : touch;
   -webkit-overflow-scrolling : touch;
}

.tab-lists ul{
  width: 7.2rem;
  overflow: auto;
  overflow-scrolling : touch;
   -webkit-overflow-scrolling : touch;
}
.tab-lists li{
  width: 1.2rem;
  line-height: 0.86rem;
  font-size: 0.36rem;
}
.cur {
 border-bottom: 3px solid #009cfb;
}
.make-space {
  width: 100%;
  height:0.2rem;
  position: fixed;
  left:0;
  bottom: 0;
  background-color: #fff;
}
.ad-info {
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.24rem 0;
}
</style>
<template>
  <div class="info" id="news" ref="news" @scroll="scrollNew">
    <div class="banner" ref="banner" v-if="menu.banners &&menu.banners.length>0">
      <swipe class="my-swipe">
        <swipe-item v-for="(banner,idx) in menu.banners">
          <img class="banner-img" :ref="'bannerimg'" :src="banner.img" @click="openLink(banner)" @load="imgLoad(idx)">
        </swipe-item>
      </swipe>
      <div class="info-weather g-clearfix">
        <img class="weacher-icon g-fl" :src="weatherImg">
        <span class="weather-temp g-fl">{{weather.temp}}&#176;</span>
        <span class="weather-info g-fl">{{weather.info}}</span>
      </div>
      <div class="search-context g-clearfix">
        <label for="search" class="search-label g-fl"><img src="http://img.yunxingzh.com/9e008505-d8f2-49d8-ae24-56134a53e771.png" alt=""></label>
        <form action="">
          <input type="search" id="search" class="search-ipt g-fl"  v-model="search" ref="search" placeholder="搜索或输入网址" @keyup="SearchLen" @keyup.enter="doSearch">
        </form>
        <p class="search-evt g-clearfix" v-show="iptFocus">
          <img class="g-fl" @click="emptySeach" src="http://img.yunxingzh.com/dd0dcc2e-6eac-4280-80a7-1b90ea1cd6de.png" alt="">
          <span class="search-cancle" @click="cancleSearch">取消</span>
        </p>
      </div>
    </div>
    <div>
      <ul class="menu-list g-clearfix">
        <li class="g-fl list-item" v-for="(list,index) in menu.menulist">
          <a :href="getOpenLink(list,index)"  @click="menuLink(list)">
          <img :src="list.icon">
          <span class="g-tac title-name" v-text="list.text"></span>
          </a>
        </li>
      </ul>
      <div class="margin-line"></div>
      <div class="tab-lists">
        <div class="tab-inner" ref="tablist" id="tablist">
          <ul  ref="menulist">
            <li class="g-fl g-tac"
                v-for="(tab,idx) in menu.tablist"
                v-text="tab.text"
                :class="newShow ==idx ? 'cur': ''"
                :id="'tab'+idx"
                @click="changetab(idx,tab)">
            </li>
          </ul>
        </div>
      </div>
      <!--div class="ad-info">
        <div v-for="ad in menu.ads" @click="adLink(ad)">
          <p class="item-title g-ellipsis">{{ad.title}}</p>
          <div class="adv-img"><img v-lazy="ad.img"></div>
        </div>
      </div-->
      <changenews :newstype="newsType"
                  :ads="menu.ads"
                  v-for="(news,i) in menu.tablist"
                  :idx="i"
                  v-show="newShow == i">
      </changenews>
    </div>
    <p class="make-space"></p>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
import tip from './lib/tip.vue'
import changenews from './lib/changenews.vue'
import CGI from '../lib/cgi.js'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var adtype = ~~query.adtype || 0;

// 通过时间戳来判断是非第一次进入该页面
var union = query.union || '';

export default {
  name: 'info',
  data() {
    return {
      timeTxt: 5,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      infos: {},
      first: true,
      dataReady: false,
      weatherIcon: ['http://img.yunxingzh.com/c7f30e46-f5aa-4a16-a611-1c7b99f5ec01.png',
                    'http://img.yunxingzh.com/2c8898ab-78c2-4002-b8a7-ae0579e8bb66.png',
                    'http://img.yunxingzh.com/881bfc97-7849-44a2-b585-c197a6917e96.png',
                    'http://img.yunxingzh.com/3a961ff5-2530-4c10-b17c-aff36013b5db.png'],
      weather: {},
      weatherImg: '',
      menu: {},
      newsType: 0,
      newShow: 0,
      search: '',
      iptFocus: false,
    }
  },
  computed: {
    tabIdx() {
      return this.$store.state.tabIdx;
    }
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem,
    'tip': tip,
    'changenews': changenews,
  },
  activated() {
    if (sessionStorage) {
      try {
        this.newShow = sessionStorage.getItem('tabIdx') || 0;
      } catch(e){}
    }
  },
  created() {
    this.$store.state.uid = uid;
    this.$store.state.token = token;
  },
  mounted() {
    this.$nextTick(()=> {
      // 存下union
      if (union.length > 0) {
        CGI.setCookie('UNION', union, 7);
      }
      if (sessionStorage) {
        try {
          this.$store.state.tabIdx = sessionStorage.getItem('tabIdx');
        } catch(e) {}
      }
      this.getData();
    })
  },
  methods: {
    getData() {
      var param = {
        uid: uid,
        token: token,
        adtype: adtype
      }
      CGI.post('get_weather_news', param, (resp)=> {
        if (resp.errno === 0) {
          this.weather = resp.data.weather;
          var weatherType = this.weather.type || 0;
          this.weatherImg = this.weatherIcon[weatherType];
        } else {
          this.alertInfo(resp.desc);
        }
      })
      if (/(iPhone|iPad)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
          param.phoneterm = 1;
      } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
          param.phoneterm = 0;
      } 
      CGI.post('get_portal_content', param, (resp)=> {
        if (resp.errno == 0) {
          this.menu = resp.data;
          var _this = this;
          this.$nextTick(function() {
            var width = _this.menu.tablist.length * 1.2;
            _this.$refs.menulist.style.width = width + 'rem';
            
            if (sessionStorage) {
              try {
               _this.$refs.tablist.scrollLeft = sessionStorage.getItem('tabLeft') || 0; 
              } catch(e) {}
            }
          })
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    getOpenLink(list,idx) {
      var url = window.document.location.href.toString();
      var index = url.lastIndexOf("/");
      if (list.routername) {
        url  = url.substring(0, index + 1) + list.routername;
      } else {
        url = list.url;
      }
      return url;
    },
    menuLink(list) {
      var param = {
        id: list.id,
        type: 8,
        name: list.name,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
    },
    getBlank(list,idx) {
      var ret = '';
      if (list.routername) {
        ret = '_blank';
      } //else {}
      return ret;
    },
    changetab(idx,tab) {
      this.tabIdx = this.newShow = idx;
      this.newsType = tab.type;
      this.$store.state.tabIdx = idx;
      
      if (sessionStorage) {
        try {
          sessionStorage.setItem('tabIdx', idx);
          sessionStorage.setItem('tabLeft', this.$refs.tablist.scrollLeft);
          sessionStorage.setItem('tabTop', this.$refs.news.scrollTop);
        } catch(e) {}
      }
      var param = {
        name: tab.name,
        type: 7,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
    },
    imgLoad(idx) {
      if (idx == 0) {
        var height = this.$refs.bannerimg[0].height;
        this.$refs.banner.style.height = height+ 'px';
      }
    },
    openLink(ban) {
      var param = {
        id: ban.id,
        type: 10,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
      if (ban.dst.length > 0) {
        location.href = ban.dst;
      }
    },
    emptySeach() {
      this.search = '';
    },
    doSearch() {
      var search = this.search.trim();
      if (search.length <0) {
        this.alertInfo('请输入搜索内容');
      } else {
        search = encodeURI(search);
        location.href = 'https://www.baidu.com/from=844b/s?ms=1&word=' + search;
      this.search = '';
      this.iptFocus = false;
      }
    },
    scrollNew() {
      this.$nextTick(()=> {
        var news = document.getElementById('news')
        var sum = news.scrollHeight; 
        if (sum <= news.scrollTop + news.clientHeight) { 
          this.$store.state.loadArticle = true;
        } else {
          this.$store.state.loadArticle = false;
        }
      })
    },
    SearchLen() {
      if (this.search.length >0) {
        this.iptFocus = true;
      }
    },
    cancleSearch() {
      this.search = '';
      this.$refs.search.blur();
      this.iptFocus = false;
    },
    adLink(ad) {
      var param = {
        id: ad.id,
        type: 18,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
      if (ad.dst.length>0) {
        location.href = ad.dst;
      }
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
