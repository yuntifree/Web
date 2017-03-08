<template>
  <div class="urban-menu">
    <div class="touch-menu">
      <ul class="menu-lists g-clearfix" ref="alloy">
        <li class="menu-item g-fl g-tac" 
            v-for="(ur, index) in urbandata" 
            :data-idx="index"
            @click="openLink(ur)"
            ref="'alloylist'">
          <img :src="ur.img">
          <p  class="g-tac urban-text" v-text="ur.title" ></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CGI from '../../lib/cgi.js'
export default {
  name: 'urban-menu',
  props: {
    urbandata: Array,
  },
  mounted() {
    this.$nextTick(()=> {
      var len = this.urbandata.length;
      var width = document.documentElement.clientWidth;
      //this.$refs.alloy.childNodes.style.width = (width*0.2) +'px';
      this.$refs.alloy.style.width = len * (width*0.22) +'px';
      this.$refs.alloy.childNodes.forEach((item)=> {
        item.style.width = (width*0.22) +'px';
      })
    })
  },
  methods: {
    openLink(item,) {
      var url = '';
      var param = {
        id: item.id,
        type: 8,
        name: item.name
      }
      CGI.post('report_click', param, (resp)=> {
        if (resp.errno === 0) {
        } else {
        }
      })
      if (item.routername) {
          url = window.document.location.href.toString();
          url = url.replace("index.html","wifilink.html");
          url = url + '#/'+ item.routername
        } else {
           url = item.dst;
        }
      window.open(url);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common.scss';
.urban-menu {
  width: 100%;
  height: 2rem;
  padding: 0.32rem 0;
  overflow: hidden;
  margin-bottom: 0.2rem;
  background-color: #fff;
}
.touch-menu {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
.menu-lists {
  height: 2.2rem;
}
.menu-item {
  width: 20%;
  margin-right: 0;
  padding-left: 20px;
  padding-right: 20px;
}
.menu-item img{
  @include containerSize(0.88rem, 0.88rem);
}
.urban-text {
  font-size: 0.28rem;
  color: #3c3c3c;
  margin-top: 0.1rem;
}
</style>
