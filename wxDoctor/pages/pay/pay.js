//index.js
//获取应用实例
var app = getApp()
var drid,uid,token,URL,ptcid;
var failText = app.globalData.failText;
Page({
  data: {
    info: {},
    tipShow: false,
    tipMsg: ''
  },
  //事件处理函数
  onLoad: function () {
    //页面五层处理
    drid = app.globalData.drid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    ptcid = app.globalData.ptcid;
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      uid: uid,
      tuid: drid,
      token: token,
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
          var fee = 0;
          if (resp.data.fee >0) {
            resp.data.fee = (resp.data.fee /100).toFixed(2);
          }
          _this.setData({
            info: resp.data
          })
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      }
    })
  },
  payMoney(e) {
    var _this = this;
    var fee = this.data.info.fee *100;
    var formid = e.detail.formId;
    var param = {
      doctor: drid,
      pid: ptcid,
      uid: uid,
      token: token,
      fee: fee,
      formid: formid
    }
    wx.request({
      url: URL + 'add_inquiry',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno === 0) {
          _this.startWxpay(resp.data.id)
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      }
    })
  },
  startWxpay(id) {
    var _this = this;
    var fee = this.data.info.fee *100
    var param = {
      id: id, //咨询id
      fee: fee,
      doctor: drid,
      uid: uid,
      token: token
    }
    wx.request({
      url: URL + 'wx_pay',
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
          _this.wxPay(resp.data)
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      }
    })
  },
  wxPay: function(param) {
    wx.requestPayment({
      timeStamp: param.timestamp + '',
      nonceStr: param.noncestr,
      package: param.package,
      signType: param.signtype,
      paySign: param.paysign,
      success:function(res){
        wx.redirectTo({
          url: '/pages/patientchat/patientchat',
          success: function(res){
            console.log(res);
          },
          fail: function(res){
            console.log(res);
          }
        })
      },
      fail:function(res){
        console.log(res);
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
