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
                label="apid">
                <div>{{row.id||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="单位名称">
                <div>{{row.name||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="百度经度">
                <div>{{row.longitude||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="百度纬度">
                <div>{{row.latitude||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="单位id">
                <div>{{row.unid||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="mac地址">
                <div>{{row.mac||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="100">
                <span>
                  <el-button @click="editUnit($index,row)" type="text" size="small">编辑</el-button>
                  <el-button @click="delTime($index,row)" type="text" size="small">删除</el-button>
                </span>
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
      <div class="shade" v-if="modal.editShow" >
        <div class="edit-form">
          <div class="form-title">{{modal.text}}</div>
          <el-form ref="form" :model="postInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="单位id" prop="unid">
              <el-input  v-model.number="postInfo.unid" placeholder="请输入单位id"></el-input>
            </el-form-item>  
            <el-form-item label="经度" prop="longitude">
              <el-input  v-model.number="postInfo.longitude" placeholder="请输入百度经度"></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input  v-model.number="postInfo.latitude" placeholder="请输入百度纬度"></el-input>
            </el-form-item>
            <el-form-item label="MAC地址" v-if="modal.addShow" prop="mac">
              <el-input  v-model.trim="postInfo.mac" placeholder="请输入mac地址"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="modal.addShow" @click="addPost">确定</el-button>
              <el-button type="primary" v-else @click="editPost">确定</el-button>
              <el-button @click="modal.editShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-dialog v-model="modal.dialogShow"  :title="dialogCfg.title" size="tiny">
        <span>{{dialogCfg.text}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="modal.dialogShow = false">取 消</el-button>
          <el-button type="primary" @click.native="delPost">确 定</el-button>
        </span>
      </el-dialog>
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
        editShow: false,
        dialogShow: false,
        text: ''
      },
      dialogCfg: {
        title: '',
        text: '',
      },
      selIdx: -1,
      alertShow: false,
      alertMsg: '',
      postInfo: {
        unid: 0,
        longitude: 0.0,
        latitude: 0.0,
        mac: ''
      },
      rules: {
        unid: [
          { required: true, message: '请输入单位id'},
          { type: 'number', message: '单位id必须为数字值'}
        ],
        longitude: [
          {required: true, message: '请输入百度经度'},
          { type: 'number', message: '经度必须为数字值'}
        ],
        latitude: [
          {required: true, message: '请输入百度纬度'},
          { type: 'number', message: '纬度必须为数字值'}
        ],
        mac: [
          {required: true, message: '请输入mac地址', trigger: 'blur' },
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
      CGI.post(this.$store.state, 'config/get_ap_info', param, (resp) => {
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
          var param = {
            unid: this.postInfo.unid,
            longitude: this.postInfo.longitude,
            latitude: this.postInfo.latitude,
            mac: this.postInfo.mac
          }
          CGI.post(this.$store.state,'config/add_ap_info', param, function(resp) {
            if (resp.errno === 0) {
              var u = param
              u.id = resp.data.id;
              _this.infos.unshift(u);
              _this.modal.editShow = false;
            } else {
              _this.alertInfo(resp.desc);
            }
          })
        }
      })
      
    },
    editPost() {
      var _this = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var param = {
            id: this.infos[this.selIdx].id,
            unid: this.postInfo.unid,
            longitude: this.postInfo.longitude,
            latitude: this.postInfo.latitude,
            deleted: 0
          }
          CGI.post(this.$store.state, 'config/mod_ap_info', param, function(resp) {
            if (resp.errno === 0) {
              CGI.extend(_this.infos[_this.selIdx],_this.postInfo);
              _this.modal.editShow = false;
              _this.selIdx = -1;
            } else {
              _this.alertInfo(resp.desc);
            }
          })
        }
      })
    },
    delTime(idx, row) {
      this.selIdx = idx;
      this.dialogCfg.title = '删除';
      this.dialogCfg.text = '确认要删除' + row.name +'吗';
      this.modal.dialogShow = true;
    },
    delPost() {
      var param = {
        id: this.infos[this.selIdx].id,
        unid: this.infos[this.selIdx].unid,
        longitude: this.infos[this.selIdx].longitude,
        latitude: this.infos[this.selIdx].latitude,
        deleted: 1
      };
      CGI.post(this.$store.state, 'config/mod_ap_info', param, (resp)=> {
        if (resp.errno === 0) {
          this.infos.splice(this.selIdx, 1);
          this.modal.dialogShow = false;
          this.alertInfo('删除成功');
          this.selIdx = -1;
        } else {
          this.alertInfo(resp.desc);
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
