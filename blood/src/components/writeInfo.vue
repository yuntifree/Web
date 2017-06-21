<style lang="scss" scoped>
@import '../assets/css/common.scss';
.write {
   @include containerSize(100%, auto);
   min-height: 100%;
   position: relative;
   background-color: #fff;
   padding-bottom: 0.4rem;
}
.write-img {
  @extend %blockAuto;
  @include containerSize(100%, auto);
}
.write-tit {
  @include pos(top,0.24rem,left,50%);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  color:#1e2c3d;
  font-size: 0.32rem;
  line-height: 150%;
  font-weight: 500;
}
.write-info {
  @extend %blockAuto;
  @include containerSize(84%, auto);
  margin-top: -0.4rem;
}
.reserver-blood-tit {
  @include marGin(top, 0.34rem);
}
.write-btype-info {
  position: relative;
  font-size: 0.32rem;
  @include marGin(top, 0.34rem);
  @include marGin(left, 0.26rem);
}
.write-btype-info:first-child {
  @include marGin(left, 0);
}
.ipt-radio {
  @include containerSize(0.32rem, 0.32rem);
  border: solid 1px #979797;
  border-radius: 50%;
  transform: translateY(2px);
}
.btype-checked {
  @include containerSize(0.4rem, auto);
  @include pos(top,0,left,0);
}
.cant-tip {
  color: #b4b4b4;
}
.writeinfo-btn{
  width: 100%;
  margin-top: 0.34rem;
}
.select-info {
  position: relative;
}
.select-img {
  @include containerSize(0.3rem, auto);
  @extend %blockAuto;
  @include pos(top,50%,right,0.14rem);
  transform: translateY(-50%);
}
.date-info {
  width: 48%;
  @include marGin(right,4%);
}
.date-info:last-child {
  @include marGin(right, 0);
}
.write-ipt {
    @include marGin(top,0);
}
.date-con,
.top24 {
  @include marGin(top,0.24rem);
}
.sel-ipt {
  height: 1rem;
}
</style>
<template>
  <div class="write">
    <img class="write-img" src="http://img.yunxingzh.com/6efd2ddd-961a-4ea8-ab91-a6a1e7fa332d.png">
    <p class="write-tit g-tac">填写预约信息<br/>并现场献血即有机会获赠<br/>价值680元健康枕</p>
    <div class="write-info">
      <h2 class="info-tit">献血人信息</h2>
      <input class="write-ipt top24 g-tac" type="text" v-model="subinfo.name" placeholder="请输入姓名">
      <input class="write-ipt top24 g-tac" type="text" v-model="subinfo.phone" placeholder="请输入电话号码">
      <h2 class="info-tit reserver-blood-tit">预约附近的血站</h2>
      <div class="select-info top24">
        <select class="write-ipt sel-ipt g-tac" v-model="subinfo.sid" @change="makeDate(idx)">
          <option disabled value="">请选择血站</option>
          <option v-for="(info,idx) in infos" :value="info.id">{{info.name}}</option>
        </select>
        <img class="select-img" src="http://img.yunxingzh.com/3305dedf-b47d-4ad2-993a-057617124170.png">
      </div>
      <div class="g-clearfix date-con">
        <div class="select-info date-info g-fl">
          <select class="write-ipt sel-ipt g-tac" v-model="subinfo.date">
            <option disabled value="">请选择日期</option>
            <option v-for="date in infoDate" :value="date">{{date}}</option>
          </select>
          <img class="select-img" src="http://img.yunxingzh.com/3305dedf-b47d-4ad2-993a-057617124170.png">
        </div>
        <div class="select-info date-info g-fl">
        <select class="write-ipt sel-ipt g-tac" v-model="subinfo.time">
          <option disabled value="">请选择时间</option>
          <option v-for="time in infoTimer" :value="time">{{time}}</option>
        </select>
        <img class="select-img" src="http://img.yunxingzh.com/3305dedf-b47d-4ad2-993a-057617124170.png">
      </div>
      </div>
      <ul class="write-btype g-clearfix">
        <li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="one" value="0" v-model="subinfo.btype">
          <label class="ipt-text" for="one">A型血</label>
          <img v-show="subinfo.btype==='0'" class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li>
        <!--li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="two" value="1" v-model="subinfo.btype" disabled="true">
          <label class="ipt-text" for="two">B型血</label>
          <img v-show="subinfo.btype==='1'" class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li>
        <li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="three" value="2" v-model="subinfo.btype" disabled="true">
          <label class="ipt-text" for="three">AB型血</label>
          <img v-show="subinfo.btype==='2'"class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li-->
        <li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="four" value="3" v-model="subinfo.btype">
          <label class="ipt-text" for="four">O型血</label>
          <img v-show="subinfo.btype==='3'" class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li>
      </ul>
      <p class="cant-tip">现东莞B型血及AB型血已饱和，暂不纳入本次活动</p>
      <h2 class="info-tit reserver-blood-tit">是否需要健康枕</h2>
       <ul class="write-btype g-clearfix">
        <li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="five" value="1" v-model="subinfo.pillow">
          <label class="ipt-text" for="five">是</label>
          <img v-show="subinfo.pillow==='1'" class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li>
        <li class="g-fl write-btype-info">
          <input class="ipt-radio" type="radio" id="six" value="0" v-model="subinfo.pillow">
          <label class="ipt-text" for="six">否</label>
          <img v-show="subinfo.pillow==='0'" class="btype-checked" src="http://img.yunxingzh.com/1688f03b-5f07-425d-bc3b-c916d09ffd63.png">
        </li>
      </ul>
      <button class="info-btn writeinfo-btn" @click="reserveSub">预约献血</button>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false">123</tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import CGI from '../lib/cgi'
