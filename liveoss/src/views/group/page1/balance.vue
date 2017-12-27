<style type="text/css" lang="less" scoped>
.ivu-table-balance {
  margin-top: 20px;
}
.account-info {
  p {
    padding: 10px 0;
    img {
      display: block;
      width: 62px;
      height: 62px;
      border-radius: 50%;
    }
  }
}
.income-balance {
  font-size: 36px;
  color: #4cd964;
  font-weight: 300;
}
.income-expenses {
  font-size: 36px;
  color: #ffcc00;
  font-weight: 300;
}
.recharge {
  margin-top: 10px;
  .recharge-img {
    width: 100%;
    height: auto;
    margin-bottom: 5px;
    img {
      display: block;
      width: 80%;
      height: auto;
    }
  }
}
.page-next {
  padding-bottom: 10px;
}
</style>
<template>
    <div class="balance-content" :style="{height: getHeight+'px'}">
      <Row :gutter="16">
        <Col :md="8" :sm="24">
          <Card>
            <p slot="title">帐户信息</p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
            </a>
            <Row>
              <Col class-name="account-info" :md="24" :lg="12">
                <p>用户账号：{{accountInfo.account}}</p>
                <p>用户昵称：{{accountInfo.nickname}}</p>
                <p>用户头像：<img :src="accountInfo.avatar" alt=""></p>                
              </Col>
              <Col class-name="account-info" :md="24" :lg="12">
                <p>服务类型：{{accountInfo.type}}</p>
                <p>注册时间：{{accountInfo.ctime}}</p>
                <p>服务开通：{{accountInfo.open}}</p>
                <p>服务期限：{{accountInfo.deadline}}</p>                                
              </Col>
            </Row>
          </Card>
        </Col>
        <Col :md="8" :sm="24">
          <Card>
            <p slot="title">总收益和总支出</p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
            </a>
            <h2 class="income-balance">余额：{{(income.balance/100).toFixed(2)}}元</h2>
            <h2 class="income-expenses">支出：{{(income.expenses/100).toFixed(2)}}元</h2>
          </Card>
        </Col>
        <Col :md="8" :sm="24">
          <Card>
            <p slot="title">充值</p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
            </a>
            <Row :gutter="16">
              <Col class-name="recharge" :lg="12" :md="24" v-for="(item,idx) in recharge" :key="idx">
                <div class="recharge-img"><img :src="item"/></div>
                <Button type="warning">充值</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Table class="ivu-table-balance" border :columns="columns1" :data="data1" :height="tableHeight"></Table>
      <Page class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
    </div>
</template>

<script>
import CGI from '../../../libs/cgi.js'
var status = {};
export default {
  name: 'page1',
  computed: {
    getHeight() {
      return this.$store.state.app.contentHeight;
    },
    tableHeight() {
      return this.$store.state.app.contentHeight - 200;
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
      accountInfo: {
        account: '13533157742',
        nickname: '啦啦啦啦',
        avatar: 'http://upload.xiangbojiubo.com/Fpu80AaJd-Q9gG5D0xRTm9tuIFWL',
        type: 'VIP',
        ctime: '2017-12-06 09:06:14',
        open: '2017-12-10 19:10:14',
        deadline: '2018-12-10 19:10:14'
      },
      income: {
        balance: 100,
        expenses: 10000
      },
      recharge: ['http://upload.xiangbojiubo.com/15065011821017.png?imageView/2/w/180','http://upload.xiangbojiubo.com/15065011823127.png?imageView/2/w/180','http://upload.xiangbojiubo.com/15065011829683.png?imageView/2/w/180','http://upload.xiangbojiubo.com/15096134266256.png?imageView/2/w/180'],
      columns1: [{
          title: 'ID',
          key: 'id',
          align: 'center'
        },{
          title: '订单号',
          key: 'widthdraw',
          align: 'center'
        },{
          title: '说明',
          key: 'depict',
          align: 'center'
        },{
          title: '支付时间',
          key: 'ctime',
          align: 'center',
          render: (h,params) => {
            return h('div', new Date(params.row.cTime).Format(this.row.ctime,'yyyy-MM-dd hh:mm:ss'))
          }
        },{
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h,params) => {
            return h('div', status.make(params.row.status))
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
  created() {
    Date.prototype.Format = this.initFormatter();
    status.prototype.make = this.initMakeStatus();
  },
  mounted() {
    if (this.initTable.length <= 0) {
      this.init();
    }
  },
  methods: {
    init() {
      var param = {
        seq: 0,
        num: 30
      }
      CGI.post('order/recharges', param, (resp)=> {
        if (resp.errno === 0) {
          console.log(resp)
        } else {
          this.$Message.info(resp.desc);
        }
      })
    },
    changeLimit() {
      console.log('change');
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
    initFormatter() {
      new Date().prototype.Format = CGI.dateFormat();
    },
    initMakeStatus() {
      status.prototype.makeStatus = function(param) {
        var ret ='';
        switch (param) {
          case 0:
            ret = '未支付'
            break;
          case 1:
            ret = '支付成功'
            break;
        }
        return ret;
      }
    }
  }
};
</script>
