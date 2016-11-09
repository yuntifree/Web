<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/newslist'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style lang="scss">
  @import './assets/css/reset.css';
</style>
