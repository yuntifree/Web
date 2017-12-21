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
      <Col><Button type="info">创建工单</Button></Col>
    </Row>
    <Table border :columns="columns" :data="data" :height="tableHeight"></Table>
    <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
    <Modal
      title="工单详情"
      v-model="workModalShow"
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('formValidate')">
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="当前状态">
          <Input v-model="modalVal.status?'已受理':'未受理'" :disabled="true"></Input>
        </FormItem>
        <FormItem label="工单ID">
          <Input v-model="modalVal.id" :disabled="true"></Input>
        </FormItem>
        <FormItem label="工单分类">
          <Input v-model="modalVal.sort" :disabled="true"></Input>
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
        class-name="vertical-center-modal"
        @on-ok="handleSubmit('orderValidate')">
        <Form ref="orderValidate" :model="createVal" :rules="ruleValidate" :label-width="80">
          <FormItem label="工单分类" prop="sort">
            <Input v-model="createVal.sort" placeholder="请输入工单类别"></Input>
          </FormItem>
          <FormItem label="工单内容" prop="content">
            <Input v-model="createVal.content" placeholder="请输入工单内容"></Input>
          </FormItem>
          <FormItem label="上传附件">
            <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
          </FormItem>
        </Form>
    </Modal>
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
        pageSize: 30,
        workModalShow: false,
        createOrder: true,
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
            key: 'sort',
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
        data: [{
          Id: 10,
          name: '测试账号',
          sort: '平台故障-直播问题',
          status: 0,
          commitTime: '2017-12-19 14:38:46',
          folder: ['http://upload.xiangbojiubo.com/work_order/201711151731186660.png']
        },{
          Id: 11,
          name: '美女主播',
          sort: '平台故障-直播问题',
          status: 1,
          commitTime: '2017-12-09 18:08:26',
          folder: ['http://upload.xiangbojiubo.com/work_order/201711151731186660.png']
        }],
        modalVal: {
          Id: '',
          name: '',
          sort: '',
          status: '',
          content: '',
          folder: []
        },
        formValidate: {
          leaveMsg: ''
        },
        createVal: {
          sort: '',
          content: '',
          imgs: [],
        },
        ruleValidate: {
          sort: [
              { required: true, message: 'The sort cannot be empty', trigger: 'blur' }
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
      modalShow(idx) {
        this.modalVal = this.data[idx];
        this.workModalShow = true;
      }
    }
  }
</script>