<style lang="scss">
@import '../../assets/css/common.scss';
</style>
<template>
<div class="newslist">
  <div  class="newslist-inner">
    <div v-for="(item,idx) in items"
        class="item-container">
        <template  v-if="!item.type">
           <dl class="g-clearfix" @click="link(item)">
            <dt class="g-fr list-img1"><img  v-if="item.img" v-lazy="item.img"></dt>
            <dd class="list1-info g-fl">
              <p class="item-title list1-item-title lines-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
              <p class="item-desc"><span v-if="item.source">{{item.source}}</span><span v-if="item.ctime">{{formatTime(item.ctime)}}</span></p>
            </dd>
          </dl>
        </template>
        <template v-else>
          <div @click="link(item)">
            <p class="item-title g-ellipsis">{{item.title}}</p>
            <div class="adv-img"><img v-lazy="item.img"></div>
          </div>
        </template>
    </div>
    <p class=" item-desc more-desc g-tac" v-if="loading">加载中<img src="../../assets/images/loading.gif" height="12" width="12" alt=""></p>
    <template v-else>
      <p class="item-desc more-desc g-tac" v-if="!hasmore">全都在这没有更多了</p>
    </template>
  </div>
  <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>
<script>
import tip from './tip.vue'
import CGI from '../../lib/cgi'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var cache = [];
export default {
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      items: [],
      ready: false,
      loading: false,
      hasmore: true,
      useCache: false,
    }
  },
  props: {
    newstype: Number,
    idx: Number,
    ads: Array
  },
  computed: {
    tabIdx() {
      return this.$store.state.tabIdx;
    },
    loadArticle() {
      return this.$store.state.loadArticle;
    }
  },
  components: {
    tip,
  },
  watch: {
    tabIdx() {
      this.loadData(this.tabIdx || 0);
    },
    loadArticle() {
      if (this.$store.state.loadArticle) {
        this.loadMore();
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if (sessionStorage) {
        try {
          var i = ~~sessionStorage.getItem('tabIdx') || 0;
          if (i == this.idx) {
            this.loadData(i)
          }
        } catch(e) {}
      }
    })
  },
  methods: {
    loadData(i) {
      if (i == this.idx) {
        if (sessionStorage) {
          try {
            cache[i] = sessionStorage.getItem('cache_'+i);
            if (cache[i] && cache[i] !=='undefind') {
              var list = JSON.parse(cache[i]);
              if (list) {
                this.items = list;
                this.useCache = true;
              }
            } 
          } catch(e) {}
        } 
        if (!this.useCache) {
          this.getData()
        }
      }
    },
    getData(seq) {
      var param = {
        uid: uid,
        token: token,
        seq:seq || 0,
        type: this.idx || 0,
        num: 20
      }
      var _this = this;
      CGI.post('get_mpwx_article', param, (resp)=>{
        if (resp.errno === 0) {
          if (resp.data.infos && resp.data.infos.length >0) {
            resp.data.infos.forEach((item)=>{
              this.$set(item, "visited", false);
            })
            if (param.seq==0) {
              this.ready = true;
              this.items = resp.data.infos;
              if (this.ads.length >1) {
                this.items.splice(2,0,this.ads[0]);
              }
              if (this.ads.length >= 2) {
                for(var i=1; i < this.ads.length; i++) {
                  this.items.splice(9*i,0,this.ads[i]);
                }
              }
              this.$nextTick(function() {
                _this.setHeight();
              })
            } else {
              this.items = this.items.concat(resp.data.infos);
            }
            this.hasmore = !!resp.data.hasmore;
            this.loading = false;
            this.$store.state.type = param.type;
            if (sessionStorage) {
              try {
                sessionStorage.setItem('cache_'+this.idx, JSON.stringify(this.items));
                this.$refs.news.scrollTop = 200;
              } catch(e) {
              }
            }
          } else {
            this.loading = false;
          }
        } else {
          this.tipBox(resp.desc);
        }
      });
    },
    setHeight() {
      var screenHeight = window.screen.height;
      var height = document.getElementById('tablist').offsetTop;
      document.body.style.height = screenHeight + height + 'px';
      if (sessionStorage) {
        try {
          document.getElementById('news').scrollTop = sessionStorage.getItem('tabTop') || 0;
        } catch(e){}
      }
    },
    loadMore() {
      var len = this.items.length-1;
      if (len >= 0) {
        this.loading = true;
        setTimeout(()=>{
          this.getData(this.items[len].seq);
        },1000)
      }
    },
    link(item) {
      item.visited = true;
      if (sessionStorage) {
        try {
          sessionStorage.setItem('cache_'+this.idx, JSON.stringify(this.items));
        } catch(e) {
        }
      }
      var param = {
        type: 17,
        id: item.id,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
      location.href = item.dst;
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
