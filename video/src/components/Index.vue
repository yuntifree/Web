<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/common.scss';
#video {
  @include containerSize(100%, auto);
  display: none;
}
.adv.slider {
    width: 100%;
    height: 1.306666rem;
    overflow: hidden;
    position: relative;
}
.top-close {
    width: 1.306666rem;
    height: 1.306666rem;
    background-image: url(../assets/close.png);
    -webkit-background-size: 0.425rem;
    background-size: 0.425rem;
    position: absolute;
    right: 0;
    z-index: 2017;
    background-color: rgba(0, 0, 0, 0);
    background-repeat: no-repeat;
    -ms-background-position-x: 0.725rem;
    background-position-x: 0.725rem;
    background-position-y: 0.105rem;
}
.adv.slider > a > img {
    display: block;
    width: 100%;
    min-height: 100%;
}
.video-container,.video-player {
  width: 100%;
  display: block;
  position: relative;
}
.video-player img{
  width: 100%;
}
.stats {
  height: 1rem;
  padding-right: 0.1rem;
  background-color: rgba(64, 74, 88, 0.5);
  border-radius: 0.04rem;
  position: absolute;
  left: 0.104rem;
  top: 0.26666rem;
  z-index: 50;
}
.stats > p:nth-child(2) {
  height: 0.273333rem;
  margin: 0.175rem 0 0.1rem 0;
  line-height: 0.273333rem;
  background-size: 0.293333rem 0.293333rem;
}
.stats > p {
  width: 100%;
  text-indent: 1.64rem;
  font-size: 0.2rem;
  color: #fff;
  line-height: 1;
}
.usericon {
  width: 0.746666rem;
  height: 0.746666rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0.2rem;
}
.channel-home {
  height: 1rem;
  padding-right: 0.01rem;
  border-radius: 0.04rem;
  position: absolute;
  bottom: 2rem;
  z-index: 101;
  left: 0.104rem;
}
.channel-home img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.playbtn {
  @include containerSize(2rem, 2rem);
  @include pos(top, 50%, left, 50%);
  border-radius: 50%;
  position: absolute;
  background: url(../assets/playbtn.png) no-repeat center center;
  background-size: 100% 100%;
  margin: -1rem 0 0 -1rem;
  z-index: 3;
  line-height: 2rem;
  text-align: center;
  color: #FF9933;
  font-size: 0.35rem;
}
.menu,.tab {
  @extend %rowFlex;
}
.tab {
  font-size: 0.45rem;
  background-color: #fff;
  color: #333;
  flex: 6;
  justify-content: center;
}

