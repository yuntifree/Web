<template>
  <div class="tab">
    <ul class="flex-space">
      <li class="g-tac"><router-link :to="{name:'newslist'}">新闻</router-link></li>
      <li class="g-tac"><router-link :to="{name:'videos'}">视频</router-link></li>
      <li class="g-tac"><router-link :to="{name:'service'}">本地服务</router-link></li>
    </ul>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tab',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  padding-top: 0.8rem;
}
.flex-space {
  display: flex;
  justify-content: space-between;
  background-color: #009cfb;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}
.flex-space li {
  flex:  1;
  padding: 0.08rem 0;
}
.flex-space li a{
  color: #fff;
  font-size: 0.36rem;
  padding: 0.08rem 0 0.06rem;
}
.router-link-active {
  border-bottom: 1px solid #fff;
}
</style>
