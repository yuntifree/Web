//index.js
//获取应用实例
var app = getApp()
var uid,token,URL;
Page({
  data: {
    info: {},
    tipMsg: '',
    tipShow: false,
    money: '',
    feeFocus: false
  },
  //事件处理函数
  onLoad: function () {
    uid = app.globalData.tuid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
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
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  makeDraw(e) {
    this.setData({
      money: e.detail.value
    })
  },
  applyPay: function() {
    var _this = this;
    var fee = ~~this.data.money;
    if ( fee && fee>0) {
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
            _this.setData({
              [draw]: _this.data.info.draw +　param.fee,
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
