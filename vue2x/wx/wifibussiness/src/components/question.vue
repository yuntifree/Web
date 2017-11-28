<style lang="scss" scoped>
  @import '../assets/css/reset.css','../assets/css/common.scss';
  .ques-top {
    @extend %text-desc;
  }
  .ques-phone {
    @include containerSize(92%, auto);
    margin: 0 auto;
    @extend %rowFlex;
    border: 1px solid  #b4b4b4;
    border-radius: 0.2rem;
    padding: 0.26rem 0.2rem;
    label {
      display: block;
      @include containerSize(0.44rem, auto);
      margin-right: 0.1rem;
    }
    .ipt-phone {
      font-size: 0.32rem;
    }
  }
  .ques-text {
    display: block;
    @include containerSize(92%, 3.6rem);
    margin: 0 auto;
    border: 1px solid #b4b4b4;
    border-radius: 0.2rem;
    margin-top: 0.24rem;
    padding: 0.26rem 0.2rem;
    font-size: 0.32rem;
    &::-webkit-input-placeholder {
      color: #a5a5a5;
    }
  }
  .ques-btn {
    @extend %btn;
    margin-top: 0.44rem;
  }
  .ques-tip {
    @extend %text-tip;
    margin-top: 0.24rem;
    line-height: 1.5;
  }
  .ques-result {
    @extend  %result
  }
  .img100 {
    @extend %img100;
  }
  .ques-textLength {
    @include containerSize(92%, auto);
    margin: 0.12rem auto 0;
    color: #848484;
    text-align: right;
    font-size: 0.28rem;
  }
</style>
<template>
  <div id="question">
    <div class="ques-top">
      <h2 class="g-clearfix"><img src="http://img.yunxingzh.com/9a9d4cdd-eb77-45f6-a166-583a80ced1c3.png">问题反馈与建议</h2>
      <p>我们将尽快安排工作人员与您联系</p>
    </div>
    <div class="ques-phone">
      <label for="phone"><img class="img100" src="http://img.yunxingzh.com/286aca0d-771f-48da-b8f4-cb9a3fb1c407.png"></label>
      <input class="ipt-phone" id="phone" type="text"  v-model.trim="phone" name="" placeholder="请输入正确的手机号">
    </div>
    <textarea class="ques-text" type="textarea" name="" v-model.trim="text" placeholder="请输入您的问题和建议(300字以内)" maxlength="300" @keyup="makeContent"></textarea>
    <p class="ques-textLength">{{textlength}}/300</p>
    <button class="g-tac ques-btn" @click="feedback">提交</button>
    <p class="ques-tip g-tac">如遇紧急情况，请拨打客服电话<br />000-0000000</p>
    <div class="ques-result" v-if="fail">
      <img class="result-ico" src="http://img.yunxingzh.com/e7886e19-ae59-4534-bdc1-388a8eb97721.png" alt="">
      <p class="result-text g-tac">提交失败</p>
    </div>
    <div class="ques-result" v-if="success">
      <img class="result-ico" src="http://img.yunxingzh.com/06f2ccc4-d076-424d-a7d2-a6d78cf308ee.png" alt="">
      <p class="result-text g-tac">提交成功</p>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'

export default {
  name: 'question',
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
      phone: '',
      text: '',
      fail: false,
      success: false,
      textlength: 0,
    }
  },
  components: {
    tip,
  },
  mounted() {
  },
  methods: {
    feedback() {
      var ret = true;
      var param = {};
      if (this.text.length > 0) {
        param.content = this.text;
      } else {
        this.tip('请输入您的问题和建议')
        ret = false;
      }

      if (this.phone>0) {
        if (CGI.checkTel(this.phone)) {
          param.phone = this.phone + '';
        } else {
          this.tip('请输入正确的手机号');
          ret = false;
        }
      } else {
        this.tip('请输入手机号');
        ret = false;
      }
      
      var _this = this;
      if (ret) {
        CGI.post('/feedback/add', param , (resp)=> {
          if (resp.errno === 0) {
            _this.success = true;
            setTimeout(function() {
              _this.success = false;
              _this.phone = '';
              _this.text = '';
              _this.$router.replace({name: 'home'})
            }, 1500)
          } else {
            _this.fail = true;
            setTimeout(function() {
              _this.fail = false;
            }, 1500)
          }
        })
      }
    },
    makeContent() {
      var len = this.text.length;
      this.textlength = len;
      if (~~len >= 30) {
        this.tip('最多可输入300字呢！！')
      }
    },
    tip(val) {
      this.tips.show = true;
      this.tips.msg = val;
    }
  }
}
</script>
