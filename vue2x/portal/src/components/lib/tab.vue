<template>
  <div class="tab">
    <ul class="flex-space" v-if="dataReady">
      <li class="g-tac tab-list" v-for="(list,idx) in val.tablist" @click=tabClick(list,idx)><span :class="{'span-bottom':selidx==idx}">{{list.text}}</span></li>
    </ul>
  </div>
</template>

<script>
import CGI from '../../lib/cgi.js'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var live = query.live || '';
export default {
  name: 'tab',
  data() {
    return {
      //tablist: ['东莞','热点','查询','视频','更多'],
      val: [],
      dataReady: false
    }
  },
  props: {
    selidx: Number,
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  },
  methods: {
    getData() {
      var p = {
        uid: uid,
        token: token,
        key: live,
      }
      CGI.post('get_conf', p, (resp)=> {
        if (resp.errno == 0) {
          this.val = JSON.parse(resp.data.val);
          this.dataReady = true;
        }
      })
    },
    tabClick(list,idx) {
      var len = 0;
      if (this.val.tablist.length >0) {
        len = this.val.tablist.length - 1;
      }
      this.$emit('tab-change', list, idx, len);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-space {
  width: 100%;
  max-width: 750px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -wekit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  top:  0.88rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  z-index: 5;
}
.tab-list{
  width:  25%;
  float: left;
}
.tab-list span{
  display: inline-block;
  color: #6fc8ff;
  font-size: 0.36rem;
  line-height: 0.88rem;
}
.tab-list .span-bottom {
  border-bottom: 1px solid #009cfb;
  color: #009cfb;
}
.router-link-active {
  border-bottom: 1px solid #fff;
}
</style>
