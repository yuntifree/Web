<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.hospital-intro {
  @include containerSize(100%, auto);
  background-color: #F0F0F0;
}
.hospital-intro-banner {
  display: block;
  @include containerSize(100%, auto);
}
.hospita-intro-info {
  padding: 0.28rem 0 0.2rem;
  background-color: #fff;
}
.info-title {
  font-size: 0.36rem;
  color: #3c3c3c;
}
.info-desc-inner {
  position: relative;
  @include containerSize(100%, 0.46rem);
  margin-top: 0.12rem;
}
.desc-inner {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%)
}
.info-icon {
  display: block;
  @include containerSize(0.4rem, 0.4rem);
}
.inner-desc {
  font-size: 0.32rem;
  color: #969696;
  line-height: 0.4rem;
}
.hospital-deltail {
  margin-top: 0.3rem;
  background-color: #fff;
  padding: 0 0.32rem;
}
.detail-list {
  border-bottom: 1px solid #e6e6e6;
  padding: 0.27rem 0;
  position: relative;
}
.detail-list img {
  @include containerSize(0.54rem, 0.54rem);
  display: block;
  margin-top: -0.06rem;
}
.detail-list span {
  font-size: 0.32rem;
  line-height: 150%;
  display: block;
}
.list-key {
  width: 1rem;
  color: #282828;
}
.list-val {
  color: #969696;
  text-align: justify;
  width: 73%;
  max-width: 5rem;
}
.hospital-introduction {
  background-color: #fff;
  padding: 0 0.32rem 0.86rem;
}
.intro-title {
  //line-height: 1.08rem;
  padding: 0.27rem 0;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0.16rem;
}
.intro-title span{
  font-size: 0.32rem;
}
.intro-title img{
  display: block;
  @include containerSize(0.54rem, 0.54rem);
  margin-top: -0.06rem;
}
.hospital-introduction p {
  font-size: 0.26rem;
  line-height: 1.5;
  color: #969696;
  text-indent: 2em;
  text-align: justify;
}
</style>
<template>
  <div class="hospital-intro">
    <img class="hospital-intro-banner" :src="items.banner">
    <div class="hospita-intro-info">
      <p class="info-title g-tac" v-text="items.title"></p>
      <div class="info-desc-inner">
        <p class="desc-inner g-clearfix"><img class="info-icon g-fl" :src="items.descIco"><span class="inner-desc g-fl" v-text="items.desc"></span></p></div>
    </div>
    <ul class="hospital-deltail">
      <li v-for="list in items.details" class="detail-list g-clearfix">
        <img class="g-fl" :src="list.icon">
        <span class="list-key g-fl" v-text="list.key"></span>
        <span class="list-val g-fl" v-text="list.val"></span>
      </li>
    </ul>
    <div class="hospital-introduction">
      <h2 class="intro-title g-clearfix"><img class="g-fl" :src="items.introduction.icon"><span class="g-fl">{{items.introduction.title}}</span></h2>
      <p v-for="list in items.introduction.desc" v-text="list"></p>
    </div>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'

export default {
  name: 'videos',
  data () {
    return {
      items: {
        banner: '../static/images/hospital/img_banner_hospital.png',
        title: '东莞市石排医院',
        desc: '综合医院',
        descIco: '../static/images/hospital/ico_shipaihospital.png',
        details: [{
          icon: '../static/images/hospital/ico_name.png',
          key: '别名：',
          val: '东莞市石排医院，石排医院'
        },{
          icon: '../static/images/hospital/ico_phone.png',
          key: '电话：',
          val: '0769-86556233'
        },{
          icon: '../static/images/hospital/ico_add.png',
          key: '地址：',
          val: '东莞市石排镇石排大道中段198号东莞市石排镇石排大道中段198号东莞市石排镇石排大道中段198号'
        },{
          icon: '../static/images/hospital/ico_web.png',
          key: '网址：',
          val: 'http://www.dgspyy.com.cn/'
        }],
        introduction: {
          icon: '../static/images/hospital/ico_web.png',
          title: '简介',
          desc: ['石排医院始建于 1958 年，由于地处偏僻，条件简陋，2000年在石排镇委、镇政府、社会各届的大力支持下，重新选址，投资一亿余元兴建的石排新医院，于2003年1月建成并投入使用，其座落于石排大道与王仲铭大道交汇处，占地面积 4.3 万 m2，建筑面积3.2万m2，由门诊大楼、住院大楼、医技综合楼及附楼组成。床位编制360张，平均日门诊达2300人次、平均日住院330余人次。医院先后荣获“广东省巾帼文明示范岗”、广东省高等医学院校教学医院、“东莞市文明单位”、“东莞市园林式单位”“东莞市青年文明号”、“东莞市文化建设标兵医院”、“东莞市卫生系统卫生工作先进单位”、“东莞市无烟医院”等称号。','医院现有员工587人，其中技术人员511人（正高职称15人、副高职称47人、中级职称105人、研究生9人）。拥有14个职能部门及27个临床、医技科室，2个下属门诊。住院部设有内一科、内二科、儿科、妇科、产科、普外科（含普外、胸外、泌尿外科、烧伤、碎石中心）、骨科、手外科、神经外科（含五官、口腔科）、中医科等临床科室。门诊大楼内设有急诊科、内科、外科、妇科、产科、儿科、五官科、口腔科、皮肤科、中医科、康复理疗科、高压氧治疗中心、检验科、病理科等。其中不孕不育症门诊、泌尿男性专科门诊、心脑血管专科、高血压门诊、糖尿病门诊、骨科成为我院特色专科。并配备功能齐全，拥有空气循流万级、千级的手术室。','为提高诊疗水平，医院先后购置了日本日立核磁共振、美国 GE 公司 Prospeed AI 螺旋 CT 、50KW 高频遥控 X 射线诊断系统、日本津岛 C 型臂 X 光机、美国纽帮呼吸机、日本产全自动生化分析仪、瑞士新生儿微量生化仪、意大利产彩色多普勒超声仪、奥林巴斯电子胃镜、电子结肠镜、德国产蛇牌高频电力及电动颅钻、高分辩手术显微镜、WOLF 膀胱尿道镜、输尿管纤维镜、Leep刀、可视人流设备、体外震波碎石机、腹腔镜、宫腔镜、阴道镜、关节腔镜等一大批先进医疗设备。',' 医院注重业务技术提高，重点加强专科建设，努力创造特色优势，从专科特色中求生存，谋发展。近几年来，医院成功地开展了大面积烧伤抢救、颅内血肿清除术、肺叶切除、肝叶切除、肾切除术、胃癌根治、胰腺癌根治、乳腺癌根治术、泌尿系切开取石、体外震波碎石、膀胱肿瘤电切、前列腺增生电切术、全髋关节置换术、脊柱骨折的前后多种入路内固定术、断手（指、趾）再植术、各种皮瓣、肌皮瓣移植术、宫颈癌根治术、阴式子宫切除术、新式剖宫产术、子宫肌瘤切除术等大中型手术，同时在微创技术方面取得一定成效，能熟练开展腹腔镜下、宫腔镜下、关节腔镜下的多种探查术和切除术。','医院围绕“忠诚卫生事业，保障人民健康”的办院宗旨，发扬“诚信、和谐、奉献、进取”的医院精神，树立“以人为本、热情关爱”的服务理念，不断改善服务态度和服务质量，提高医疗技术水平，竭诚为广大群众提供优质的医疗服务。']
        }
      },
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

