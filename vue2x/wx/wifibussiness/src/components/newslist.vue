<style lang="scss">
@import '../assets/css/common.scss';

</style>
<template>
<div id="newslist">
  <div>123</div>
  <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
</div>

</template>
<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'
var query = CGI.query();
var uid = 137;
var token = '6ba9ac5a422d4473b337d57376dd3488';
var union = query.union || '';
export default {
  name: 'newslist',
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
      
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(function () {
      
    })
  },
  methods: {
    getData(seq) {

    },
  }
}
</script>
