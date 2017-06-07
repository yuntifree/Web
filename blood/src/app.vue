<template>
  <div class="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import './assets/css/reset.css','./assets/css/common.scss';
html {
  @include containerSize(100%, 100%);
  min-height: 100%;
}
body,
.app {
  @include containerSize(100%, 100%);
  min-height: 100%;
}
.info-btn {
  display: block;
  width:84%;
  line-height: 0.9rem;
  margin: 0.5rem auto 0;
  font-size: 0.32rem;
  background-color: #fa685d;
  color: #fff;
  border-radius: 0.08rem;
}
.info-tit {
  font-size: 0.32rem;
  color: #1e2c3d;
  font-weight: 800;
}
.write-ipt {
  display: block;
  @include containerSize(100%, auto);
  margin-top: 0.24rem;
  padding: 0.21rem 0.21rem 0.24rem;
  border: 1px solid #969696;
  border-radius: 0.08rem;
  font-size: 0.32rem;
}
.write-ipt:-webkit-place-holder {
  color: #b4b4b4
}
</style>


