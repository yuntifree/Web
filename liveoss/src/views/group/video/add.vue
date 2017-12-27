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
.upload-img {
  margin-top: 5px;
  img {
    display: inline-block;
    width: 60px;
    height: 60px;
  }
}
</style>
<template>
    <div class="page1-content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分享标题" prop="title">
            <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="分享描述" prop="depict">
            <Input v-model="formValidate.depict" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="封面">
            <Upload action="http://yuntiimgs.oss-cn-shenzhen.aliyuncs.com" 
              :before-upload="beforeImg"
              :on-progress="progressImg"
              :on-success="successImg"
              :on-error="errorImg"
              :data="aliyunParams"
              :show-upload-list="false">
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
            <a class="upload-img" v-show="uploadImgShow" :href="uploadUrl" target="_blank"><img :src="uploadUrl">{{uploadUrl}}</a>
        </FormItem>
        <FormItem label="访问权限" prop="authority">
          <RadioGroup v-model="formValidate.authority" class="video-add-limit" @on-change="getauthority">
            <div><Radio label="0">公开</Radio></div>
            <div><Radio label="1">密码</Radio><Input class="video-radio-input" v-model.trim="formValidate.passwd" placeholder="Enter your name" :disabled="passwdDisabled" ref="passwd"></Input></div>
            <div><Radio label="2">支付</Radio><Input class="video-radio-input" v-model.trim="formValidate.price" placeholder="Enter your name" :disabled="payDisabled" ref="price"></Input></div>
          </RadioGroup>
        </FormItem>
        <FormItem label="分辨率" v-model="formValidate.resolution" prop="resolution">
          <Dropdown style="margin-left: 20px" @on-click="getResolution">
            <Button type="ghost">
                {{resolutionText}}
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
        <FormItem label="推流地址">
            <Button type="success">PUSH</Button>
            <P>{{formValidate.push}}</P>
        </FormItem>
        <FormItem label="直播地址">
            <Button type="success">RTMP</Button>
            <P>{{formValidate.rtmp}}</P>
            <Button type="success">flv</Button>
            <P>{{formValidate.flv}}</P>
            <Button type="success">hls</Button>
            <P>{{formValidate.hls}}</P>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import CGI from '../../../libs/cgi.js';
var obj = {};
export default {
  name:'addVideo',
  data () {
    return {
      formValidate: {
        title: '',
        depict: '',
        authority: '',
        resolution: '',
        price: '',
        push: '',
        rtmp: '',
        hls: '',
        flv: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        authority: [
          { required: true, message: 'Please select authority', trigger: 'change' }
        ],
        resolution: [
          { required: true, message: 'Please select authority', trigger: 'change' }
        ],
        depict: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
        ]
      },
      passwdDisabled: true,
      limitDisabled: true,
      payDisabled: true,
      uploadUrl: '',
      resolutionText: '分辨率',
      aliyunParams: {},
      uploadImgShow: false
    }
  },
  methods: {
    getResolution(name) {
      this.formValidate.resolution = name;
      var text = '';
      switch (~~name) {
        case 0:
          text = '640*404【流畅】';
          break;
        case 1:
          text = '720*404【标清】';
          break;
        case 2:
          text = '960*540【高清】';
          break;
        case 3:
          text = '1280*720【超清】';
          break;
      }
      this.resolutionText = text;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            var formVal = this.formValidate;
            var param = {
              title: formVal.title,
              cover: this.uploadUrl,
              depict: formVal.depict,
              authority: ~~formVal.authority,
              resolution: ~~formVal.resolution
            }
            console.log(param);
            if (~~formVal.authority == 1) {
              if (formVal.passwd.length>0) {
                param.passwd = formVal.passwd;
              } else {
                this.$message.info('请输入密码');
                this.$res.passwd.focus();
              }
            } else if (~~formVal.authority == 2) {
              if (formVal.price.length>0) {
                if (~~formVal.price !== NaN) {
                  param.price = (~~formVal.price / 100).toFixed(2)
                } else {
                  this.$message.info('请输入正确的价格');
                  this.$refs.price.focus();
                }
              } else {
                this.$message.info('请输入价格');
                this.$refs.price.focus();
              }
            }
            CGI.post('live/create', param, (resp) => {
              if (resp.errno === 0) {
                this.formValidate.push = resp.push;
                this.formValidate.rtmp = resp.rtmp;
                this.formValidate.flv = resp.flv;
                this.formValidate.hls = resp.hls;
              } else {
                this.$Message.info(resp.desc || '')
              }
            })
            
          } else {
              this.$Message.error('Fail!');
          }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    getauthority() {
      var authority = this.formValidate.authority
      switch (this.formValidate.authority) {
        case 'passwd':
          this.payDisabled = true;
          this.passwdDisabled = false;
          break;
        case 'pay': 
          this.passwdDisabled = true;
          this.payDisabled = false;
          break;
      }
    },
    successImg(response, file, fileList) {
      console.log('uploadImg succ');
      this.uploadImgShow = true;
    },
    progressImg(e, file,fileList) {
      console.log('uploadImg progress');
    },
    beforeImg(callback) {
      console.log(callback);
      var file = [];
      if (callback != false || callback != Promise) {
        file = this.getSuffix([callback.name]);
        var _this = this;
        //异步转同步 return
        var fn = function(resolve, reject){
          CGI.post('image/apply',{formats: file}, (resp)=> {
            if (resp.errno === 0) {
              var obj = resp;
              _this.aliyunParams = {
                'key': obj['names'],
                'policy': obj['policy'],
                'OSSAccessKeyId': obj['accessid'],
                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                'callback': obj['callback'],
                'signature': obj['signature'],
              }
              _this.uploadUrl = 'http://img.yunxingzh.com/' + resp.names[0];
            } else {
              _this.$Message.error(resp.desc || '');
            }
            resolve(2)
          })
        }
        return new Promise(fn);
      } else {
        this.$Message.error('上传失败')
      }
    },
    errorImg(file) {
      this.$Notice.warning({
        title: '失败',
        desc: '上传失败'
      })
    },
    getSuffix(filenames) {
      var pos,file;
      var suffix = [];
      filenames.forEach(function(val) {
        pos = val.lastIndexOf('.');
        if (pos != -1) {
          file = val.substring(pos + 1);
          suffix.push(file);
        }
      });
      return suffix;
      return suffix;
    }
  }
}
</script>
