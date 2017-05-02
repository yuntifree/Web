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
.chart {
  width: 600px;
  height: 400px;
  background-color: #fff;
  margin-top: 5px;
}
</style>
<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <header class="app_header">
        <div>
          <button class="btn btn-default btn-ssm" @click="getData(0)">刷新</button>
        </div>
      </header>
      <div class="tab_container" ref="tableContent">
        <div class="chart" ref="chart"></div>
      </div>
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
var chartInst;
var chartOption = {
    title : {
        text: '接口统计信息',
        x: 'center',
        align: 'right'
    },
    grid: {
        bottom: 80
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            animation: false,
            label: {
                backgroundColor: '#505765'
            }
        }
    },
    legend: {
        data:['','',''],
        x: 'left'
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 65,
            end: 85
        },
        {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
        }
    ],
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: false},
            data : []/*.map(function (str) {
                return str.replace(' ', '\n')
            })*/
        }
    ],
    yAxis: [
        {
            name: '单位：次',
            type: 'value'
        },
    ],
    series: [
        {
          name:'点击请求次数',
          type:'line',
          animation: false,
          lineStyle: {
              normal: {
                  width: 1
              }
          },
          markArea: {
              silent: true,
              data: [[{
                  xAxis: '2009/9/12\n7:00'
              }, {
                  xAxis: '2009/9/22\n7:00'
              }]]
          },
          data:[]
        },
        {
          name:'成功返回次数',
          type:'line',
          yAxisIndex:1,
          animation: false,
          lineStyle: {
              normal: {
                  width: 1
              }
          },
          markArea: {
              silent: true,
              data: [[{
                  xAxis: '2009/9/10\n7:00'
              }, {
                  xAxis: '2009/9/20\n7:00'
              }]]
          },
          data: []
        },
        {
          name:'失败次数',
          type:'line',
          yAxisIndex:1,
          animation: false,
          lineStyle: {
              normal: {
                  width: 1
              }
          },
          markArea: {
              silent: true,
              data: [[{
                  xAxis: '2009/9/10\n7:00'
              }, {
                  xAxis: '2009/9/20\n7:00'
              }]]
          },
          data: []
        }
    ]
};

export default {
  data() {
    return {
      dataReady: true,
      infos: [],
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
      selId: -1,
      selected: {
        name: 'get_check_code'
      },
      tagsInfo: [],
      checkedTags: [],
      postInfo: {
        dir: '',
        description: ''
      },
      dateInfo: {
        date1: '',
        date2: ''
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
    CGI.loadScript('https://cdn.bootcss.com/echarts/3.5.4/echarts.common.min.js', 'chartjs', ()=>{
      chartInst = echarts.init(this.$refs.tableContent);
      //chartInst.setOption(chartOption);
    })
    this.getData(true, 'get_check_code');
    this.getData(true, 'portal_login');
    this.getData(true, 'one_click_login');
  },
  methods: {
    getData(reload,name) {
      if (reload) {
        this.pageCfg.currentPage = 1;
        this.pageCfg.start = 0;
      }
      var param = {
        seq: this.pageCfg.start,
        num: 30,
        name: name
      }

      CGI.post(this.$store.state, 'get_api_stat', param, (resp) => {
        if (resp.errno === 0) {
          var data = resp.data;
          switch (name) {
            case 'get_check_code': 
              this.portalLogin = data.infos;
              data.infos.forEach(function(item){
                chartOption.xAxis[0].data.push(item.ctime);
                chartOption.series[0].data.push(item.req);
                chartOption.series[1].data.push(item.succrsp);
                chartOption.series[2].data.push(item.req-item.succrsp);
              })
              break;
            case 'portal_login':
              this.portalLogin = data.infos;
              data.infos.forEach(function(item){
                /*chartOption.xAxis.data.push(item.ctime);
                chartOption.series[0].data.push(item.req);
                chartOption.series[1].data.push(item.succrsp);
                chartOption.series[2].data.push(item.req-item.succrsp);*/
              })
              //chartOption.series[1].data = data.infos;
              break;
            case 'one_click_login':
              this.portalLogin = data.infos;
              data.infos.forEach(function(item){
                /*chartOption.xAxis.data.push(item.ctime);
                chartOption.series[0].data.push(item.req);
                chartOption.series[1].data.push(item.succrsp);
                chartOption.series[2].data.push(item.req-item.succrsp);*/
              })
              break;
          }
          //chartInst.setOption(chartOption);
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
      this.getData();
      console.log('当前页: ${val}');
    },
    alertInfo(val) {
      this.alertShow = true;
      this.alertMsg = val; 
    }
  }
}
</script>
