//index.js
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;

var QR = require("../../utils/wxqrcode.js");
//获取应用实例
var app = getApp()
var tuid,uid,token,URL,hasrelation;
var failText = app.globalData.failText;
Page({
  data: {
    info: [],
    tipMsg: '',
    tipShow: false,
    mounted: false,
    ptInfo: false,
    hasmore: 0,
    codeImg: '',
  },
  //事件处理函数

  onLoad: function () {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    //hasrelation = app.globalData.hasrelation;
    //this.getData(0)
    this.getDr();
  },
  onShow: function() {
    this.getData(0)
    this.getDr();
  },
  getData(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      seq: seq,
      num: 20
    }
    var initUrl = 'uid='+uid;
    var data = QR.createQrCodeImg(initUrl,{'size':300});
    _this.setData({
      codeImg: data
    })
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
          if (data.infos && data.infos.length > 0) {
            _this.setData({
              info: data.infos,
              hasmore: data.hasmore ? data.hasmore : 0
            })
            _this.setData({
              ptInfo: true,
              mounted: true
            })
            _this.makeTime();
          } else {
            var initUrl = 'uid='+uid;
            var data = QR.createQrCodeImg(initUrl,{'size':300});
            _this.setData({
              codeImg: data,
              mounted: true
            })
          }
        } else {
          _this.tip(res.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      }
    }) 
  },
  getDr() {
    var _this = this;
    var param = {
      tuid: uid,
      uid: uid,
      token: token
    }
    wx.request({
      url: URL +'get_doctor_info',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'applicatoin/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          app.globalData.drHead = resp.data.headurl;
          console.log(app.globalData.drHead);
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
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
    var idx = e.currentTarget.dataset.index;
    app.globalData.ptHead = this.data.info[idx].headurl;
    app.globalData.ptid = this.data.info[idx].uid;
    wx.navigateTo({
      url: '../drchat/drchat'
    })
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function(e) {
    this.setData({
      viewCode: true
    })
    //var result = base.decode(e.currentTarget.dataset.src); 
  },
  viewShow: function(e) {
    this.setData({
      viewCode: false
    })
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    if (this.data.hasmore) {
      var len = this.data.info.length-1;
      if (len >= 0) {
        var seq = this.data.info[len].seq;
        this.getData(seq);
      }
    }
  },
  scroll: function(e) {
    console.log(e)
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
