<template>
  <div id="mapp" class="mapp">
    <div id="map" class="map"  style="width:100%;height:100%"></div>
    <tip :tipinfo="maptips" @tip-show="maptips.show=false"></tip>
  </div>
</template>

<script>
import CGI from './lib/cgi.js'
import tip from './components/lib/tip.vue'
import weixin from './lib/wx.js'
import gps from './common/gpstransform.js'

var query = CGI.query();
var uid = ~~(query.uid) || 1;
var token = query.token || '7329cf254871429d803c5826c8d9db1d';
var union = query.union || '';
var first = true;
export default {
  data() {
    return {
      maptips: {
        show: false,
        msg: '123',
        tooltip: true,
        duration: 2500,
      },
      latitude:0.0,
      longitude:0.0
    }
  },
  components: {
    tip
  },
  mounted() {
    var _this = this;
    // 存下union
    if (union.length > 0) {
      CGI.setCookie('UNION', union, 7);
    }
    /*_this.latitude = parseFloat(31.283814);
     _this.longitude = parseFloat(121.502191);
    var _location = gps.trans2BD(_this.latitude, _this.longitude);
    console.log(_location);*/
    weixin.init(this.wxReady);
  },
  methods: {
    mapShow() {
     var _this = this;
      var map = new BMap.Map('map');
      alert('map:'+_this.longitude+','+_this.latitude);
      _this.longitude = 113.90387023396529;
      _this.latitude = 22.93310386339828;
      var point = new BMap.Point(_this.longitude, _this.latitude);
      //标注
      map.centerAndZoom(point,15);
      var pt = new BMap.Point(_this.longitude, _this.latitude);
      var myIcon = new BMap.Icon("./static/target.png", new BMap.Size(60,60));
      var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
      map.addOverlay(marker)
      //控件
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.OverviewMapControl());
      getApAddress(_this.longitude,_this.latitudei);
      //事件
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
          uid:uid,
          token:token
        }
        CGI.post('get_nearby_aps',param,(resp)=>{
          if (resp.errno===0) {
            _this.apAddress = new Set(resp.data.infos);
            alert(_this.apAddress);
            var len = _this.apAddress.length;
            var allOverlay = map.getOverlays();
            if (!first && allOverlay.length>0) {
                for(var j=0;j<allOverlay.length;j++) {
                    map.removeOverlay(allOverlay[j]);
                }
            }
            for (var i = 0; i < len; i ++) {
                var spot = new BMap.Point(_this.apAddress[i].longitude, _this.apAddress[i].latitude);
                var myIcon2 = new BMap.Icon("./static/navigation.png", new BMap.Size(60,60));
                var marker2 = new BMap.Marker(spot,{icon:myIcon2});
                map.addOverlay(marker2);
                marker.addEventListener("click",attribute)
                marker.selIdx = i;
            }
            first = false;
          }
        })
      }
     //获取覆盖物位置
     function attribute(e){
        var p = e.target;
        console.log('click');
        _this.tipBox('位置:'+_this.apAddress[p.selIdx].address);
      }
    },
    tipBox(val) {
      this.maptips.msg = val;
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
             _this.mapShow();
          })
        },
        cancel: function (res) {
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
}
</style>
