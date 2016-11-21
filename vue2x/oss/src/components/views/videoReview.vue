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
          <button type="button" class="btn btn-info btn-left outline-none">
            视频状态<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">未审核</option><option :value="{ number: 1 }">上 线</option><option :value="{ number: 2 }">下 线</option></select></button>
          </button>
          <button type="button" class="btn btn-default btn-left outline-none" :disabled="selIdx==-1" @click="review(0)"><i class="iconfont icon-accept"></i>通过</button>
          <button type="button" class="btn btn-default btn-left btn-refuse outline-none" :disabled="selIdx==-1" @click="review(1)"><i class="iconfont icon-forbid"></i>拒绝</button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名"
              v-model="search">
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
        <div id="tab1" class="tab_content tab-fixed" v-if="dataReady">
          <template>
            <el-table
              :data="videos"
              height="500"
              border
              highlight-current-row
              @row-click="editvideos"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="文章ID">
              </el-table-column>
              <el-table-column 
                label="图片"
                prop="img">
                <!--div>
                  <img :src="row.img" style="width:100px;height:auto">
                </div-->
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="souce"
                label="来源">
              </el-table-column>
              <el-table-column
                prop="duration"
                label="时长">
              </el-table-column>
              <el-table-column
                prop="ctime"
                label="时间">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pageCfg.currentPage"
         :page-size="pageCfg.limit"
         layout="prev, pager, next, jumper"
         :total="pageCfg.total">
       </el-pagination>
       <!--edit-->
       <div class="shade" v-if="modal.editShow" >
        <div class="edit-form" style="width:600px">
          <el-form ref="form" :model="videosInfo" label-width="80px">
            <el-form-item label="审核操作">
              <input type="radio" id="one" value="0" v-model="videosInfo.reject">
              <label for="one">通过</label>
              <input type="radio" id="two" value="1" v-model="videosInfo.reject">
              <label for="two">拒绝</label>
            </el-form-item>
            <el-form-item label="title">
              <el-input v-model="videosInfo.title"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editPost">确定</el-button>
              <el-button @click="modal.editShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import CGI from '../../lib/cgi.js'
export default {
  data() {
    return {
      dataReady: true,
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
      },
      editInfo: {},
    }
  },
  components: {
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
          this.dataReady = true;
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
    editvideos(row) { 
      CGI.objClear(this.videosInfo);
      this.videosInfo.title = row.title;
      this.editInfo = CGI.clone(row);
      this.modal.editShow = true;
    },
    editPost() {
      var param = {};
      if (this.videosInfo.title !== this.editInfo.title) {
        param.title = this.videosInfo.title;
        param.modify = 1;
      }
      param.reject = ~~this.videosInfo.reject;
      param.id = this.editInfo.id;
      CGI.post(this.$store.state,'review_video',param,(resp)=> {
        if (resp.errno === 0) {
          //index没改
          this.videos.splice(this.selIdx,1);
          this.modal.editShow = false;
        } else {
          console.log(resp.desc);
        }
      })
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
          id: this.videos[idx].id,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData(false);
      console.log(`当前页: ${val}`);
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
  },
}
</script>
