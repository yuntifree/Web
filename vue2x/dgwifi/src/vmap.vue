<template>
  <div id="mapp">
    <div id="map" class="map"  style="width:100%;height:100%"></div>
    <tooltip :tipinfo="tips" @tip-show="tips.show=false"></tooltip>
  </div>
</template>

<script>
import CGI from './lib/cgi.js'
import tooltip from './components/lib/tooltip.vue'

export default {
  data() {
    return {
      tips: {
        show: false,
        msg: '123',
        top: '0px',
        left: '0px',
      }
    }
  },
  components: {
    tooltip
  },
  mounted() {
    var _this = this;
    this.$nextTick(function () {
      CGI.loadScript('http://api.map.baidu.com/getscript?v=2.0&ak=BiR1G4yZybhnXDTDHLYq8WXMPaK7owWm','map.js',()=>{
        _this.mapShow();
      }) 
    })
  },
  methods: {
    mapShow() { 
     var _this = this;
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
        CGI.post(_this.$store.state,'get_nearby_aps',param,(resp)=>{
          if (resp.errno===0) {
            _this.apAddress = resp.data.infos;
            var len = _this.apAddress.length;
            for (var i = 0; i < len; i ++) {
                var spot = new BMap.Point(_this.apAddress[i].longitude, _this.apAddress[i].latitude);
                var marker = new BMap.Marker(spot);
                map.addOverlay(marker);
                console.log(_this.apAddress[i].longitude,_this.apAddress[i].latitude);
                marker.addEventListener("click",attribute)
                marker.selIdx = i;
            }
          }
        })
      }
     //获取覆盖物位置
     function attribute(e){
        var p = e.target;
        console.log(p);
        console.log(e.screenX+ ','+e.screenY);
        _this.maptips = {
          show: true,
          msg: '位置:'+_this.apAddress[p.selIdx].address,
          top: e.screenY-160,
          left: e.screenX-100,
        }
       // console.log("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
      }
    },
  }
}
</script>

<style lang="scss">
  @import './assets/css/reset.css';
</style>
