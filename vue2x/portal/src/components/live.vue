<template>
  <div class="videos top176">
    <download></download>
    <tab :selidx="tabIdx"></tab>
    <div class="live-body">
      <div class="liveBox-li"  v-for="item in items" @click="liveLink(item)">
        <a href="javascript:;">
          <span class="liveBox-li-head">
            <img :src="item.avatar" width="100%">
            <em class="liveBox-li-status">{{item.live ? '直播':''}}</em>
          </span>
          <span class="liveBox-li-fun">
            <p class="liveBox-li-name liveBox-li-male" :class="{'item-visited':item.visited}">{{item.nickname}}</p>
            <p class="liveBox-li-city">{{item.location}}</p>
            <span class="liveBox-li-count">{{item.watches}}</span>
          </span>
        </a>
      </div>
    </div>
    <p class="item-desc more-desc g-tac" v-show="!loading" @click="loadMorevideo">{{nomore ? '全都在这没有更多了' : '点击加载更多'}}</p>
    <p class="item-desc more-desc g-tac" v-show="loading">加载中<img src="../assets/images/loading.gif" height="12" width="12" alt=""></p>
    <tip :tipinfo="tips" @tip-show="tips.show=false">123</tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import download from './lib/download.vue'
import tab from './lib/tab.vue'
import CGI from '../lib/cgi'


export default {
  name: 'videos',
  data () {
    return {
      items: [],
      loading: true,
      nomore: false,
      offset: 0,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      tabIdx: -1
    }
  },
  components: {
    tip,
    tab,
    download
  },
  activated() {
    this.tabIdx = 3;
  },
  mounted() {
    this.$nextTick(function () {
      this.getData()
    })
  },
  methods: {
    getData() {
      this.loading = true;
      var url = 'http://web.free.wifi.360.cn/internet/huajiao?callback=liveCallback&offset='+this.offset;
      CGI.get(url, {}, (resp)=> {
        if (resp.errno == 0) {
          this.items = this.items.concat(resp.data.list);
          this.offset = resp.data.offset;
          this.loading = false;
          this.nomore = resp.data.more ? false : true;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    loadMorevideo() {
      if (!this.nomore) {
        this.loading = true;
        setTimeout(()=>{
          this.getData();
        },1000)
      } else {
        this.tipBox('全都在这没有更多了');
      }   
    },
    liveLink(item) {
      location.href = 'http://h.huajiao.com/l/index?liveid='+item.live_id;
    },
    tabChange(idx) {
      this.$store.state.tabidx = idx;
      this.tabIdx = idx;
      CGI.tabChange(this.$router, idx)
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videos {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.liveBox-li {
    background: #fff;
    border-bottom: 1px solid #000;
    border-right:1px solid #000;
    float: left;
    margin-left: -1px;
    padding-bottom: 6px;
    width: 50%;
    box-sizing: content-box;
    -webkit-box-sizing: content-box;
}
.liveBox-li:nth-child(even) {
  margin-left: 0;
  border-right: 0 none;
}
.liveBox-li a {
  display: block;
  color: #222;
  text-decoration: none;
}
.liveBox-li-head {
    position: relative;
}
.liveBox-li-head, 
.liveBox-li-status, 
.liveBox-li-head img {
    display: block;
}
.liveBox-li-status {
    border: 1px solid #fff;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    color: #fff;
    font-style: normal;
    font-size: 12px;
    padding: 1px 3px;
    position: absolute;
    right: 7px;
    top: 7px;
}

.liveBox-li-fun {
    display: block;
    padding-top: 7px;
    position: relative;
    width: 100%;
}
.liveBox-li-male {
    background: url(http://p4.qhmsg.com/t0153a4545649265ec4.png) no-repeat 9px center;
    background-size: 12px 12px;
}
.liveBox-li-name {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    padding-left: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 47%;
}
.liveBox-li-city {
    color: #aaabbb;
    font-size: 13px;
    height: 22px;
    line-height: 22px;
    padding-left: 28px;
}
.liveBox-li-count {
  color: #aaabbb;
  display: block;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
