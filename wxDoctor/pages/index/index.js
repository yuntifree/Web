//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
var URL = 'https://wxdev.yunxingzh.com/inquiry/'
Page({
  data: {
    hasphone: false,
    sid: '',
    hasphone: 0,
    hasrelation: 0,
    codeText: '获取验证码',
    phone: '',
    code: '',
    phoneFocus: false,
    codeFocus: false,
    tipMsg: '',
    tipShow: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../scancode/scancode'
    })
  },
  onLoad: function () {
    this.checkLogin();
  },
  checkLogin() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: URL + 'submit_code',
            method: 'POST',
            data: {
              data: {
                code:res.code 
              }
            },
            success: function(res) {
              var resp = res.data;
              if (resp.errno ===0) {
                var data = resp.data;
                if (data.flag) {
                  that.setData({
                    hasphone: data.hasphone ? data.hasphone : 0,
                    role: data.role ? data.role : 0,
                    hasrelation: data.hasrelation ? data.hasrelation : 0
                  })
                  app.globalData.uid = data.uid;
                  app.globalData.token = data.token;
                  app.globalData.hasrelation = data.hasrelation ? data.hasrelation : 0;
                  //that.getUser();
                  that.checkPhone();
                } else {
                  that.setData({
                    sid: data.sid
                  })
                  that.getUser();
                }
              } else {
                that.tip(resp.desc);
              }
            }
          })
        } else {
          that.tip('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUser: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        var param = {
          sid: that.data.sid,
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        //console.log(param);
        that.wxReset(param);
      },
      fail: function(res) {
        that.tip(res);
      } 
    })
  },
  wxReset: function(param) {
    var that = this;
    param.sid = '66d72e8f8c6f442d95e445cbc3473861';
    wx.request({
      url: URL + 'login', 
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
          var data = resp.data;
          app.globalData.uid = data.uid;
          app.globalData.token = data.token;
          app.globalData.hasrelation = data.hasrelation ? data.hasrelation : 0;
        } else {
          that.tip(resp.desc);
        }
        that.checkPhone();
      }
    })
  },
  checkPhone() {
    var navUrl = '';
    if (this.data.hasphone) {
      if (this.data.role) {
        if (this.data.hasrelation) {
          navUrl = '../drpatient/drpatient'
        } else {
          navUrl = '../drcode/drcode'
        } 
      } else {
        if (this.data.hasrelation) {
          navUrl = '../scancode/scancode'
        } else {
          navUrl = '../patientinfo/patientinfo'
        }
      }
      wx.navigateTo({
        url: navUrl
      })
    } else {
      this.setData({
        phoneFocus: true,
        hasphone: true
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
          var role = resp.data.role ? resp.data.role : 0;
          var navUrl = '';
          if (role) {
            navUrl = '../drcode/drcode'
          } else {
            navUrl = '../scancode/scancode'
          }
          wx.navigateTo({
            url: navUrl
          })
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
