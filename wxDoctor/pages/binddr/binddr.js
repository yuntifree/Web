//index.js
//获取应用实例
var app = getApp();
var tuid,uid,token,URL
var failText = app.globalData.failText;
var qr = 0;
Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    cirShow: false,
    btnBg: '#1ed2af'
  },
  //事件处理函数
  onLoad: function (option) {
    //页面五层处理
    if (option.qr) {
      qr = ~~option.qr
    }
    console.log(JSON.stringify(app.globalData))
    tuid = app.globalData.tuid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: tuid
    }
    console.log('binddr tuid='+tuid)
    console.log(JSON.stringify(param))
    wx.request({
      url: URL +'get_doctor_info',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          _this.setData({
            info: resp.data
          })
        } else {
          _this.tip('二维码错误，请扫描正确的二维码');
          // setTimeout(function(){
          //   wx.navigateBack({})
          // },1500)
        }
      },
      fail: function(res) {
        _this.tip(textFail);
      }
    })
  },
  changeColor: function() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  bindDr: function() {
    var _this = this;
    this.setData({
      cirShow: true,
      btnBg: '#1ed2af'
    })
    var param = {
      type: 0,
      tuid: tuid,
      token: token,
      uid: uid
    }
    wx.request({
      url: URL + 'bind_op',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno ==0) {
          _this.setData({
            cirShow: false
          })
          wx.reLaunch({
            url: '/pages/binddrlist/list'
          })
        } else {
          console.log(resp.desc);
        }
      },
      fail: function() {
        _this.tip(textFail);
      }
    })
  },
  tip: function(val) {
    this.setData({
      tipMsg: val,
      tipShow: true
    })
    var _this = this;
    setTimeout(function() {
      _this.setData({
        tipMsg: '',
        tipShow: false
      })
    },1500)
  }
})
