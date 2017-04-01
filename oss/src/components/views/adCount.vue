<style lang="scss" scope>
@import '../../assets/css/table.css';
@import '../../assets/css/common.scss';
.edit-form {
  max-width:600px;
  width: 80%;
  height: 60%;
}
.form-title {
  width: 100%;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

</style>
<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-left outline-none" @click="add">添加</button>
        </div>
        <div>
          <button class="btn btn-default btn-ssm" @click="getData(false)">刷新</button>
        </div>
      </header>
      <div class="tab_container" ref="tableContent">
        <div id="tab1" class="tab_content tab-fixed" v-if="dataReady">
          <template>
            <el-table
              :data="infos"
              :height="tableHeight"
              border
              highlight-current-row>
              <el-table-column
                inline-template
                label="广告id">
                <div>{{row.id||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="广告名称">
                <div>{{row.name||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="广告版本">
                <div>{{row.version||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="广告业主id">
                <div>{{row.adid||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="广告摘要">
                <div>{{row.abstract||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="广告内容">
                <div>{{row.content||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="发布者">
                <div>{{row.url || '-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="状态">
                <div>{{row.online ? '上线' : '下线'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="发布时间">
                <div>{{row.dbg ? '是' : '否'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="100">
                <span>
                  <el-button @click="edit($index,row)" type="text" size="small">修改</el-button>
                  <el-button @click="edit($index,row)" type="text" size="small">删除</el-button>
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
        :total="pageCfg.total || 1">
      </el-pagination>
      <div class="shade" v-if="modal.editShow">
        <div class="edit-form" style="">
          <el-form :model="postInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
             <el-form-item label="广告名称" prop="name">
              <el-input  v-model.trim="postInfo.name" placeholder="请输入广告名称"></el-input>
            </el-form-item>
            <el-form-item label="内容版本" prop="version">
              <el-input v-model.trim="postInfo.version" placeholder="请输入内容版本"></el-input>
            </el-form-item>
            <el-form-item label="摘要信息" prop="abstract">
              <el-input v-model.trim="postInfo.abstract"  placeholder="请输入摘要信息"></el-input>
            </el-form-item>
            <el-form-item label="广告业主" prop="adid">
              <el-select v-model="postInfo.adid" placeholder="请选择投放时段">
                <el-option
                  v-for="item in addParam.customer"
                  :label="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放时段" prop="tsid">
              <el-select v-model="postInfo.tsid" placeholder="请选择投放时段">
                <el-option
                  v-for="item in addParam.timeslot"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放区域" prop="areaid">
              <el-select v-model="postInfo.areaid" placeholder="请选择投放时段">
                <el-option
                  v-for="item in addParam.area"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="online">
              <el-radio-group v-model="postInfo.online">
                <el-radio label="1">下线</el-radio>
                <el-radio label="0">上线</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addPost('ruleForm')">确定</el-button>
              <el-button @click="modal.editShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="shade" v-if="modal.addShow">
        <div class="edit-form" style="max-width:600px;width: 70%;height: 60%;overflow: auto">
          <div class="form-title">增加</div>
          <el-form ref="form2" :model="postInfo" :rules="rules" label-width="100px">
            <el-form-item label="广告名称" prop="name">
              <el-input  v-model.trim="postInfo.name" placeholder="请输入广告名称"></el-input>
            </el-form-item>
            <el-form-item label="内容版本" prop="version">
              <el-input v-model.trim="postInfo.version" placeholder="请输入内容版本"></el-input>
            </el-form-item>
            <el-form-item label="摘要信息" prop="abstract">
              <el-input v-model.trim="postInfo.abstract"  placeholder="请输入摘要信息"></el-input>
            </el-form-item>
            <el-form-item label="广告内容" prop="content">
              <el-input v-model.trim="postInfo.content"  placeholder="请输入摘要信息"></el-input>
            </el-form-item>
            <el-form-item label="广告图片">
              <uploader></uploader>
            </el-form-item>  
            <el-form-item label="广告业主" prop="adid">
              <el-select v-model="postInfo.adid" placeholder="请选择广告业主">
                <el-option
                  v-for="item in addParam.customer"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放时段" prop="tsid">
              <el-select v-model="postInfo.tsid" placeholder="请选择投放时段">
                <el-option
                  v-for="item in addParam.timeslot"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放区域" prop="areaid">
              <el-select v-model="postInfo.areaid" placeholder="请选择投放区域">
                <el-option
                  v-for="item in addParam.area"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="online">
              <el-radio-group v-model="postInfo.online">
                <el-radio label="1">上线</el-radio>
                <el-radio label="0">下线</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <div class="btn-click">
                <el-button type="primary" @click="addPost('form2')">确定</el-button>
                <el-button @click="modal.addShow=false">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--dialog-->
      <el-dialog v-model="modal.dialogShow"  :title="dialogCfg.title" size="tiny">
        <span>{{dialogCfg.text}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="modal.dialogShow = false">取 消</el-button>
          <el-button type="primary" @click.native="onlineOps">确 定</el-button>
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
import uploader from '../lib/uploader.vue'
export default {
  data() {
    return {
      dataReady: true,
      infos: [],
      modal: {
        editShow: false,
        dialogShow: false,
        addShow: false,
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
      postInfo: {
        name: '',
        version: '',
        adid: Number,
        areaid: Number,
        tsid: Number,
        img: '',
        abstract: '',
        online: '1',
        content: ''
      },
      reviewOps: 0,
      alertShow: false,
      alertMsg: '',
      addParam: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        version: [
          { required: true, message: '请输入内容版本', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入摘要信息', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入广告内容', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请选择banner图片', trigger: 'click'}
        ],
        adid: [
          { type: 'number', required: true, message: '请选择广告业主', trigger: 'change' }
        ],
        areaid: [
          { type: 'number',required: true, message: '请选择投放区域', trigger: 'change' }
        ],
        tsid: [
          { type: 'number',required: true, message: '请选择投放时段', trigger: 'change' }
        ],
        online: [
          { required: true, message: '请选择在线状态', trigger: 'change' }
        ],
      }
    }
  },
  components: {
    uploader
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
      }

      CGI.post(this.$store.state, 'get_advertise', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.infos = data.infos;
          if (!this.infos) {
            this.infos = [];
          } else if (this.infos && this.infos.length > 0) {
            this.infos.forEach(function(item) {
              if (!item.online) {
                item.online = 0
              }
              if (!item.deleted) {
                item.deleted = 0;
              }
            })
          }
          this.dataReady = true;
        } else {
          this.alertInfo(resp.desc);
        }
      });
      CGI.post(this.$store.state, 'get_ad_param', {}, (resp)=> {
        if (resp.errno === 0) {
          this.addParam = resp.data;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    handleSizeChange(val) {
      console.log('每页 ${val} 条');
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData(false);
      console.log('当前页: ${val}');
    },
    add() {
      CGI.objClear(this.postInfo);
      this.postInfo.online = "0";
      this.modal.addShow = true;
    },
    edit(idx,row) {
      this.selIdx = idx;
      CGI.objClear(this.postInfo);
      CGI.extend(this.postInfo,row);
      this.modal.editShow = true;
    },
    editPost() { 
      var param = CGI.objModified(this.infos[this.selIdx], this.postInfo);        
      param.id = this.infos[this.selIdx].id; 
      param.online = this.infos[this.selIdx].online;
      param.deleted = ~~param.deleted;
      CGI.post(this.$store.state, 'mod_portal_menu', param, (resp)=> {
        if (resp.errno === 0) {
          CGI.extend(this.infos[this.selIdx], this.postInfo);
          this.modal.editShow = false;
          this.selIdx = -1;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    addPost(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postInfo.img = this.$store.state.imgUrl[0];
          var param = CGI.clone(this.postInfo);
          param.img = this.$store.state.imgUrl[0];
          param.online = ~~param.online;
          console.log(JSON.stringify(param));
          CGI.post(this.$store.state, 'add_advertise', param, function(resp){
            if (resp.errno === 0) {
              var u = CGI.clone(_this.postInfo);
              console.log(resp.data.id)
              u.id = resp.data.id;
              _this.infos.push(u);
              _this.modal.addShow = false;
            } else {
              this.alertInfo(resp.desc);
            }
          })
        } else {
          return false;
        }
      });
    },  
    alertInfo(val) {
      this.alertShow = true;
      this.alertMsg = val; 
    }
  }
}
</script>
