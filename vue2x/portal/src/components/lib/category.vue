<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.hospital-cate,
.cate-list {
  @include containerSize(100%, auto);
  background-color: #fff;
}
.cate-list-name {
  padding: 0.32rem 0.44rem;
}
.cate-list-name img {
  display: block;
  @include containerSize(0.44rem, 0.44rem);
  margin-right: 0.15rem;
}
.cate-list-inner {
  border-top: 1px solid #dcdcdc;
}
.cate-list-inner li {
  width: 25%;
  padding: 0.34rem 0 0.31rem;
  border-right: 1px solid #dcdcdc;
  box-sizing: content-box;
  border-bottom: 1px solid #dcdcdc
}
</style>
<template>
  <div class="hospital-cate">
    <div class="cate-list" v-for="item in categorys">
      <h2 class="cate-list-name g-clearfix"><img class="g-fl" :src="item.icon"><span class="g-fl" v-text="item.name"></span></h2>
      <ul class="cate-list-inner g-clearfix">
        <li class="g-tac g-fl" v-for="list in item.lists">{{list}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import tip from './tip.vue'
import CGI from '../../lib/cgi'

export default {
  name: 'videos',
  data () {
    return {
      categorys: [{
        icon: '../../../static/images/hospital/ico_medicine.png',
        name: '内科系统',
        lists: ['内一科','内二科','内一科','康复理疗科<br/>（中医科）']
      },{
        icon: '../../../static/images/hospital/ico_surgical.png',
        name: '外科系统',
        lists: ['神经外科','骨外科','手外科','妇产科','麻醉科<br/>(手术室)','口腔科','五官科','神经外科']
      },{
        icon: '../../../static/images/hospital/ico_clinic.png',
        name: '门、急诊',
        lists: ['门诊部','急诊部','门诊妇产科']
      },{
        icon: '../../../static/images/hospital/ico_medical.png',
        name: '医技科室',
        lists: ['影像科','药剂科','检验科','科理室']
      },{
        icon: '../../../static/images/hospital/ico_else.png',
        name: '其它科室',
        lists: ['预防保健科','体检中心']
      }],
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=> {
    })
  },
  methods: {
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

