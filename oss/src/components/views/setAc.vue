<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-sm outline-none">
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
                label="acname">
                <div>{{row.acname||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="actype">
                <div>{{row.actype ? '卫计局' : '松山湖' ||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="登录方式">
                <div v-if="row.logintype==1">微信公众号</div>
                <div v-else-if="row.logintype==2">淘宝登录</div>
                <div v-else-if="row.logintype==3">App登录</div>
                <div v-else>未知登录</div>
              </el-table-column>
              <el-table-column
                label="app登录">
                <el-table-column
                 inline-template
                 label="跳转地址"
                >
                <div v-if="row.logintype==3&&row.appinfo" v-text="row.appinfo.dst || '-'"></div>
                <div v-else>-</div>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="淘宝登录">
                <el-table-column
                inline-template
                label="淘宝覆盖图">
                  <div>
                    <img v-if="row.logintype==2&&row.tbinfo&&row.tbinfo.cover" style="width:100%;height:auto;max-width:120px" :src="row.tbinfo.cover">
                    <span v-else>-</span>
                  </div>
                </el-table-column>
                <el-table-column
                inline-template
                label="淘宝跳转地址">
                <div v-if="row.logintype==2&&row.tbinfo" v-text="row.tbinfo.dst || '-'"></div>
                <div v-else >-</div>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="公众号">
                <el-table-column
                 inline-template
                 label="id"
                >
                  <div v-if="row.logintype==1" v-text="row.wxinfo.id || '-'"></div>
                  <div v-else v-text="'-'"></div>
                </el-table-column>
                <el-table-column
                inline-template
                label="appid">
                  <div v-if="row.logintype==1" v-text="row.wxinfo.appid || '-'"></div>
                  <div v-else>-</div>
                </el-table-column>
                <el-table-column
                inline-template
                label="secrect">
                  <div v-if="row.logintype==1" v-text="row.wxinfo.secrect || '-'"></div>
                  <div v-else>-</div>
                </el-table-column>
                <el-table-column
                inline-template
                label="shopid">
                  <div v-if="row.logintype==1" v-text="row.wxinfo.shopid || '-'"></div>
                  <div v-else>-</div>
                </el-table-column>
                <el-table-column
                inline-template
                label="title">
                  <div v-if="row.logintype==1" v-text="row.wxinfo.title || '-'"></div>
                  <div v-else>-</div>
                </el-table-column>
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="100">
                <span>
                  <el-button @click="editAc($index,row)" type="text" size="small">编辑</el-button>
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
        :total="pageCfg.total || 1">
      </el-pagination>
      <div class="shade" v-show="modal.editShow" >
        <div class="edit-form" style="width:600px">
          <el-form ref="ruleForm" :model="editInfo" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item label="登录方式">
              <input type="radio" id="one" value="1" v-model="editInfo.logintype" @click.stop="clickWx">
              <label for="one">微信公众号</label>
              <input type="radio" id="two" value="2" v-model="editInfo.logintype" @click.stop="clickOther">
              <label for="two">淘宝登录</label>
              <input type="radio" id="three" value="3" v-model="editInfo.logintype" @click.stop="clickOther">
              <label for="three">App登录</label>
            </el-form-item>
            <div v-show="editInfo.logintype==1">
              <el-form-item label="公众号id" prop="wxid">
                <el-input type="number" v-model.number="editInfo.wxid"></el-input>
              </el-form-item>
            </el-form-item>
            </div>
            <div v-show="editInfo.logintype==2">
              <el-form-item label="淘宝过渡图片" prop="img">
                <uploader></uploader>
              </el-form-item>
            </div>
            <div v-show="editInfo.logintype==2||editInfo.logintype==3">
              <el-form-item :label="editInfo.logintype==2 ? '淘宝跳转地址' : 'app跳转地址'" prop="dst">
                <el-input type="text" v-model="editInfo.dst"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="editPost()">确定</el-button>
              <el-button @click="modal.editShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="alertShow">
        <el-alert
          :title="alertMsg"
          type="warning">
        </el-alert>
      </div>
    </article>
  </div>
</template>
<script>
import uploader from '../lib/uploader.vue'
import CGI from '../../lib/cgi.js'
import md5 from 'md5'

var columns = ['id','手机号','imei','最近在线','备注'];
var searchParams = {};
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
      columns: columns,

      modal: {
        editShow: false,
      },

      selIdx: -1,
      alertShow: false,
      alertMsg: '',
      editInfo: {
        logintype: 0,
        wxid: 0,
        cover: '',
        dst: ''
      },
      rules: {
        dst: [
          { required: false, message: '请输入跳转地址', trigger: 'blur' },
        ],
        wxid: [
          {required: false, message: '请输入公众号id' },
          {type: 'number', message: '请输入正确的公众号id'}
        ]
      },
      alertShow: false,
      alertMsg: '',
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.tableHeight;
    }
  },
  components: {
    uploader
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
      CGI.post(this.$store.state, 'config/get_ac_conf', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.infos = data.infos;
          this.pageCfg.total = data.total;
          this.dataReady = true;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    editAc(idx, row) {
      this.selIdx = idx;
      var logintype = this.editInfo.logintype = row.logintype;
      switch (logintype) {
        case 1:
          this.editInfo.wxid = row.wxinfo.id;
          break;
        case 2: 
          this.editInfo.cover = row.tbinfo.cover;
          break;
        case 3:
          this.editInfo.dst = row.appinfo.dst;
          break;
      }
      this.modal.editShow = true;
    },
    clickWx() {
      this.rules.dst[0].required = false;
      this.rules.wxid[0].required = true;
    },
    clickOther() {
      this.rules.wxid[0].required = false;
      this.rules.dst[0].required = true;
    },
    editPost() {
      var _this = this;
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          var param = {
            id: _this.infos[_this.selIdx].id,
            logintype: ~~_this.editInfo.logintype,
          }
          switch (param.logintype) {
            case 1:
              param.wxid = ~~_this.editInfo.wxid;
              break;
            case 2:
              param.dst = _this.editInfo.dst;
              if (_this.$store.state.imgUrl.length > 0) {
                param.cover = _this.$store.state.imgUrl[0];
              }
              break;
            case 3:
              param.dst = _this.editInfo.dst;
              break;
          }
          console.log(param);
          CGI.post(this.$store.state, 'config/mod_ac_conf', param, (resp)=> {
            if (resp.errno == 0) {
              _this.infos[_this.selIdx].logintype = param.logintype;
              _this.getData(false);
              _this.alertInfo('修改成功');
              _this.selIdx = -1;
              _this.modal.editShow = false;
            } else {
              this.alertInfo(resp.desc);
              _this.selIdx = -1;
              _this.modal.editShow = false;
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
