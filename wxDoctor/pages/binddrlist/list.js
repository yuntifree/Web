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
            var info = data.infos;
            var date = new Date(dateFormat(new Date(), 'yyyy/MM/dd')).getTime();
            info.forEach(function(item) {
              if (item.flag) {
                var nowDate = new Date(dateFormat(item.chat.ctime,'yyyy/MM/dd')).getTime();
                if (date === nowDate) {
                    item.chat.ctime = dateFormat(item.chat.ctime,'hh:mm')
                } else {
                    item.chat.ctime = dateFormat(item.chat.ctime,'yyyy/MM/dd')
                }
              }
            })
            _this.setData({
              info: info,
              hasmore: ~~data.hasmore
            })
            app.globalData.userData.hasrelation = 1
          } else {
            app.globalData.userData.hasrelation = 0
            wx.redirectTo({
              url: '/pages/scancode/scancode?screen=0'
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
  lower: function(e) {
    if (this.data.hasmore) {
      var len = this.data.info.length-1;
      if (len >= 0) {
        var seq = this.data.info[len].seq;
        this.getData(seq);
      }
    }
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
