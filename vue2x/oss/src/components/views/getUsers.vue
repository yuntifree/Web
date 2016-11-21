<template>
  <div class="mana_container" v-if="mounted">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-sm outline-none">
          <i class="iconfont icon-add"></i>添加用户
          </button>
        </div>
        <div>
          <div class="quick_search">
            <i class="iconfont icon-search"></i>
            <input class="ipt-search" type="text" placeholder="ID/电话/用户名">
          </div>
          <button class="btn btn-default btn-sm outline-none"><i class="iconfont icon-renzheng"></i>高级搜索</button>
        </div>
      </header>
      <!--begin:右键菜单-->
      <div id="context-menu">
        <ul name="dropdown-menu" class="dropdown-menu">
          <li v-for="op in ops" @click="onMenu(op.cmd)"><a>{{op.title}}</a></li>
        </ul>
      </div>
      <!--end:右键菜单-->
      <div class="tab_container" id="tab_container">
        <div class="tab_content tab-fixed">
          <template>
            <el-table
              :data="users"
              height="500"
              border
              style="width: 100%,height:100%">
              <el-table-column
                prop="id"
                label="id">
              </el-table-column>
              <el-table-column
                prop="emie"
                label="emie">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
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
    </div>
</template>
<script>
//import details from '../lib/detail.vue'
import CGI from '../../lib/cgi.js'
import md5 from 'md5'

var columns = ['id','手机号','imei','最近在线','备注'];
var searchParams = {};
export default {
  data() {
    return {
      pageCfg: {
        total: 1,
        currentPage: 1,
        start: 0,
        limit: 30,
      },

      //右键功能
      ops: [{
        title: '修改用户',
        cmd: 'editUser'
      },{
        title: '重置密码',
        cmd: 'rest'
      }],

      // table data
      users: [],
      columns: columns,

      mounted: false,
      selIdx: -1,
    }
  },
  components: {
  },
  created() {
    this.getData(true);
  },
  mounted() {
    this.$nextTick(()=> {
      $('#context-menu').on('show.bs.context', (e) => {
        console.log(1);
        this.selIdx = $(e.target).data('idx');
        //this.msgShopping(this.users[this.selIdx].shopping);
      }); //右键
    })
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
      CGI.post(this.$store.state, 'get_users', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          this.users = data.infos;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.mounted = true;
        } else {
          console.log(resp.desc);
        }
      });
    },
    onMenu(cmd) {
      switch (cmd) {
        case 'editUser':
          //this.editUser();
          break;
        case 'rest':
          //this.rest();
          break;
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
