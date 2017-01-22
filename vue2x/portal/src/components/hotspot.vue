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
    tabChange(list, idx) {
      this.$store.state.tabidx = idx;
      this.tabIdx = idx;
      CGI.tabChange(this.$router, list, false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
