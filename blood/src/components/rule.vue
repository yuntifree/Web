<style scoped lang="scss">
@import '../assets/css/common.scss';
.rule {
  @include containerSize(100%, auto);
  min-height: 100%;
  background-color: #FFF6BF;
  padding: 0.9rem 8%;
}
.rule-title {
  font-size: 0.34rem;
  color: #1e2c3d;
}
.rule-list {
  margin-top: 0.36rem;
  font-size: 0.3rem;
  color:#1e2c3d;
}
.rule-list li {
  list-style: decimal inside;
  line-height: 150%;
  text-align: justify;
  margin-bottom: 0.4rem;
}
.rule-btn {
  width: 100%;
  @include marGin(top,0.88rem);
}
.rule-com {
  font-size: 0.3rem;
  color: #fa685d;
}
</style>
<template>
  <div class="rule">
    <h2 class="rule-title">活动规则：</h2>
    <ul class="rule-list">
      <li v-for="list in lists" v-text="list"></li>
    </ul>
    <p class="rule-com">睡不着就睡她--依Q兔颈椎养护枕爱心赞助</p>
    <router-link class="info-btn rule-btn g-tac" to="/write">预约献血</router-link>
  </div>
</template>

<script>
export default {
  name: 'service',
  data () {
    return {
      lists: ['活动时间6月7日-6月25日','预约活动期间内，在线通过本活动页预约献血，并于预约的时间到血站成功献血，即有机会获得价值680健康枕或价值99元午睡枕一个。','本次公益献血活动捐献O型或A型血的捐血者前150名可以得到依Q兔颈椎养护枕，其他300名捐献者可以得到“依Q兔”U形抱枕','预约成功即可获得一个预约码，请妥善截图保存预约码，并于现场献血时出示预约码，献血成功会由现场工作人员记录信息，并登记相关信息以便健康枕发放。','本次活动由东莞无限与东莞市中心血站共同举办，活动最终解释权归东莞无限与东莞市中心血站共有。'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