export default {
  data () {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      subinfo: {
        name: '',
        phone: '',
        sid: '',
        date: '',
        time: '',
        btype: '0',
        pillow: '0'
      },
      infos: [],
      infoTimer: [],
      infoDate: [],
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.getInfo();
    //this.getDate();
  },
  methods: {
    getInfo() {
      CGI.post('get_stations',{},(resp)=> {
        if (resp.errno === 0) {
          this.infos = resp.data.infos;
        } else {
          this.alertInfo(resp.desc);
        }
      });
    },
    getDate() {
      var now = new Date();
      var starttime = new Date('2017/06/19');
      if (now.getTime() < starttime.getTime()) {
        now = starttime
      }
      var endTime = new Date('2017/06/25');
      var formatSt = CGI.dateFormat(now,'yyyy-MM-dd');
      var formatEnd = CGI.dateFormat(endTime,'yyyy-MM-dd');
      var dateLen = getTime(formatEnd,formatSt);
      function getTime(end, st)
      {
          var end = arguments[0], st = arguments[1];
          end = Date.parse(end)/1000;
          st = Date.parse(st)/1000;
          var time_ = end - st;
          return (time_/(3600*24));
      }
      if (now.getTime() < endTime.getTime()) {
        var i = 0;
        while (i <= dateLen) {
          this.infoDate.push(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate());
          now = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          i ++;
        }
      }
    },
    makeDate() {
      var len = this.infos.length;
      var idx = -1;
      this.infoTimer = [];
      this.infoDate = [];
      for (var i=0; i<len; i++) {
        if (this.infos[i].id === this.subinfo.sid) {
          idx = i;
          break;
        }
      }
      this.infoTimer = this.infos[idx].timeslots;
      this.infoDate = this.infos[idx].days;
      this.$store.state.ads = this.infos[idx].address;
      this.$store.state.phone = this.infos[idx].phone;
    },
    reserveSub() {
      if(this.makeParam()) {
        //var date = CGI.dateFormat(this.subinfo.date, 'yyyy年MM月dd日');
        var btype = ~~this.subinfo.btype;
        var pillow = ~~this.subinfo.pillow
        var param = {
          name: this.subinfo.name, //用户姓名
          phone: this.subinfo.phone + '', //用户手机号
          sid: this.subinfo.sid, //站点id
          date: this.subinfo.date + ' ' + this.subinfo.time, //预约献血时间
          btype: btype, //血型 0-A型 1-B型 2-AB型 3-O型
          pillow: pillow
        }
        CGI.post('submit_reserve_info', param, (resp)=>{
          if (resp.errno === 0) {
            this.$store.state.code = resp.data.code;
            this.$router.push({name: 'success'})
          } else {
            this.alertInfo(resp.desc);
          }
        })
      }
    },
    makeParam() {
      var ret = true;
      if (this.subinfo.name.length <= 0) {
        ret = false;
        this.alertInfo('请输入姓名');
      } 
      if (this.subinfo.phone.length <= 0) {
        ret = false;
        this.alertInfo('请输入电话号码');
      } else if (!CGI.checkTel(this.subinfo.phone)) {
        ret = false;
        this.alertInfo('请输入正确的电话号码');
      }
      if (!~~this.subinfo.sid) {
        ret = false;
        this.alertInfo('请选择血站');
      }
      if (this.subinfo.date.length <= 0) {
        ret = false;
        this.alertInfo('请选择献血日期');
      }
      if (this.subinfo.time.length <= 0) {
        ret = false;
        this.alertInfo('请选择献血时间');
      }
      if (this.subinfo.time.length <= 0) {
        ret = false;
        this.alertInfo('请选择献血时间');
      }
      return ret;
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>

