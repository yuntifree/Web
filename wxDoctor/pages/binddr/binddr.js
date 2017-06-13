//index.js
//获取应用实例
var app = getApp();
var tuid = app.globalData.tuid
var uid = app.globalData.uid
var token = app.globalData.token
var URL = app.globalData.reqUrl
var hasrelation = app.globalData.hasrelation

Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    cirShow: false,
  },
  //事件处理函数
  onLoad: function () {
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: tuid
    }
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
          _this.tip(resp.desc);
        }
      }
    })
  },
  bindDr: function() {
    var _this = this;
    this.setData({
      cirShow: true
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
        if (resp.errno ===0) {
          if (hasrelation) {
            wx.navigateTo({
              url: '../patientinfo/patientinfo'
            })
          } else {
            wx.navigateTo({
              url: '../writepatient/writepatient'
            })
          }
        } else {
          console.log(resp.desc);
        }
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
