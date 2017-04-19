<style lang="scss">
@import '../../assets/css/common.scss';
</style>
<template>
<div class="newslist">
  <div  class="newslist-inner" ref="news" @scroll="scrollNew">
    <div v-for="(item,idx) in items"
        class="item-container"
        @click="link(item,idx)">
          <dl class="g-clearfix">
           <dt class="g-fr list-img1"><img v-lazy="item.img"></dt>
           <dd class="list1-info g-fl">
             <p class="item-title list1-item-title lines-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
             <p class="item-desc"><span v-if="item.source">{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
           </dd>
         </dl>
    </div>
    <p class="item-desc more-desc g-tac" v-show="!loading">全都在这没有更多了</p>
    <p class=" item-desc more-desc g-tac" v-show="loading">加载中<img src="../../assets/images/loading.gif" height="12" width="12" alt=""></p>
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
var scrollY = [];
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
      nomore: false,
      useCache: false,
    }
  },
  props: {
    newstype: Number,
    idx: Number
  },
  activated() {
    return this.newstype;
  },
  computed: {
    tabIdx() {
      return this.$store.state.tabIdx;
    }
  },
  components: {
    tip,
  },
  watch: {
    tabIdx() {
      this.loadData(this.newstype || 0);
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if (sessionStorage) {
        try {
          var i = sessionStorage.getItem('tabIdx') || 0;
          this.loadData(i);
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
                var _this = this;
                this.$nextTick(function() {
                  _this.$refs.news.style.height = _this.$refs.news.clientHeight-50 + 'px';
                })
              }
            } else {
              var list = [];
              this.useCache = true;
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
        type: this.newstype || 0,
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
            } else {
              this.items = this.items.concat(resp.data.infos);
            }
            this.$nextTick(function() {
              _this.$refs.news.style.height = _this.$refs.news.clientHeight -100 + 'px';
            })
            this.nomore = resp.data.hasmore ? false : true;
            this.loading = false;
            this.$store.state.type = param.type;
            if (sessionStorage) {
              try {
                sessionStorage.setItem('cache_'+this.newstype, JSON.stringify(this.items));
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
    loadMore() {
      if (this.nomore) {
        this.alertInfo('全都在这没有更多了');
      } else {
        var len = this.items.length-1;
        if (!this.nomore && len >= 0) {
          this.loading = true;
          setTimeout(()=>{
            this.getData(this.items[len].seq);
          },1500)
        }
      }
    },
    scrollNew() {
      var sum = this.$refs.news.scrollHeight; 
      if (sum <= this.$refs.news.scrollTop + this.$refs.news.clientHeight) { 
          this.loadMore()
      }
    },
    link(item,idx) {
      item.visited = true;
      if (sessionStorage) {
        try {
          sessionStorage.setItem('cache_'+this.newstype, JSON.stringify(this.items));
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
    i},
    formatTime(ctime) {
      return ctime.substr(0, ctime.length - 3)
    }
  }
}
</script>
