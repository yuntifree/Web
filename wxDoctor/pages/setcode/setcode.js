//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
var uid,token,URL;
var failText = app.globalData.failText;
Page({
  data: {
    tipMsg: '',
    tipShow: false,
    btnBg: '#1ed2af',
    password: '',
    checkword: '',
    rightCode: false,
    checkCode: false,
    btnDisable: true,
    canPost: false,
    title: ''
  },
  //事件处理函数
  onLoad: function (option) {
    //页面五层处理
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    var reset = option.reset;
    var title = ''
    if (~~reset) {
      title = '请重新设置您的提现密码'
    } else {
      title = '请设置您的提现密码\n用于咨询费提现'
    }
    this.setData({
      title: title
    })
  },
  changeColor: function() {
    this.setData({
      btnBg: '#0ABF9C'
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
            wx.switchTab({
              url: '/pages/drpatient/drpatient'
            })
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
