//index.js
//获取应用实例
var app = getApp()
var tuid,drid,uid,token,URL;
Page({
  data: {
    info: {},
    tipShow: false,
    tipMsg: ''
  },
  //事件处理函数
  onLoad: function () {
    tuid = app.globalData.tuid;
    drid = app.globalData.drid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
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
      }
    })
  },
  payMoney() {
    var _this = this;
    var fee = ~~this.data.info.fee *100
    var param = {
      id: 1, //问诊id
      fee: fee,
      doctor: tuid,
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
        wx.navigateTo({
          url: '../patientchat/patientchat'
        })
      },
      fail:function(res){
        wx.showToast({
          title: res,
        })
        console.log(JSON.stringify(res))
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
