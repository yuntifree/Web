//index.js
//获取应用实例
var md5 = require('../../utils/md5.js');
var app = getApp();
var uid,token,URL;
var failText = app.globalData.failText,reset;
var reg=new RegExp("[0-9]+");
Page({
  data: {
    tipMsg: '',
    tipShow: false,
    btnBg: '#78e4cf',
    btnUseBg: '#1ed2af',
    password: '',
    checkword: '',
    rightCode: false,
    checkCode: false,
    btnDisable: true,
    canPost: false,
    title: '',
    second: 3
  },
  //事件处理函数
  onLoad: function (option) {
    var _this = this;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    reset = ~~option.reset;
    var screen = ~~option.screen;
    if (screen) {
      this.setData({
        second: -1
      })
    } else {
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
    var title = ''
    if (reset) {
      title = '请重新设置您的提现密码'
      wx.setNavigationBarTitle({
        title: '重设提现密码'//页面标题为路由参数
      })
    } else {
      title = '请设置您的提现密码\n用于咨询费提现'
    }
    this.setData({
      title: title
    })
  },
  jump() {
    this.setData({
      second: 0
    })
  },
  changeColor: function() {
    this.setData({
      btnUseBg: '#0ABF9C'
    })
  },
  goUse: function() {
    this.setData({
      btnUseBg: '#1ed2af'
    })
    wx.navigateTo({
      url: '/pages/screen/screen?dr=1'
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
    console.log(typeof(val));
    if (val.length <6) {
      this.setData({
        rightCode: true,
      })
      return
    }
    if (!reg.test(val)) {
      this.setData({
        rightCode: true,
        password: ''
      })
      return
    }
    this.setData({
      password: val
    })
  },
  checkPassword: function(e) {
    var val = e.detail.value;
    if (val !== this.data.password) {
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
    if (val==this.data.password) {
      this.setData({
        btnDisable: false
      })
    } else {
      this.setData({
        btnDisable: true
      })
    }
    var pattern = /\d{6}/;
    console.log(typeof(val));
    if (val.length==6 && val!==this.data.password) {
      this.setData({
        checkCode: true
      })
    } else {
      this.setData({
        checkCode: false
      })
    }
  },
  checkPsdfocus: function(e) {
    this.setData({
      checkCode: false,
    })
  },
  changeBg: function(E) {
    this.setData({
      btnBg: '#1ed2af'
    })
  },
  formSubmit: function(e) {
    var _this = this;
    this.setData({
      btnBg: '#78e4cf'
    });
    console.log(this.data.password);
    if (this.data.canPost) {
      var param = {
        uid: uid,
        token: token,
        passwd: md5(this.data.password),
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
            app.globalData.userData.haspasswd = 1;
            if (reset) {
              wx.navigateBack({})
            } else {
              wx.switchTab({
                url: '/pages/drpatient/drpatient'
              })
            }
          } else {
            _this.tip(resp.desc)
          }
        },
        fail: function(res) {
          _this.tip(failText)
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
