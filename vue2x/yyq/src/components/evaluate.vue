<template>
  <div class="hello">
    <div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30">
        {{share}}
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi.js'

export default {
  name: 'hello',
  data () {
    return {
      loading: false,
      share: '',
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData(0);
    })
  },
  methods: {
    getData(seq) {
      var param = {
        seq: seq,
        num: 20,
        uid: this.$store.state.uid,
        token: this.$store.state.token,
      }
      CGI.post('get_share_list',param, (resp)=> {
        if (resp.errno === 0) {
          this.share = JSON.stringify(resp.data);
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    loadMore() {
      this.loading = true;
      var len = this.opened.length-1;
      if (this.nomore) {
        setTimeout(()=>{
          //this.getData(this.opened[len].seq);
        },1000)
      }
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
