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
          title: 'videoId',
          key: 'videoId',
          align: 'center'
        },{
          title: '支付者头像',
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
          title: '支付者昵称',
          key: 'nickname',
          align: 'center'
        },{
          title: '收益说明',
          key: 'income',
          align: 'center'
        },{
          title: '金额(元)',
          key: 'amount',
          align: 'center'
        },{
          title: '支付用户',
          key: 'userId',
          align: 'center'
        },{
          title: '收益时间',
          key: 'incomeTime',
          align: 'center'
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
      initTable: [{
        Id: 10847,
        videoId: 13418,
        videoName: '少儿“魔童大赛',
        nickname: 'John Brown',
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/WrLtFUfyajJahiaKl3iaibYghtzj6Eic2A3qVR7hbnwicUrM6AS8zMnCpia4dNzFpiccVBoNlZVeC3DAVKnNickTjF4ibAg/0',
        income: '观看视频支付了0.01元',
        amount: 0.01,
        userId: 861963,
        incomeTime: '2017-12-19 14:38:46'
      },{
        Id: 10644,
        videoId: 13418,
        nickname: '周伟',
        videoName: '少儿“魔童大赛”',
        avatar: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIQJlbUdj67UId4oSAr7cyuJBxia39URgh7VV4BW2XEQSDiaIibVJtSg2GPUK4UnAA4ibSdiaEBMxIpjicg/0',
        income: '观看视频支付了0.01元',
        amount: 0.01,
        userId: 861862,
        incomeTime: '2017-12-18 14:34:29'
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
        this.data1 = this.initTable;
        this.data1 = this.search(this.data1, {Id: this.searchId});
    },
  }
};
</script>
