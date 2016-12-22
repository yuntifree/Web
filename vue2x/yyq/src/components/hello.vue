<template>
  <div class="hello">
    <ul class="flex-space">
      <li class="g-tac"><router-link :to="{name: 'newest'}">最新</router-link></li>
      <li class="g-tac"><router-link :to="{name: 'hot'}">最热</router-link></li>
      <li class="g-tac"><router-link :to="{name: 'evaluate'}">评价</router-link></li>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

</style>
