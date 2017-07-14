//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
var URL = app.globalData.reqUrl
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
    drTuid: 0
  },
  //事件处理函数
  onLoad: function (option) {
    if (option.q) {
      var param = decodeURIComponent(option.q)
      var resTuid = param.substr(param.indexOf('?') + 1,5)
      if (resTuid == 'tuid=') {
        var idx = param.indexOf('=') +1;
        this.data.drTuid = ~~(param.substring(idx));
        app.globalData.tuid = this.data.drTuid;
      } else {
        console.log('can not find tuid')
      }
    } else if (option.tuid) {
      this.data.drTuid = ~~option.tuid
      app.globalData.tuid = this.data.drTuid
    }
    // 提示加载中
    wx.showLoading({
      title: '加载中...',
      complete:function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 3000)
      }
    })
  },
  onShow: function() {
    console.log('index');
    app.init(this.checkLogin)
  },
  checkLogin: function() {
    // 加载完毕
    wx.hideLoading()
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
        app.globalData.hasrelation = ~~userData.hasrelation;
        app.globalData.haspatient = ~~userData.haspatient;
        // this.setData({
        //   viewShow: true
        // })
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
          app.globalData.userData.uid = app.globalData.uid = data.uid;
          app.globalData.userData.token = app.globalData.token = data.token;
          app.globalData.userData.hasrelation = app.globalData.hasrelation = ~~data.hasrelation;
          app.globalData.userData.flag = 1
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
    console.log('this.data.hasphone='+this.data.drTuid)
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
            url: '/pages/setcode/setcode?reset=0&screen=1'
          })
        }
      } else {
        if (this.data.drTuid) {
          wx.redirectTo({
            url: '/pages/binddr/binddr'
          })
        } else {
          if (this.data.hasrelation) {
            console.log('/pages/binddrlist/list');
            navUrl = '/pages/binddrlist/list'
          } else {
            navUrl = '/pages/scancode/scancode?screen=1'
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
          app.globalData.userData.hasphone = 1
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
            if (_this.data.drTuid) {
              app.globalData.tuid = _this.data.drTuid;
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
