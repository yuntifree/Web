<template>
  <div class="scenes">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'scenes',
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
.wifilink {
  max-width: 750px;
  margin: 0 auto;
}
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


