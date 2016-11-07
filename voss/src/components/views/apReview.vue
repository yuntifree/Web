<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-sm outline-none" @click="clickMap">
          <i class="iconfont icon-add"></i>百度地图
          </button>
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
        <div class="tab_content tab-fixed" v-if="mounted">
          <table class="table table-bordered tablesorter table-hover user-table" cellspacing="0">
            <thead class="th-fixed">
              <tr>
                <td v-for="head in columns">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in infos"
                @click="selIdx = $index"
                :class="{choosed:selIdx == $index}"
                data-toggle="context" data-target="#context-menu" :data-idx="$index">
                <td>{{row.id}}</td>
                <td>{{row.ssid}}</td>
                <td>{{row.address}}</td>
                <td>{{row.online ? '在线' : '下线'}}</td>
                <td>{{row.online}}</td>
                <td>{{row.bindwidth}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end of #tab1 -->
      </div>
    
      <!-- end of .tab_container -->
      <pager :total-page="pageCfg.total" :curr-page="pageCfg.currentPage"></pager>
      <!--edit-->
    </article>
    <!--map-->    
    <div v-show="mapShow" id="map" class="map"  style="width:100%;height:100%;position:absolute;top:0;left:0"></div>
    <span v-show="mapShow" class="close-map" @click="mapShow=false">X</span
    <alert :show.sync="tips.showTip" :duration="2000" type="info" height="auto" class="search-tip tips">
     <p>{{tips.msgTip}}</p>
  </alert>
  </div>
</template>
<script>
import pager from '../lib/pager.vue'
import modal from '../lib/Modal.vue'
import alert from '../lib/Alert.vue'
import uploader from '../lib/uploader.vue'
import details from '../lib/detail.vue'
import searchs from '../lib/search.vue'
import CGI from '../../lib/cgi.js'
import md5 from 'md5'

var columns = ['id','ssid','位置','状态','在线人数','带宽'];
var searchParams = {};
export default {
  data() {
    return {
      modal: {
        editShow: false,
      },
      modalCfg: {
        text: '',
        title: '',
        name: '',
        callback: () => {},
      },
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
      infos: [],
      columns: columns,
      apAddress: [],
      mounted: false,
      selIdx: -1,
      showTop: false,
      mapShow: false,
      tips: {
        showTip: false,
        msgTip: '',
      },
    }
  },
  components: {
    pager,
    modal,
    uploader,
    alert,
    details,
    searchs,
  },
  created() {
    this.getData(true);
  },
  ready() {
    $('#context-menu').on('show.bs.context', (e) => {
      this.selIdx = $(e.target).data('idx');
      //this.msgShopping(this.infos[this.selIdx].shopping);
    }); //右键
    CGI.loadScript('http://api.map.baidu.com/getscript?v=2.0&ak=BiR1G4yZybhnXDTDHLYq8WXMPaK7owWm','map.js',()=>{})
  },
  methods: {
    getData(reload,seq) {
      if (this.acvandeQuery) {
        this.acvandeQuery = false;
      }
      //判断分页是否为第一页
      if (reload) {
        this.pageCfg.start = 0;
        this.pageCfg.currentPage = 1;
      }

      var param = {
        seq: seq || 0,
        num: 30,
      };
      CGI.post(this.$store.state, 'get_ap_stat', param, (resp) => {
        if (resp.errcode === 0) {
          var data = resp.data;
          this.infos = data.infos;
          this.pageCfg.total = CGI.totalPages(data.total, this.pageCfg.limit);
          this.mounted = true;
        } else {
          this.tip(resp.desc);
        }
      });
    },
    clickMap() {
      var map = new BMap.Map('map');  
      var point = new BMap.Point(113.90387023396529, 22.93310386339828);
      //标注
      map.centerAndZoom(point,15);    
      var marker = new BMap.Marker(point);        // 创建标注    
      map.addOverlay(marker);
      //控件
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.OverviewMapControl());
      getApAddress(point.lng,point.lat);

      //事件
      this.mapShow = true;
      map.addEventListener("dragend", function(){
        var bs = map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左上角
        var bsne = bs.getNorthEast();   //可视区域右上角
        var lng = (bssw.lng+bsne.lng)/2;
        var lat = (bssw.lat+bsne.lat)/2;
        getApAddress(lng,lat);
      });

     function  getApAddress(lng,lat){
        var param = {
          longitude: lng,
          latitude: lat,
        }
        CGI.post(this.$store.state,'get_nearby_aps',param,(resp)=>{
          if (resp.errcode===0) {
            this.apAddress = resp.data.infos;
            var len = this.apAddress.length;
            for (var i = 0; i < len; i ++) {
                var spot = new BMap.Point(this.apAddress[i].longitude, this.apAddress[i].latitude);
                addMarker(spot);
              }
          }
        })
      }      
    },
    refresh() {
      this.getData(false);
    },
    tip(val) {
      this.tips.showTip = true;
      this.tips.msgTip = val;
    }
  },
  events: {
    'page-change': function(idx) {
      this.pageCfg.start = (idx - 1) * this.pageCfg.limit;
      this.pageCfg.currentPage = idx;
      var searchLen = this.search.trim().length;
      var len = this.infos.length-1;
      //分页接口区分
      if(searchLen == 0 && !(this.advancedSearch)){
        this.getData(false,this.infos[len].seq);
      } else if (searchLen > 0){
        this.doSearch(false,this.infos[len].seq);
      } else if (this.advancedSearch) {
        searchParams.start = this.pageCfg.start;
        this.query(searchParams, 'advanced_search', true,this.infos[len].seq);
      }
    },
    'upload-done': function(imageUrl) {
      this.userInfo.head = imageUrl;
    },
    'data-refresh': function() {
      this.search = '';
      this.getData(true);
    },
    'search-param': function(searchParam) {
      searchParams = searchParam;
      this.query(searchParams,'advanced_search',true)
    },
    'tip-time': function(tipInfo) {
      this.tip(tipInfo);
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
.close-map {
    width: 20px;
    height: 20px;
    @include pos(top,20px,right,20px);
    background-color: rgba(0,0,0,0.5);
    z-indx:100;
}
</style>
