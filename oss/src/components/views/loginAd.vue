<style lang="scss" scope>
@import '../../assets/css/table.css';
@import '../../assets/css/common.scss';
.dropdown-menu>li>a button[disabled] {
  color: #ccc;
}
.el-icon-close:before {
 content: '';
}
.height120 {
  width: 120px;
  max-height: 120px;
  overflow: hidden;
}
.el-date-editor {
  border: none;
}
</style>
<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button type="button" class="btn btn-info btn-left outline-none">
            地区<select v-model="selected" @change="getData(true)"><option :value="{ number: 0 }">松山湖</option><option :value="{ number: 1 }">卫计局</option><option :value="{ number: 2 }">控股大厦</option><option :value="{ number: 3 }">AC4测试</option><option :value="{ number: 4 }">学校招商</option></select></button>
           <button type="button" class="btn btn-info btn-left outline-none">
            位置<select v-model="posSel" @change="getData(true)"><option v-for="area in areas" :value="{pos: area}">{{area}}</option></select></button>
          <button class="btn btn-left outline-none" @click="add">添加</button>
        </div>
        <div>
          <button class="btn btn-default btn-ssm" @click="getData(0)">刷新</button>
        </div>
      </header>
      <div class="tab_container" ref="tableContent">
        <div id="tab1" class="tab_content tab-fixed" v-if="dataReady">
          <template>
            <el-table
              :data="infos"
              :height="tableHeight"
              border
              highlight-current-row
              @row-click="chkLine">
              <el-table-column
                inline-template
                label="id">
                <div>{{row.id||'-'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="图片">
                <div>
                  <img v-if="row.img" style="width:100%;height:auto;max-width:120px" :src="row.img">
                  <span v-else>-</span>
                </div>
              </el-table-column>
              <el-table-column
                inline-template
                label="开始时间">
                <div>{{row.stime||"00:00"}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="结束时间">
                <div>{{row.etime||"00:00"}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                label="状态">
                <div>{{row.online?'上线':'下线'}}</div>
              </el-table-column>
              <el-table-column
                inline-template
                :context="_self"
                label="操作"
                width="100">
                <span>
                  <el-button @click="edit($index,row)" type="text" size="small">编辑</el-button>
                  <el-button @click="delPost($index,row)" type="text" size="small">删除</el-button>
                  <el-button @click="review($index,row,1)" v-show="!row.online" type="text" size="small">上线</el-button>
                  <el-button @click="review($index,row,0)" v-show="row.online" type="text" size="small">下线</el-button>
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
       <div class="shade" v-if="modal.addShow">
        <div class="edit-form" style="width:600px">
          <el-form ref="form" :model="postInfo"label-width="100px">
            <el-form-item label="开始时间">
              <el-time-select
                  placeholder="开始时间"
                  v-model="dateInfo.startTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                  }">
              </el-time-select>
            </el-form-item>
            <el-form-item  label="结束时间">
              <el-time-select
                placeholder="结束时间"
                v-model="dateInfo.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                  minTime: dateInfo.startTime
                }">
              </el-time-select>
            </el-form-item>
            <el-form-item label="图片">
              <uploader></uploader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="!modal.editShow" @click="addPost">确定</el-button>
              <el-button type="primary" v-else @click="editPost">确定</el-button>
              <el-button @click="modal.addShow=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--dialog-->
      <el-dialog v-model="modal.dialogShow"  :title="dialogCfg.title" size="tiny">
        <span>{{dialogCfg.text}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="modal.dialogShow = false">取 消</el-button>
          <el-button type="primary" v-if="modal.delShow" @click.native="delOps">确 定</el-button>
          <el-button type="primary" v-else  @click.native="onlineOps">确 定</el-button>
        </span>
      </el-dialog>
      <!--alert-->
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
export default {
  data() {
    return {
      dataReady: true,
      infos: [],
      areas: [0,1,2,3,4,5,6,7,8,9,10,11,12],
      modal: {
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
      selId: -1,
      selected: {
        number:0
      },
      posSel: {
        pos: 0
      },
      postInfo: {
        startTime: 0,
        startTime: 0
      },
      dateInfo: {
        startTime: '',
        endTime: ''
      },
      alertShow: false,
      alertMsg: '',
      online: 0
    }
  },
  components: {
    uploader
  },
  computed: {
    tableHeight() {
      return this.$store.state.tableHeight;
    },
    imgUrl() {
      return this.$store.state.imgUrl
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
        type: this.selected.number,
        pos: this.posSel.pos
      }
      var _this = this;
      CGI.post(this.$store.state, 'config/get_login_img', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          if (data.infos && data.infos.length >0) {
            data.infos.forEach(function (item){
              if (item.stime) {
                item.stime = _this.makeTime(item.stime)
              }
              if (item.etime) {
                item.etime = _this.makeTime(item.etime)
              }
            })
            this.infos = data.infos;
          } else {
            this.infos = [];
          }
          this.pageCfg.total = data.total;
          this.dataReady = true;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    makeTime(time) {
      var s='00',e='00';
      time = time+'';
      if (time) {
        //console.log(typeof(time));
        if (time <100) {
          time = time + '';
          e = time.substr(0,2)
        }
        if (time >=100 && time<999) {
          time = time + '';
          s = time.substr(0,1);
          e = time.substr(1);
        }
        if (time>=1000) {
          time = time + '';
          s = time.substr(0,2);
          e = time.substr(2);
        }
      }          
      return s+ ':'+e;
    },
    handleSizeChange(val) {
      console.log('每页 ${val} 条');
    },
    handleCurrentChange(val) {
      this.pageCfg.start = (val-1)*30;
      this.getData();
      console.log('当前页: ${val}');
    },
    add() {
      CGI.objClear(this.dateInfo);
      CGI.objClear(this.postInfo);
      this.$store.state.imgUrl = [];
      this.modal.editShow = false;
      this.modal.addShow = true;
    },
    addPost() { 
      if (this.makeParam()) {
        var param = {
          stime: this.postInfo.startTime,
          etime: this.postInfo.endTime,
          img: this.$store.state.imgUrl[0],
          type: this.selected.number,
          pos: this.posSel.pos
        }
        CGI.post(this.$store.state, 'config/add_login_img', param, (resp)=> {
          if (resp.errno == 0) {
            var info = [{
              id : resp.data.id,
              img: param.img,
              sTime: this.dateInfo.startTime,
              eTime: this.dateInfo.endTime,
            }]
            this.infos = info.concat(this.infos);
            this.modal.addShow = false;
          } else {
            this.alertInfo(resp.desc);
          }
        })
      }
    },
    edit(idx,row) {
      this.selIdx = idx;
      this.dateInfo.startTime = row.stime || '00:00';
      this.dateInfo.endTime = row.etime || '00:00';
      this.$store.state.imgUrl = [];
      this.modal.editShow = true;
      this.modal.addShow = true;
    },
    editPost() {
      var idx = this.selIdx;
      if (this.makeParam()) {
        var param = {
          id: this.infos[idx].id,
          stime: this.postInfo.startTime,
          etime: this.postInfo.endTime,
          img: this.$store.state.imgUrl[0] || this.infos[idx].img,
          type: this.selected.number,
          online: this.infos[idx].online || 0,
          deleted: 0
        }
        CGI.post(this.$store.state, 'config/mod_login_img', param, (resp)=> {
          if (resp.errno === 0) {
            this.infos[idx].stime = this.dateInfo.startTime;
            this.infos[idx].etime = this.dateInfo.endTime;
            this.modal.addShow = false;
            this.selIdx = -1;
          } else {
            this.alertInfo(resp.desc);
          }
        })
      }
    },
    makeParam() {
      var ret = true
      if (!this.modal.editShow) {
        if (this.$store.state.imgUrl.length==0) {
          ret = false;
          this.alertInfo('请选择图片');
        }
      }
      var endTime = this.dateInfo.endTime.trim();
      if (endTime.length==0) {
        ret = false;
        this.alertInfo('请选择结束时间');
      } else {
        this.postInfo.endTime = ~~endTime.replace(':','');
        if (this.postInfo.endTime==2400) {
          this.postInfo.endTime = 0
        }
      }
      var startTime = this.dateInfo.startTime.trim();
      if (startTime.length==0) {
        ret = false;
        this.alertInfo('请选择开始时间');
      } else {
        this.postInfo.startTime = ~~startTime.replace(':','');  
        if (this.postInfo.startTime==2400) {
          this.postInfo.startTime = 0
        }
      }
      return ret;
    },
    review(idx,row,online) {  
      this.selIdx = idx;
      var title = online ? '上线' : '下线';
      this.online = online;
      this.dialogCfg.title = title;
      this.dialogCfg.text = '确认要'+title+'吗';
      this.modal.delShow = false;
      this.modal.dialogShow = true;
    },
    chkLine(row) {
      this.selId = row.id; 
    },
    onlineOps() {
      var idx = this.selIdx;
      var param = {
        id: this.infos[idx].id,
        img: this.infos[idx].img,
        stime: this.infos[idx].stime ? ~~this.infos[idx].stime.replace(':','') : 0,
        etime: this.infos[idx].etime ? ~~this.infos[idx].etime.replace(':','') : 0,
        online: this.online,
        deleted: 0
      };
      CGI.post(this.$store.state, 'config/mod_login_img', param, (resp)=> {
        if (resp.errno === 0) {
          this.getData();
          this.modal.dialogShow = false;
          this.infos[idx].online = this.online;
          this.selIdx = -1;
          } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    delPost(idx,row) {
      this.selIdx = idx;
      this.dialogCfg.title = '删除';
      this.dialogCfg.text = '确认要删除吗';
      this.modal.delShow = true;
      this.modal.dialogShow = true;
    },
    delOps() {
      var idx = this.selIdx;
      console.log(this.infos[idx].online);
      var param ={
        id: this.infos[idx].id,
        img: this.infos[idx].img,
        stime: this.infos[idx].stime ? ~~this.infos[idx].stime.replace(':','') : 0,
        etime: this.infos[idx].etime ? ~~(this.infos[idx].etime.replace(':','')) : 0,
        online: this.infos[idx].online || 0,
        deleted: 1
      }
      CGI.post(this.$store.state, 'config/mod_login_img', param, (resp)=> {
        if (resp.errno === 0) {
          this.getData();
          this.modal.dialogShow = false;
          this.infos.splice(idx,1);
          this.selIdx = -1;
          this.alertInfo('删除成功')
          } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    getPos() {
      console.log(this.posSel.pos)
    },
    alertInfo(val) {
      this.alertShow = true;
      this.alertMsg = val; 
    }
  }
}
</script>
