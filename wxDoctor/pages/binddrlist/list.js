//index.js
//获取应用实例
var app = getApp()
var uid = app.globalData.uid
var token = app.globalData.token
var URL = app.globalData.reqUrl

Page({
  data: {
    inquiry: false,
    userInfo: {},
    scrollTop: 100
  },
  //事件处理函数
  onLoad: function () {
    
  },
  getData: function() {
    var param = {
      uid: uid,
      token: token
    }
    wx.request({
      url: URL + 'get_my_doctors',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      }
    })
  },
  upper: function(e) {
    //console.log(e)
  },
  lower: function(e) {
    //console.log(e)
  },
  scroll: function(e) {
    //console.log(e)
  }
})
