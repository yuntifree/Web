<style type="text/css" lang="less" scoped>
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
    <div class="widthdraw-content" :style="{height: getHeight+'px'}">
      <div class="content-top">
        <Row type="flex" justify="end" :gutter="16">
          <Col>
            <Button type="primary"  :disable="selIdx==-1">提现</Button>
          </Col>
          <Col>
            <div class="search"><Input icon="search" v-model="searchId"  @on-change="handleSearch" placeholder="视频ID"></Input></div>
          </Col>
        </Row> 
      </div>
      <Table border :columns="columns1" :data="data1" :height="tableHeight"></Table>
      <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
    </div>
</template>

<script>
import CGI from '../../../libs/cgi.js'

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
      selIdx: -1,
      pageSize: 30,
      columns1: [{
          title: 'ID',
          key: 'id',
          align: 'center'
        },{
          title: '提现金额',
          key: 'widthdraw',
          align: 'center',
          render: (h,params) => {
            return h('div', (params.row.amount / 100).toFixed(2))
          }
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        },{
          title: '申请时间',
          key: 'applyTime',
          align: 'center'
        },{
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h,params) => {
            return h('div', this.makeStatus(params.row.status))
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
                    this.cancel(params.index)
                  }
                }
              }, '取消')
              ])
          }
        }
      ],
      initTable: [],
      data1:[]
    }
  },
  mounted() {
    console.log(1);
    this.init();
  },
  methods: {
    init() {
      var param = {
        seq: 0,
        num: 30
      }
      console.log(param);
      CGI.post('withdraw/records', param, (resp)=> {
        if (resp.errno === 0) {
          if (resp.infos && resp.infos.length>0) {
            this.data1 = this.initTable = resp.infos;
          }
        } else {
          this.$Message.info(resp.desc);
        }
      })
    },
    cancel() {
      //this.modalShow = false;
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
        this.data1 = this.initTable;
        this.data1 = this.search(this.data1, {Id: this.searchId});
    },
  }
};
</script>
