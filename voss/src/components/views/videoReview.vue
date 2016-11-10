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
                <td>文章状态<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">未审核</option><option :value="{ number: 1 }">通 过</option><option :value="{ number: 2 }">拒 绝</option></select></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in videos" @click="selIdx = $index" :class="{choosed:selIdx == $index}" data-toggle="context" data-target="#context-menu" :data-idx="$index">
                <td>{{row.id}}</td>
                <td><img :src="row.img" style="width:100px;height:auto"></td>
                <td>{{row.title}}</td>
                <td>{{row.source}}</td>
                <td>{{row.duration}}</td>
                <td>{{row.ctime | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
                <td>{{reviewStastus(selected.number)}}</td>
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

      <modal :title="modalCfg.title" :show.sync="modal.editShow" :callback="modalCfg.callback" effet="fade" width="400" auto>
        <div slot="modal-body" class="modal-body">
          <validator name="formValid">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">审核操作</label>
                <div class="col-sm-9 sex-padding">
                  <input type="radio" id="one" value="0" v-model="videosInfo.reject">
                  <label for="one">通过</label>
                  <input type="radio" id="two" value="1" v-model="videosInfo.reject">
                  <label for="two">拒绝</label>
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="col-sm-3 control-label">title</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="title" v-model="videosInfo.title"
                    v-validate:nickname="vFormat.vRequiredMax20">
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
var columns = ['文章ID', '图片','标题','来源','时长','发布时间'];
export default {
  data() {
    return {
      mounted: true,
      columns: columns,
      videos: [],
      pageCfg: {
        total: 1,
        limit: 30,
        start: 0,
        currentPage: 1,
      },
      selIdx: -1,

      modal: {
        editShow: false,
        confirmShow: false,
        textShow: false,
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
        title: '审核',
        cmd: 'editvideos'
      },{
        title: '通过',
        cmd: 'pass'
      },{
        title: '拒绝',
        cmd: 'reject'
      }],
      videosInfo: {
        title: '',
        reject: 0,
        modify: 0,
      }
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

      CGI.post(this.$store.state, 'get_videos', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.videos = data.infos;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.mounted = true;
        } else {
          this.tip(resp.desc);
        }
      });
    },
    onMenu(cmd) {
      switch (cmd) {
        case 'editvideos':
          this.editvideos();
          break;
        case 'pass':
          this.review(0);
          break;
        case 'reject':
          this.review(1);
          break;
      }
    },
    reviewStastus(val) {
      var ret;
      switch(val) {
        case 0:
          ret = '未审核';
          break;
        case 1:
          ret = '通过';
          break;
        case 2:
          ret = '拒绝';
          break;
      }
      return ret;
    },
    editvideos() { 
      var info = this.videos[this.selIdx];
      console.log(this.videos[this.selIdx]);
      this.modalCfg.title = '审核操作';
      this.videosInfo.title = info.title;
      this.modal.editShow = true;
      this.modalCfg.callback = () => {
        var param = {};
        if (this.videosInfo.title !== info.title) {
          param.title = this.videosInfo.title;
          param.modify = 1;
        }
        param.reject = ~~this.videosInfo.reject;
        param.id = info.id;
        CGI.post(this.$store.state,'review_video',param,(resp)=> {
          if (resp.errno === 0) {
            this.videos.splice(this.selIdx,1);
            this.modal.editShow = false;
            this.selIdx = -1;
          } else {
            this.tip(resp.desc);
          }
        })
      }
    },
    review(ops) {
      var idx = this.selIdx;
      var name = this.videos[idx].id;
      var title = this.modalCfg.title;
      var text = this.modalCfg.text;
      if (ops) {
        title = '拒绝通过';
        text = '确认要拒绝' + name + '的审核吗？'; 
      } else {
        title = '审核通过';
        text = '确认要通过' + name + '的审核吗？';
      }
      this.modalCfg.title = title;
      this.modalCfg.text = text;
      this.modal.confirmShow = true;
      this.modalCfg.callback = () => {
        var param = {
          uid: this.videos[idx].id,
          reject: ops
        }

        this.modal.confirmShow = false;

        CGI.post(this.$store.state, 'review_video', param, (resp) => {
          if (resp.errno === 0) {
            this.selIdx = -1;
            this.videos.splice(idx,1);
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
        if (resp.errno === 0) {
          var data = resp.data;
          this.videos = data.users;
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
        if (resp.errno === 0){
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
      var len = this.videos.length-1;
      this.pageCfg.start = this,videos[len].seq;
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
