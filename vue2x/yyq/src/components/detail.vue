<template>
  <div>
    <p>{{detailData}}</p>
    <ul class="flex-space">
      <li class="g-tac"><router-link :to="{path: 'records'}">参与历史</router-link></li>
      <li class="g-tac"><router-link :to="{name: 'intro'}">图文详情</router-link></li>
      <li class="g-tac"><router-link :to="{name: 'history'}">往期揭晓</router-link></li>
      <li class="g-tac"><router-link :to="{name: 'goodshare'}">晒单分享</router-link></li>
    </ul>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi.js'

var query = CGI.query();
export default {
  name: 'hello',
  data () {
    return {
      detailData: ''
    }
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      var param = {
        bid: this.$store.state.bid,
        uid: this.$store.state.uid,
        token: this.$store.state.token
      }
      CGI.post('get_detail', param, (resp)=> {
        if (resp.errno == 0) {
          this.detailData = JSON.stringify(resp.data);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
