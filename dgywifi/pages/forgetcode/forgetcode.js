//index.js
//获取应用实例
var utils = require('../../utils/util.js');
var app = getApp();
var uid,token,URL,timer,phone;
var failText = app.globalData.failText;
var reg=new RegExp("[0-9]+");
Page({
  data: {
    tipMsg: '',
    tipShow: false,
    btnBg: '#1ed2af',
    phone: '',
    code: '',
    codeText: '获取验证码',
    codeFocus: false
  },
  //事件处理函数
  onLoad: function () {
    //页面五层处理
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    this.setData({
      phone: app.globalData.userData.phone
    })
  },
  getcode: function() {
    var _this = this;
    this.getphonecode();
    this.setData({
      codeFocus: true
    })
  },
  getphonecode: function() {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      phone: this.data.phone,
    }
    wx.request({
      url: URL + 'get_phone_code',
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
          var ts=60;
          timer = setInterval(function(){
            if (ts >0) {
              _this.setData({
                codeText: --ts +'s'
              })
            } else {
              _this.setData({
                codeText: '获取验证码'
              })
              clearInterval(timer);
            }
          },1000)
          console.log('get_phone_code succ')
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  checkcode: function(e) {
    var val = e.detail.value;
    this.setData({
      code: val
    })
  },
  postNext: function() {
    var _this = this;
    this.setData({
      btnBg: '#1ed2af'
    })
    if (reg.test(this.data.code) && this.data.code.length == 6) {
      var param = {
        phone: this.data.phone,
        code: ~~this.data.code,
        uid: uid,
        token: token
      }
      wx.request({
        url: URL +'check_phone_code',
        method: 'POST',
        data: {
          data: param
        },
        header: {
          'content-type': 'application/json',
        },
        success: function(res) {
          var resp = res.data;
          if (resp.errno == 0) {
            wx.redirectTo({
              url: '/pages/setcode/setcode?reset=1&screen=1'
            })
            console.log('succ')
          } else if(resp.errno == 102){
            _this.tip('验证码错误，请重新输入');
            _this.setData({
              codeFocus: true
            })
          }
        },
        fail: function(res) {
          _this.tip(failText)
        }
      })
    } else {
      this.tip('请输入正确的验证码');
    } 
  },
  changeBg() {
    this.setData({
      btnBg: '#1ed2af'
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
