//index.js
//获取应用实例
var app = getApp()
var uid,token,URL;
var failText = app.globalData.failText;
var md5 = require('../../utils/md5.js');
Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    money: '',
    feeFocus: false,
    psd: '',
    psdFocus: false,
    btnDisable: true,
    codeFocus: false,
    moneyDisable: true
  },
  //事件处理函数
  onLoad: function () {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
  },
  onShow() {
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      uid: uid,
      token: token
    };
    wx.request({
      url: URL + 'get_my_wallet',
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
          _this.setData({
            info: resp.data
          })
        } else if(resp.errno == 101) {
          _this.tip(resp.desc)
          app.goIndex();
        } else {
          _this.tip(resp.desc);
        }
      }, //info.balance<info.mindraw&&
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  makeDraw(e) {
    var val = ~~e.detail.value;
  },
  checkDraw(e) {
    var val = ~~e.detail.value;
    if (this.data.info.balance<this.data.info.widthdraw) {
      this.tip('您的钱包余额低于最低提现金额，暂时不能提现哦')
    } else if (this.data.info.balance < val) {
      this.tip('您的钱包余额小于您输入的金额，请重新输入金额')
    } else {
      this.setData({
        money: val,
        moneyDisable: false
      })
    }
  },
  makeBtnstatus: function(e) {
    var val = e.detail.value;
    if (val.length == 6 && ~~val) {
      this.setData({
        btnDisable: false,
        psd: val
      })
    } else {
      this.setData({
        btnDisable: true
      })
    }
  },
  changeBg: function() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  checkCode: function() {
    this.setData({
      btnBg: '#1ed2af'
    })
    if (this.data.moneyDisable) {
      this.tip('请检查您的提现金额');
      return;
    }
    var _this = this;
    var fee = this.data.money;
    if ( fee && fee>0) {
      var param = {
        uid: uid,
        token: token,
        passwd: md5(this.data.psd)
      }
      wx.request({
        url: URL + 'check_draw_passwd',
        data: {
          data: param
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          var resp = res.data;
          if (resp.errno == 0) {
            _this.applyPay();
          } else if (resp.errno == 120){
            _this.setData({
              codeFocus: true
            })
            _this.tip(resp.desc)
          } else {
            _this.tip(resp.desc);
          }
        },
        fail: function(res) {
          _this.tip(failText)
        }
      })
    } else {
      this.setData({
        feeFocus: true,
        money: ''
      })
      this.tip('请输入提现金额')
    }
  },
  applyPay: function() {
    var _this = this;
    var param = {
       uid: uid,
       token: token,
       fee: fee*100
    }

    wx.request({
      url: URL + 'apply_draw',
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
          var draw = "info.draw";
          var balance = "info.balance"
          _this.setData({
            [draw]: _this.data.info.draw +　param.fee,
            [balance]: _this.data.info.balance - param.fee,
            money: ''
          })
          _this.tip('提现申请成功');
        }  else if(resp.errno = 119){
          _this.setData({
            feeFocus: true
          })
          _this.tip(resp.desc);
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  fotgetpsd: function() {
    wx.navigateTo({
      url: '/pages/forgetcode/forgetcode'
      //url: '/pages/setcode/setcode?dr=1&screen=1'
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
