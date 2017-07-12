//index.js
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
//获取应用实例
var app = getApp()
var uid,token,URL,haspatient;
var failText = app.globalData.failText;
Page({
  data: {
    inquiry: false,
    userInfo: {},
    scrollTop: 100,
    info: [],
    tipShow: false,
    tipMsg: '',
    infoNull: false,
    hasmore: 0,
    selId: -1,
    btnBg: '#1ed2af'
  },
  //事件处理函数
  onLoad: function () {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    haspatient = app.globalData.haspatient;
  },
  onShow: function() {
    haspatient = app.globalData.haspatient;
    this.getData(0);
  },
  getData: function(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      seq: seq,
      num: 20
    }
    wx.request({
      url: URL + 'get_my_doctors',
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
          var data = resp.data;
          if (data.infos && data.infos.length >0) {
            _this.setData({
              info: data.infos,
              hasmore: ~~data.hasmore
            })
            _this.makeTime();
          } else {
            wx.redirectTo({
              url: '/pages/scancode/scancode'
            })
          }
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function() {
        _this.tip(failText);
      }
    })
  },
  makeTime: function() {
    var len = this.data.info.length;
    var text1,text2;
    var date = new Date(dateFormat(new Date(), 'yyyy/MM/dd')).getTime();
    for(var i=0;i <len;i++) {
      if (this.data.info[i].flag) {
        var ctime = "info["+i+"].chat.ctime"
        var nowDate = new Date(dateFormat(this.data.info[i].chat.ctime,'yyyy/MM/dd')).getTime();
        if (date === nowDate) {
          this.setData({
            [ctime]: dateFormat(this.data.info[i].chat.ctime,'hh:mm')
          })
        }
      }
    }
  },
  changebg(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      selId: idx
    })
  },
  goPt: function(e) {
    var idx = e.currentTarget.dataset.index;
    app.globalData.drid = this.data.info[idx].uid;
    app.globalData.drHead = this.data.info[idx].doctor.headurl;
    var status = ~~this.data.info[idx].status;
    this.setData({
      selId: -1
    })
    if (status == 0) {
      if (haspatient) {
        wx.navigateTo({
          url: '/pages/patientinfo/patientinfo'
        })
      } else {
        wx.navigateTo({
          url: '/pages/writepatient/writepatient'
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/patientchat/patientchat'
      })
    }
  },
  changeColor() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  addDr: function() {
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
        _this.tip(failText)
      }
    })
  },
  delDr: function(e) {
    var idx = e.currentTarget.dataset.index;
    app.globalData.drid = this.data.info[idx].uid;
    wx.navigateTo({
      url: '/pages/unbinddr/unbinddr'
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
