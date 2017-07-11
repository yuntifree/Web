//index.js
//获取应用实例
var app = getApp()
var failText = app.globalData.failText;
Page({
  data: {
    tipMsg: '',
    tipShow: false,
    btnBg: '#1ed2af',
    helpBg: '#fff',
  },
  onLoad: function () {
  },
  changeColor() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  getcode: function() {
    var _this = this;
    this.setData({
      btnBg: '#1ed2af'
    })
    wx.scanCode({
      success: function(res) {
        var resp = res.result;
        var resTuid = resp.substr(resp.indexOf('?') + 1,5)
        if (resTuid == 'tuid=') {
          var idx = resp.indexOf('=') +1;
          resp = ~~(resp.substring(idx));
          app.globalData.tuid = resp;
          wx.navigateTo({
            url: '/pages/binddr/binddr'
          })
        } else {
          _this.tip('二维码错误，请扫描正确的医生二维码')
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  helpColor: function() {
    this.setData({
      helpBg: '#f0f0f0'
    })
  },
  getHelp: function() {
    var _this = this;
    this.setData({
      helpBg: '#fff'
    })
    wx.navigateTo({
      url: '/pages/rules/rules'
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
