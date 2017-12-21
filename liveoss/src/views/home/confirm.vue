<style type="text/css" lang="less" scoped>
</style>
<template>
  <div class="confirm-main">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="昵称" prop="nickname">
        <Input v-model="formValidate.nickname" placeholder="请输入您的昵称"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="phone">
        <Input v-model="formValidate.phone" placeholder="请输入您的手机号码"></Input>
      </FormItem>
      <FormItem label="名称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入公司名称"></Input>
      </FormItem>
      <FormItem label="简介" prop="introduction">
        <Input v-model="formValidate.introduction" type="textarea"placeholder="请输入简介"></Input>
      </FormItem>
      <FormItem label="地区" prop="area">
        <Row>
          <Col span="24">
            <al-selector on-change="chkArea" v-model="formValidate.area" level="2" gutter="5" data-type="code"/>
          </Col>
        </Row> 
      </FormItem>
      <FormItem label="详细地址" prop="address">
        <Input v-model="formValidate.address" placeholder="请输入简介"></Input>
      </FormItem>
      <FormItem label="电子邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
      </FormItem>
      <FormItem label="公司网址" prop="net">
        <Input v-model="formValidate.net" placeholder="请输入公司网址"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
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
          nickname: '',
          avator: '',
          phone: '',
          name: '',
          introduction: '',
          area: [],
          address: '',
          mail: '',
          net: ''
        },
        ruleValidate: {
          nickname: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          phone: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          name: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          introduction: [
              { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
              { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ],
          area: [
              { required: true, type: 'array', message: 'Choose area', trigger: 'change' }
          ],
          address: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          mail: [
              { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
              { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          net: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
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