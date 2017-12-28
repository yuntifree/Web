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
                <p>用户账号：{{userInfo.username}}</p>
                <p>用户昵称：{{userInfo.nickname}}</p>
                <p>用户头像：<img :src="userInfo.headurl" alt=""></p>                
              </Col>
              <Col class-name="account-info" :md="24" :lg="12">
                <p>服务类型：{{userInfo.role ? 'VIP' : '普通'}}</p>
                <p>注册时间：{{userInfo.ctime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                <p>服务开通：{{userInfo.start | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                <p>服务期限：{{userInfo.end | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
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
            <h2 class="income-balance">余额：{{(userInfo.income/100).toFixed(2)}}元</h2>
            <h2 class="income-expenses">支出：{{(userInfo.expense/100).toFixed(2)}}元</h2>
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
                <div class="recharge-img"><img :src="item.img"/></div>
                <Button type="warning" @click="makeRecharge(idx)">充值</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Table class="ivu-table-balance" border :columns="columns1" :data="data1" :height="tableHeight"></Table>
      <Page  class="page-next" :total="pageTotal" size="small" :page-size="pageSize" show-elevator show-total></Page>
      <Modal v-model="modalCode" width="360"
        title="扫码充值">
        <div v-for="(item,idx) in recharge" v-show="idx == rechargeIdx" style="text-align:center">
          <qrcode :value="item.qrcode" :options="{ size: 200 }"></qrcode>
        </div>
      </Modal>
    </div>
</template>

<script>
import CGI from '../../../libs/cgi.js'
import qrcode from '@xkeshi/vue-qrcode'
//require('qrcode')
var status = {};
export default {
  name: 'balance',
  components: {
    qrcode
  },
  computed: {
    getHeight() {
      return this.$store.state.app.contentHeight;
    },
    tableHeight() {
      return this.$store.state.app.contentHeight - 200;
    },
    pageTotal() {
      return 0;
    }
  },
  data() {
    return  {
      dataReady: false,
      dataReady1: false,
      searchId: '',
      selIdx: -1,
      pageSize: 30,
      modalCode: false,
      rechargeIdx: -1,
      userInfo: {
        username: '',
        nickname: '',
        headurl: '',
        role: 0,
        ctime: '',
        start: '',
        end: '',
        income: 0,
        expense: 0
      },
      recharge: [],
      columns1: [{
          title: 'ID',
          key: 'id',
          align: 'center'
        },{
          title: '订单号',
          key: 'oid',
          align: 'center'
        },{
          title: '说明',
          key: 'depict',
          align: 'center'
        },{
          title: '价格',
          key: 'price',
          align: 'center',
          render: (h, params)=> {
            return h('div', (params.row.price / 100).toFixed(2))
          }
        },{
          title: '支付时间',
          key: 'ctime',
          align: 'center',
          render: (h,params) => {
            return h('div', new Date().Format(params.row.ctime,'yyyy-MM-dd'))
          }
        },{
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h,params) => {
            return h('div', params.row.status)
          }
        }
      ],
      initTable: [],
      data1:[]
    }
  },
  created() {
    this.initFormatter(); 
    //Date.prototype.Format = this.initFormatter();
  },
  mounted() {
      this.initUser();
      this.init();
  },
  methods: {
    initUser() {
      CGI.post('user/summary', {}, (resp)=> {
        if (resp.errno === 0) {
          this.userInfo = resp.userinfo;
          this.recharge = resp.items;
          this.dataReady = true;
          console.log(JSON.stringify(this.userInfo) + ',' +this.recharge);
        } else {
          this.$Message.error(resp.desc || '')
        }
      })
    },
    init() {
      var param = {
        seq: 0,
        num: 30
      }
      CGI.post('order/recharges', param, (resp)=> {
        if (resp.errno === 0) {
          this.data1 = this.initTable = resp.infos;
        } else {
          this.$Message.error(resp.desc);
        }
      })
    },
    changeLimit() {
      console.log('change');
    },
    cancel() {
      //this.modalShow = false;
    },
    makeRecharge(idx) {
      //this.codeVal = code;
      this.rechargeIdx = idx;
      this.modalCode = true;
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
    initFormatter(){  
      Date.prototype.Format = CGI.dateFormat; 
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
