<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-sm outline-none" @click="addUnit">
          <i class="iconfont icon-add"></i>添加
          </button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名">
          </div>
          <button class="btn btn-default btn-ssm" @click="getData(0)">刷新</button>
        </div>
      </header>
      <!--end:右键菜单-->
      <div class="tab_container" ref="tableContent">
        <div class="tab_content tab-fixed" v-if="dataReady">
          <template>
            <el-table
              :data="infos"
              :height="tableHeight"
              border>
              <el-table-column
                inline-template
                label="id">
                <div>{{row.id||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="appid">
                <div>{{row.appid||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="shopid">
                <div>{{row.shopid||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="secret">
                <div>{{row.secret||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="title">
                <div>{{row.title||'-'}}</div>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <!--翻页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageCfg.currentPage"
        :page-size="pageCfg.limit"
        layout="prev, pager, next, jumper"
        :total="pageCfg.total">
      </el-pagination>
      <div class="shade" v-if="modal.addShow" >
        <div class="edit-form">
          <div class="form-title">{{modal.text}}</div>
          <el-form ref="form" :model="postInfo" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="appid" prop="appid">
              <el-input  v-model.trim="postInfo.appid" placeholder="请输入appid"></el-input>
            </el-form-item>  
            <el-form-item label="secret" prop="secret">
              <el-input  v-model.trim="postInfo.secret" placeholder="请输入secrect"></el-input>
            </el-form-item>
            <el-form-item label="shopid" prop="shopid">
              <el-input  v-model.trim="postInfo.shopid" placeholder="请输入shopid"></el-input>
            </el-form-item>
            <el-form-item label="title" prop="title">
              <el-input  v-model.trim="postInfo.title" placeholder="请输入title"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="modal.addShow" @click="addPost">确定</el-button>
              <el-button @click="modal.addShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="alertShow">
        <el-alert
          :title="alertMsg"
          type="">warning
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
      dataReady: false,
      pageCfg: {
        total: 1,
        currentPage: 1,
        start: 0,
        limit: 30,
      },
      // table data
      infos: [],

      modal: {
        addShow: false,
      },
      selIdx: -1,
      alertShow: false,
      alertMsg: '',
      postInfo: {
        appid: '',
        secret: '',
        shopid: '',
        title: ''
      },
      rules: {
        appid: [
          { required: true, message: '请输入appid',trigger: 'blur'},
        ],
        secret: [
          {required: true, message: '请输入secrect',trigger: 'blur'},
        ],
        shopid: [
          {required: true, message: '请输入shopid',trigger: 'blur'},
        ],
        title: [
          {required: true, message: '请输入title',trigger: 'blur'},
        ],
      }
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
      //判断分页是否为第一页
      if (reload) {
        this.pageCfg.start = 0;
      }

      var param = {
        seq: this.pageCfg.start || 0,
        num: 30,
      };
      CGI.post(this.$store.state, 'config/get_wxmp_info', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          if (data.infos) {
            this.infos = data.infos;
          }
          this.pageCfg.total = data.total;
          this.dataReady = true;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    editUnit(idx, row) {
      CGI.extend(this.postInfo, row);
      this.selIdx = idx;
      this.modal.text = '修改';
      this.modal.addShow = false;
      this.modal.editShow = true;
    },
    addUnit() {
      CGI.objClear(this.postInfo);
      this.modal.text = '增加';
      this.modal.addShow = true;
      this.modal.editShow = true;
    },
    addPost() {
      var _this = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var param = CGI.clone(this.postInfo);
          console.log(param)
          CGI.post(this.$store.state,'config/add_wxmp_info', param, function(resp) {
            if (resp.errno === 0) {
              var u = param
              u.id = resp.data.id;
              _this.infos.unshift(u);
              _this.modal.addShow = false;
            } else {
              _this.alertInfo(resp.desc);
               _this.modal.addShow = false;
            }
          })
        }
      })
    },
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData(false);
      console.log(`当前页: ${val}`);
    },
    alertInfo(val) {
      this.alertShow = true;
      this.alertMsg = val;
    },
    refresh() {
      this.getData(false);
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
