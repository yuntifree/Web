<template>
  <div class="news top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newslist></newslist>
  </div>
</template>

<script>
import newslist from './lib/newslist.vue'
import tab from './lib/tab.vue'
import download from './lib/download.vue'
import CGI from '../lib/cgi.js'
export default {
  name: 'news',
  data() {
    return {
      tabIdx: -1,
    }
  },
  components: {
    download,
    tab,
    newslist
  },
  activated() {
    this.tabIdx = 0;
  },
  methods: {
    tabChange(list,idx) {
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
