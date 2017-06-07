<style lang="scss" scoped>
@import '../assets/css/common.scss';
.succ {
   @include containerSize(100%, auto);
   min-height: 100%;
   position: relative;
   background-color: #fff;
   padding: 1.6rem 15%  0.4rem;
   background: url('http://img.yunxingzh.com/40b6b2b2-2627-4141-abab-2afd312992c2.png') no-repeat;
   background-size: cover;
   -webkit-background-size: cover;
}
.succ-tit {
  font-size: 0.36rem;
  font-weight: 500;
  color: #1e2c3d;
  @include marGin(bottom, 0.75rem);
}
.reserve-info {
  color: #1e2c3d;
  @include marGin(top, 0.36rem);
}

.reserve-info-l {
  display: block;
  font-weight: 600;
  @include containerSize(30%,auto);
  font-size: 0.32rem;
}
.reserve-info-r {
  display: block;
  @include containerSize(70%,auto);
  text-align: justify;
  font-size: 0.32rem;
  line-height: 146%;
}
.reserve-award {
  margin-top: 1.1rem;
  line-height: 150%;
  font-size: 0.3rem;
  color: #1e2c3d;
}
.sucd-pillow {
  @extend %blockAuto;
  @include containerSize(84%, auto);
 @include marGin(top, 0.36rem);
}
.succ-tip {
  @include marGin(top, 0.6rem);
  font-size: 0.32rem;
  font-weight: 500;
}
.color760 {
  color: #da4760;
}
</style>

<template>
  <div class="succ">
    <h2 class="succ-tit g-tac">您已经成功预约</h2>
    <p class="reserve-info g-clearfix">
      <span class="g-fl reserve-info-l">预&nbsp;&nbsp;约&nbsp;码：</span>
      <span class="g-fl reserve-info-r color760">{{code}}</span>
    </p>
    <p class="reserve-info g-clearfix">
      <span class="g-fl reserve-info-l">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
      <span class="g-fr reserve-info-r">{{ads}}</span>
    </p>
    <p class="reserve-info g-clearfix">
      <span class="g-fl reserve-info-l">咨询电话:</span>
      <span class="g-fr reserve-info-r">85558889</span>
    </p>
    <p class="reserve-award g-tac">如约献血即有机会获得<br/>价值680元依Q兔健康枕</p>
    <img class="sucd-pillow" src="http://img.yunxingzh.com/936f4333-58f3-418e-9abb-3b52cfd9e016.png">
    <p class="succ-tip g-tac color760">*请截图妥善保存预约码</p>
  </div>
</template>

<script>
import CGI from '../lib/cgi.js'

export default {
  data() {
    return {
      code: 0,
      ads: ''
    }
  },
  activated() {
    this.code = this.$store.state.code;
    this.ads = this.$store.state.ads;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
