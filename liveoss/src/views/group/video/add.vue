<style type="text/css" lang="less">
.page1-content {
  position: relative;
}
.video-add-limit {
  width: 100%;
}
.video-add-limit>div{
  margin-bottom: 10px;
}
.video-radio-input {
  width: 50%!important;
}
</style>
<template>
    <div class="page1-content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分享标题" prop="title">
            <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="分享描述" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="访问权限" prop="permiss">
          <RadioGroup v-model="formValidate.permiss" class="video-add-limit" @on-change="getPermiss">
            <div><Radio label="public">公开</Radio></div>
            <div><Radio label="password">密码</Radio><Input class="video-radio-input" v-model="formValidate.password" placeholder="Enter your name" :disabled="passwordDisabled"></Input></div>
            <div><Radio label="pay">支付</Radio><Input class="video-radio-input" v-model="formValidate.pay" placeholder="Enter your name" :disabled="payDisabled"></Input></div>
            <div>支付有效期(小时)<Input class="video-radio-input" v-model="formValidate.limitTime" placeholder="Enter your name" :disabled="limitDisabled"></Input></div>
          </RadioGroup>
        </FormItem>
        <FormItem label="分辨率" v-model="formValidate.resolution">
          <Dropdown style="margin-left: 20px" @on-click="getResolution">
            <Button type="ghost">
                分辨率
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem name="0">640*404【流畅】</DropdownItem>
                <DropdownItem name="1">720*404【标清】</DropdownItem>
                <DropdownItem name="2">960*540【高清】</DropdownItem>
                <DropdownItem name="3">1280*720【超清】</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px" v-model="formValidate.startTime"></DatePicker>
        </FormItem>
        <FormItem label="推流地址">
            <Button type="success">PUSH</Button>
            <P>{{formValidate.push}}</P>
        </FormItem>
        <FormItem label="直播地址">
            <Button type="success">RTMP</Button>
            <P>{{formValidate.rtmp}}</P>
            <Button type="success">RTMP</Button>
            <P>{{formValidate.rtmp}}</P>
            <Button type="success">RTMP</Button>
            <P>{{formValidate.rtmp}}</P>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name:'addVidep',
    data () {
      return {
        formValidate: {
          title: '',
          desc: '',
          permiss: 0,
          resolution: '',
          date: '',
          startTime: '',
          limitTime: '',
          push: 'rtmp://pili-publish.xiangbojiubo.com/vcdn/390662?e=1513937045&token=buysOo-In92etTxTHOORWVoI13pVX_wSED3r9Mp4:K6sFL23r_sFvIeqv8ZI8vAlWTPw=',
          rtmp: 'rtmp://pili-live-rtmp.xiangbojiubo.com/vcdn/390662',
          hls: 'http://pili-live-hls.xiangbojiubo.com/vcdn/390662.m3u8',
          flv: 'http://pili-live-hdl.xiangbojiubo.com/vcdn/390662.flv'
        },
        ruleValidate: {
          title: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          permiss: [
            { required: true, message: 'Please select permiss', trigger: 'change' }
          ],
          startTime: [
            { required: true, type: 'datetime', message: 'Please select the start time', trigger: 'change' }
          ],
          desc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        },
        passwordDisabled: true,
        limitDisabled: true,
        payDisabled: true,
      }
    },
    methods: {
      getResolution(name) {
        console.log(name);
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              console.log(this.formValidate)
            } else {
                this.$Message.error('Fail!');
            }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getPermiss() {
        var permiss = this.formValidate.permiss
        switch (this.formValidate.permiss) {
          case 'password':
            this.payDisabled = true;
            this.limitDisabled = true;
            this.passwordDisabled = false;
            break;
          case 'pay': 
            this.passwordDisabled = true;
            this.payDisabled = false;
            this.limitDisabled = false;
            break;
        }
      }
    }
  }
</script>
