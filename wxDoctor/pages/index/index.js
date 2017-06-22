//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
var URL = app.globalData.reqUrl
Page({
  data: {
    viewShow: false,
    hasphone: 0,
    hasrelation: 0,
    codeText: '获取验证码',
    phone: '',
    code: '',
    phoneFocus: false,
    codeFocus: false,
    tipMsg: '',
    tipShow: false,
    role: 0,
  },
  //事件处理函数
  onLoad: function () {
    wx.showNavigationBarLoading()
    app.init(this.checkLogin)
  },
  checkLogin() {
    var that = this;
    var userData = app.globalData.userData
    if (userData) {
      // 是否登陆过
      if (userData.flag) {
        that.setData({
          hasphone: ~~userData.hasphone,
          role: ~~userData.role,
          hasrelation: ~~userData.hasrelation
        })
        app.globalData.uid = userData.uid;
        app.globalData.token = userData.token;
        app.globalData.hasrelation = ~~userData.hasrelation
        app.globalData.haspatient = ~~userData.haspatient

        that.checkPhone();
      } else {
        that.login();
      }
    } else {
      that.tip("获取用户信息失败~")
    }
  },
  login: function() {
    var that = this;
    var raw = app.globalData.rawUserInfo
    var userData = app.globalData.userData
    wx.request({
      url: URL + 'login',
      method: 'POST',
      data: {
        data: {
          sid: userData.sid,
          rawData: raw.rawData,
          signature: raw.signature,
          encryptedData: raw.encryptedData,
          iv: raw.iv
        }
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno === 0) {
          var data = resp.data;
          app.globalData.uid = data.uid;
          app.globalData.token = data.token;
          app.globalData.hasrelation = ~~data.hasrelation;
        } else {
          that.tip(resp.desc);
        }
        that.checkPhone();
      }
    })
  },
  checkPhone() {
    var navUrl = '';
    wx.hideNavigationBarLoading()
    if (this.data.hasphone) {
      if (this.data.role) {
        wx.switchTab({
          url: '/pages/drpatient/drpatient'
        })

      } else {
        if (this.data.hasrelation) {
          navUrl = '../binddrlist/list'
        } else {
          navUrl = '../scancode/scancode'
        }
        wx.redirectTo({
          url: navUrl
        })
      }
    } else {
      this.setData({
        phoneFocus: true,
        viewShow: true
      })
    }
  },
  makePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  makeCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode() {
    var _this = this;
    if (!this.makeParam()) {
      return;
    }
    var param = {
      uid: app.globalData.uid,
      token: app.globalData.token,
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
      success: function(res){
        var resp = res.data;
        if (resp.errno === 0) {
          var seconds = 60;
          var timer = setInterval(function() {
            if (seconds >0) {
              seconds--;
              _this.setData({
                codeText: seconds + ' S'
              })
              if (seconds == 0) {
                clearInterval(timer);
                _this.setData({
                  codeText: '获取验证码'
                })
              }
            }
          },1000);
          _this.setData({
            codeFocus: true
          })
        }
      }
    })
  },
  makeReg() {
    var _this = this;
    if (!this.makeParam()) {
      return;
    }
    if (this.data.code.length <=0) {
      this.tip('请输入验证码');
      this.setData({
        codeFocus: true
      })
      return
    }
    var param = {
      phone: this.data.phone,
      code: ~~this.data.code,
      uid: app.globalData.uid,
      token: app.globalData.token
    }
    wx.request({
      url: URL +'bind_phone',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno === 0) {
          var role = ~~resp.data.role
          if (role) {
            wx.switchTab({
              url: '/pages/drpatient/drpatient',
              success: function(res) {
                console.log(res)
              },
              fail: function(res){
                console.log(res);
              }
            })
          } else {
            wx.redirectTo({
              url: '../scancode/scancode',
              success: function(res){
                console.log(res);
              },
              fail: function(res){
                console.log(res);
              }
            })
          }

        } else if (resp.errno == 102) {
          _this.tip(resp.desc);
          _this.setData({
            codeFocus: true
          })
        } else{
          _this.tip(resp.desc);
        }
      }
    })
  },
  makeParam() {
    var ret = true;
    if (this.data.phone.length <=0) {
      this.tip('请输入电话号码');
      this.setData({
        phoneFocus: true
      })
      ret = false
    } else {
      if (!(util.checkTel(this.data.phone))) {
        this.tip('请输入正确的电话号码');
        this.setData({
          phone: '',
          phoneFocus: true
        })
        ret = false
      }
    }
    return ret;
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
