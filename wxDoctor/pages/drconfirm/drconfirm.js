//qrcode
var QR = require("../../utils/qrcode.js");

//获取应用实例
var app = getApp()
var URL,uid,token;
var qrUrl;
Page({
  data: {
    info: {},
    iptMoney: 0,
    iptFocus: false,
    tipMsg: '',
    tipShow: false,
    maskHidden:true,
    imagePath:'',
  },
  //事件处理函数
  onLoad: function () {
    URL = app.globalData.reqUrl;
    uid =  app.globalData.tuid;
    token = app.globalData.token;
    qrUrl = {
      tuid: app.globalData.uid
    }
    this.getData();
  },
  getData: function() {
    var _this = this;
    var param = {
      tuid: uid,
      uid: uid,
      token: token
    };
    console.log(JSON.stringify(param));
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
          var size = _this.setCanvasSize();//动态设置画布大小
          var initUrl = qrUrl;
          _this.createQrCode(initUrl,"mycanvas",size.w,size.h);
        } else {
          console.log(resp.desc);
        }
      },
      fail: function(res) {
        console.log(res);
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

        }
      })
    } else {
      this.setData({
        iptFocus: true
      })
      this.tip('请输入正确的金额');
    }
  },
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/400;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("********"+tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          wx.previewImage({
            current: tempFilePath, // 当前显示图片的http链接
            urls: [tempFilePath] // 需要预览的图片http链接列表
          })
          //console.log(this.data.imagePath);
      },
      fail: function (res) {
          console.log(res);
      }
    });    
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
