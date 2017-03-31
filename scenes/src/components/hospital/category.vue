<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.hospital-cate,
.cate-list {
  @include containerSize(100%, auto);
  background-color: #fff;
}
.hospital-cate {
  padding-bottom: 0.5rem;
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
  @include containerSize(100%, auto);
  border-top: 1px solid #dcdcdc;
  //border-bottom: 1px solid #dcdcdc
}
.cate-list-inner li {
  width: 25%;
  height: 1.04rem;
  border-right: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
}
.cate-text {
  width: 100%;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.cate-list-inner li:nth-child(4n+4) {
  border-right: 0;
}
</style>
<template>
  <div class="category hospital-cate">
    <div class="cate-list" v-for="item in categorys">
      <h2 class="cate-list-name g-clearfix"><img class="g-fl" :src="item.icon"><span class="g-fl" v-text="item.name"></span></h2>
      <ul class="cate-list-inner g-clearfix">
        <li class="g-tac g-fl" v-for="list in item.lists" @click="goKeshi(list.name)"><span class="cate-text g-tac" v-html="list.text"></span></li>
        <template v-for="idx in 4"><li v-if="makeCell(idx, item.lists.length)" class="g-tac g-fl"><span class="cate-text"></span></li></template>
      </ul>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'

export default {
  name: 'category',
  data () {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      categorys: [{
        icon: '../../../static/images/hospital/ico_medicine.png',
        name: '内科系统',
        lists: [{
          text: '内一科',
          name: 'neiyike'
        },{
          text:'内二科',
          name: 'neierke'
        },{
          text:'儿科',
          name: 'erke'
        },{
          text:'康复理疗科<br/>（中医科）',
          name: 'zhongyike'
        }]
      },{
        icon: '../../../static/images/hospital/ico_surgical.png',
        name: '外科系统',
        lists: [{
          text:'普通外科',
          name: 'putongwaike'
        },{
          text: '骨外科',
          name: 'guwaike'
        },{
          text: '手外科',
          name: 'shouwaike'
        },{
          text:'妇产科',
          name: 'fuchanke'
        },{
          text: '麻醉科<br/>(手术室)',
          name: 'mazuike'
        },{
          text: '口腔科',
          name: 'kouqiangke'
        },{
          text: '五官科',
          name: 'wuguanke'
        },{
          text: '神经外科',
          name: 'shenjingwaike'
        }]
      },{
        icon: '../../../static/images/hospital/ico_clinic.png',
        name: '门、急诊',
        lists: [{
          text:'门诊部',
          name:'menzhen'
        },{
          text:'急诊部',
          name:'jizhen'
        },{
          text:'门诊妇产科',
          name: 'fuchanke'
        }]
      },{
        icon: '../../../static/images/hospital/ico_medical.png',
        name: '医技科室',
        lists: [{
          text:'影像科',
          name: 'yingxiangke'
        },{
          text: '药剂科',
          name: 'yaojike'
        },{
          text: '检验科',
          name: 'jianyanke'
        },{
          text: 'B超室',
          name:'科理室'
        }]
      },{
        icon: '../../../static/images/hospital/ico_else.png',
        name: '其它科室',
        lists: [{
          text:'预防保健科',
          name: 'baojianke'
        },{
          text: '体检中心',
          name: 'tijian'
        }]
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
    makeCell(idx, length) {
      var ret = false;
      if (length % 4 == 0) {
        ret = false;
      } else {
        ret = idx <= 4 - length % 4;
      }
      return ret;
    },
    goKeshi(name) {
      if (name == 'neiyike') {
        this.$store.state.keshi = name;
        this.$router.push({name: 'categoryItem'})
      } else {
        this.tipBox('资料完善中，敬请期待');
      }
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

