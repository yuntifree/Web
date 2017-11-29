<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.logined-user {
  @extend %user;
}
</style>

<template>
<div class="logined-user" v-show="show">
  <p>手机号：{{phone}}</p>
  <p class="go-login" @click="goLink">切换手机号</p>
</div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    phone: String,
  },
  methods: {
    goLink() {
      this.$store.state.routerName = 'business';
      this.$router.push({name: 'login'})
    }
  }
}
</script>
