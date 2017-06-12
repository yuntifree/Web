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
      lists: ['活动时间与地点：6月19日-6月24日，全市7各固定捐血点；6月25日，旗峰公园捐血点。','活动期间内，在线通过本活动页预约献血，并于约定时间到捐血站点成功献血的，即有机会获得“依Q兔”颈椎养护枕或高端抱枕1个。','本次公益活动捐献O型血的市民有机会得到“依Q兔”颈椎养护枕，其他血型捐献者有机会得到“依Q兔”高端抱枕。','预约成功即可获得一个预约码，请妥善截图保存，于现场献血时出示预约码，献血成功会由现场工作人员记录信息，并登记相关信息以便礼品发放。','本次活动由东莞无限与东莞市中心血站共同举办，活动最终解释权归东莞无限与东莞市中心血站共有。'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

