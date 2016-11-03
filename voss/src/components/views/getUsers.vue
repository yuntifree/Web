<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-sm outline-none" @click="add">
          <i class="iconfont icon-add"></i>添加用户
          </button>
          <button class="btn btn-default btn-sm outline-none" @click="recharge" disabled="{{selIdx == -1}}">
            <i class="iconfont icon-chongzhi"></i>充值
          </button>
          <button class="btn btn-default btn-sm outline-none" @click="tag" disabled="{{selIdx == -1}}">
            <i class="iconfont icon-renzheng"></i>认证
          </button>
          <button class="btn btn-default btn-sm outline-none" @click="shopping" disabled="{{selIdx == -1}}">
            <i class="iconfont icon-renzheng"></i>{{msgShp}}导购
          </button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名"
              v-model="search" @keyup.enter="doSearch(true)">
            <alert :show.sync="showTop" :duration="1500" type="info" width="200px" placement="top-right" class="search-tip">
              <p>请输入相关的ID/电话/用户名进行搜索</p>
            </alert>
          </div>
          <button class="btn btn-default btn-sm outline-none" @click="advancedQuery"><i class="iconfont icon-renzheng"></i>高级搜索</button>
        </div>
      </header>
      <!--begin:右键菜单-->
      <div id="context-menu">
        <ul name="dropdown-menu" class="dropdown-menu">
          <li v-for="op in ops" @click="onMenu(op.cmd)"><a>{{op.title}}</a></li>
        </ul>
      </div>
      <!--end:右键菜单-->
      <div class="tab_container" id="tab_container">
        <div class="tab_content tab-fixed" v-if="mounted">
          <table class="table table-bordered tablesorter table-hover user-table" cellspacing="0">
            <thead class="th-fixed">
              <tr>
                <td v-for="head in columns">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in users"
                @click="chkTr($index, row.shopping)"
                 @dblclick="editUser"
                :class="{choosed:selIdx == $index}"
                data-toggle="context" data-target="#context-menu" :data-idx="$index">
                <td>{{row.uid}}</td>
                <td>{{row.phone}}</td>
                <td><i class="iconfont" :class="row.sex ? 'icon-892nanxing' : 'icon-nv'"></i>{{row.nickname}}</td>
                <td><div class="img50" @click.stop="detail($index)"><img v-lazy.tab_container="row.head"/></div></td>
                <td>{{userTerm(row.term)}}</td><!--平台-->
                 <td v-text="row.ctime | dateFormat 'yyyy-MM-dd hh:mm:ss'"></td>
                <td>{{row.shopping ? '是' : '否'}}</td>
                <td>{{gagState(row.etime,$index)}}</td>
                <td>{{row.tag}}</td>
                <td>{{row.identification}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end of #tab1 -->
      </div>
      <!-- end of .tab_container -->
      <pager :total-page="pageCfg.total" :curr-page="pageCfg.currentPage"></pager>
      <!--edit-->
      <modal :title="modalCfg.title" :show.sync="modal.editShow" :callback="modalCfg.callback" effet="fade" width="400" big>
        <div slot="modal-body" class="modal-body">
          <validator name="formValid">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="nickName" class="col-sm-3 control-label">昵称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="nickName" v-model="userInfo.nickname"
                    v-validate:nickname="vFormat.vRequiredMax20">
                </div>
              </div>
              <div v-if="addShow">
                <div class="form-group">
                  <label for="password" class="col-sm-3 control-label">密码</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="password" v-model="userInfo.password"
                      v-validate:password="vFormat.vRequiredMax20">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">性别</label>
                <div class="col-sm-9 sex-padding">
                  <label class="sex-margin">
                    <input type="radio" class="form-control radio-sex sex-outline" :value="1" v-model="userInfo.sex">男</label>
                  <label class="sex-margin">
                    <input type="radio" class="form-control radio-sex sex-outline" :value="0" v-model="userInfo.sex">女</label>
                </div>
              </div>
              <div class="form-group">
                <label for="tag" class="col-sm-3 control-label">认证</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="tag" v-model="userInfo.tag"
                    v-validate:tag="vFormat.vMax30">
                </div>
              </div>
              <div class="form-group">
                <label for="signature" class="col-sm-3 control-label">个性签名</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="signature" v-model="userInfo.signature" v-validate:signature="vFormat.vMax20">
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-sm-3 control-label" :class="{red:$formValid.phone.invalid}">
                  手机号</label>
                <div class="col-sm-9">
                  <input type="tel" class="form-control" id="phone" v-model="userInfo.phone" v-el:phone>
                </div>
              </div>
              <div class="form-group">
                <label for="head" class="col-sm-3 control-label">修改头像</label>
                <div class="col-sm-9">
                  <uploader></uploader>
                </div>
              </div>
              <div class="form-group">
                <label for="balance" class="col-sm-3 control-label">余额(U币)</label>
                <div class="col-sm-9">
                  <input type="number" class="form-control" id="balance" v-model="userInfo.balance" :value="0"
                  v-validate:balance="vFormat.vNumber" number>
                </div>
              </div>
              <div class="form-group">
                <label for="remark" class="col-sm-3 control-label">特殊标记</label>
                <div class="col-sm-9">
                  <input type="text
                  " class="form-control" id="remark" v-model="userInfo.remark">
                </div>
              </div>
              <div v-show="addShow" class="form-group">
                <label for="identification" class="col-sm-3 control-label">添加备注</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="identification" v-model="userInfo.identification">
                </div>
              </div>
            </form>
          </validator>
        </div>
      </modal>
      <!--del-->
      <modal :title="modalCfg.title" :show.sync="modal.btnConfirmShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">{{modalCfg.text}}</div>
      </modal>
      <!--recharge-->
      <modal :title="modalCfg.title" :show.sync="modal.rechargeShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">
          <p>为{{modalCfg.name}}充值(单位：U币)</p>
          <input type="number" class="form-control" v-model="userInfo.balance" :value="0" v-focus="modal.rechargeShow"
          number>
        </div>
      </modal>
      <modal :title="modalCfg.title" :show.sync="modal.iptShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">
          <p v-show="modalCfg.tagShow">为{{modalCfg.name}}写认证</p>
          <p v-else>为{{modalCfg.name}}重置密码</p>
          <input type="text" class="form-control" v-model="otherInfo.ipt" maxlength="30" v-focus="modal.iptShow">
        </div>
      </modal>
      <!--letter-->
      <modal :title="modalCfg.title" :show.sync="modal.textShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">
          <p v-show="modalCfg.letterShow">给{{modalCfg.name}}写私信</p>
          <p v-else>给{{modalCfg.name}}写备注</p>
          <textarea name="" class="letter-textarea" v-model="otherInfo.msg" placeholder="请输入内容" v-focus="modal.textShow"></textarea>
        </div>
      </modal>
      <details :details="detailInfo" :modalshow.sync="modal.detailShow"></details>
      <searchs :modalsearchshow.sync="modal.searchShow" :termshow="modal.termshow" :modalsearch.sync="searchInfo" :timecallback="modalCfg.callback" :page="pageCfg"></searchs>
    </article>
    <alert :show.sync="tips.showTip" :duration="2000" type="info" height="auto" class="search-tip tips">
        <p>{{tips.msgTip}}</p>
    </alert>
  </div>
</template>
<script>
import pager from '../lib/pager.vue'
import modal from '../lib/Modal.vue'
import alert from '../lib/Alert.vue'
import uploader from '../lib/uploader.vue'
import details from '../lib/detail.vue'
import searchs from '../lib/search.vue'
import CGI from '../../lib/cgi.js'
import md5 from 'md5'

var columns = [
  'uid','手机号','性别/昵称','头像','平台','注册时间', '是否导购', '禁言','认证','备注'];
var searchParams = {};
export default {
  data() {
    return {
      modal: {
        editShow: false,
        btnConfirmShow: false,
        rechargeShow: false,
        textShow: false,
        gagShow: false,
        iptShow: false,
        detailShow: false,
        searchShow: false,
        termshow: true,
      },
      modalCfg: {
        text: '',
        title: '',
        name: '',
        letterShow: false,
        tagShow: false,
        btnShow: false,
        btnMsg: '搜索',
        callback: () => {},
      },
      pageCfg: {
        total: 1,
        currentPage: 1,
        start: 0,
        limit: 30,
      },

      //右键功能
      ops: [{
        title: '修改用户',
        cmd: 'editUser'
      }, {
        title: '发私信',
        cmd: 'letter'
      }, {
        title: '拉黑',
        cmd: 'defriend'
      }, {
        title: '禁言',
        cmd: 'gag'
      }, {
        title: '备注',
        cmd: 'identi'
      }, {
        title: '重置密码',
        cmd: 'rest'
      }, {
        title: '添加导购',
        cmd: 'shopping'
      }],

      // table data
      users: [],
      columns: columns,

      mounted: false,
      selIdx: -1,
      showTop: false,
      addShow: false, //添加用户判断

      userInfo: {
        username: '',
        password: '',
        nickname: '',
        tag: '',
        sex: 1,
        signature: '',
        phone: '',
        head: '',
        balance: 0,
        remark: '',
      },
      gagStatus: [],
      otherInfo: {
        ipt: '',
        msg: '',
      },
      search: '',
      tips: {
        showTip: false,
        msgTip: '',
      },
      msgShp: '添加', //导购 取消/添加
      searchInfo: {
        sex: 2,
        term: 2,
        stime: '',
        etime: ''
      },
      detailInfo: {},
      advancedSearch: false, //高级搜索
      vFormat: CGI.vFormat,
    }
  },
  components: {
    pager,
    modal,
    uploader,
    alert,
    details,
    searchs,
  },
  created() {
    this.getData(true);
  },
  ready() {
    $('#context-menu').on('show.bs.context', (e) => {
      this.selIdx = $(e.target).data('idx');
      this.msgShopping(this.users[this.selIdx].shopping);
    }); //右键
  },
  methods: {
    getData(reload) {
      if (this.acvandeQuery) {
        this.acvandeQuery = false;
      }
      //判断分页是否为第一页
      if (reload) {
        this.pageCfg.start = 0;
        this.pageCfg.currentPage = 1;
      }

      var param = {
        page: this.pageCfg.currentPage,
        start: this.pageCfg.start,
        limit: this.pageCfg.limit,
      };
      CGI.post(this.$store.state, 'get_users', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.users = data.users;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.mounted = true;
          this.acvandeQuery = false;
          if (data.users !== null) {
            data.users.forEach( (item, index) => {
              this.gagStatus.push(false);
            })
          }
        } else {
          this.tip(resp.desc);
        }
      });
    },
    onMenu(cmd) {
      switch (cmd) {
        case 'editUser':
          this.editUser();
          break;
        case 'letter':
          this.letter();
          break;
        case 'gag':
          this.gag();
          break;
        case 'identi':
          this.identi();
          break;
        case 'defriend':
          this.blackUser();
          break;
        case 'rest':
          this.rest();
          break;
        case 'shopping':
          this.shopping();
          break;
      }
    },
    add() {
      CGI.objClear(this.userInfo);
      this.modalCfg.title = '添加用户';
      this.modal.editShow = true;
      this.addShow = true;
      this.modalCfg.callback = () => {
        var phone = this.userInfo.phone.trim();
        if (!this.$formValid.valid) {
          this.tip('invalid');
          return;
        }
        if (phone.length == 0) {
          this.tip('请输入手机号');
          return;
        }
        if (this.userInfo.phone != '' && !CGI.checkTel(this.userInfo.phone)) {
          this.userInfo.phone = '请输入正确的电话号码';
          return;
        }
        this.modal.editShow = false;
        this.addShow = false;

        this.userInfo.password = md5(this.userInfo.password);
        this.userInfo.username = this.userInfo.phone;
        var param = this.userInfo;
        CGI.post(this.$store.state, 'add_users', param, (resp) => {
          if (resp.errno === 0) {
            var data = resp.data;
            //新添加项push到页面
            var u = CGI.clone(this.userInfo);
            u.uid = data.uid;
            u.ctime = CGI.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
            this.users.unshift(u);
          } else {
            this.tip(resp.desc);
          }
        });
      }
    },
    editUser() {
      var idx = this.selIdx;
      this.modalCfg.title = '修改';
      CGI.extend(this.userInfo, this.users[idx]);

      this.addShow = false;
      this.modal.editShow = true;
      this.modalCfg.callback = () => {
        this.selIdx = -1;
        if (!this.$formValid.valid) {
          this.tip('invalid');
          return;
        }

        //第三方登录不需填号码
        var login_from = this.users[idx].loginfrom;
        var phone = this.userInfo.phone.trim();
        if (login_from === 0) {
          if (phone.length == 0) {
            this.tip('请输入手机号');
            this.$els.phone.focus();
            this.$els.phone.select();
            return;
          } else {
            if (!CGI.checkTel(this.userInfo.phone)) {
              this.userInfo.phone = '请输入正确的电话号码';
              this.$els.phone.focus();
              this.$els.phone.select();
              return;
            }
          }
        }

        this.modal.editShow = false;

        //param参数
        var param = CGI.objModified(this.users[idx], this.userInfo);
        param.uid = this.users[idx].uid;

        CGI.post(this.$store.state, 'modify_user_info', param, (resp) => {
          if (resp.errno === 0) {
            CGI.extend(this.users[idx], this.userInfo);  //更新修改数据
          } else {
            this.tip(resp.desc);
          }
        });
      }
    },
    blackUser() {
      var idx = this.selIdx;
      this.modalCfg.title = '拉黑';
      this.modalCfg.text = '确认拉黑' + this.users[idx].nickname + '吗？';
      this.modal.btnConfirmShow = true;

      this.modalCfg.callback = () => {
        this.selIdx = -1;
        this.modal.btnConfirmShow = false;
        var uids = [];
        uids.push(this.users[idx].uid);
        var param = {
          type: 1,
          users: uids,
        }
        CGI.post(this.$store.state, 'disable_chat_black', param, (resp) => {
          if (resp.errno === 0) {
            this.users.splice(idx, 1);
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    recharge() {
      var idx = this.selIdx;
      this.modalCfg.title = '充值';
      this.modalCfg.name = this.users[idx].nickname;
      this.userInfo.balance = 0;
      this.modal.rechargeShow = true;
      this.modalCfg.callback = () => {
        this.selIdx = -1;
        if (this.userInfo.balance === 0) {
          this.tip('请输入可用的充值金额');
          return false;
        }
        this.modal.rechargeShow = false;

        var rechargeUid = this.users[idx].uid;
        var param = {
          uid: rechargeUid,
          balance: this.userInfo.balance
        };

        CGI.post(this.$store.state, 'admin_recharge', param, (resp) => {
          if (resp.errno === 0) {
            this.users[idx].balance = this.userInfo.balance  + this.users[idx].balance;
          } else {
            this.tip(resp.desc);
          }
        });
      }
    },
    letter() {
      var idx = this.selIdx;
      this.modalCfg.title = '发私信';
      this.modalCfg.name = this.users[idx].nickname;
      this.modalCfg.letterShow = true;
      this.otherInfo.msg = '';
      var letterUid = this.users[idx].uid;
      this.modal.textShow = true;
      this.modalCfg.callback = () => {
        this.modal.textShow = false;
        this.selIdx = -1;
        var param = {
          tuid: letterUid,
          msg: this.otherInfo.msg
        };

        CGI.post(this.$store.state, 'send_private_msg', param, (resp) => {
          if (resp.errno === 0) {
            this.tip('私信发送成功')
          } else {
            this.tip(resp.desc);
          }
        });
      }
    },
    gag() {
      var idx = this.selIdx;
      if (this.gagStatus[idx]) {
        this.tip('已禁言');
        return;
      } else {
        this.modalCfg.title = '禁言';
        this.modalCfg.text = '确认要禁言' + this.users[idx].nickname + '吗';
        var gagUid = this.users[idx].uid;
        this.modal.btnConfirmShow = true;
        this.modalCfg.callback = () => {
          this.modal.btnConfirmShow = false;
          this.selIdx = -1;
          var uids = [];
          uids.push(gagUid);
          var param = {
            type: 0,
            users: uids,
          }
          CGI.post(this.$store.state, 'disable_chat_black', param, (resp) => {
            if (resp.errno === 0) {
              var data = resp.data;
              var d = new Date();
              d.setDate(d.getDate()+1);
              this.users[idx].etime = CGI.dateFormat(d, 'yyyy-MM-dd hh:mm:ss');
            } else {
              this.tip(resp.desc);
            }
          });
        }
      }    
    },
    identi() {
      var idx = this.selIdx;
      this.modalCfg.title = '备注';
      this.modalCfg.name = this.users[idx].nickname;
      this.modalCfg.letterShow = false;
      if (!this.modalCfg.letterShow) {
        this.otherInfo.msg = this.users[idx].identification;
      }
      this.modal.textShow = true;
      var identiUid = this.users[idx].uid;
      this.modalCfg.callback = () => {
        this.modal.textShow = false;
        this.selIdx = -1;
        var param = {
          uid: identiUid,
          identification: this.otherInfo.msg
        };
        CGI.post(this.$store.state, 'modify_user_info', param, (resp) => {
          if (resp.errno === 0) {
            this.users[idx].identification = this.otherInfo.msg;
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    tag() {
      var idx = this.selIdx;
      this.modalCfg.title = '认证';
      this.modalCfg.name = this.users[idx].nickname;
      this.otherInfo.ipt = this.users[idx].tag;
      this.modalCfg.tagShow = true;
      this.modal.iptShow = true;
      this.modalCfg.callback = () => {
        this.modal.iptShow = false;
        var identiUid = this.users[idx].uid;
        this.selIdx = -1;
        var param = {};
        param.uid = identiUid;
        param.tag = this.otherInfo.ipt;
        CGI.post(this.$store.state, 'modify_user_info', param, (resp) => {
          if (resp.errno === 0) {
            this.users[idx].tag = this.otherInfo.ipt;
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    rest() {
      var idx = this.selIdx;
      this.modalCfg.title = '重置密码';
      this.modalCfg.name = this.users[idx].nickname;
      this.modalCfg.tagShow = false;
      this.otherInfo.ipt = '';
      this.modal.iptShow = true;
      this.modalCfg.callback = () => {
        this.modal.iptShow = false;
        var resetUid = this.users[idx].uid;
        this.selIdx = -1;
        var param = {
          uid: resetUid,
          password: md5(this.otherInfo.ipt),
        };
        CGI.post(this.$store.state, 'modify_user_info', param, (resp) => {
          if (resp.errno === 0) {
            this.tip('重置密码成功！');
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    detail(detailIdx) {
      this.modal.detailShow = true;
      var param = {
        tuid: this.users[detailIdx].uid
      };
      CGI.post(this.$store.state, 'get_user_details', param, (resp)=> {
        if (resp.errno === 0){
          this.detailInfo = resp.data;
        } else {
          this.tip(resp.desc);
        }
      })
    },

    doSearch(first) {
      var param = {
        search: this.search,
        page: this.pageCfg.currentPage,
        start: this.pageCfg.start,
        limit: this.pageCfg.limit,
      }
      if (first) {
        this.search = this.search.trim();
        if (this.search.length === 0) {
          this.showTop = true;
          return;
        }
        param.start = this.pageCfg.start = 0;
        param.page = this.pageCfg.currentPage = 1;
      }
      // valid
      this.query(param, 'get_users', false);
    },
    advancedQuery() {
      this.modal.searchShow = true;
      this.pageCfg.start = 0;
      this.pageCfg.currentPage = 1;
      this.$nextTick(()=> {
        this.$broadcast('date-time');
      })
      this.modalCfg.callback = ()=> {
        this.$broadcast('call-back');
      }
    },
    query(param,action,queryCfg) {
      if (queryCfg && !this.advancedSearch) {
        this.advancedSearch = true;
      }
      CGI.post(this.$store.state, action, param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.users = data.users;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          if (data.users == null) {
            this.tip('库里没有任何相关信息，请尝试其他搜索！');
          }
        } else {
          this.tip(resp.desc);
        }
      });
    },
    gagState(gtime,gagIdx) {
      var nowTime = new Date().getTime();
      var stateTime = new Date(gtime).getTime();
      var state = '';
      if (gtime !== null) {
        //state = nowTime < stateTime ? '已禁言' : '-';
        if (nowTime < stateTime) {
          state = '已禁言';
          //this.gagStatus.$set(gagIdx, true);
          this.gagStatus[gagIdx] = true;
        } else {
          state = '-';
        }
      } else {
        state = '-';
      }
      return state;
    },
    userTerm(term) {
      var ret;
      if (term == 0) {
        ret = 'Android';
      } else if (term == 1) {
        ret = 'ios';
      } else {
        ret = '其它'
      }
      return ret;
    },
    chkTr(chkIdx, shopState) {
      this.selIdx = chkIdx;
      this.msgShopping(shopState)
    },
    msgShopping(shopState) {
      //导购显示状态
      var ret = shopState ? '取消' : '添加';
      this.msgShp = ret;
      this.ops[6].title = ret + '导购';
      this.modalCfg.title = ret + '导购';
    },
    shopping() {
      var idx = this.selIdx;
      var shopState = this.users[idx].shopping;
      var msgBtn,
          shopType;
      if (shopState) {
        msgBtn = "取消";
        shopType = 0;
      } else {
        msgBtn = "添加";
        shopType = 1;
      };
      this.modalCfg.title = msgBtn + '导购';
      this.modalCfg.text = '确定要' + msgBtn +this.users[idx].nickname +'的导购功能吗？';
      this.modal.btnConfirmShow = true;
      this.modalCfg.callback = ()=> {
        this.modal.btnConfirmShow = false;
        var param = {
          tuid: this.users[idx].uid,
          type: shopType
        }
        CGI.post(this.$store.state, 'check_shopping', param, (resp)=> {
          if (resp.errno === 0) {
            this.tip(msgBtn + '成功');
            var shopCfg = this.users[idx].shopping;
            if (shopCfg) {
              var shopState = this.users[idx].shopping = 0;
              this.msgShopping(shopState);
            } else {
              var shopState = this.users[idx].shopping = 1;
              this.msgShopping(shopState);
            }
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    searchFun() {
      var ret = false;
      var sex = this.searchInfo.sex;
      var term = this.searchInfo.term;
      var stime = this.searchInfo.stime;
      var etime = this.searInfo.etime;
      if (sex !==2 || term !==2 || (stime && etime)) {
        ret = true;
      }
      return ret;
    },
    refresh() {
      this.getData(false);
    },
    tip(val) {
      this.tips.showTip = true;
      this.tips.msgTip = val;
    }
  },
  events: {
    'page-change': function(idx) {
      this.pageCfg.start = (idx - 1) * this.pageCfg.limit;
      this.pageCfg.currentPage = idx;
      var searchLen = this.search.trim().length;
      //分页接口区分
      if(searchLen == 0 && !(this.advancedSearch)){
        this.getData(false);
      } else if (searchLen > 0){
        this.doSearch(false);
      } else if (this.advancedSearch) {
        searchParams.start = this.pageCfg.start;
        this.query(searchParams, 'advanced_search', true);
      }
    },
    'upload-done': function(imageUrl) {
      this.userInfo.head = imageUrl;
    },
    'data-refresh': function() {
      this.search = '';
      this.getData(true);
    },
    'search-param': function(searchParam) {
      searchParams = searchParam;
      this.query(searchParams,'advanced_search',true)
    },
    'tip-time': function(tipInfo) {
      this.tip(tipInfo);
    }
  },
}
</script>
<style lang="scss">
@import '../../assets/css/table.css', '../../assets/css/common.scss';
.user-table td:last-child {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 300px;
}
.modal-detail>div {
  padding: 10px 0;
}
.det_img {
  @include pos(top,26px, right, 37px);
}
</style>
