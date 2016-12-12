<template>
  <div class="videos">
    <div class="video-list" v-for="item in items">
      <div class="vedio-inner" @click="videoLink(item.dst)">
        <img class="vedio-img" :src="item.images[0]">
        <div class="video-text g-clearfix">
          <p class="g-fl"><span class="video-text-source">{{item.source}}</span><span>{{item.ctime}}</span></p>
          <p class="g-fr">{{item.play}}次播放</p>
        </div>
        <img class="vedio-icon-play" src="../../static/play.png">
      </div>
      <p class="video-title ellipsis">{{item.title}}</p>
    </div>
    <div v-show="loading" class="loading">努力加载中</div>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

export default {
  name: 'videos',
  data () {
    return {
      loading: false,
      items: [],
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
        seq: seq || 0,
        type: 1
      }
      CGI.post('hot', param, (resp)=> {
        if (resp.errno == 0) {
          this.items = this.items.concat(resp.data.infos);
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    videoLink(url) {
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
<style scoped>
.videos {
  width: 94%;
  margin: 0 auto;
  border-bottom: 2px solid #e7e7e7;
}
.menu {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  line-height: 40rpx;
}
.cur {
  color: #4a90f2;
}
.video-list {
  width: 100%;
  height: auto;
  padding: 0.16rem;
  background-color: #fff;
  margin-top: 0.16rem;
}
.vedio-inner {
  width: 100%;
  height: auto;
  position: relative;
}
.vedio-img{
  width: 100%;
  height: 3.34rem;
}
.video-text {
  width: 100%;
  padding: 0.16rem;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.32rem;
  color:  #fff;
}
.video-text-source {
  margin-right: 0.16rem;
  color: #fff;
}
.video-title {
  display: block;
  width: 100%;
  /*padding-top: 0.24rem;*/
  font-size: 0.32rem;
  line-height: 0.44rem;
  color:  #262626;
}
.vedio-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
.vedio-container video {
  width: 100%;
  height: 100%;
}
.vedio-icon-play {
  width: 0.94rem;
  height: 0.94rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</style>
