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
      imgurl = '../../images/login/drhelp.png'
      height = '5535rpx'
    } else {
      imgurl = '../../images/login/pthelp.png'
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
