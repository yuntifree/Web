<style type="text/css" lang="less">
.page1-content {
  position: relative;
}
.content-top {
  width: 100%;
  height: 50px;
  padding: 9px 2px 0 0;
  border: 1px solid #e9eaec;
  border-bottom: 0;
  background-color: #f8f8f9;
}
.search {
  width: 150px;
  height: auto;
  display: inline-block;
}
.page-next {
  margin-top: 10px;
  float: right;
}
.ivu-modal-table {
  p {
    padding: 10px 0;
    font-size: 14px;
    .modal-list-key {
      display: inline-block;
      width: 90px;
    }
  }
}
</style>
<template>
  <div class="page1-content" :style="{height: getHeight+'px'}">
    <div class="content-top">
      <Row type="flex" justify="end" :gutter="16">
        <Col>
          <Button v-show="!listViewShow" type="info" icon="ios-arrow-left" @click="returnBack">返回视频列表</Button>
          <Button type="info">新增直播</Button>
        </Col>
        <Col>
          <div class="search"><Input icon="search" v-model="searchId"  @on-change="handleSearch" placeholder="视频ID"></Input></div>
        </Col>
      </Row> 
    </div>
    <Table v-show="listViewShow" border :columns="columns1" :data="data1" :height="tableHeight"></Table>
    <Table v-show="listDataShow" border :columns="columns2" :data="data2" :height="tableHeight"></Table>
    <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
    <Tabs value="basic">
      <TabPane label="基本信息" name="basic">
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
              <div><Radio label="pay">支付</Radio>
                  <Input class="video-radio-input" v-model="formValidate.pay" placeholder="Enter your name" :disabled="payDisabled"></Input>
              </div>
              <div>支付有效期(小时)<Input class="video-radio-input" v-model="formValidate.limitTime" placeholder="Enter your name" :disabled="limitDisabled"></Input>
                <CheckboxGroup v-model="formValidate.limitWay">
                    <Checkbox label="Vip">VIP通道</Checkbox>
                    <Checkbox label="first">首次解锁</Checkbox>
                </CheckboxGroup>
              </div>
            </RadioGroup>
          </FormItem>
          <FormItem label="开始时间" prop="startTime">
            <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px" v-model="formValidate.startTime"></DatePicker>
          </FormItem>
          <FormItem label="Radio">
            <RadioGroup v-model="formValidate.status">
              <Radio label="living">直播中</Radio>
              <Radio label="reserve">预约</Radio>
              <Radio label="record">录播</Radio>
              <Radio label="customize">强制使用自定义录播地址</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="视频时长" prop="duration">
            <Input v-model="formValidate.duration" placeholder="视频时长 12:59:59"></Input>
          </FormItem>
           <FormItem label="排序(从小到大)" prop="sort">
              <Input v-model="formValidate.sort" placeholder="排序值"></Input>
          </FormItem>
          <FormItem label="分辨率" v-model="formValidate.resolution">
            <Dropdown style="margin-left: 20px" @on-click="getResolution">
              <Button type="ghost">分辨率<Icon type="arrow-down-b"></Icon>
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
            <CheckboxGroup v-model="formValidate.tag">
              <Checkbox label="Vip">全部视频</Checkbox>
              <Checkbox label="first">年会</Checkbox>
              <Checkbox label="Vip">体育</Checkbox>
              <Checkbox label="first">教育</Checkbox>
            </CheckboxGroup>
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
      </TabPane>
    </Tabs>
    <Modal
        v-model="modalShow"
        title="确认提示"
        class-name="ivu-modal-table"
        width="300">
        <p>视频{{modalVal}}确认</p>
        <div slot="footer">
          <Button type="ghost" @click="modalShow=false">取消</Button>
          <Button type="primary" v-show="delShow"  :loading="modal_loading" @click="delSure">删除</Button>
          <Button type="primary"  v-show="!delShow" :loading="modal_loading" @click="makeSure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'page1',
  computed: {
    getHeight() {
      return this.$store.state.app.contentHeight;
    },
    tableHeight() {
      return this.$store.state.app.contentHeight - 90;
    },
    pageTotal() {
      return this.data1.length;
    }
  },
  data() {
    return  {
      searchId: '',
      modalShow: false,
      modalVal: '',
      pageSize: 30,
      modal_loading: false,
      delShow: false,
      selIdx: -1,
      listViewShow: true,
      listDataShow: false,
      formValidate: {
        title: '',
        desc: '',
        permiss: 0,
        resolution: '',
        sort: '',
        resolution: '',
        tag: '',
        startTime: '',
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
        duration: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: 'Please select permiss', trigger: 'change' }
        ],
        startTime: [
          { required: true, type: 'datetime', message: 'Please select the start time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
        ],
        tag: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one tag', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two tags at best', trigger: 'change' }
        ]
      },
      columns1: [{
          title: 'ID',
          key: 'Id',
          align: 'center'
        },{
          title: '视频名称',
          key: 'name',
          align: 'center'
        },{
          title: '权限',
          key: 'permiss',
          align: 'center'
        },{
          title: '用户ID',
          key: 'userId',
          align: 'center'
        },{
          title: '支付用户',
          key: 'userId',
          align: 'center'
        },{
          title: '开始时间',
          key: 'startTime',
          align: 'center'
        },{
          title: '结束时间',
          key: 'endTime',
          align: 'center'
        },{
          title: '排序',
          key: 'sort',
          align: 'center'
        },{
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params)=> {
            return h('div',params.row.status)
          }
        },{
          title: '操作',
          key: 'operate',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginBottom: '5px',
                  marginTop: '5px',
                },
                on: {
                  click: ()=> {
                    this.checkSure(params.index,true)
                  }
                }
              }, '开始'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginTop: '5px',
                  marginRight: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: ()=> {
                    this.show(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: ()=> {
                    this.checkSure(params.index,false)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: ()=> {
                    this.showDetail(params.index)
                  }
                }
              }, '数据')
              ])
          }
        }
      ],
      initTable: [{
        Id: 10847,
        name: '少儿“魔童大赛"',
        permiss: '支付',
        userId: 390661,
        startTime: '2017-12-19 14:38:46',
        endTime: '',
        sort: 50,
        status: 1,
      },{
        Id: 10886,
        name: '紫光影业',
        permiss: '密码',
        userId: 390661,
        startTime: '2017-12-19 14:38:46',
        endTime: '2017-12-19 16:38:46',
        sort: 30,
        status: 1,
      }],
      data1:[],
      columns2: [{
        title: 'ID',
        key: 'Id',
        align: 'center'
      },{
        title: 'name',
        key: 'name',
        align: 'center'
      },{
        title: '头像',
        key: 'avatar',
        align: 'center',
        render: (h,params) => {
          return h('img',{
            attrs: {
              src: params.row.avatar
            },
            style: {
              width: '60px',
              height: '60px',
              margin: '10px'
            }
          })
        }
      },{
        title: '邀请人数',
        key: 'invNum',
        align: 'center'
      },{
        title: '付款人数',
        key: 'payNum',
        align: 'center'
      },{
        title: '联系信息',
        key: 'contact',
        align: 'center'
      }],
      initTable2: [],
      data2: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data1 = this.initTable;
      this.data2 = this.initTable2;
    },
    checkSure(idx, chkbtn) {
      this.selIdx = idx
      this.modalVal = this.data1[idx].name;
      if (chkbtn) {
        this.delShow = false;
      } else {
        this.delShow = true;
      }
      this.modalShow = true;
    },
    delSure(idx) {
      this.modal_loading = true;
      setTimeout(()=> {
        this.data1.splice(this.selIdx,1);
        this.modal_loading = false;
        this.modalShow = false;
      }, 1500)
    },
    makeSure() {
      this.modal_loading = true;
      setTimeout(()=> {
        this.modal_loading = false;
        this.modalShow = false;
      }, 1500)
    },
    showDetail(idx) {
      this.listViewShow = false;
      this.listDataShow = true;
    },
    returnBack() {
      this.listDataShow = false;
      this.listViewShow = true;
    },
    show(idx) {
      this.selIdx = idx;
    },
    search (data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            console.log(d[argu]);
              return d[argu].toString().indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }
      return res;
    },
    handleSearch () {
      if (this.listViewShow) {
        this.data1 = this.initTable;
        this.data1 = this.search(this.data1, {Id: this.searchId});
      } else {
        this.data2 = this.initTable2;
        this.data2 = this.search(this.data2, {Id: this.searchId});
      }
    }
  }
};
</script>
