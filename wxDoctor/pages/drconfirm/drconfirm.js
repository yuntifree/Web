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
    viewCode: false,
    btnBg: '#1ed2af',
    btnText: '修改',
    iptDisable: true,
    saveMoney: false,
    editHead: false,
    newHead: '',
    checkHead: false,
    imgHeight: '750rpx'
  },
  //事件处理函数
  onLoad: function() {
    URL = app.globalData.reqUrl;
    uid = app.globalData.uid;
    token = app.globalData.token;
    qrUrl = 'http://api.yunxingzh.com/wxdoctor?tuid=' + app.globalData.uid;
    this.getData();
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          imgHeight: res.windowHeight +　'rpx'
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '推荐给你一款好用的健康小程序',
      path: '/pages/index/index?tuid='+uid
    }
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
          var data = QR.createQrCodeImg(qrUrl, {
            'size': 200
          });
          _this.setData({
            codeImg: data
          })
        } else if(resp.errno == 101){
          _this.tip(resp.desc);
          app.goIndex();
        }else {
          _this.tip(resp.desc);
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
  changeColor() {
    var iptDisable = true;
    var saveMoney = false
    if (this.data.iptDisable) {
      iptDisable = false
    } else {
      saveMoney = true
    }
    this.setData({
      btnBg: '#0ABF9C',
      iptDisable: iptDisable,
      iptFocus: true,
      saveMoney: saveMoney,
      btnText: '保存'
    })
  },
  saveFee: function() {
    if (this.data.saveMoney) {
      this.saveFeeEnd();
    }
  },
  saveFeeEnd() {
    var _this = this;
    this.setData({
      btnBg: '#1ed2af'
    })
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
            _this.setData({
              iptDisable: true,
              btnText: '修改',
              saveMoney: false
            })
            _this.tip('修改成功');
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
  changeHead: function() {
    this.setData({
      editHead: true,
      newHead: ''
    })
  },
  chooseHead: function() {
    var _this = this;
    wx.setNavigationBarTitle({
      title: '修改头像'//页面标题为路由参数
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFile = res.tempFilePaths;
        wx.uploadFile({
          url: URL + 'upload_img', //仅为示例，非真实的接口地址
          filePath: tempFile[0],
          name: 'file',
          success: function(resp){
            var data = JSON.parse(resp.data);
            _this.setData({
              newHead: data.data.filename,
              checkHead: true,
              editHead: false,
            })
            console.log(data.data.filename);
          }
        })
      }
    })
  },
  cancelEdit: function(){
    this.setData({
      editHead: false
    })
  },
  cancelCheck: function() {
    this.setData({
      checkHead: false
    })
    wx.setNavigationBarTitle({
      title: '健康莞家医生版'//页面标题为路由参数
    })
  },
  makeHead: function() {
    this.setData({
      ['info.headurl']: this.data.newHead,
      checkHead: false
    })
    wx.setNavigationBarTitle({
      title: '健康莞家医生版'//页面标题为路由参数
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
