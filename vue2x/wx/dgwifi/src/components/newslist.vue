<style lang="scss">
@import '../assets/css/common.scss';
.item-container {
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.24rem 0;
}
.item-title {
  line-height: 150%;
  font-size: 0.32rem;
  color: $baseColor;
}
.item-imgs {
  margin: 0.15rem 0;
}
.item-imgs li{
  overflow: hidden;
}
.list-img3 li {
  @include containerSize(32%,1.48rem);
  margin-right: 2%;
}
.item-imgs li:last-child {
  margin-right: 0;
}
.img-list {
  @include containerSize(100%, auto);
  min-height: 1.5rem;
}
.list1-info {
  width: 4.74rem;
  padding-right: 0.16rem;
  text-align: justify;
}
.list-img1 {
  @include containerSize(2.28rem, 1.5rem);
  overflow: hidden;
}
.list-img1 img{
  @include containerSize(100%, auto);
  min-height: 1.5rem;
}
.item-desc {
  font-size: 0.24rem;
  color: $color84;
  line-height: 0.34rem;
}
.item-desc span:first-child {
  margin-right: 0.4rem;
}
.list1-item-title {
  line-height: 0.46rem;
  margin-bottom: 0.12rem;
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
.loading {
  line-height: 0.8rem;
}
.item-visited {
  color: $color84;
}
</style>
<template>
<div id="newslist">
  <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="30">
    <div v-for="item in items"
        class="item-container"
        @click="link(item)">
      <!--无图片新闻-->
      <template v-if="!item.images">
        <div>
          <p class="item-title g-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
          <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
        </div>
      </template>
      
      <!--有图片新闻-->
      <template v-else>
        <!--新闻有3张图片-->
        <template v-if="item.images.length>2 && !item.stype">
          <div class="list-img3">
            <p class="item-title" :class="{'item-visited':item.visited}">{{item.title}}</p>
            <ul class="g-clearfix item-imgs">
              <li v-for="imgs in item.images"
                  class="g-fl"><img v-lazy="imgs" class="img-list">
              </li>
            </ul>
            <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
          </div>
        </template>
        <!--新闻有1、2张图片-->
        <template v-if="iitem.images.length==1 && !item.stype || item.images.length==2 && !item.stype">
          <dl class="g-clearfix">
           <dt class="g-fr list-img1"><img v-lazy="item.images[0]"></dt>
           <dd class="list1-info g-fl">
             <p class="item-title list1-item-title lines-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
             <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
           </dd>
         </dl>
        </template>
        <!--广告-->
        <template  v-if="item.images && item.stype">
          <div>
            <p class="item-title g-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
            <div class="adv-img"><img v-lazy="item.images[0]"></div>
            <p class="item-desc"><span class="adv-text">广告</span><span>{{item.source}}</span></p>
          </div>
        </template>

      </template>
            
    </div>
  </div>
  <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  <p class="item-desc g-tac loading" v-if="loading">加载中<img src="../assets/images/loading.gif" height="12" width="12" alt=""></p>
  <p class="item-desc g-tac" v-if="nomore">全都在这没有更多了</p>
</div>

</template>
<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'
var query = CGI.query();
var uid = 137;
var token = '6ba9ac5a422d4473b337d57376dd3488';
var union = query.union || '';
export default {
  name: 'newslist',
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
      items: [],
      loading: false,
      nomore: false,
      useCache: false
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(function () {
      // 存下union
      if (union.length > 0) {
        CGI.setCookie('UNION', union, 7);
      }
      var scrollY = sessionStorage.getItem('scrollY');
      if (scrollY != null) {
        var cache = sessionStorage.getItem('cache');
        if (cache && cache.length > 0) {
          var list = JSON.parse(cache);
          if (list) {
            this.items = list;
            this.useCache = true;
            this.$nextTick(function() {
              window.scroll(0, scrollY);
            })
          }
        }
        sessionStorage.clear();
      }
      if (!this.useCache) {
        this.getData()
      }
    })

  },
  methods: {
    getData(seq) {
      var param = {
        uid: uid,
        token: token,
        seq:seq || 0,
        type:0
      }
      CGI.post('hot', param, (resp)=>{
        if (resp.errno === 0) {
          resp.data.infos.forEach((item)=>{
            this.$set(item, "visited", false);
            if (!item.stype) {
              this.$set(item, "stype", 0);
            }
          })
          this.items = this.items.concat(resp.data.infos);
          this.nomore = resp.data.hasmore ? false : true;
          this.loading = false;
        } else {
          this.tipBox(resp.desc);
        }
      });
    },
    loadMore() {
      this.loading = true;
      var len = this.items.length-1;
      if (!this.nomore && len >= 0) {
        setTimeout(()=>{
          this.getData(this.items[len].seq);
        },1000)
      }
    },
    link(item) {
      item.visited = true;
      var scrollY = window.scrollY;
      var pageHeight = document.documentElement.clientHeight;
      var delta = scrollY % pageHeight;
      scrollY = scrollY < pageHeight ? delta : delta + pageHeight;
      sessionStorage.setItem('scrollY', scrollY);
      sessionStorage.setItem('cache', JSON.stringify(this.items));

      var param = {
        id: item.id,
        type: 0,
        uid: uid,
        token: token,
      };
      CGI.post('report_click',param,(resp)=>{
        if (resp.errno === 0) {
          console.log(resp.errno)
        } else {
          console.log(resp.desc);
        }
      })
      location.href=item.dst;
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
    formatTime(ctime) {
      return ctime.substr(0, ctime.length - 3)
    }
  }
}
</script>
