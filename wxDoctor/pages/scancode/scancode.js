//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tipMsg: '',
    tipShow: false,
  },
  onLoad: function () {
  },
  getcode: function() {
    var _this = this;
    wx.scanCode({
      success: function(res) {
        var resp = res.result;
        var resTuid = resp.substr(0,5);
        console.log(resTuid);
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
