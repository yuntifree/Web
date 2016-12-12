<template>
  <div class="hello">
    <ul class="flex-space">
      <li class="g-tac"><router-link to="/hello/newest">最新</router-link></li>
      <li class="g-tac"><router-link to="/hello/hot">最热</router-link></li>
      <li class="g-tac"><router-link to="/hello/evaluate">评价</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    cur() {
      //return this.$store.state.active;
    }
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-space {
  display: flex;
  justify-content: space-between;
}
.flex-space li {
  flex:  1;
}
.router-link-active {
  color: orange;
}
</style>
