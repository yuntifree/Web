<style lang="scss" scoped>
@import './assets/css/common.scss';

html,body,#app{
  @include containerSize(100%, 100%);
}
#app {
    background-image: linear-gradient(to top, #2d3042, #1c1e28);
}
.app-tit {
  padding-top: 82px;
  color: #fff;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 120px;
}
.app-login {
  @include containerSize(300px, 256px);
  margin: 0 auto;
  border-radius: 6px;
  background-color: #ffffff;
  padding: 24px 24px 0px 24px;
}

.login-bottom {
  position: relative;
  width: 100%;
}
.login-error {
  @include containerSize(100%, 28px);
  background-color: rgba(252, 95, 60, 0.2);
  border: solid 1px #fc5f3c;
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  color: #ff0002;
  @include pos(top,0,left,0);
  .ivu-icon {
    width: 16px;
  }
}
.ivu-input {
  height: 40px;
}
//改ivew的样式
.ivu-btn {
  display: block;
  width: 100%;
}
.ivu-form-item {
  margin-bottom: 12px;
}
.ivu-form-item-label {
  color: #9a9a9a;
}
</style>

<template>
  <div id="app">
    <template v-if="!logined">
      <h2 class="app-tit">东莞无限城市WiFi大数据管理平台</h2>
      <div class="app-login">
        <template>
          <Form :model="loginInfo" label-position="top">
            <FormItem label="用户名">
                <Input v-model="loginInfo.name" class="login-ipt" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码">
                <Input v-model="loginInfo.password" class="login-ipt"  placeholder="请输入密码"></Input>
            </FormItem>
            <div class="login-bottom" :style="{paddingTop: bottomTop}">
              <p class="login-error" v-show="loginError"><Icon type="android-alert"></Icon>登录名或密码错误，请重试</p>
              <FormItem>
                <Button type="primary" @click="makeLogin" style="">登录</Button>
              </FormItem>
            </div>
          </Form>
        </template>
      </div>
    </template>
    <template>
      <Layout/>
    </template>
    <!--router-view/-->
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
export default {
  name: 'app',
  components: {
    Layout
  },
  data () {
    return {
      logined: true,
      bottomTop: '24px',
      loginError: false,
      loginInfo: {
        name: '',
        password: ''
      }
    }
  }
}
</script>
