<template>
  <div class="hotspot top88">
    <download></download>
    <news :type="11"></news>
  </div>
</template>

<script>
import news  from './news.vue'
import download from '../lib/download.vue'
import CGI from '../../lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';

export default {
  data() {
    return {
      tabIdx: -1
    }
  },
  components: {
    download,
    news,
  },
  activated() {
    this.tabIdx = 1;
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top88 {
  padding-top: 0.88rem;
}
</style>
