<template>
  <div class="news top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newslist></newslist>
  </div>
</template>

<script>
import newslist from './lib/newslist.vue'
import hotspot  from './lib/hotspot.vue'
import tab from './lib/tab.vue'
import download from './lib/download.vue'
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
    hotspot,
    newslist
  },
  activated() {
    this.tabIdx = 0;
  },
  methods: {
    tabChange(idx) {
      this.$store.state.selidx = idx;
      this.tabIdx = idx;
      switch (idx) {
        case 0: 
          this.$router.push({name: 'news'});
          break;
        case 1:
          this.$router.push({name: 'hotspot'});
          break;
        case 2:
          this.$router.push({name: 'service'});
          break;
        case 3:
          location.href = 'http://jump.luna.58.com/i/29a3';
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
