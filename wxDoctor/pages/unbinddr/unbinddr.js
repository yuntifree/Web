//index.js
//获取应用实例
var app = getApp();
var drid,uid,token,URL,hasrelation;
var failText = app.globalData.failText;

Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    btnBg: '#f6a623'
  },
  //事件处理函数
  onLoad: function () {
    drid = app.globalData.drid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    hasrelation = app.globalData.hasrelation;
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: drid
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
            info: resp.data
          })
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  changeColor() {
    this.setData({
      btnBg: '#e89712'
    })
  },
  unbindDr: function() {
    var _this = this;
    this.setData({
      btnBg: '#f6a623'
    })
    wx.showModal({
      title: '删除',
      content: '确认要解绑吗？',
      success: function(res) {
        if (res.confirm) {
          _this.delConfirm();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      complete: function(res) {
        _this.setData({
          btnBg: '#f6a623'
        })
      }
    })
  },
  delConfirm: function() {
    var _this = this;
    var param = {
      type: 1,
      tuid: drid,
      token: token,
      uid: uid
    }
    wx.request({
      url: URL + 'bind_op',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno ===0) {
          wx.reLaunch({
            url: '/pages/binddrlist/list'
          })
        } else {
          console.log(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
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
