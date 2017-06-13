//index.js
//获取应用实例
var app = getApp()
var URL = 'https://wxdev.yunxingzh.com/inquiry/'
Page({
  data: {
    hasphone: false,
    sid: '',
    hasphone: 0,
    hasrelation: 0,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../scancode/scancode'
    })
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    /*app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })*/
  },
})
