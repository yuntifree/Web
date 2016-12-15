<template>
  <div class="hello">
    <img class="bg-img" :src="val.bgimg">
    <img class="btn-img" :src="val.btnimg" 
          :style="{width:val.btnWidth,top:val.btnTop}"
          @click="btnClick(val.urlLink)">
  </div>
</template>

<script>
import CGI from '../lib/cgi.js'
var query = CGI.query();
var name = query.name || '';
export default {
  name: 'hello',
  data () {
    return {
      val: {},
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  },
  methods: {
    getData() {
      var param = {
        uid: 137,
        token: '6ba9ac5a422d4473b337d57376dd3488',
        key: name,
      }
      CGI.post('get_conf', param, (resp)=> {
        if (resp.errno == 0) {
          this.val = JSON.parse(resp.data.val);
          document.title = this.val.title;
        }
      })
    },
    btnClick(url) {
      location.href = url;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/common.scss';
.hello {
  position: relative;
  @include containerSize(100%,auto);
}
.bg-img {
    @include containerSize(100%,auto);
}
.btn-img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
</style>
