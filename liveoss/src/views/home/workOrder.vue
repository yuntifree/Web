<style type="text/css" lang="less" scoped>
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
    top: 0;
  }
}
.modal-upload {
  margin-top: 5px;
}
</style>
<template>
  <div class="confirm-main">
    <Row type="flex" justify="end">
      <Col><Button type="info" @click="createOrder=true">创建工单</Button></Col>
    </Row>
    <Table border :columns="columns" :data="data" :height="tableHeight"></Table>
    <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
    <Modal
      title="工单详情"
      v-model="workModalShow"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="当前状态">
          <Input v-model="modalVal.status?'已受理':'未受理'" :disabled="true"></Input>
        </FormItem>
        <FormItem label="工单ID">
          <Input v-model="modalVal.id" :disabled="true"></Input>
        </FormItem>
        <FormItem label="工单标题">
          <Input v-model="modalVal.title" :disabled="true"></Input>
        </FormItem>
        <FormItem label="工单内容">
          <Input v-model="modalVal.content" :disabled="true"></Input>
        </FormItem>
        <FormItem label="附件">
          <a v-for="item in modalVal.folder" :href="item">{{item}}</a>
        </FormItem>
        <FormItem label="留言" prop="leaveMsg">
          <Input type="textarea" v-model="formValidate.leaveMsg" placeholder="请填写留言"></Input>
          <div class="modal-upload">
            <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
          </div>
        </FormItem>
      </Form>
    </Modal>
      <Modal
        title="创建工单"
        v-model="createOrder"
        class-name="vertical-center-modal">
        <Form ref="orderValidate" :model="createVal" :rules="ruleValidate" :label-width="80">
          <FormItem label="工单标题" prop="title">
            <Input v-model="createVal.title" placeholder="请输入工单标题"></Input>
          </FormItem>
          <FormItem label="工单内容" prop="content">
            <Input v-model="createVal.content" placeholder="请输入工单内容"></Input>
          </FormItem>
          <FormItem label="上传附件">
            <Upload action="http://yuntiimgs.oss-cn-shenzhen.aliyuncs.com" 
              :before-upload="beforeImg"
              :on-progress="progressImg"
              :on-success="successImg"
              :on-error="errorImg"
              :data="aliyunParams"
              :show-upload-list="false">
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
            <a class="upload-img" v-show="uploadImgShow" :href="uploadUrl" target="_blank">
              <img :src="uploadUrl">{{uploadUrl}}</a>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" size="ghost" @click="createOrder=false">取消</Button>
          <Button type="primary" size="default" @click="handleSubmit('orderValidate')">创建</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);
import CGI from '../../libs/cgi.js'

  export default {
    name: 'confirm',
      data () {
      return {
        pageSize: 30,
        workModalShow: false,
        createOrder: false,
        uploadImgShow: false,
        uploadUrl: '',
        columns: [{
            title: 'ID',
            key: 'Id',
            align: 'center'
          },{
            title: '工单名称',
            key: 'name',
            align: 'center'
          },{
            title: '工单分类',
            key: 'title',
            align: 'center'
          },{
            title: '提交时间',
            key: 'commitTime',
            align: 'center'
          },{
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h,params) => {
              return h('div', params.row.status ? '已受理' : '尚未受理')
            }
          },{
            title: '操作',
            key: 'operate',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: ()=> {
                      this.modalShow(params.index)
                    }
                  }
                }, '查看')
                ])
            }
          }
        ],
        data: [],
        modalVal: {
          Id: '',
          name: '',
          title: '',
          status: '',
          content: '',
          folder: []
        },
        formValidate: {
          leaveMsg: ''
        },
        createVal: {
          title: '',
          content: '',
          imgs: '',
        },
        ruleValidate: {
          title: [
              { required: true, message: 'The title cannot be empty', trigger: 'blur' }
          ],
          content: [
              { required: true, message: 'The content cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      tableHeight() {
        return this.$store.state.app.contentHeight - 240;
      },
      pageTotal() {
        return this.data.length;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var param = {
          seq: 0,
          num: 30
        }
        CGI.post('feedback/recods', param, (resp)=> {
          if (resp.errno ===0 ) {
            this.data = resp.infos;
          } else {
            this.$Message.info(resp.desc || '');
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var param = {
              title: this.createVal.title,
              content: this.createVal.content,
              imgs: this.uploadUrl
            }
            var _this = this;
            CGI.post('feedback/add', param, function(resp) {
              if (resp.errno === 0) {
                _this.$Message.success('提交成功');
              } else {
                _this.$Message.error('提交失败')
              }
              _this.createOrder = false;
            })
          } else {
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      modalShow(idx) {
        this.modalVal = this.data[idx];
        this.workModalShow = true;
      },
      successImg(response, file, fileList) {
        console.log('uploadImg succ');
        this.uploadImgShow = true;
      },
      progressImg(e, file,fileList) {
        console.log('uploadImg progress');
      },
      beforeImg(callback) {
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
      }
    }
  }
</script>