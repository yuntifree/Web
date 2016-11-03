<style lang="scss">
@import '../../assets/css/table.css';
@import '../../assets/css/common.scss';
.dropdown-menu>li>a button[disabled] {
  color: #ccc;
}
</style>
<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button type="button" class="btn btn-default btn-left outline-none" :disabled="selIdx==-1" @click="review(0)"><i class="iconfont icon-accept"></i>通过</button>
          <button type="button" class="btn btn-default btn-left btn-refuse outline-none" :disabled="selIdx==-1" @click="review(1)"><i class="iconfont icon-forbid"></i>拒绝</button>
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
           <button class="btn btn-default btn-sm outline-none" @click="getData(true)"><i class="iconfont icon-renzheng"></i>显示所有</button>
        </div>
      </header>
      <!--右键菜单-->
      <div id="context-menu">
        <ul name="dropdown-menu" class="dropdown-menu">
          <li v-for="op in ops" @click="onMenu(op.cmd)"><a>{{op.title}}</a></li>
        </ul>
      </div>
      <div class="tab_container">
        <div id="tab1" class="tab_content tab-fixed" v-if="mounted">
          <table class="table table-bordered tablesorter table-hover table-comm" cellspacing="0">
            <thead class="th-fixed">
              <tr>
                <td v-for="head in columns">{{head}}</td>
                <td>文章状态<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">未审核</option><option :value="{ number: 1 }">上 线</option><option :value="{ number: 2 }">下 线</option></select></td>
                <td>tag</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in news" @click="selIdx = $index" :class="{choosed:selIdx == $index}" data-toggle="context" data-target="#context-menu" :data-idx="$index">
                <td>{{row.id}}</td>
                <td>{{row.title}}</td>
                <td>{{row.modalName || ' '}}</td>
                <td>{{row.source}}</td>
                <td>{{row.ctime | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
                <td>{{row.operator || ' '}}</td>
                <td>{{row.reading || ' '}}</td>
                <td>{{selected.number}}</td>
                <td>{{selected.tag}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end of #tab1 -->
      </div>
      <!-- end of .tab_container -->
      <pager :total-page="pageCfg.total" :curr-page="pageCfg.currentPage"></pager>
      <modal :title="modalCfg.title" :show.sync="modal.confirmShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">{{modalCfg.text}}</div>
      </modal>
      <modal :title="modalCfg.title" :show.sync="modal.textShow" :callback="modalCfg.callback" effet="fade">
        <div slot="modal-body" class="modal-body">
          <p>{{modalCfg.text}}</p>
          <textarea name="" class="letter-textarea" v-model="reason" placeholder="请输入内容"></textarea>
        </div>
      </modal>
      <modal :title="modalCfg.title" :show.sync="modal.editShow" :callback="modalCfg.callback" effet="fade" width="400" big>
        <div slot="modal-body" class="modal-body">
          <validator name="formValid">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">性别</label>
                <div class="col-sm-9 sex-padding">
                  <label class="sex-margin">
                    <input type="radio" class="form-control radio-sex sex-outline" :value="0" v-model="newsInfo.reject">通过</label>
                  <label class="sex-margin">
                    <input type="radio" class="form-control radio-sex sex-outline" :value="1" v-model="userInfo.reject">拒绝</label>
                </div>
              </div>
              </div>
              <div class="form-group">
                <label for="title" class="col-sm-3 control-label">title</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="title" v-model="newsInfo.title"
                    v-validate:nickname="vFormat.vRequiredMax20">
                </div>
              </div>
              <div class="form-group">
                <label for="nickName" class="col-sm-3 control-label">title</label>
                <div class="col-sm-9">
                  <div v-for="tag in tags">
                    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                    <label for="jack">Jack</label>
                  </div>
                  <span>Checked names: {{ checkedNames | json }}</span>
                </div>
              </div>
            </form>
          </validator>
        </div>
      </modal>
      <alert :show.sync="tips.showTip" :duration="2000" type="info" height="auto" class="search-tip tips">
        <p>{{tips.msgTip}}</p>
      </alert>
    </article>
  </div>
</template>
<script>
import pager from '../lib/pager.vue'
import modal from '../lib/Modal.vue'
import alert from '../lib/Alert.vue'
import CGI from '../../lib/cgi.js'
var columns = ['文章ID', '标题','模板名称', '来源','时间','操作人员','阅读数'];
export default {
  data() {
    return {
      mounted: true,
      columns: columns,
      news: [],
      pageCfg: {
        total: 1,
        limit: 30,
        start: 0,
        currentPage: 1,
      },
      selIdx: -1,

      modal: {
        confirmShow: false,
        textShow: false,
        detailShow: false
      },
      modalCfg: {
        title: '',
        text: '',
        callback: () => {},
      },
      selected: {
        number:0
      },
      detailInfo: {},
      tips: {
        showTip: false,
        msgTip: '',
      },
      search: '',
      showTop: false,
      ops: [{
        title: '编辑',
        cmd: 'edit'
      },{
        title: '通过',
        cmd: 'pass'
      },{
        title: '拒绝',
        cmd: 'reject'
      }],
    }
  },
  components: {
    pager,
    modal,
    alert,
  },
  created() {
    this.getData(true);
  },
  methods: {
    getData(reload) {
      if (reload) {
        this.pageCfg.currentPage = 1;
        this.pageCfg.start = 0;
      }
      var param = {
        seq: this.pageCfg.start,
        num: 30,
        type: this.selected.number
      }

      CGI.post(this.$store.state, 'get_news', param, (resp) => {
        if (resp.errcode === 0) {
          var data = resp.data;
          this.news = data.news;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.mounted = true;
        } else {
          this.tip(resp.desc);
        }
      });
    },
    onMenu(cmd) {
      switch (cmd) {
        case 'edit':
          this.edit();
          break;
        case 'pass':
          this.review(0);
          break;
        case 'reject':
          this.review(1);
          break;
      }
    },
    edit() {

    },
    review(ops) {
      var idx = this.selIdx;
      var name = this.news[idx].name;
      var title = this.modalCfg.title;
      var text = this.modalCfg.text;
      if (ops) {
        title = '拒绝通过';
        text = '确认要拒绝' + name + '的审核吗？'; 
      } else {
        title = '审核通过';
        text = '确认要通过' + name + '的认证吗？';
      }
      this.modalCfg.title = title;
      this.modalCfg.text = text;
      this.modal.confirmShow = true;
      this.modalCfg.callback = () => {
        var param = {
          uid: this.news[idx].id,
          reject: ops
        }

        this.modal.confirmShow = false;
        this.modal.textShow = false;

        CGI.post(this.$store.state, 'review_news', param, (resp) => {
          if (resp.errcode === 0) {
            this.selIdx = -1;
            switch (ops) {
              case 1:
                this.news[idx].flag = 1;
                this.select(idx);
                break;
              case 2:
                this.news[idx].flag = 2;
                this.select(idx);
                break;
            }
            this.news[idx].applystate = ops;
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    /*doSearch(first) {
      var param = {
        search: this.search,
        start: this.pageCfg.start,
        limit: this.pageCfg.limit
      }

      // valid
      this.search = this.search.trim();
      if (first) {
        if (this.search.length === 0) {
          this.showTop = true;
          return;
        }
        param.start = this.pageCfg.start = 0;
        param.page = this.pageCfg.currentPage = 1;
      }

      CGI.post(this.$store.state, 'get_audit_auth', param, (resp) => {
        if (resp.errcode === 0) {
          var data = resp.data;
          this.news = data.users;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          if (data.users === null) {
            this.tips.showTip = true;
            this.tips.msgTip = '库里没有任何相关信息，请尝试其他搜索！'
          }
        } else {
          this.tip(resp.desc);
        }
      });
    },
    detail(detailUid) {
      this.modal.detailShow = true;
      var param = {
        tuid: detailUid
      };
      CGI.post(this.$store.state, 'get_user_details', param, (resp)=> {
        if (resp.errcode === 0){
          this.detailInfo = resp.data;
        } else {
          this.tip(resp.desc);
        }
      })
    },*/
    tip(val) {
      this.tips.showTip = true;
      this.tips.msgTip = val;
    }
  },
  events: {
    'page-change': function(idx) {
      var len = this.news.length-1;
      this.pageCfg.start = this,news[len].seq;
      this.pageCfg.currentPage = idx;
      var isSearch = this.search.length > 0;
      if (isSearch) {
        this.doSearch(false);
      } else {
        this.getData(false);
      }
    },
    'data-refresh': function() {
      this.getData(true,0);
    },
  }
}
</script>
