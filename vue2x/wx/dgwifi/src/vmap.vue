<template>
  <div id="mapp" class="mapp">
    <template v-if="loadMap">
      <div id="map" class="map"  style="width:100%;height:100%"></div>
      <span class="origin"  @click="goOrigin"><img src="../static/navigation.png"></span>
    </template>
    <template v-else>
        <div class="map-search">
          <img src="../static/search.png">
        </div>
        <p class="g-tac search-location">
          <span class="searching">正在定位...</span><br/>
          <span>一大波免费wifi正汹涌而来</span>
        </p>
    </template>
    <maptip :tipinfo="maptips" @tip-show="maptips.show=false"></maptip>
  </div>
</template>

<script>
import CGI from './lib/cgi.js'
import maptip from './components/lib/tooltip.vue'
import weixin from './lib/wx.js'
import gps from './common/gpstransform.js'
var query = CGI.query();
var uid = 137;
var token = '6ba9ac5a422d4473b337d57376dd3488';
var union = query.union || '';
var map;
var point;
export default {
  data() {
    return {
      maptips: {
        show: false,
        msg: '',
        distance: 0.0,
        duration: 2500,
      },
      latitude:0.0,
      longitude:0.0,
      loadMap: false,
      apAddress: [],
    }
  },
  components: {
    maptip
  },
  created() {
    weixin.init(this.wxReady);
  },
  mounted() {
    // 存下union
    // if (union.length > 0) {
    //   CGI.setCookie('UNION', union, 7);
    // }
  },
  methods: {
    mapShow() {
      var _this = this;
      var apSet = new Set();

      map = new BMap.Map('map');
      // debug
      //_this.longitude = 113.90387023396529;
      //_this.latitude = 22.93310386339828;
      point = new BMap.Point(_this.longitude, _this.latitude);
      //标注
      map.centerAndZoom(point,15);
      var myIcon = new BMap.Icon("./static/target.png", new BMap.Size(60,60));
      var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
      map.addOverlay(marker)
      //控件
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.OverviewMapControl());

      getApAddress(_this.longitude, _this.latitude);

      //事件
      /*map.addEventListener("dragend", function(){
        var bs = map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左上角
        var bsne = bs.getNorthEast();   //可视区域右上角
        var lng = (bssw.lng+bsne.lng)/2;
        var lat = (bssw.lat+bsne.lat)/2;
        //getApAddress(lng,lat);
      });*/

      function  getApAddress(){
         var param = {
          uid:uid,
          token:token
        }
        CGI.post('get_all_aps',param,(resp)=>{
          if (resp.errno === 0) {
            addlonglat(resp.data.infos);
          }
        })
      }
      //获取覆盖物位置
      function attribute(e){
        var p = e.target;
        var adsL = _this.apAddress[p.selIdx];
        var pointB = new BMap.Point(adsL.longitude,adsL.latitude);
        var distance  = map.getDistance(point, pointB).toFixed(2);
        _this.tipBox('位置:'+adsL.address,distance);
      };

      function addlonglat(infos) {
        var key;
        infos.forEach((item)=>{
          key = item.longitude + ',' + item.latitude;
          if (!apSet.has(key)) {
            apSet.add(key);
            _this.apAddress.push(item);
            addMarker(item.longitude, item.latitude, _this.apAddress.length - 1);
          }
        })
      };

      function addMarker(lng,lat,idx) {
        //alert(lng+','+lat+','+idx);
        var spot = new BMap.Point(lng, lat);
        var myIcon2 = new BMap.Icon("./static/marker.png", new BMap.Size(60,60));
        var marker2 = new BMap.Marker(spot,{icon:myIcon2});
        map.addOverlay(marker2);
        marker2.addEventListener("click",attribute);
        marker2.selIdx = idx;
      }
    },
    goOrigin() {
      map.centerAndZoom(point,15);
    },
    tipBox(val,dist) {
      this.maptips.msg = val;
      this.maptips.distance = dist;
      this.maptips.show = true;
    },
    wxReady() {
        var _this = this;
        wx && wx.getLocation({
        success: function (res) {
          _this.latitude = parseFloat(res.latitude);
          _this.longitude = parseFloat(res.longitude);
          var _location = gps.trans2BD(_this.latitude, _this.longitude);
          _this.latitude = _location[0];
          _this.longitude = _location[1];
          CGI.loadScript('http://api.map.baidu.com/getscript?v=2.0&ak=BiR1G4yZybhnXDTDHLYq8WXMPaK7owWm','map.js',()=>{
            _this.loadMap = true;
            _this.$nextTick(()=>{
               _this.mapShow();       
            })
          })
        },
        cancel: function (res) {
          alert('定位失败~');
        }
      });
    },
  }
}
</script>

<style lang="scss" scope>
  @import './assets/css/reset.css';
html,
body,
.mapp {
    width: 100%;
    height:100%;
    position: relative;
}
.origin {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  display: block;
  width: 0.72rem;
  height: 0.72rem;
  z-index: 200;
}
.map-search {
  width: 1.36rem;
  height: 1.36rem;
  position: absolute;
  top:35%;
  left: 50%;
  margin-left:-0.68rem;
}
.origin img,
.map-search img{
  width: 100%;
}
.search-location {
  font-size: 0.24rem;
  color: #828282;
  line-height: 200%;
  position: absolute;
  left: 50%;
  bottom: 17%;
  transform: translateX(-50%);
}
.searching {
  position: relative;
  padding-left: 0.48rem;
}
.searching:before {
  display: block;
  content: ' ';
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: -0.1rem;;
  left:0;
  background: url('./assets/images/location.png');
  background-size: contain;
}
</style>
