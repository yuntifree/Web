<template>
  <div>
    <div class="service-menu" v-for="ser in serdata">
      <p class="service-title" v-text="ser.name"></p>
      <ul class="service-list g-clearfix">
        <li class="g-fl list-item g-tac" v-for="(item,index) in ser.items"
            @click="openLink(item)">
          <img :src="item.img">
          <p class="g-tac title-name" v-text="item.title"></p>
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
    serdata: Array,
  },
  mounted() {
  },
  methods: {
    openLink(item) {
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
      window.open(item.dst);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common.scss';
.service-menu {
  @include containerSize(100%, auto);
  margin-bottom: 0.2rem;
  background-color: #fff;
}
.service-list {
  @include containerSize(100%, auto);
}
.title-toutiao {
  padding: 0.12rem 0 0.18rem 0;
}
.service-title {
  padding: 0.2rem 0.3rem;
  font-size: 0.36rem;
  font-weight: 500;
  color: #3c3c3c;
  border-bottom: 1px solid  #e7e7e7;
}
.list-item {
  @include containerSize(20%, auto);
  padding: 0.42rem 0 0.3rem;
}
.list-item img {
  width: 0.507rem;
  height: 0.516rem;
  margin-bottom: 0.177rem;
}
</style>