.tab-item {
  flex: 1;
  height: 1rem;
  line-height: 1rem;
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
    border-width: 0.2rem;
  }
}
.hit-follow {
  flex: 1;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
  text-align: center;
  background-color: #f5702d;
  font-size: 0.45rem;
}
.marqueen-container {
  height: 0.7rem;
  overflow: hidden;
  position: relative;
  background-color: rgba(0,0,0,0.8);
}
.marqueen-transition {
  width: auto;
  height: 1.0667rem;
  line-height: 0.7rem;
  font-size: 0.32rem;
  color: #fff;
  @extend %Absolute0;
  animation: myfirst 10s linear infinite;
  white-space:nowrap;
  span {
    margin-right: 0.8rem;
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
    margin-left: 0.2667rem;
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
    @include containerSize(6rem, auto);
    @include pos(top,50%,left,50%);
    transform:translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.1rem;
    font-size: 0.37333rem;
    .follow-inner {
      padding:0.2667rem 0.8rem;
    }
  }
}
.follow-code {
  display: block;
  @extend %img100;
}
.follow-tit {
  font-size: 0.37rem;
  font-weight: bold;
  padding-bottom: 0.10667rem;
  border-bottom: 1px solid #eee;
  color: #000;
  span {
    color: #4ebd52;
  }
}
.follow-tip {
  font-size: 0.32rem;
  color: #999;
}
.follow-close {
  line-height: 0.75rem;
  background-color: #f2f2f2;
  border-top: 1px solid #d0d0d0;
  color: #40AFFE;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
</style>

<template>
  <div class="index">
    <!-- 顶部广告 -->
    <div class="adv slider" data-special="adv" id="adv1">
      <div class="top-close" @click="topClose"></div>
      <a href="http://cs.vautoshow.com/special/autoshow/5a28a4aed8edcd1000c92080" title="第26届长沙红星国际会展中心汽车博览会" class="adv-item active">
        <img src="http://upload.xiangbojiubo.com/FqGP9lAiSEjvraUz7RoRWfP0rczG?imageView2/2/w/640">
      </a>
    </div>
    <!-- 视频区域 -->
    <div class="video-container">
      <!-- 数字区域 -->
      <div class="stats">
        <img src="http://imgv.xldlive.com/FnUNHRjJExZWA_CRbTg0xCouWNTB?imageView2/2/w/640" class="usericon">
        <p style="text-indent: 0.615rem;background: none;font-size: 0.265rem;">
          <i class="fa fa-clock-o" style="width: 0.795rem;font-size: 0.305rem;margin-top: .015rem;margin-right: 0.15rem;"></i> 4:46:55
        </p>
        <p style="text-indent: 0.615rem;background: none;font-size: 0.265rem;">
          <i class="fa fa-eye" style="width: 0.795rem;font-size: 0.305rem;margin-right: 0.15rem;"></i><span> 57431</span>
        </p>
      </div>
      <!-- 回到主页区域 -->
      <div class="channel-home">
        <a href="/app/channel/d6f95aecab4aa2ebe942d903038bff2b" target="_self">
          <img src="http://imgv.xldlive.com/file/201706161404561876.png" alt="【1.7直播】2018 第十四届“中华童星”全国青少年艺术人才选拔活动">
        </a>
      </div>
      <!-- 默认视频区域 -->
      <video id="video" controls="" webkit-playsinline="" playsinline="" x5-playsinline="" data-src="http://v.xldlive.com/recordings/z1.xldlive.3861520/1515290439_1515309185.m3u8" style="font-size:14px"></video>
      <!-- 视频区 -->
      <div class="video-player" style="height: auto; overflow: hidden;">
        <img src="http://imgv.xldlive.com/FuNYDZ34IdX_Wdz7FGQtJnBaAIFD?imageView2/2/w/640" class="poster">
        <div class="playbtn" @click="play"></div>
      </div>
    </div>
    <!-- 菜单区域 -->
    <div class="menu">
      <ul class="tab">
        <li class="tab-item" v-for="(tab,idx) in tabs"
          @click="getTab(tab,idx)"
          :class="{'tab-item-active': idx === tabIdx}">{{tab.text}}
        </li>
      </ul>
      <div class="hit-follow" @click="followShow=true">关注</div>
    </div>
    <!-- 跑马灯 -->
    <div class="marqueen-container">
      <div class="marqueen-transition">
        <span>主办方：新华社·中国财富传媒集团      承办方：普谛恩(中国)国际文化发展有限公司</span>
        <span>请在右侧抽奖区抽中奖品的幸运观众留意兑奖短信，按要求回复短信，奖品将陆续寄出~</span>
      </div>
    </div>
    <div class="main-container">
      <router-view/>
    </div>
    <!-- 关注区 -->
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
      raw:{},
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
      },{
        text: '投票',
        component: 'vote'
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
    // 创建video
    var VIDEO = this.VIDEO = {};
    (function (el) {
        VIDEO.EL = el;
        var COVER = document.querySelector(".video-player");
        VIDEO.play = function () {
          if (isMobile.any) {
            COVER.style.display = 'none';
            VIDEO.EL.style.display = 'block';
            VIDEO.EL.src = VIDEO.EL.getAttribute("data-src") || "";
            VIDEO.EL.play();
          } else {
            COVER.style.display = 'none';
            var _new = document.createElement("div")
                      , _old = VIDEO.EL
                      , videoUrl = VIDEO.EL.getAttribute("data-src") || "";

            _old.parentNode.replaceChild(_new, _old);
            _new.id = 'video';
            _new.style.height = '5.75rem';
            _new.style.display = 'block';

            function create_player(video_type, v_control) {
              var vars = {
                f: '/static/m3u8.swf',
                a: videoUrl,
                c: 1,
                s: 4,
                p: video_type,
                lv: v_control, //注意，如果是直播，需设置lv:1
                loaded: 'loadHandler'
              },
              video = [videoUrl];

              CKobject.embed('/static/xplayer.swf',
                        'video',
                        'ck_film',
                        '100%',
                        '100%',
                        false,
                        vars,
                        video
              );
              function loadHandler() {
                CKobject.getObjectById('ck_film').addListener('play', 'playHandler');
              }

              function playHandler() {
                CKobject.getObjectById('ck_film').removeListener('play', 'playHandler');
              }
            }
            create_player(1, 0);
        }
      };
    })(document.getElementById("video"))
    this.initData()
  },
  methods: {
    initData() {
      this.raw = {
        video_id: 12345,
        title: '第26届长沙红星国际会展中心汽车博览会',
      }
    },
    getTab(tab,idx) {
      this.tabIdx = idx;
      this.$router.push({name: tab.component});
    },
    play() {
      this.VIDEO.play()
    },
    topClose(e) {
      e.target.parentNode.remove();
    },
  }
}
</script>