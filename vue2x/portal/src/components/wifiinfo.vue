<style lang="scss" scoped>
@import '../assets/css/common.scss';
.info {
  @include containerSize(100%, auto);
  background-color: #fff;
}
.info-top {
  @include containerSize(100%, 3.36rem);
  background-color: $baseColor;
  position: relative;
  padding-top: 0.3rem;
}
.circle-link {
  @include containerSize(2.38rem, 2.38rem);
  margin: 0 auto;
  position: relative;
}
.circle-link span,
.circle-link img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 50%;
}
.oval {
  @include containerSize(100%, 100%);
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-1,
.oval-around {
  @include containerSize(2rem, 2rem);
}
.oval-copy-1 {
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-2 {
  @include containerSize(1.44rem, 1.44rem);
  background-color: rgba(255,255,255,0.8);
  color: $baseColor;
  font-size: 0.4rem;
  line-height: 1.44rem;
}
.oval-copy-2 i {
  font-size: 0.24rem;
}
.oval-copy-3 {
  @include containerSize(0.58rem, 0.58rem);
}
.oval-animate {
  animation:mymove linear 3s infinite;
  -webkit-animation:mymove linear 3s infinite;
}

@keyframes mymove{
  from {transform: rotate(0deg) translate(-50%, -50%);transform-origin: 0 0}
  to {transform: rotate(360deg) translate(-50%, -50%);transform-origin: 0 0}
}

@-webkit-keyframes mymove {
  from {transform: rotate(0deg) translate(-50%, -50%);transform-origin: 0 0}
  to {transform: rotate(360deg) translate(-50%, -50%);transform-origin: 0 0}
}
.link-text {
  font-size: 0.24rem;
  color: #fff;
}
.menu-title {
  position: relative;
  padding: 0.42rem 0 0;
}
.menu-line {
  display: block;
  @include containerSize(100%, 1px);
  background-color: #dcdcdc;
}
.menu-text {
  padding: 0 0.22rem;
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.toutiao-text {
  top: 50%;
}
.menu-text img{
  display: block;
  @include containerSize(1.24rem, 0.24rem);
}
.menu-list {
  @include containerSize(100%, auto);
  padding: 0.42rem 0.42rem 0;
}
.title-toutiao {
  padding: 0.12rem 0 0.18rem 0;
}
.list-item {
  @include containerSize(0.84rem, auto);
  margin-left: 0.6rem;
  margin-bottom: 0.3rem;
}
.list-item:nth-child(5n+1) {
  margin-left: 0;
}
.list-item img {
  display: block;
  @include containerSize(0.84rem, 0.84rem);
}
.title-name {
  display: block;
  width: 100%;
  margin-top: 0.06rem;
  font-size: 0.28rem;
  color: #3c3c3c;
}
</style>
<template>
  <div class="info">
    <div class="info-top">
      <div class="circle-link">
        <span class="oval"></span>
        <span class="oval-copy-1"></span>
        <img class="oval-around" :class="{'oval-animate':showCfg}"src="http://img.yunxingzh.com/180afd13-7e6b-4006-9d00-d80e227c46fe.png">
        <span class="oval-copy-2 g-tac">
          <b v-if="showCfg">5<i>秒</i></b>
          <img v-else class="oval-copy-3"　src="http://img.yunxingzh.com/e04e6e9d-d24b-4e00-be57-1224efd426df.png">
        </span>
      </div>
      <p class="g-tac link-text">{{showCfg ? '正在连接免费WiFi...' : '已连接东莞无限免费WiFi'}}</p>
    </div>
    <div>
      <div class="menu-title">
        <i class="menu-line"></i>
        <div class="menu-text">
          <img src="http://img.yunxingzh.com/0854372e-aff2-46da-b894-a4b82ff50520.png">
        </div>
      </div>
      <ul class="menu-list g-clearfix">
        <li class="g-fl list-item" v-for="list in menuList" @click="openLink(menulist)">
          <img :src="list.icon">
          <span class="g-tac title-name" v-text="list.text"></span>
        </li>
      </ul>
      <div class="menu-title title-toutiao">
        <i class="menu-line"></i>
        <div class="menu-text toutiao-text">
          <img src="http://img.yunxingzh.com/5bd91184-f4cb-40f1-9013-07fb636e288b.png">
        </div>
      </div>
      <newslist></newslist>
    </div>
    </div>
</template>

<script>
import newslist from './newslist.vue'
import tip from './lib/tip.vue'
export default {
  name: 'info',
  data() {
    return {
      showCfg: false,
      menuList: [{
        icon: 'http://img.yunxingzh.com/c5f0475a-3f1f-4c80-9f33-90bd33af7d75.png',
        text: '政务',
        url: '',
      },{
        icon: 'http://img.yunxingzh.com/548d971b-dac4-4bf7-bbac-5b69e4f325c0.png',
        text: '查询',
        url: '',
      },{
        icon: 'http://img.yunxingzh.com/553143fc-6d6d-4aad-be8a-5715a7eab367.png',
        text: '视频',
        url: '',
      },{
        icon: 'http://img.yunxingzh.com/efd20edd-7a3d-4c62-a523-90110da4ba74.png',
        text: '招聘',
        url: 'http://jump.luna.58.com/i/29a5',
      },{
        icon: 'http://img.yunxingzh.com/0dd7ec0a-37f5-4448-a253-acd3320279eb.png',
        text: '二手',
        url: 'http://jump.luna.58.com/i/29a7',
      },{
        icon: 'http://img.yunxingzh.com/a3524233-2acc-47c5-92a3-c87c764bb114.png',
        text: '租房',
        url: 'http://jump.luna.58.com/i/29a4',
      },{
        icon: 'http://img.yunxingzh.com/73403b79-8eb4-4ccf-b169-25bee5cdbc30.png',
        text: '更多',
        url: 'http://jump.luna.58.com/i/29a3',
      }]
    }
  },
  components: {
    tip,
    newslist,
  },
  mounted() {
    this.$nextTick(()=> {
      console.log(JSON.stringify(this.$store.state));
    })
  },
  methods: {
    openLink(url) {
      location.href = url;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
