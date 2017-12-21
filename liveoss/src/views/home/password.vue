<style type="text/css" lang="less" scoped>
</style>
<template>
  <div class="confirm-main">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="旧密码" prop="oldPassword">
        <Input v-model="formValidate.oldPassword" placeholder="请输入旧密码"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPassword">
        <Input v-model="formValidate.phone" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="verifyPassword">
        <Input v-model="formValidate.verifyPassword" placeholder="请确认密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleSubmit('formValidate')">更新</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
</div>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

  export default {
    name: 'confirm',
      data () {
      return {
        formValidate: {
          oldPassword: '',
          newPassword: '',
          verifyPassword: '',
        },
        ruleValidate: {
          oldPassword: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' },
              { min: 6, message: 'Please enter the six digit password', trigger: 'blur' }
          ],
          newPassword: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' },
              { min: 6, message: 'Please enter the six digit password', trigger: 'blur' }
          ],
          verifyPassword: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' },
              { min: 6, message: 'Please enter the six digit password', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      chkArea(data) {
        console.log(1);
      }
    }
  }
</script>