<style lang="scss" scoped>
@import '../assets/css/common.scss';
.info {
  @include containerSize(100%, 100%);
  min-height: 100%;
  background-color: #fff;
  padding-bottom: 0.4rem;
}
.info img {
  @include containerSize(100%, auto);
}
.info-text {
  font-size: 0.32rem;
  line-height: 150%;
  color: #1e2c3d;
}
.info-text span{
  color: #fa685d;
}
.info-rule {
  @include containerSize(100%, auto);
  @extend %blockAuto;
  padding: 0.34rem 8% 0.4rem;
  font-size: 0.28rem;
  color: #828282;
  position: relative;
  background-color: #fff;
}
.info-rule::after {
  display: block;
  content: ' ';
  position: absolute;
  bottom: 0.2rem;
  right: 8%;
  width: 1.12rem;
  height: 1px;
  background-color: #828282;
}
</style>
<template>
  <div class="info">
    <img src="http://img.yunxingzh.com/d5b30477-b6c2-4080-bd8c-de768ef15732.png">
    <p class="g-tac info-text">你知道吗？<br/>在东莞献血满200CC即可享受<br/><span>全国终身免费用血</span></p>
    <router-link class="info-btn g-tac" to="/write">预约献血</router-link>
    <router-link class="info-rule g-fr g-tar" to="/rule">活动规则</router-link>
  </div>
</template>

<script>
// 通过时间戳来判断是非第一次进入该页面
export default {
  name: 'info',
  data() {
    return {
     }
  },
  computed: {
  },
  components: {
  },
  activated() {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
