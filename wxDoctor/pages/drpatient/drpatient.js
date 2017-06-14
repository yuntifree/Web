//index.js
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;

var QR = require("../../utils/qrcode.js");

//获取应用实例
var app = getApp()
var tuid,uid,token,URL,hasrelation;
Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    ptInfo: false
  },
  //事件处理函数

  onLoad: function () {
    uid = app.globalData.tuid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    hasrelation = app.globalData.hasrelation;
    if (hasrelation) {
      this.setData({
        ptInfo: true
      })
      this.getData(0)
    } else {
      var size = this.setCanvasSize();//动态设置画布大小
      var initUrl = 'tuid='+uid;
      this.createQrCode(initUrl,"mycanvas",size.w,size.h);
    }
  },
  getData(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      seq: seq,
      num: 20
    }
    wx.request({
      url: URL + 'get_chat_session',
      method: 'POST',
      data: {
        data: param
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          var data = resp.data;
          if (data.infos && data.infos.length >0) {
            _this.setData({
              info: data.infos
            })
            _this.makeTime();
          }
        } else {

        }
      }
    })
  },
  makeTime: function() {
    var len = this.data.info.length;
    var text1,text2;
    var date = new Date(dateFormat(new Date(), 'yyyy-MM-dd')).getTime();
    for(var i=0;i <len;i++) {
      if (this.data.info[i].ctime) {
        var ctime = "info["+i+"].ctime"
        var nowDate = new Date(dateFormat(this.data.info[i].ctime,'yyyy-MM-dd')).getTime();
        if (date === nowDate) {
          this.setData({
            [ctime]: dateFormat(this.data.info[i].ctime,'hh:mm')
          })
        } else {
          this.setData({
            [ctime]: dateFormat(this.data.info[i].ctime,'yyyy-MM-dd')
          })
        }
      }
    }
  },
  goDrchat(e) {
    wx.navigateTo({
      url: '../drchat/drchat'
    })
  },
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/400;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("********"+tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          wx.previewImage({
            current: tempFilePath, // 当前显示图片的http链接
            urls: [tempFilePath] // 需要预览的图片http链接列表
          })
          //console.log(this.data.imagePath);
      },
      fail: function (res) {
          console.log(res);
      }
    });    
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
