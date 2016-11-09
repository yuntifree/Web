<style lang="scss">
@import '../assets/css/common.scss';
.item-container {
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #e8e8e8;
}
.item-title {
  line-height: 0.8rem;
  font-size: 0.28rem;
  color: $baseColor;
}
.item-imgs li{
  overflow: hidden;
}
.list-img3 li {
  @include containerSize(33%,1.5rem);
  margin-right: 0.5%;
}
.list-img2 li {
  @include containerSize(49.5%,1.5rem);
  margin-right: 1%;
}
.item-imgs li:last-child {
  margin-right: 0;
}
.img-list {
  @include containerSize(100%, auto);
  min-height: 1.5rem;
}
.list1-info {
  width: 4.5rem;
}
.list-img1 {
  @include containerSize(2.25rem, 1.5rem);
  overflow: hidden;
  margin-right: 0.2rem;
}
.list-img1 img{
  @include containerSize(100%, auto);
  min-height: 1.5rem;
}
.item-desc {
  font-size: 0.24rem;
  color: #848484;
  line-height: 0.66rem;
}
.item-desc span:first-child {
  margin-right: 0.4rem;
}
.padd25 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.list1-item-title {
  line-height: 0.37rem;
}
</style>
<template>
  <div v-if="mounted" >
    <div v-for="item in items"
        class="item-container"
        @click="link(item.dst)"
        >
      <div v-if="item.images.length>1" :class="item.images.length==2? 'list-img2' : 'list-img3'">
        <p class="item-title g-ellipsis">{{item.title}}</p>
        <ul class="g-clearfix item-imgs">
          <li v-for="imgs in item.images" 
              class="g-fl"><img :src="imgs" class="img-list">
          </li>
        </ul>
        <p class="item-desc"><span>{{item.source}}</span><span>{{item.ctime}}</span></p>
      </div>
       <div v-else>
       <dl class="g-clearfix padd25">
         <dt class="g-fl list-img1"><img :src="item.images"></dt>
         <dd class="list1-info g-fl">
           <p class="item-title list1-item-title lines-ellipsis">{{item.title}}</p>
           <p class="item-desc"><span>{{item.source}}</span><span>{{item.ctime}}</span></p>
         </dd>
       </dl>
      </div>
    </div>
   <infiniteloading :on-infinite="loadMore" :distance="distance"></infiniteloading>
   <p v-if="nomore">全都在这没有更多了</p>
    <tip :show.sync="tips.showTip" :msg="tips.msgTip" :duration="tips.time"></tip>
  </div>
</template>
<script>
import tip from './tip.vue'
import CGI from '../lib/cgi'
import infiniteloading from 'vue-infinite-loading'
var query = CGI.query;
var uid = ~~(query.uid) || 1;
var token = query.token || '7329cf254871429d803c5826c8d9db1d';
var count = 0;
var timer;
export default {
  data() {
    return {
      tips: {
        showTip: false,
        msgTip: '',
        time: 1500
      },
      msgbox: {
        showBox: false,
      },
      items: [],
      mounted: false,
      loading: false,
      nomore: false,
    }
  },
  components: {
    tip,
  },
  created() {
    
  },
  ready() {
    this.getData();
    //console.log(uid + ' ' +token);
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
          console.log(resp.desc);
          this.items = this.items.concat(resp.data.infos);
          this.loading = false;
          if (param.seq==0) {
            this.mounted = true;
          }
          this.nomore = resp.data.hasmore ? false : true;
          this.$broadcast('$InfiniteLoading:loaded');
          this.tipBox(resp.desc);

        } else {
          this.tipBox(resp.desc);
        }
      });

      /*var param = {
        uid: uid,
        data: {
          uid: uid,
          token: token,
          seq:seq || 0,
          type:0
        }
      }
      this.$http.post(
          this.HOST + 'hot', //接口名字
          param,
      ).then(function (resp) {
        resp = JSON.parse(resp.body);
        console.log(resp.data);
        if (resp.errcode === 0) {
          this.items = this.items.concat(resp.data.infos);
          this.loading = false;
          if (param.data.seq==0) {
            this.mounted = true;
          }
          this.nomore = resp.hasmore ? false : true;
          this.$broadcast('$InfiniteLoading:loaded');
        } else {
          this.tipBox(resp.desc);
        }
      }, function (resp) {
          console.log(res.statusText);
      });*/
    },
    loadMore() {
      var len = this.items.length-1;  
      if (!this.nomore) {
        timer = setTimeout(function () {
          var temp = [];
          this.getData(this.items[len].seq); 
        }.bind(this), 1000);
      }  
    },
    link(src) {
      location.href=src;
    },
    tipBox(val) {
      this.tips.msgTip = val;
      this.tips.showTip = true;
    }
  },
  events: {
    'tip-show': function() {
      this.tips.showTip = false;
    }
  }
}
</script>
