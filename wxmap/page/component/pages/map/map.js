var util = require('../../../../util/util.js');
var formatLocation = util.formatLocation;
var url = 'https://wx.yunxingzh.com/'
var uid =  0;
var token = '';
var wWidth, wHeight,d;
var dis = [];
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
Page({
  data: {
    /*latitude: 22.93310386339828,
    longitude: 113.90387023396529,*/
    latitude: 0.0,
    longitude: 0.0,
    first: false,
    pflag: false,
    noflag: true,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../../../image/navigation.png',
      position: {
        left: 0,
        top: 10,
        width: 36,
        height: 36
      },
      clickable: true
    },{
      id: 2,
      iconPath: '../../../../image/navigation.png',
      position: {
        top: 0,
        bottom: 0,
        width: 36,
        height: 36
      },
      clickable: true
    }],
    markerShow: false,
    tipinfo: {
      address: '',
      dist: ''
    },
    makeflag: false,
    imageStyleData: {},
    apinfo: {},
    rawData: '',
    signature: '',
    encryptedData: '',
    iv: '',
    sid: '',
    nearest: true,
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  onLoad() {
    var that = this;
    that.getLocation();
    wx.getSystemInfo({
      success: function(res) {
        wWidth = res.windowWidth;
        wHeight = res.windowHeight;
      }
    })
    this.setData({
      controls: [{
        id: 1,
        iconPath: '../../../../image/navigation.png',
        position: {
          left: wWidth - 60,
          top: 10,
          width: 36,
          height: 36
        },
        clickable: true
      },{
        id: 2,
        iconPath: '../../../../image/img_guide.png',
        position: {
          top: wHeight - (122*(wWidth / 750)),
          left: 0,
          width: wWidth,
          height: 122*(wWidth /750)
        },
        clickable: false
      }],
    })
    //dp
    var winWidth = null, dp = 1;
    try {var winWidth = wx.getSystemInfoSync().windowWidth;
    } catch (e) { };
    if(winWidth){
      dp = winWidth/750;
    }
    this.dp = dp;

  },
  checkLogin() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://wx.yunxingzh.com/submit_xcx_code',
            method: 'POST',
            data: {
              data: {
                code:res.code 
              }
            },
            success: function(res) {
              var resp = res.data;
              if (resp.errno ===0) {
                if (resp.data.flag) {
                  var resp = res.data;
                  uid = resp.data.uid;
                  token = resp.data.token;
                  //定位
                  //that.getLocation();
                  var lat = that.gcj02tobd09(that.data.longitude,that.data.latitude);
                  that.getAps(lat[1],lat[0]);
                } else {
                  that.setData({
                    sid: resp.data.sid
                  })
                  that.getUser();
                }
              } else {
                console.log(resp.desc);
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUser: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        that.wxReset();
      }
    })
  },
  wxReset: function() {
    var that = this;
    var param ={
      sid: that.data.sid,
      rawData: that.data.rawData,
      signature: that.data.signature,
      encryptedData: that.data.encryptedData,
      iv: that.data.iv
    }
    wx.request({
      url: 'https://wx.yunxingzh.com/xcx_login', 
      method: 'POST',
      data: {
         data: param
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        uid = resp.data.uid;
        token = rep.data.token;
        var lat = that.gcj02tobd09(that.data.longitude,that.data.latitude);
        that.getAps(lat[1],lat[0]);
      }
    })
  },
  getAps(lat,lon) {
    var that = this;
    var param = {
      uid: uid,
      token: token,
      term: 3
    }
    wx.request({
      url: url + 'get_all_aps',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errno === 0) {
          var resp = res.data;
          var infos = resp.data.infos;
          if (infos.length > 0) {
            var latlon = [];
            infos.splice(0,1);
            infos.forEach(function(item, index) {
              latlon = that.bd09togcj02(item.longitude, item.latitude);
              item.longitude = latlon[0];
              item.latitude = latlon[1];
            })
            var idx = that.getDistance(infos);
            var idxInfo = infos.splice(idx,1);
            infos = infos.concat(idxInfo); 
            var len = infos.length-1;

            if (that.data.nearest) {
              infos.forEach(function(item, i) {
                if (i !== len) {
                  infos[i].width = 40;
                  infos[i].height = 40;
                  infos[i].iconPath = '../../../../image/ico_wifi.png'
                } else {
                  infos[i].width = 80;
                  infos[i].height = 80;
                  infos[i].iconPath = '../../../../image/img_nearest.png'
                  that.setData({
                    nearest: false
                  })
                }
              })
            }           
            that.setData({
              markers: infos
            })
          }
        } else {
          console.log(res.data.desc);
        }
      },
      fail: function(res) {
        wx.showToast({
          title: JSON.stringify(res),
          icon: 'fail',
          duration: 2000
        })
      },
    })
  },
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.checkLogin();
      },
    })
  },
  openLocation(e) {
    var that = this;
    var markerId = e.markerId;
    var mark = this.data.markers;
    for (var i=0; i<mark.length; i++) {
      if (mark[i].id == markerId) {
        this.setData({
          apinfo: mark[i]
        })
      }
    }
    wx.openLocation({
      longitude: Number(this.data.apinfo.longitude),
      latitude: Number(this.data.apinfo.latitude),
      name: '无线东莞DG-FREE',
      address: this.data.apinfo.address
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  imageLoad(e){
    var id = e.currentTarget.dataset.src,
      img_w = e.detail.width,
      img_h = e.detail.height,
      ratio = (750)/img_w;

    if((img_w/this.dp)>=(750)){
      var imageStyle = 'width: '+(750)+'rpx; height:'+ img_h*ratio +'rpx;';
    }else{
      var imageStyle = 'width: '+img_w+'px; height:'+ img_h +'px;';
    }
    var imageStyleData = this.data.imageStyleData;
    imageStyleData[id] = imageStyle;
    this.setData({
      imageStyleData: imageStyleData
    });
  },
  regionchange(e) {
    if(e.type == 'end'){
      //this.getLngLat()
    }
  },
  onMarkertap(e) {
    console.log(2)
  },
  controltap(e) {
    this.mapCtx.moveToLocation()
  },
  onBindtap() {
  },
  /*getLngLat: function(){
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res){
        var lat = that.gcj02tobd09(res.longitude,res.latitude);
        that.getAps(lat[1],lat[0]);
      },
      fail: function(res) {
        wx.showToast({
          title: JSON.stringify(res),
          icon: 'fail',
          duration: 1500
        })
      }
    })
  },*/
  Rad(d){
     return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
  },
  //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance(list){ 
    dis = [];
    var lat1 = this.data.latitude;
    var lng1 = this.data.longitude;
    var radLat1 = this.Rad(lat1);
    for (var i=0; i<list.length; i++) {
      var radLat2 = this.Rad(list[i].latitude);
      var a = radLat1 - radLat2;
      var  b = this.Rad(lng1) - this.Rad(list[i].longitude);
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
      s = s *6378.137 ;// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000; //输出为公里
      dis.push(s);
    }
    var j = 0;
    var min = 1000;
    dis.forEach(function(item, index) {
      if (item < min) {
        j = index;
        min = item;
      }
    })
    console.log(min);
    return j;
  },
  bd09togcj02(bd_lon, bd_lat) {
      var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      var x = bd_lon - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);
      return [gg_lng, gg_lat]
  },
  /**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
   * 即谷歌、高德 转 百度
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  gcj02tobd09(lng, lat) {
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return [bd_lng, bd_lat]
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '东莞无限，您身边的安全免费WiFi',
      path: 'page/component/pages/map/map'
    }
  }
})