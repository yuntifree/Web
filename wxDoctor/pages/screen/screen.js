//index.js
//获取应用实例
var md5 = require('../../utils/md5.js');
var app = getApp();
var uid,token,URL;
var failText = app.globalData.failText;
Page({
  data: {
    tipMsg: '',
    tipShow: false,
    imgurl: '',
    height: '',
  },
  //事件处理函数
  onLoad: function (option) {
    //页面五层处理
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    var dr = option.dr;
    var imgurl = '';
    var height = '';
    if (~~dr) {
      imgurl = 'http://img.yunxingzh.com/b39daaec-e2d6-4706-8e96-c6ebecb1881b.png'
      height = '5535rpx'
    } else {
      imgurl = 'http://img.yunxingzh.com/08b93d70-4501-4b76-ada0-f4259dd28835.png'
      height = '8564rpx'
    }
    this.setData({
      height: height,
      imgurl: imgurl
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
