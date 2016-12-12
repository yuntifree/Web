<style scoped lang="scss">
.marquee-warp {
  width: 100%;
  height: 40px;
  position: relative;
  overflow: hidden;
}
.warp-list {
  position: absolute;
  top: 0;
  left: 0;
}
.warp-list li {
  width: 100%;
  height: auto;
  line-height: 40px;
  animation: all linear 3s;
}
.warp-list li:first-child {
  background-color: red;
}
.warp-list li:nth-child(2) {
  background-color: pink;
}
.warp-list li:nth-child(3) {
  background-color: blue;
}
.warp-list li:nth-child(4) {
  background-color: gray;
}
.warp-list li:nth-child(5) {
  background-color: green;
}
.wrap {
  width: 100%;
  height: 200px;
}
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.mint-swipe-item {
  float: left;
}
.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}


</style>

<template>
  <div class="hello">
    <p><router-link to="/detail">详情页</router-link></p>
    <div class="marquee-warp">
      <ul class="warp-list" ref="carousel">
        <li v-for="list in warpList">{{list}}</li>
      </ul>
    </div>
    <div class="wrap">
      <swipe class="my-swipe">
        <swipe-item class="slide1" v-for="list in warpList">{{list}}</swipe-item>
      </swipe>
    </div>
    
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
import tip from './lib/tip.vue'
import CGI from '../lib/cgi.js'

export default {  
  data () {
    return {
      loading: false,
      warpList:['text1text1text1text1text1','text2text2text2text2text2','text3text3text3text3text3','text4text4text4text4text4','text5text5text5text5text5'],
      hot: {},
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      nomore: true,
    }
  },
  components: {
    tip,
    Swipe,
    SwipeItem,
  },
  created() {
    this.$store.state.active = 1;
  },
  mounted() {
    console.log(this.$store.state);
    this.$nextTick(()=> {
      this.carousel();
    })
  },
  methods: {
    getData(seq) {
      var param = {
        seq: seq,
        num: 20
      }
      CGI.post('get_latest', param, (resp)=> {
        if (resp.errno == 0) {
          this.hot = resp.data;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    loadMore() {
      this.loading = true;
      var len = this.hot.list.length-1;
      if (!this.nomore) {
        setTimeout(()=>{
          this.getData(this.hot.list[len].seq);
        },1000)
      }
    },
    carousel() {
      var nowimg = 0;
      var warp = this.$refs.carousel;
      var imageAmount = warp.childNodes.length;
      var height = warp.childNodes[0].offsetHeight;
      var stream = warp.childNodes[0].cloneNode();
      warp.appendChild(stream);

      function slide(){
        if (nowimg < imageAmount - 1) {
          nowimg++;
          warp.style.top = nowimg * -height + 'px';
        } else {
          nowimg = 0;
          warp.style.top = nowimg * -height + 'px';
          warp.style.top = 0 + 'px';
        }
      }
      //slide();
      var timer = setInterval(slide,1500);

    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>

