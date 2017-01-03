<template>
  <div id="wifilink">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'wifilink',
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


