<style lang="scss" scope>
@import '../../assets/css/table.css';
@import '../../assets/css/common.scss';
.dropdown-menu>li>a button[disabled] {
  color: #ccc;
}
.el-icon-close:before {
 content: '';
}
</style>
<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button type="button" class="btn btn-info btn-left outline-none">
            文章状态<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">未审核</option><option :value="{ number: 1 }">上 线</option><option :value="{ number: 2 }">下 线</option></select></button>
          </button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名"
              v-model="search" @keyup.enter="doSearch(true)">
          </div>
          <button class="btn btn-default btn-ssm" @click="getData(0)">刷新</button>
        </div>
      </header>
      <div class="tab_container" ref="tableContent">
        <div id="tab1" class="tab_content tab-fixed" v-if="dataReady">
          <template>
            <el-table
              :data="news"
              :height="tableHeight"
              border
              highlight-current-row>
              </el-table-column>
              <el-table-column
                inline-template
                label="文章ID">
                <div>{{row.id||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="标题">
                <div>{{row.title||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="模板名称">
                <div>{{row.modalName||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="来源">
                <div>{{row.source||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="时间">
                <div>{{row.ctime||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="操作人员">
                <div>{{row.operator||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="阅读数">
                <div>{{row.reading||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                fixed="right"
                label="操作"
                width="100">
                <span>
                  <el-button @click="edit($index,row)" type="text" size="small">审核</el-button>
                  <el-button @click="review($index,row,0)" type="text" size="small">上线</el-button>
                  <el-button @click="review($index,row,1)" type="text" size="small">下线</el-button>
                </span>
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
      <div class="shade" v-if="modal.editShow" >
        <div class="edit-form" style="width:600px">
          <el-form ref="form" :model="newsInfo" label-width="80px">
            <el-form-item label="审核操作">
              <input type="radio" id="one" value="0" v-model="newsInfo.reject">
              <label for="one">通过</label>
              <input type="radio" id="two" value="1" v-model="newsInfo.reject">
              <label for="two">拒绝</label>
            </el-form-item>
            <el-form-item label="title">
              <el-input v-model="newsInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-checkbox-group v-model="checkedTags">
                <el-checkbox v-for="tag in tagsInfo.tags" :label="tag.content" name="type"></el-checkbox>
                <span class="btn btn-info btn-sm" v-show="tagsInfo.hasmore" @click="edit('','',tagsInfo.tags[tagsInfo.tags.length-1].seq)">点击加载更多</span>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editPost(event,false)">确定</el-button>
              <el-button @click="modal.editShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--dialog-->
      <el-dialog v-model="modal.dialogShow"  :title="dialogCfg.title" size="tiny">
        <span>{{dialogCfg.text}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="modal.dialogShow = false">取 消</el-button>
          <el-button type="primary" @click.native="editPost(event,true)">确 定</el-button>
        </span>
      </el-dialog>
      <!--alert-->
      <div v-show="alertShow">
        <el-alert
          :title="alertMsg"
          type="dark">
        </el-alert>
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
      news: [],
      modal: {
        editShow: false,
        dialogShow: false,
      },
      dialogCfg: {
        title: '',
        text: '',
      },
      pageCfg: {
        total: 1,
        limit: 30,
        start: 0,
        currentPage: 1,
      },
      selIdx: -1,

      selected: {
        number:0
      },
      search: '',
      tagsInfo: [],
      checkedTags: [],
      newsInfo: {
        title: '',
        reject: 0,
        modify: 0,
        tags: [],
      },
      editInfo: {},
      alertShow: false,
      alertMsg: '',
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.tableHeight;
    }
  },
  watch: {
    alertShow() {
      if (this._timeout) clearTimeout(this._timeout)
      if (this.alertShow) {
        this._timeout = setTimeout(()=> this.alertShow = false, 1500);
      } else {
        return this.alertShow;
      }
    }
  },
  mounted() {
    if (!this.tableHeight) {
      this.$nextTick(()=> {
        this.$store.state.tableHeight = this.$refs.tableContent.offsetHeight;
      });
    }
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
        if (resp.errno === 0) {
          var data = resp.data;
          this.news = data.infos;
          this.pageCfg.total = data.total;
          this.dataReady = true;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    handleSizeChange(val) {
      console.log('每页 ${val} 条');
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData(false);
      console.log('当前页: ${val}');
    },
    edit(idx,row,seq) {
      this.selIdx = idx;
      var param = {
        seq: seq || 0,
        num:5
      }
      CGI.post(this.$store.state,'get_tags',param,(resp)=>{
        if (resp.errno === 0) {
          if (param.seq === 0) {
            this.tagsInfo = resp.data;
          } else {
            this.tagsInfo.tags = this.tagsInfo.tags.concat(resp.data.tags);
            this.tagsInfo.hasmore = resp.data.hasmore;
          }
          CGI.objClear(this.newsInfo);
          this.newsInfo.title = row.title;
          this.editInfo =  CGI.clone(row);
          this.modal.editShow = true;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    editPost(event,confirm) { 
      if (this.editInfo.title.length <= 0) {
        this.alertInfo('请输入title');
        return;
      }
      var param = {};
      if (confirm) {
        param.id = this.editInfo.id;
        param.reject = ~~this.newsInfo.reject;
      } else {
        var paramTags = [];
        if (this.newsInfo.title !== this.editInfo.title) {
          param.title = this.newsInfo.title;
          param.modify = 1;
        }
        if (this.checkedTags.length > 0) {
          var clen = this.checkedTags.length;
          var tlen = this.tagsInfo.tags.length;
          for (var i=0;i<clen;i++) {
            for (var j=0;j<tlen;j++) {
              if (this.checkedTags[i] == this.tagsInfo.tags[j].content) {
                paramTags.push(this.tagsInfo.tags[j].id);
              }
            }
          }
        }
        param.tags = paramTags;
        param.reject = ~~this.newsInfo.reject;
        param.id = this.editInfo.id;
      }
      CGI.post(this.$store.state,'review_news',param,(resp)=> {
        if (resp.errno === 0) {
          this.news.splice(this.selIdx,1);
          this.modal.editShow = false;
          this.modal.dialogShow = false;
          this.selIdx = -1;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    review(idx,row,ops) {
      this.selIdx = idx;
      var title = '';
      var text = '';
      if (ops) {
        title = '拒绝通过';
        text = '确认要拒绝' + row.id + '的审核吗？'; 
      } else {
        title = '审核通过';
        text = '确认要通过' + row.id + '的审核吗？';
      }
      this.dialogCfg.title = title;
      this.dialogCfg.text = text;
      this.newsInfo.reject = ops;
      this.editInfo =  CGI.clone(row);
      this.modal.dialogShow = true;
    },
    alertInfo(val) {
      this.alertShow = true;
      this.alertMsg = val;
    }
  }
}
</script>
