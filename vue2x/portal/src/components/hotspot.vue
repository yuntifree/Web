<template>
  <div class="hotspot top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newshot></newshot>
  </div>
</template>

<script>
import newshot  from './lib/newshot.vue'
import tab from './lib/tab.vue'
import download from './lib/download.vue'
import CGI from '../lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 137;
var token = query.token || '6ba9ac5a422d4473b337d57376dd3488';

export default {
  name: 'hotspot',
  data() {
    return {
      tabIdx: -1
    }
  },
  components: {
    download,
    tab,
    newshot,
  },
  activated() {
    this.tabIdx = 1;
  },
  methods: {
    tabChange(list, idx, len) {
      if (idx !== len) {
        this.tabIdx = idx;
      }
      CGI.tabChange(this.$router, list, false, uid, token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
