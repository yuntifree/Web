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
            文章状态<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">未审核</option><option :value="{ number: 1 }">上 线</option><option :value="{ number: 2 }">下 线</option></select></button>
          </button>
          <button type="button" class="btn btn-default btn-left outline-none" :disabled="selIdx==false" @click="review(0)"><i class="iconfont icon-accept"></i>通过</button>
          <button type="button" class="btn btn-default btn-left btn-refuse outline-none" :disabled="selIdx==false" @click="review(1)"><i class="iconfont icon-forbid"></i>拒绝</button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名"
              v-model="search" @keyup.enter="doSearch(true)">
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
              :data="news"
              height="500"
              border
              highlight-current-row
              @row-click="edit">
              </el-table-column>
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                prop="id"
                label="文章ID">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="modalName"
                label="模板名称">
              </el-table-column>
              <el-table-column
                prop="source"
                label="来源">
              </el-table-column>
              <el-table-column
                prop="ctime"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="operator"
                label="操作人员">
              </el-table-column>
              <el-table-column
                prop="reading"
                label="阅读数">
              </el-table-column>
              <el-table-column
                prop="reading"
                label="阅读数">
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
              <el-button type="primary" @click="editNews">确定</el-button>
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
var editTitle='';
export default {
  data() {
    return {
      dataReady: true,
      news: [],

      modal: {
        editShow: false,
      },
      pageCfg: {
        total: 1,
        limit: 30,
        start: 0,
        currentPage: 1,
      },
      selIdx: false,

      selected: {
        number:0
      },
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
      newsStatus: [{
        text: '未审核',
        value: '0'
      },{
        text: '上线',
        value: '1'
      },{
        text: '下线',
        value: '1'
      }]
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

      CGI.post(this.$store.state, 'get_news', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.news = data.news;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.dataReady = true;
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
    reviewStastus(val) {
      var ret;
      switch(val) {
        case 0:
          ret = '未审核';
          break;
        case 1:
          ret = '上线';
          break;
        case 2:
          ret = '下线';
          break;
      }
      return ret;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData(false);
      console.log(`当前页: ${val}`);
    },
    edit(row,events,seq) {
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
          this.newsInfo.title = row.title;
          this.editInfo =  CGI.clone(row);
          this.modal.editShow = true;
        } else {
          console.log(resp.desc);
        }
      })
    },
    editNews() { 
      var param = {};
      var paramTags = [];
      console.log(this.newsInfo.title+'\n'+editTitle);
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
      CGI.post(this.$store.state,'review_news',param,(resp)=> {
        if (resp.errno === 0) {
          this.selIdx = -1;
          this.news.splice(this.selIdx,1);
          this.modal.editShow = false;
        } else {
          console.log(resp.desc);
        }
      })
    },
    /*review(ops) {
      var idx = this.selIdx;
      var name = this.news[idx].name;
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
          id: this.news[idx].id,
          reject: ops
        }

        this.modal.confirmShow = false;
        this.modal.textShow = false;

        CGI.post(this.$store.state, 'review_news', param, (resp) => {
          if (resp.errno === 0) {
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
    tip(val) {
      this.tips.showTip = true;
      this.tips.msgTip = val;
    }*/
  },
}
</script>
