<template>
  <div id="webview">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'webview',
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
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


