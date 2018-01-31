<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common.scss';
//chat
.chat-view {
  @include containerSize(100%, 100%);
  overflow: auto;
  padding: 0.1rem 0.1rem 0.94rem;
  color: #2c3e50;
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
.comment-box {
  @extend %rowFlex;
  @include containerSize(100%, 0.94rem);
  align-items: flex-start;
  z-index: 1000;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .comment-item {
    @include containerSize(0.75rem, 0.75rem);
    img {
      display: block;
      @extend %img100;
    }
  }
  .comment-input {
    @include containerSize(4.3rem, 0.69rem);
    display: inline-block;
    margin-top: 0.1rem;
    .comments {
      display: block;
      @include containerSize(100%,100%);
      border-radius: 0.6rem;
      padding: 0.1rem 0.2rem;
      background-color: #f4f4f4;
      color: #545964;
      font-size: 0.28rem;
      box-sizing: border-box;
    }
  }
  .send {
    margin: 0.1rem 0 0 0.2rem;
    display: inline-block;
    border-radius: 1rem;
    @include containerSize(1.08rem, 0.69rem);
    text-align: center;
    line-height: 0.69rem;
    color: #fff;
    font-size: 0.4rem;
    background-color: #fc6719;
    cursor: default;
    font-size: 0.24rem;
  }
}
</style>

<template>
  <div class="chat">
    <div class="main-container">
      <div style="height:300px; position:relative;">
        <ul class="chat-view">
          <li v-for="list in chatLists">
            <dl class="avatar" :class="{'avatar-r':list.type}">
              <dt><img :src="list.avatar">
              </dt>
              <dd class="g-clear">
                <h2 class="chat-meta">{{list.name}}</h2>
                <p class="chat-content">{{list.content}}</p>
              </dd>
            </dl>
          </li>
          <li ref="seeAll"></li>
        </ul>
        <p class="tip-text" v-show="tips.show">{{tips.text}}</p>
        <div class="comment-box">
          <div class="comment-item">
            <img src="http://pdnlive.cfbond.com/video/img/more-items.png" alt="更多功能">
          </div>
          <div class="comment-item">
            <img src="http://pdnlive.cfbond.com/video/img/emoji-item.png" alt="emoj">
          </div>
          <div class="comment-input">
            <input type="text" name="comments" class="comments" placeholder="写评论..." v-model.trim="comment">
          </div>
          <div class="send" @click="sendComment">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      comment: "",
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
    this.$nextTick(()=> {
      this.$refs.seeAll.scrollIntoView();
    })
  },
  methods: {
    sendComment() {
      if (this.comment.length > 0) {
        var comments = {
          name: 'Martin',
          avatar: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJIHZLHmZvEllXQHvlp81FobFudGl6GeJgYaVBuqPicLGMyYpFIpuKEI8jujvp41ib9iahHjccKH6yQ/0',
          content: this.comment,
          type: 1
        }
        this.chatLists.push(comments);
        this.comment = '';
        this.$refs.seeAll.scrollIntoView();
      } else {
        this.tip('请输入评论内容')
      }
    },
    tip(val) {
      this.tips.show = true;
      this.tips.text = val;
      setTimeout(()=> {
        this.tips.show = false;
      }, 1500)
    }
  }
}
</script>

