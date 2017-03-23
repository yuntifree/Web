<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.category-item {
  @include containerSize(100%, auto);
  padding: 0.24rem;
}
.cate-item-name {
  line-height: 0.56rem;
  font-size: 0.4rem;
  color: #434343;
  padding-top: 0.32rem;
}
.cate-item-date {
  line-height: 150%;
  padding: 0.16rem 0;
  font-size: 0.24rem;
  color: #848484;
  border-bottom: 1px solid #e6e6e6;
}
.cate-intro-list li{
  list-style: decimal inside;
  font-size: 0.32rem;
  color: #434343;
  margin-top: 0.4rem;
}
.intro-list-desc {
  text-indent: 2em;
  line-height: 150%;
}
</style>
<template>
  <div class="category-item" v-if="infos">
    <h2 class="g-tac cate-item-name" v-text="infos.title"></h2>
    <p class="g-tar cate-item-date">日期{{infos.date}}</p>
    <ul class="cate-intro-list">
      <li v-for="info in infos.items">
        {{info.title}}
        <p class="intro-list-desc">{{info.desc}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'
import hosIntro from '../../lib/hosIntro.js'

export default {
  name: 'category-item',
  data () {
    return {
      infos: {},
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=> {
    })
  },
  activated() {
    var name = this.$store.state.keshi;
    this.infos = hosIntro.hosIntro[name];
  },
  methods: {
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

