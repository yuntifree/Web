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
            <div class="search"><Input icon="search" v-model="searchId"  @on-change="handleSearch" placeholder="视频ID"></Input></div>
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
          <p><span class="modal-list-key">视频名称：</span>少儿魔童大赛</p>
          <p><span class="modal-list-key">收益描述：</span>{{modalVal.income}}</p>
          <p><span class="modal-list-key">金额：</span>{{modalVal.amount}}</p>
          <p><span class="modal-list-key">时间：</span>{{modalVal.incomeTime}}</p>
          <p><span class="modal-list-key">支付者昵称：</span>{{modalVal.nickname}}</p>
          <p><span class="modal-list-key">支付者头像:</span><img :src="modalVal.avatar" style="width: 60px;height: 60px"></p>
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
          title: '开始时间',
          key: 'startTime',
          align: 'center'
        },{
          title: '统计',
          key: 'stat',
          align: 'center'
        },{
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params)=> {
            return h('div',params.row.status)
          }
        }
      ],
      initTable: [{
        Id: 10847,
        name: '少儿“魔童大赛"',
        permiss: '支付',
        userId: 390661,
        startTime: '2017-12-19 14:38:46',
        stat: '查看',
        status: 1,
      },{
        Id: 10886,
        name: '紫光影业',
        permiss: '密码',
        userId: 390661,
        startTime: '2017-12-19 14:38:46',
        stat: '查看',
        status: 1,
      }],
      data1:[]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data1 = this.initTable;
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
        this.data1 = this.initTable;
        this.data1 = this.search(this.data1, {Id: this.searchId});
    },
  }
};
</script>
