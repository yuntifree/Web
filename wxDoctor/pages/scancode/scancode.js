//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
  },
  getcode: function() {
    wx.scanCode({
      success: (res) => {
        //app.globalData.tuid = res.tuid;
        app.globalData.tuid = 1
        wx.navigateTo({
          url: '../binddr/binddr'
        })
      }
    })
  }
})
