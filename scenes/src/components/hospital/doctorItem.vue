<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.doctor-item {
  @include containerSize(100%, auto);
  padding: 0.24rem;
}
.doctor-item-name {
  line-height: 0.56rem;
  font-size: 0.4rem;
  color: #434343;
  padding-top: 0.32rem;
}
.doctor-item-date {
  line-height: 150%;
  padding: 0.16rem 0;
  font-size: 0.24rem;
  color: #848484;
  border-bottom: 1px solid #e6e6e6;
}
.doctor-item-img {
  @include containerSize(2.3rem, auto);
  display: block;
  margin: 40px auto;
}
.doctor-list-desc {
  text-indent: 2em;
  line-height: 150%;
  color: #434343;
  font-size: 0.32rem;
  text-align: justify;
}
</style>
<template>
  <div class="doctor-item" v-if="infos">
    <h2 class="g-tac doctor-item-name" v-text="infos.title"></h2>
    <p class="g-tar doctor-item-date">日期{{infos.date}}</p>
    <img class="doctor-item-img" v-if="infos.img" :src="infos.img">
    <p class="doctor-list-desc">{{infos.text}}</p>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'
import docInfo from '../../lib/hosIntro.js'

export default {
  name: 'doctor-item',
  data () {
    return {
      infos: {},
    }
  },
  components: {
    tip,
  },
  activated() {
    var idx = this.$store.state.doctorIdx;
      this.infos = docInfo.docInfo[idx];
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

