//index.js
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;

var QR = require("../../utils/wxqrcode.js");
//获取应用实例
var app = getApp()
var tuid,uid,token,URL,qrUrl;
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
    drinfo: {}
  },
  //事件处理函数

  onLoad: function () {
    uid = app.globalData.uid;
    tuid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    qrUrl = 'http://api.yunxingzh.com/wxdoctor?tuid=' + app.globalData.uid;
    wx.showLoading({
      title: '加载中...',
      complete: function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 3000)
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '推荐给你一款好用的健康小程序',
      path: '/pages/index/index?tuid='+uid
    }
  },
  onShow: function() {
    this.getData(0)
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
          /*if (data.infos && data.infos.length > 0) {
            app.globalData.hasrelation = 1
            _this.setData({
              ptInfo: true,
              mounted: true
            })
            _this.data.info = data.infos
            _this.makeTime();
            _this.setData({
              info: _this.data.info,
              hasmore: data.hasmore ? data.hasmore : 0
            })
          } else {*/
            app.globalData.hasrelation = 0;
            _this.getDrinfo();
            var data = QR.createQrCodeImg(qrUrl,{'size':300});
            _this.setData({
              codeImg: data,
              mounted: true
            })
          /*}*/
        } else if (resp.errno == 101) {
          _this.tip(resp.desc);
          _this.setData({
            mounted: false
          })
          //app.goIndex();
        }else {
          _this.tip(res.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      },
      complete:function() {
        wx.hideLoading()
      }
    })
  },
  getDrinfo: function() {
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
            drinfo: resp.data
          })
        } else {
          _this.tip(reso.desc);
        }
      },
      fail: function(res) {
        _this.tip(textFail);
      }
    })
  },
  makeTime: function() {
    var len = this.data.info.length;
    var text1,text2;
    var today = dateFormat(new Date(), 'yyyy/MM/dd');
    this.data.info.forEach(function(item) {
      if (item.ctime) {
        item.ctime = item.ctime.replace(/-/g,'/')
        var day = dateFormat(item.ctime, 'yyyy/MM/dd')
        if (day == today) {
          item.ctime = dateFormat(item.ctime, 'hh:mm')
        } else {
          item.ctime = dateFormat(item.ctime, 'yyyy-MM-dd')
        }
      }
    })
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
