//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
var URL = app.globalData.reqUrl
var drTuid;
var failText = app.globalData.failText;
Page({
  data: {
    viewShow: false,
    hasphone: 0,
    hasrelation: 0,
    haspasswd: 0,
    codeText: '获取验证码',
    phone: '',
    code: '',
    phoneFocus: true,
    codeFocus: false,
    tipMsg: '',
    tipShow: false,
    role: 0,
    btnBg: '#1ed2af',
    second: 3
  },
  //事件处理函数
  onLoad: function (option) {
    if (option.q) {
      var param = decodeURIComponent(option.q)
      var resTuid = param.substr(param.indexOf('?') + 1,5)
      if (resTuid == 'tuid=') {
        var idx = param.indexOf('=') +1;
        drTuid = ~~(param.substring(idx));
      } else {
        console.log('can not find tuid')
      }
    }
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
          hasrelation: ~~userData.hasrelation,
          haspasswd: ~~userData.haspasswd,
        })
        app.globalData.uid = userData.uid;
        app.globalData.token = userData.token;
        app.globalData.hasrelation = ~~userData.hasrelation
        app.globalData.haspatient = ~~userData.haspatient
        that.route();
      } else {
        that.wxRegister();
      }
    } else {
      that.tip("获取用户信息失败~")
    }
  },
  wxRegister: function() {
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
        that.route();
      }
    })
  },
  route() {
    var navUrl = '';
    var _this = this;
    wx.hideNavigationBarLoading()
    // 老用户
    if (this.data.hasphone) {
      // 是否医生
      if (this.data.role) {
        if (this.data.haspasswd) {
          wx.switchTab({
            url: '/pages/drpatient/drpatient'
          })
        } else {
          wx.redirectTo({
            url: '/pages/setcode/setcode?reset=0'
          })
        }
      } else {
        if (drTuid) {
          app.globalData.tuid = drTuid;
          wx.redirectTo({
            url: '/pages/binddr/binddr'
          })
        } else {
          if (this.data.hasrelation) {
            navUrl = '/pages/binddrlist/list'
          } else {
            navUrl = '/pages/scancode/scancode'
          }
          wx.redirectTo({
            url: navUrl
          })
        }
      }
    } else {
      this.setData({
        viewShow: true
      })
      var timer = setInterval(function(){
        if (_this.data.second <0) {
          clearInterval(timer);
          _this.setData({
            phoneFocus: true
          })
        } else {
          _this.setData({
            second: --_this.data.second
          })
        } 
      },1000)
    }
  },
  jump() {
    this.setData({
      second: 0
    })
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
            phoneFocus: false,
            codeFocus: true
          })
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  changeColor() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  makeReg() {
    var _this = this;
    this.setData({
      btnBg: '#1ed2af'
    })
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
            if (drTuid) {
              app.globalData.tuid = drTuid;
              wx.redirectTo({
                url: '/pages/binddr/binddr'
              })
            } else {
              wx.redirectTo({
                url: '/pages/scancode/scancode',
                success: function(res){
                  console.log(res);
                },
                fail: function(res){
                  console.log(res);
                }
              })
            }
          }
        } else if (resp.errno == 102) {
          _this.tip(resp.desc);
          _this.setData({
            phoneFocus: false,
            codeFocus: true
          })
        } else{
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  makeParam() {
    var ret = true;
    if (this.data.phone.length <=0) {
      this.tip('请输入电话号码');
      this.setData({
        codeFocus: false,
        phoneFocus: true
      })
      ret = false
    } else {
      if (!(util.checkTel(this.data.phone))) {
        this.tip('请输入正确的电话号码');
        this.setData({
          phone: '',
          codeFocus: false,
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
