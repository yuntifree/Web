<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/common.scss';
.video-container,.video-player {
  @include containerSize(100%, auto);
  display: block;
  position: relative;
}
.video-btn {
  @include containerSize(1.5rem, 1.5rem);
  @include pos(top, 40%, left, 50%);
  transform: translate(-50%, -50%);
  img {
    display: block;
    @extend %img100;
  }
}
.menu,.tab {
  @extend %rowFlex;
}
.tab {
  font-size: 0.14rem;
  background-color: #fff;
  color: #333;
  flex: 6;
  justify-content: center;
}

.tab-item {
  flex: 1;
  height: 0.74rem;
  line-height: 0.74rem;
  text-align: center;
}
.tab-item-active {
  border-bottom: 1px solid #f5702d;
  color: #f5702d;
  position: relative;
  &:before{
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: rgb(245, 112, 45);
    border-width: 0.15rem;
  }
}
.hit-follow {
  flex: 1;
  height: 0.74rem;
  line-height: 0.74rem;
  color: #fff;
  text-align: center;
  background-color: #f5702d;
} 
.marqueen-container {
  height: 0.52rem;
  overflow: hidden;
  position: relative;
  background-color: rgba(0,0,0,0.8);
}
.marqueen-transition {
  width: auto;
  height: 0.8rem;
  line-height: 0.52rem;
  font-size: 0.24rem;
  color: #fff;
  @extend %Absolute0;
  animation: myfirst 10s linear infinite;
  white-space:nowrap;
  span {
    margin-right: 0.6rem;
    &:nth-child(odd) {
      color: #fff;
    }
    &:nth-child(even) {
      color: #ffff80;
    }
  }
}
@keyframes myfirst{
  from {left: 0;}
  to {left: -100%}
}

