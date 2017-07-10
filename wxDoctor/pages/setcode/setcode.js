//index.js
//获取应用实例
var md5 = require('../../utils/md5.js');
var app = getApp();
var tuid,uid,token,URL,hasrelation;
var failText = app.globalData.failText;
Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    cirShow: false,
    btnBg: '#1ed2af',
    password: '',
    checkword: '',
    rightCode: false,
    checkCode: false,
    btnDisable: true,
    canPost: false
  },
  //事件处理函数
  onLoad: function () {
    //页面五层处理
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
  },
  formSubmit:function(e) {
    console.log(JSON.stringify(e.detail.value));
  },
  changeColor: function() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  bindDr: function() {
    var _this = this;
    this.setData({
      cirShow: true,
      btnBg: '#1ed2af'
    })
    var param = {
      type: 0,
      tuid: tuid,
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
          _this.setData({
            cirShow: false
          })
          wx.reLaunch({
            url: '/pages/binddrlist/list'
          })
        } else {
          console.log(resp.desc);
        }
      },
      fail: function() {
        _this.tip(textFail);
      }
    })
  },
  checkValfocus(e) {
    if (this.data.rightCode) {
      this.setData({
        rightCode: false
      })
    }
  },
  checkVal: function(e) {
    var val = e.detail.value;
    if (val.length <6) {
      this.setData({
        rightCode: true,
      })
      return
    }
    if (!(~~val)) {
      this.setData({
        rightCode: true,
        password: ''
      })
      return
    }
    this.setData({
      password: ~~val
    })
  },
  checkPassword: function(e) {
    var val = e.detail.value;
    if (~~val !== this.data.password) {
      this.setData({
        checkCode: true,
        btnDisable: true
      })
    } else {
      this.setData({
        canPost: true,
        checkword: e.detail.value
      })
    }
  },
  checkBtn: function(e) {
    var val = e.detail.value;
    if (~~val == this.data.password) {
      this.setData({
        btnDisable: false
      })
    } else {
      this.setData({
        btnDisable: true
      })
    }
  },
  checkPsdfocus: function(e) {
    this.setData({
      checkCode: false,
    })
  },
  formSubmit: function(e) {
    var _this = this;
    if (this.data.canPost) {
      var param = {
        uid: uid,
        token: token,
        passwd: md5(e.detail.value.password),
      }
      wx.request({
        url: URL + 'set_draw_passwd',
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

          } else {
            _this.tip(resp.desc)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
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
