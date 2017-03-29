<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.doctor {
  @include containerSize(100%, auto);
}
.doctor-list {
  padding: 0.3rem 5%;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
}
.doctor-intro {
  width: 80%;
  max-width: 5.3rem;
  overflow: hidden;
} 
.doctor-img {
  @include containerSize(28%,1.9rem);
  line-height: 1.9rem;
  max-width: 1.56rem;
  overflow: hidden;
}
.doctor-img img {
  @include containerSize(100%, auto);
}
.doctor-inner-intro {
  padding: 0 0.3rem;
  @include containerSize(71%, auto);
}
.doctor-name {
  font-size: 0.32rem;
  color: #3c3c3c;
  line-height: 0.5rem;
}
.doctor-name span:first-child {
  padding-right: 0.24rem;
}
.doctor-title {
  font-size: 0.30;
  color: #969696;
  margin-top: 0.2rem;
}
.btn-intro {
  padding: 0.16rem 0.37rem;
  border-radius: 0.08rem;
  background-color: #5097f5;
  font-size: 0.30rem;
  color: #fff;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}
</style>
<template>
  <div class="doctor">
    <div class="doctor-list g-clearfix" v-for="(item,index) in doctors">
      <dl class="doctor-intro g-clearfix g-fl">
        <dt class="doctor-img g-fl"><img :src="item.img"></dt>
        <dd class="g-fl doctor-inner-intro">
          <h2 class="doctor-name"><span v-text="item.name"></span><span v-text="item.title"></span></h2>
          <p class="doctor-title" v-text="item.desc"></p>
        </dd>
      </dl>
      <button class="g-fr btn-intro" @click="getDoctor(index)">介绍</button>
    </div>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'

export default {
  name: 'doctor',
  data () {
    return {
      doctors: [{
        img: '../static/images/ico_login_logo.png',
        name: '鲁大师',
        title: '内一科主任',
        desc: '急诊医学副主任医师',
      },{
        img: '../static/images/ico_login_logo.png',
        name: '鲁大师',
        title: '内一科主任',
        desc: '急诊医学副主任医师',
      },{
        img: '../static/images/ico_login_logo.png',
        name: '鲁大师',
        title: '内一科主任',
        desc: '急诊医学副主任医师',
      },{
        img: '../static/images/ico_login_logo.png',
        name: '鲁大师',
        title: '内一科主任',
        desc: '急诊医学副主任医师',
      },{
        img: '../static/images/ico_login_logo.png',
        name: '鲁大师',
        title: '内一科主任',
        desc: '急诊医学副主任医师',
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
    getDoctor(idx) {
      this.$store.state.doctorIdx = idx;
      this.$router.push({name: 'doctorItem'});
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

