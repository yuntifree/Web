<style lang="less">
    @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
            欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import md5 from 'md5'
import CGI from '../libs/cgi.js'
import util from '../libs/util.js'
export default {
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var param = {
            username: this.form.userName,
            passwd: md5(this.form.password)
          }
          var url = this.$store.state.user.url;
          var _this = this;
          CGI.post('user/login',param,function(resp) {
            if (resp.errno === 0) {
              console.log(1);
              Cookies.set('user', _this.form.userName);
              Cookies.set('uid', resp.uid);
              Cookies.set('token', resp.token);
              _this.$router.replace({
                  name: 'home_index'
              });
            } else {
              _this.$Message.info(resp.desc || '');
            }
          })
        }
      });
    }
  }
};
</script>

<style>

</style>