//chat
.chat-view {
  @include containerSize(100%, 100%);
  overflow: auto;
  padding: 0.1rem 0.1rem 0.94rem;
}
.tip-text {
  padding: 0.1rem;
  color: #fff;
  background-color: rgba(0,0,0,0.8);
  font-size: 0.28rem;
  @include pos(left,50%,top,50%);
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
}
.avatar {
  @include containerSize(100%, auto);
  @extend %rowFlex;
  margin-top:0.2rem;
  dt{
    @include containerSize(0.88rem, 0.88rem);
    border-radius: 0.08rem;
    margin-right: 0.4rem;
    img {
      display: block;
      @include containerSize(100%, auto);
      border-radius: 0.08rem;
    }
  }
  dd {
    text-align: left;
    max-width: 70%;
    .chat-meta {
      font-size: 11px;
      color: #999;
    }
    .chat-content {
      margin-top: 0.1rem;
      display: inline-block;
      float: left;
      word-break: break-all;
      position: relative;
      background: #fff;
      padding: 0.14rem 0.2rem;
      border-radius: 0.1rem;
      font-size: 0.28rem;
      position: relative;
      line-height: 150%;
      &:before {
        right: 100%;
        border: solid transparent;
        content: " ";
        @include containerSize(0,0);
        @include  pos(top,50%,left,-0.32rem);
        pointer-events: none;
        border-color: #eee0;
        border-right-color: #fff;
        border-width: 0.16rem;
        margin-top: -0.16rem;
        text-align: justify;
      }
    }
  }
}
.avatar-r {
  display: flex;
  flex-direction: row-reverse;
  dt {
    margin-left: 0.2rem;
  }
  dd {
    .chat-meta {
      text-align: right;
    }
    .chat-content  {
      float: right;
      &:before {
        left: 100%;
        border-left-color: #fff;
        border-right-color: transparent;
      }
    }
  }
}
.follow-shade {
  @include containerSize(100%, 100%);
  background-color: rgba(0,0,0,0.8);
  position: fixed;
  top:0;
  left: 0;
  z-index: 999;
  .follow-main {
    @include containerSize(4.5rem, auto);
    @include pos(top,50%,left,50%);
    transform:translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    .follow-inner {
      padding:0.2rem 0.6rem;
    }
  }
}
.follow-code {
  display: block;
  @extend %img100;
}
.follow-tit {
  font-size: 0.28rem;
  font-weight: bold;
  padding-bottom: 0.08rem;
  border-bottom: 1px solid #eee;
  color: #000;
  span {
    color: #4ebd52;
  }
}
.follow-tip {
  font-size: 0.24rem;
  color: #999;
}
.follow-close {
  line-height: 0.56rem;
  background-color: #f2f2f2;
  border-top: 1px solid #d0d0d0;
  color: #40AFFE;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
</style>

<template>
  <div class="index">
    <div class="video-container">
      <div class="videoPlayer" style="width: 100%;height: auto;"></div>
      <!--div class="video-btn" v-show="playerBtnShow" @click.stop="makePlayer"><img src="http://pdnlive.cfbond.com/video/img/playbtn.png"></div-->
    </div>
    <div class="menu">
      <ul class="tab">
        <li class="tab-item" v-for="(tab,idx) in tabs" 
          @click="getTab(tab,idx)" 
          :class="{'tab-item-active': idx === tabIdx}">{{tab.text}}
        </li>
      </ul>
      <div class="hit-follow" @click="followShow=true">关注</div>
    </div>
    <div class="marqueen-container">
      <div class="marqueen-transition">
        <span>主办方：新华社·中国财富传媒集团      承办方：普谛恩(中国)国际文化发展有限公司</span>
        <span>请在右侧抽奖区抽中奖品的幸运观众留意兑奖短信，按要求回复短信，奖品将陆续寄出~</span>
      </div>
    </div>
    <div class="main-container">
      <router-view/>
    </div>
    <div class="follow-shade" v-show="followShow">
      <div class="follow-main">
        <div class="follow-inner">
          <p class="follow-tit">长按关注 <span>云行智慧</span><br/>公众号</p>
          <img class="follow-code" src="http://imgv.xldlive.com/FjUfP8zvdIVVipl1xmp62mJPOAAc?imageView2/2/w/414">
          <p class="follow-tip">关注直播动态 惊喜不断</p>
        </div>
        <p class="follow-close" @click.stop="followShow=false">关闭</p>
      </div>
    </div>
  </div>
</template>

<script>
var player;
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      comment: "",
      tabIdx: 0,
      followShow: false,
      playerBtnShow: true,
      tabs: [{
        text: '评论',
        component: 'chat'
      },{
        text: '峰会介绍',
        component: 'intro'
      },{
        text: '抽奖',
        component: 'award'
      }],
      tips: {
        show: false,
        text: '123'
      },
      chatLists: [{
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJIHZLHmZvEllXQHvlp81FobFudGl6GeJgYaVBuqPicLGMyYpFIpuKEI8jujvp41ib9iahHjccKH6yQ/0',
        name: 'Martin',
        content: '中奖人员稍后有工作人员联系',
        type: 1
      },{
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJIHZLHmZvEllXQHvlp81FobFudGl6GeJgYaVBuqPicLGMyYpFIpuKEI8jujvp41ib9iahHjccKH6yQ/0',
        name: '杨新：15099087789',
        content: '开始了吗 ',
        type: 0
      },{
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLcwvaQSPrjtQG0luKmPr9gNbicDxsQzGeqBoUDywicC67CbNF0pKxIcHddEUQ44wteV01sbZKs5U3w/0',
        name: '又谦',
        content: '下午还有直播吗',
        type: 0
      },{
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK83aWBmqkGqs0jM6dmro5F2bIa49ngMOhia9S1mRLAI21vbkzbexoDFMSQroSmUnGmzNLgQFnianGg/0',
        name: 'Martin',
        content: '下午是分论坛，各个分论坛独立举行，不再提供直播，明年国际资本领袖峰会我们再见！',
        type: 1
      },{
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/3pGPlxLaIBWrCoaf1XfauIJJ4PCpo2LLVOnSLZLic2vR0jTiaYkSwUoib7jSkjYoCTLJibb4WSciay3vXTrXlNgOz1g/0',
        name: '希望',
        content: '应该没问题吧',
        type: 0
      }]
    }
  },
  mounted() {
    try {
      var idx = sessionStorage.getItem('tabIdx');
      if (idx || idx == 0) {
        this.tabIdx = ~~idx;
        console.log(this.tabIdx);
      } else {
        sessionStorage.setItem('tabIdx',0);
      }
    } catch(e) {}
    var videoObject = {
      container: '.videoPlayer',//“#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
      poster:'http://www.ckplayer.com/sampleX/pic/wdm.jpg',//封面图片
      video:'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4'//视频地址
    };
    player=new ckplayer(videoObject);
  },
  methods: {
    getTab(tab,idx) {
      this.tabIdx = idx;
      try {
        console.log(1);
        sessionStorage.setItem('tabIdx',idx);
      } catch(e) {}
      this.$router.push({name: tab.component});
    },
    makePlayer() {
      if (this.playerBtnShow) {
        player.videoPlay()
      } else {
        player.videoPause()
      }
      this.playerBtnShow = !this.playerBtnShow;
    }
  }
}
</script>

