<style lang="scss" scoped>
@import '../assets/css/common.scss';
.verify {
   @include containerSize(100%, auto);
   min-height: 100%;
   position: relative;
   background-color: #fff;
   padding-bottom: 0.4rem;
}
.verify-img {
  display: block;
  @include containerSize(100%, auto);
  @extend %blockAuto;
}
.verify-tit {
  @include pos(top,0.44rem,left,50%);
  transform: translateX(-50%);
  font-size: 0.36rem;
  font-weight: 500%;
}
.verify-info {
  @include containerSize(84%, auto);
  margin: -0.4rem auto 0.4rem;
}
.verify-btn {
  @include containerSize(100%, auto);
  @include marGin(top,0.24rem)
}
.btn-dis {
  background-color: #c9c9c9;
}
.info-verify {
  margin-top: 0.34rem;
}
.info-verify span{
  width: 50%;
  font-size: 0.28rem;
  color: #1e2c3d;
}
.blood-tit {
  @include marGin(top,0.64rem)
}
.verify-sub {
  @include containerSize(100%, 100%);
  @include pos(top,0,left,0);
  @include rgBa(background-color,#000,0.5);
}
.sub-info {
  @include containerSize(2rem, auto);
  @include pos(top,4.22rem,left,50%);
  transform: translate(-50%, -50%);
}
.sub-info-text {
  font-size: 0.36rem;
  font-weight: 500;
  color: #fff;
}
.sub-info-img {
  @extend %blockAuto;
  @include containerSize(1.15rem, auto);
  margin-top: 0.24rem;
}
</style>

<template>
  <div class="verify">
    <img class="verify-img" src="http://img.yunxingzh.com/0f89cc12-abbc-4873-b202-dd3d7098d29f.png">
    <h2 class="verify-tit g-tac">献血验证系统</h2>
    <div class="verify-info">
      <h3 class="info-tit">献血预约码</h3>
      <input class="write-ipt g-tac" type="number" v-model.number="code" placeholder="请输入献血预约码" @keyup="makeVerify">
      <button class="info-btn verify-btn" :disabed="verifybtn" :class="{'btn-dis':verifybtn}" @click="checkCode">验证预约码</button>
      <p class="info-verify g-clearfix">
        <span class="g-fl">姓名：{{infos.name}}</span>
        <span class="g-fr">电话:{{infos.phone}}</span>
      </p>
      <h3 class="info-tit blood-tit">献血码</h3>
      <input class="write-ipt g-tac" type="number" v-model.number="bloodcode" placeholder="请输入献血码" @keyup="makeCheck">
      <button class="info-btn verify-btn" :disabed="subbtn" :class="{'btn-dis':subbtn}" @click="subCode">提交</button>
    </div>
    <div class="verify-sub" v-show="subSucc">
      <div class="sub-info">
        <p class="sub-info-text g-tac">提交成功</p>
        <img class="sub-info-img" src="http://img.yunxingzh.com/96dc8110-c3a0-42a8-b920-6b630409f41f.png">
      </div>
    </div>
    <div class="verify-sub" v-show="subFail">
      <div class="sub-info">
        <p class="sub-info-text g-tac">提交失败</p>
        <img class="sub-info-img" src="http://img.yunxingzh.com/63b3f29c-8e0c-4057-b98e-061e48f11ead.png">
      </div>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi.js'

export default {
  data() {
    return {
      infos: {},
      verifybtn: true,
      subbtn: true,
      code: Number,
      bloodcode: Number,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      subFail: false,
      subSucc: false
    }
  },
  components: {
    tip
  },
  methods: {
    makeVerify() {
      if (this.code > 99999 && this.code < 1000000) {
        this.verifybtn = false;
      } else {
        this.verifybtn = true;
      }
    },
    checkCode() {
      if (!this.verifybtn) {
        var param = {
          code: ~~this.code
        }
        CGI.post('get_reserve_info', param,(resp)=> {
          if (resp.errno === 0) {
            this.infos = resp.data;
            this.verifybtn = true;
          } else if(resp.errno === 10004){
            this.alertInfo('预约码不存在');
          } else {
            this.alertInfo(resp.desc);
          }
        })
      } //else{}
    },
    makeCheck() {
      if (this.bloodcode > 999999 && this.bloodcode< 10000000 ) {
        this.subbtn = false;
      } else {
        this.subbtn = true;
      }
    },
    subCode() {
      if (!this.subbtn) {
        var param ={
          reserve_code: ~~this.code,
          donate_code: ~~this.bloodcode
        }
        CGI.post('submit_donate_info', param, (resp)=> {
          if (resp.errno === 0) {
            this.subSucc = true;
            var _this = this;
            setTimeout(function(){
              _this.code = Number;
              _this.bloodcode = Number;
              _this.subSucc = false;
            },3000)
          } else if (resp.errno === 117){
            this.alertInfo(resp.desc);
          } else {
            this.subFail = true;
            var _this = this;
            setTimeout(function(){
              _this.subFail = false;
            },3000)
          }
        })
      }
    },
    alertInfo(val) {
      console.log(val);
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->