//qrcode
var QR = require("../../utils/wxqrcode.js");

//获取应用实例
var app = getApp()
var URL, uid, token, qrUrl;
var failText = app.globalData.failText;
Page({
  data: {
    info: {},
    iptMoney: 0,
    iptFocus: false,
    tipMsg: '',
    tipShow: false,
    maskHidden: true,
    imagePath: '',
    codeImg: '',
    viewCode: false
  },
  //事件处理函数
  onLoad: function() {
    URL = app.globalData.reqUrl;
    uid = app.globalData.uid;
    token = app.globalData.token;
    qrUrl = 'tuid=' + app.globalData.uid;
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      tuid: uid,
      uid: uid,
      token: token
    };
    wx.request({
      url: URL + 'get_doctor_info',
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
          var fee = 0;
          if (resp.data.fee > 0) {
            fee = (resp.data.fee / 100).toFixed(2)
          }
          _this.setData({
            info: resp.data,
            iptMoney: fee
          })
          var initUrl = qrUrl;
          var data = QR.createQrCodeImg(qrUrl, {
            'size': 300
          });
          _this.setData({
            codeImg: data
          })
        } else {
          console.log(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      }
    })
  },
  bindFeeInput: function(e) {
    this.setData({
      iptMoney: e.detail.value
    })
  },
  saveFee: function() {
    var _this = this;
    if (this.data.iptMoney > 0 || this.data.iptMoney == 0) {
      var param = {
        uid: uid,
        token: token,
        fee: this.data.iptMoney * 100
      }
      wx.request({
        url: URL + 'set_fee',
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
            _this.tip('保存成功');
          } else {
            _this.tip(resp.desc);
          }
        },
        fail: function(res) {
          _this.tip(failText);
        }
      })
    } else {
      this.setData({
        iptFocus: true
      })
      this.tip('请输入正确的金额');
    }
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function(e) {
    console.log(e.currentTarget.dataset.src);
    this.setData({
      viewCode: true
    })
    //var result = base.decode(e.currentTarget.dataset.src); 
  },
  viewShow: function(e) {
    this.setData({
      viewCode: false
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
    }, 1500)
  }
})
