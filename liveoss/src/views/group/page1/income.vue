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
        <Row type="flex" justify="end">
          <Col>
            <div class="search"><Input icon="search" v-model="searchText"  @on-change="handleSearch" placeholder="视频ID"></Input></div>
          </Col>
        </Row> 
      </div>
      <Table border :columns="columns1" :data="data1" :height="tableHeight"></Table>
      <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
      <Modal
          v-model="modalShow"
          title="支付信息"
          @on-ok="ok"
          @on-cancel="cancel"
          :scrollable="true"
          class-name="ivu-modal-table">
          <p><span class="modal-list-key">视频名称：</span>{{modalVal.id}}</p>
          <p><span class="modal-list-key">收益描述：</span>{{modalVal.depict}}</p>
          <p><span class="modal-list-key">金额：</span>{{(modalVal.amount/100).toFixed(2)}}</p>
          <p><span class="modal-list-key">时间：</span>{{modalVal.incomeTime | dateFormat}}</p>
          <p><span class="modal-list-key">支付者昵称：</span>{{modalVal.nickname}}</p>
          <p><span class="modal-list-key">支付者头像:</span><img :src="modalVal.avatar" style="width: 60px;height: 60px"></p>
      </Modal>
    </div>
</template>

<script>
import CGI from '../../../libs/cgi.js'
export default {
  name: 'income',
  computed: {
    getHeight() {
      return this.$store.state.app.contentHeight;
    },
    tableHeight() {
      return this.$store.state.app.contentHeight - 90;
    },
    pageTotal() {
      return this.data1.length || 0;
    }
  },
  data() {
    return  {
      searchText: '',
      modalShow: false,
      modalVal: {
        income: '',
        amount: 0,
        incomeTime: '',
        nickname: '',
        avatar: ''
      },
      pageSize: 30,
      columns1: [{
          title: 'ID',
          key: 'id',
          align: 'center'
        },{
          title: '视频id',
          key: 'hid',
          align: 'center'
        },{
          title: '支付者头像',
          key: 'headurl',
          align: 'center',
          render: (h,params) => {
            return h('img',{
              attrs: {
                src: params.row.headurl
              },
              style: {
                width: '60px',
                height: '60px',
                margin: '10px'
              }
            })
          }
        },{
          title: '支付者昵称',
          key: 'nickname',
          align: 'center'
        },{
          title: '收益说明',
          key: 'depict',
          align: 'center'
        },{
          title: '金额(元)',
          key: 'price',
          align: 'center',
          render: (h,params) => {
            return h('div', (params.row.headurl /100).toFixed(2))
          }
        },{
          title: '支付用户',
          key: 'uid',
          align: 'center'
        },{
          title: '支付时间',
          key: 'ctime',
          align: 'center',
          render: (h,params) => {
            return h('div', new Date().Format(params.row.ctime, 'yyyy-MM-dd hh:mm:ss'))
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
                    this.show(params.index)
                  }
                }
              }, '查看')
              ])
          }
        }
      ],
      initTable: [],
      data1:[]
    }
  },
  created() {
    this.initFormatter();
    this.init();
  },
  mounted() {
  },
  methods: {
    init(search) {
      var param = {
        seq: 0,
        num: 30
      }
      if (search) {
        param.search = search;
      }
      CGI.post('order/records', param, (resp)=> {
        if (resp.errno === 0) {
          if (resp.infos && resp.infos.length>0) {
            this.data1 = this.initTable = resp.infos;
          }
        } else {
          this.$Message.info(resp.desc);
        }
      })
    },
    show(idx) {
      this.modalVal = this.data1[idx];
      this.modalShow = true;
    },
    ok() {
      this.modalShow = false;
    },
    cancel() {
      this.modalShow = false;
    },
    search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          console.log(argu);
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
        this.init(this.searchText)
    },
    initFormatter() {  
      Date.prototype.Format = CGI.dateFormat;
    }
  }
};
</script>
