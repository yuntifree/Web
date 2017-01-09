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
export default {
  name: 'hotspot',
  data() {
    return {
      tabIdx: -1,
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
