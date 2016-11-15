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
      var point = new BMap.Point(_this.longitude, _this.latitude);
      //标注
      map.centerAndZoom(point,15);
      var myIcon = new BMap.Icon("./assets/images/marker.png", new BMap.Size(14,22));
      var marker = new BMap.Marker(point,{icon:myIcon});        // 创建标注
      map.addOverlay(marker);
      //控件
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.OverviewMapControl());

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
            _this.apAddress = resp.data.infos;
            var len = _this.apAddress.length;
            var allOverlay = map.getOverlays();
            if (allOverlay.length>0) {
                for(var j=0;j<allOverlay.length;j++) {
                    map.removeOverlay(allOverlay[j]);
                }
            }
            for (var i = 0; i < len; i ++) {
                var spot = new BMap.Point(_this.apAddress[i].longitude, _this.apAddress[i].latitude);
                var marker = new BMap.Marker(spot);
                map.addOverlay(marker);
                marker.addEventListener("click",attribute)
                marker.selIdx = i;
            }
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
