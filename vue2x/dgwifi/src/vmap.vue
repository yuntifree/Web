<template>
  <div id="mapp" class="mapp">
    <div id="map" class="map"  style="width:100%;height:100%"></div>
    <span class="origin" @click="mapShow"><img src="../static/navigation.png"></span>
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
//var first = true;
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
    weixin.init(this.wxReady);
    
    /*next();
    var first = true;
    var mySet = new Set();
    function next() {
      var param = {
        longitude: 113.90387023396529,
        latitude: 22.93310386339828,
        uid:uid,
        token:token
      }
      var timer = setInterval(()=>{
        CGI.post('get_nearby_aps',param,(resp)=>{
          if (resp.errno===0) {
            _this.apAddress = resp.data.infos;
            var len = _this.apAddress.length;
            if (first) {
              addlonglat();
            } else {
              console.log(len);
              for (var i = 0; i < len; i++) {
                  var a = _this.apAddress[i].longitude+','+_this.apAddress[i].latitude;
                  if (!mySet.has(a)) {
                    _this.apAddress[i].addset = a;
                    mySet.add(_this.apAddress[i]);
                  }
                }
                clearInterval(timer);   
              }
            }
          first = false; 
          }) 
      },1000) 
      function addlonglat() {
        var len = _this.apAddress.length;
        for (var i=0;i<len;i++) {
          _this.apAddress[i].addset = _this.apAddress[i].longitude+','+_this.apAddress[i].latitude;
          mySet.add(_this.apAddress[i]);
        }
      }  
    }*/
  },
  methods: {
    mapShow() {
     var _this = this;
     var first = true;
     var mySet = new Set(_this.apAddress);
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
      getApAddress(_this.longitude,_this.latitude);
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
            //var allOverlay = map.getOverlays();
            /*if (!first && allOverlay.length>0) {
                for(var j=0;j<allOverlay.length;j++) {
                    map.removeOverlay(allOverlay[j]);
                }
            }*/
            if (first) {
              addlonglat();
            } else {
              for (var i = 0; i < len; i++) {
                var ads =_this.apAddress[i] 
                var a = ads.longitude+','+ads.latitude;
                if (!mySet.has(a)) {
                  _this.apAddress[i].addset = a;
                  mySet.add(ads);
                  addMarker(ads.longitude,ads.latitude,i)
                }
              }
              first = false;
            }
          }
        })
      }
     //获取覆盖物位置
     function attribute(e){
        var p = e.target;
        _this.tipBox('位置:'+_this.apAddress[p.selIdx].address);
      };

      function addlonglat() {
        var len = _this.apAddress.length;
        for (var i=0;i<len;i++) {
          _this.apAddress.addset = _this.apAddress[i].longitude+','+_this.apAddress[i].latitude;
          mySet.add(_this.apAddress[i]);
          addMarker(_this.apAddress[i].longitude,_this.apAddress[i].latitude,i);
        }
      };

      function addMarker(lng,lat,idx) {
        //alert(lng+','+lat+','+idx);
        var spot = new BMap.Point(lng, lat);
        var myIcon2 = new BMap.Icon("./static/market.png", new BMap.Size(60,60));
        var marker2 = new BMap.Marker(spot,{icon:myIcon2});
        map.addOverlay(marker2);
        marker2.addEventListener("click",attribute);
        marker2.selIdx = idx;
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
.origin img{
  width: 100%;
}
</style>
